let canvas;
let GAME_WIDTH = 1250;
let GAME_HEIGHT = 700;
let ctx;

let obstacleArray = [];

let highScore = 0;

let obstacle1Width = 34;
let obstacle2Width = 69;
let obstacle3Width = 102;

let obstacleHeight = 70;
let obstacleX = GAME_WIDTH;
let obstacleY = GAME_HEIGHT - obstacleHeight - 95;

let obstacle1Img;
let obstacle2Img;
let obstacle3Img;

let velocityX = -8;
let velocityY = 0;
let gravity = .4;
let gameOver = false;
let score = 0;

let playerWidth = 88;
let playerHeight = 94;
let playerX = 50;
let playerY = GAME_HEIGHT - playerHeight - 95;
let playerImg;

let player = {
  x: playerX,
  y: playerY,
  width: playerWidth,
  height: playerHeight
}

const bgMusic = document.getElementById("background-music");
const playerHit = document.getElementById("damage-sfx");

window.onload = function () {

  canvas = document.getElementById("board");
  ctx = canvas.getContext("2d");

  canvas.height = GAME_HEIGHT;
  canvas.width = GAME_WIDTH;

  playerImg = new Image();
  playerImg.src = "./img/player.png";
  playerImg.onload = function () {
    ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
  }

  obstacle1Img = new Image();
  obstacle1Img.src = "./img/spike_D.png";

  obstacle2Img = new Image();
  obstacle2Img.src = "./img/spike_C.png";

  obstacle3Img = new Image();
  obstacle3Img.src = "./img/spike_B.png";

  requestAnimationFrame(update);
  setInterval(placeObstacle, 1000);
  document.addEventListener("keydown", movePlayer);
}

function update() {
  requestAnimationFrame(update);
  if (gameOver) {
    showRestartMessage();
    return;
  }
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  bgMusic.volume = 0.1;
  bgMusic.play();

  for (let i = 0; i < obstacleArray.length; i++) {
    let obstacle = obstacleArray[i];
    obstacle.x += velocityX;
    ctx.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);

    if (detectCollision(player, obstacle)) {
      gameOver = true;
      playerImg.src = "./img/gothit.png";
      playerImg.onload = function () {
        ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
        playerHit.play();
        bgMusic.pause();
        bgMusic.currentTime = 0;
      }
    }
  }

  velocityY += gravity;
  player.y = Math.min(player.y + velocityY, playerY);
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

  // Update and center score
  ctx.fillStyle = "black";
  ctx.font = "20px courier";
  ctx.textAlign = "center"; // Center the text
  ctx.fillText(score, GAME_WIDTH / 2, 30); // Position the text at the center top
  score++;
}

function movePlayer(e) {
  if (gameOver) {
    return;
  }

  if ((e.code == "Space" || e.code == "ArrowUp") && player.y == playerY) {
    velocityY = -10;
  }
}

document.addEventListener("keydown", function (e) {
  if (gameOver && (e.code == "Space" || e.code == "ArrowUp")) {
    restartGame();
  }
});

function placeObstacle() {
  if (gameOver) {
    showRestartMessage();
    return;
  }

  let obstacle = {
    img: null,
    x: obstacleX,
    y: obstacleY,
    width: null,
    height: obstacleHeight
  };

  let placeObstacleChance = Math.random();

  if (placeObstacleChance > .90) {
    obstacle.img = obstacle3Img;
    obstacle.width = obstacle3Width;
    obstacleArray.push(obstacle);
  } else if (placeObstacleChance > .70) {
    obstacle.img = obstacle2Img;
    obstacle.width = obstacle2Width;
    obstacleArray.push(obstacle);
  } else if (placeObstacleChance > .50) {
    obstacle.img = obstacle1Img;
    obstacle.width = obstacle1Width;
    obstacleArray.push(obstacle);
  }

  if (obstacleArray.length > 5) {
    obstacleArray.shift();
  }
}

function detectCollision(a, b) {
  return a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y;
}

function showRestartMessage() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = "white";
  ctx.font = "40px courier";
  ctx.textAlign = "center";
  ctx.fillText("Game Over", GAME_WIDTH / 2, GAME_HEIGHT / 2 - 100);
  
  ctx.font = "20px courier";
  ctx.fillText("Score: " + score, GAME_WIDTH / 2, GAME_HEIGHT / 2 - 50);
  ctx.fillText("High Score: " + highScore, GAME_WIDTH / 2, GAME_HEIGHT / 2);
  ctx.fillText("Press Space to Try Again", GAME_WIDTH / 2, GAME_HEIGHT / 2 + 50);
}

function restartGame() {
  if (score > highScore) {
    highScore = score;
  }
  gameOver = false;
  score = 0;
  obstacleArray = [];
  player.x = playerX;
  player.y = playerY;
  playerImg.src = "./img/player.png";
  bgMusic.play();
}