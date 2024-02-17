import { Board, type Coordinates } from '@/game/board.ts';
import { Ship } from '@/game/ship.ts';

export class Player {
  public playerVictorious: number | null;
  public playerOneBoard: Board;
  public playerTwoBoard: Board;
  public isCurrPlayerOne: boolean;
  public pve: boolean;

  public constructor(isRandom = false) {
    this.playerVictorious = null;
    this.playerOneBoard = new Board();
    this.playerTwoBoard = new Board();
    if (isRandom) this.randomPlace(this.playerOneBoard);
    this.randomPlace(this.playerTwoBoard);
    this.isCurrPlayerOne = true;
    this.pve = true;
  }

  public takeTurn(coordinates: Coordinates): boolean {
    const currentPlayerBoard = this.isCurrPlayerOne
      ? this.playerTwoBoard
      : this.playerOneBoard;

    const isSuccessfulHit = currentPlayerBoard.fire(coordinates);
    if (isSuccessfulHit) {
      this.checkVictory();
      this.isCurrPlayerOne = !this.isCurrPlayerOne;
      return true;
    } else return false;
  }

  public computerTurn(): Coordinates {
    let coordinates: Coordinates;
    do {
      const randomRow = ~~(Math.random() * 10);
      const randomCol = ~~(Math.random() * 10);
      coordinates = { row: randomRow, col: randomCol };
    } while (!this.takeTurn(coordinates));
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

      if (!board.place(ship, coords, isVertical)) {
        console.log('Invalid Placement!');
        return false;
      }

      ship.isVertical = isVertical;
    }

    ship.coords = coords;
    board.place(ship, coords, ship.isVertical);
    return true;
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
    if (this.playerOneBoard.isGameOver()) {
      this.playerVictorious = 2;
      return true;
    }
    if (this.playerTwoBoard.isGameOver()) {
      this.playerVictorious = 1;
      return true;
    }
  }
}
