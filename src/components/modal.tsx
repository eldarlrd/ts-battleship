import { css } from '@emotion/css';
import {
  createEffect,
  onCleanup,
  type JSXElement,
  type Setter
} from 'solid-js';

import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/app.tsx';
import { Player } from '@/game/player.ts';

// eslint-disable-next-line prefer-const
let victor: HTMLHeadingElement = document.getElementById(
  'victor'
) as HTMLHeadingElement;

export const Modal = (props: {
  game: Player;
  setGame: Setter<Player>;
  setIsControlUp: Setter<boolean>;
  overlay: HTMLDivElement;
}): JSXElement => {
  createEffect(() => {
    const handleModal = (): void => {
      if (props.game.playerVictorious) {
        props.overlay.style.display = 'flex';
        if (props.game.pve)
          victor.innerText =
            props.game.playerVictorious === 1
              ? 'Player Wins!'
              : 'Computer Wins...';
        else
          victor.innerText =
            props.game.playerVictorious === 1
              ? 'Player 1 Wins!'
              : 'Player 2 Wins!';
      }
    };

    document.addEventListener('attack', handleModal);
    onCleanup(() => {
      document.removeEventListener('attack', handleModal);
    });
  });

  return (
    <div
      ref={props.overlay}
      id='overlay'
      class={css`
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.75);
        justify-content: center;
        align-items: center;
        z-index: 1;
      `}>
      <section
        class={css`
          display: inherit;
          flex-direction: column;
          padding: 1rem;
          margin: 1rem;
          gap: 0.75rem;
          line-height: 1rem;
          background-color: ${COLOR_VARIABLES.primary};
          border: 2px solid ${COLOR_VARIABLES.secondary};
          border-radius: 0.125rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

          ${MEDIA_QUERIES.sm} {
            padding: 3rem;
          }

          ${MEDIA_QUERIES.md} {
            padding: 4rem;
          }

          ${MEDIA_QUERIES.lg} {
            padding: 5rem;
          }
        `}>
        <h1
          ref={victor}
          id='victor'
          class={css`
            font-size: 2.5rem;
            text-align: center;
            line-height: 1em;
          `}>
          {props.game.playerVictorious}
        </h1>

        <button
          type='button'
          onClick={() => {
            props.setGame(new Player());
            props.overlay.style.display = 'none';
            props.setIsControlUp(true);
          }}
          class={css`
            border: 0;
            border-radius: 0.125rem;
            cursor: pointer;
            font-size: 1.5rem;
            min-width: 7.625rem;
            font-weight: 500;
            padding: 0.75rem;
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
      </section>
    </div>
  );
};
