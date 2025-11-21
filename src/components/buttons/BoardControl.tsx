import { css } from '@emotion/css';
import { type JSXElement } from 'solid-js';

import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/config/site.ts';

const BoardControl = (props: {
  handleAction: () => void;
  icon: JSXElement;
  isDisabled: boolean;
  title: string;
}): JSXElement => (
  <button
    type='button'
    title={props.title}
    disabled={props.isDisabled}
    onClick={() => {
      props.handleAction();
    }}
    class={css`
      border: 0;
      padding: 0.5rem;
      cursor: pointer;
      font-weight: 500;
      line-height: 1rem;
      font-size: 1.375rem;
      border-radius: 0.125rem;
      color: ${COLOR_VARIABLES.grid};
      background: ${COLOR_VARIABLES.secondary};
      outline: 2px solid ${COLOR_VARIABLES.grid};
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

      &:active {
        background: ${COLOR_VARIABLES.hover};
      }

      ${MEDIA_QUERIES.mouse} {
        &:hover {
          background: ${COLOR_VARIABLES.hover};
        }
      }

      &:disabled {
        cursor: not-allowed;
        background: ${COLOR_VARIABLES.hover};
      }

      ${MEDIA_QUERIES.md} {
        padding: 0.75rem;
        font-size: 1.5rem;
      }

      ${MEDIA_QUERIES.lg} {
        font-size: 1.625rem;
      }
    `}>
    {props.icon}
  </button>
);

export default BoardControl;
