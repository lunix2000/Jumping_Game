const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 1250;
const GAME_HEIGHT = 700;
canvas.height = GAME_HEIGHT;
canvas.width = GAME_WIDTH;


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

showStartGameText()





function clearText() {
  ctx.clearRect(80, 100, 550, 350); 
}
