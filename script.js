window.addEventListener('load', init); // when the whole page loads, execute function init

let gameBoard = ['', '', '', '', '', '', '', '', '']; // every of the 9 fields is represented in this array
let turn = 0; // Keeps track if X or O player's turn
let winner = false; //endgame condition
let playerX = {name=''}; // kreira playera X i Y koji su prazni stringovi koji će se ispuniti u funkciji addPlayers
let playerO = {name=''};

window.addEventListener("resize", onResize); // Resize squares if event browser is resized

// // CREATE PLAYER
// const player = (name) => { //function player takes argument of 'name' and returns object with the property name: 'name'
//   name = name;
//   return {name};
//  };

function init() { // initialization function, run with the loading of the page
    document.querySelector('.name-input').focus(); // focus on the first player name input field
  
    const addPlayerForm = document.getElementById('player-form'); // select the form
    addPlayerForm.addEventListener('submit', addPlayers); // form submit event runs the function addPlayers
  
    let replayButton = document.querySelector('.replay-btn'); // select the replay button
    replayButton.addEventListener('click', resetBoard); // click event runs the function resetBoard 
  }

function addPlayers(event) { // this function is run when the form is submitted
  event.preventDefault(); // prevent the default submit event, i.e. running GET request

  if (this.playerX.value === '' || this.playerO.value === '') { //this inside of event handler refers to the currentTarget, i.e. player form, document.getElementById('player-form').player1 --> player1 is the 'id' attribute; or, document.getElementById('player-form').elements.player1 --> player1 is the 'name' attribute
    alert('You Must Enter a Name for Each Field'); // for now empty player name fields generate alert, I'll add warning button instead of alert later
    return; // if the player name fields are empty, return breaks the function execution and the user must generate form submit again
  }

  const playerFormContainer = document.querySelector('.enter-players'); // .enter-players is the div container's class where the form is nested
  const boardMain = document.querySelector('.board'); //.board is the class of the table/board
 // playerFormContainer.classList.add('hide-container'); // for now the player names fields and the board are constantly visible
 // boardMain.classList.remove('hide-container'); //

  playerX.name = this.playerX.value; // updating the values of the formerly initialized variables playerX and playerO
  playerO.name = this.playerO.value;
  buildBoard();
}

// Build Board
function buildBoard() {
  // let resetContainer = document.querySelector('.reset');
  // resetContainer.classList.remove('reset--hidden'); // reset is visible after the game starts

  onResize(); //resize the board if browser size changes
  addCellClickListener(); //na svim kvadratima se postavi click event listener koji u slučaju klika poziva funkciju makeMove
  changeBoardHeaderNames(); //sve dok netko nije pobjedio, funkcija pokazuje tko je na redu
}

// Resize Board
function onResize() {
  let allCells = document.querySelectorAll('.board__cell');
  let cellHeight = allCells[0].offsetWidth;
  
  allCells.forEach( cell => {
    cell.style.height = `${cellHeight}px`;
  });
}