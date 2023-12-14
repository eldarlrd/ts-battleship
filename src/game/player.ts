import { Board, type Coordinates } from '@/game/board.ts';
import { Ship } from '@/game/ship.ts';

export class Player {
  private playerOneBoard: Board;
  private playerTwoBoard: Board;
  private isCurrPlayerOne: boolean;

  public constructor() {
    this.playerOneBoard = new Board();
    this.playerTwoBoard = new Board();
    this.randomPlace(this.playerOneBoard);
    this.randomPlace(this.playerTwoBoard);
    this.isCurrPlayerOne = true;
  }

  public playerTurn(coordinates: Coordinates): void {
    const currentPlayerBoard = this.isCurrPlayerOne
      ? this.playerOneBoard
      : this.playerTwoBoard;

    const isSuccessfulHit = currentPlayerBoard.fire(coordinates);
    if (isSuccessfulHit) {
      this.checkVictory();
      this.isCurrPlayerOne = !this.isCurrPlayerOne;
    } else console.log('Has been hit before, try again.');
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

  private checkVictory(): void {
    if (this.playerOneBoard.isGameOver()) console.log('Player 2 wins!');
    else if (this.playerTwoBoard.isGameOver()) console.log('Player 1 wins!');
  }
}
