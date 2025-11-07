import { css } from '@emotion/css';
import { type JSXElement, type Setter } from 'solid-js';

import newGameSound from '#/sfx/new-game.opus';
import { type GameMode } from '@/config/rules.ts';
import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/config/site.ts';
import { OnlinePlayer } from '@/logic/onlinePlayer.ts';
import { Player } from '@/logic/player.ts';

export const NewGame = (props: {
  game?: Player | OnlinePlayer;
  setGame: Setter<Player | OnlinePlayer>;
  setIsControlUp: Setter<boolean>;
  overlay?: HTMLDivElement;
  gameMode?: GameMode;
  setGameMode: Setter<GameMode | null>;
}): JSXElement => {
  const handleNewGame = async (): Promise<void> => {
    if (props.game && props.game instanceof OnlinePlayer)
      await props.game.cleanup();
    void new Audio(newGameSound).play();

    props.setGameMode(null);
    props.setGame(new Player());
    props.setIsControlUp(true);
    if (props.overlay) props.overlay.style.display = 'none';
  };

  return (
    <button
      type='button'
      onClick={() => {
        void handleNewGame();
      }}
      class={css`
        border: 0;
        border-radius: 0.125rem;
        cursor: pointer;
        font-size: 1.5rem;
        font-weight: 500;
        padding: 0.75rem;
        min-width: 7.625rem;
        background: ${COLOR_VARIABLES.secondary};
        color: ${COLOR_VARIABLES.grid};
        outline: 2px solid ${COLOR_VARIABLES.grid};
        transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

        &:active {
          background: ${COLOR_VARIABLES.hover};
        }

        ${MEDIA_QUERIES.mouse} {
          &:hover {
            background: ${COLOR_VARIABLES.hover};
          }
        }
      `}>
      New Game
    </button>
  );
};
