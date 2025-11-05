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
  onMount,
  untrack
} from 'solid-js';

import newGameSound from '#/sfx/new-game.opus';
import { BoardControl } from '@/components/buttons/BoardControl.tsx';
import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/config/site.ts';
import { Gameboard } from '@/features/Gameboard.tsx';
import { type GameMode } from '@/features/ModeSelection.tsx';
import { Board } from '@/logic/board.ts';
import { OnlinePlayer } from '@/logic/onlinePlayer.ts';
import { Player } from '@/logic/player.ts';

export const Controls = (props: {
  game: Player | OnlinePlayer;
  setGame: Setter<Player | OnlinePlayer>;
  setIsControlUp: Setter<boolean>;
  gameMode: GameMode;
}): JSXElement => {
  const [isDoneSetup, setIsDoneSetup] = createSignal(false);
  const [isVertical, setIsVertical] = createSignal(false);
  const [shipInfo, setShipInfo] = createSignal((<></>) as HTMLSpanElement);
  const [startButton, setStartButton] = createSignal(
    (<></>) as HTMLButtonElement
  );
  const [waitingForOpponent, setWaitingForOpponent] = createSignal(false);
  const [placementRefreshTrigger, setPlacementRefreshTrigger] = createSignal(0);
  const newGameAudio = new Audio(newGameSound);

  onMount(() => {
    setShipInfo(document.getElementById('ship-info') as HTMLSpanElement);
    setStartButton(
      document.getElementById('start-button') as HTMLButtonElement
    );

    // Set up callback for online games to transition when both ready
    if (props.gameMode === 'pvp' && props.game instanceof OnlinePlayer) {
      const onlineGame = props.game;

      // eslint-disable-next-line solid/reactivity
      onlineGame.setRoomUpdateCallback(room => {
        if (room.status === 'playing' && untrack(waitingForOpponent)) {
          // Both players are ready, start the game
          setWaitingForOpponent(false); // Reset the flag to prevent sound playing on every update
          props.setIsControlUp(false);
          newGameAudio.play().catch((error: unknown) => {
            if (error instanceof Error) console.error(error);
          });
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
        console.error(error);
        setWaitingForOpponent(false);

        return;
      }
    } else {
      // PvE mode - start immediately
      props.setIsControlUp(false);
      newGameAudio.play().catch((error: unknown) => {
        if (error instanceof Error) console.error(error);
      });
    }
  };

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
          background: ${COLOR_VARIABLES.primary};
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
          setIsDoneSetup={setIsDoneSetup}
          placementRefreshTrigger={placementRefreshTrigger}
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
                if (props.gameMode === 'pve') {
                  props.setGame(new Player(true));
                  props.game.playerBoard.shipsPlaced = 5;
                } else {
                  const onlineGame = props.game as OnlinePlayer;

                  onlineGame.randomPlace();
                  onlineGame.playerBoard.shipsPlaced = 5;
                }
                setIsDoneSetup(true);
                shipInfo().innerText = 'All Ships Ready!';
                // Trigger visual refresh
                setPlacementRefreshTrigger(prev => prev + 1);
              }}
              icon={<IoDice />}
              title='Randomize'
            />

            <BoardControl
              handleAction={() => {
                if (props.gameMode === 'pve') {
                  props.setGame(new Player());
                } else {
                  const onlineGame = props.game as OnlinePlayer;

                  onlineGame.playerBoard = new Board();
                  onlineGame.playerBoard.shipsPlaced = 0;
                }
                setIsDoneSetup(false);
                shipInfo().innerText = '5 Carrier';
                startButton().disabled = true;
                // Trigger visual refresh to clear board
                setPlacementRefreshTrigger(prev => prev + 1);
              }}
              icon={<IoTrashBin />}
              title='Clear'
            />
          </span>
        </div>

        {waitingForOpponent() ?
          <div
            class={css`
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 1rem;
              font-size: 1.25rem;
              text-align: center;
            `}>
            Waiting for opponent to finish setup...
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
              border-radius: 0.125rem;
              cursor: pointer;
              font-size: 1.5rem;
              font-weight: 500;
              min-width: 7.625rem;
              padding: 0.5rem;
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
