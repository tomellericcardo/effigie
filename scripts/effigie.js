// Global variables
var CONTEXT;
var OPTIONS = {
    seed: Date.now(),
    probability: 0.5,
    symmetrical: true,
    randomColor: true,
    background: '#ffffff',
    cellColor: 'grey',
    cells: 7,
    size: 512,
    margin: 20
};


// Initialize canvas element
function initializeCanvas() {
    let canvas = document.querySelector('canvas');
    canvas.width = canvas.height = OPTIONS.size;
    CONTEXT = canvas.getContext('2d');
    drawCanvas();
}

// Draw canvas
function drawCanvas() {
    clearCanvas();
    Math.seedrandom(OPTIONS.seed);
    let cellColor = getColor();
    for (let i = 0; i < getCells(); i++) {
        for (let j = 0; j < OPTIONS.cells; j++) {
            drawCell(i, j, cellColor);
        }
    }
}

// Clear canvas
function clearCanvas() {
    CONTEXT.fillStyle = OPTIONS.background;
    CONTEXT.fillRect(0, 0, OPTIONS.size, OPTIONS.size);
}

// Get different cells per row
function getCells() {
    let cells = OPTIONS.cells;
    if (OPTIONS.symmetrical) {
        if (cells % 2 == 0) cells = cells / 2;
        else cells = Math.floor(cells / 2) + 1;
    }
    return cells;
}

// Draw cell and its eventual symmetrical
function drawCell(i, j, cellColor) {
    let cellSize = getCellSize();
    if (Math.random() < OPTIONS.probability) {
        let x = (i * cellSize) + OPTIONS.margin;
        let y = (j * cellSize) + OPTIONS.margin;
        drawRect(x, y, cellSize, cellColor);
        if (OPTIONS.symmetrical) {
            let central = getCells() - 1;
            if (OPTIONS.cells % 2 == 0) {
                let k = OPTIONS.cells - i - 1;
                x = (k * cellSize) + OPTIONS.margin;
                drawRect(x, y, cellSize, cellColor);
            } else if (i != central) {
                let k = (2 * central) - i;
                x = (k * cellSize) + OPTIONS.margin;
                drawRect(x, y, cellSize, cellColor);
            }
        }
    }
}

// Calculate cell size
function getCellSize() {
    return (OPTIONS.size - (OPTIONS.margin * 2)) / OPTIONS.cells;
}

// Get specific or random color
function getColor() {
    if (OPTIONS.randomColor) {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    return OPTIONS.color;
}

// Draw a single rectangle
function drawRect(x, y, size, color) {
    CONTEXT.fillStyle = color;
    CONTEXT.fillRect(x - 1, y - 1, size + 1, size + 1);
}

// Initialize options changes
function initializeOptions() {

    // Seed option
    let seed = document.querySelector('#seed');
    seed.addEventListener('keyup', function() {
        OPTIONS.seed = seed.value;
        drawCanvas();
    });

    // Probability option
    let probability = document.querySelector('#probability');
    let probabilityValue = document.querySelector('#probability-value');
    probability.addEventListener('change', function() {
        OPTIONS.probability = probability.value / 100;
        probabilityValue.innerHTML = probability.value;
        drawCanvas();
    });

}


// Ready page
document.addEventListener('DOMContentLoaded', function() {
    initializeCanvas();
    initializeOptions();
});
