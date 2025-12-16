const log = console.log;

//IIFE for starting game
const gameStart = (() => {
    
    let gameNotStarted = true;
    
    // create Gameboard
    function createGameboard() {

         // array to be used as tic-tac-toe game board
        const gameboard = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];

        // array is returned in an objet
        return {
            gameboard,
        };
    } //end function createGameboard()

    // create players
    function createPlayer(name, mark, isWinner, token) {
        function makeMark() {
            let position = prompt(`${this.name } which box would you like to mark/play?`) - 1;
            log('making mark...');
            board.gameboard[position] = this.mark;
            checkWinner(this.mark);
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
        
        // game start with random number to see who goes first (gets token)
        if (gameNotStarted === true) {
            log('Game has begun! Board is clear, set for first move...');
            const goesFirst = Math.floor(Math.random() * 2) + 1;
            log(`Player ${goesFirst} will play first move...`);

            // passes token off for first time, player with token set to true plays their mark
            if(goesFirst === 1) {
                player1.token = true;
            }
            else {
                player2.token = true;
            }
            gameNotStarted = false;
        }

        // makeMark is called for each player (if they have the token), in alternating fashion
        playerArray.forEach(element => {
            if(element.token === true) {
                element.makeMark();
                element.token = false;
            }
            else {
                element.token = true;
            }
        });

        updateBoard();

        if(player1.isWinner === false && player2.isWinner === false) {
            gameStart.gameFlow();
        }
        else {
            log('game is over');
        }
                  
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
const player1 = gameStart.createPlayer('Player 1 (X)', 'X', false, false);
const player2 = gameStart.createPlayer('Player 2 (O)', 'O', false, false);
const playerArray = [player1, player2];

// creates game flow object - launch game
const game = gameStart.gameFlow();
// --------------------------------------------------------------------------------

function updateBoard() {
    log('board is updating...');
    log('---------------------');
    log(board.gameboard);
    log('---------------------');
} //end function updateBoard()


function checkWinner(mark) {

    // mark is either X or O and is passed in from makeMark function
    log('checking for winner...');

    // pattern checking array
    const triosArray = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [3, 5, 7],
        [1, 5, 9]
    ];

    // creates an array of objects (from the original gameboard array) which indicate the value of each square plus the original index
    const currentBoard = board.gameboard.map((value, index) => {
        return {
            value,
            originalIndex: index,
        }
    }); 

    // creates/displays either an array of all X objects or all O objects (from currentBoard array) depending on last played mark (X or O) and shows other marks of its kind to this point in said array
    const markArray = currentBoard.filter(item => item.value === mark);

    const winningArray = [];
    // loops through each element of markArray (either has all X or all O objects at this point) and pushes the original index value onto new empty array called winningArray
    markArray.forEach(element => {
        // log(element.value, element.originalIndex + 1);
        winningArray.push(element.originalIndex + 1);
    });

    // isWinningTrio function checks if any array of "triosArray" is found within the "winningArray"
    const isWinningTrio = (winningArray, triosArray) => {
        for(const array of triosArray) {
            if(array.every(element => winningArray.includes(element))) {
                return true;
            }
        }
    };

    // // call function isWinningTrio and declare winner
    if(isWinningTrio(winningArray, triosArray)) {
        log(`Player ${mark} wins!`);
        if(mark === 'X') {
            player1.isWinner = true;
            log('Player 1 wins!');
        }
        else if(mark === 'O'){
            player2.isWinner = true;
            log('Player 2 wins!');
        }
    }
    else {
        log('not a winning set, keep playing...');
    }

} //end function checkWinner()