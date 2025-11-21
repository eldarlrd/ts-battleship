import { css } from '@emotion/css';
import { CgSpinnerTwoAlt } from 'solid-icons/cg';
import { FaSolidRobot, FaSolidUser } from 'solid-icons/fa';
import { IoChevronBackSharp } from 'solid-icons/io';
import { createSignal, type JSXElement, onCleanup } from 'solid-js';

import 'modern-normalize/modern-normalize.css';
import Footer from '@/components/banners/Footer.tsx';
import Header from '@/components/banners/Header.tsx';
import Toast from '@/components/banners/Toast.tsx';
import Mute from '@/components/buttons/Mute.tsx';
import '@fontsource-variable/stick-no-bills';
import NewGame from '@/components/buttons/NewGame.tsx';
import Target from '@/components/icons/Target.tsx';
import { ERRORS } from '@/config/errors.ts';
import { signInAnonymous } from '@/config/firebase.ts';
import { type GameMode } from '@/config/rules.ts';
import {
  COLOR_VARIABLES,
  MATCHMAKING_STATUS,
  MEDIA_QUERIES
} from '@/config/site.ts';
import errorToast from '@/config/toast.ts';
import Controls from '@/features/Controls.tsx';
import Gameboard from '@/features/Gameboard.tsx';
import Modal from '@/features/Modal.tsx';
import ModeSelection from '@/features/ModeSelection.tsx';
import OnlinePlayer from '@/logic/onlinePlayer.ts';
import Player from '@/logic/player.ts';

// * Whole app’s some serious Solid + OOP spaghetti code
const App = (): JSXElement => {
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

        // Zombie check
        if (gameMode() !== 'pvp') {
          void onlineGame.cleanup();

          return;
        }

        onlineGame.setRoomUpdateCallback(room => {
          if (!room) {
            errorToast(ERRORS.OPPONENT_LEFT);
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
        display: flex;
        user-select: none;
        min-height: 100dvh;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        color: ${COLOR_VARIABLES.secondary};
        background: ${COLOR_VARIABLES.primary};
        accent-color: ${COLOR_VARIABLES.secondary};
        font-family: 'Stick No Bills Variable', sans-serif;

        *::selection {
          color: ${COLOR_VARIABLES.primary};
          background: ${COLOR_VARIABLES.secondary};
        }

        & button {
          -webkit-tap-highlight-color: transparent;
        }
      `}>
      <Modal
        game={game()}
        setGame={setGame}
        overlay={overlay}
        gameMode={gameMode()}
        setGameMode={setGameMode}
        setIsControlUp={setIsControlUp}
        boardUpdateTrigger={boardUpdateTrigger}
      />

      <Header />

      {!gameMode() && !isAuthenticating() && (
        <ModeSelection setGameMode={handleModeSelection} />
      )}

      {(isAuthenticating() || matchmakingStatus()) && (
        <div
          class={css`
            gap: 0.25rem;
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          `}>
          <div
            class={css`
              flex: 1;
              gap: 0.5rem;
              padding: 0 1rem;
              display: inherit;
              font-size: 1.5rem;
              align-items: center;
              justify-content: center;

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

              setIsAuthenticating(false);
              setMatchmakingStatus('');
              void setGameMode(null);
              setGame(new Player());
            }}
            class={css`
              width: 3rem;
              border: none;
              height: 3.5rem;
              cursor: pointer;
              display: inherit;
              align-items: center;
              font-size: 1.375rem;
              margin-left: -1.75rem;
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
            gameMode={gameMode()!}
            setGameMode={setGameMode}
            setIsControlUp={setIsControlUp}
          />
        )}

      {gameMode() && !isAuthenticating() && !isControlUp() && (
        <main
          class={css`
            display: inherit;
            margin: 1.5rem auto;
            align-items: center;
            flex-direction: column;
            justify-content: center;
          `}>
          <div
            class={css`
              gap: 1.5rem;
              display: inherit;
              font-size: 1.75rem;
              margin-bottom: 2rem;
              align-items: center;
              justify-content: center;
              flex-direction: column;

              ${MEDIA_QUERIES.sm} {
                gap: 2rem;
                flex-direction: row;
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
                gap: 0.25rem;
                display: inherit;
                flex-direction: column;
                justify-content: center;

                & svg {
                  font-size: 1.25rem;
                }
              `}>
              <span>
                <FaSolidUser /> Player
                {isOpponentTurn() && <Target />}
              </span>
              <Gameboard
                game={game()}
                isPlacing={false}
                isVertical={false}
                isPlayerBoard={true}
                isOpponentTurn={isOpponentTurn()}
                setIsOpponentTurn={setIsOpponentTurn}
                boardUpdateTrigger={boardUpdateTrigger}
              />
            </span>

            <span
              class={css`
                gap: 0.25rem;
                display: inherit;
                flex-direction: column;
                justify-content: center;

                svg {
                  font-size: 1.5rem;
                }
              `}>
              <span>
                {gameMode() === 'pve' ?
                  <>
                    <FaSolidRobot /> Computer
                    {!isOpponentTurn() && <Target />}
                  </>
                : <>
                    <FaSolidUser /> Opponent
                    {!isOpponentTurn() && <Target />}
                  </>
                }
              </span>
              <Gameboard
                game={game()}
                isPlacing={false}
                isVertical={false}
                isPlayerBoard={false}
                isOpponentTurn={!isOpponentTurn()}
                setIsOpponentTurn={setIsOpponentTurn}
                boardUpdateTrigger={boardUpdateTrigger}
              />
            </span>
          </div>

          <div
            class={css`
              gap: 0.5rem;
              display: inherit;
              margin-left: 3.5rem;
            `}>
            <NewGame
              game={game()}
              setGame={setGame}
              gameMode={gameMode()!}
              setGameMode={setGameMode}
              setIsControlUp={setIsControlUp}
            />
            <Mute />
          </div>
        </main>
      )}

      <Footer />
      <Toast />
    </div>
  );
};

export default App;

// Easter Egg
console.log('Pride of a nation, a beast made of steel!');
