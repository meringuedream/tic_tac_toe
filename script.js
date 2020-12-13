const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

let playerX = {name: ''}; // creating nameholders for players X and O which
let playerO = {name: ''}; // are passed by the function addPlayers

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageTextElement = document.querySelector('[data-winning-message-text]');
const restartButton = document.getElementById('restartButton'); // restart button is visible after draw or victory (end game)
const replayButton = document.getElementById('replay-btn'); // replay button is visible after game start
const replayContainer = document.getElementById('replay-container'); //
const addPlayerForm = document.getElementById('player-form');
const currentPlayerText = document.querySelector('.current-player-text');

let circleTurn; // the variable which determines the turn of the player; true - circle player, false - x player

// startGame();

restartButton.addEventListener('click', startGame); // clicking on the restart button starts the game with the same players
addPlayerForm.addEventListener('submit', addPlayers);
replayButton.addEventListener('click', reloadGame);

function startGame(){
  circleTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, {once: true})
  })
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
  board.classList.add('show');
  replayContainer.classList.add('show')
  currentPlayerText.innerHTML = `${playerX.name}, you are up!`
}

function reloadGame(){
  replayContainer.classList.remove('show');
  board.classList.remove('show');
  addPlayerForm.classList.remove('hide')
  currentPlayerText.innerHTML = ``;
}

function addPlayers(event){ // this function is run when the form is submitted
  event.preventDefault(); // prevent the default submit event, i.e. running GET request
  if (this.playerX.value === '' || this.playerO.value === '') { //this inside of event handler refers to the currentTarget, i.e. player form, document.getElementById('player-form').player1 --> player1 is the 'id' attribute; or, document.getElementById('player-form').elements.player1 --> player1 is the 'name' attribute
  alert('You Must Enter a Name for Each Field'); // for now empty player name fields generate alert, I'll add warning button instead of alert later
  return; // if the player name fields are empty, return breaks the function execution and the user must generate form submit again
  }
  addPlayerForm.classList.add('hide'); // hide the form
  playerX.name = this.playerX.value; // updating the values of the formerly initialized variables playerX and playerO
  playerO.name = this.playerO.value;
  startGame();
}

function handleClick(e) {
  //place a mark (x or circle)
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) { //check for win
    endGame(false);
  } else if (isDraw()) { //check for draw
    endGame(true)
  } else { //switch turns, i.e. swap players
    swapTurns();
    setBoardHoverClass();
  }  
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? playerO.name : playerX.name} Wins!`;
  }
  winningMessageElement.classList.add('show');
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
  })
}

function swapTurns() {
  circleTurn = !circleTurn;
  if (circleTurn){
    currentPlayerText.innerHTML = `${playerO.name}, you are up!`
  }
  else {
    currentPlayerText.innerHTML = `${playerX.name}, you are up!`
  }
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

