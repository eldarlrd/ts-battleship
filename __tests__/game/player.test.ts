import { Player } from '@/game/player.ts';

describe('player interface', () => {
  it('takes turns in the game', () => {
    const game = new Player();

    while (!game.playerVictorious)
      for (let row = 0; row < 10; row++)
        for (let col = 0; col < 10; col++) game.takeTurn({ row, col });

    expect(game.playerVictorious).not.toBeNull();
  });
});
