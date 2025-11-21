import { css } from '@emotion/css';
import { type JSXElement } from 'solid-js';

import { type GameMode } from '@/config/rules.ts';
import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/config/site.ts';

const Tile = (props: {
  children: JSXElement;
  setGameMode: (mode: GameMode) => void | Promise<void>;
}): JSXElement => (
  <button
    title=''
    type='button'
    onClick={() => void props.setGameMode('pvp')}
    class={css`
      gap: 0.75rem;
      width: 11rem;
      height: 11rem;
      cursor: pointer;
      display: inherit;
      font-weight: 500;
      font-size: 1.25rem;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      border-radius: 0.125rem;
      color: ${COLOR_VARIABLES.secondary};
      background: ${COLOR_VARIABLES.primary};
      border: 0.125rem solid ${COLOR_VARIABLES.secondary};
      transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

      svg {
        font-size: 3rem;
      }

      &:active {
        color: ${COLOR_VARIABLES.primary};
        background: ${COLOR_VARIABLES.secondary};
      }

      ${MEDIA_QUERIES.mouse} {
        &:hover {
          color: ${COLOR_VARIABLES.primary};
          background: ${COLOR_VARIABLES.secondary};
        }
      }

      ${MEDIA_QUERIES.md} {
        font-size: 1.5rem;

        svg {
          font-size: 3.5rem;
        }
      }
    `}>
    {props.children}
  </button>
);

export default Tile;
