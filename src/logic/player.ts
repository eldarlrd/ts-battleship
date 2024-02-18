import { Board, type Coordinates } from '@/logic/board.ts';
import { Ship } from '@/logic/ship.ts';

export class Player {
  public playerVictorious: number;
  public playerBoard: Board;
  public computerBoard: Board;
  public isCurrPlayerOne: boolean;

  public constructor(isRandom = false) {
    this.playerVictorious = 0;
    this.playerBoard = new Board();
    this.computerBoard = new Board();
    if (isRandom) this.randomPlace(this.playerBoard);
    this.randomPlace(this.computerBoard);
    this.isCurrPlayerOne = true;
  }

  public takeTurn(coordinates: Coordinates): boolean {
    const currentPlayerBoard = this.isCurrPlayerOne
      ? this.computerBoard
      : this.playerBoard;

    const isSuccessfulHit = currentPlayerBoard.fire(coordinates);
    if (isSuccessfulHit) {
      this.checkVictory();
      this.isCurrPlayerOne = !this.isCurrPlayerOne;
      return true;
    } else return false;
  }

  public computerTurn(): Coordinates {
    const coordinates = this.hitRandom();
    return coordinates;
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

  private hitRandom(): Coordinates {
    let coordinates: Coordinates;
    do {
      const randomRow = ~~(Math.random() * 10);
      const randomCol = ~~(Math.random() * 10);
      coordinates = { row: randomRow, col: randomCol };
    } while (!this.takeTurn(coordinates));
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
