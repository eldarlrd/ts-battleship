import { css } from '@emotion/css';
import { CgSpinnerTwoAlt } from 'solid-icons/cg';
import {
  FaSolidUser,
  FaSolidRightLong,
  FaSolidDownLong,
  FaSolidShip
} from 'solid-icons/fa';
import { IoChevronBackSharp, IoDice, IoTrashBin } from 'solid-icons/io';
import { type JSXElement, createSignal, onMount, untrack } from 'solid-js';

import shipClearSound from '#/sfx/clear.opus';
import shipDeploySound from '#/sfx/deploy.opus';
import startSound from '#/sfx/start.opus';
import BoardControl from '@/components/buttons/BoardControl.tsx';
import { SHIP_COUNT, SHIPS } from '@/config/rules.ts';
import {
  COLOR_VARIABLES,
  MATCHMAKING_STATUS,
  MEDIA_QUERIES
} from '@/config/site.ts';
import errorToast from '@/config/toast.ts';
import Gameboard from '@/features/Gameboard.tsx';
import { playSound } from '@/lib/audio.ts';
import Board from '@/logic/board.ts';
import OnlinePlayer from '@/logic/onlinePlayer.ts';
import Player from '@/logic/player.ts';
import { type GameControls } from '@/models/gamecontrols.model.ts';

