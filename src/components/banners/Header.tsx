import { css } from '@emotion/css';
import { type JSXElement } from 'solid-js';

const Header = (): JSXElement => (
  <header
    class={css`
      margin: 1rem;
      font-weight: 600;
      font-size: 2.5rem;
    `}>
    TS Battleship
  </header>
);

export default Header;
