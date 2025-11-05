import { css } from '@emotion/css';
import { FaSolidRobot, FaSolidUser } from 'solid-icons/fa';
import { createSignal, onCleanup, type JSXElement } from 'solid-js';
import 'modern-normalize/modern-normalize.css';

import { Footer } from '@/components/banners/Footer.tsx';
import { Header } from '@/components/banners/Header.tsx';
import '@fontsource-variable/stick-no-bills';
import { NewGame } from '@/components/buttons/NewGame.tsx';
import { signInAnonymous } from '@/config/firebase.ts';
import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/config/site.ts';
import { Controls } from '@/features/Controls.tsx';
import { Gameboard } from '@/features/Gameboard.tsx';
import { Modal } from '@/features/Modal.tsx';
import { ModeSelection, type GameMode } from '@/features/ModeSelection.tsx';
import { OnlinePlayer } from '@/logic/onlinePlayer.ts';
import { Player } from '@/logic/player.ts';

// eslint-disable-next-line prefer-const
let overlay = document.getElementById('overlay') as HTMLDivElement;

/* TODO: Game Logic
     1. If Ship Sunk Adjacent Cells Hit
     2. Fix broken PvE
 */
export const App = (): JSXElement => {
  const [gameMode, setGameMode] = createSignal<GameMode | null>(null);
  const [game, setGame] = createSignal<Player | OnlinePlayer>(new Player());
  const [isControlUp, setIsControlUp] = createSignal(true);
  const [isAuthenticating, setIsAuthenticating] = createSignal(false);
  const [matchmakingStatus, setMatchmakingStatus] = createSignal<string>('');
  const [boardUpdateTrigger, setBoardUpdateTrigger] = createSignal(0);

  // Authenticate user when PvP mode is selected
  const handleModeSelection = async (mode: GameMode): Promise<void> => {
    setGameMode(mode);

    if (mode === 'pvp') {
      setIsAuthenticating(true);
      setMatchmakingStatus('Connecting to matchmaking...');
      try {
        const uid = await signInAnonymous();
        const onlineGame = new OnlinePlayer(uid);

        await onlineGame.joinMatchmaking();

        // Set up callback to update matchmaking status and trigger board updates
        onlineGame.setRoomUpdateCallback(room => {
          if (room.status === 'waiting' && !room.player2) {
            setMatchmakingStatus('Waiting for opponent to join...');
          } else if (room.status === 'waiting' && room.player2) {
            setMatchmakingStatus('Opponent connected! Waiting for setup...');
          } else if (room.status === 'ready') {
            setMatchmakingStatus('Both players ready! Starting game...');
          } else if (room.status === 'playing') {
            setMatchmakingStatus('');
            // Trigger board update to sync visual state
            setBoardUpdateTrigger(prev => prev + 1);
          }
        });

        setGame(onlineGame);
      } catch (error) {
        console.error('Error setting up online game:', error);
        // Fallback to PvE if authentication fails
        setGameMode('pve');
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

  // Cleanup online game on unmount
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

      {/* Mode Selection - shown first */}
      {!gameMode() && !isAuthenticating() && (
        <ModeSelection setGameMode={handleModeSelection} />
      )}

      {/* Authenticating/Matchmaking state */}
      {(isAuthenticating() || matchmakingStatus()) && (
        <div
          class={css`
            display: flex;
            justify-content: center;
            align-items: center;
            flex: 1;
            font-size: 1.5rem;
          `}>
          {matchmakingStatus() || 'Connecting to matchmaking...'}
        </div>
      )}

      {/* Controls - ship placement */}
      {gameMode() &&
        !isAuthenticating() &&
        matchmakingStatus() !== 'Connecting to matchmaking...' &&
        matchmakingStatus() !== 'Waiting for opponent to join...' &&
        isControlUp() && (
          <Controls
            game={game()}
            setGame={setGame}
            setIsControlUp={setIsControlUp}
            gameMode={gameMode()!}
          />
        )}

      {/* Main game - battle phase */}
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

                svg {
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
    </div>
  );
};

// Easter Egg
console.log('Pride of a nation, a beast made of steel!');
