import { css } from '@emotion/css';
import { BiSolidKey, BiSolidLock } from 'solid-icons/bi';
import { FaSolidRobot, FaSolidUserGroup } from 'solid-icons/fa';
import { createMemo, createSignal, type JSXElement } from 'solid-js';

import Tile from '@/components/buttons/Tile.tsx';
import { type GameMode, type PVPMode } from '@/config/rules.ts';
import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/config/site.ts';

const ModeSelection = (props: {
  setGameMode: (
    mode: GameMode,
    pvpMode?: PVPMode,
    key?: string
  ) => void | Promise<void>;
}): JSXElement => {
  const MAX_LENGTH = 6;
  const INVALID_CHARS = /[^0-9A-Za-z]/g;
  const [lobbyKey, setLobbyKey] = createSignal('');

  const handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key.length > 1 || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key.match(INVALID_CHARS)) e.preventDefault();
  };

  const handleKeyInput = (
    e: InputEvent & { currentTarget: HTMLInputElement }
  ): void => {
    const originalValue = e.currentTarget.value;
    let filteredValue = originalValue.replace(INVALID_CHARS, '');

    if (filteredValue.length > MAX_LENGTH)
      filteredValue = filteredValue.substring(0, MAX_LENGTH);

    if (originalValue !== filteredValue) e.currentTarget.value = filteredValue;

    setLobbyKey(filteredValue);
  };

  const isJoinEnabled = createMemo(() => lobbyKey().length === MAX_LENGTH);

  return (
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
          border: 0.125rem solid ${COLOR_VARIABLES.secondary};
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
            gap: 0.625rem;
            display: inherit;
            flex-direction: column;

            ${MEDIA_QUERIES.sm} {
              flex-direction: row;
            }
          `}>
          <Tile
            setGameMode={() => void props.setGameMode('pve')}
            children={
              <>
                <FaSolidRobot />
                <span>Computer</span>
              </>
            }
          />

          <Tile
            setGameMode={() => void props.setGameMode('pvp', 'public')}
            children={
              <>
                <FaSolidUserGroup />
                <span>Public</span>
              </>
            }
          />

          <div
            class={css`
              gap: 0.375rem;
              display: inherit;
              max-height: 11rem;
              flex-direction: column;
            `}>
            <Tile
              setGameMode={() =>
                void props.setGameMode('pvp', 'private_create')
              }
              children={
                <>
                  <BiSolidLock />
                  <span>Private</span>
                </>
              }
            />

            <div
              class={css`
                gap: 0.25rem;
                width: 11rem;
                display: inherit;
              `}>
              <input
                title=''
                type='text'
                name='lobby-key'
                value={lobbyKey()}
                maxLength={MAX_LENGTH}
                onInput={handleKeyInput}
                onKeyDown={handleKeyDown}
                class={css`
                  width: 100%;
                  border: none;
                  font-size: 1.25rem;
                  padding: 0 0.375rem;
                  border-radius: 0.125rem;
                  outline: 1px solid transparent;
                  color: ${COLOR_VARIABLES.grid};
                  caret-color: ${COLOR_VARIABLES.primary};
                  background: ${COLOR_VARIABLES.secondary};
                  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

                  &:hover {
                    outline-color: ${COLOR_VARIABLES.hover};
                  }

                  &:focus {
                    outline-color: ${COLOR_VARIABLES.hover};
                  }
                `}
              />

              <button
                title='Join'
                type='button'
                disabled={!isJoinEnabled()}
                onClick={() =>
                  void props.setGameMode('pvp', 'private_join', lobbyKey())
                }
                class={css`
                  line-height: 0;
                  aspect-ratio: 1;
                  cursor: pointer;
                  font-size: 1rem;
                  font-weight: 500;
                  border-radius: 0.125rem;
                  color: ${COLOR_VARIABLES.secondary};
                  background: ${COLOR_VARIABLES.primary};
                  border: 0.125rem solid ${COLOR_VARIABLES.secondary};
                  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

                  svg {
                    font-size: 1.25rem;
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

                  &:disabled {
                    cursor: not-allowed;
                    color: ${COLOR_VARIABLES.ship};
                    background: ${COLOR_VARIABLES.hover};
                    border-color: ${COLOR_VARIABLES.ship};
                  }

                  ${MEDIA_QUERIES.md} {
                    font-size: 1.25rem;

                    svg {
                      font-size: 1.5rem;
                    }
                  }
                `}>
                <BiSolidKey />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModeSelection;
