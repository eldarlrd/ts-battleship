import { Ship } from '@/logic/ship.ts';

describe('ship class', () => {
  const battleship = new Ship(4);

  it('returns a new ship object', () => {
    const intactShip = {
      length: 4,
      hits: 0,
      sunk: false
    };

    expect(battleship).toMatchObject(intactShip);
  });

  it('hits a ship', () => {
    const hitShip = {
      length: 4,
      hits: 1,
      sunk: false
    };

    battleship.hit();
    expect(battleship).toMatchObject(hitShip);
  });

  it('sinks a ship', () => {
    const sunkShip = {
      length: 4,
      hits: 4,
      sunk: true
    };

    battleship.hit();
    battleship.hit();
    battleship.hit();
    battleship.hit(); // Sad Path Extra Hit
    expect(battleship).toMatchObject(sunkShip);
  });
});
