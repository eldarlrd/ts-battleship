import { Board } from '@/game/board.ts';
import { Ship } from '@/game/ship.ts';

describe('board class', () => {
  const cleanBoard = {
    grid: Array.from({ length: 10 }, () => Array<null>(10).fill(null)),
    impacts: []
  };
  const board = new Board();
  it('returns a new board object', () => {
    expect(board).toMatchObject(cleanBoard);
  });

  it('places a ship', () => {
    const carrier = new Ship(5);
    const battleship = new Ship(4);
    const submarine = new Ship(3);
    const destroyer = new Ship(3);
    const patrolBoat = new Ship(2);

    // Correct placement
    board.place(patrolBoat, { row: 5, col: 5 }, false);
    board.place(submarine, { row: 2, col: 2 }, true);

    // Out of bounds placement
    board.place(battleship, { row: 9, col: 7 }, false);

    // Overlapping placement
    board.place(destroyer, { row: 2, col: 2 }, false);

    // Adjacent placement
    board.place(carrier, { row: 6, col: 6 }, true);

    expect(board).not.toMatchObject(cleanBoard);
  });

  it('fires at board', () => {
    const hitBoard = {
      impacts: [{ row: 1, col: 1 }]
    };

    // Correct hit
    board.fire({ row: 1, col: 1 });

    // Overlapping hit
    board.fire({ row: 1, col: 1 });
    expect(board).toMatchObject(hitBoard);
  });

  it('checks if all ships are sunk', () => {
    // Sinking the Patrol Boat
    board.fire({ row: 5, col: 5 });
    board.fire({ row: 5, col: 6 });

    // Sinking the Submarine
    board.fire({ row: 2, col: 2 });
    board.fire({ row: 3, col: 2 });
    board.fire({ row: 4, col: 2 });
    expect(board.isGameOver()).toBe(true);
  });
});
