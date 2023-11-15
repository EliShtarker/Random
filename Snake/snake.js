
//board
debugger;
var blocksize = 25;
var rows = 20;
var cols = 20;
var board;
var context;

//snake head // removed  * 5;
var snakeX = blocksize;
var snakeY = blocksize;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX; //= blocksize * 10;
var foodY; //= blocksize * 10;

var gameOver = false;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blocksize;
    board.width = cols * blocksize;
    context = board.getContext("2d"); // used for drawing on board

    placeFood();
    document.addEventListener("keydown", changeDirection);
    //update();
    setInterval(update, 4000 / 60);//100 millseconds
}

function update() {
    if (gameOver) {
        return;
    }
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blocksize, blocksize);

    //if x of snake = to x of food and y of snake = to y of food meaing 
    //they are both at the same place using placefoof function to 
    //place the food in another random locaiton
    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    /*if there is bodyparts then*/
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    context.fillRect(snakeX, snakeY, blocksize, blocksize);
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blocksize, blocksize);
    }
    //game over conditons 
    if (snakeX < 0 || snakeX > cols * blocksize || snakeY < 0 || snakeY > rows * blocksize) {
        gameOver = true;
        alert('Ouch! that was painful Game over!');
    }
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game over you cannibal!");
        }
    }
}
//floor
function placeFood() {
    //Math.random return a number form 0-1 * by cols (0-19.9999)
    //Math.floor make it become from 0 to 19 * by blocksize 25
    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * rows) * blocksize;
}


function changeDirection(e) {
    //!= not eqals
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
}