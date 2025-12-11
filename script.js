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
    function createPlayer(name, mark, isWinner, token) {
        function makeMark() {
            let position = prompt(`${this.name } which box would you like to mark/play?`) - 1;

            if(board.gameboard[position] === null) {
                board.gameboard[position] = this.mark;
            }
            else {
                console.error('spot already played');
            }
        }
        return {
            name,
            mark,
            isWinner,
            token,
            makeMark,
        };
    } //end function createPlayer() (used to create two player objects: player1 and player2)

    // create/launch game
    function gameFlow() {
        log('Game has begun! Board is clear, set for first move...');
        const goesFirst = Math.floor(Math.random() * 2) + 1;
        log(`Player ${goesFirst} will play first move...`);

        // passes token off for first time
        if(goesFirst === 1) {
            player1.token = true;
        }
        else {
            player2.token = true;
        }

        playerArray.forEach(element => {
            if(element.token === true) {
                element.makeMark();
                element.token = false;
            }
            else {
                element.token = true;
            }
        });

        log(`This is player 1 token status: ${player1.token}`);
        log(`This is player 2 token status: ${player2.token}`);

                    
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
const player1 = gameStart.createPlayer('Player 1', 'X', false, false);
const player2 = gameStart.createPlayer('Player 2', 'O', false, false);
const playerArray = [player1, player2];

// creates game flow object - launch game
const game = gameStart.gameFlow();
// --------------------------------------------------------------------------------

function updateBoard() {
    log('board is updating...');
    board.gameboard.forEach(element => {
        log(element);
    });
} //end function updateBoard()

function checkWinner() {
    log('checking for winner...');
    
} //end function checkWinner()