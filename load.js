//jquery
$(document).ready(function() {
    $('.menu-container').show().css('display', 'flex')
    $('.replay').click(function (e) { 
        e.preventDefault();
        location.reload()
    });
})

//exporting speed to game.js according to the player's preference
export let speed = 80
const speed_state = document.querySelectorAll('.radio')

speed_state.forEach(selection => {
    selection.addEventListener('click', () => { //click event listener for every radio_selected
        if(selection.classList.contains('slow')) speed = 130
        else if(selection.classList.contains('fast')) speed = 30
        else speed = 80
    })
})