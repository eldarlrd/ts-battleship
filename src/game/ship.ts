interface ShipStats {
  length: number;
  sunk: boolean;
  hit(): void;
}

export class Ship implements ShipStats {
  public length: number;
  public sunk: boolean;
  private hits: number;

  constructor(length = 2) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  public hit(): void {
    if (!this.sunk) {
      this.hits++;
      this.isSunk();
    }
  }

  private isSunk(): void {
    if (this.hits === this.length) this.sunk = true;
  }
}
