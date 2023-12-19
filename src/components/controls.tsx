import { css } from '@emotion/css';
import { type JSXElement } from 'solid-js';

export const Controls = (): JSXElement => {
  return (
    <div
      class={css`
        font-size: 2.5rem;
        font-weight: 600;
      `}
    />
  );
};
