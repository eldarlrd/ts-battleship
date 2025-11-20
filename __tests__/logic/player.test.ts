import { GRID_SIZE, SHIP_LENGTHS } from '@/config/rules.ts';
import successfullyPlace from '@/lib/placement.ts';
import Player from '@/logic/player.ts';
import Ship from '@/logic/ship.ts';

describe('player interface', () => {
  it('players take turns', () => {
    const game = new Player(true);

    while (!game.playerVictorious)
      for (let row = 0; row < GRID_SIZE; row++)
        for (let col = 0; col < GRID_SIZE; col++) game.takeTurn({ row, col });

    expect(game.playerVictorious).not.toBe(0);
  });

  it('computer takes a turn', () => {
    const game = new Player(true);

    game.isCurrPlayerOne = false;

    while (!game.playerVictorious)
      for (let row = 0; row < GRID_SIZE; row++)
        for (let col = 0; col < GRID_SIZE; col++) {
          game.takeTurn({ row, col });
          game.computerTurn();
        }

    expect(game.playerVictorious).not.toBe(0);
  });

  it('players place ships manually', () => {
    const game = new Player();
    const shipLength = SHIP_LENGTHS[game.playerBoard.shipsPlaced];
    const ship = new Ship(shipLength);

    const validPlacement = successfullyPlace(
      game.playerBoard,
      ship,
      false,
      0,
      0,
      false
    );

    const invalidPlacement = successfullyPlace(
      game.playerBoard,
      ship,
      false,
      1,
      5,
      true
    );

    expect([validPlacement, invalidPlacement]).toStrictEqual([true, false]);
  });
});
