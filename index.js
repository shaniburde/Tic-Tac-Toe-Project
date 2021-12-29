const boardElement = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentTurn;

setup();

function setup() {
    boardElement.classList.remove("turn-x", "turn-o");

    for(let cell of cells) {
        cell.classList.remove('x', 'o');
        cell.addEventListener('click', fillCell, { once: true });
    }

    currentTurn = Math.round(Math.random(0, 1)) == 1 ? 'x' : 'o';
    boardElement.classList.add('turn-' + currentTurn);
}

function fillCell() {
    this.classList.add(currentTurn);

    if(checkForWin()) {
        const restart = confirm(currentTurn.toUpperCase() + " is the winner! Restart?");

        if (restart) setup();
    } else if (checkForTie()) {
        const restart = confirm("It's a tie! Restart?");

        if (restart) setup();
    } else {
        currentTurn = currentTurn === 'x' ? 'o' : 'x';
        boardElement.classList.remove('turn-o', 'turn-x');
        boardElement.classList.add('turn-' + currentTurn)
    }

    
}

function checkForWin() {
    return winningCombos.some(combo => {
        return combo.every(c => {
            if (cells[c].classList.contains(currentTurn)) {
                return true;
            }

            return false;
        })
    })
}

function checkForTie() {
    return [...cells].every(c => {
        if (
            c.classList.contains('x') || 
            c.classList.contains('o')
        ) {
            return true
        }

        return false;
    })
}