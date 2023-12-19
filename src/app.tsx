import { css } from '@emotion/css';
import { type JSXElement } from 'solid-js';
import 'normalize.css';

import { Footer } from '@/components/banners/footer.tsx';
import { Header } from '@/components/banners/header.tsx';
import '@fontsource-variable/stick-no-bills';
import { Controls } from '@/components/controls.tsx';
import { Gameboard } from '@/components/gameboard.tsx';

const COLOR_VARIABLES = {
  primary: '#fff',
  secondary: '#60a5fa' // tw-blue-400
};

const App = (): JSXElement => {
  return (
    <div
      id='app'
      class={css`
        font-family: 'Stick No Bills Variable', sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        min-height: 100vh;
        min-height: 100svh;
        background-color: ${COLOR_VARIABLES.secondary};
        accent-color: ${COLOR_VARIABLES.primary};
        color: ${COLOR_VARIABLES.primary};
        *::selection {
          background-color: ${COLOR_VARIABLES.primary};
          color: ${COLOR_VARIABLES.secondary};
        }
      `}>
      <Header />
      <main
        class={css`
          display: inherit;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        `}>
        <Controls />
        <div
          class={css`
            display: inherit;
            justify-content: center;
            align-items: center;
            gap: 1rem;
          `}>
          <Gameboard isPlayerOne={true} />
          <Gameboard isPlayerOne={false} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export { COLOR_VARIABLES, App };

// Easter Egg
console.log('Pride of a nation, a beast made of steel!');
