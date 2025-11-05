import { type Unsubscribe } from 'firebase/firestore';

import { Board, type Coordinates } from '@/logic/board.ts';
import {
  findOrCreateRoom,
  setPlayerReady,
  makeMove,
  subscribeToRoom,
  declareWinner,
  leaveRoom,
  type GameRoom
} from '@/logic/matchmaking.ts';
import { Ship } from '@/logic/ship.ts';

export class OnlinePlayer {
  public playerVictorious: number;
  public playerBoard: Board;
  public opponentBoard: Board;
  public isCurrPlayerTurn: boolean;
  public roomId: string | null;
  public playerId: string;
  public opponentId: string | null;
  public roomStatus: 'waiting' | 'ready' | 'playing' | 'finished';
  public isPlayer1: boolean;
  private unsubscribe: Unsubscribe | null;
  private onRoomUpdateCallbacks: ((room: GameRoom) => void)[];
  private pendingRoomUpdate: GameRoom | null;
  private processedOpponentMoves: Set<string>;
  private processedPlayerMoves: Set<string>;

  public constructor(playerId: string) {
    this.playerVictorious = 0;
    this.playerBoard = new Board();
    this.opponentBoard = new Board();
    this.isCurrPlayerTurn = false;
    this.roomId = null;
    this.playerId = playerId;
    this.opponentId = null;
    this.roomStatus = 'waiting';
    this.isPlayer1 = false;
    this.unsubscribe = null;
    this.onRoomUpdateCallbacks = [];
    this.pendingRoomUpdate = null;
    this.processedOpponentMoves = new Set<string>();
    this.processedPlayerMoves = new Set<string>();
  }

  // Compatibility properties for Gameboard component
  public get isCurrPlayerOne(): boolean {
    return this.isCurrPlayerTurn;
  }

  public get computerBoard(): Board {
    return this.opponentBoard;
  }

  // Compatibility method - not used in PvP mode
  public computerTurn(): Coordinates {
    return { row: 0, col: 0 };
  }

  // Find or create a game room
  public async joinMatchmaking(): Promise<void> {
    try {
      this.roomId = await findOrCreateRoom(this.playerId);
      this.setupRoomSubscription();

      // Trigger initial room state update
      const { getDoc, doc } = await import('firebase/firestore');
      const { firestore } = await import('@/config/firebase.ts');
      const roomRef = doc(firestore, 'rooms', this.roomId);
      const snapshot = await getDoc(roomRef);

      if (snapshot.exists()) {
        const room = { ...snapshot.data(), id: this.roomId } as GameRoom;

        if (this.onRoomUpdateCallbacks.length > 0) {
          this.onRoomUpdateCallbacks.forEach(callback => {
            callback(room);
          });
        } else {
          this.pendingRoomUpdate = room;
        }
      }
    } catch (error) {
      console.error('Error joining matchmaking:', error);
      throw error;
    }
  }

  // Set callback for room updates
  public setRoomUpdateCallback(callback: (room: GameRoom) => void): void {
    this.onRoomUpdateCallbacks.push(callback);

    // Process any pending update with all callbacks
    if (this.pendingRoomUpdate) {
      this.onRoomUpdateCallbacks.forEach(cb => {
        cb(this.pendingRoomUpdate!);
      });
      this.pendingRoomUpdate = null;
    }
  }

  // Submit board and mark ready
  public async submitBoard(): Promise<void> {
    if (!this.roomId) {
      throw new Error('Not in a room');
    }

    const serializedBoard = this.serializeBoard(this.playerBoard);

    await setPlayerReady(this.roomId, this.playerId, serializedBoard);
  }

  // Make a move (fire at opponent's board)
  public async takeTurn(coordinates: Coordinates): Promise<boolean> {
    if (!this.roomId) {
      throw new Error('Not in a room');
    }

    if (!this.isCurrPlayerTurn) {
      throw new Error('Not your turn');
    }

    // Check if already fired at this position
    const moveKey = `${coordinates.row.toString()}-${coordinates.col.toString()}`;

    if (this.processedPlayerMoves.has(moveKey)) {
      throw new Error('Already fired at this position');
    }

    try {
      // Get opponent's actual board from room
      const opponentBoard = await this.getOpponentBoardFromRoom();

      // Make move on Firebase
      const result = await makeMove(
        this.roomId,
        this.playerId,
        coordinates.row,
        coordinates.col,
        opponentBoard
      );

      // Update local opponent board for display
      this.opponentBoard.fire(coordinates);
      this.processedPlayerMoves.add(moveKey);

      // Mark the grid cell to indicate hit
      if (result.hit) {
        // @ts-expect-error - Storing hit marker for visual display
        this.opponentBoard.grid[coordinates.row][coordinates.col] = 1;

        // Check if we won
        await this.checkVictory();
      }

      return result.hit;
    } catch (error) {
      console.error('Error making move:', error);
      throw error;
    }
  }

  // Place ship on player board
  public successfullyPlace(
    board: Board,
    ship: Ship,
    isRandom: boolean,
    manualRow = 0,
    manualCol = 0,
    isVertical = false
  ): boolean {
    let coords: Coordinates;

    if (isRandom) {
      let randomIsVertical = Math.random() < 0.5;

      coords = {
        row: Math.floor(Math.random() * 10),
        col: Math.floor(Math.random() * 10)
      };

      while (!board.place(ship, coords, randomIsVertical)) {
        randomIsVertical = Math.random() < 0.5;
        coords = {
          row: Math.floor(Math.random() * 10),
          col: Math.floor(Math.random() * 10)
        };
      }

      ship.isVertical = randomIsVertical;
      ship.coords = coords;

      return true;
    } else {
      coords = { row: manualRow, col: manualCol };

      if (!board.place(ship, coords, isVertical)) {
        return false;
      }

      ship.isVertical = isVertical;
      ship.coords = coords;

      return true;
    }
  }