const Controls = (props: GameControls): JSXElement => {
  const [isVertical, setIsVertical] = createSignal(false);
  const [isDoneSetup, setIsDoneSetup] = createSignal(false);
  const [waitingForOpponent, setWaitingForOpponent] = createSignal(false);
  const [shipInfo, setShipInfo] = createSignal((<></>) as HTMLSpanElement);
  const [placementRefreshTrigger, setPlacementRefreshTrigger] = createSignal(0);
  const [startButton, setStartButton] = createSignal(
    (<></>) as HTMLButtonElement
  );

  onMount(() => {
    setShipInfo(document.getElementById('ship-info') as HTMLSpanElement);
    setStartButton(
      document.getElementById('start-button') as HTMLButtonElement
    );

    if (props.gameMode === 'pvp' && props.game instanceof OnlinePlayer) {
      const onlineGame = props.game;

      // eslint-disable-next-line solid/reactivity
      onlineGame.setRoomUpdateCallback(room => {
        if (room?.status === 'playing' && untrack(waitingForOpponent)) {
          setWaitingForOpponent(false);
          props.setIsControlUp(false);
          playSound(startSound);
        }
      });
    }
  });

  const handleStartGame = async (): Promise<void> => {
    if (props.gameMode === 'pvp') {
      const onlineGame = props.game as OnlinePlayer;

      try {
        setWaitingForOpponent(true);
        await onlineGame.submitBoard();
      } catch (error: unknown) {
        if (error instanceof Error) {
          errorToast(error.message);
          console.error(error.message, error);
        }
        setWaitingForOpponent(false);

        return;
      }
    } else {
      props.setIsControlUp(false);
      playSound(startSound);
    }
  };

  return (
    <div
      id='controls'
      class={css`
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      `}>
      <section
        class={css`
          margin: 1rem;
          gap: 0.75rem;
          padding: 1rem;
          max-width: 98%;
          width: 23.75rem;
          display: inherit;
          line-height: 1rem;
          min-width: fit-content;
          flex-direction: column;
          border-radius: 0.125rem;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          background: ${COLOR_VARIABLES.primary};
          border: 0.125rem solid ${COLOR_VARIABLES.secondary};
        `}>
        <div
          class={css`
            display: inherit;
          `}>
          <button
            type='button'
            onClick={() => {
              if (props.game instanceof OnlinePlayer) void props.game.cleanup();
              void props.setGameMode(null);
            }}
            class={css`
              z-index: 1;
              width: 3rem;
              border: none;
              height: 3.5rem;
              cursor: pointer;
              display: inherit;
              font-size: 1.625rem;
              align-items: center;
              padding: 0.125rem 0 0;
              background: transparent;
              color: ${COLOR_VARIABLES.secondary};

              &:active {
                color: ${COLOR_VARIABLES.hover};
              }

              ${MEDIA_QUERIES.mouse} {
                &:hover {
                  color: ${COLOR_VARIABLES.hover};
                }
              }
            `}>
            <IoChevronBackSharp size='2rem' />
          </button>
          <h1
            class={css`
              flex-grow: 1;
              text-align: center;
              margin-left: -2rem;
            `}>
            New Game
          </h1>
        </div>
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
          isPlacing={true}
          game={props.game}
          isPlayerBoard={true}
          shipInfo={shipInfo()}
          isVertical={isVertical()}
          startButton={startButton()}
          setIsDoneSetup={setIsDoneSetup}
          placementRefreshTrigger={placementRefreshTrigger}
        />

        <div
          id='panel'
          class={css`
            gap: 0.5rem;
            display: inherit;
            align-items: center;
            justify-content: space-between;
          `}>
          <span
            id='ship-selection'
            class={css`
              font-size: 1.5rem;

              svg {
                font-size: 1.375rem;
                vertical-align: middle;
                padding-right: 0.375rem;
              }

              ${MEDIA_QUERIES.md} {
                font-size: 1.625rem;

                svg {
                  font-size: 1.5rem;
                }
              }

              ${MEDIA_QUERIES.lg} {
                font-size: 1.75rem;

                svg {
                  font-size: 1.75rem;
                }
              }
            `}>
            <FaSolidShip />
            <span id='ship-info'>{SHIPS[0]}</span>
          </span>

          <span
            class={css`
              gap: 0.5rem;
              display: inherit;
            `}>
            <BoardControl
              handleAction={() => {
                setIsVertical(prev => !prev);
              }}
              isDisabled={waitingForOpponent()}
              icon={isVertical() ? <FaSolidDownLong /> : <FaSolidRightLong />}
              title='Rotate'
            />

            <BoardControl
              handleAction={() => {
                if (props.gameMode === 'pve') {
                  props.setGame(new Player(true));
                  props.game.playerBoard.shipsPlaced = SHIP_COUNT;
                } else {
                  const onlineGame = props.game as OnlinePlayer;

                  onlineGame.randomPlace();
                  onlineGame.playerBoard.shipsPlaced = SHIP_COUNT;
                }
                playSound(shipDeploySound);
                setIsDoneSetup(true);
                shipInfo().innerText = 'Combat ready!';

                if (props.gameMode === 'pvp')
                  setPlacementRefreshTrigger(prev => prev + 1);
              }}
              isDisabled={waitingForOpponent()}
              icon={<IoDice />}
              title='Randomize'
            />

            <BoardControl
              handleAction={() => {
                if (props.gameMode === 'pve') props.setGame(new Player());
                else {
                  const onlineGame = props.game as OnlinePlayer;

                  onlineGame.playerBoard = new Board();
                  onlineGame.playerBoard.shipsPlaced = 0;
                }
                playSound(shipClearSound);
                setIsDoneSetup(false);
                shipInfo().innerText = SHIPS[0];
                startButton().disabled = true;

                if (props.gameMode === 'pvp')
                  setPlacementRefreshTrigger(prev => prev + 1);
              }}
              isDisabled={waitingForOpponent()}
              icon={<IoTrashBin />}
              title='Clear'
            />
          </span>
        </div>

        {waitingForOpponent() ?
          <div
            class={css`
              gap: 0.5rem;
              padding: 1rem;
              display: flex;
              line-height: 1;
              height: 3.25rem;
              font-size: 1.5rem;
              text-align: center;
              align-items: center;
              justify-content: center;
            `}>
            <CgSpinnerTwoAlt
              class={css`
                animation: spin 1.5s linear infinite;

                @keyframes spin {
                  to {
                    transform: rotate(360deg);
                  }
                }
              `}
            />
            {MATCHMAKING_STATUS.waitingForSetup}
          </div>
        : <button
            type='button'
            id='start-button'
            disabled={!isDoneSetup()}
            onClick={() => {
              void handleStartGame();
            }}
            class={css`
              border: 0;
              cursor: pointer;
              height: 3.25rem;
              padding: 0.5rem;
              font-weight: 500;
              font-size: 1.5rem;
              min-width: 7.625rem;
              border-radius: 0.125rem;
              color: ${COLOR_VARIABLES.grid};
              background: ${COLOR_VARIABLES.secondary};
              outline: 0.125rem solid ${COLOR_VARIABLES.grid};
              transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

              &:active {
                background: ${COLOR_VARIABLES.hover};
              }

              ${MEDIA_QUERIES.mouse} {
                &:hover {
                  background: ${COLOR_VARIABLES.hover};
                }
              }

              &:disabled {
                cursor: not-allowed;
                background: ${COLOR_VARIABLES.hover};
              }

              ${MEDIA_QUERIES.md} {
                padding: 0.75rem;
              }
            `}>
            Start
          </button>
        }
      </section>
    </div>
  );
};

export default Controls;
