import { type Timestamp } from 'firebase/firestore';

import { type Status } from '@/config/rules.ts';

interface MoveResult {
  row: number;
  col: number;
  hit: boolean;
  sunk?: boolean;
}

interface Move extends MoveResult {
  sunkShipLength?: number;
}

interface PlayerBoard {
  uid: string;
  ready: boolean;
  board?: number[][];
}

interface GameRoom {
  id: string;
  player1: PlayerBoard;
  player2?: PlayerBoard;
  currentTurn?: string;
  status: Status;
  winner?: string;
  moves?: Record<string, Move[]>;
  sunkShipsCount?: Record<string, number>;
  expireAt: Timestamp;
}

export type { MoveResult, Move, PlayerBoard, GameRoom };
