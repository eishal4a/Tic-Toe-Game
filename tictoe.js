let gameSound = new Audio('ding.mp3'); // sound for next turn
let newGameSound = new Audio('game.mp3'); // sound for new game

let currentPlayer = 'X';
let gameBoard = [];
let gameOver = false;

// initialize game board
for (let i = 0; i < 9; i++) {
  gameBoard.push('');
}

// function to handle box click
function handleBoxClick(boxIndex) {
  if (gameOver) return;
  if (gameBoard[boxIndex] === '') {
    gameBoard[boxIndex] = currentPlayer;
    document.querySelectorAll('.box')[boxIndex].children[0].innerText = currentPlayer;
    gameSound.play(); // play sound for next turn
    checkWin();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.querySelector('.turn p').innerText = `Turn of ${currentPlayer}`;
  }
}

// function to check for win
function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i];
    if (gameBoard[condition[0]] === gameBoard[condition[1]] && gameBoard[condition[1]] === gameBoard[condition[2]] && gameBoard[condition[0]] !== '') {
      gameOver = true;
      document.querySelector('.image').style.display = 'block'; // show the image when wins
      return;
    }
  }
  if (!gameBoard.includes('')) {
    gameOver = true;
    document.querySelector('.image').style.display = 'block'; // show the image when it's a draw
  }
}

// function to reset game
function resetGame() {
  newGameSound.play(); // play sound for new game
  gameBoard = [];
  for (let i = 0; i < 9; i++) {
    gameBoard.push('');
  }
  currentPlayer = 'X';
  gameOver = false;
  document.querySelectorAll('.box span').forEach(span => span.innerText = '');
  document.querySelector('.turn p').innerText = `Turn of ${currentPlayer}`;
  document.querySelector('.image').style.display = 'none'; // hide the image when reset
}

// add event listeners to boxes
document.querySelectorAll('.box').forEach((box, index) => {
  box.addEventListener('click', () => handleBoxClick(index));
});

// add event listener to reset button
document.querySelector('button').addEventListener('click', resetGame);