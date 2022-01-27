'use strict'

const MINE = '💣';
const HINT = '💡';
const HEART = '❤️';
const FLAG = '🚩';
const EMPTY = '';

var gBoard;
var gIsclicked;

var gLevel = {
    SIZE: 4,
    MINES: 2
}

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function changeLevel(SIZE, MINES) {
    gLevel.SIZE = SIZE;
    gLevel.MINES = MINES;
    initGame()
}

function resetGame() {
    var elBtn = document.querySelector('.rest-btn');
    elBtn.innerHTML = '🙂';
    gBoard;
    gIsclicked;
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0
    }
    initGame()

}

function initGame() {
    gBoard = buildBoard(gLevel.SIZE);
    renderBoard(gBoard)
    getRandomMine(gBoard)
    gGame.isOn = true;
    gIsclicked = true;
    checkGameOver()
}

function buildBoard(SIZE) {
    //build the board 4 * 4
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < SIZE; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }
            board[i][j] = cell;

        }
    }
    return board;
}


function setMinesNegsCount(board, rowIdx, colIdx) {

    board.minesAroundCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue;
            if (i === rowIdx && j === colIdx) continue;
            var cell = board[i][j];
            if (cell.isMine) board.minesAroundCount++;
        }
    }
    return board.minesAroundCount;
}


function cellClicked(elCell, i, j) {
    var cell = gBoard[i][j];
    var minesAround = setMinesNegsCount(gBoard, i, j);
    cell.isShown = true;

    if (gGame.isOn) {

        if (gIsclicked) {
            startStopWatch()
            gIsclicked = false;
        }
        if (elCell.isMarked) return
        if (cell.isMine) {
            elCell.innerHTML = `<span>${MINE}</span>`;
        } else {
            elCell.innerHTML = `<span>${minesAround}</span>`;
        }
        if (cell.isMine && cell.isShown) {
            // mineShow(i, j)
            gameOver();
        }
    }
}

function getRandomMine(gBoard) {
    for (var i = 0; i < gLevel.MINES; i++) {
        var randomI = getRandomIntInclusive(0, gBoard.length - 1)
        var randomj = getRandomIntInclusive(0, gBoard.length - 1)
        gBoard[randomI][randomj].isMine = true;
    }
}

function cellMarked(elCell) {

    if (gGame.isOn) {

        if (gIsclicked) {
            startStopWatch()
            gIsclicked = false;
        }
        // if (!elCell.isMarked && cell.isMine) {

        // }
        if (!elCell.isMarked) {
            elCell.innerHTML = `<span>${FLAG}</span>`;
            elCell.isMarked = true;
            gGame.markedCount++
        } else {
            elCell.innerHTML = `<span>${EMPTY}</span>`;
            elCell.isMarked = false;
            gGame.markedCount--
        }
        console.log('Marked Flag:', gGame.markedCount);
    }
}


function checkGameOver() {
    var countWin = 0;
    if (gBoard.isMarked && gBoard.isMine) {
        countWin++
        console.log(countWin);
    }
    if (countWin === gLevel.MINES.length) gameOver()
}

function gameOver() {
    var elMsg = document.querySelector('.message')
    var elBtn = document.querySelector('.rest-btn');
    // elBtn.style.visibility = 'visible';
    elBtn.innerHTML = '🤯';
    elMsg.innerHTML = 'GAME OVER';
    // mineShow()
    gGame.isOn = false;
    endStopWatch()
    console.log('GAME OVER');

}

function mineShow(i, j) {
    var elCell = document.querySelector('.cell');


    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            var currCell = gBoard[i][j];
            console.log(currCell);
            if (currCell.isMine) {
                elCell.innerHTML = `<span>${MINE}</span>`;
            }
        }
    }
}












