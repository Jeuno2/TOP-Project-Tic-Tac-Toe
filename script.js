const log = console.log;

//IIFE for starting game
const gameStart = (() => {
    
    // create Gameboard
    function createGameboard() {
        // array to be used as tic-tac-toe game board
        const gameboard = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        return {
            gameboard,
        };
    }

    // create players
    function createPlayer(name, mark) {
        return {
            name,
            mark,
        };
    }

    // create displayController
    function gameFlow() {
        let hasStarted = false;
        if (hasStarted === false) {
            log(`The game has begun...`);
        }
    }

    // exposing factory functions to the outside
    return {
        createGameboard,
        createPlayer,
        gameFlow,
    }

})(); //end IIFE

// create single instance of game board 
const board = gameStart.createGameboard();
log(board.gameboard);

// creating two player objects
const player1 = gameStart.createPlayer("Player 1", "X");
const player2 = gameStart.createPlayer("Player 2", "O");
log(typeof player1);
log(player1, player2);

// launch game
const game = gameStart.gameFlow();




