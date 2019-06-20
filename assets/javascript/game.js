
var wordList = ["apple", "ball", "cat"];

var word = document.getElementById("word");

var guess = document.getElementById("guess");

var wordToGuess = wordList[getRandomInt(3)];

var guesses = [];

var guessRem = 10;

var gameLive = true;

var startText = document.getElementById("gameStatus");

startText.textContent = "Press Any Key To Start";

console.log(wordToGuess);

document.onkeyup = function (event) {
    gameRunning();
    gameLive = true;
};


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
};




function gameRunning() {
    startText.textContent = "";
    document.onkeyup = function (event) {


        var userInput = event.key;

        if (gameLive === true) {

            if (wordToGuess.includes(userInput)) {
                //call correctGuess() to update screen
                console.log("yes");
                //display(userInput);
                correctGuess(userInput);
                updateGuessed(userInput);
            }

            else {
                //call wrongGuess() to update guesses remaining
                wrongGuess(userInput);
                updateGuessed(userInput);
                console.log("no");
            }

        }


    };
};


//create hidden *** to display
for (let i = 0; i < wordToGuess.length; i++) {
    var newStar = document.createElement("span");
    newStar.id = "span" + i;
    newStar.textContent = "*";
    word.appendChild(newStar);
};

//correct guess function
function correctGuess(letter) {

    // find all occurrences of the letter
    var indices = [];
    var idx = wordToGuess.indexOf(letter);
    while (idx != -1) {
        indices.push(idx);
        idx = wordToGuess.indexOf(letter, idx + 1);
    }

    //get span element by id and update text content to letter
    indices.forEach(function (letterPosition) {
        var newLetter = document.getElementById("span" + letterPosition);
        newLetter.textContent = letter;
    });

    //record win 


};

//wrong guess function
function wrongGuess(letter) {
    guessRem--;
    var guessRemElement = document.getElementById("guessRemElm");
    guessRemElement.textContent = guessRem;
    if (guessRem === 0) {
        gameLive = false;
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



// document.onkeyup = function (event) {
//     var newGuess = document.createElement("span");
//     newGuess.textContent = event.key;
//     guess.appendChild(newGuess);
// };

// var newGuess = document.createElement("span");
// newGuess.textContent = userInput.onkey;
// guess.appendChild(newGuess);

