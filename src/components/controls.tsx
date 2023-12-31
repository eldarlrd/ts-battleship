import { css } from '@emotion/css';
import { FaSolidUser } from 'solid-icons/fa';
import { IoDice } from 'solid-icons/io';
import { type Setter, type JSXElement, createSignal } from 'solid-js';

import { COLOR_VARIABLES } from '@/app.tsx';
import { Gameboard } from '@/components/gameboard.tsx';
import { Player } from '@/game/player.ts';

export const Controls = (props: {
  game: Player;
  setGame: Setter<Player>;
  setIsControlUp: Setter<boolean>;
}): JSXElement => {
  const [isDoneSetup, setIsDoneSetup] = createSignal(false);

  return (
    <div
      id='controls'
      class={css`
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
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
        `}>
        <h1
          class={css`
            text-align: center;
          `}>
          New Game
        </h1>
        <span
          class={css`
            font-size: 1.75rem;

            svg {
              font-size: 1.25rem;
            }
          `}>
          <FaSolidUser /> Player
        </span>
        <Gameboard isPlayerOneBoard={true} game={props.game} />
        <span
          class={css`
            text-align: end;
          `}>
          <button
            type='button'
            onClick={() => {
              props.setGame(new Player(true));
              setIsDoneSetup(true);
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
          disabled={!isDoneSetup()}
          onClick={() => {
            props.setIsControlUp(false);
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

            &:disabled {
              cursor: not-allowed;
              background-color: ${COLOR_VARIABLES.hover};
            }
          `}>
          Start
        </button>
      </section>
    </div>
  );
};
