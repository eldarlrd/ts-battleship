import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  Timestamp,
  type Unsubscribe
} from 'firebase/firestore';
import { customAlphabet } from 'nanoid';

import { ERRORS } from '@/config/errors.ts';
import { firestore } from '@/config/firebase.ts';
import { DURATION_MS, GRID_SIZE, LOBBY_ALPHABET } from '@/config/rules.ts';
import {
  type GameRoom,
  type Move,
  type MoveResult
} from '@/models/matchmaking.model.ts';

const generateLobbyKey = customAlphabet(LOBBY_ALPHABET, 6);

const createGameRoom = async (
  playerId: string,
  isPrivate = false
): Promise<string> => {
  try {
    const roomsRef = collection(firestore, 'rooms');
    const newRoomRef = doc(roomsRef);
    const roomId = newRoomRef.id;

    // TTL Timestamp
    const futureDate = new Date(Date.now() + DURATION_MS);
    const expireAt = Timestamp.fromDate(futureDate);

    const lobbyKeyField = isPrivate ? { lobbyKey: generateLobbyKey() } : {};

    await setDoc(newRoomRef, {
      player1: {
        uid: playerId,
        ready: false
      },
      private: isPrivate,
      status: 'waiting',
      moves: {
        [playerId]: []
      },
      sunkShipsCount: {
        [playerId]: 0
      },
      expireAt,
      ...lobbyKeyField
    });

    return roomId;
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error);
    throw new Error(ERRORS.CREATE_ROOM_FAILED);
  }
};

const joinGameRoom = async (
  roomId: string,
  playerId: string
): Promise<boolean> => {
  const roomRef = doc(firestore, 'rooms', roomId);
  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) throw new Error(ERRORS.NO_ROOM);

  const room = snapshot.data() as GameRoom;

  if (room.player2) throw new Error(ERRORS.FULL_ROOM);
  if (room.status !== 'waiting') throw new Error(ERRORS.NOT_AVAILABLE);

  await updateDoc(roomRef, {
    player2: {
      uid: playerId,
      ready: false
    },
    [`moves.${playerId}`]: [],
    [`sunkShipsCount.${playerId}`]: 0
  });

  return true;
};

const joinPrivateGame = async (
  key: string,
  playerId: string
): Promise<string> => {
  const roomsRef = collection(firestore, 'rooms');
  const q = query(
    roomsRef,
    where('lobbyKey', '==', key),
    where('status', '==', 'waiting')
  );
  const snapshot = await getDocs(q);

  if (snapshot.empty) throw new Error(ERRORS.NO_ROOM);

  const roomId = snapshot.docs[0].id;

  await joinGameRoom(roomId, playerId);

  return roomId;
};

const findOrCreateRoom = async (playerId: string): Promise<string> => {
  const roomsRef = collection(firestore, 'rooms');
  const q = query(
    roomsRef,
    where('private', '==', false),
    where('status', '==', 'waiting')
  );
  const snapshot = await getDocs(q);

  for (const docSnap of snapshot.docs) {
    const room = docSnap.data() as GameRoom;
    const roomId = docSnap.id;

    if (!room.player2 && room.player1.uid !== playerId) {
      try {
        await joinGameRoom(roomId, playerId);

        return roomId;
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(error.message);
          throw new Error(ERRORS.NO_CONNECTION);
        }
      }
    }
  }

  return await createGameRoom(playerId);
};

const createPrivateRoom = async (playerId: string): Promise<string> =>
  await createGameRoom(playerId, true);

const setPlayerReady = async (
  roomId: string,
  playerId: string,
  board: number[][]
): Promise<void> => {
  const roomRef = doc(firestore, 'rooms', roomId);
  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) throw new Error(ERRORS.NO_ROOM);

  const room = snapshot.data() as GameRoom;
  const isPlayer1 = room.player1.uid === playerId;
  const playerKey = isPlayer1 ? 'player1' : 'player2';

  await updateDoc(roomRef, {
    [`${playerKey}.ready`]: true,
    [`${playerKey}.board`]: board.flat()
  });

  // Check if players ready
  const updatedSnapshot = await getDoc(roomRef);
  const updatedRoom = updatedSnapshot.data() as GameRoom;

  if (updatedRoom.player1.ready && updatedRoom.player2?.ready)
    await updateDoc(roomRef, {
      status: 'playing',
      currentTurn: updatedRoom.player1.uid // Player 1 first
    });
};

