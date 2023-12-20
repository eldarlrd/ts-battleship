import { css } from '@emotion/css';
import { FaBrandsGithub } from 'solid-icons/fa';
import { type JSXElement } from 'solid-js';

import { COLOR_VARIABLES } from '@/app.tsx';

export const Footer = (): JSXElement => {
  return (
    <footer
      class={css`
        font-size: 1.25rem;
        font-weight: 600;
        margin: 1rem;
      `}>
      © 2023 {''}
      <a
        title='Go to the Source'
        target='_blank'
        type='text/html'
        rel='noopener noreferrer nofollow external author'
        href='https://github.com/eldarlrd/ts-battleship'
        class={css`
          border-radius: 0.125rem;
          text-decoration: none;
          color: inherit;
          transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);

          &:hover {
            color: ${COLOR_VARIABLES.grid};
          }

          svg {
            vertical-align: top;
          }
        `}>
        <FaBrandsGithub /> eldarlrd
      </a>
    </footer>
  );
};
