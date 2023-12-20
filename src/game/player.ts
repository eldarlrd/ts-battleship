import { Board, type Coordinates } from '@/game/board.ts';
import { Ship } from '@/game/ship.ts';

export class Player {
  public playerVictorious: number | null;
  public playerOneBoard: Board;
  public playerTwoBoard: Board;
  public isCurrPlayerOne: boolean;

  public constructor() {
    this.playerVictorious = null;
    this.playerOneBoard = new Board();
    this.playerTwoBoard = new Board();
    this.randomPlace(this.playerOneBoard);
    this.randomPlace(this.playerTwoBoard);
    this.isCurrPlayerOne = true;
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

  private randomPlace(board: Board): void {
    const carrier = new Ship(5);
    const battleship = new Ship(4);
    const destroyer = new Ship(3);
    const submarine = new Ship(3);
    const patrolBoat = new Ship(2);
    this.successfullyPlace(board, carrier);
    this.successfullyPlace(board, battleship);
    this.successfullyPlace(board, destroyer);
    this.successfullyPlace(board, submarine);
    this.successfullyPlace(board, patrolBoat);
  }

  private successfullyPlace(board: Board, ship: Ship): void {
    let isVertical = Math.random() < 0.5;
    let coords: Coordinates = {
      row: Math.floor(Math.random() * 10),
      col: Math.floor(Math.random() * 10)
    };

    while (!board.place(ship, coords, isVertical)) {
      isVertical = Math.random() < 0.5;
      coords = {
        row: ~~(Math.random() * 10),
        col: ~~(Math.random() * 10)
      };
    }

    board.place(ship, coords, isVertical);
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
