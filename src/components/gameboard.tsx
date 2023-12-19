import { css } from '@emotion/css';
import { For, type JSXElement } from 'solid-js';

import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/app.tsx';
import { Player } from '@/game/player.ts';

export const Gameboard = (props: { isPlayerOne: boolean }): JSXElement => {
  const game = new Player();

  return (
    <section
      class={css`
        font-size: 2.5rem;
        font-weight: 600;
        display: grid;
        border: 1px solid ${COLOR_VARIABLES.grid};
        grid-template-columns: repeat(10, 1fr);
        grid-template-rows: repeat(10, 1fr);
      `}>
      <For
        each={
          props.isPlayerOne
            ? game.playerOneBoard.grid
            : game.playerTwoBoard.grid
        }>
        {(gridRow, i) => (
          <For each={gridRow}>
            {(gridElem, j) => (
              <button
                type='button'
                id={(i() * 10 + j()).toString()}
                onClick={() => {
                  console.log((i() * 10 + j()).toString());
                }}
                class={css`
                  background-color: ${gridElem
                    ? COLOR_VARIABLES.ship
                    : COLOR_VARIABLES.primary};
                  border: 1px solid ${COLOR_VARIABLES.grid};
                  padding: 11px;
                  text-align: center;
                  cursor: ${props.isPlayerOne ? null : 'pointer'};

                  &:hover {
                    background-color: ${props.isPlayerOne
                      ? null
                      : COLOR_VARIABLES.hit};
                  }

                  ${MEDIA_QUERIES.sm} {
                    padding: 12px;
                  }

                  ${MEDIA_QUERIES.md} {
                    padding: 14px;
                  }

                  ${MEDIA_QUERIES.lg} {
                    padding: 1rem;
                  }
                `}
              />
            )}
          </For>
        )}
      </For>
    </section>
  );
};
