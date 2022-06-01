const boardColor = "#111"
const boardBorder = "white"
const snakeColor = "lightgreen"
const snake_HeadColor = "lawngreen"
const snakeBorder = "green"
const foodColor = "lightcoral"
const gameCanvas = document.querySelector('#canvas')
const canvasCtxt = gameCanvas.getContext("2d")
let dx = 10     // horizontal velocity
let dy = 0      // vertical velocity
let snake = [{x: 250, y: 250}, 
             {x: 240, y: 250}, 
             {x: 230, y: 250}, 
             {x: 220, y: 250},
             {x: 210, y: 250}
            ]    // the co-ordinates for snake body...
let food_x
let food_y

let score = 0
let best_score = 0
const currentScore = document.getElementById('score')
const bestScore = document.getElementById('best-score')
main()
generateFood()

function main() {
    drawBoard()
    moveSnake()
    drawSnake()
}

// to draw snake board using canvas
function drawBoard() {
    canvasCtxt.fillStyle = boardColor
    canvasCtxt.fillRect(0, 0, gameCanvas.width, gameCanvas.height)
    canvasCtxt.strokeStyle = boardBorder
    canvasCtxt.strokeRect(0, 0, gameCanvas.width, gameCanvas.height)
}

// draw the snake on the canvas
function drawSnake() {
    snake.forEach(drawSnakePart)
}

//function to draw snake part
function drawSnakePart(snakePart) {
    canvasCtxt.fillStyle = snakeColor   //color assigned to the snake body part
    canvasCtxt.fillRect(snakePart.x, snakePart.y, 10, 10)  // fills the rectangle of that particular co-ordinates and width & height
    canvasCtxt.strokeStyle = snakeBorder    //border-color assigned to the body parts of a snake
    canvasCtxt.strokeRect(snakePart.x, snakePart.y, 10, 10)     //draws a border around the snake body part
}

//event listener
document.addEventListener('keydown', (event) => {
    const left_key = 37
    const up_key = 38
    const right_key = 39
    const down_key = 40
    const go_Up = dy === -10
    const go_Down = dy === 10
    const go_Right = dx === 10
    const go_Left = dx === -10
    const keyPressed = event.keyCode

    if(keyPressed === up_key && !go_Down) {
        dx = 0; dy = -10
    }
    if(keyPressed === right_key && !go_Left) {
        dx = 10; dy = 0
    }
    if(keyPressed === down_key && !go_Up) {
        dx = 0; dy = 10
    }
    if(keyPressed === left_key && !go_Right) {
        dx = -10; dy = 0
    }
})

// a function to move a snake
// function moveSnake() {
//     drawBoard();
//     snake.forEach((part) => {
//         part.x += dx;
//         drawSnakePart(part);
//     }) 
   
//     setTimeout(moveSnake, 500)
// }
// moveSnake()

// function moveVertical() {
//     drawBoard()
//     snake[0].x += dx
//     snake[0].y += dy;
//     drawSnakePart()
//     setTimeout(moveVertical, 1000)
// }
// moveVertical()

function moveSnake() {
    drawBoard()
    const head = {x: snake[0].x + dx, y: snake[0].y + dy}
   
    snake.unshift(head);

    const food_has_eaten = (head.x == food_x && head.y == food_y)
    if(food_has_eaten) {
        score += 10
        generateFood()
        currentScore.textContent = score
    }
    else snake.pop();
    drawSnake()
    drawFood()
    
    setTimeout(moveSnake, 100)      // calls moveSnake again
    gameOver(head)
}


// conditions to end the game...
function gameOver(head) {
    best_Score()
    //changeDirection = false
    for(let i = 4; i < snake.length; i++) {
        if(head.x === snake[i].x && head.y === snake[i].y){
            bestScore.textContent = best_score
            alert("GameOver body touched")  
        }//if any of the co-ordinates other than the co-ordinate of heads matches the co-ordinates of snake body part === "GameOver"
    }
    if(head.x === -10 || head.y === -10 || head.x === gameCanvas.width || head.y === gameCanvas.height) {   // here -10 is co-ordinates of head w.r.to its axis i.e. less than 0 (x, y) ---> (top, left)
        bestScore.textContent = best_score
        alert("Gameover")
        location.reload()
    }  
}

// generate random food...
function randomFood(min, max) {
    return Math.floor((Math.random() * (max - min) + min) / 10) * 10
    // if(generate_food_random % 5 === 0 && generate_food_random % 10 != 0) {
    //     console.log(generate_food_random)
    // }
    // else {
    //     console.log("0 at last...")
    // }
}

// get the food co-ordinates...
function generateFood() {
     food_x = randomFood(0, gameCanvas.width - 10);
     food_y = randomFood(0, gameCanvas.height - 10);
     console.log(food_x, food_y)
    
     // if the new food location is where the snake is currently at then generate new location/co-ordinates...
     snake.forEach(function has_food_eaten(body_part) {
        const food_eaten = (body_part.x == food_x && body_part.y == food_y)
        if(food_eaten === true) {
            generateFood()
            console.log("food eaten")
        }
     })
}

// draw food...
function drawFood() {
    canvasCtxt.fillStyle = foodColor
    canvasCtxt.fillRect(food_x, food_y, 10, 10)
    canvasCtxt.strokeStyle = "black";
    canvasCtxt.strokeRect(food_x, food_y, 10, 10)
    // canvasCtxt.fill()
    // canvasCtxt.beginPath()
    // canvasCtxt.arc(110, 120, 5, 0, 2 * Math.PI)
    //canvasCtxt.fillRect(0, 0, 5, 5)
}

//store the best score in local storage and display...
function best_Score() {
    if(score > best_score) {
        best_score = score
    }
}