import { GRID_SIZE, SHIP_LENGTHS } from '@/config/rules.ts';
import successfullyPlace from '@/lib/placement.ts';
import { Board, type Coordinates } from '@/logic/board.ts';
import Ship from '@/logic/ship.ts';

class Player {
  public playerVictorious: number;
  public playerBoard: Board;
  public computerBoard: Board;
  public isCurrPlayerOne: boolean;

  // * Computer Targeting System
  public currentDirection: { row: number; col: number } | null;
  private _targetMode: boolean;
  private _targetQueue: Coordinates[];
  private _hitHistory: Coordinates[];

  // * Density Heatmap
  private readonly _remainingShipLengths: number[];

  // * Parity Targeting: Checkerboard Pattern
  private _useParity: boolean;
  private readonly _parityOffset: number;

  public constructor(isRandom = false) {
    this.playerVictorious = 0;
    this.playerBoard = new Board();
    this.computerBoard = new Board();
    if (isRandom) this._randomPlace(this.playerBoard);
    this._randomPlace(this.computerBoard);
    this.isCurrPlayerOne = true;

    this._targetMode = false;
    this._targetQueue = [];
    this._hitHistory = [];
    this.currentDirection = null;

    this._remainingShipLengths = [5, 4, 3, 3, 2];

    this._useParity = true;
    this._parityOffset = Math.random() < 0.5 ? 0 : 1;
  }

  public takeTurn(coordinates: Coordinates): boolean {
    const currentPlayerBoard =
      this.isCurrPlayerOne ? this.computerBoard : this.playerBoard;

    const isSuccessfulHit = currentPlayerBoard.fire(coordinates);

    if (isSuccessfulHit) {
      this._checkVictory();
      this.isCurrPlayerOne = !this.isCurrPlayerOne;

      return true;
    } else return false;
  }

  public computerTurn(): Coordinates {
    return this._targetMode ? this._smartTarget() : this._hitWithHeatmap();
  }

  public getRandomValidTarget(): Coordinates {
    let coordinates: Coordinates;

    do {
      coordinates = {
        row: ~~(Math.random() * GRID_SIZE),
        col: ~~(Math.random() * GRID_SIZE)
      };
    } while (!this._isValidTarget(coordinates));

    return coordinates;
  }

  private _generateHeatmap(): number[][] {
    const heatmap = Array.from(
      { length: GRID_SIZE },
      () => Array(GRID_SIZE).fill(0) as number[]
    );

    // * Priority Target Weights
    const getWeight = (length: number): number => {
      return Math.pow(length, 1.5);
    };

    for (const shipLength of this._remainingShipLengths) {
      const weight = getWeight(shipLength);

      // Try Horizontal
      for (let row = 0; row < GRID_SIZE; row++)
        for (let col = 0; col <= GRID_SIZE - shipLength; col++)
          if (this._canPlaceShip(row, col, shipLength, false))
            for (let i = 0; i < shipLength; i++)
              heatmap[row][col + i] += weight;

      // Try Vertical
      for (let row = 0; row <= GRID_SIZE - shipLength; row++)
        for (let col = 0; col < GRID_SIZE; col++)
          if (this._canPlaceShip(row, col, shipLength, true))
            for (let i = 0; i < shipLength; i++)
              heatmap[row + i][col] += weight;
    }

    return heatmap;
  }

  private _canPlaceShip(
    row: number,
    col: number,
    length: number,
    isVertical: boolean
  ): boolean {
    for (let i = 0; i < length; i++) {
      const checkRow = isVertical ? row + i : row;
      const checkCol = isVertical ? col : col + i;

      const isHit = this.playerBoard.impacts.some(
        impact => impact.row === checkRow && impact.col === checkCol
      );

      if (isHit) {
        const cell = this.playerBoard.grid[checkRow][checkCol];

        if (cell === null) return false;
      }
    }

    return true;
  }

  private _matchesParity(coord: Coordinates): boolean {
    return (coord.row + coord.col) % 2 === this._parityOffset;
  }

  private _hitWithHeatmap(): Coordinates {
    const heatmap = this._generateHeatmap();
    let maxHeat = -1;
    const bestTargets: Coordinates[] = [];

    const smallestShip = Math.min(...this._remainingShipLengths);

    if (smallestShip > 2) this._useParity = false;

    for (let row = 0; row < GRID_SIZE; row++)
      for (let col = 0; col < GRID_SIZE; col++) {
        const coord = { row, col };

        if (this._useParity && !this._matchesParity(coord)) continue;

        if (this._isValidTarget(coord))
          if (heatmap[row][col] > maxHeat) {
            maxHeat = heatmap[row][col];
            bestTargets.length = 0;
            bestTargets.push(coord);
          } else if (heatmap[row][col] === maxHeat) bestTargets.push(coord);
      }

    // Disable Parity if no targets
    if (bestTargets.length === 0 && this._useParity) {
      this._useParity = false;

      return this._hitWithHeatmap();
    }

    const coordinates =
      bestTargets[~~(Math.random() * bestTargets.length)] ||
      this.getRandomValidTarget();

    this.takeTurn(coordinates);

    const cell = this.playerBoard.grid[coordinates.row][coordinates.col];

    if (cell !== null && !cell.sunk) {
      this._targetMode = true;
      this._useParity = false;
      this._hitHistory.push(coordinates);
      this._addCardinalDirections(coordinates);
    }

    return coordinates;
  }

