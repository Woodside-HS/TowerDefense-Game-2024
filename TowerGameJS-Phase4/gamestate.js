'use strict'

// The GameState class contains most of the assets.
class GameState {
  constructor(game, number, canvas) {

    this.game = game;
    this.number = number;
    this.cnv = canvas;
    this.init();
  }
  init() {
    //lol
  }
}


class GameState1 extends GameState { // Start Screen
  constructor(game) {
    super(game, 1)
    game.gameStateID = 1;
    this.game.canvas.canDiv.style.backgroundImage = "url('resources/images/bg/start.png')"
    this.panelStart = new Panel(this, 0)
    this.panelInstructions = 0
    this.panelQuit = 0
    document.getElementById('infoDiv').style.visibility = 'hidden'; // Make info tiles invisible on start page
    document.getElementById('menuDiv').style.visibility = 'hidden';
    document.getElementById('switchDiv').style.visibility = 'hidden'
  }
  run() {
    if (this.panelStart) {
      this.panelStart.render();
    }

    if (this.panelInstructions) {
      this.panelInstructions.render();
    }
  }
}
class GameState2 extends GameState {
  constructor(game) {
    gameStateID = 2;

  }

}

class GameState3 extends GameState { // end screen
  constructor(game) {
    super(game)
    towerGame.gameStateID = 3;
    this.game.enemies = [];
    this.game.canvas.canDiv.style.backgroundImage = "url('resources/images/bg/end.png')"
    this.panelQuit = new Panel(this, 2)
    this.panelCredits = 0
    this.panelStart = 0
  }
  run() {
    this.game.render()
    document.getElementById("infoDiv").getElementsByClassName("infoTileDiv")[4].innerHTML = ("Health </br>" + 0); if (this.panelQuit) {
      this.panelQuit.render()
    }
    if (this.panelCredits) {
      this.panelCredits.render()
    }
  }
}

class GameState4 extends GameState { // Game Screen basic
  constructor(game) {
    super(game, 4)
    towerGame.gameStateID = 4;
    this.game.canvas.canDiv.style.backgroundImage = "url('resources/images/bg/play.png')";
    this.game.health = 100
    this.game.score = 0
    this.game.bankValue = 500;
    this.game.gameTime = 0
    this.game.grid = [];
    this.game.towers = [];
    this.game.enemies = [];
    this.game.bullets = []
    this.game.cols = Math.floor(this.game.canvas.width / this.game.w);
    this.game.rows = Math.floor(this.game.canvas.height / this.game.w);
    this.game.backgroundMusic = new Audio('resources/sounds/Elevator-music.mp3');
    this.game.loadGrid();
    this.game.root = this.game.grid[this.game.cols - 1][this.game.rows - 1];
    this.game.brushfire();
    document.getElementById('infoDiv').style.visibility = 'visible'; // Make info tiles visible on game start
    document.getElementById('menuDiv').style.visibility = 'visible';
    document.getElementById('switchDiv').style.visibility = 'visible'
  }
  init() {

  }
  run() {
    let gt = this.game.updateGameTime();
    this.game.updateInfoElements(gt);
    this.game.removeBullets();
    this.game.removeMissiles();
    this.game.removeEnemies();
    this.game.controlWaves()
    this.game.backgroundMusic.play();
    if (this.game.isRunning) {
      this.game.render();
    }

    // draw the grid
    for (let i = 0; i < this.game.cols; i++) {
      for (let j = 0; j < this.game.rows; j++) {
        this.game.grid[i][j].render();
      }
    }
    // draw the towers
    for (let i = 0; i < this.game.towers.length; i++) {
      this.game.towers[i].run();
    }
    for (let i = 0; i < this.game.enemies.length; i++) {
      this.game.enemies[i].run();
    }
    for (let i = 0; i < this.game.bullets.length; i++) {
      this.game.bullets[i].run();
    }
    for (let i = 0; i < this.game.explosiveBullets.length; i++) {
      this.game.explosiveBullets[i].run();
    }
    for (let i = 0; i < this.game.missiles.length; i++) {
      this.game.missiles[i].run();
    }
    for (let i = 0; i < this.game.bullets.length; i++) {
      //    this.game.lockon[i].run();
    }


    // some help text in the bottom left of the canvas
    this.game.context.save();
    this.game.context.fillStyle = "white";
    this.game.context.font = "14px sans-serif";
    this.game.context.restore();

    //more panelthings
    // if(this.game.panelStart){
    //   this.game.panelStart.render()
    // }
    //
    // if(this.game.panelInstructions){
    //   this.game.panelInstructions.render()
    // }
    //
    // if(this.game.panelQuit){
    //   this.game.panelQuit.render()
    // }

    //collision detection
    for (var i = this.game.enemies.length - 1; i >= 0; i--) {
      for (var j = this.game.bullets.length - 1; j >= 0; j--) {
        if (this.game.circlePointCollision(this.game.bullets[j].loc.x, this.game.bullets[j].loc.y, this.game.enemies[i].loc.x, this.game.enemies[i].loc.y, this.game.enemies[i].radius)) {
          //this.game.bullets.splice(j, 1);
          //  this.game.enemies[i].kill = true;
          //  this.game.score = this.game.score + 1;
          if (this.game.score % 20 === 0) {
            //this.game.bankValue = this.game.bankValue + 10;
          }
        }
      }
    }
    if (this.game.health <= 0) {
      this.game.gameState = new GameState3(this.game)
    }
    if (this.game.isRunning) {
      this.game.banner();
    }
  }

}

