import { css } from '@emotion/css';
import { FaSolidRobot, FaSolidUser } from 'solid-icons/fa';
import { createSignal, type JSXElement } from 'solid-js';
import 'normalize.css';

import { Footer } from '@/components/banners/footer.tsx';
import { Header } from '@/components/banners/header.tsx';
import '@fontsource-variable/stick-no-bills';
import { Controls } from '@/components/controls.tsx';
import { Gameboard } from '@/components/gameboard.tsx';
import { Modal } from '@/components/modal.tsx';
import { Player } from '@/game/player.ts';

const COLOR_VARIABLES = {
  primary: '#60a5fa', // tw-blue-400
  secondary: '#f8fafc', // tw-slate-50
  ship: '#334155', // tw-slate-700
  hover: '#cbd5e1', // tw-slate-300
  grid: '#1e293b', // tw-slate-800
  emptyHit: '#10b981', // tw-emerald-500
  shipHit: '#f59e0b', // tw-amber-500
  shipSunk: '#f43f5e' // tw-rose-500
};

const MEDIA_QUERIES = {
  sm: '@media (min-width: 40rem)', // tw-sm
  md: '@media (min-width: 48rem)', // tw-md
  lg: '@media (min-width: 64rem)' // tw-lg
};

// eslint-disable-next-line prefer-const
let overlay: HTMLDivElement = document.getElementById(
  'overlay'
) as HTMLDivElement;

const App = (): JSXElement => {
  const [game, setGame] = createSignal(new Player());
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
        min-height: 100vh;
        min-height: 100svh;
        background-color: ${COLOR_VARIABLES.primary};
        accent-color: ${COLOR_VARIABLES.secondary};
        color: ${COLOR_VARIABLES.secondary};

        *::selection {
          background-color: ${COLOR_VARIABLES.secondary};
          color: ${COLOR_VARIABLES.primary};
        }
      `}>
      <Modal game={game()} setGame={setGame} overlay={overlay} />
      <Controls />

      <Header />
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
            <Gameboard isPlayerOneBoard={true} game={game()} />
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
            <Gameboard isPlayerOneBoard={false} game={game()} />
          </span>
        </div>

        <button
          type='button'
          onClick={() => {
            setGame(new Player());
            overlay.style.display = 'none';
          }}
          class={css`
            border: 0;
            border-radius: 0.125rem;
            cursor: pointer;
            font-size: 1.5rem;
            font-weight: 500;
            padding: 0.75rem;
            margin-top: 2rem;
            background-color: ${COLOR_VARIABLES.secondary};
            color: ${COLOR_VARIABLES.grid};
            outline: 2px solid ${COLOR_VARIABLES.grid};
            transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

            &:hover {
              background-color: ${COLOR_VARIABLES.hover};
            }
          `}>
          New Game
        </button>
      </main>
      <Footer />
    </div>
  );
};

export { COLOR_VARIABLES, MEDIA_QUERIES, App };

// Easter Egg
console.log('Pride of a nation, a beast made of steel!');
