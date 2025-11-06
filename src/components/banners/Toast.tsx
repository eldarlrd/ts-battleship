import { css } from '@emotion/css';
import { type JSXElement } from 'solid-js';
import { Toaster } from 'solid-toast';

import { COLOR_VARIABLES } from '@/config/site.ts';

const Toast = (): JSXElement => {
  return (
    <Toaster
      position='bottom-center'
      toastOptions={{
        duration: 3000,
        unmountDelay: 500,
        className: css`
          width: 12.25rem;
          font-size: 1.25rem;
          color: ${COLOR_VARIABLES.secondary} !important;
          background: ${COLOR_VARIABLES.primary} !important;
          border: 2px solid ${COLOR_VARIABLES.secondary};

          & [role='status'] {
            justify-content: center;
          }
        `,
        iconTheme: {
          primary: COLOR_VARIABLES.secondary,
          secondary: COLOR_VARIABLES.primary
        }
      }}
    />
  );
};

export default Toast;
