
var wordList = ["apple", "ball", "cat"];

var word = document.getElementById("word");

var guess = document.getElementById("guess");

var wordToGuess = wordList[getRandomInt(3)];

console.log(wordToGuess);

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

document.onkeyup = function (event) {

    // Determines which key was pressed.
    var userInput = event.key;

    if (wordToGuess.includes(userInput)) {
        //call correctGuess() to update screen
        console.log("yes");
        //display(userInput);
        updateCorrectGuess(userInput);
    }

    else {
        //call wrongGuess() to update guesses remaining
        console.log("no");
    }

};

function display(input) {
    console.log(input)
};

//create hidden *** to display
for (let i = 0; i < wordToGuess.length; i++) {
    var newStar = document.createElement("span");
    newStar.id = "span" + i;
    newStar.textContent = "*";
    word.appendChild(newStar);
};

//correct guess function
function updateCorrectGuess(letter) {

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


};

//wrong guess function



// document.onkeyup = function (event) {
//     var newGuess = document.createElement("span");
//     newGuess.textContent = event.key;
//     guess.appendChild(newGuess);
// };

// var newGuess = document.createElement("span");
// newGuess.textContent = userInput.onkey;
// guess.appendChild(newGuess);

