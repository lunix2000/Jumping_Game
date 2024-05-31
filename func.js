const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 1250;
const GAME_HEIGHT = 700;
canvas.height = GAME_HEIGHT;
canvas.width = GAME_WIDTH;

const bgMusic = document.getElementById("background-music");

function showStartGameText() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "white";
  ctx.fillRect(80, 100, 600, 350); 
  ctx.fillStyle = "black";

  const textLines = [
    "Welcome, Step into a world where you control a fearless  Guy ",
    "on a thrilling, action-packed adventure.",
    "Your mission: jump over obstacles, avoid perilous pitfalls,",
    "and outsmart predators to survive as long as possible in this",
    "endless runner game.",
    "Can you outrun extinction and become the ultimate",
    "Dino Dash champion? Let the adventure begin!",
    "Tap space to start the game"
  ];

  let y = 140;  // Starting Y coordinate for the text
  const lineHeight = 40;  // Height between each line

  for (const line of textLines) {
    ctx.fillText(line, 100, y);
    y += lineHeight;
  }
}

showStartGameText();

function clearText() {
  ctx.clearRect(80, 100, 550, 350); 
}




function stopMusic() {
  bgMusic.pause();
  bgMusic.currentTime = 0; 
}

function startGame() {
  
  bgMusic.play();
}

document.addEventListener('keydown', event => {
  if (event.code === 'Space') {
    startGame(); 

      
  }
});

document.addEventListener('keydown', event => {
  if (event.code === 'Enter') {
    stopMusic()

      
  }
});

let obstacleArray = [];

let obstacle1Width = 34;
let obstacle2Width = 69;
let obstacle3Width = 102;

let obstacleHeight = 70;
let obstacleX = GAME_WIDTH;
let obstacleY = GAME_HEIGHT - obstacleHeight;

let obstacle1Img;
let obstacle2Img;
let obstacle3Img;

let velocityX = -8;
let gameOver = false;

window.onload = function() {
    obstacle1Img = new Image();
    obstacle1Img.src = "./img/spike_B.png";

    obstacle2Img = new Image();
    obstacle2Img.src = "./img/spike_C.png";

    obstacle3Img = new Image();
    obstacle3Img.src = "./img/spike_D.png";

    requestAnimationFrame(update);
    setInterval(placeObstacle, 1000);
}

function update() {
    requestAnimationFrame(update);
    if (gameOver) {
        return;
    }
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    for (let i = 0; i < obstacleArray.length; i++) {
        let obstacle = obstacleArray[i];
        obstacle.x += velocityX;
        ctx.drawImage(obstacle.img, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    }
}

function placeObstacle() {
    if (gameOver) {
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