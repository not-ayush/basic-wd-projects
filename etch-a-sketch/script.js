const board = document.querySelector("#board");
const clear = document.querySelector("#clear");
const gridSize = document.querySelector("#grid-size");
const color = document.querySelector("#colors");
const def = document.querySelector("#def");
let n = 16;

function createRow(n) {
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    row.style = "display: flex; justify-content: stretch;";
    for (let i = 0; i < n; i++) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.style = "border: 1px solid #a7a7a7; flex-grow:1; flex-shrink:1;";
        row.appendChild(cell);
    }
    return row;
}

function drawGrid(n) {
    for (let i = 0; i < n; i++) {
        board.appendChild(createRow(n));
    }
}

function clearBoard() {
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.style.backgroundColor = "white";
    });
}

function defaultMode() {
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.addEventListener("mouseover", (e) => {
            e.target.style.backgroundColor = "black";
        });
    });
}

drawGrid(n);
defaultMode();

clear.addEventListener("click", clearBoard);
gridSize.addEventListener("click", () => {
    n = prompt("enter new (NxN) grid size, N<100: ");
    while (n > 99) n = prompt("enter new grid size (NxN) enter N<100: ");
    board.innerHTML = "";
    drawGrid(n);
    defaultMode();
});

def.addEventListener("click", () => {
    clearBoard();
    defaultMode();
});

color.addEventListener("click", () => {
    clearBoard()
    let cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        let temp;
        cell.addEventListener("mouseover", (e) => {
            temp = `rgba(${Math.random() * 255},
                    ${Math.random() * 255},
                    ${Math.random() * 255})`;
            e.target.style.backgroundColor = temp;
        });
    });
});


