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
      display: flex;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
    `}>
    <section
      class={css`
        display: inherit;
        flex-direction: column;
        align-items: center;
        padding: 1.5rem;
        margin: 1rem;
        gap: 1.5rem;
        min-width: 18rem;
        background: ${COLOR_VARIABLES.primary};
        border: 2px solid ${COLOR_VARIABLES.secondary};
        border-radius: 0.125rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
      `}>
      <h1
        class={css`
          text-align: center;
          font-size: 2rem;
          margin: 0;

          ${MEDIA_QUERIES.md} {
            font-size: 2.25rem;
          }
        `}>
        Game Mode
      </h1>

      <div
        class={css`
          display: inherit;
          flex-direction: column;
          gap: 1rem;

          ${MEDIA_QUERIES.sm} {
            flex-direction: row;
            gap: 1.5rem;
          }
        `}>
        <button
          type='button'
          onClick={() => void props.setGameMode('pve')}
          class={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            border: 2px solid ${COLOR_VARIABLES.secondary};
            border-radius: 0.125rem;
            cursor: pointer;
            font-size: 1.25rem;
            width: 11rem;
            font-weight: 500;
            background: ${COLOR_VARIABLES.primary};
            color: ${COLOR_VARIABLES.secondary};
            aspect-ratio: 1;
            transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

            svg {
              font-size: 3rem;
            }

            &:active {
              background: ${COLOR_VARIABLES.secondary};
              color: ${COLOR_VARIABLES.primary};
            }

            ${MEDIA_QUERIES.mouse} {
              &:hover {
                background: ${COLOR_VARIABLES.secondary};
                color: ${COLOR_VARIABLES.primary};
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
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.75rem;
            border: 2px solid ${COLOR_VARIABLES.secondary};
            border-radius: 0.125rem;
            cursor: pointer;
            font-size: 1.25rem;
            font-weight: 500;
            padding: 2rem 2.5rem;
            background: ${COLOR_VARIABLES.primary};
            color: ${COLOR_VARIABLES.secondary};
            transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
            aspect-ratio: 1;
            width: 11rem;

            svg {
              font-size: 3rem;
            }

            &:active {
              background: ${COLOR_VARIABLES.secondary};
              color: ${COLOR_VARIABLES.primary};
            }

            ${MEDIA_QUERIES.mouse} {
              &:hover {
                background: ${COLOR_VARIABLES.secondary};
                color: ${COLOR_VARIABLES.primary};
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
