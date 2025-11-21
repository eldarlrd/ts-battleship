import { css } from '@emotion/css';
import { type JSXElement } from 'solid-js';
import { Toaster } from 'solid-toast';

import { COLOR_VARIABLES } from '@/config/site.ts';

const Toast = (): JSXElement => (
  <Toaster
    position='bottom-center'
    toastOptions={{
      duration: 3000,
      unmountDelay: 500,
      className: css`
        width: 12.25rem;
        font-size: 1.25rem;
        border: 2px solid ${COLOR_VARIABLES.primary};
        color: ${COLOR_VARIABLES.primary} !important;
        background: ${COLOR_VARIABLES.secondary} !important;

        & [role='status'] {
          justify-content: center;
        }
      `,
      iconTheme: {
        primary: COLOR_VARIABLES.primary,
        secondary: COLOR_VARIABLES.secondary
      }
    }}
  />
);

export default Toast;
