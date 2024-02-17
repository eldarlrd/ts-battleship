import { css } from '@emotion/css';
import {
  FaSolidUser,
  FaSolidRightLong,
  FaSolidDownLong,
  FaSolidShip
} from 'solid-icons/fa';
import { IoDice, IoTrashBin } from 'solid-icons/io';
import {
  type Setter,
  type JSXElement,
  createSignal,
  createEffect
} from 'solid-js';

import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/app.tsx';
import restartSound from '@/assets/sfx/restart.opus';
import { BoardControl } from '@/components/buttons/boardControl.tsx';
import { Gameboard } from '@/features/gameboard.tsx';
import { Player } from '@/game/player.ts';

export const Controls = (props: {
  game: Player;
  setGame: Setter<Player>;
  setIsControlUp: Setter<boolean>;
}): JSXElement => {
  const [isDoneSetup, setIsDoneSetup] = createSignal(false);
  const [isVertical, setIsVertical] = createSignal(false);
  const [shipInfo, setShipInfo] = createSignal((<></>) as HTMLSpanElement);
  const [startButton, setStartButton] = createSignal(
    (<></>) as HTMLButtonElement
  );
  const restartAudio = new Audio(restartSound);

  createEffect(() => {
    setShipInfo(document.getElementById('ship-info') as HTMLSpanElement);
    setStartButton(
      document.getElementById('start-button') as HTMLButtonElement
    );
  });

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
        <Gameboard
          isPlayerBoard={true}
          isPlacing={true}
          isVertical={isVertical()}
          game={props.game}
          shipInfo={shipInfo()}
          startButton={startButton()}
        />

        <div
          id='panel'
          class={css`
            display: inherit;
            justify-content: space-between;
            align-items: center;
            gap: 0.5rem;
          `}>
          <span
            id='ship-selection'
            class={css`
              font-size: 1.5rem;

              svg {
                font-size: 1rem;
                padding-right: 0.375rem;
              }

              ${MEDIA_QUERIES.md} {
                font-size: 1.625rem;

                svg {
                  font-size: 1.125rem;
                }
              }

              ${MEDIA_QUERIES.lg} {
                font-size: 1.75rem;

                svg {
                  font-size: 1.25rem;
                }
              }
            `}>
            <FaSolidShip />
            <span id='ship-info'>5 Carrier</span>
          </span>

          <span
            class={css`
              display: inherit;
              gap: 0.5rem;
            `}>
            <BoardControl
              handleAction={() => {
                setIsVertical(prev => !prev);
              }}
              icon={isVertical() ? <FaSolidDownLong /> : <FaSolidRightLong />}
              title='Rotate'
            />

            <BoardControl
              handleAction={() => {
                props.setGame(new Player(true));
                props.game.playerBoard.shipsPlaced = 5;
                setIsDoneSetup(true);
                shipInfo().innerText = 'All Placed';
              }}
              icon={<IoDice />}
              title='Randomize'
            />

            <BoardControl
              handleAction={() => {
                props.setGame(new Player());
                setIsDoneSetup(false);
                shipInfo().innerText = '5 Carrier';
                startButton().disabled = true;
              }}
              icon={<IoTrashBin />}
              title='Clear'
            />
          </span>
        </div>

        <button
          type='button'
          id='start-button'
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
