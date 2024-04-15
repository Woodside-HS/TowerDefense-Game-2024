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
    this.game.gameStateID = 1;
    this.game.canvas.canDiv.style.backgroundImage = "url('TowerGameJS-Phase4/resources/images/bg/startScreen.jpg')"
    this.panelStart = new Panel(this, 0)
    this.panelInstructions = 0
    this.panelQuit = 0
    document.getElementById('infoDiv').style.visibility = 'hidden'; // Make info tiles invisible on start page
    document.getElementById('menuDiv').style.visibility = 'hidden';
    document.getElementById('switchDiv').style.visibility = 'hidden';
  }
  run() {
    if (this.panelStart) {
      this.panelStart.render(true)
    }

    if (this.panelInstructions) {
      this.panelInstructions.render(true)
    }
  }
}
class GameState2 extends GameState { // Level screen
  constructor(game) {
    super(game);
    towerGame.gameStateID = 6;
    this.game.canvas.canDiv.style.backgroundImage = "url('TowerGameJS-Phase4/resources/images/bg/levelSelector.jpg')"
    this.panelLvlSelector = new Panel(this, 3, 480);

  }

  run() {
    this.game.render();
    this.panelLvlSelector.render(true);
  }

}

class GameState3 extends GameState { // end screen
  constructor(game) {
    super(game)
    this.game.gameStateID = 3
    this.game.enemies = []
    this.game.canvas.canDiv.style.backgroundImage = "url('TowerGameJS-Phase4/resources/images/bg/endScreen.jpg')"
    this.panelQuit = new Panel(this, 2)
    this.panelCredits = 0
    this.panelStart = 0
    document.getElementById('infoDiv').style.visibility = 'hidden'; // Make info tiles invisible on start page
    document.getElementById('menuDiv').style.visibility = 'hidden';
    document.getElementById('switchDiv').style.visibility = 'hidden';
  }
  run() {
    this.game.render()
    document.getElementById("infoDiv").getElementsByClassName("infoTileDiv")[4].innerHTML = ("Health </br>" + 0); if (this.panelQuit) {
      this.panelQuit.render(true)
    }
    if (this.panelCredits) {
      this.panelCredits.render(true)
    }
  }
}

class GameState4 extends GameState { //Catalog
  constructor(game) {
    super(game);
    this.count = 1;
    towerGame.gameStateID = 4;

    this.game.canvas.canDiv.style.backgroundImage = "url('TowerGameJS-Phase4/resources/images/bg/catalog.jpg')"
    this.catalogPanel = new Panel(this, 5);
    this.towerPanel = 0;
    this.enemyPanel = 0;

    document.getElementById('infoDiv').style.visibility = 'hidden'; // Make info tiles invisible on start page
    document.getElementById('menuDiv').style.visibility = 'hidden';
    document.getElementById('switchDiv').style.visibility = 'hidden';
  }

  run() {
    this.game.render();
    this.catalogPanel.render(false);

    if (this.towerPanel) {
      this.towerPanel.render(true)
    }
    if (this.enemyPanel) {
      this.enemyPanel.render(true)
    }
  }
}


class GameState5 extends GameState { // game itself
  constructor(game, levelSel) {
    super(game)
    this.game.health = 100;
    this.game.score = 0
    this.game.bankValue = 1000;
    this.game.gameTime = 0
    this.game.grid = [];
    this.game.towers = [];
    this.game.enemies = [];
    this.game.bullets = []
    this.game.cols = Math.floor(this.game.canvas.width / this.game.w);
    this.game.rows = Math.floor(this.game.canvas.height / this.game.w);
    this.game.backgroundMusic = new Audio('TowerGameJS-Phase4/resources/sounds/Elevator-music.mp3')
    this.game.loadGrid();
    this.game.brushfire();
    this.game.root = this.game.grid[this.game.cols - 1][this.game.rows - 1];
    if (levelSel === 1) {
      this.game.gameStateID = 6;
    } else if (levelSel === 2) {
      this.game.gameStateID = 7;
    } else if (levelSel === 3) {
      this.game.gameStateID = 8;
    } else if (levelSel === 4) {
      this.game.gameStateID = 5;
    }

    // calls the grid created in level.js, creating the set path
    // and loading in the correct background for that level.
    // This is geared to be able to add more levels in the future, as
    // there are currently only 3.
    if (this.game.gameStateID === 5) {
      this.game.levelRender(customLevel);
      this.game.levelKey = customLevel;
      this.game.canvas.canDiv.style.backgroundImage = "url('TowerGameJS-Phase4/resources/images/bg/levels/level1.png')"
    } else if (this.game.gameStateID === 6) {
      this.game.levelRender(level1Key);
      this.game.levelKey = level1Key;
      this.game.canvas.canDiv.style.backgroundImage = "url('TowerGameJS-Phase4/resources/images/bg/levels/level1.png')"
    } else if (this.game.gameStateID === 7) {
      this.game.levelRender(level2Key);
      this.game.levelKey = level2Key;
      this.game.canvas.canDiv.style.backgroundImage = "url('TowerGameJS-Phase4/resources/images/bg/levels/level2.jpg')"
    } else if (this.game.gameStateID === 8) {
      this.game.levelRender(level3Key);
      this.game.levelKey = level3Key;
      this.game.canvas.canDiv.style.backgroundImage = "url('TowerGameJS-Phase4/resources/images/bg/levels/level3.jpg')"
    }

    document.getElementById('infoDiv').style.visibility = 'visible'; // Make info tiles invisible on start page
    document.getElementById('menuDiv').style.visibility = 'visible';
    document.getElementById('switchDiv').style.visibility = 'visible';
  }
  init() {
    //need this to make code run even though neothing is init (like the pun?)
  }
  run() {
    let gt = this.game.updateGameTime();
    this.game.updateInfoElements(gt);
    this.game.removeBullets();
    this.game.removePests();
    this.game.removeMissiles();
    this.game.removeEnemies();
    this.game.controlWaves();
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
    for (let i = 0; i < this.game.blades.length; i++) {
      this.game.blades[i].run();
    }
    for (let i = 0; i < this.game.missiles.length; i++) {
      this.game.missiles[i].run();
    }
    for (let i = 0; i < this.game.hands.length; i++) {
      this.game.hands[i].run();
    }
    for (let i = 0; i < this.game.rays.length; i++) {
      this.game.rays[i].run();
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

