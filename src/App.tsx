import { css } from '@emotion/css';
import { FaSolidRobot, FaSolidUser } from 'solid-icons/fa';
import { createSignal, type JSXElement } from 'solid-js';
import 'modern-normalize/modern-normalize.css';

import { Footer } from '@/components/banners/Footer.tsx';
import { Header } from '@/components/banners/Header.tsx';
import '@fontsource-variable/stick-no-bills';
import { NewGame } from '@/components/buttons/NewGame.tsx';
import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/config/site.ts';
import { Controls } from '@/features/Controls.tsx';
import { Gameboard } from '@/features/Gameboard.tsx';
import { Modal } from '@/features/Modal.tsx';
import { Player } from '@/logic/player.ts';

// eslint-disable-next-line prefer-const
let overlay = document.getElementById('overlay') as HTMLDivElement;

/*
  TODO: Game Revamp
   • Smarter AI
   • PvP Mode
*/
export const App = (): JSXElement => {
  const [game, setGame] = createSignal(new Player());
  const [isControlUp, setIsControlUp] = createSignal(true);

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
        background-color: ${COLOR_VARIABLES.primary};
        accent-color: ${COLOR_VARIABLES.secondary};
        color: ${COLOR_VARIABLES.secondary};

        *::selection {
          background-color: ${COLOR_VARIABLES.secondary};
          color: ${COLOR_VARIABLES.primary};
        }
      `}>
      <Modal
        game={game()}
        setGame={setGame}
        setIsControlUp={setIsControlUp}
        overlay={overlay}
      />

      <Header />

      {isControlUp() && (
        <Controls
          game={game()}
          setGame={setGame}
          setIsControlUp={setIsControlUp}
        />
      )}

      {!isControlUp() && (
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
                <FaSolidRobot /> Computer
              </span>
              <Gameboard
                isPlayerBoard={false}
                isPlacing={false}
                isVertical={false}
                game={game()}
              />
            </span>
          </div>

          <NewGame setGame={setGame} setIsControlUp={setIsControlUp} />
        </main>
      )}

      <Footer />
    </div>
  );
};

// Easter Egg
console.log('Pride of a nation, a beast made of steel!');
