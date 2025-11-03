import { Board, type Coordinates } from '@/logic/board.ts';
import { Ship } from '@/logic/ship.ts';

export class Player {
  public playerVictorious: number;
  public playerBoard: Board;
  public computerBoard: Board;
  public isCurrPlayerOne: boolean;

  // * Computer Targeting System
  private targetMode: boolean;
  private targetQueue: Coordinates[];
  private hitHistory: Coordinates[];
  private currentDirection: { row: number; col: number } | null;

  // * Density Heatmap
  private readonly remainingShipLengths: number[];

  // * Parity Targeting: Checkerboard Pattern
  private useParity: boolean;
  private readonly parityOffset: number;

  public constructor(isRandom = false) {
    this.playerVictorious = 0;
    this.playerBoard = new Board();
    this.computerBoard = new Board();
    if (isRandom) this.randomPlace(this.playerBoard);
    this.randomPlace(this.computerBoard);
    this.isCurrPlayerOne = true;

    this.targetMode = false;
    this.targetQueue = [];
    this.hitHistory = [];
    this.currentDirection = null;

    this.remainingShipLengths = [5, 4, 3, 3, 2];

    this.useParity = true;
    this.parityOffset = Math.random() < 0.5 ? 0 : 1;
  }

  public takeTurn(coordinates: Coordinates): boolean {
    const currentPlayerBoard =
      this.isCurrPlayerOne ? this.computerBoard : this.playerBoard;

    const isSuccessfulHit = currentPlayerBoard.fire(coordinates);

    if (isSuccessfulHit) {
      this.checkVictory();
      this.isCurrPlayerOne = !this.isCurrPlayerOne;

      return true;
    } else return false;
  }

  public computerTurn(): Coordinates {
    return this.targetMode ? this.smartTarget() : this.hitWithHeatmap();
  }

  public successfullyPlace(
    board: Board,
    ship: Ship,
    isRandom: boolean,
    manualRow = 0,
    manualCol = 0,
    isVertical = false
  ): boolean {
    let coords: Coordinates;

    if (isRandom) {
      let randomIsVertical = Math.random() < 0.5;

      coords = {
        row: ~~(Math.random() * 10),
        col: ~~(Math.random() * 10)
      };

      while (!board.place(ship, coords, randomIsVertical)) {
        randomIsVertical = Math.random() < 0.5;
        coords = {
          row: ~~(Math.random() * 10),
          col: ~~(Math.random() * 10)
        };
      }

      ship.isVertical = randomIsVertical;
    } else {
      coords = {
        row: manualRow,
        col: manualCol
      };

      if (!board.place(ship, coords, isVertical)) return false;

      ship.isVertical = isVertical;
    }

    ship.coords = coords;
    board.place(ship, coords, ship.isVertical);

    return true;
  }

  private generateHeatmap(): number[][] {
    const heatmap = Array.from(
      { length: 10 },
      () => Array(10).fill(0) as number[]
    );

    // * Priority Target Weights
    const getWeight = (length: number): number => {
      return Math.pow(length, 1.5);
    };

    for (const shipLength of this.remainingShipLengths) {
      const weight = getWeight(shipLength);

      // Try Horizontal
      for (let row = 0; row < 10; row++)
        for (let col = 0; col <= 10 - shipLength; col++)
          if (this.canPlaceShip(row, col, shipLength, false))
            for (let i = 0; i < shipLength; i++)
              heatmap[row][col + i] += weight;

      // Try Vertical
      for (let row = 0; row <= 10 - shipLength; row++)
        for (let col = 0; col < 10; col++)
          if (this.canPlaceShip(row, col, shipLength, true))
            for (let i = 0; i < shipLength; i++)
              heatmap[row + i][col] += weight;
    }

    return heatmap;
  }

