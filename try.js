/*These are my tries that didn't work.*/

/*from game.js...*/
// a function to move a snake
function moveSnake() {
    drawBoard();
    snake.forEach((part) => {
        part.x += dx;
        drawSnakePart(part);
    }) 
   
    setTimeout(moveSnake, 500)
}
moveSnake()

function moveVertical() {
    drawBoard()
    snake[0].x += dx
    snake[0].y += dy;
    drawSnakePart()
    setTimeout(moveVertical, 1000)
}
moveVertical()

//for replay...
export const replay = document.querySelector('.replay');

replay.addEventListener('click', () => {
    snake = [{x: 250, y: 250}, 
        {x: 240, y: 250}, 
        {x: 230, y: 250}, 
        {x: 220, y: 250},
        {x: 210, y: 250}
       ]
       moveSnake()
})

/*from load.js...*/
//tried to make the only one user's choice in checkbox that would never happen in context of checkbox(contrast to 'radio')
const checkbox_state_slow = document.querySelector('input[name="slow"]')
const checkbox_state_normal = document.querySelector('input[name="normal"]')
const checkbox_state_fast = document.querySelector('input[name="fast"]')
console.log(checkbox_state_fast, checkbox_state_normal, checkbox_state_slow)
if(checkbox_state_slow.checked === true) {
    checkbox_state_normal.checked = false;checkbox_state_fast.checked = false;
}

checkbox_state.forEach(checkbox => {
    checkbox.addEventListener('click', check => {
         if(check.checked == true) {
            check.checked = false
    }
    else {
        check.checked = true;
    }
    })   
})