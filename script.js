// Global Variables

var tiles = [];
var tilesFlippedOver = [];
var timer = '';
var gamePlay = false;
var cardFlipped = -1;
var secondFlipped = -1;
var startButton = document.getElementById('start');
var gameArea = document.getElementById('gameArea');
var message = document.getElementById('message');

// Event Listeners

startButton.addEventListener('click', startGame);

// Functions

//Build an array that contains name of all the image files
function buildArray() {
    for(var x = 1; x < 9; x++) {
        tiles.push(x + '.jpg');
    }
    tiles = tiles.concat(tiles);
}

function shuffleArray() {
    for(var x = tiles.length - 1; x >= 0; x--) {
        var random = Math.floor(Math.random() * (x+1));
        var temp = tiles[x];
        tiles[x] = tiles[random];
        tiles[random] = temp;
    }
}

//Build the game board with every tile containing the cover image
function buildBoard() {
    var html = '';
    for(var x = 0; x < tiles.length; x++) {
        html += '<div class="tile">';
        html += '<img src="images/cover.jpg" class="gameTile" id="tilez' + x + '" onClick="flipCard(' + tiles[x][0] + ', this);"></div>';
    }
    gameArea.innerHTML = html;
}

//Function will remove last two entries from tilesFlippedOver array
function revertBack() {
    var t = tilesFlippedOver.pop();
    t.src = 'images/cover.jpg';
    t = tilesFlippedOver.pop();
    t.src = 'images/cover.jpg';
    clearInterval(timer);
    secondFlipped = -1;
    cardFlipped = -1;
}

//Checks if an image is already flippedOver
function isAlreadyFlipped(t) {
    return tilesFlippedOver.indexOf(t);
}

//Flips the tile for the respective image
function flipCard(jpg, t) {
    if(gamePlay) {
        if(cardFlipped > -1) {
            if(secondFlipped === -1) {
                secondFlipped = jpg;
                if(tilesFlippedOver[tilesFlippedOver.length-1] === t) {
                    message.innerHTML = 'Choose a different tile';
                    secondFlipped = -1;
                } else if(secondFlipped === cardFlipped && isAlreadyFlipped(t) === -1) {
                    if(tilesFlippedOver.length === tiles.length-1) {
                        message.innerHTML = 'Congratulations! You uncovered every tile!';
                        gameOver();
                    } else {
                        message.innerHTML = 'It\'s a Match! Choose another tile';
                    }
                    secondFlipped = -1;
                    cardFlipped = -1;
                } else {
                    message.innerHTML = 'Not a Match, try again';
                    timer = setInterval(revertBack, 1000);
                }
                t.src = 'images/' + jpg + '.jpg';
                tilesFlippedOver.push(t);
            }
        } else if(cardFlipped == -1) {
            cardFlipped = jpg;
            message.innerHTML = 'Choose a matching tile';
            t.src = 'images/' + jpg + '.jpg';
            tilesFlippedOver.push(t);
        }
    }
}

function gameOver() {
    tiles = [];
    tilesFlippedOver = [];
    gamePlay = false;
    startButton.style.display = '';
}

function startGame() {
    startButton.style.display = 'none';
    if(!gamePlay) {
        gamePlay = true;
        buildArray();
        shuffleArray();
        buildBoard();
        message.innerHTML = 'Choose a tile';
    }
}