  private _smartTarget(): Coordinates {
    let coordinates: Coordinates | null = null;

    while (this._targetQueue.length > 0) {
      const target = this._targetQueue.shift()!;

      if (this._isValidTarget(target)) {
        coordinates = target;
        break;
      }
    }

    if (coordinates === null) {
      if (this.currentDirection !== null && this._hitHistory.length > 0) {
        this._reverseDirection();

        while (this._targetQueue.length > 0) {
          const target = this._targetQueue.shift()!;

          if (this._isValidTarget(target)) {
            coordinates = target;
            break;
          }
        }
      }

      if (coordinates === null) {
        this._resetTargetMode();

        return this._hitWithHeatmap();
      }
    }

    const cell = this.playerBoard.grid[coordinates.row][coordinates.col];

    this.takeTurn(coordinates);

    if (cell !== null) {
      this._hitHistory.push(coordinates);

      if (cell.sunk) {
        const shipLength = cell.length;
        const index = this._remainingShipLengths.indexOf(shipLength);

        if (index > -1) this._remainingShipLengths.splice(index, 1);
        this._resetTargetMode();
      } else this._updateTargetStrategy(coordinates);
    } else if (this.currentDirection !== null && this._hitHistory.length > 0)
      this._reverseDirection();

    return coordinates;
  }

  private _updateTargetStrategy(lastHit: Coordinates): void {
    if (this._hitHistory.length === 1) this._addCardinalDirections(lastHit);
    else if (this._hitHistory.length === 2) {
      const first = this._hitHistory[0];
      const second = this._hitHistory[1];

      if (first.row === second.row)
        // Horizontal
        this.currentDirection = {
          row: 0,
          col: second.col > first.col ? 1 : -1
        };
      else
        // Vertical
        this.currentDirection = {
          row: second.row > first.row ? 1 : -1,
          col: 0
        };

      this._targetQueue = [];
      this._continueInDirection(lastHit);
    } else this._continueInDirection(lastHit);
  }

  private _addCardinalDirections(coord: Coordinates): void {
    const directions = [
      { row: -1, col: 0 }, // Up
      { row: 1, col: 0 }, // Down
      { row: 0, col: -1 }, // Left
      { row: 0, col: 1 } // Right
    ];

    this._targetQueue = directions
      .map(dir => ({
        row: coord.row + dir.row,
        col: coord.col + dir.col
      }))
      .filter(target => this._isValidTarget(target));
  }

  private _continueInDirection(lastHit: Coordinates): void {
    if (this.currentDirection === null) return;

    const next = {
      row: lastHit.row + this.currentDirection.row,
      col: lastHit.col + this.currentDirection.col
    };

    if (this._isValidTarget(next)) this._targetQueue.unshift(next);
  }

  private _reverseDirection(): void {
    if (this.currentDirection === null || this._hitHistory.length === 0) return;

    this.currentDirection = {
      row: -this.currentDirection.row,
      col: -this.currentDirection.col
    };

    const firstHit = this._hitHistory[0];
    let current = { ...firstHit };

    this._targetQueue = [];

    while (true) {
      current = {
        row: current.row + this.currentDirection.row,
        col: current.col + this.currentDirection.col
      };

      if (!this._isValidTarget(current)) break;

      this._targetQueue.push({ ...current });
    }
  }

  private _isValidTarget(coord: Coordinates): boolean {
    const { row, col } = coord;

    if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE)
      return false;

    return !this.playerBoard.impacts.some(
      impact => impact.row === row && impact.col === col
    );
  }

  private _resetTargetMode(): void {
    this._targetMode = false;
    this._targetQueue = [];
    this._hitHistory = [];
    this.currentDirection = null;

    // Reset Parity
    if (this._remainingShipLengths.length > 0) {
      const smallestShip = Math.min(...this._remainingShipLengths);

      this._useParity = smallestShip === 2;
    }
  }

  private _randomPlace(board: Board, isRandom = true): void {
    for (const length of SHIP_LENGTHS) {
      const ship = new Ship(length);

      successfullyPlace(board, ship, isRandom);
    }
  }

  private _checkVictory(): true | undefined {
    if (this.playerBoard.isGameOver()) {
      this.playerVictorious = 2;

      return true;
    }
    if (this.computerBoard.isGameOver()) {
      this.playerVictorious = 1;

      return true;
    }
  }
}

export default Player;
