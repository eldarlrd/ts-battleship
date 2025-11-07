type GameMode = 'pve' | 'pvp';

// Milton Bradley rules & Hasbro names
const SHIPS = [
  '5 Carrier',
  '4 Battleship',
  '3 Destroyer',
  '3 Submarine',
  '2 Patrol Boat'
] as const;

const DURATION_IN_MINUTES = 15;
const DURATION_MS = DURATION_IN_MINUTES * 60 * 1000;

const LOBBY_ALPHABET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export { type GameMode, SHIPS, DURATION_MS, LOBBY_ALPHABET };
