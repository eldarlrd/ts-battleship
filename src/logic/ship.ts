import shipHitSound from '#/sfx/ship-hit.opus';
import shipSunkSound from '#/sfx/ship-sunk.opus';
import { playSound } from '@/lib/audio.ts';
import { type Coordinates } from '@/logic/board.ts';

interface ShipStats {
  length: number;
  sunk: boolean;
  hit(): void;
}

class Ship implements ShipStats {
  public length: number;
  public sunk: boolean;
  public coords: Coordinates;
  public isVertical: boolean;
  private _hits: number;

  public constructor(length = 2) {
    this.length = length;
    this.sunk = false;
    this.coords = { row: 0, col: 0 };
    this.isVertical = false;
    this._hits = 0;
  }

  public hit(): void {
    if (!this.sunk) {
      this._hits++;
      this._isSunk();
    }
  }

  private _isSunk(): void {
    if (this._hits === this.length) {
      this.sunk = true;

      playSound(shipSunkSound);
    } else playSound(shipHitSound);
  }
}

export default Ship;
