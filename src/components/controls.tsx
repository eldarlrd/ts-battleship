import { css } from '@emotion/css';
import { FaSolidUser, FaSolidRotateRight } from 'solid-icons/fa';
import { IoDice, IoTrashBin } from 'solid-icons/io';
import { type Setter, type JSXElement, createSignal } from 'solid-js';

import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/app.tsx';
import restartSound from '@/assets/sfx/restart.opus';
import { BoardControl } from '@/components/buttons/boardControl.tsx';
import { Gameboard } from '@/components/gameboard.tsx';
import { Player } from '@/game/player.ts';

export const Controls = (props: {
  game: Player;
  setGame: Setter<Player>;
  setIsControlUp: Setter<boolean>;
}): JSXElement => {
  const [isDoneSetup, setIsDoneSetup] = createSignal(false);
  const restartAudio = new Audio(restartSound);

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

        <div
          id='panel'
          class={css`
            display: inherit;
            justify-content: flex-end;
            gap: 0.5rem;
          `}>
          <div id='ship-selection' class={css``} />

          <BoardControl
            handleAction={() => {
              console.log('rotate');
            }}
            icon={<FaSolidRotateRight />}
            title='Rotate'
          />

          <BoardControl
            handleAction={() => {
              props.setGame(new Player(true));
              setIsDoneSetup(true);
            }}
            icon={<IoDice />}
            title='Randomize'
          />

          <BoardControl
            handleAction={() => {
              console.log('clear');
            }}
            icon={<IoTrashBin />}
            title='Clear'
          />
        </div>

        <button
          type='button'
          disabled={!isDoneSetup()}
          onClick={() => {
            props.setIsControlUp(false);
            restartAudio.play().catch((error: unknown) => {
              if (error instanceof Error) console.error(error);
            });
          }}
          class={css`
            border: 0;
            border-radius: 0.125rem;
            cursor: pointer;
            font-size: 1.5rem;
            font-weight: 500;
            min-width: 7.625rem;
            padding: 0.5rem;
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

            ${MEDIA_QUERIES.md} {
              padding: 0.75rem;
            }
          `}>
          Start
        </button>
      </section>
    </div>
  );
};
