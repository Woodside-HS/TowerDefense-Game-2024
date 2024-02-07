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
  }
  run() {
    if (this.panelStart) {
      this.panelStart.render()
    }

    if (this.panelInstructions) {
      this.panelInstructions.render()
    }
  }
}
class GameState2 extends GameState { // Level screen
  constructor(game) {
    game.gameStateID = 2;
  }

}

class GameState3 extends GameState { // end screen
  constructor(game) {
    super(game)
    gameStateID = 3
    this.game.enemies = []
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
    this.game.gameStateID = 4;
    this.game.canvas.canDiv.style.backgroundImage = "url('resources/images/bg/level1.jpg')"
    this.game.health = 100
    this.game.score = 0
    this.game.bankValue = 200;
    this.game.gameTime = 0
    this.game.grid = [];
    this.game.towers = [];
    this.game.enemies = [];
    this.game.bullets = []
    this.game.cols = Math.floor(this.game.canvas.width / this.game.w);
    this.game.rows = Math.floor(this.game.canvas.height / this.game.w);
    this.game.backgroundMusic = new Audio('resources/sounds/Elevator-music.mp3')
    this.game.loadGrid();
    this.game.brushfire();
    let x = 1;
    let y = 1;
    this.game.root = this.game.grid[this.game.cols - x][this.game.rows - y];

    if (this.game.gameStateID === 4) {
      this.game.levelRender(level1Key);
      x = 10;
      y = 7;
    } else if (this.game.gameStateID === 5) {
      this.game.levelRender(level2Key);
    } else if (this.game.gameStateID === 6) {
      this.game.levelRender(level3Key);
    } else if (this.game.gameStateID === 7) {
      this.game.levelRender(level4Key);
    } else if (this.game.gameStateID === 8) {
      this.game.levelRender(level5Key);
    }
  }
  init() {

  }
  run() {
    let gt = this.game.updateGameTime();
    this.game.updateInfoElements(gt);
    this.game.removeBullets();
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

    for (let i = 0; i < this.game.bullets.length; i++) {
      //    this.game.lockon[i].run();
    }


    // some help text in the bottom left of the canvas
    this.game.context.save();
    this.game.context.fillStyle = "white";
    this.game.context.font = "14px sans-serif";
    this.game.context.restore();

    //collision detection
    for (var i = this.game.enemies.length - 1; i >= 0; i--) {
      for (var j = this.game.bullets.length - 1; j >= 0; j--) {
        if (this.game.circlePointCollision(this.game.bullets[j].loc.x, this.game.bullets[j].loc.y, this.game.enemies[i].loc.x, this.game.enemies[i].loc.y, this.game.enemies[i].radius)) {

          if (this.game.score % 20 === 0) {

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
