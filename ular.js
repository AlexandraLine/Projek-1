const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const upButton = document.getElementById('upButton');
const downButton = document.getElementById('downButton');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let snakeDirection = { x: 0, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;
let gameRunning = false;

function gameLoop() {
    if (gameRunning) {
        moveSnake();
        if (checkCollision()) {
            resetGame();
        }
        drawGame();
        setTimeout(gameLoop, 100);
    }
}

function moveSnake() {
    const head = { x: snake[0].x + snakeDirection.x, y: snake[0].y + snakeDirection.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        return true;
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }

    return false;
}

function placeFood() {
    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'lime';
    snake.forEach(part => ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize, gridSize));
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
    ctx.fillStyle = 'white';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    snakeDirection = { x: 0, y: 0 };
    score = 0;
    placeFood();
    gameRunning = false;
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowUp':
            if (snakeDirection.y === 0) {
                snakeDirection = { x: 0, y: -1 };
            }
            break;
        case 'ArrowDown':
            if (snakeDirection.y === 0) {
                snakeDirection = { x: 0, y: 1 };
            }
            break;
        case 'ArrowLeft':
            if (snakeDirection.x === 0) {
                snakeDirection = { x: -1, y: 0 };
            }
            break;
        case 'ArrowRight':
            if (snakeDirection.x === 0) {
                snakeDirection = { x: 1, y: 0 };
            }
            break;
    }
});

startButton.addEventListener('click', () => {
    if (!gameRunning) {
        resetGame();
        gameRunning = true;
        gameLoop();
    }
});

upButton.addEventListener('click', () => {
    if (snakeDirection.y === 0) {
        snakeDirection = { x: 0, y: -1 };
    }
});

downButton.addEventListener('click', () => {
    if (snakeDirection.y === 0) {
        snakeDirection = { x: 0, y: 1 };
    }
});

leftButton.addEventListener('click', () => {
    if (snakeDirection.x === 0) {
        snakeDirection = { x: -1, y: 0 };
    }
});

rightButton.addEventListener('click', () => {
    if (snakeDirection.x === 0) {
        snakeDirection = { x: 1, y: 0 };
    }
});

window.onload = () => {
    drawGame();
};
