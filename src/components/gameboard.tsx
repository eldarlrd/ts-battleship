import { css } from '@emotion/css';
import { For, type JSXElement } from 'solid-js';

import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/app.tsx';
import { type Coordinates } from '@/game/board.ts';
import { type Player } from '@/game/player.ts';

export const Gameboard = (props: {
  isPlayerOneBoard: boolean;
  game: Player;
}): JSXElement => {
  const attackCell = (row: number, col: number): void => {
    const isSuccessfulHit = props.game.takeTurn({ row, col });
    if (isSuccessfulHit) {
      checkImpact(row, col);
      const compCoord = props.game.computerTurn();
      checkImpact(compCoord.row, compCoord.col);
    }
  };

  const checkImpact = (cellRow: number, cellCol: number): void => {
    const element = document.getElementById(
      (!props.game.isCurrPlayerOne ? 'p2-' : 'p1-') + (cellRow * 10 + cellCol)
    );

    const emptyImpacts: Coordinates[] = [];
    const shipImpacts: Coordinates[] = [];

    props.game.playerTwoBoard.impacts.forEach(impact => {
      const { row, col } = impact;
      if (!props.game.playerTwoBoard.grid[row][col]) {
        emptyImpacts.push(impact);
        if (
          emptyImpacts.some(
            impact => impact.row === cellRow && impact.col === cellCol
          ) &&
          element
        ) {
          element.style.backgroundColor = COLOR_VARIABLES.emptyHit;
          element.style.cursor = 'default';
        }
      } else if (props.game.playerTwoBoard.grid[row][col]) {
        shipImpacts.push(impact);
        if (
          shipImpacts.some(
            impact => impact.row === cellRow && impact.col === cellCol
          ) &&
          element
        ) {
          element.style.backgroundColor = COLOR_VARIABLES.shipHit;
          element.style.cursor = 'default';
        }
      }
    });

    props.game.playerOneBoard.impacts.forEach(impact => {
      const { row, col } = impact;
      if (!props.game.playerOneBoard.grid[row][col]) {
        emptyImpacts.push(impact);
        if (
          emptyImpacts.some(
            impact => impact.row === cellRow && impact.col === cellCol
          ) &&
          element
        ) {
          element.style.backgroundColor = COLOR_VARIABLES.emptyHit;
          element.style.cursor = 'default';
        }
      } else if (props.game.playerOneBoard.grid[row][col]) {
        shipImpacts.push(impact);
        if (
          shipImpacts.some(
            impact => impact.row === cellRow && impact.col === cellCol
          ) &&
          element
        ) {
          element.style.backgroundColor = COLOR_VARIABLES.shipHit;
          element.style.cursor = 'default';
        }
      }
    });
  };

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
          props.isPlayerOneBoard
            ? props.game.playerOneBoard.grid
            : props.game.playerTwoBoard.grid
        }>
        {(gridRow, i) => (
          <For each={gridRow}>
            {(gridElem, j) => (
              <button
                type='button'
                id={`${props.isPlayerOneBoard ? 'p1-' : 'p2-'}${(
                  i() * 10 +
                  j()
                ).toString()}`}
                onClick={() => {
                  !props.isPlayerOneBoard && attackCell(i(), j());
                }}
                class={css`
                  background-color: ${gridElem && props.isPlayerOneBoard
                    ? COLOR_VARIABLES.ship
                    : COLOR_VARIABLES.primary};
                  border: 1px solid ${COLOR_VARIABLES.grid};
                  padding: 11px;
                  text-align: center;
                  cursor: ${!props.isPlayerOneBoard && 'pointer'};

                  &:hover {
                    background-color: ${!props.isPlayerOneBoard &&
                    COLOR_VARIABLES.hover};
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
