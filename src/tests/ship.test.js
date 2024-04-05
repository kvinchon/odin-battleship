import Ship from '../modules/ship';

const carrier = new Ship('Carrier', 5);

describe('Carrier initialization', () => {
  test('Length is equal to 5', () => {
    expect(carrier.length).toBe(5);
  });

  test('Carrier has not been hit', () => {
    expect(carrier.hits.length).toBe(0);
  });

  test('Carrier is not sunk', () => {
    expect(carrier.isSunk()).toBeFalsy();
  });
});

describe('Carrier hit', () => {
  test('Hits are updated when carrier is hit', () => {
    carrier.hit(0);
    expect(carrier.hits.length).toBe(1);
  });

  test('Carrier is not sunk after one hit', () => {
    expect(carrier.isSunk()).toBeFalsy();
  });

  test('Carrier is sunk when number of hits is equal to his length', () => {
    carrier.hits = [0, 1, 2, 3];
    carrier.hit(4);
    expect(carrier.isSunk()).toBeTruthy();
  });

  test('Cannot hit carrier when it is sunk', () => {
    expect(carrier.hit(3)).toBeFalsy();
  });
});
