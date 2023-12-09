import { css } from '@emotion/css';
import { type JSXElement } from 'solid-js';

import { Footer } from '@/components/banners/footer.tsx';
import { Header } from '@/components/banners/header.tsx';

import '@fontsource-variable/stick-no-bills';

export const App = (): JSXElement => {
  return (
    <div
      id='app'
      class={css`
        font-family: 'Stick No Bills Variable', sans-serif;
      `}>
      <Header />
      <Footer />
    </div>
  );
};
