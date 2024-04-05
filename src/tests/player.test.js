import Player from '../modules/player';

const player = new Player('Player');
const computer = new Player('Computer');

player.gameboard.placeRandom();
computer.gameboard.placeRandom();

describe('Player initialization', () => {
  test('Player did not attack anyone', () => {
    expect(
      player.shots.every((row) => row.every((val) => val === null))
    ).toBeTruthy();
  });
});

test('Player shots are updated when attacking computer', () => {
  player.attack(computer, 0, 0);
  expect(
    player.shots.every((row) => row.every((val) => val === null))
  ).toBeFalsy();
});

test('Computer shots are updated when attacking player randomly', () => {
  computer.attackRandom(player);
  expect(
    computer.shots.every((row) => row.every((val) => val === null))
  ).toBeFalsy();
});
