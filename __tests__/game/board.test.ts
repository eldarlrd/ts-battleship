import { Board } from '@/game/board.ts';
import { Ship } from '@/game/ship.ts';

describe('board class', () => {
  const cleanBoard = {
    grid: Array.from({ length: 10 }, () => Array<null>(10).fill(null)),
    impacts: []
  };
  const board = new Board();
  const patrolBoat = new Ship(2);
  it('returns a new board object', () => {
    expect(board).toMatchObject(cleanBoard);
  });

  it('places a ship', () => {
    board.place(patrolBoat, { row: 5, col: 5 }, false);
    expect(board).not.toMatchObject(cleanBoard);
  });

  it('fires at board', () => {
    const hitBoard = {
      impacts: [{ row: 1, col: 1 }]
    };

    board.fire({ row: 1, col: 1 });
    expect(board).toMatchObject(hitBoard);
  });

  it('checks if all ships are sunk', () => {
    board.fire({ row: 5, col: 5 });
    board.fire({ row: 5, col: 6 });
    expect(board.isGameOver()).toBe(true);
  });
});
