import { css } from '@emotion/css';
import { For, type JSXElement } from 'solid-js';

import { COLOR_VARIABLES } from '@/app.tsx';
import { Player } from '@/game/player.ts';

export const Gameboard = (props: { isPlayerOne: boolean }): JSXElement => {
  const game = new Player();

  return (
    <section
      class={css`
        font-size: 2.5rem;
        font-weight: 600;
        display: grid;
        border: 1px solid ${COLOR_VARIABLES.primary};
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
                  color: #000;
                  background-color: ${gridElem
                    ? '#000'
                    : COLOR_VARIABLES.primary};
                  border: 1px solid ${COLOR_VARIABLES.secondary};
                  padding: 10px;
                  text-align: center;
                `}
              />
            )}
          </For>
        )}
      </For>
    </section>
  );
};
