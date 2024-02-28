const board = document.getElementById('board');
const status = document.getElementById('status');
const result = document.getElementById('result');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function handleCellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        updateBoard();
        checkWinner();
        togglePlayer();
    }
}

function updateBoard() {
    board.innerHTML = '';
    for (let i = 0; i < gameBoard.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = gameBoard[i];
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
}

function updateStatus() {
    status.textContent = `Current Player: ${currentPlayer}`;
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            result.textContent = `Player ${currentPlayer} wins!`;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        result.textContent = 'It\'s a draw!';
    }
}

function resetGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    result.textContent = '';
    updateBoard();
    updateStatus();
}
