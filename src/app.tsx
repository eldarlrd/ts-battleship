import { css } from '@emotion/css';
import { type JSXElement } from 'solid-js';
import 'normalize.css';

import { Footer } from '@/components/banners/footer.tsx';
import { Header } from '@/components/banners/header.tsx';

import '@fontsource-variable/stick-no-bills';

const COLOR_VARIABLES = {
  primary: '#fff',
  secondary: '#60a5fa' // tw-blue-400
};

export const App = (): JSXElement => {
  return (
    <div
      id='app'
      class={css`
        font-family: 'Stick No Bills Variable', sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
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
      <Footer />
    </div>
  );
};

// Easter Egg
console.log('Pride of a nation, a beast made of steel!');
