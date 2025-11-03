import { css } from '@emotion/css';
import { type JSXElement, For } from 'solid-js';

import { SHIPS } from '@/config/rules.ts';
import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/config/site.ts';
import { type Player } from '@/logic/player.ts';
import { Ship } from '@/logic/ship.ts';

interface GameboardSettings {
  isPlayerBoard: boolean;
  isPlacing: boolean;
  isVertical: boolean;
  game: Player;
  shipInfo?: HTMLSpanElement;
  startButton?: HTMLButtonElement;
}

export const Gameboard = (props: GameboardSettings): JSXElement => {
  const placeShip = (row: number, col: number): void => {
    if (props.game.playerBoard.shipsPlaced >= 5) return;

    const shipLengthArr = [5, 4, 3, 3, 2];
    const shipLength = shipLengthArr[props.game.playerBoard.shipsPlaced];
    const ship = new Ship(shipLength);

    if (
      props.game.successfullyPlace(
        props.game.playerBoard,
        ship,
        false,
        row,
        col,
        props.isVertical
      )
    ) {
      const playerId = props.isPlayerBoard ? 'p1-' : 'p2-';
      const cell = props.game.playerBoard.grid[row][col];

      if (cell)
        for (let i = 0; i < cell.length; i++) {
          const currRow = cell.isVertical ? cell.coords.row + i : row;
          const currCol = cell.isVertical ? col : cell.coords.col + i;

          const element = document.getElementById(
            playerId + (currRow * 10 + currCol).toString()
          );

          if (element) {
            element.style.backgroundColor = COLOR_VARIABLES.ship;
            element.style.cursor = 'default';
          }
        }

      props.game.playerBoard.shipsPlaced++;

      if (props.game.playerBoard.shipsPlaced >= 5)
        if (props.startButton) props.startButton.disabled = false;

      if (props.shipInfo) {
        props.shipInfo.innerText =
          props.game.playerBoard.shipsPlaced >= 5 ?
            'All Ships Ready!'
          : SHIPS[props.game.playerBoard.shipsPlaced];
      }
    }
  };

  const attackCell = (row: number, col: number): void => {
    if (props.game.playerVictorious) return;

    const isSuccessfulHit = props.game.takeTurn({ row, col });

    if (isSuccessfulHit) {
      checkImpact(row, col);
      document.dispatchEvent(new Event('attack'));

      if (!props.game.playerVictorious)
        setTimeout((): void => {
          const compCoord = props.game.computerTurn();

          checkImpact(compCoord.row, compCoord.col);
          document.dispatchEvent(new Event('attack'));
        }, 150);
    }
  };

  const checkImpact = (cellRow: number, cellCol: number): void => {
    const playerId = props.game.isCurrPlayerOne ? 'p1-' : 'p2-';
    const currBoard =
      props.game.isCurrPlayerOne ?
        props.game.playerBoard
      : props.game.computerBoard;
    const element = document.getElementById(
      playerId + (cellRow * 10 + cellCol).toString()
    );

    currBoard.impacts.forEach(impact => {
      const { row, col } = impact;
      const cell = currBoard.grid[row][col];

      if (!cell) {
        if (
          currBoard.impacts.some(
            impact => impact.row === cellRow && impact.col === cellCol
          ) &&
          element
        ) {
          element.style.backgroundColor = COLOR_VARIABLES.emptyHit;
          element.style.cursor = 'default';
        }
      } else if (
        currBoard.impacts.some(
          impact => impact.row === cellRow && impact.col === cellCol
        ) &&
        element
      ) {
        if (cell.sunk)
          for (let i = 0; i < cell.length; i++) {
            const currRow = cell.isVertical ? cell.coords.row + i : row;
            const currCol = cell.isVertical ? col : cell.coords.col + i;

            const element = document.getElementById(
              playerId + (currRow * 10 + currCol).toString()
            );

            if (element) {
              element.style.backgroundColor = COLOR_VARIABLES.shipSunk;
              const adjCells = currBoard.hitAdjacent({
                row: currRow,
                col: currCol
              });

              adjCells.forEach(coord => {
                const adjHit = document.getElementById(
                  playerId + (coord.row * 10 + coord.col).toString()
                );

                if (adjHit) {
                  adjHit.style.backgroundColor = COLOR_VARIABLES.emptyHit;
                  adjHit.style.cursor = 'default';
                }
              });
            }
          }
        else element.style.backgroundColor = COLOR_VARIABLES.shipHit;
        element.style.cursor = 'default';
      }
    });
  };

  const handleCellHover = (
    row: number,
    col: number,
    isEntering: boolean
  ): void => {
    if (
      !props.isPlacing ||
      !props.isPlayerBoard ||
      props.game.playerBoard.shipsPlaced >= 5
    )
      return;

    const shipLengthArr = [5, 4, 3, 3, 2];
    const shipLength = shipLengthArr[props.game.playerBoard.shipsPlaced];
    const playerId = 'p1-';

    let canPlace = true;
    const elementsToStyle: HTMLElement[] = [];

    const potentialCoords: { row: number; col: number }[] = [];

    for (let i = 0; i < shipLength; i++) {
      const currRow = props.isVertical ? row + i : row;
      const currCol = props.isVertical ? col : col + i;

      potentialCoords.push({ row: currRow, col: currCol });
    }

    for (const coord of potentialCoords) {
      // Out of Bounds Check
      if (coord.row >= 10 || coord.col >= 10) {
        canPlace = false;
        break;
      }

      // Overlap Check
      if (props.game.playerBoard.grid[coord.row][coord.col]) {
        canPlace = false;
        break;
      }

      // Adjacency Check
      for (let r = coord.row - 1; r <= coord.row + 1; r++) {
        for (let c = coord.col - 1; c <= coord.col + 1; c++) {
          if (r === coord.row && c === coord.col) continue;
          if (r < 0 || r >= 10 || c < 0 || c >= 10) continue;

          const isPartOfNewShip = potentialCoords.some(
            pCoord => pCoord.row === r && pCoord.col === c
          );

          if (isPartOfNewShip) continue;

          if (props.game.playerBoard.grid[r][c]) {
            canPlace = false;
            break;
          }
        }
        if (!canPlace) break;
      }
      if (!canPlace) break;
    }

    for (const coord of potentialCoords)
      if (coord.row < 10 && coord.col < 10) {
        const elementId = playerId + (coord.row * 10 + coord.col).toString();
        const element = document.getElementById(elementId);

        if (element) elementsToStyle.push(element);
      }

    const hoverState = canPlace ? 'valid' : 'invalid';

    elementsToStyle.forEach(el => {
      if (isEntering) el.dataset.shipHover = hoverState;
      else delete el.dataset.shipHover;
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
        position: relative;
      `}>
      <For each={props.game.playerBoard.grid}>
        {(gridRow, i) => (
          <For each={gridRow}>
            {(gridElem, j) => (
              <button
                type='button'
                id={`${props.isPlayerBoard ? 'p1-' : 'p2-'}${(i() * 10 + j()).toString()}`}
                onClick={() => {
                  if (props.isPlacing && props.game.playerBoard.shipsPlaced < 5)
                    placeShip(i(), j());
                  if (!props.isPlayerBoard) attackCell(i(), j());
                }}
                onMouseEnter={() => {
                  handleCellHover(i(), j(), true);
                }}
                onMouseLeave={() => {
                  handleCellHover(i(), j(), false);
                }}
                class={css`
                  background: ${gridElem && props.isPlayerBoard ?
                    COLOR_VARIABLES.ship
                  : COLOR_VARIABLES.secondary};
                  border: 1px solid ${COLOR_VARIABLES.grid};
                  padding: ${props.isPlacing ? '14.5px' : '15.5px'};
                  text-align: center;
                  cursor: ${(!props.isPlayerBoard ||
                    (props.isPlacing && !gridElem)) &&
                  'pointer'};

                  &[data-ship-hover='valid'] {
                    background: ${COLOR_VARIABLES.hover};
                  }

                  &[data-ship-hover='invalid'] {
                    background: ${COLOR_VARIABLES.outOfBounds};
                  }

                  ${MEDIA_QUERIES.mouse} {
                    &:hover {
                      background: ${!props.isPlayerBoard &&
                      COLOR_VARIABLES.hover};
                    }
                  }

                  ${MEDIA_QUERIES.sm} {
                    padding: ${props.isPlacing ? '16.5px' : '13.5px'};
                  }

                  ${MEDIA_QUERIES.md} {
                    padding: ${props.isPlacing ? '18.5px' : '16.5px'};
                  }

                  ${MEDIA_QUERIES.lg} {
                    padding: 1.25rem;
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
