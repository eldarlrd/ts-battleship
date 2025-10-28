import { css } from '@emotion/css';
import { type JSXElement } from 'solid-js';

export const Header = (): JSXElement => (
  <header
    class={css`
      font-size: 2.5rem;
      font-weight: 600;
      margin: 1rem;
    `}>
    TS Battleship
  </header>
);
