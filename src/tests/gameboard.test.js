import Gameboard from '../modules/gameboard';
import Ship from '../modules/ship';

let gameboard = null;

beforeEach(() => {
  gameboard = new Gameboard();
});

describe('Gameboard initialization', () => {
  test('Board size is equal to 10x10', () => {
    expect(gameboard.board.length).toBe(10);
  });
});

test('Place ship accurately on board', () => {
  const patrol = new Ship('Patrol Boat', 2);
  const board = [];

  for (let i = 0; i < gameboard.size; i++) {
    board[i] = [];
    for (let j = 0; j < gameboard.size; j++) {
      board[i][j] = null;
    }
  }

  board[1][1] = patrol;
  board[2][1] = patrol;

  gameboard.placeShip(patrol, 1, 1, true);
  expect(gameboard.board).toEqual(board);
});

test('Place ships randomly on board and count all occurrences', () => {
  gameboard.placeRandom();
  expect(
    gameboard.board.reduce(
      (prev, cur) => prev + cur.filter((val) => val !== null).length,
      0
    )
  ).toBe(17);
});

test('Receive attack', () => {
  const carrier = new Ship('Carrier', 5);

  gameboard.placeShip(carrier, 0, 0);
  gameboard.receiveAttack(0, 3);

  expect(carrier.hits.length).toBe(1);
});

test('Game is over when all ships have been sunk', () => {
  const patrol = new Ship('Patrol Boat', 2);

  gameboard.placeShip(patrol, 5, 5, true);
  gameboard.receiveAttack(5, 5);
  gameboard.receiveAttack(6, 5);

  expect(gameboard.isGameOver()).toBeTruthy();
});
