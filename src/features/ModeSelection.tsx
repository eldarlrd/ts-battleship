import { css } from '@emotion/css';
import { FaSolidRobot, FaSolidUserGroup } from 'solid-icons/fa';
import { type JSXElement } from 'solid-js';

import { type GameMode } from '@/config/rules.ts';
import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/config/site.ts';

// TODO: Lobby
const ModeSelection = (props: {
  setGameMode: (mode: GameMode) => void | Promise<void>;
}): JSXElement => (
  <div
    class={css`
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    `}>
    <section
      class={css`
        gap: 1.5rem;
        margin: 1rem;
        padding: 1.5rem;
        min-width: 18rem;
        display: inherit;
        align-items: center;
        flex-direction: column;
        border-radius: 0.125rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        background: ${COLOR_VARIABLES.primary};
        border: 2px solid ${COLOR_VARIABLES.secondary};
      `}>
      <h1
        class={css`
          margin: 0;
          font-size: 2rem;
          text-align: center;

          ${MEDIA_QUERIES.md} {
            font-size: 2.25rem;
          }
        `}>
        Game Mode
      </h1>

      <div
        class={css`
          gap: 1rem;
          display: inherit;
          flex-direction: column;

          ${MEDIA_QUERIES.sm} {
            gap: 1.5rem;
            flex-direction: row;
          }
        `}>
        <button
          type='button'
          onClick={() => void props.setGameMode('pve')}
          class={css`
            gap: 0.75rem;
            width: 11rem;
            display: flex;
            cursor: pointer;
            aspect-ratio: 1;
            font-weight: 500;
            font-size: 1.25rem;
            align-items: center;
            flex-direction: column;
            justify-content: center;
            border-radius: 0.125rem;
            color: ${COLOR_VARIABLES.secondary};
            background: ${COLOR_VARIABLES.primary};
            border: 2px solid ${COLOR_VARIABLES.secondary};
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
          <FaSolidRobot />
          <span>Computer</span>
        </button>

        <button
          type='button'
          onClick={() => void props.setGameMode('pvp')}
          class={css`
            gap: 0.75rem;
            width: 11rem;
            display: flex;
            cursor: pointer;
            aspect-ratio: 1;
            font-weight: 500;
            font-size: 1.25rem;
            align-items: center;
            padding: 2rem 2.5rem;
            flex-direction: column;
            justify-content: center;
            border-radius: 0.125rem;
            color: ${COLOR_VARIABLES.secondary};
            background: ${COLOR_VARIABLES.primary};
            border: 2px solid ${COLOR_VARIABLES.secondary};
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
          <FaSolidUserGroup />
          <span>Public</span>
        </button>
      </div>
    </section>
  </div>
);

export default ModeSelection;
