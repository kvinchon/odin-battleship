class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
    this.hits = [];
  }

  hit(index) {
    if (this.hits.includes(index) || index < 0 || index >= this.length)
      return false;

    this.hits.push(index);
    return true;
  }

  isSunk() {
    return this.hits.length === this.length;
  }
}

export default Ship;
