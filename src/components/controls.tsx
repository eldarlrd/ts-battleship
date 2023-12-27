import { css } from '@emotion/css';
import { IoDice } from 'solid-icons/io';
import { type Setter, type JSXElement } from 'solid-js';

import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/app.tsx';
import { Player } from '@/game/player.ts';

export const Controls = (props: {
  setGame: Setter<Player>;
  setIsControlUp: Setter<boolean>;
}): JSXElement => {
  return (
    <div
      id='controls'
      class={css`
        display: flex;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.75);
        justify-content: center;
        align-items: center;
        z-index: 1;
      `}>
      <section
        class={css`
          display: inherit;
          background: ${COLOR_VARIABLES.primary};
          flex-direction: column;
          padding: 1rem;
          margin: 1rem;
          gap: 0.75rem;
          line-height: 1rem;
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
        <span>
          <button
            type='button'
            onClick={() => {
              props.setGame(new Player());
            }}
            class={css`
              border: 0;
              border-radius: 0.125rem;
              cursor: pointer;
              font-size: 1.5rem;
              font-weight: 500;
              line-height: 1rem;
              padding: 0.75rem;
              background-color: ${COLOR_VARIABLES.secondary};
              color: ${COLOR_VARIABLES.grid};
              outline: 2px solid ${COLOR_VARIABLES.grid};
              transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

              &:hover {
                background-color: ${COLOR_VARIABLES.hover};
              }
            `}>
            <IoDice />
          </button>
        </span>

        <button
          type='button'
          onClick={() => {
            props.setGame(new Player());
          }}
          class={css`
            border: 0;
            border-radius: 0.125rem;
            cursor: pointer;
            font-size: 1.5rem;
            font-weight: 500;
            min-width: 7.625rem;
            padding: 0.75rem;
            background-color: ${COLOR_VARIABLES.secondary};
            color: ${COLOR_VARIABLES.grid};
            outline: 2px solid ${COLOR_VARIABLES.grid};
            transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

            &:hover {
              background-color: ${COLOR_VARIABLES.hover};
            }
          `}>
          Start
        </button>
      </section>
    </div>
  );
};
