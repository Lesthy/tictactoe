const PLAYER_X_CLASS = 'cross'
const PLAYER_O_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll('.cell')
const boardElement = document.getElementsByClassName('game--container"')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.getElementById('winningMessageText')
let isPlayer_O_Turn = false



restartButton.addEventListener('click', startGame)

function startGame() {
    isPlayer_O_Turn = false
    cellElements.forEach(cell => {
        console.log(cell)
        cell.classList.remove(PLAYER_X_CLASS)
        cell.classList.remove(PLAYER_O_CLASS)
        cell.removeEventListener('click', handleCellClick)
        cell.addEventListener('click', handleCellClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleCellClick(e) {
    const cell = e.target
    const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false, currentClass)
    } else if (isDraw()) {
        endGame(true, currentClass)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(PLAYER_X_CLASS) || cell.classList.contains(PLAYER_O_CLASS)
    })
}

function endGame(draw, currentClass) {
    if (draw) {
        winningMessageTextElement.innerText = "It's a draw!"
    }
    else {
        winningMessageTextElement.innerText = "Player with " + currentClass + " wins!"
    }
    winningMessageElement.classList.add('show')
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    isPlayer_O_Turn = !isPlayer_O_Turn
}

function setBoardHoverClass() {
    boardElement.classList.remove(PLAYER_X_CLASS)
    boardElement.classList.remove(PLAYER_O_CLASS)
    if (isPlayer_O_Turn) {
        boardElement.classList.add(PLAYER_O_CLASS)
    } else {
        boardElement.classList.add(PLAYER_X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

