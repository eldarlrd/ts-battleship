import { css } from '@emotion/css';
import {
  createEffect,
  createSignal,
  For,
  type JSXElement,
  on,
  onCleanup,
  onMount,
  type Setter
} from 'solid-js';

import shipDeploySound from '#/sfx/deploy.opus';
import shipErrorSound from '#/sfx/error.opus';
import { GRID_SIZE, SHIP_COUNT, SHIP_LENGTHS, SHIPS } from '@/config/rules.ts';
import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/config/site.ts';
import { playSound } from '@/lib/audio.ts';
import { successfullyPlace } from '@/lib/placement.ts';
import { OnlinePlayer } from '@/logic/onlinePlayer.ts';
import { Player } from '@/logic/player.ts';
import { Ship } from '@/logic/ship.ts';

interface GameboardSettings {
  isPlayerBoard: boolean;
  isPlacing: boolean;
  isVertical: boolean;
  isOpponentTurn?: boolean;
  game: Player | OnlinePlayer;
  shipInfo?: HTMLSpanElement;
  startButton?: HTMLButtonElement;
  setIsDoneSetup?: Setter<boolean>;
  setIsOpponentTurn?: Setter<boolean>;
  boardUpdateTrigger?: () => number;
  placementRefreshTrigger?: () => number;
}

