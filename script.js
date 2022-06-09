const buttonStart = document.querySelector("#button-start");
const main = document.querySelector("main");
const wrongLettersParagraph = document.querySelector(".wrong-letters");
const guessedWordContainer = document.querySelector(".guessed-word-container");
const messageContainer = document.querySelector(".message-container");
const hangmanImg = document.querySelector("#hangman-game-img");
const wordContainer = document.querySelector(".word-container");
const buttonsContainer = document.querySelector("#buttons-container");
const buttonNewGame = document.querySelector("#button-new-game");
const gameContainer = document.querySelector(".game-container");
const startGameContainer = document.querySelector(".start-game-container");
const buttonQuit = document.querySelector("#button-quit");
const addNewWord = document.querySelector("#addNewWord");
const newWordContainer = document.querySelector(".new-word-container");
const form = document.querySelector("form");
const buttonAddNewWord = document.querySelector("#button-add-new-word");
const buttonReturn = document.querySelector("#button-return");
const input = document.querySelector("input");
const buttonGameNewWord = document.querySelector("#button-game-new-word");

let arrayOfWords = [
  "flor",
  "pelota",
  "casa",
  "agua",
  "banana",
  "barril",
  "puente",
  "auto",
  "lapiz",
  "sol",
  "cepillo",
];

function randomWord(array) {
  const index = Math.floor(Math.floor(Math.random() * array.length));
  return array[index].toUpperCase().split("");
}

function displayHangman(wrongLetters) {
  hangmanImg.src = "./images/hangman-" + wrongLetters + ".png";
}

function drawLines(word) {
  while (wordContainer.firstChild) {
    wordContainer.removeChild(wordContainer.firstChild);
  }
  const arrayOfLines = [];
  word.forEach((letter) => {
    const newDiv = document.createElement("div");
    newDiv.className = "letter-box";
    wordContainer.append(newDiv);
  });
}

function addLetter(letter, index) {
  const letterBoxes = document.querySelectorAll(".letter-box");
  letterBoxes[index].innerHTML = letter;
}

function showGameDisplay() {
  startGameContainer.style.display = "none";
  gameContainer.style.display = "flex";
}

function showStartGameDisplay() {
  startGameContainer.style.display = "flex";
  gameContainer.style.display = "none";
}

function showWrongLetters(array) {
  wrongLettersParagraph.innerHTML = array.join(" ");
}

function addNewWordToArray(word) {
  arrayOfWords.push(word);
}

let selectedWord;
let arrayDisplayed = [];
let wrongLetters = [];
let regex = /^[A-Z-Ñ]/;
let keyPressed = "";
let gameOver = false;
let gameWon = false;

function startGame(word) {
  if (typeof word == "object") {
    selectedWord = randomWord(arrayOfWords);
  } else {
    selectedWord = word.toUpperCase().split("");
  }

  newWordContainer.style.display = "none";
  showGameDisplay();
  displayHangman(0);
  showWrongLetters([]);
  drawLines(selectedWord);
  arrayDisplayed = [];
  wrongLetters = [];
  gameOver = false;
  gameWon = false;
  messageContainer.innerHTML = "";
  selectedWord.forEach((letter) => arrayDisplayed.push("_"));
}

window.addEventListener("keyup", (event) => {
  keyPressed = event.key.toUpperCase();
  if (gameOver !== true || gameWon !== true) {
    if (regex.test(keyPressed) && keyPressed.length < 2) {
      if (selectedWord.indexOf(keyPressed) !== -1) {
        selectedWord.forEach(function (letter, index) {
          if (letter === keyPressed) {
            addLetter(letter, index);
            arrayDisplayed[index] = letter;
          }

          if (selectedWord.join() === arrayDisplayed.join()) {
            gameWon = true;
            messageContainer.innerHTML = "¡Ganaste! 🎉";
          }
        });
      } else if (wrongLetters.indexOf(keyPressed) === -1) {
        wrongLetters.push(keyPressed);
        showWrongLetters(wrongLetters);
        if (wrongLetters.length <= 6) {
          displayHangman(wrongLetters.length);
        } else {
          gameOver = true;
          messageContainer.innerHTML = "Perdiste 😥";
        }
      }
    }
  }
});
buttonStart.addEventListener("click", startGame);

buttonNewGame.addEventListener("click", startGame);

buttonQuit.addEventListener("click", showStartGameDisplay);

addNewWord.addEventListener("click", function () {
  startGameContainer.style.display = "none";
  gameContainer.style.display = "none";
  newWordContainer.style.display = "flex";
});

form.addEventListener("click", function (e) {
  e.preventDefault();
});

buttonAddNewWord.addEventListener("click", function () {
  addNewWordToArray(input.value);
  input.value = "";
});

buttonGameNewWord.addEventListener("click", function () {
  startGame(input.value);
  input.value = "";
});

buttonReturn.addEventListener("click", function () {
  startGameContainer.style.display = "flex";
  gameContainer.style.display = "none";
  newWordContainer.style.display = "none";
});
