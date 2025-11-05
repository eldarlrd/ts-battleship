import { css } from '@emotion/css';
import {
  type JSXElement,
  For,
  createSignal,
  type Setter,
  createEffect,
  on
} from 'solid-js';

import { SHIPS } from '@/config/rules.ts';
import { COLOR_VARIABLES, MEDIA_QUERIES } from '@/config/site.ts';
import { OnlinePlayer } from '@/logic/onlinePlayer.ts';
import { type Player } from '@/logic/player.ts';
import { Ship } from '@/logic/ship.ts';

interface GameboardSettings {
  isPlayerBoard: boolean;
  isPlacing: boolean;
  isVertical: boolean;
  game: Player | OnlinePlayer;
  shipInfo?: HTMLSpanElement;
  startButton?: HTMLButtonElement;
  setIsDoneSetup?: Setter<boolean>;
  boardUpdateTrigger?: () => number;
  placementRefreshTrigger?: () => number;
}

export const Gameboard = (props: GameboardSettings): JSXElement => {
  const [isComputerTurn, setIsComputerTurn] = createSignal(false);

  // Function to refresh visual board state based on current grid
  const refreshBoardVisuals = (): void => {
    if (!props.isPlayerBoard || !props.isPlacing) return;

    const playerId = 'p1-';
    const board = props.game.playerBoard;

    // Clear all cell styles first
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const element = document.getElementById(
          playerId + (row * 10 + col).toString()
        );

        if (element) {
          const cell = board.grid[row][col];

          if (cell) {
            element.style.backgroundColor = COLOR_VARIABLES.ship;
            element.style.cursor = 'default';
          } else {
            element.style.backgroundColor = COLOR_VARIABLES.secondary;
            element.style.cursor = 'pointer';
          }
        }
      }
    }
  };

  // Effect to refresh board visuals during placement (for randomize/clear)
  createEffect(
    on(
      () => props.placementRefreshTrigger?.(),
      () => {
        refreshBoardVisuals();
      },
      { defer: true }
    )
  );

  // Effect to update visual state when board changes (for online mode)
  createEffect(
    on(
      () => props.boardUpdateTrigger?.(),
      () => {
        if (props.game instanceof OnlinePlayer) {
          if (props.isPlayerBoard) {
            // Apply visual updates for all impacts on player board (opponent's moves)
            props.game.playerBoard.impacts.forEach(impact => {
              checkImpact(impact.row, impact.col);
            });
          } else {
            // Apply visual updates for all impacts on opponent board (our moves)
            props.game.opponentBoard.impacts.forEach(impact => {
              checkImpact(impact.row, impact.col);
            });
          }
        }
      },
      { defer: true }
    )
  );
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

      if (props.game.playerBoard.shipsPlaced >= 5) {
        if (props.startButton) props.startButton.disabled = false;
        if (props.setIsDoneSetup) props.setIsDoneSetup(true);
      }

      if (props.shipInfo) {
        props.shipInfo.innerText =
          props.game.playerBoard.shipsPlaced >= 5 ?
            'All Ships Ready!'
          : SHIPS[props.game.playerBoard.shipsPlaced];
      }
    }
  };

  const attackCell = async (row: number, col: number): Promise<void> => {
    if (props.game.playerVictorious) return;

    // For online games, check if it's the player's turn
    if ('isCurrPlayerTurn' in props.game && !props.game.isCurrPlayerTurn) {
      return;
    }

    // For PvE mode, check if computer is taking its turn
    if (!('isCurrPlayerTurn' in props.game) && isComputerTurn()) {
      return;
    }

    // Await the async takeTurn call for online games
    const turnResult = props.game.takeTurn({ row, col });
    const isSuccessfulHit =
      turnResult instanceof Promise ? await turnResult : turnResult;
    const moveDelay = 500;

    if (isSuccessfulHit) {
      checkImpact(row, col);
      document.dispatchEvent(new Event('attack'));

      // Only trigger computer turn for PvE mode (Player class)
      if (!props.game.playerVictorious && !('isCurrPlayerTurn' in props.game)) {
        setIsComputerTurn(true);
        setTimeout((): void => {
          const compCoord = props.game.computerTurn();

          checkImpact(compCoord.row, compCoord.col);
          document.dispatchEvent(new Event('attack'));
          setIsComputerTurn(false);
        }, moveDelay);
      }
    }
  };

  const checkImpact = (cellRow: number, cellCol: number): void => {
    // Use props.isPlayerBoard to determine which board's DOM elements to target
    const playerId = props.isPlayerBoard ? 'p1-' : 'p2-';
    // Get the correct board based on which component this is
    const currBoard =
      props.isPlayerBoard ? props.game.playerBoard : props.game.computerBoard;

    // Get the cell at the specific impact location
    const cell = currBoard.grid[cellRow][cellCol];
    const element = document.getElementById(
      playerId + (cellRow * 10 + cellCol).toString()
    );

    if (!element) return;

    // Check if this cell was actually hit
    const wasHit = currBoard.impacts.some(
      impact => impact.row === cellRow && impact.col === cellCol
    );

    if (!wasHit) return;

    // Handle miss (empty cell)
    if (!cell) {
      element.style.backgroundColor = COLOR_VARIABLES.emptyHit;
      element.style.cursor = 'default';
    }
    // Handle hit on ship (Ship object)
    else if (typeof cell === 'object') {
      // Check if ship is sunk
      if (cell.sunk) {
        // Color all cells of the sunk ship
        for (let i = 0; i < cell.length; i++) {
          const currRow = cell.isVertical ? cell.coords.row + i : cellRow;
          const currCol = cell.isVertical ? cellCol : cell.coords.col + i;

          const shipElement = document.getElementById(
            playerId + (currRow * 10 + currCol).toString()
          );

          if (shipElement) {
            shipElement.style.backgroundColor = COLOR_VARIABLES.shipSunk;
            shipElement.style.cursor = 'default';

            // Mark adjacent cells as hits
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
      } else {
        // Ship hit but not sunk
        element.style.backgroundColor = COLOR_VARIABLES.shipHit;
        element.style.cursor = 'default';
      }
    }
    // Handle hit marker (number) for opponent board in online mode
    else if (typeof cell === 'number' && cell > 0) {
      // This is a hit on the opponent board (we don't have ship objects, just markers)
      element.style.backgroundColor = COLOR_VARIABLES.shipHit;
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
                  if (!props.isPlayerBoard) void attackCell(i(), j());
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
