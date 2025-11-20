import { css } from '@emotion/css';
import { CgSpinnerTwoAlt } from 'solid-icons/cg';
import { FaSolidRobot, FaSolidUser } from 'solid-icons/fa';
import {
  IoChevronBackSharp,
  IoVolumeHighSharp,
  IoVolumeMuteSharp
} from 'solid-icons/io';
import { TbTargetArrow } from 'solid-icons/tb';
import { createSignal, type JSXElement, onCleanup } from 'solid-js';

import 'modern-normalize/modern-normalize.css';
import Footer from '@/components/banners/Footer.tsx';
import Header from '@/components/banners/Header.tsx';
import Toast from '@/components/banners/Toast.tsx';
import '@fontsource-variable/stick-no-bills';
import { NewGame } from '@/components/buttons/NewGame.tsx';
import { ERROR_OPPONENT_LEFT } from '@/config/errors.ts';
import { signInAnonymous } from '@/config/firebase.ts';
import { type GameMode } from '@/config/rules.ts';
import {
  COLOR_VARIABLES,
  MATCHMAKING_STATUS,
  MEDIA_QUERIES
} from '@/config/site.ts';
import { errorToast } from '@/config/toast.ts';
import { Controls } from '@/features/Controls.tsx';
import { Gameboard } from '@/features/Gameboard.tsx';
import { Modal } from '@/features/Modal.tsx';
import ModeSelection from '@/features/ModeSelection.tsx';
import { isMuted, toggleMute } from '@/lib/audio.ts';
import { type GameRoom } from '@/logic/matchmaking.ts';
import { OnlinePlayer } from '@/logic/onlinePlayer.ts';
import { Player } from '@/logic/player.ts';

// FIXME: Victory conditions reset on leave
// TODO: Lobbies

