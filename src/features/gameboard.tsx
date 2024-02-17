import { css } from '@emotion/css';
import { type JSXElement, For } from 'solid-js';

import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/app.tsx';
import { type Player } from '@/game/player.ts';
import { Ship } from '@/game/ship.ts';

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
            playerId + (currRow * 10 + currCol)
          );
          if (element) {
            element.style.backgroundColor = COLOR_VARIABLES.ship;
            element.style.cursor = 'default';
          }
        }

      props.game.playerBoard.shipsPlaced++;

      if (props.game.playerBoard.shipsPlaced === 5)
        if (props.startButton) props.startButton.disabled = false;

      if (props.shipInfo) {
        const shipNames = [
          '5 Carrier',
          '4 Battleship',
          '3 Destroyer',
          '3 Submarine',
          '2 Patrol Boat'
        ];
        props.shipInfo.innerText =
          props.game.playerBoard.shipsPlaced === 5
            ? 'All Ships Ready!'
            : shipNames[props.game.playerBoard.shipsPlaced];
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
    const currBoard = props.game.isCurrPlayerOne
      ? props.game.playerBoard
      : props.game.computerBoard;
    const element = document.getElementById(
      playerId + (cellRow * 10 + cellCol)
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
              playerId + (currRow * 10 + currCol)
            );
            if (element)
              element.style.backgroundColor = COLOR_VARIABLES.shipSunk;
          }
        else element.style.backgroundColor = COLOR_VARIABLES.shipHit;
        element.style.cursor = 'default';
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
        position: relative;
      `}>
      <For each={props.game.playerBoard.grid}>
        {(gridRow, i) => (
          <For each={gridRow}>
            {(gridElem, j) => (
              <button
                type='button'
                id={`${props.isPlayerBoard ? 'p1-' : 'p2-'}${i() * 10 + j()}`}
                onClick={() => {
                  if (props.isPlacing && props.game.playerBoard.shipsPlaced < 5)
                    placeShip(i(), j());
                  !props.isPlayerBoard && attackCell(i(), j());
                }}
                class={css`
                  background-color: ${gridElem && props.isPlayerBoard
                    ? COLOR_VARIABLES.ship
                    : COLOR_VARIABLES.secondary};
                  border: 1px solid ${COLOR_VARIABLES.grid};
                  padding: ${props.isPlacing ? '14.5px' : '15.5px'};
                  text-align: center;
                  cursor: ${(!props.isPlayerBoard ||
                    (props.isPlacing && !gridElem)) &&
                  'pointer'};

                  &:hover {
                    background-color: ${(!props.isPlayerBoard ||
                      (props.isPlacing && !gridElem)) &&
                    COLOR_VARIABLES.hover};
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
