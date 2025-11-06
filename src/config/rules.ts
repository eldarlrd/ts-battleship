type GameMode = 'pve' | 'pvp';

// Milton Bradley rules & Hasbro names
const SHIPS = [
  '5 Carrier',
  '4 Battleship',
  '3 Destroyer',
  '3 Submarine',
  '2 Patrol Boat'
] as const;

export { type GameMode, SHIPS };
