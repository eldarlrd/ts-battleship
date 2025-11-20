import missSound from '#/sfx/splash.opus';
import { GRID_SIZE } from '@/config/rules.ts';
import { playSound } from '@/lib/audio.ts';
import type Ship from '@/logic/ship.ts';

interface Coordinates {
  row: number;
  col: number;
}

class Board {
  public grid: (Ship | null)[][];
  public impacts: Coordinates[];
  public shipsPlaced: number;

  public constructor() {
    this.grid = Array.from({ length: GRID_SIZE }, () =>
      Array<Ship | null>(GRID_SIZE).fill(null)
    );
    this.impacts = [];
    this.shipsPlaced = 0;
  }

  public place(ship: Ship, start: Coordinates, isVertical: boolean): boolean {
    if (!this._isPlaceable(ship, start, isVertical)) return false;
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
      } else {
        playSound(missSound);
        this.impacts.push(coordinates);
      }

      return true;
    }

    return false;
  }

  public hitAdjacent(coordinates: Coordinates): Coordinates[] {
    return this._getAdjacent(coordinates).filter(coord => {
      const { row, col } = coord;

      if (this.grid[row][col] === null) {
        this.fire(coord);

        return true;
      }

      return false;
    });
  }

  public isGameOver(): boolean {
    return this.grid
      .flat()
      .filter(cell => cell !== null)
      .every(ship => ship.sunk);
  }

  private _isPlaceable(
    ship: Ship,
    start: Coordinates,
    isVertical: boolean
  ): boolean {
    const { row, col } = start;
    const direction = isVertical ? 1 : 0;

    for (let i = 0; i < ship.length; i++) {
      const nextRow = row + i * direction;
      const nextCol = col + i * (1 - direction);

      if (
        nextRow < 0 ||
        nextRow >= GRID_SIZE ||
        nextCol < 0 ||
        nextCol >= GRID_SIZE
      )
        return false;
      if (this.grid[nextRow][nextCol] !== null) return false;
      if (this._isAdjacent(nextRow, nextCol)) return false;
    }

    return true;
  }

  private _getAdjacent(coordinates: Coordinates): Coordinates[] {
    const { row, col } = coordinates;
    const adjOffsets = [
      { row: -1, col: 0 },
      { row: 1, col: 0 },
      { row: 0, col: -1 },
      { row: 0, col: 1 },
      { row: -1, col: -1 },
      { row: -1, col: 1 },
      { row: 1, col: -1 },
      { row: 1, col: 1 }
    ];

    return adjOffsets
      .map(offset => ({
        row: row + offset.row,
        col: col + offset.col
      }))
      .filter(
        coord =>
          coord.row >= 0 &&
          coord.row < this.grid.length &&
          coord.col >= 0 &&
          coord.col < this.grid[0].length
      );
  }

  private _isAdjacent(row: number, col: number): boolean {
    return this._getAdjacent({ row, col }).some(
      coord => this.grid[coord.row][coord.col] !== null
    );
  }
}

export { type Coordinates, Board };
