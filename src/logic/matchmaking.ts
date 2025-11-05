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
  type Unsubscribe
} from 'firebase/firestore';

import { firestore } from '@/config/firebase.ts';

interface Move {
  row: number;
  col: number;
  hit: boolean;
  sunk?: boolean;
  sunkShipLength?: number;
}

interface GameRoom {
  id: string;
  player1: {
    uid: string;
    ready: boolean;
    board?: number[][];
  };
  player2?: {
    uid: string;
    ready: boolean;
    board?: number[][];
  };
  currentTurn?: string;
  status: 'waiting' | 'ready' | 'playing' | 'finished';
  winner?: string;
  moves?: Record<string, Move[]>;
  sunkShipsCount?: Record<string, number>;
}

interface MoveResult {
  row: number;
  col: number;
  hit: boolean;
  sunk?: boolean;
}

// Create a new game room
const createGameRoom = async (playerId: string): Promise<string> => {
  const roomsRef = collection(firestore, 'rooms');
  const newRoomRef = doc(roomsRef);
  const roomId = newRoomRef.id;

  await setDoc(newRoomRef, {
    player1: {
      uid: playerId,
      ready: false
    },
    status: 'waiting',
    moves: {
      [playerId]: []
    },
    sunkShipsCount: {
      [playerId]: 0
    }
  });

  return roomId;
};

// Join an existing game room
const joinGameRoom = async (
  roomId: string,
  playerId: string
): Promise<boolean> => {
  const roomRef = doc(firestore, 'rooms', roomId);
  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) {
    throw new Error('Room does not exist');
  }

  const room = snapshot.data() as GameRoom;

  if (room.player2) {
    throw new Error('Room is full');
  }

  if (room.status !== 'waiting') {
    throw new Error('Room is not accepting players');
  }

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

// Find an available room or create a new one
const findOrCreateRoom = async (playerId: string): Promise<string> => {
  const roomsRef = collection(firestore, 'rooms');
  const q = query(roomsRef, where('status', '==', 'waiting'));
  const snapshot = await getDocs(q);

  // Find a waiting room
  for (const docSnap of snapshot.docs) {
    const room = docSnap.data() as GameRoom;
    const roomId = docSnap.id;

    if (!room.player2 && room.player1.uid !== playerId) {
      try {
        await joinGameRoom(roomId, playerId);

        return roomId;
      } catch (error: unknown) {
        console.error(error);
      }
    }
  }

  return await createGameRoom(playerId);
};

// Set player as ready with their board
const setPlayerReady = async (
  roomId: string,
  playerId: string,
  board: number[][]
): Promise<void> => {
  const roomRef = doc(firestore, 'rooms', roomId);
  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) {
    throw new Error('Room does not exist');
  }

  const room = snapshot.data() as GameRoom;
  const isPlayer1 = room.player1.uid === playerId;
  const playerKey = isPlayer1 ? 'player1' : 'player2';

  await updateDoc(roomRef, {
    [`${playerKey}.ready`]: true,
    [`${playerKey}.board`]: board.flat()
  });

  // Check if both players are ready
  const updatedSnapshot = await getDoc(roomRef);
  const updatedRoom = updatedSnapshot.data() as GameRoom;

  if (updatedRoom.player1.ready && updatedRoom.player2?.ready) {
    await updateDoc(roomRef, {
      status: 'playing',
      currentTurn: updatedRoom.player1.uid // Player 1 goes first
    });
  }
};

// Make a move (attack opponent's board)
const makeMove = async (
  roomId: string,
  playerId: string,
  row: number,
  col: number,
  opponentBoard: number[][]
): Promise<MoveResult> => {
  const roomRef = doc(firestore, 'rooms', roomId);
  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) {
    throw new Error('Room does not exist');
  }

  const room = snapshot.data() as GameRoom;

  if (room.currentTurn !== playerId) {
    throw new Error('Not your turn');
  }

  // Check if move is valid
  const cell = opponentBoard[row][col];
  const hit = cell > 0 && cell <= 5; // Ship cells are 1-5

  let sunk = false;
  let sunkShipLength: number | undefined;

  // If hit, check if ship is sunk
  if (hit) {
    const shipLength = cell;
    const moves = room.moves?.[playerId] ?? [];

    // Find all cells of this ship
    const shipCells: { row: number; col: number }[] = [];

    // Try horizontal ship
    for (let c = col; c < 10 && opponentBoard[row][c] === shipLength; c++) {
      shipCells.push({ row, col: c });
    }
    for (let c = col - 1; c >= 0 && opponentBoard[row][c] === shipLength; c--) {
      shipCells.push({ row, col: c });
    }

    // If not matching ship length, try vertical
    if (shipCells.length !== shipLength) {
      shipCells.length = 0;
      for (let r = row; r < 10 && opponentBoard[r][col] === shipLength; r++) {
        shipCells.push({ row: r, col });
      }
      for (
        let r = row - 1;
        r >= 0 && opponentBoard[r][col] === shipLength;
        r--
      ) {
        shipCells.push({ row: r, col });
      }
    }

    // Check if all cells of the ship have been hit (including this move)
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

  // Record the move
  const moves = room.moves?.[playerId] ?? [];
  const moveData: Move = { row, col, hit };

  if (sunk && sunkShipLength) {
    moveData.sunk = true;
    moveData.sunkShipLength = sunkShipLength;
  }
  moves.push(moveData);

  // Update sunk ships count
  const sunkShipsCount = room.sunkShipsCount ?? {};

  if (!sunkShipsCount[playerId]) {
    sunkShipsCount[playerId] = 0;
  }
  if (sunk) {
    sunkShipsCount[playerId]++;
  }

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

// Declare winner
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

// Listen to room changes
const subscribeToRoom = (
  roomId: string,
  callback: (room: GameRoom | null) => void
): Unsubscribe => {
  const roomRef = doc(firestore, 'rooms', roomId);

  return onSnapshot(roomRef, snapshot => {
    if (snapshot.exists()) {
      callback({ ...snapshot.data(), id: roomId } as GameRoom);
    } else {
      callback(null);
    }
  });
};

// Leave room
const leaveRoom = async (roomId: string, playerId: string): Promise<void> => {
  const roomRef = doc(firestore, 'rooms', roomId);
  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) {
    return;
  }

  const room = snapshot.data() as GameRoom;
  const isPlayer1 = room.player1.uid === playerId;

  if (room.status === 'waiting' || room.status === 'ready') {
    // Game hasn't started, remove player
    if (isPlayer1) {
      await deleteDoc(roomRef);
    } else {
      await updateDoc(roomRef, {
        player2: null,
        status: 'waiting'
      });
    }
  } else {
    // Game in progress, declare other player as winner
    const winnerId = isPlayer1 ? room.player2!.uid : room.player1.uid;

    await declareWinner(roomId, winnerId);
  }
};

export {
  type Move,
  type GameRoom,
  type MoveResult,
  createGameRoom,
  joinGameRoom,
  findOrCreateRoom,
  setPlayerReady,
  makeMove,
  declareWinner,
  leaveRoom,
  subscribeToRoom
};
