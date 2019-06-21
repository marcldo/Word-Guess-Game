
var wordList = ["leonard", "lowry", "siakam"];

var word = document.getElementById("word");

var guess = document.getElementById("guess");

var wordToGuess = [];

var guesses = [];

var currentGuess = [];

var guessRem = 10;

var wins = 0;

var gameLive = true;

var startText = document.getElementById("gameStatus");

var winsElm = document.getElementById("winsElm");

startText.textContent = "Press Any Key To Start";

console.log(wordToGuess);

gameStart();

function gameStart() {
    startText.textContent = "Press Any Key To Start";
    document.onkeyup = function (event) {
        gameLive = true;
        getNewWord();
        gameRunning();
    };
};

function gameRestart() {
    wordToGuess = [];

    guesses = [];

    currentGuess = [];

    guessRem = 10;

    wins = 0;

    gameLive = true;

    currGuessStr = "";

    gameStart();
};

function getNewWord() {
    wordToGuess = [];
    wordToGuess = wordList[getRandomInt(3)];
    guesses = [];
    guessRem = 10;

    for (let i = 0; i < wordToGuess.length; i++) {
        var newStar = document.createElement("span");
        newStar.id = "span" + i;
        newStar.textContent = "*";
        word.appendChild(newStar);
    };
};


function deleteSpan() {
    for (let i = 0; i < wordToGuess.length; i++) {
        var span = document.getElementById("span" + i);
        span.parentNode.removeChild(span);
    };
};



function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};


function gameRunning() {
    startText.textContent = "Who is this?";
    document.onkeyup = function (event) {


        var userInput = event.key;

        if (gameLive === true) {

            if (wordToGuess.includes(userInput)) {
                //call correctGuess() to update screen
                console.log("yes");
                //display(userInput);
                updateGuessed(userInput);
                correctGuess(userInput);
            }

            else {
                //call wrongGuess() to update guesses remaining
                updateGuessed(userInput);
                wrongGuess(userInput);
                console.log("no");
            }

        }


    };
};



//correct guess function
function correctGuess(letter) {
    var indices = [];
    var idx = wordToGuess.indexOf(letter);

    // find all occurrences of the letter
    while (idx != -1) {
        indices.push(idx);
        idx = wordToGuess.indexOf(letter, idx + 1);
    }

    //get span element by id and update text content to letter
    indices.forEach(function (letterPosition) {
        var newLetter = document.getElementById("span" + letterPosition);
        newLetter.textContent = letter;
        currentGuess.splice(letterPosition, 0, letter);
    });

    console.log(currentGuess);
    var currGuessStr = currentGuess.join("");

    //record win 
    if (currGuessStr === wordToGuess) {
        wins++;
        if (wins === 3) {
            win();
        }
        winsElm.textContent = wins;
        currGuessStr = "";
        currentGuess = [];
        deleteGuesses();
        deleteSpan();
        getNewWord();
        gameRunning();
        console.log(guesses);
    }
};

//wrong guess function
function wrongGuess(letter) {
    guessRem--;
    var guessRemElement = document.getElementById("guessRemElm");
    guessRemElement.textContent = guessRem;
    if (guessRem === 0) {
        deleteGuesses();
        gameLive = false;
        var playAgain = confirm("Game Over! Try again?");
        if (playAgain == true) {
            deleteSpan();
            guessRem = 10;
            gameRestart();
            wordToGuess = [];
        }
        else {
            startText.textContent = "You Lose";
        }
    }
};

//if the guessed letter is not in the guesses array update the array
function updateGuessed(letter) {
    if (guesses.includes(letter)) {
        alert("You already guessed that, try again");
    }
    else {
        guesses.push(letter);
        var guessedElement = document.getElementById("guessed");
        guessedElement.textContent = guesses;
    }
};

function win() {
    deleteSpan();
    guessRem = 10;
    gameRestart();
    alert("you the champ");
    wordToGuess = [];
}


function deleteGuesses() {
    var guessedElement = document.getElementById("guessed");
    guessedElement.textContent = "";
};