export const Gameboard = (props: GameboardSettings): JSXElement => {
  const [isComputerTurn, setIsComputerTurn] = createSignal(false);

  const refreshBoardVisuals = (): void => {
    if (!props.isPlayerBoard || !props.isPlacing) return;

    const playerId = 'p1-';
    const board = props.game.playerBoard;

    // Clear all styles
    for (let row = 0; row < GRID_SIZE; row++)
      for (let col = 0; col < GRID_SIZE; col++) {
        const element = document.getElementById(
          playerId + (row * GRID_SIZE + col).toString()
        );

        if (element) {
          element.style.backgroundColor = '';
          const cell = board.grid[row][col];

          if (cell) {
            element.style.backgroundColor = COLOR_VARIABLES.ship;
            element.dataset.shipPlaced = 'true';
            element.style.cursor = 'default';
          } else {
            delete element.dataset.shipPlaced;
            element.style.cursor = 'pointer';
          }

          delete element.dataset.shipHover;
        }
      }
  };

  createEffect(
    on(
      () => props.placementRefreshTrigger?.(),
      () => {
        refreshBoardVisuals();
      },
      { defer: true }
    )
  );

  createEffect(
    on(
      () => props.boardUpdateTrigger?.(),
      () => {
        if (props.game instanceof OnlinePlayer) {
          if (props.isPlayerBoard) {
            props.game.playerBoard.impacts.forEach(impact => {
              checkImpact(impact.row, impact.col);
            });

            console.log('if', props.isOpponentTurn);

            props.setIsOpponentTurn?.(prev => !prev);
          } else {
            props.game.opponentBoard.impacts.forEach(impact => {
              checkImpact(impact.row, impact.col);
            });

            console.log('else', props.isOpponentTurn);

            props.setIsOpponentTurn?.(prev => !prev);
          }
        }
      },
      { defer: true }
    )
  );

  onMount(() => {
    if (props.game instanceof OnlinePlayer)
      props.setIsOpponentTurn?.(props.game.isPlayer1);

    if (props.isPlayerBoard && !(props.game instanceof OnlinePlayer)) {
      const handleComputerAttack = (event: Event): void => {
        const customEvent = event as CustomEvent<{
          row: number;
          col: number;
        }>;
        const { row, col } = customEvent.detail;

        props.setIsOpponentTurn?.(false);
        checkImpact(row, col);
      };

      document.addEventListener('computerAttack', handleComputerAttack);
      onCleanup(() => {
        document.removeEventListener('computerAttack', handleComputerAttack);
      });
    }
  });

  const placeShip = (row: number, col: number): void => {
    if (props.game.playerBoard.shipsPlaced >= SHIP_COUNT) return;

    const shipLength = SHIP_LENGTHS[props.game.playerBoard.shipsPlaced];
    const ship = new Ship(shipLength);

    if (
      successfullyPlace(
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

      playSound(shipDeploySound);

      if (cell)
        for (let i = 0; i < cell.length; i++) {
          const currRow = cell.isVertical ? cell.coords.row + i : row;
          const currCol = cell.isVertical ? col : cell.coords.col + i;

          const element = document.getElementById(
            playerId + (currRow * GRID_SIZE + currCol).toString()
          );

          if (element) {
            element.style.backgroundColor = COLOR_VARIABLES.ship;
            element.style.cursor = 'default';
          }
        }

      props.game.playerBoard.shipsPlaced++;

      if (props.game.playerBoard.shipsPlaced >= SHIP_COUNT) {
        if (props.startButton) props.startButton.disabled = false;
        if (props.setIsDoneSetup) props.setIsDoneSetup(true);
      }

      if (props.shipInfo)
        props.shipInfo.innerText =
          props.game.playerBoard.shipsPlaced >= SHIP_COUNT ?
            'Battle ready!'
          : SHIPS[props.game.playerBoard.shipsPlaced];
    } else playSound(shipErrorSound);
  };

  const attackCell = (row: number, col: number): void => {
    if (props.game.playerVictorious) return;

    if ('isCurrPlayerTurn' in props.game && !props.game.isCurrPlayerTurn)
      return;

    if (!('isCurrPlayerTurn' in props.game) && isComputerTurn()) return;

    const isSuccessfulHit = props.game.takeTurn({ row, col });
    const moveDelay = 1500; // 1.5 seconds

    if (isSuccessfulHit) {
      checkImpact(row, col);
      document.dispatchEvent(new Event('attack'));
      if (!('isCurrPlayerTurn' in props.game)) props.setIsOpponentTurn?.(true);

      if (!props.game.playerVictorious && !('isCurrPlayerTurn' in props.game)) {
        setIsComputerTurn(true);
        setTimeout((): void => {
          const compCoord = (props.game as Player).computerTurn();

          document.dispatchEvent(
            new CustomEvent('computerAttack', { detail: compCoord })
          );

          document.dispatchEvent(new Event('attack'));
          setIsComputerTurn(false);
        }, moveDelay);
      }
    }
  };

  const checkImpact = (cellRow: number, cellCol: number): void => {
    const playerId = props.isPlayerBoard ? 'p1-' : 'p2-';
    const currBoard =
      props.isPlayerBoard ? props.game.playerBoard : props.game.computerBoard;

    const element = document.getElementById(
      playerId + (cellRow * GRID_SIZE + cellCol).toString()
    );

    if (!element) return;

    const wasHit = currBoard.impacts.some(
      impact => impact.row === cellRow && impact.col === cellCol
    );
    const cell = currBoard.grid[cellRow][cellCol];

    if (!wasHit && !(props.game instanceof Player && !props.isPlayerBoard))
      return;

    if (!cell) {
      element.style.backgroundColor = COLOR_VARIABLES.emptyHit;
      element.style.cursor = 'default';
    } else if (typeof cell === 'object') {
      if (cell.sunk) {
        for (let i = 0; i < cell.length; i++) {
          const currRow = cell.isVertical ? cell.coords.row + i : cellRow;
          const currCol = cell.isVertical ? cellCol : cell.coords.col + i;

          const shipElement = document.getElementById(
            playerId + (currRow * GRID_SIZE + currCol).toString()
          );

          if (shipElement) {
            shipElement.style.backgroundColor = COLOR_VARIABLES.shipSunk;
            shipElement.style.cursor = 'default';

            const adjCells = currBoard.hitAdjacent({
              row: currRow,
              col: currCol
            });

            adjCells.forEach(coord => {
              const adjHit = document.getElementById(
                playerId + (coord.row * GRID_SIZE + coord.col).toString()
              );

              if (adjHit) {
                adjHit.style.backgroundColor = COLOR_VARIABLES.emptyHit;
                adjHit.style.cursor = 'default';
              }
            });
          }
        }
      } else {
        element.style.backgroundColor = COLOR_VARIABLES.shipHit;
        element.style.cursor = 'default';
      }
    } else if (cell === 1) {
      element.style.backgroundColor = COLOR_VARIABLES.shipHit;
      element.style.cursor = 'default';
    } else if (cell === 2) {
      element.style.backgroundColor = COLOR_VARIABLES.shipSunk;
      element.style.cursor = 'default';
    }
  };

  const handleCellHover = (
    row: number,
    col: number,
    isEntering: boolean
  ): void => {
    if (
      !props.isPlacing ||
      !props.isPlayerBoard ||
      props.game.playerBoard.shipsPlaced >= SHIP_COUNT
    )
      return;

    const shipLength = SHIP_LENGTHS[props.game.playerBoard.shipsPlaced];
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
      if (coord.row >= GRID_SIZE || coord.col >= GRID_SIZE) {
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
          if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) continue;

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
      if (coord.row < GRID_SIZE && coord.col < GRID_SIZE) {
        const elementId =
          playerId + (coord.row * GRID_SIZE + coord.col).toString();
        const element = document.getElementById(elementId);

        if (element) elementsToStyle.push(element);
      }

    const hoverState = canPlace ? 'valid' : 'invalid';

    elementsToStyle.forEach(el => {
      if (isEntering) el.dataset.shipHover = hoverState;
      else delete el.dataset.shipHover;
    });
  };

  const spinnerContainer = css`
    position: relative;
    padding: 3px;
    margin: -3px;
    border-radius: 0.125rem;
    overflow: hidden;
    isolation: isolate;

    &:before {
      content: '';
      position: absolute;
      top: -100%;
      left: -100%;
      width: 300%;
      height: 300%;
      z-index: -1;

      background: conic-gradient(
        ${COLOR_VARIABLES.secondary} 0% 16%,
        transparent 16% 44%,
        transparent 44% 72%,
        transparent 72% 100%
      );

      animation: spin 1.5s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(1turn);
      }
    }
  `;

  return (
    <div class={props.isOpponentTurn ? spinnerContainer : ''}>
      <section
        class={css`
          font-size: 2.5rem;
          font-weight: 600;
          display: grid;
          border: 1px solid ${COLOR_VARIABLES.grid};
          grid-template-columns: repeat(${GRID_SIZE}, 1fr);
          grid-template-rows: repeat(${GRID_SIZE}, 1fr);
          max-width: 26.375rem;
          min-width: 19.5rem;
          position: relative;
          aspect-ratio: 1;
        `}>
        <For each={props.game.playerBoard.grid}>
          {(gridRow, i) => (
            <For each={gridRow}>
              {(gridElem, j) => (
                <button
                  type='button'
                  id={`${props.isPlayerBoard ? 'p1-' : 'p2-'}${(i() * GRID_SIZE + j()).toString()}`}
                  onClick={() => {
                    if (
                      props.isPlacing &&
                      props.game.playerBoard.shipsPlaced < SHIP_COUNT
                    )
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
    </div>
  );
};
