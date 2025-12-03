const log = console.log;

//IIFE for starting game
const gameStart = (() => {
    
    // create Gameboard
    function createGameboard() {

         // array to be used as tic-tac-toe game board
        const gameboard = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        // set all values to null to have a "clear" board for game start
        for(let i = 0; i < gameboard.length; i++) {
            gameboard[i] = null;
        }

        // array is returned in an objet
        return {
            gameboard,
        };
    } //end function createGameboard()

    // create players
    function createPlayer(name, mark, token) {
        return {
            name,
            mark,
            token,
        };
    } //end function createPlayer() (used to create two player objects: player1 and player2)

    // create/launch game
    function gameFlow() {
        log('Game has begun! Board is clear, set for first move...');
        board.gameboard[3] = player2.mark;
        makeMark();

        
        updateBoard();
    } //end function gameFlow

    // exposing factory functions to the outside, returns all functions as an object (stored in gameStart)
    return {
        createGameboard,
        createPlayer,
        gameFlow,
    } 

})(); //end IIFE
// --------------------------------------------------------------------------------
// create single instance of game board 
const board = gameStart.createGameboard();

// creating two player objects
const player1 = gameStart.createPlayer('Player 1', 'X', false);
const player2 = gameStart.createPlayer('Player 2', 'O', false);

// creates game flow object - launch game
const game = gameStart.gameFlow();
// --------------------------------------------------------------------------------

// functions section
function makeMark() {
    let isEmpty = true;
    for(const element of board.gameboard) {
        if(element !== null) {
            isEmpty = false;
            break;
        }
    }

    if(isEmpty) {
        log(`array is empty`);
    }
    else {
        log(`array is not empty`);
    }

    const goesFirst = Math.floor(Math.random() * 2) + 1;
    log(`Player ${goesFirst} will play first move...`);
} //end function makeMark()

function updateBoard() {
    board.gameboard.forEach(element => {
        log(element);
    });
} //end function updateBoard()