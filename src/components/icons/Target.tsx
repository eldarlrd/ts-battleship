import { css } from '@emotion/css';
import { TbTargetArrow } from 'solid-icons/tb';
import { type JSXElement } from 'solid-js';

const Target = (): JSXElement => (
  <TbTargetArrow
    size='1.25rem'
    class={css`
      margin-left: 0.25rem;
      vertical-align: middle;
      animation: spin 1.5s linear infinite;

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `}
  />
);

export default Target;
