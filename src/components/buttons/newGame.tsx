import { css } from '@emotion/css';
import { type JSXElement, type Setter } from 'solid-js';

import { COLOR_VARIABLES } from '@/app.tsx';
import { Player } from '@/game/player.ts';

export const NewGame = (props: {
  setGame: Setter<Player>;
  setIsControlUp: Setter<boolean>;
  overlay?: HTMLDivElement;
}): JSXElement => {
  return (
    <button
      type='button'
      onClick={() => {
        props.setGame(new Player());
        props.setIsControlUp(true);
        if (props.overlay) props.overlay.style.display = 'none';
      }}
      class={css`
        border: 0;
        border-radius: 0.125rem;
        cursor: pointer;
        font-size: 1.5rem;
        font-weight: 500;
        padding: 0.75rem;
        min-width: 7.625rem;
        background-color: ${COLOR_VARIABLES.secondary};
        color: ${COLOR_VARIABLES.grid};
        outline: 2px solid ${COLOR_VARIABLES.grid};
        transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
          background-color: ${COLOR_VARIABLES.hover};
        }
      `}>
      New Game
    </button>
  );
};
