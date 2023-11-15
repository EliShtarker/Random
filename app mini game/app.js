
let position = 1;
let length = 0;

window.addEventListener('keydown', e => {
    switch (e.code) {
        case 'ArrowLeft':
            if (length > 0) {
                moveLeft();
            }
            break;
        case 'ArrowRight':
            if (length > 0) {
                moveRight();
            }
            break;


        case 'Space':
            addBox();
            break;


        case 'Backspace':
            if (length > 0) {
                removeBox();
            }
            break;
    }
})

function addBox(){
    const newDiv = document.createElement('div');
    const section = document.querySelector('section');
    section.append(newDiv);
    if (length === 0) {
        newDiv.classList.add('active');   
    }
    length++;
}

function removeBox(){
    if (position === length) {
        moveLeft();
       
    }
    document.querySelector('div:last-child').remove();
    length--;
}

function moveLeft(){
    document.querySelector(`div:nth-of-type(${position})`).classList.remove('active');
    position--;

    if (position < 1) {
        position = length;
    }

    document.querySelector(`div:nth-of-type(${position})`).classList.add('active')

}

function moveRight(){
    document.querySelector(`div:nth-of-type(${position})`).classList.remove('active');
    position++;

    if (position > length) {
        position = 1;
    }

    document.querySelector(`div:nth-of-type(${position})`).classList.add('active')
}