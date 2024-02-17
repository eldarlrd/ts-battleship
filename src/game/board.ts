import { type Ship } from '@/game/ship.ts';

interface Coordinates {
  row: number;
  col: number;
}

class Board {
  public grid: (Ship | null)[][];
  public impacts: Coordinates[];
  public shipsPlaced: number;

  public constructor() {
    this.grid = Array.from({ length: 10 }, () =>
      Array<Ship | null>(10).fill(null)
    );
    this.impacts = [];
    this.shipsPlaced = 0;
  }

  public place(ship: Ship, start: Coordinates, isVertical: boolean): boolean {
    if (!this.isPlaceable(ship, start, isVertical)) return false;
    const { row, col } = start;
    const direction = isVertical ? 1 : 0;

    for (let i = 0; i < ship.length; i++)
      this.grid[row + i * direction][col + i * (1 - direction)] = ship;
    return true;
  }

  public fire(coordinates: Coordinates): boolean {
    const { row, col } = coordinates;
    const target = this.grid[row][col];

    const isHitBefore = this.impacts.some(
      miss => miss.row === row && miss.col === col
    );

    if (!isHitBefore) {
      if (target) {
        target.hit();
        this.impacts.push(coordinates);
      } else this.impacts.push(coordinates);
      return true;
    }
    return false;
  }

  public isGameOver(): boolean {
    return this.grid
      .flat()
      .filter(cell => cell !== null)
      .every(ship => ship?.sunk);
  }

  private isPlaceable(
    ship: Ship,
    start: Coordinates,
    isVertical: boolean
  ): boolean {
    const { row, col } = start;
    const direction = isVertical ? 1 : 0;

    for (let i = 0; i < ship.length; i++) {
      const nextRow = row + i * direction;
      const nextCol = col + i * (1 - direction);

      if (nextRow < 0 || nextRow >= 10 || nextCol < 0 || nextCol >= 10)
        return false;
      if (this.grid[nextRow][nextCol] !== null) return false;
      if (this.isAdjacent(nextRow, nextCol)) return false;
    }
    return true;
  }

  private isAdjacent(row: number, col: number): boolean {
    const adjOffset = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
      { row: -1, col: -1 },
      { row: -1, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 1 }
    ];

    for (const offset of adjOffset) {
      const adjRow = row + offset.row;
      const adjCol = col + offset.col;

      if (
        adjRow >= 0 &&
        adjRow < 10 &&
        adjCol >= 0 &&
        adjCol < 10 &&
        this.grid[adjRow][adjCol]
      )
        return true;
    }
    return false;
  }
}

export { type Coordinates, Board };
