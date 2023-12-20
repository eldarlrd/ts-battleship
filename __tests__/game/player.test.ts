import { Player } from '@/game/player.ts';

describe('player interface', () => {
  it('players take turns', () => {
    const game = new Player();

    while (!game.playerVictorious)
      for (let row = 0; row < 10; row++)
        for (let col = 0; col < 10; col++) game.takeTurn({ row, col });

    expect(game.playerVictorious).not.toBeNull();
  });

  it('computer takes a turn', () => {
    const game = new Player();

    while (!game.playerVictorious) game.computerTurn();

    expect(game.playerVictorious).not.toBeNull();
  });
});
