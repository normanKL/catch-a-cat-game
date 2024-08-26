const gridEl = document.querySelector('.grid')
const scoreEl = document.querySelector('.score')
const liveEl = document.querySelector('.lives')
const gameOverEl = document.querySelector('.game-over')
const resetBtn = document.querySelector('.resetBtn')
const width = 10
const grid = width * width

let intervalInt
let score = 0
let lives = 3
let currentPosition
const gridArray = []

function updateScore() {
    score = score + 1
    scoreEl.textContent = score

}

function updateLives() {

    if (lives > 1) {
        lives = lives - 1
        liveEl.textContent = lives
    } else if (lives ===1) {
        lives = lives - 1
        liveEl.textContent = lives
        clearInterval(intervalInt)
        gameOverEl.textContent = 'Game Over!'
    }
}

function displayGrid() {

    for (let i = 0; i < grid; i++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        cell.addEventListener('click', (e) => {
            if (e.target.classList.contains('active')) {
                updateScore()
            } else {
                updateLives()}
        })
        gridArray.push(cell)
        gridEl.appendChild(cell)
    }

}

function playGame() {
    gridEl.replaceChildren()
    scoreEl.textContent = score
    liveEl.textContent = lives

    displayGrid()

    intervalInt = setInterval(() => {
        currentPosition = gridArray.findIndex((cell) => {
            return cell.classList.contains('active')
        })
        if (currentPosition >= 0) {
            gridArray[currentPosition].classList.remove('active')
        }

        const randomNumber = Math.floor(Math.random() * gridArray.length)
        gridArray[randomNumber].classList.add('active')
    }, 600);

}


resetBtn.addEventListener('click', () => {
    clearInterval(intervalInt)
    score = 0
    lives = 3
    gameOverEl.textContent = 'Good meow luck!'
    playGame()
})


playGame()

