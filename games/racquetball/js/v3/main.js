/**
 * Racquetball v3, now with more objects.
 * 
 * @author Mike Vance
 * @version 05MAR25
 */

/**
 * TODO List
 * 
 * Possible Features
 * 2. Increase ball speed with score
 * 3. Maybe change some colors on bounce or return
 */

// game colors, named by role so the whole palette can be changed in one place
const PALETTE = {
  background: '#0f1419',
  racquetGuide: '#18212a',
  racquet: '#2dd4bf',
  ball: '#fbbf24',
  text: '#e6edf3',
  dim: 'rgba(15, 20, 25, 0.6)' // darkens the game behind the pause and game over panel
};

// racquet and ball starting params
const MAX_LIVES = 5;
let startX;
let maxVel;
let diam;
let startWidth;
let startHeight;
let startSpeed;
let game;
//let started;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('game-container');

  // racquet and ball starting params
  startX = 0;
  maxVel = 10;
  diam = 15;
  startWidth = 10;
  startHeight = 75;
  startSpeed = 9;

  game = new Game();
  //started = false; // game not started by default

  // prevent default behavior
  window.addEventListener("keydown", function(e) {
    if(["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
    }
  }, false);
}

function draw() {
  background(PALETTE.background);
  game.play();
}

function keyPressed() {
  if(game.isOver() == true && keyCode == 27) {
    game.fullReset();
    console.log("Game over, reset.");
  } else if(keyCode == 27 && game.isPaused() == false) {
    game.pause();
  } else if(keyCode == 27 && game.isPaused() == true) {
    game.unpause();
  } else if(key == "`" || key == "~") {
    game.fullReset();
    console.log("Game reset.")
  }
}