import shipSunk from '#/sfx/ship-sunk.opus';
import { type Coordinates } from '@/logic/board.ts';

interface ShipStats {
  length: number;
  sunk: boolean;
  hit(): void;
}

export class Ship implements ShipStats {
  public length: number;
  public sunk: boolean;
  public coords: Coordinates;
  public isVertical: boolean;
  private hits: number;

  public constructor(length = 2) {
    this.length = length;
    this.sunk = false;
    this.coords = { row: 0, col: 0 };
    this.isVertical = false;
    this.hits = 0;
  }

  public hit(): void {
    if (!this.sunk) {
      this.hits++;
      this.isSunk();
    }
  }

  private isSunk(): void {
    if (this.hits === this.length) {
      this.sunk = true;
      const shipSunkAudio = new Audio(shipSunk);

      void shipSunkAudio.play();
    }
  }
}
