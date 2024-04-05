import Player from './player';
import { renderGameboard, renderGameOver } from './dom';

function game() {
  const human = new Player('Human');
  const computer = new Player('Computer');

  // init gameboards
  human.gameboard.placeRandom();
  computer.gameboard.placeRandom();

  renderGameboard(human.gameboard.board);
  renderGameboard(human.shots, true);

  playRound(human, computer);
}

function playRound(player, opponent) {
  const squares = document.querySelectorAll('.opponent .square');

  squares.forEach((square) => {
    const location = square.getAttribute('data').split(',');
    const clickX = location[0];
    const clickY = location[1];

    square.addEventListener('click', () => {
      if (player.shots[clickX][clickY] === null) {
        // player attacks computer
        const opponentSpot = document.createElement('div');
        opponentSpot.className = 'spot';

        player.attack(opponent, clickX, clickY);
        if (player.shots[clickX][clickY]) opponentSpot.classList.add('hit');
        else opponentSpot.classList.add('miss');

        square.appendChild(opponentSpot);
        if (opponent.gameboard.isGameOver()) return gameOver('You won!');

        // computer attacks player
        const [row, column] = opponent.attackRandom(player);
        const fleetSquare = document.querySelector(
          `.square[data='${row},${column}']`
        );

        if (opponent.shots[row][column]) {
          const fleetSpot = fleetSquare.querySelector('.spot');
          fleetSpot.classList.add('hit');
        } else {
          const fleetSpot = document.createElement('div');

          fleetSquare.innerHTML = '';
          fleetSpot.className = 'spot miss';
          fleetSquare.appendChild(fleetSpot);
        }

        if (player.gameboard.isGameOver()) return gameOver('You lost!');
      }
    });
  });
}

function gameOver(message) {
  const modal = document.getElementById('myModal');
  const playBtn = document.getElementById('play');

  renderGameOver(message);

  // when user clicks on new game, close the modal and play again
  playBtn.onclick = function () {
    modal.style.display = 'none';
    game();
  };
}

export default game;
