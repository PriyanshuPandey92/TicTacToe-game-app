const buttons = document.getElementsByTagName('button');
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', printXorZero);
}

//1
const isBlank = button => button.innerText.trim().length>0;

//2
function checkForWin(buttons) {
    const winningCombinations = [  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]  ];

    for (const combination of winningCombinations) {   // Just like enhanced for loop in JAVA
        const [a, b, c] = combination;
        if (buttons[a].innerText === buttons[b].innerText && buttons[a].innerText === buttons[c].innerText && isBlank(buttons[a]) ) {
            buttons[a].classList.add('winning-cell');
            buttons[b].classList.add('winning-cell');
            buttons[c].classList.add('winning-cell');
            document.getElementById('output').innerText = buttons[a].innerText + " Wins!";
            return true;
        }
    }
    return false;
}

//3
function checkForDraw() {
    if(count==9){
        document.getElementById('output').innerText = "Draw!";
        return true;
    }
}

//4
function reset() {
    for (var l = 0; l < buttons.length; l++) {
        buttons[l].innerText = "";
        buttons[l].classList.remove('winning-cell');
    }
    gameActive = true;
    flag = true; 
    count = 0;
    countDown = 5;
    document.getElementById('output').innerText = "";
    document.getElementById('countdown').innerText = "";
}

//5
var countDown = 5;
var interval;
function startCountDown(){
    interval = setInterval(function(){
        document.getElementById('countdown').innerText = "Game will reset in "+countDown+ " !";
        countDown--;
        if(countDown<0){
            clearInterval(interval);
            reset();
        }
    },1000)
}

//6
var flag = true;
var gameActive = true;
var result;
var count = 0;
function printXorZero() {
    if (gameActive && this.innerText.length == 0) {
        this.innerText = flag ? "X" : "0";
        flag = !flag;
        count++;

        if(count>=5){
            result = checkForWin(buttons);
            if (result) {
                gameActive = false;
                startCountDown();
                return;
            }
            result = checkForDraw(buttons);
            if (result) {
                gameActive = false;
                startCountDown();
                return;
            }
        }
    }
}