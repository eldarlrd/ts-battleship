import { type Unsubscribe } from 'firebase/firestore';

import {
  ERROR_NO_CONNECTION,
  ERROR_NO_OPPONENT_BOARD,
  ERROR_NO_ROOM,
  ERROR_NOT_IN_ROOM,
  ERROR_NOT_YOUR_TURN
} from '@/config/errors.ts';
import { GRID_SIZE, SHIP_LENGTHS } from '@/config/rules.ts';
import { COLOR_VARIABLES } from '@/config/site.ts';
import { errorToast } from '@/config/toast.ts';
import { successfullyPlace } from '@/lib/placement.ts';
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
  public isPlayer1: boolean;
  public roomStatus: 'waiting' | 'ready' | 'playing' | 'finished';
  private _unsubscribe: Unsubscribe | null;
  private _onRoomUpdateCallbacks: ((room: GameRoom) => void)[];
  private _pendingRoomUpdate: GameRoom | null;
  private _processedOpponentMoves: Set<string>;
  private _processedPlayerMoves: Set<string>;

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
    this._unsubscribe = null;
    this._onRoomUpdateCallbacks = [];
    this._pendingRoomUpdate = null;
    this._processedOpponentMoves = new Set<string>();
    this._processedPlayerMoves = new Set<string>();
  }

  public get computerBoard(): Board {
    return this.opponentBoard;
  }

  public async joinMatchmaking(): Promise<void> {
    try {
      this.roomId = await findOrCreateRoom(this.playerId);
      this._setupRoomSubscription();

      const { getDoc, doc } = await import('firebase/firestore');
      const { firestore } = await import('@/config/firebase.ts');
      const roomRef = doc(firestore, 'rooms', this.roomId);
      const snapshot = await getDoc(roomRef);

      if (snapshot.exists()) {
        const room = { ...snapshot.data(), id: this.roomId } as GameRoom;

        if (this._onRoomUpdateCallbacks.length > 0)
          this._onRoomUpdateCallbacks.forEach(callback => {
            callback(room);
          });
        else this._pendingRoomUpdate = room;
      }
    } catch (error) {
      if (error instanceof Error) console.error(error.message, error);
      throw new Error(ERROR_NO_CONNECTION);
    }
  }

  public setRoomUpdateCallback(callback: (room: GameRoom) => void): void {
    this._onRoomUpdateCallbacks.push(callback);

    if (this._pendingRoomUpdate) {
      this._onRoomUpdateCallbacks.forEach(cb => {
        cb(this._pendingRoomUpdate!);
      });
      this._pendingRoomUpdate = null;
    }
  }

  public async submitBoard(): Promise<void> {
    if (!this.roomId) throw new Error(ERROR_NOT_IN_ROOM);

    const serializedBoard = this._serializeBoard(this.playerBoard);

    await setPlayerReady(this.roomId, this.playerId, serializedBoard);
  }

  public async takeTurn(coordinates: Coordinates): Promise<boolean> {
    if (!this.roomId) throw new Error(ERROR_NOT_IN_ROOM);

    if (!this.isCurrPlayerTurn) throw new Error(ERROR_NOT_YOUR_TURN);

    const moveKey = `${coordinates.row.toString()}-${coordinates.col.toString()}`;

    if (this._processedPlayerMoves.has(moveKey)) return false;

    try {
      const opponentBoard = await this._getOpponentBoardFromRoom();

      // Firebase move
      const result = await makeMove(
        this.roomId,
        this.playerId,
        coordinates.row,
        coordinates.col,
        opponentBoard
      );

      // Update local opponent board display
      this.opponentBoard.fire(coordinates);
      this._processedPlayerMoves.add(moveKey);

      if (result.sunk) {
        const shipElement = this._findSunkShipDetails(
          coordinates,
          opponentBoard
        );

        if (shipElement) {
          this._markSunkShipVisuals(shipElement.shipCells);
          this._markAdjacentMisses(shipElement.shipCells);
        }

        await this._checkVictory();
      } else if (result.hit) {
        // @ts-expect-error: Store hit marker for visual display
        this.opponentBoard.grid[coordinates.row][coordinates.col] = 1;
        await this._checkVictory();
      }

      return result.hit;
    } catch (error) {
      if (error instanceof Error) {
        errorToast(error.message);
        console.error(error.message, error);
      }

      return false;
    }
  }

  public async cleanup(): Promise<void> {
    if (this._unsubscribe) {
      this._unsubscribe();
      this._unsubscribe = null;
    }

    if (this.roomId) {
      await leaveRoom(this.roomId, this.playerId);
      this.roomId = null;
    }

    this._processedOpponentMoves.clear();
    this._processedPlayerMoves.clear();
  }

  public randomPlace(): void {
    this.playerBoard = new Board();

    for (const length of SHIP_LENGTHS) {
      const ship = new Ship(length);

      successfullyPlace(this.playerBoard, ship, true);
    }
  }

  private _findSunkShipDetails(
    hitCoord: Coordinates,
    fullBoard: number[][]
  ): { shipCells: Coordinates[]; length: number } | null {
    const shipLength = fullBoard[hitCoord.row][hitCoord.col];

    const shipCells: Coordinates[] = [];

    // Find all adjacent cells of a ship
    for (let r = 0; r < GRID_SIZE; r++)
      for (let c = 0; c < GRID_SIZE; c++)
        if (fullBoard[r][c] === shipLength) {
          const moveKey = `${r.toString()}-${c.toString()}`;

          if (this._processedPlayerMoves.has(moveKey))
            shipCells.push({ row: r, col: c });
        }

    return { shipCells, length: shipLength };
  }

  private _markSunkShipVisuals(shipCells: Coordinates[]): void {
    shipCells.forEach(coord => {
      // @ts-expect-error: Store hit marker for visual display
      this.opponentBoard.grid[coord.row][coord.col] = 2;
      const shipSunk = document.getElementById(
        'p2-' + (coord.row * GRID_SIZE + coord.col).toString()
      );

      if (shipSunk) {
        shipSunk.style.backgroundColor = COLOR_VARIABLES.shipSunk;
        shipSunk.style.cursor = 'default';
      }
    });
  }

  private _markAdjacentMisses(shipCells: Coordinates[]): void {
    shipCells.forEach(cell => {
      const adjCells = this.opponentBoard.hitAdjacent({
        row: cell.row,
        col: cell.col
      });

      adjCells.forEach(coord => {
        const adjHit = document.getElementById(
          'p2-' + (coord.row * GRID_SIZE + coord.col).toString()
        );

        if (adjHit) {
          adjHit.style.backgroundColor = COLOR_VARIABLES.emptyHit;
          adjHit.style.cursor = 'default';
        }
      });
    });
  }

  // Deconstruct into flat array
  private _serializeBoard(board: Board): number[][] {
    return board.grid.map(row =>
      row.map(cell => {
        if (cell === null) return 0;

        return cell.length;
      })
    );
  }

  // Reconstruct 2D array
  private _deserializeBoard(flatBoard: number[]): number[][] {
    const board2D: number[][] = [];

    for (let i = 0; i < GRID_SIZE; i++)
      board2D.push(flatBoard.slice(i * GRID_SIZE, (i + 1) * GRID_SIZE));

    return board2D;
  }

  private _setupRoomSubscription(): void {
    if (!this.roomId) return;

    this._unsubscribe = subscribeToRoom(
      this.roomId,
      (room: GameRoom | null) => {
        if (this._onRoomUpdateCallbacks.length > 0)
          this._onRoomUpdateCallbacks.forEach(callback => {
            callback(room!); // * Clears room on delete
          });
        else this._pendingRoomUpdate = room;

        if (!room) {
          if (this._unsubscribe) {
            this._unsubscribe();
            this._unsubscribe = null;
          }

          return;
        }

        this.roomStatus = room.status;
        this.isPlayer1 = room.player1.uid === this.playerId;

        if (room.player2)
          this.opponentId =
            this.isPlayer1 ? room.player2.uid : room.player1.uid;

        if (room.currentTurn)
          this.isCurrPlayerTurn = room.currentTurn === this.playerId;

        // Sync opponent moves to local board
        if (this.opponentId) {
          const opponentMoves = room.moves?.[this.opponentId] ?? [];

          opponentMoves.forEach(move => {
            const moveKey = `${move.row.toString()}-${move.col.toString()}`;

            if (!this._processedOpponentMoves.has(moveKey)) {
              this.playerBoard.fire({ row: move.row, col: move.col });
              this._processedOpponentMoves.add(moveKey);
            }
          });
        }

        // Sync local moves to opponent board
        const ourMoves = room.moves?.[this.playerId] ?? [];

        ourMoves.forEach(move => {
          const moveKey = `${move.row.toString()}-${move.col.toString()}`;

          if (!this._processedPlayerMoves.has(moveKey)) {
            this.opponentBoard.fire({ row: move.row, col: move.col });

            if (move.sunk)
              // @ts-expect-error: Store hit marker for visual display
              this.opponentBoard.grid[move.row][move.col] = 2;
            else if (move.hit)
              // @ts-expect-error: Store hit marker for visual display
              this.opponentBoard.grid[move.row][move.col] = 1;

            this._processedPlayerMoves.add(moveKey);
          }
        });

        if (room.winner)
          this.playerVictorious = room.winner === this.playerId ? 1 : 2;

        // Call all external callbacks
        if (this._onRoomUpdateCallbacks.length > 0)
          this._onRoomUpdateCallbacks.forEach(callback => {
            callback(room);
          });
        else this._pendingRoomUpdate = room;
      }
    );
  }

  private async _getOpponentBoardFromRoom(): Promise<number[][]> {
    if (!this.roomId) throw new Error(ERROR_NOT_IN_ROOM);

    const { getDoc, doc } = await import('firebase/firestore');
    const { firestore } = await import('@/config/firebase.ts');

    const roomRef = doc(firestore, 'rooms', this.roomId);
    const snapshot = await getDoc(roomRef);

    if (!snapshot.exists()) throw new Error(ERROR_NO_ROOM);

    const room = snapshot.data() as GameRoom;
    const opponentData = this.isPlayer1 ? room.player2 : room.player1;

    if (!opponentData?.board) throw new Error(ERROR_NO_OPPONENT_BOARD);

    return this._deserializeBoard(opponentData.board as unknown as number[]);
  }

  private async _checkVictory(): Promise<void> {
    if (!this.roomId) return;
    const opponentBoard = await this._getOpponentBoardFromRoom();
    let allShipsSunk = true;

    // Find all adjacent cells of a ship
    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const cell = opponentBoard[i][j];

        if (cell > 0 && cell <= 5) {
          const moveKey = `${i.toString()}-${j.toString()}`;

          if (!this._processedPlayerMoves.has(moveKey)) {
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
