type GameMode = 'pve' | 'pvp';

const LOBBY_ALPHABET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

// TTL Duration
const DURATION_IN_MINUTES = 15;
const DURATION_MS = DURATION_IN_MINUTES * 60 * 1000;

// Milton Bradley rules & Hasbro names
const SHIPS = [
  '5 Carrier',
  '4 Battleship',
  '3 Destroyer',
  '3 Submarine',
  '2 Patrol Boat'
] as const;
const GRID_SIZE = 10;
const SHIP_COUNT = ~~(GRID_SIZE / 2);

export {
  type GameMode,
  LOBBY_ALPHABET,
  DURATION_MS,
  SHIPS,
  GRID_SIZE,
  SHIP_COUNT
};
