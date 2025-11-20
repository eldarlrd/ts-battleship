type GameMode = 'pve' | 'pvp';
type Status = 'waiting' | 'ready' | 'playing' | 'finished';

const LOBBY_ALPHABET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

// TTL Duration
const DURATION_IN_MINUTES = 15;
const DURATION_MS = DURATION_IN_MINUTES * 60 * 1000;

// * Easy to change: Milton Bradley rules & Hasbro names
const SHIPS = [
  '5 Carrier',
  '4 Battleship',
  '3 Destroyer',
  '3 Submarine',
  '2 Patrol Boat'
] as const;
const OG_SHIP_LENGTHS = [5, 4, 3, 3, 2];
const GRID_SIZE = 10;

// Board Adjustment
const SHIP_COUNT = ~~(GRID_SIZE / 2);
const SHIP_LENGTHS = OG_SHIP_LENGTHS.slice(0, SHIP_COUNT);

export {
  type GameMode,
  type Status,
  LOBBY_ALPHABET,
  DURATION_MS,
  SHIPS,
  GRID_SIZE,
  SHIP_COUNT,
  SHIP_LENGTHS
};
