import { Board, type Coordinates } from '@/logic/board.ts';
import { Ship } from '@/logic/ship.ts';

export class Player {
  public playerVictorious: number;
  public playerBoard: Board;
  public computerBoard: Board;
  public isCurrPlayerOne: boolean;

  // Computer Targeting System
  private targetMode: boolean;
  private targetQueue: Coordinates[];
  private hitHistory: Coordinates[];
  private currentDirection: { row: number; col: number } | null;

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
    return this.targetMode ? this.smartTarget() : this.hitRandom();
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
      this.resetTargetMode();

      return this.hitRandom();
    }

    const cell = this.playerBoard.grid[coordinates.row][coordinates.col];

    this.takeTurn(coordinates);

    if (cell !== null) {
      this.hitHistory.push(coordinates);

      if (cell.sunk) this.resetTargetMode();
      else this.updateTargetStrategy(coordinates);
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
    const current = { ...firstHit };

    this.targetQueue = [];

    let next = {
      row: current.row + this.currentDirection.row,
      col: current.col + this.currentDirection.col
    };

    while (this.isValidTarget(next)) {
      this.targetQueue.push({ ...next });
      next = {
        row: next.row + this.currentDirection.row,
        col: next.col + this.currentDirection.col
      };
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
  }

  private hitRandom(): Coordinates {
    let coordinates: Coordinates;

    do {
      const randomRow = ~~(Math.random() * 10);
      const randomCol = ~~(Math.random() * 10);

      coordinates = { row: randomRow, col: randomCol };
    } while (!this.takeTurn(coordinates));

    const cell = this.playerBoard.grid[coordinates.row][coordinates.col];

    if (cell !== null && !cell.sunk) {
      this.targetMode = true;
      this.hitHistory.push(coordinates);
      this.addCardinalDirections(coordinates);
    }

    return coordinates;
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
