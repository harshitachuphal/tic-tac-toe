const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameRunning = true;

let board = [
    "", "", "",
    "", "", "",
    "", "", ""
];

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", cellClicked);
});

restartBtn.addEventListener("click", restartGame);

function cellClicked() {

    const index = this.getAttribute("data-index");

    if(board[index] !== "" || !gameRunning){
        return;
    }

    board[index] = currentPlayer;
    this.textContent = currentPlayer;

    checkWinner();
}

function checkWinner(){

    let winnerFound = false;

    for(let pattern of winPatterns){

        let a = board[pattern[0]];
        let b = board[pattern[1]];
        let c = board[pattern[2]];

        if(a === "" || b === "" || c === ""){
            continue;
        }

        if(a === b && b === c){
            winnerFound = true;
            break;
        }
    }

    if(winnerFound){
        statusText.textContent = currentPlayer + " Wins!";
        gameRunning = false;
        return;
    }

    if(!board.includes("")){
        statusText.textContent = "Match Draw!";
        gameRunning = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = "Player " + currentPlayer + " Turn";
}

function restartGame(){

    board = [
        "", "", "",
        "", "", "",
        "", "", ""
    ];

    currentPlayer = "X";
    gameRunning = true;

    statusText.textContent = "Player X Turn";

    cells.forEach(cell => {
        cell.textContent = "";
    });
}
