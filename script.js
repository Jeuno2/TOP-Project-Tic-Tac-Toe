const log = console.log;

//IIFE for starting game
const gameStart = (() => {

    let goesFirst = 0;
    let gameNotStarted = true;
    
    // create Gameboard
    function createGameboard() {

         // array to be used as tic-tac-toe game board
        let gameboard = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];

        // array is returned in an objet
        return {
            gameboard,
        };
    } //end function createGameboard()

    // create players
    function createPlayer(name, mark, isWinner, token) {
        
        function makeMark(position, mark) {

            let square = document.getElementById(position);
            square.textContent = mark;

            board.gameboard[position - 1] = mark;

            checkWinner(mark);
            game.checkForTie();

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
        
        let rounds = 0;

        function checkForTie() {
            game.rounds++;
            log(game.rounds);
            if(game.rounds === 9) { 
                if(player1.isWinner === false && player2.isWinner === false) {
                    log('game has ended in a tie');
                    disp.results.textContent = 'Tie Game! Play Again?'
                    disp.squares.forEach(element => {
                        element.style.backgroundColor = "red";
                    });
                }
            }
        } //end function checkForTie

        // game start with random number to see who goes first (gets token)
        if (gameNotStarted === true) {

            // resets game board
            board.gameboard = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];

            // passes token off for first time, player with token set to true plays their mark
            if(goesFirst === 1) {
                player1.token = true;
            }
            else {
                player2.token = true;
            }
            gameNotStarted = false;
        } 

        return {
            rounds,
            checkForTie,
        }
                  
    } //end function gameFlow

    function display() {
        // h2s
        const player_one_name = document.querySelector('.player-one-name');
        const player_two_name = document.querySelector('.player-two-name');

        // player input boxes
        const playerOneInput = document.querySelector('.player-name-1');
        const playerTwoInput = document.querySelector('.player-name-2');

        // provides on screen updates to players (who's turn it is, who won, if game is tied)
        const results = document.querySelector('.results');
        results.textContent = 'Players, enter your first names and click "Submit Names" Button!';

        // button to submit names and hide input boxes once names are set
        const button = document.querySelector('.submit-names');
        button.addEventListener('click', () => {
            player_one_name.textContent = playerOneInput.value;
            player_two_name.textContent = playerTwoInput.value;
            playerOneInput.classList.toggle('hide-input');
            playerTwoInput.classList.toggle('hide-input');
            disp.results.textContent = 'Click Start New Game to Begin';
        });

        // individual board squares/mark up
        const squares = document.querySelectorAll('.square');

        function markBoard(e) {

            const position = e.target.id;

            // makeMark is called for each player (if they have the token), in alternating fashion
            playerArray.forEach(element => {
                if(element.token === true) {
                    element.makeMark(position, element.mark);
                    element.token = false;
                }
                else {
                    element.token = true;
                    if(player1.isWinner === false && player2.isWinner === false) {
                        results.textContent = `It is ${element.name}'s turn!`;
                    }                  
                }
            });

            updateBoard();
        } //end function markBoard

        // start new game button section
        const newGameBtn = document.querySelector('#start-game');
        newGameBtn.addEventListener('click', startNewGame);
        
        function startNewGame() {
            console.clear(); 
            gameNotStarted = true;
            player1.isWinner = false;
            player2.isWinner = false;
            player1.token = false;
            player2.token = false;
            game.rounds = 0;
            goesFirst = Math.floor(Math.random() * 2) + 1;
            disp.results.textContent = `Player ${goesFirst} will play first...`;
            squares.forEach(element => {
                element.textContent = '-';
                element.style.backgroundColor = 'yellow';
            });
            squares.forEach(element => {
                element.addEventListener('click', markBoard, {once: true})});
            gameStart.gameFlow();
        }

        return {
            player_one_name,
            player_two_name,
            results,
            squares,
            markBoard,
        }
    } //end function display

    // exposing factory functions to the outside, returns all functions as an object (stored in gameStart)
    return {
        createGameboard,
        createPlayer,
        gameFlow,
        display,
    } 

})(); //end IIFE
// --------------------------------------------------------------------------------
// create single instance of game board 
const board = gameStart.createGameboard();

// creating two player objects
const player1 = gameStart.createPlayer('Player 1 (X)', 'X', false, false);
const player2 = gameStart.createPlayer('Player 2 (O)', 'O', false, false);
const playerArray = [player1, player2];

// create display object
const disp = gameStart.display();

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
                array.forEach(element => {
                    disp.squares[element - 1].style.backgroundColor = 'green';
                });
                return true;
            }
        }
    };

    // // call function isWinningTrio and declare winner
    if(isWinningTrio(winningArray, triosArray)) {
        if(mark === 'X') {
            player1.isWinner = true;
            disp.results.textContent = 'Player 1 (X) Wins!';
        }
        else if(mark === 'O'){
            player2.isWinner = true;
            disp.results.textContent = 'Player 2 (O) Wins!';
        }
        
    }
    else {
        log('not a winning set, keep playing...');
    }

} //end function checkWinner