  private canPlaceShip(
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

  private matchesParity(coord: Coordinates): boolean {
    return (coord.row + coord.col) % 2 === this.parityOffset;
  }

  private hitWithHeatmap(): Coordinates {
    const heatmap = this.generateHeatmap();
    let maxHeat = -1;
    const bestTargets: Coordinates[] = [];

    const smallestShip = Math.min(...this.remainingShipLengths);

    if (smallestShip > 2) this.useParity = false;

    for (let row = 0; row < 10; row++)
      for (let col = 0; col < 10; col++) {
        const coord = { row, col };

        if (this.useParity && !this.matchesParity(coord)) continue;

        if (this.isValidTarget(coord))
          if (heatmap[row][col] > maxHeat) {
            maxHeat = heatmap[row][col];
            bestTargets.length = 0;
            bestTargets.push(coord);
          } else if (heatmap[row][col] === maxHeat) bestTargets.push(coord);
      }

    // Disable Parity if no targets
    if (bestTargets.length === 0 && this.useParity) {
      this.useParity = false;

      return this.hitWithHeatmap();
    }

    const coordinates =
      bestTargets[~~(Math.random() * bestTargets.length)] ||
      this.getRandomValidTarget();

    this.takeTurn(coordinates);

    const cell = this.playerBoard.grid[coordinates.row][coordinates.col];

    if (cell !== null && !cell.sunk) {
      this.targetMode = true;
      this.useParity = false;
      this.hitHistory.push(coordinates);
      this.addCardinalDirections(coordinates);
    }

    return coordinates;
  }

  private getRandomValidTarget(): Coordinates {
    let coordinates: Coordinates;

    do {
      coordinates = {
        row: ~~(Math.random() * 10),
        col: ~~(Math.random() * 10)
      };
    } while (!this.isValidTarget(coordinates));

    return coordinates;
  }

  private smartTarget(): Coordinates {
    let coordinates: Coordinates | null = null;

    while (this.targetQueue.length > 0) {
      const target = this.targetQueue.shift()!;

      if (this.isValidTarget(target)) {
        coordinates = target;
        break;
      }
    }

    if (coordinates === null) {
      if (this.currentDirection !== null && this.hitHistory.length > 0) {
        this.reverseDirection();

        while (this.targetQueue.length > 0) {
          const target = this.targetQueue.shift()!;

          if (this.isValidTarget(target)) {
            coordinates = target;
            break;
          }
        }
      }

      if (coordinates === null) {
        this.resetTargetMode();

        return this.hitWithHeatmap();
      }
    }

    const cell = this.playerBoard.grid[coordinates.row][coordinates.col];

    this.takeTurn(coordinates);

    if (cell !== null) {
      this.hitHistory.push(coordinates);

      if (cell.sunk) {
        const shipLength = cell.length;
        const index = this.remainingShipLengths.indexOf(shipLength);

        if (index > -1) this.remainingShipLengths.splice(index, 1);
        this.resetTargetMode();
      } else this.updateTargetStrategy(coordinates);
    } else if (this.currentDirection !== null && this.hitHistory.length > 0)
      this.reverseDirection();

    return coordinates;
  }

  private updateTargetStrategy(lastHit: Coordinates): void {
    if (this.hitHistory.length === 1) this.addCardinalDirections(lastHit);
    else if (this.hitHistory.length === 2) {
      const first = this.hitHistory[0];
      const second = this.hitHistory[1];

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

      this.targetQueue = [];
      this.continueInDirection(lastHit);
    } else this.continueInDirection(lastHit);
  }

  private addCardinalDirections(coord: Coordinates): void {
    const directions = [
      { row: -1, col: 0 }, // Up
      { row: 1, col: 0 }, // Down
      { row: 0, col: -1 }, // Left
      { row: 0, col: 1 } // Right
    ];

    this.targetQueue = directions
      .map(dir => ({
        row: coord.row + dir.row,
        col: coord.col + dir.col
      }))
      .filter(target => this.isValidTarget(target));
  }

  private continueInDirection(lastHit: Coordinates): void {
    if (this.currentDirection === null) return;

    const next = {
      row: lastHit.row + this.currentDirection.row,
      col: lastHit.col + this.currentDirection.col
    };

    if (this.isValidTarget(next)) this.targetQueue.unshift(next);
  }

  private reverseDirection(): void {
    if (this.currentDirection === null || this.hitHistory.length === 0) return;

    this.currentDirection = {
      row: -this.currentDirection.row,
      col: -this.currentDirection.col
    };

    const firstHit = this.hitHistory[0];
    let current = { ...firstHit };

    this.targetQueue = [];

    while (true) {
      current = {
        row: current.row + this.currentDirection.row,
        col: current.col + this.currentDirection.col
      };

      if (!this.isValidTarget(current)) break;

      this.targetQueue.push({ ...current });
    }
  }

  private isValidTarget(coord: Coordinates): boolean {
    const { row, col } = coord;

    if (row < 0 || row >= 10 || col < 0 || col >= 10) return false;

    return !this.playerBoard.impacts.some(
      impact => impact.row === row && impact.col === col
    );
  }

  private resetTargetMode(): void {
    this.targetMode = false;
    this.targetQueue = [];
    this.hitHistory = [];
    this.currentDirection = null;

    // Reset Parity
    if (this.remainingShipLengths.length > 0) {
      const smallestShip = Math.min(...this.remainingShipLengths);

      this.useParity = smallestShip === 2;
    }
  }

  private randomPlace(board: Board, isRandom = true): void {
    const carrier = new Ship(5);
    const battleship = new Ship(4);
    const destroyer = new Ship(3);
    const submarine = new Ship(3);
    const patrolBoat = new Ship(2);

    this.successfullyPlace(board, carrier, isRandom);
    this.successfullyPlace(board, battleship, isRandom);
    this.successfullyPlace(board, destroyer, isRandom);
    this.successfullyPlace(board, submarine, isRandom);
    this.successfullyPlace(board, patrolBoat, isRandom);
  }

  private checkVictory(): true | undefined {
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
