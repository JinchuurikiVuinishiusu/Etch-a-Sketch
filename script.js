const container = document.getElementById("container");
const sizeButton = document.getElementById("popup");
const eraseButton = document.getElementById("draw-erase");
const resetButton = document.getElementById("reset");
let gridSize = 16;

let isMouseDown = false;
let lastColoredSquare = null;
let eraseMode = false;

document.body.addEventListener("mousedown", () => {
    isMouseDown = true;
});

document.body.addEventListener("mouseup", () => {
    isMouseDown = false;
    lastColoredSquare = null;
});

sizeButton.addEventListener("click", () => {
    let userInt = 0;
    while(true) {
        let userValue = prompt("Grid size between 1 and 100: ", "16")
        userInt = parseInt(userValue);
        if (isNaN(userInt) || userInt > 100 || userInt < 1) {
            alert("Please enter a valid number between 1 and 100");
            continue;
        } else {
            break;
        }
    }
    gridSize = userInt;
    console.log(gridSize);

    container.innerHTML = "";

    createGrid(gridSize);
});

function createGrid(gridSize) {
    for (let i=0;  i < gridSize * gridSize; i++) {
        const gridSquare = document.createElement("div");
        gridSquare.classList.add("grid");

        const squareSize = `calc(100% / ${gridSize})`;
        gridSquare.style.flex = `0 0 ${squareSize}`;
        gridSquare.style.height = squareSize;

        gridSquare.addEventListener("mousedown", () => {
            changeColor(gridSquare);
        });
        gridSquare.addEventListener("mousemove", () => {
            if (isMouseDown && gridSquare !== lastColoredSquare) {
                changeColor(gridSquare);
            }
        })
        container.appendChild(gridSquare);
    }
}

function changeColor(gridSquare) {
    if (eraseMode) {
        gridSquare.style.backgroundColor = "";
    } else {
        gridSquare.style.backgroundColor = getRandomColor();
    }
    lastColoredSquare = gridSquare;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF'
    let color = '#';
    for (let i=0; i<6; i++) {
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}

eraseButton.addEventListener("click", () => {
    eraseMode = !eraseMode;
    eraseButton.textContent = eraseMode ? "Erase" : "Drawing";
});

resetButton.addEventListener("click", () => {
    const gridSquares = document.querySelectorAll(".grid");
    gridSquares.forEach(square => {
        square.style.backgroundColor = '';
    });
});

createGrid(gridSize);