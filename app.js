/*
GAME FUNCTION:
-Player must get a number between a min and a max.
-Player gets a certain amount of guesses.
-Notify players of guesses remaining.
-Notify the player of the correct answer if they loose.
-Let player choose to play again.
*/

let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;


const game = document.querySelector('game');
const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessInput = document.querySelector('guess-input');
const guessBtn = document.querySelector('#guess-btn');
const message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    if(isNaN(guess) || guess < min || guess > max){
       setMessage(`Please enter a number between ${min} and ${max}` , 'red');
    }

    if(guess === winningNum){
       gameOver(true, `${winningNum} is correct, YOU WIN!`)
    } else{
        guessesLeft -= 1;

        if(guessesLeft === 0){
            gameOver(false, `Game Over, You Lost! The correct number was ${winningNum}`)
        } else{
            guessInput.value = '';
            guessInput.style.color = 'red';
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left.`, 'red');
        }
    }
});

function getRandomNum(min, max){
     return Math.floor(Math.random()*(max-min + 1)+min);
}

function setMessage(msg, color){
     message.style.color = color;
     message.textContent = msg;
}

function gameOver(won, msg){
    let color;
    won === true? color = 'green' : color = 'red';
    guessInput.disabled = true;
    message.style.color = color;
    guessInput.style.borderColor = color;
    setMessage(msg);

    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}