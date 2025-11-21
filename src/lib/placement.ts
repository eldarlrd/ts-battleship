import { GRID_SIZE } from '@/config/rules.ts';
import type Board from '@/logic/board.ts';
import type Ship from '@/logic/ship.ts';
import { type Coordinates } from '@/models/gameboard.model.ts';

const successfullyPlace = (
  board: Board,
  ship: Ship,
  isRandom: boolean,
  manualRow = 0,
  manualCol = 0,
  isVertical = false
): boolean => {
  let coords: Coordinates;
  let randomIsVertical: boolean;

  if (isRandom) {
    let placed = false;

    do {
      randomIsVertical = Math.random() < 0.5;
      coords = {
        row: ~~(Math.random() * GRID_SIZE),
        col: ~~(Math.random() * GRID_SIZE)
      };

      placed = board.place(ship, coords, randomIsVertical);
    } while (!placed);
  } else {
    coords = { row: manualRow, col: manualCol };
    randomIsVertical = isVertical;

    if (!board.place(ship, coords, randomIsVertical)) return false;
  }

  ship.isVertical = randomIsVertical;
  ship.coords = coords;

  return true;
};

export default successfullyPlace;