const makeMove = async (
  roomId: string,
  playerId: string,
  row: number,
  col: number,
  opponentBoard: number[][]
): Promise<MoveResult> => {
  const roomRef = doc(firestore, 'rooms', roomId);
  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) throw new Error(ERRORS.NO_ROOM);

  const room = snapshot.data() as GameRoom;

  if (room.currentTurn !== playerId) throw new Error(ERRORS.NOT_YOUR_TURN);

  const cell = opponentBoard[row][col];
  const hit = cell > 0 && cell <= 5;

  let sunk = false;
  let sunkShipLength: number | undefined;

  if (hit) {
    const shipLength = cell;
    const moves = room.moves?.[playerId] ?? [];

    const shipCells: { row: number; col: number }[] = [];

    for (
      let c = col;
      c < GRID_SIZE && opponentBoard[row][c] === shipLength;
      c++
    )
      shipCells.push({ row, col: c });
    for (let c = col - 1; c >= 0 && opponentBoard[row][c] === shipLength; c--)
      shipCells.push({ row, col: c });

    if (shipCells.length !== shipLength) {
      shipCells.length = 0;
      for (
        let r = row;
        r < GRID_SIZE && opponentBoard[r][col] === shipLength;
        r++
      )
        shipCells.push({ row: r, col });
      for (let r = row - 1; r >= 0 && opponentBoard[r][col] === shipLength; r--)
        shipCells.push({ row: r, col });
    }

    const allHit = shipCells.every(
      shipCell =>
        moves.some(
          move =>
            move.row === shipCell.row && move.col === shipCell.col && move.hit
        ) ||
        (shipCell.row === row && shipCell.col === col)
    );

    if (allHit && shipCells.length === shipLength) {
      sunk = true;
      sunkShipLength = shipLength;
    }
  }

  const moves = room.moves?.[playerId] ?? [];
  const moveData: Move = { row, col, hit };

  if (sunk && sunkShipLength) {
    moveData.sunk = true;
    moveData.sunkShipLength = sunkShipLength;
  }
  moves.push(moveData);

  const sunkShipsCount = room.sunkShipsCount ?? {};

  if (!sunkShipsCount[playerId]) sunkShipsCount[playerId] = 0;
  if (sunk) sunkShipsCount[playerId]++;

  // Switch turn
  const isPlayer1 = room.player1.uid === playerId;
  const nextTurn = isPlayer1 ? room.player2!.uid : room.player1.uid;

  await updateDoc(roomRef, {
    [`moves.${playerId}`]: moves,
    sunkShipsCount: sunkShipsCount,
    currentTurn: nextTurn
  });

  return { row, col, hit, sunk };
};

const declareWinner = async (
  roomId: string,
  winnerId: string
): Promise<void> => {
  const roomRef = doc(firestore, 'rooms', roomId);

  await updateDoc(roomRef, {
    status: 'finished',
    winner: winnerId
  });
};

const subscribeToRoom = (
  roomId: string,
  callback: (room: GameRoom | null) => void
): Unsubscribe => {
  const roomRef = doc(firestore, 'rooms', roomId);

  return onSnapshot(roomRef, snapshot => {
    if (snapshot.exists())
      callback({ ...snapshot.data(), id: roomId } as GameRoom);
    else callback(null);
  });
};

const leaveRoom = async (roomId: string, playerId: string): Promise<void> => {
  const roomRef = doc(firestore, 'rooms', roomId);
  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) return;

  const room = snapshot.data() as GameRoom;
  const isPlayer1 = room.player1.uid === playerId;

  if (room.status === 'waiting' || room.status === 'ready')
    await deleteDoc(roomRef);
  else if (room.status !== 'finished') {
    const winnerId = isPlayer1 ? room.player2!.uid : room.player1.uid;

    await declareWinner(roomId, winnerId);
  }
};

export {
  createGameRoom,
  joinGameRoom,
  findOrCreateRoom,
  createPrivateRoom,
  joinPrivateGame,
  setPlayerReady,
  makeMove,
  declareWinner,
  leaveRoom,
  subscribeToRoom
};
