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
  status: Status;
  winner?: string;
  expireAt: Timestamp;
  currentTurn?: string;
  player1: PlayerBoard;
  player2?: PlayerBoard;
  moves?: Record<string, Move[]>;
  sunkShipsCount?: Record<string, number>;
}

export type { MoveResult, Move, PlayerBoard, GameRoom };