  // Place all ships randomly
  public randomPlace(): void {
    this.playerBoard = new Board();
    const shipLengths = [5, 4, 3, 3, 2];

    for (const length of shipLengths) {
      const ship = new Ship(length);

      this.successfullyPlace(this.playerBoard, ship, true);
    }
  }

  // Clean up and leave room
  public async cleanup(): Promise<void> {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }

    if (this.roomId) {
      await leaveRoom(this.roomId, this.playerId);
      this.roomId = null;
    }

    this.processedOpponentMoves.clear();
    this.processedPlayerMoves.clear();
  }

  // Helper: Convert board grid to number[][] for Firebase
  private serializeBoard(board: Board): number[][] {
    return board.grid.map(row =>
      row.map(cell => {
        if (cell === null) return 0;

        // Ship object - return its length as identifier (1-5)
        return cell.length;
      })
    );
  }

  // Helper: Reconstruct 2D array from flattened array
  private deserializeBoard(flatBoard: number[]): number[][] {
    const board2D: number[][] = [];

    for (let i = 0; i < 10; i++) {
      board2D.push(flatBoard.slice(i * 10, (i + 1) * 10));
    }

    return board2D;
  }

  // Set up real-time subscription to room changes
  private setupRoomSubscription(): void {
    if (!this.roomId) return;

    this.unsubscribe = subscribeToRoom(this.roomId, (room: GameRoom | null) => {
      if (!room) return;

      // Update room status
      this.roomStatus = room.status;

      // Determine if this player is player1
      this.isPlayer1 = room.player1.uid === this.playerId;

      // Set opponent ID
      if (room.player2) {
        this.opponentId = this.isPlayer1 ? room.player2.uid : room.player1.uid;
      }

      // Update turn state
      if (room.currentTurn) {
        this.isCurrPlayerTurn = room.currentTurn === this.playerId;
      }

      // Sync opponent's moves to our player board
      if (this.opponentId) {
        const opponentMoves = room.moves?.[this.opponentId] ?? [];

        opponentMoves.forEach(move => {
          const moveKey = `${move.row.toString()}-${move.col.toString()}`;

          if (!this.processedOpponentMoves.has(moveKey)) {
            this.playerBoard.fire({ row: move.row, col: move.col });
            this.processedOpponentMoves.add(moveKey);
          }
        });
      }

      // Sync our moves to opponent board (for visual display)
      const ourMoves = room.moves?.[this.playerId] ?? [];

      ourMoves.forEach(move => {
        const moveKey = `${move.row.toString()}-${move.col.toString()}`;

        if (!this.processedPlayerMoves.has(moveKey)) {
          this.opponentBoard.fire({ row: move.row, col: move.col });

          // Mark hits visually on the grid
          if (move.hit) {
            // @ts-expect-error - Storing hit marker for visual display
            this.opponentBoard.grid[move.row][move.col] = 1;
          }

          this.processedPlayerMoves.add(moveKey);
        }
      });

      // Check for winner
      if (room.winner) {
        if (room.winner === this.playerId) {
          this.playerVictorious = 1;
        } else {
          this.playerVictorious = 2;
        }
      }

      // Call all external callbacks
      if (this.onRoomUpdateCallbacks.length > 0) {
        this.onRoomUpdateCallbacks.forEach(callback => {
          callback(room);
        });
      } else {
        this.pendingRoomUpdate = room;
      }
    });
  }

  // Get opponent's board from Firebase
  private async getOpponentBoardFromRoom(): Promise<number[][]> {
    if (!this.roomId) {
      throw new Error('Not in a room');
    }

    const { getDoc, doc } = await import('firebase/firestore');
    const { firestore } = await import('@/config/firebase.ts');

    const roomRef = doc(firestore, 'rooms', this.roomId);
    const snapshot = await getDoc(roomRef);

    if (!snapshot.exists()) {
      throw new Error('Room does not exist');
    }

    const room = snapshot.data() as GameRoom;
    const opponentData = this.isPlayer1 ? room.player2 : room.player1;

    if (!opponentData?.board) {
      throw new Error('Opponent board not available');
    }

    return this.deserializeBoard(opponentData.board as unknown as number[]);
  }

  // Check if all opponent ships are sunk
  private async checkVictory(): Promise<void> {
    if (!this.roomId) return;

    const opponentBoard = await this.getOpponentBoardFromRoom();

    // Check if all ship cells are hit
    let allShipsSunk = true;

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const cell = opponentBoard[i][j];

        // If there's a ship cell (1-5)
        if (cell > 0 && cell <= 5) {
          // Check if this cell has been hit by checking our moves
          const moveKey = `${i.toString()}-${j.toString()}`;

          if (!this.processedPlayerMoves.has(moveKey)) {
            allShipsSunk = false;
            break;
          }
        }
      }
      if (!allShipsSunk) break;
    }

    if (allShipsSunk) {
      await declareWinner(this.roomId, this.playerId);
      this.playerVictorious = 1;
    }
  }
}
