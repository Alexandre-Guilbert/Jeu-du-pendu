const words = ["javascript", "developpeur", "frontend", "portfolio", "github"];
let selectedWord;
let correctGuesses;
let wrongGuesses;
let maxErrors = 6;

const wordDisplay = document.getElementById("word-display");
const errorCount = document.getElementById("error-count");
const wrongList = document.getElementById("wrong-list");
const guessInput = document.getElementById("guess-input");
const guessBtn = document.getElementById("guess-btn");
const restartBtn = document.getElementById("restart-btn");
const canvas = document.getElementById("hangman-canvas");
const ctx = canvas.getContext("2d");

function initGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    correctGuesses = new Set();
    wrongGuesses = new Set();
    updateDisplay();
    errorCount.textContent = "0";
    wrongList.textContent = "";
    drawHangman(0);
}

function updateDisplay() {
    wordDisplay.textContent = selectedWord
        .split("")
        .map(letter => (correctGuesses.has(letter) ? letter : "_"))
        .join(" ");
    document.getElementById("word-length").textContent = selectedWord.length;
}

function checkGuess() {
    const guess = guessInput.value.toLowerCase();
    if (!guess || guess.length !== 1 || !/[a-z]/.test(guess)) {
        alert("Veuillez entrer une lettre valide.");
        return;
    }

    if (selectedWord.includes(guess)) {
        correctGuesses.add(guess);
        if (selectedWord.split("").every(letter => correctGuesses.has(letter))) {
            alert("Félicitations ! Vous avez gagné !");
            restartGame();
        }
    } else if (!wrongGuesses.has(guess)) {
        wrongGuesses.add(guess);
        wrongList.textContent = Array.from(wrongGuesses).join(", ");
        errorCount.textContent = wrongGuesses.size;
        drawHangman(wrongGuesses.size);
        if (wrongGuesses.size === maxErrors) {
            alert(`Vous avez perdu ! Le mot était : ${selectedWord}`);
            restartGame();
        }
    }
    guessInput.value = "";
    updateDisplay();
}

function restartGame() {
    initGame();
}

function drawHangman(errors) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 2;

    if (errors > 0) ctx.strokeRect(10, 200, 80, 10); // Base
    if (errors > 1) ctx.beginPath(), ctx.moveTo(50, 200), ctx.lineTo(50, 20), ctx.stroke(); // Poteau
    if (errors > 2) ctx.beginPath(), ctx.moveTo(50, 20), ctx.lineTo(150, 20), ctx.stroke(); // Traverse
    if (errors > 3) ctx.beginPath(), ctx.moveTo(150, 20), ctx.lineTo(150, 50), ctx.stroke(); // Corde
    if (errors > 4) ctx.beginPath(), ctx.arc(150, 70, 20, 0, Math.PI * 2), ctx.stroke(); // Tête
    if (errors > 5) ctx.beginPath(), ctx.moveTo(150, 90), ctx.lineTo(150, 150), ctx.stroke(); // Corps
}

guessBtn.addEventListener("click", checkGuess);
restartBtn.addEventListener("click", restartGame);

initGame();