// * Whole app’s some serious Solid + OOP spaghetti code
export const App = (): JSXElement => {
  // eslint-disable-next-line prefer-const
  let overlay = document.getElementById('overlay') as HTMLDivElement;

  const [gameMode, setGameMode] = createSignal<GameMode | null>(null);
  const [game, setGame] = createSignal<Player | OnlinePlayer>(new Player());
  const [isControlUp, setIsControlUp] = createSignal(true);
  const [isAuthenticating, setIsAuthenticating] = createSignal(false);
  const [isOpponentTurn, setIsOpponentTurn] = createSignal(false);
  const [matchmakingStatus, setMatchmakingStatus] = createSignal('');
  const [boardUpdateTrigger, setBoardUpdateTrigger] = createSignal(0);

  const handleModeSelection = async (mode: GameMode): Promise<void> => {
    setGameMode(mode);

    if (mode === 'pvp') {
      setIsAuthenticating(true);
      setMatchmakingStatus(MATCHMAKING_STATUS.connecting);
      try {
        const uid = await signInAnonymous();
        const onlineGame = new OnlinePlayer(uid);

        await onlineGame.joinMatchmaking();
        onlineGame.setRoomUpdateCallback((room: GameRoom | null) => {
          if (!room) {
            errorToast(ERROR_OPPONENT_LEFT);
            setGameMode(null);
            setGame(new Player());
            setMatchmakingStatus('');
            setIsControlUp(true);

            return;
          }

          switch (room.status) {
            case 'waiting':
              if (!room.player2)
                setMatchmakingStatus(MATCHMAKING_STATUS.waitingToJoin);
              else setMatchmakingStatus('');
              break;

            case 'ready':
              setMatchmakingStatus(MATCHMAKING_STATUS.ready);
              break;

            case 'playing':
              setMatchmakingStatus('');
              setIsOpponentTurn(!onlineGame.isCurrPlayerTurn);
              setBoardUpdateTrigger(prev => prev + 1);
              break;

            case 'finished':
              setMatchmakingStatus('');
              setBoardUpdateTrigger(prev => prev + 1);
              setIsControlUp(false);
          }
        });

        setGame(onlineGame);
      } catch (error: unknown) {
        if (error instanceof Error) {
          errorToast(error.message);
          console.error(error.message, error);
        }

        setGameMode(null);
        setGame(new Player());
        setMatchmakingStatus('');
        setIsControlUp(true);
      } finally {
        setIsAuthenticating(false);
      }
    } else {
      setGame(new Player());
      setMatchmakingStatus('');
    }
  };

  // Page unload
  onCleanup(() => {
    const currentGame = game();

    if (currentGame instanceof OnlinePlayer) void currentGame.cleanup();
  });

  return (
    <div
      id='app'
      class={css`
        font-family: 'Stick No Bills Variable', sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        user-select: none;
        min-height: 100dvh;
        background: ${COLOR_VARIABLES.primary};
        accent-color: ${COLOR_VARIABLES.secondary};
        color: ${COLOR_VARIABLES.secondary};

        *::selection {
          background: ${COLOR_VARIABLES.secondary};
          color: ${COLOR_VARIABLES.primary};
        }

        & button {
          -webkit-tap-highlight-color: transparent;
        }
      `}>
      <Modal
        game={game()}
        setGame={setGame}
        setIsControlUp={setIsControlUp}
        overlay={overlay}
        gameMode={gameMode()}
        setGameMode={setGameMode}
        boardUpdateTrigger={boardUpdateTrigger}
      />

      <Header />

      {!gameMode() && !isAuthenticating() && (
        <ModeSelection setGameMode={handleModeSelection} />
      )}

      {(isAuthenticating() || matchmakingStatus()) && (
        <div
          class={css`
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 0.25rem;
          `}>
          <div
            class={css`
              display: inherit;
              justify-content: center;
              align-items: center;
              flex: 1;
              gap: 0.5rem;
              padding: 0 1rem;
              font-size: 1.5rem;

              & svg {
                font-size: 1.5rem;
              }
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
            {matchmakingStatus() || MATCHMAKING_STATUS.connecting}
          </div>
          <button
            type='button'
            onClick={() => {
              const currentGame = game();

              if (currentGame instanceof OnlinePlayer)
                void currentGame.cleanup();

              void setGameMode(null);
              setGame(new Player());
              setMatchmakingStatus('');
            }}
            class={css`
              border: none;
              cursor: pointer;
              background: transparent;
              display: inherit;
              align-items: center;
              color: ${COLOR_VARIABLES.secondary};
              width: 3rem;
              height: 3.5rem;
              padding: 0.125rem 0 0;
              margin-left: -1.75rem;
              font-size: 1.375rem;

              &:active {
                color: ${COLOR_VARIABLES.hover};
              }

              ${MEDIA_QUERIES.mouse} {
                &:hover {
                  color: ${COLOR_VARIABLES.hover};
                }
              }
            `}>
            <IoChevronBackSharp size='1.75rem' /> Back
          </button>
        </div>
      )}

      {gameMode() &&
        !isAuthenticating() &&
        (matchmakingStatus() === '' ||
          matchmakingStatus() === MATCHMAKING_STATUS.ready) &&
        isControlUp() && (
          <Controls
            game={game()}
            setGame={setGame}
            setIsControlUp={setIsControlUp}
            gameMode={gameMode()!}
            setGameMode={setGameMode}
          />
        )}

      {gameMode() && !isAuthenticating() && !isControlUp() && (
        <main
          class={css`
            display: inherit;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 1.5rem auto;
          `}>
          <div
            class={css`
              display: inherit;
              justify-content: center;
              flex-direction: column;
              align-items: center;
              margin-bottom: 2rem;
              font-size: 1.75rem;
              gap: 1.5rem;

              ${MEDIA_QUERIES.sm} {
                flex-direction: row;
                gap: 2rem;
              }

              ${MEDIA_QUERIES.md} {
                gap: 2.5rem;
              }

              ${MEDIA_QUERIES.lg} {
                gap: 3rem;
              }
            `}>
            <span
              class={css`
                display: inherit;
                flex-direction: column;
                justify-content: center;
                gap: 0.25rem;

                & svg {
                  font-size: 1.25rem;
                }
              `}>
              <span>
                <FaSolidUser /> Player
                {isOpponentTurn() && (
                  <TbTargetArrow
                    size='1.25rem'
                    class={css`
                      vertical-align: middle;
                      margin-left: 0.25rem;
                      animation: spin 1.5s linear infinite;

                      @keyframes spin {
                        to {
                          transform: rotate(360deg);
                        }
                      }
                    `}
                  />
                )}
              </span>
              <Gameboard
                isPlayerBoard={true}
                isPlacing={false}
                isVertical={false}
                game={game()}
                isOpponentTurn={isOpponentTurn()}
                setIsOpponentTurn={setIsOpponentTurn}
                boardUpdateTrigger={boardUpdateTrigger}
              />
            </span>

            <span
              class={css`
                display: inherit;
                flex-direction: column;
                justify-content: center;
                gap: 0.25rem;

                svg {
                  font-size: 1.5rem;
                }
              `}>
              <span>
                {gameMode() === 'pve' ?
                  <>
                    <FaSolidRobot /> Computer
                    {!isOpponentTurn() && (
                      <TbTargetArrow
                        size='1.25rem'
                        class={css`
                          vertical-align: middle;
                          margin-left: 0.25rem;
                          animation: spin 1.5s linear infinite;

                          @keyframes spin {
                            to {
                              transform: rotate(360deg);
                            }
                          }
                        `}
                      />
                    )}
                  </>
                : <>
                    <FaSolidUser /> Opponent
                    {!isOpponentTurn() && (
                      <TbTargetArrow
                        size='1.25rem'
                        class={css`
                          vertical-align: middle;
                          margin-left: 0.25rem;
                          animation: spin 1.5s linear infinite;

                          @keyframes spin {
                            to {
                              transform: rotate(360deg);
                            }
                          }
                        `}
                      />
                    )}
                  </>
                }
              </span>
              <Gameboard
                isPlayerBoard={false}
                isPlacing={false}
                isVertical={false}
                game={game()}
                isOpponentTurn={!isOpponentTurn()}
                setIsOpponentTurn={setIsOpponentTurn}
                boardUpdateTrigger={boardUpdateTrigger}
              />
            </span>
          </div>

          <div
            class={css`
              display: inherit;
              margin-left: 3.5rem;
              gap: 0.5rem;
            `}>
            <NewGame
              game={game()}
              setGame={setGame}
              setIsControlUp={setIsControlUp}
              gameMode={gameMode()!}
              setGameMode={setGameMode}
            />
            <button
              type='button'
              onClick={toggleMute}
              class={css`
                border: none;
                cursor: pointer;
                background: transparent;
                display: inherit;
                justify-content: center;
                align-items: center;
                color: ${COLOR_VARIABLES.secondary};
                width: 3rem;
                height: 3.5rem;
                padding: 0.125rem;
                font-size: 1.5rem;

                &:active {
                  color: ${COLOR_VARIABLES.hover};
                }

                ${MEDIA_QUERIES.mouse} {
                  &:hover {
                    color: ${COLOR_VARIABLES.hover};
                  }
                }
              `}>
              {isMuted() ?
                <IoVolumeMuteSharp size='1.75rem' />
              : <IoVolumeHighSharp size='1.75rem' />}
            </button>
          </div>
        </main>
      )}

      <Footer />
      <Toast />
    </div>
  );
};

// Easter Egg
console.log('Pride of a nation, a beast made of steel!');
