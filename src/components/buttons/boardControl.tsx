import { css } from '@emotion/css';
import { type JSXElement } from 'solid-js';

import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/app.tsx';

export const BoardControl = (props: {
  handleAction: () => void;
  icon: JSXElement;
  title: string;
}): JSXElement => {
  return (
    <button
      type='button'
      title={props.title}
      onClick={() => {
        props.handleAction();
      }}
      class={css`
        border: 0;
        border-radius: 0.125rem;
        cursor: pointer;
        font-size: 1.375rem;
        font-weight: 500;
        line-height: 1rem;
        padding: 0.5rem;
        background-color: ${COLOR_VARIABLES.secondary};
        color: ${COLOR_VARIABLES.grid};
        outline: 2px solid ${COLOR_VARIABLES.grid};
        transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

        &:hover {
          background-color: ${COLOR_VARIABLES.hover};
        }

        ${MEDIA_QUERIES.md} {
          font-size: 1.5rem;
          padding: 0.75rem;
        }

        ${MEDIA_QUERIES.lg} {
          font-size: 1.625rem;
        }
      `}>
      {props.icon}
    </button>
  );
};
