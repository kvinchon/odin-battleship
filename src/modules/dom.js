function renderGameboard(gameboard, opponent = false) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const board = opponent
    ? document.getElementById('opponentBoard')
    : document.getElementById('humanBoard');

  board.innerHTML = '';
  board.style.gridTemplateColumns = `repeat(${gameboard.length + 1}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${gameboard.length + 1}, 1fr)`;

  // empty cell
  board.appendChild(document.createElement('div'));

  for (let i = 0; i < gameboard.length; i++) {
    // display column headers
    const columnHeader = document.createElement('div');
    const columnName = alphabet[i];

    columnHeader.textContent = columnName;
    columnHeader.className = 'header';
    board.appendChild(columnHeader);
  }

  for (let i = 0; i < gameboard.length; i++) {
    // display row headers
    const rowHeader = document.createElement('div');
    const rowName = i + 1;

    rowHeader.textContent = rowName;
    rowHeader.className = 'header';

    board.appendChild(rowHeader);

    for (let j = 0; j < gameboard[i].length; j++) {
      // create square
      const square = document.createElement('div');
      square.className = 'square';

      // display player's ships
      if (!opponent) {
        if (gameboard[i][j] !== null) {
          const spot = document.createElement('div');
          spot.className = 'spot';

          square.classList.add('ship');
          square.appendChild(spot);
        }
      }

      square.setAttribute('data', i + ',' + j);
      board.appendChild(square);
    }
  }
}

function renderGameOver(message) {
  const modal = document.getElementById('myModal');
  const span = document.getElementsByClassName('close')[0];
  const winner = document.getElementById('winner');

  winner.textContent = message;
  modal.style.display = 'block';

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = 'none';
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };
}

export { renderGameboard, renderGameOver };
