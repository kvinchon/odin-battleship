import Gameboard from './gameboard';

class Player {
  constructor(name) {
    this.name = name;
    this.gameboard = null;
    this.shots = [];
    this.initialize();
  }

  initialize() {
    this.gameboard = new Gameboard();
    for (let i = 0; i < this.gameboard.size; i++) {
      this.shots[i] = [];
      for (let j = 0; j < this.gameboard.size; j++) {
        this.shots[i][j] = null;
      }
    }
  }

  attack(enemy, row, column) {
    if (!this.isValidAttack(row, column)) return false;

    this.shots[row][column] = enemy.gameboard.receiveAttack(row, column);
    return true;
  }

  attackRandom(enemy) {
    let enemyAttacked = false;
    let row = 0;
    let column = 0;

    while (!enemyAttacked) {
      // generates random attack coordinates for the computer
      row = Math.floor(Math.random() * 10);
      column = Math.floor(Math.random() * 10);

      if (this.isValidAttack(row, column)) {
        this.shots[row][column] = enemy.gameboard.receiveAttack(row, column);
        enemyAttacked = true;
      }
    }

    return [row, column];
  }

  isValidAttack(row, column) {
    if (
      row < 0 ||
      column < 0 ||
      row >= this.gameboard.size ||
      column >= this.gameboard.size ||
      this.shots[row][column] !== null
    )
      return false;

    return true;
  }
}

export default Player;
