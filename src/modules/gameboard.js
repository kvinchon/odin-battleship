import Ship from './ship';

class Gameboard {
  constructor() {
    this.size = 10;
    this.board = [];
    this.missedShots = [];
    this.initialize();
  }

  initialize() {
    for (let i = 0; i < this.size; i++) {
      this.board[i] = [];
      this.missedShots[i] = [];
      for (let j = 0; j < this.size; j++) {
        this.board[i][j] = null;
        this.missedShots[i][j] = false;
      }
    }
  }

  placeShip(ship, row, column, vertical = false) {
    if (!this.isValidLocation(ship, row, column, vertical)) return false;

    // place ship on the board
    for (let i = 0; i < ship.length; i++) {
      if (vertical) {
        this.board[row + i][column] = ship;
      } else {
        this.board[row][column + i] = ship;
      }
    }

    return true;
  }

  placeRandom() {
    const ships = [];
    const carrier = new Ship('Carrier', 5);
    const battleship = new Ship('Battleship', 4);
    const destroyer = new Ship('Destroyer', 3);
    const submarine = new Ship('Submarine', 3);
    const patrolBoat = new Ship('Patrol Boat', 2);

    ships.push(carrier, battleship, destroyer, submarine, patrolBoat);

    let currentShip = 0;
    while (currentShip < ships.length) {
      const ship = ships[currentShip];
      const vertical = Math.round(Math.random());

      // generates random location
      const row = vertical
        ? Math.floor(Math.random() * (this.size - ship.length))
        : Math.floor(Math.random() * this.size);
      const column = vertical
        ? Math.floor(Math.random() * this.size)
        : Math.floor(Math.random() * (this.size - ship.length));

      if (this.placeShip(ship, row, column, vertical)) {
        currentShip++;
      }
    }
  }

  isValidLocation(ship, row, column, vertical = false) {
    if (row < 0 || column < 0 || row >= this.size || column >= this.size)
      return false;

    // checks if ship is out of bounds
    if (vertical) {
      if (row + ship.length > this.size) return false;
    } else {
      if (column + ship.length > this.size) return false;
    }

    // checks whether the location is already taken
    for (let i = 0; i < ship.length; i++) {
      if (vertical) {
        if (this.board[row + i][column] !== null) return false;
      } else {
        if (this.board[row][column + i] !== null) return false;
      }

      // checks whether the location's neighbors are already taken
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          if (vertical) {
            if (
              row + i + x < 0 ||
              column + y < 0 ||
              row + i + x >= this.size ||
              column + y >= this.size
            )
              continue;

            if (this.board[row + i + x][column + y] !== null) return false;
          } else {
            if (
              row + x < 0 ||
              column + i + y < 0 ||
              row + x >= this.size ||
              column + i + y >= this.size
            )
              continue;

            if (this.board[row + x][column + i + y] !== null) return false;
          }
        }
      }
    }

    return true;
  }

  receiveAttack(row, column) {
    if (row < 0 || column < 0 || row >= this.size || column >= this.size)
      return false;

    const ship = this.board[row][column];

    if (ship !== null) {
      let hitIndex = 0;
      let stepVert = 1;
      let stepHor = 1;

      // checks ship's direction and hit index based on coordinates
      // vertically
      while (
        row - stepVert >= 0 &&
        this.board[row - stepVert][column] !== null
      ) {
        hitIndex++;
        stepVert++;
      }
      // horizontally
      while (
        column - stepHor >= 0 &&
        this.board[row][column - stepHor] !== null
      ) {
        hitIndex++;
        stepHor++;
      }

      if (!ship.hit(hitIndex)) return false;
      return true;
    } else {
      // no ship to attack
      this.missedShots[row][column] = true;
      return false;
    }
  }

  isGameOver() {
    let isGameOn = false;

    // checks whether all ships have been sunk
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board.length; j++) {
        const ship = this.board[i][j];

        if (ship !== null) {
          if (!ship.isSunk()) return false;
          if (!isGameOn) isGameOn = true;
        }
      }
    }

    return isGameOn;
  }
}

export default Gameboard;
