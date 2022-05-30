const snake = document.querySelector('.snake');
let right = false;
let left = false;
let moveX = 0;
let moveY = 0;
document.addEventListener('keydown', (event) => {
    
    if(event.keyCode === 39) {
        event.preventDefault();
        moveRight();
    }
    if(event.keyCode === 37) {
        event.preventDefault();
        moveLeft();
        removeEventListener('keydown', moveRight, true)
    }
    if(event.keyCode === 38) {
        event.preventDefault();
        moveDown();
    }
    if(event.keyCode === 40) {
        event.preventDefault();
        moveUp();
    }
})

function moveRight() {
    left = false;
    right = true;
    moveX += 10;
    snake.style.left = moveX + 'px';
    setTimeout(moveRight, 100);
}

function moveLeft() {
    right = false;
    left = true;
    moveX -= 10;
    snake.style.left = moveX + 'px';
    setTimeout(moveLeft, 100);
}

function moveUp() {
    moveY += 10;
    snake.style.top = moveY + 'px';
    setTimeout(moveUp, 100);
}

function moveDown() {
    moveY -= 10;
    snake.style.top = moveY + 'px';
    setTimeout(moveDown, 100);
}