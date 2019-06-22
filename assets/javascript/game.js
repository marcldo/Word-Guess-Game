
var wordList = ["leonard", "lowry", "siakam", "gasol", "green"];

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
    wordToGuess = wordList[getRandomInt(5)];
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

//Main function takes userInput and checks wordToGuessArray
function gameRunning() {
    startText.textContent = "Who is this?";
    updateImage(wordToGuess);
    document.onkeyup = function (event) {


        var userInput = event.key;

        if (guesses.indexOf(userInput) > -1) {
            startText.textContent = "You already guessed that, try again";
        }

        if (gameLive === true && guesses.indexOf(userInput) === -1) {
            startText.textContent = "Who is this?";
            if (wordToGuess.includes(userInput)) {

                console.log("yes");
                //display(userInput) on guessed letters element;
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

    // find all occurrences of userInput in wordToGuess
    var indices = [];
    var idx = wordToGuess.indexOf(letter);
    //records index of idx in a new array indices
    while (idx != -1) {
        indices.push(idx);
        idx = wordToGuess.indexOf(letter, idx + 1);
    }

    //1. for each index position in indices grab the span element [i] and put userInput 
    //2. update currentGuess array

    indices.forEach(function (letterPosition) {
        var newLetter = document.getElementById("span" + letterPosition);
        newLetter.textContent = letter;

        currentGuess.splice(letterPosition, 0, letter);



    });


    console.log(currentGuess);
    var currGuessStr = currentGuess.join("");
    console.log(currGuessStr);

    //record win 
    if (currGuessStr === wordToGuess) {
        wins++;
        if (wins === 5) {
            win();
        }
        winsElm.textContent = wins;
        currGuessStr = "";
        currentGuess = [];
        deleteGuesses();
        deleteSpan();
        getNewWord();
        updateImage(wordToGuess);
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
            gusses = [];
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
    //checks if userInput is in the array guesses
    if (guesses.indexOf(letter) > -1) {
        startText.textContent = "You already guessed that, try again";
    }
    //pushes userInput to the guesses array and displays userInput in gussed element
    else {
        guesses.push(letter);
        var guessedElement = document.getElementById("guessed");
        guessedElement.textContent = guesses;
    };
};

function win() {
    deleteSpan();
    gusses = [];
    guessRem = 10;
    gameRestart();
    alert("you the champ");
    wordToGuess = [];
}


function deleteGuesses() {
    var guessedElement = document.getElementById("guessed");
    guessedElement.textContent = "";
};

function updateImage(word) {
    var mainImg = document.getElementById("mainImg");
    console.log(word);
    if (word === "leonard") {
        mainImg.src = "assets/images/leonard.gif";
    }
    else if (word === "lowry") {
        mainImg.src = "assets/images/lowry.gif";
    }
    else if (word === "siakam") {
        mainImg.src = "assets/images/siakam.gif";
    }
    else if (word === "gasol") {
        mainImg.src = "assets/images/gasol.gif";
    }
    else if (word === "green") {
        mainImg.src = "assets/images/green.gif";
    }

}