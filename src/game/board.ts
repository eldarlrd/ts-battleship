import { type Ship } from '@/game/ship.ts';

interface Coordinates {
  row: number;
  col: number;
}

export class Board {
  private grid: (Ship | null)[][];
  private impacts: Coordinates[];

  public constructor() {
    this.grid = Array.from({ length: 10 }, () =>
      Array<Ship | null>(10).fill(null)
    );
    this.impacts = [];
  }

  public place(ship: Ship, start: Coordinates, isVertical: boolean): void {
    const { row, col } = start;
    const direction = isVertical ? 1 : 0;

    for (let i = 0; i < ship.length; i++)
      this.grid[row + i * direction][col + i * (1 - direction)] = ship;
  }

  public fire(coordinates: Coordinates): void {
    const { row, col } = coordinates;
    const target = this.grid[row][col];

    const isHitBefore = this.impacts.some(
      miss => miss.row === row && miss.col === col
    );

    if (!isHitBefore)
      if (target) {
        target.hit();
        this.impacts.push(coordinates);
      } else this.impacts.push(coordinates);
  }

  public isGameOver(): boolean {
    return this.grid
      .flat()
      .filter(cell => cell !== null)
      .every(ship => ship?.sunk);
  }
}
