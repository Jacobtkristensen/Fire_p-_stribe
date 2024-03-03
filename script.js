import confetti from "https://esm.run/canvas-confetti@1";

window.addEventListener("load", start);

let currentPlayer = 1;

const modal = document.querySelector(".modal");


// >>>>>>>>>> MODEL <<<<<<<<<<  
const model = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

function writeToCell(row, col, value) {
    model[row][col] = value;
    console.table(model);
    displayBoard();
}

function checkForWinner() {

    // HORISONTAL
    for (let row = 0; row < model.length; row++) {
        for (let col = 0; col < model[row].length - 3; col++) {
            if (model[row][col] !== 0 &&
                model[row][col] === model[row][col + 1] &&
                model[row][col] === model[row][col + 2] &&
                model[row][col] === model[row][col + 3]) {
                Confetti();
                setTimeout(openModal, 3000);
                return model[row][col];
            }
        }
    }
    // VERTICAL
    for (let row = 0; row < model.length - 3; row++) {
        for (let col = 0; col < model[row].length; col++) {
            if (model[row][col] !== 0 &&
                model[row][col] === model[row + 1][col] &&
                model[row][col] === model[row + 2][col] &&
                model[row][col] === model[row + 3][col]) {
                Confetti();
                setTimeout(openModal, 3000);
                return model[row][col];
            }
        }
    }
    // DIAGONAL DOWN-RIGHT
    for (let row = 0; row < model.length - 3; row++) {
        for (let col = 0; col < model[row].length - 3; col++) {
            if (model[row][col] !== 0 &&
                model[row][col] === model[row + 1][col + 1] &&
                model[row][col] === model[row + 2][col + 2] &&
                model[row][col] === model[row + 3][col + 3]) {
                Confetti();
                setTimeout(openModal, 3000);
                return model[row][col];
            }
        }
    }
    // DIAGONAL DOWN-LEFT
    for (let row = 0; row < model.length - 3; row++) {
        for (let col = 3; col < model[row].length; col++) {
            if (model[row][col] !== 0 &&
                model[row][col] === model[row + 1][col - 1] &&
                model[row][col] === model[row + 2][col - 2] &&
                model[row][col] === model[row + 3][col - 3]) {
                Confetti();
                setTimeout(openModal, 2000);
                return model[row][col];
            }
        }
    }
}
// >>>>>>>>>> VIEW <<<<<<<<<< 
function displayBoard() {
    for (let row = 0; row < model.length; row++) {
        for (let col = 0; col < model[row].length; col++) {
            const value = model[row][col];
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);

            switch (value) {
                case 0:
                    cell.style.background = "white";
                    break;
                case 1:
                    cell.style.background = "blue";
                    break;
                case 2: cell.style.background = "red";

                    break;
            }
        }
    }
}

function openModal() {
    modal.style.display = "block";
    const modalText = document.querySelector(".modal-content");
    modalText.innerHTML = `<h2>Congratulations!</h2>` + "<br>" +
        `<button onclick="location.reload()">Play again</button>`;
}

function Confetti() {
    if (checkForWinner) {
        confetti({
            particleCount: 1000,
            spread: 300,
            origin: { y: 0.45 }
        })
    }
}

// >>>>>>>>>> CONTROLLER <<<<<<<<<<

function start() {
    console.log("JS loaded");
    displayBoard();

    const board = document.querySelector("#board");
    board.addEventListener("click", boardClicked);

}
function boardClicked(event) {
    console.log("Board clicked");

    const cell = event.target;

    if (cell.classList.contains("cell")) {
        const col = cell.dataset.col;
        selectColumn(col);
    }
    checkForWinner();
}

function selectColumn(col) {
    for (let row = model.length - 1; row >= 0; row--) {

        if (model[0][col] !== 0) {
            console.log("Column is full");
            return;
        }

        if (model[row][col] === 0) {
            writeToCell(row, col, currentPlayer);
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            return
        }
    }
}