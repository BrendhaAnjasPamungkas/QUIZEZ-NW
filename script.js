const levels = [
    {
        words: ["KUCING", "ANJING", "AYAM"],
        clues: ["Hewan peliharaan yang suka mengeong", "Hewan peliharaan yang suka menggonggong", "Berkokok dipagi hari"]
    },
    {
        words: ["GAJAH", "SINGA", "KELINCI"],
        clues: ["Hewan terbesar di darat", "Raja hutan", "Suka Melompat"]
    },
    {
        words: ["HARIMAU", "KANCIL", "KAMBING"],
        clues: ["Kucing besar dengan belang", "hewan darat cerdik", "punya tanduk dan suka memakan rumput"]
    }
];

let currentLevel = 0;
let currentIndex = 0;
const wordContainer = document.getElementById('word-container');
const dropZone = document.getElementById('drop-zone');
const checkButton = document.getElementById('check-button');
const levelText = document.getElementById('current-level');
const mainMenu = document.getElementById('main-menu');
const pilihLevel = document.getElementById('pilih-level');
const gameContainer = document.getElementById('game-container');
const customAlert = document.getElementById('custom-alert');
const alertMessage = document.getElementById('alert-message');
const clueText = document.getElementById('clue');
const quitButton = document.getElementById('quitButton');
const startButton = document.getElementById('startButton');

document.addEventListener("DOMContentLoaded", function() {
    var backsound = document.getElementById("backsound");
    
    startButton.addEventListener("click", function() {
        backsound.play();
        mainMenu.style.display = 'none';
        pilihLevel.style.display = 'block';
    });
    
    quitButton.addEventListener('click', quitGame);
    dropZone.addEventListener('dragover', dragOver);
    dropZone.addEventListener('drop', drop);
    checkButton.addEventListener('click', checkAnswer);
});

function startGame(level) {
    currentLevel = level;
    currentIndex = 0;
    quitButton.style.display = 'block';
    pilihLevel.style.display = 'none';
    gameContainer.style.display = 'block';
    initializeGame();
}

function initializeGame() {
    wordContainer.innerHTML = '';
    dropZone.innerHTML = '';

    let selectedAnimal = levels[currentLevel].words[currentIndex];
    let selectedClue = levels[currentLevel].clues[currentIndex];
    let shuffledWord = shuffle(selectedAnimal.split(''));

    shuffledWord.forEach(letter => {
        let letterElement = document.createElement('div');
        letterElement.classList.add('letter');
        letterElement.textContent = letter;
        letterElement.draggable = true;
        letterElement.addEventListener('dragstart', dragStart);
        wordContainer.appendChild(letterElement);
    });

    levelText.textContent = currentLevel + 1; // Update level text
    clueText.textContent = selectedClue; // Update clue text
}

function initializeGame() {
    wordContainer.innerHTML = '';
    dropZone.innerHTML = '';

    let selectedAnimal = levels[currentLevel].words[currentIndex];
    let selectedClue = levels[currentLevel].clues[currentIndex];
    let shuffledWord = shuffle(selectedAnimal.split(''));

    shuffledWord.forEach(letter => {
        let letterElement = document.createElement('div');
        letterElement.classList.add('letter');
        letterElement.textContent = letter;
        letterElement.draggable = true;
        letterElement.addEventListener('dragstart', dragStart);
        wordContainer.appendChild(letterElement);
    });

    levelText.textContent = currentLevel + 1; // Update level text
    clueText.textContent = selectedClue; // Update clue text
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.textContent);
    event.dataTransfer.effectAllowed = 'move';
    draggedElement = event.target;
}

function dragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
}

function drop(event) {
    event.preventDefault();
    let letter = event.dataTransfer.getData('text/plain');

    let letterElement = document.createElement('div');
    letterElement.classList.add('letter');
    letterElement.textContent = letter;
    dropZone.appendChild(letterElement);

    if (draggedElement) {
        draggedElement.parentNode.removeChild(draggedElement);
        draggedElement = null;
    }
}

let draggedElement = null;

function checkAnswer() {
    let answer = '';
    let droppedLetters = [];

    dropZone.querySelectorAll('.letter').forEach(letterElement => {
        answer += letterElement.textContent;
        droppedLetters.push(letterElement.textContent);
    });

    if (answer === levels[currentLevel].words[currentIndex]) {
        showAlert('Benar!');
        var audio = new Audio('sound/Correct Answer sound effect.mp3'); 
        audio.play();
        nextLevel();
    } else {
        showAlert('Salah, coba lagi!');
        var audio = new Audio('sound/Wrong sound effect.mp3'); 
        audio.play();

        dropZone.innerHTML = '';
        let shuffledDroppedLetters = shuffle(droppedLetters);

        shuffledDroppedLetters.forEach(letter => {
            let letterElement = document.createElement('div');
            letterElement.classList.add('letter');
            letterElement.textContent = letter;
            letterElement.draggable = true;
            letterElement.addEventListener('dragstart', dragStart);
            wordContainer.appendChild(letterElement);
        });
    }
}

function nextLevel() {
    currentIndex++;
    if (currentIndex >= levels[currentLevel].words.length) {
        showAlert(`Selamat! Anda telah menyelesaikan level ${currentLevel + 1}!`);
        pilihLevel.style.display = 'block';
        gameContainer.style.display = 'none';
    } else {
        initializeGame();
    }
}

function showAlert(message) {
    alertMessage.textContent = message;
    customAlert.style.display = 'flex';
}

function closeAlert() {
    customAlert.style.display = 'none';
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function quitGame() {
    pilihLevel.style.display = 'block';
    quitButton.style.display = 'none';
    gameContainer.style.display = 'none';
}

// Initialize the game by showing the main menu
mainMenu.style.display = 'block';
pilihLevel.style.display = 'none';
gameContainer.style.display = 'none';
