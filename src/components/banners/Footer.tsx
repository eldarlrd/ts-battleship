import { css } from '@emotion/css';
import { FaBrandsGithub } from 'solid-icons/fa';
import { type JSXElement } from 'solid-js';

import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/config/site.ts';

const Footer = (): JSXElement => (
  <footer
    class={css`
      gap: 0.5rem;
      margin: 1rem;
      display: flex;
      font-weight: 600;
      font-size: 1.25rem;
      text-align: center;
      flex-direction: column;
    `}>
    © 2023 - 2025
    <a
      title='Source'
      target='_blank'
      type='text/html'
      rel='noreferrer external author'
      href='https://github.com/eldarlrd/ts-battleship'
      class={css`
        color: inherit;
        text-decoration: none;
        border-radius: 0.125rem;
        transition: color 150ms cubic-bezier(0.4, 0, 0.2, 1);

        &:active {
          color: ${COLOR_VARIABLES.grid};
        }

        ${MEDIA_QUERIES.mouse} {
          &:hover {
            color: ${COLOR_VARIABLES.grid};
          }
        }

        svg {
          vertical-align: top;
        }
      `}>
      <FaBrandsGithub /> eldarlrd
    </a>
  </footer>
);

export default Footer;
