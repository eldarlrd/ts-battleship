import { css } from '@emotion/css';
import { CgSpinnerTwoAlt } from 'solid-icons/cg';
import { FaSolidRobot, FaSolidUser } from 'solid-icons/fa';
import { createSignal, onCleanup, type JSXElement } from 'solid-js';

import 'modern-normalize/modern-normalize.css';
import Footer from '@/components/banners/Footer.tsx';
import Header from '@/components/banners/Header.tsx';
import Toast from '@/components/banners/Toast.tsx';
import '@fontsource-variable/stick-no-bills';
import { NewGame } from '@/components/buttons/NewGame.tsx';
import { ERROR_NO_CONNECTION } from '@/config/errors.ts';
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
import { OnlinePlayer } from '@/logic/onlinePlayer.ts';
import { Player } from '@/logic/player.ts';

// eslint-disable-next-line prefer-const
let overlay = document.getElementById('overlay') as HTMLDivElement;

/*
  TODO
    1. Game Logic
     . Player victory conditions
     . Stop game on leave
     . Error toasts
    2. UI/UX
     . Load states *
     . Board border color transition when opponent plays
     . Near opponent name thinking
     . Mute sound button
     . Make sound independent
    3. Refactor
*/
export const App = (): JSXElement => {
  const [gameMode, setGameMode] = createSignal<GameMode | null>(null);
  const [game, setGame] = createSignal<Player | OnlinePlayer>(new Player());
  const [isControlUp, setIsControlUp] = createSignal(true);
  const [isAuthenticating, setIsAuthenticating] = createSignal(false);
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
        onlineGame.setRoomUpdateCallback(room => {
          switch (room.status) {
            case 'waiting':
              if (!room.player2)
                setMatchmakingStatus(MATCHMAKING_STATUS.waitingToJoin);
              else setMatchmakingStatus(MATCHMAKING_STATUS.waitingForSetup);
              break;

            case 'ready':
              setMatchmakingStatus(MATCHMAKING_STATUS.ready);
              break;

            case 'playing':
              setMatchmakingStatus('');
              setBoardUpdateTrigger(prev => prev + 1);
          }
        });

        setGame(onlineGame);
      } catch (error: unknown) {
        if (error instanceof Error) {
          errorToast(ERROR_NO_CONNECTION);
          console.error(error);
        }

        setGameMode(null);
        setGame(new Player());
        setMatchmakingStatus('');
      } finally {
        setIsAuthenticating(false);
      }
    } else {
      setGame(new Player());
      setMatchmakingStatus('');
    }
  };

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
      />

      <Header />

      {!gameMode() && !isAuthenticating() && (
        <ModeSelection setGameMode={handleModeSelection} />
      )}

      {(isAuthenticating() || matchmakingStatus()) && (
        <div
          class={css`
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            gap: 0.5rem;
            font-size: 1.5rem;

            & svg {
              font-size: 1.5rem;
            }
          `}>
          <CgSpinnerTwoAlt
            class={css`
              animation: spin 1s linear infinite;

              @keyframes spin {
                to {
                  transform: rotate(360deg);
                }
              }
            `}
          />{' '}
          {matchmakingStatus() || MATCHMAKING_STATUS.connecting}
        </div>
      )}

      {gameMode() &&
        !isAuthenticating() &&
        matchmakingStatus() !== MATCHMAKING_STATUS.connecting &&
        matchmakingStatus() !== MATCHMAKING_STATUS.waitingToJoin &&
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
              </span>
              <Gameboard
                isPlayerBoard={true}
                isPlacing={false}
                isVertical={false}
                game={game()}
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
                  </>
                : <>
                    <FaSolidUser /> Opponent
                  </>
                }
              </span>
              <Gameboard
                isPlayerBoard={false}
                isPlacing={false}
                isVertical={false}
                game={game()}
                boardUpdateTrigger={boardUpdateTrigger}
              />
            </span>
          </div>

          <NewGame
            game={game()}
            setGame={setGame}
            setIsControlUp={setIsControlUp}
            gameMode={gameMode()!}
            setGameMode={setGameMode}
          />
        </main>
      )}

      <Footer />
      <Toast />
    </div>
  );
};

// Easter Egg
console.log('Pride of a nation, a beast made of steel!');
