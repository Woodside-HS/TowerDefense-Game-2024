'use strict'

// wait for the window to load and than call back setup()
window.addEventListener('load', loadImages, false);

var towerGame;   // the global game object
var FRAME_RATE = 30;
var cellId = 0;
var count = 0;
var firstRun = 0;
var bsImage;
var ssImage;
var tiles = [];
var load = document.getElementById('loader');
var wrap;
var towerState = 1;

function loadImages() {
  bsImage = new Image();
  bsImage.src = "TowerGameJS-Phase4/resources/images/spritesheets/buttons.png";
  ssImage = new Image();
  ssImage.src = "TowerGameJS-Phase4/resources/images/spritesheets/sprites.png";
  window.setTimeout(setup, 1500);
}
function setup() {

  wrap = document.getElementById('wrapperDiv');

  load.style.display = 'none';
  wrap.style.display = 'block';

  towerGame = new Game();
  window.setTimeout(draw, 100);    // wait 100ms for resources to load then start draw loop

  //panelthings


}

function draw() {   // the animation loop
  towerGame.run();
  window.setTimeout(draw, 1000 / FRAME_RATE);  // come back here every interval
}

// Game is the top level object and it contains the levels
class Game {

  //  This is a test
  constructor() { // from setup()

    //these three variables control whether various error banners are showing; they start off, of course, not displaying
    this.displayOverDraftBanner = false;
    this.invalidGridBanner = false;
    this.towerErrorBanner = false;


    this.isRunning = true;//controls pause function
    this.placingTower = false;//controls whether you are actively trying to place a tower
    this.currentTower = 0;// tells us what tower is focused
    this.towerType = 0;
    this.gameTime = 0;
    this.towers = [];
    this.secondTarget = false;
    this.deathLoc;
    this.enemies = [];
    this.waves = [[]];
    this.bullets = [];
    this.missiles = [];//added with same logic as bullets
    this.hands = [];//added with same logic as bullets (this is the minion guy idk)
    // this.blades = [];//added with same logic as bullets
    this.secondRays = [];
    this.allowPlace = true;//to not place when picking a spot to target for two of the towers
    this.explosiveBullets = [];//added with same logic as bullets
    this.bankValue = 0;
    this.enemyNumArray = [];
    this.explosiveBullets = [];
    this.enemyNumArray = [];
    this.rays = [];
    this.checkOnce = true;
    this.gameStateID = 1;
    this.levelKey;
    this.enemyNum = 20;
    this.wallCost = 5;
    this.paused = false;
    this.towerState = 1;
    this.numWave = 0;
    this.enemyNumArray = [];
    this.index;
    this.loadEmptyImage();
    this.loadAllWaves();
    this.loadEnemyImages();
    this.score = 0;
    this.wave = 0;
    this.health = 100;
    this.shownBase = false;


    this.canvas = document.createElement("canvas");

    if (!this.canvas || !this.canvas.getContext)
      throw "No valid canvas found!";
    this.canvas.width = 900;
    this.canvas.height = 750;
    this.canvas.canDiv = document.getElementById('canDiv')
    this.canvas.canDiv.appendChild(this.canvas);

    this.context = this.canvas.getContext("2d");
    if (!this.context)
      throw "No valid context found!";
    this.lastTime = Date.now();
    //select everything of type/class and set call backs

    this.tileDivs = this.createTileDivs();
    var towerSwitchButton = document.getElementById('switchDiv');//switch visable towers 

    this.loadDOMCallBacks(this.tileDivs);
    // select canvas for callbacks
    this.canvas.addEventListener('mousemove', this.handleCNVMouseMoved, false);
    this.canvas.addEventListener('mouseover', this.handleCNVMouseOver, false);
    this.canvas.addEventListener('click', this.handleCNVMouseClicked, false);



    this.mouseX = 0;
    this.mouseY = 0;
    this.w = 50;

    this.firstClick = true;
    this.gameState = new GameState1(this);

    // container arrays for cells
    this.grid = [];
    this.cols = Math.floor(this.canvas.width / this.w);
    this.rows = Math.floor(this.canvas.height / this.w);

    this.loadGrid();
    this.rootX = 1;
    this.rootY = 1;
    this.root = this.grid[this.cols - 1][this.rows - 1]; //where the enemies start spawning (gets changed in code for custom levels)
    this.brushfire(); //pathfinding function
    this.loadWallImage();
    var button = document.getElementById('pauseButton');
    button.addEventListener('click', this.pause, false);

    var fastForwardButton = document.getElementById('fastForward');
    //var infoDiv = document.getElementById('infoDiv');

    fastForwardButton.addEventListener('click', function () { //controls start/speed toggle button
      if (towerGame.firstClick) { //if its the first time you are clicking
        towerGame.wave = new Wave(towerGame, towerGame.numWave); //start the game
        towerGame.numWave++; //switch us to wave 1
        towerGame.firstClick = false;
        FRAME_RATE = 30; //keep the framerate at normal speed
      }

      towerGame.fastForward = !towerGame.fastForward;

      if (towerGame.fastForward) { // if it is on fast mode
        FRAME_RATE = 30; // make it slow
        //change button
        fastForwardButton.classList.remove('fast');
        fastForwardButton.classList.add('slow');

      } else { // if it is on slow mode
        FRAME_RATE = 60; // make it fast
        //change button
        fastForwardButton.classList.remove('slow');
        fastForwardButton.classList.add('fast');

      }
    }, false);

    document.getElementById('switchDiv').style.transform = "translate(" + 0 + "px, " + -52 + "px)";//idk this is clipping
    //I suck at editing png so yeah

    towerSwitchButton.addEventListener('click', function () {


      let sw = document.getElementById('switchDiv');//bro what is this variable name?

      if (towerState == 1) {
        towerState = 2;//just switching positions + rotating to point arrow in correct directions
        sw.style.transform = "translate(" + 0 + "px, " + -749 + "px) rotate(180deg)";//
      } else if (towerState == 2) {
        towerState = 1;
        sw.style.transform = "translate(" + 0 + "px, " + -50 + "px)";
      }
    }, false);

  }


  //load wall stuff
  loadWallImage() {
    // grab the wall image from the buttons stprite sheet
    var propName = "B110000";
    var f = buttonsJSON.frames[propName].frame;
    createImageBitmap(bsImage, f.x, f.y, f.w, f.h).then(function (wallImage) {
      Cell.wallImage = wallImage;
      //console.log(f);
    },
      function () {
        alert('failed to make wallImage');
      });

  }

  loadEmptyImage() { //loads imnages in cells w/o wals
    let propName = "B70000";
    var f = buttonsJSON.frames[propName].frame;
    createImageBitmap(bsImage, f.x, f.y, f.w, f.h).then(function (emptyImage) {
      Cell.emptyImage = emptyImage;
      //console.log(f);
    },
      function () {
        alert('failed to make wallImage');
      });
  }



  loadEnemyImages() {
    var enemyData = [];

    for (var i = 1; i <= 10; i++) {
      var propName = "E" + i + "0000";
      var f = json.frames[propName].frame;
      enemyData.push(createImageBitmap(ssImage, f.x, f.y, f.w, f.h));
    }

    Promise.all(enemyData).then(function (enemies) { //tells us what enemies have what images
      Enemy.image1 = enemies[0];
      Enemy.image2 = enemies[1];
      Enemy.image3 = enemies[2];
      Enemy.image4 = enemies[3];
      Enemy.image5 = enemies[4];
      Enemy.image6 = enemies[5];
      Enemy.image7 = enemies[6];
      Enemy.image8 = enemies[7];
      Enemy.image9 = enemies[8];
      Enemy.image10 = enemies[9];
    });
  }

  // The success callback when a tower canvas image
  // or bullet image has loaded.  Hide them from
  // displaying on the page.
  hideImgElement() { this.style.display = "none"; }

  run() { // called from draw()
    if (towerGame.wave.spawnOver && towerGame.enemies.length == 0) {
      for (let i = towerGame.bullets.length; i >= 0; i--) {
        towerGame.bullets.splice(i, 1)
      }
      for (let i = towerGame.hands.length; i >= 0; i--) {
        towerGame.hands.splice(i, 1)
      }
      towerGame.wave.spawnOver = false;
      setTimeout(() => {
        if (towerGame.numWave != (0)) {
          towerGame.wave = new Wave(this, towerGame.numWave);
          towerGame.numWave++;

        }
      }, 4000);
    }
    if (towerState == 1) {
      if (count == 1) {
        //  this.createTileDivs();
        this.tileDivs = this.createTileDivs();
        this.loadDOMCallBacks(this.tileDivs);
        count--;
      }

    } else if (towerState == 2) {
      if (count == 0) {
        this.tileDivs = this.createTileDivs();
        this.loadDOMCallBacks(this.tileDivs);
        count++;
      }
    }
    if (!this.paused) {
      this.gameState.run()
    }

    if (!this.paused) {
      towerGame.gameState.run()
    }
  }


  pause() { //controls pause button
    var butt = document.getElementById('pauseButton'); //identifes which HTML object is the pause button
    towerGame.paused = !towerGame.paused;
    if (towerGame.paused) { //if its already paused
      //change button to play
      butt.classList.remove('pause');
      butt.classList.add('play');
    } else {
      //change button to pause
      butt.classList.remove('play');
      butt.classList.add('pause');
    }
  }


  render() { // draw game stuff
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

  }

  banner() {
    //overdraft banner
    if (this.displayOverDraftBanner == true) { //if we are supposed to be displaying the banner
      //draw the banner
      this.context.beginPath();
      this.context.rect(150, 210, 600, 250);
      this.context.strokeStyle = "#3B6C8E";
      this.context.fillStyle = "#3B6C8E";
      this.context.fill();
      this.context.stroke();
      this.context.closePath();
      const text = "Too expensive!";
      this.context.font = "italic 100px Garamond"; // Set the font size and type
      this.context.fillStyle = "white"; // Set the text color
      const textWidth = this.context.measureText(text).width;
      const textX = 150 + (600 - textWidth) / 2; // Center the text horizontally
      const textY = 200 + 350 / 2; // Center the text vertically
      this.context.fillText(text, textX, textY);
      setTimeout(() => { //set a timer
        this.displayOverDraftBanner = false; //once timer is up, stop displaying the banner
      }, 600); //timer is for 600 milliseconds
    }

    //code to display invalid grid banner (see comments for overDraftBanner)
    if (this.invalidGridBanner == true) {
      this.context.beginPath();
      this.context.rect(180, 220, 580, 250);
      this.context.strokeStyle = "#3B6C8E";
      this.context.fillStyle = "#3B6C8E";
      this.context.fill();
      this.context.stroke();
      this.context.closePath();
      const text = "Invalid grid!";
      this.context.font = "italic 120px Garamond"; // Set the font size and type
      this.context.fillStyle = "white"; // Set the text color
      const tw = this.context.measureText(text).width;
      const tx = 150 + (600 - tw) / 2; // Center the text horizontally
      const ty = 200 + 350 / 2; // Center the text vertically
      this.context.fillText(text, tx, ty);
      setTimeout(() => {
        this.invalidGridBanner = false;
      }, 600);
    }

    //invalid tower placement banner
    if (this.towerErrorBanner == true) {
      this.context.beginPath();
      this.context.rect(180, 220, 580, 250);
      this.context.strokeStyle = "#3B6C8E";
      this.context.fillStyle = "#3B6C8E";
      this.context.fill();
      this.context.stroke();
      this.context.closePath();
      const textLine1 = "You can't place";
      const textLine2 = "a tower there!";
      this.context.font = "italic 100px Garamond"; // Adjusted font size to fit the text in two lines
      this.context.fillStyle = "white";
      const tw1 = this.context.measureText(textLine1).width;
      const tw2 = this.context.measureText(textLine2).width;
      const tx1 = 180 + (580 - tw1) / 2; // Center the first line horizontally
      const tx2 = 180 + (580 - tw2) / 2; // Center the second line horizontally
      const ty1 = 220 + (250 / 2) - 25; // Position for the first line (slightly above the middle)
      const ty2 = 220 + (250 / 2) + 75; // Position for the second line (slightly below the middle)
      this.context.fillText(textLine1, tx1, ty1);
      this.context.fillText(textLine2, tx2, ty2);
      setTimeout(() => {
        this.towerErrorBanner = false;
      }, 600);
    }

  }

  // brushfire()
  // starting with the 'root' cell, which is the bottom right cell of the grid
  // assign a "distance" to all other cells where the distance is the
  // accumulated steps from that cell to the root cell.
  // An adjacent neighbor has a step of 10
  // and a diagonal neighbor has a step of 14.

  brushfire(undo) { //if brushfire fails to make a valid map undo will be called
    // Initialize each cell in the grid to have a distance that
    // is the greatest possible.  Initialize each cell to
    // have no parent and populate it's array of neighbors
    for (var i = 0; i < this.cols; i++) {
      for (var j = 0; j < this.rows; j++) {
        var cell = this.grid[i][j];
        cell.dist = this.cols * this.rows * 5;     // set distance to max
        cell.vec = null;    // clear parent vector
        cell.parent = 0;    // clear parent
        cell.addNeighbors(this, this.grid); // fill the neighbors array
      }
    }
    // Initialize the fifo queue with the root cell
    this.root.dist = 0;
    this.root.occupied = false; // in case it was randomly set occupied
    var queue = [this.root];

    // loop as long as the queue is not empty, removing the first cell
    // in the queue and adding all its neighbors to the end of the
    // queue.  The neighbors will only be those that are not occupied
    // and not blocked diagonally.
    while (queue.length) {
      var current = queue.shift();   // remove the first cell from the queue
      // for all its neighbors...
      for (let j = 0; j < current.neighbors.length; j++) {
        let neighbor = current.neighbors[j];
        var dist = current.dist + 10; // adjacent neighbors have a distance of 10
        if (current.loc.x != neighbor.loc.x && current.loc.y != neighbor.loc.y)
          dist = current.dist + 14; // diagonal neighbors have a distance of 14
        // if this neighbor has not already been assigned a distance
        // or we now have a shorter distance, give it a distance
        // and a parent and push to the end of the queue.
        if (neighbor.dist > dist) {
          neighbor.parent = current;
          neighbor.dist = dist;
          queue.push(neighbor);
        }
      }     // for each neighbor
    }   // while(queue.length)
    if (!this.validMap()) {
      if (undo) {
        undo();
        this.brushfire()
      } else {
        // delete any enemy that is currently in a cell without a parent
        for (let i = 0; i < this.enemies.length; i++) {
          let enemy = towerGame.enemies[i];
          if (!enemy.currentCell.parent)
            enemy.kill = true;    // kill the orphans
        }
        console.log("brushfire created an invalid map and no undo was inputed")
      }
    }


    // give each cell a vector that points to its parent
    //       for(var i = 0; i < this.cols; i++){
    //         for(var j = 0; j < this.rows; j++){
    //           this.grid[i][j].vec = this.grid[i][j].getVector();
    //         }
    //       }

  }
  //check the map to see if there are cells without parents

  //check the map to see if there are cells without parents
  validMap() { //this is for the custom level; it determines if you can build the map you want to build (prevents blocking off origin, for example)
    if (this.grid[0][0].occupied || this.grid[0][0].hasTower) {
      return false;
    }
    else {
      for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
          var cell = this.grid[i][j];
          if (!cell.parent && !(cell.occupied || cell.hasTower) && cell != this.root) {
            return false;

          }
        }
      }
      return true;
    }
  }
  //undo an invalid map action
  undo(cell, tower) { //this just reverts everything back to before the wrong action
    if (tower) {
      return function () {
        cell.hasTower = false;
        towerGame.bankValue += tower.cost;
        towerGame.towers.splice(towerGame.towers.indexOf(tower))
        towerGame.towerErrorBanner = true; //displays banner
      }
    } else {
      return function () {
        if (cell.occupied) {
          cell.occupied = false;
          towerGame.bankValue += towerGame.wallCost;
        } else {
          cell.occupied = true;
          towerGame.bankValue -= towerGame.wallCost;
        }
        towerGame.invalidGridBanner = true; //dispays banner
      }
    }
  }


  // Delete any enemies that have died
  removeEnemies() {
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      if (this.enemies[i].kill && this.enemies[i].type != 10) {
        if (this.enemies[i].secondTarget) {
          this.secondTarget = true;
          this.deathLoc = this.enemies[i].loc;
        }
        if (this.secondTarget) {
          for (let i = 0; i < this.enemies.length; i++) {
            let dist = this.enemies[i].loc.dist(this.deathLoc);
            let closestDist = 10000;
            if (dist < closestDist) {
              closestDist = dist;
              this.index = i;
            }

          }
          this.secondRays.push(new LockOn(this.deathLoc, this.enemies[this.index].loc));

          towerGame.enemies[this.index].isLocked = true;
          towerGame.enemies[this.index].deathTimer = 5000;
          towerGame.enemies[this.index].deathByRay = true;
          setTimeout(() => {
            this.secondRays.splice(0, 1);
          }, 5000);
        }
        towerGame.bankValue += (15 + 5 * this.enemies[i].type); //rewards player for killiung enemies
        this.enemies.splice(i, 1); //removes enemied from array
      }
      else if (this.enemies[i].kill && this.enemies[i].type == 10 && this.enemies[i].explodingAfterMathGrowth >= 120
        || this.enemies[i].currentCell == towerGame.root) {
        console.log(this.enemies[i].type)
        towerGame.bankValue += (15 + 5 * this.enemies[i].type);
        this.enemies.splice(i, 1);
      }
    }
  }

  removeBullets() { //some towers fire bullets

    if (this.bullets.length < 1) return;
    for (let i = this.bullets.length - 1; i >= 0; i--) {

      if ((this.bullets[i].loc.x < 0 ||
        this.bullets[i].loc.x > this.canvas.width ||
        this.bullets[i].loc.y < 0 ||
        this.bullets[i].loc.y > this.canvas.height)
        || this.bullets[i].lifeSpan == 0 || this.bullets[i].slashArc == "over") {

        this.bullets.splice(i, 1); //removes bullets from the array
      }


    }
  }
  removePests() {
    for (let i = this.hands.length - 1; i >= 0; i--) {
      if (this.hands[i].death == true) {
        this.hands.splice(i, 1);
      }
    }
  }
  removeMissiles() {
    if (this.missiles.length < 1) return;
    for (let i = this.missiles.length - 1; i >= 0; i--) {

      if (this.missiles[i].loc.x < 0 ||
        this.missiles[i].loc.x > this.canvas.width ||
        this.missiles[i].loc.y < 0 ||
        this.missiles[i].loc.y > this.canvas.height) {
        this.missiles.splice(i, 1);
      }

    }
  }

  updateInfoElements() { //this just keeps the graphic displays at the top of the game up to date
    let infoElements = document.getElementById('infoDiv').getElementsByClassName('infoTileDiv');
    for (let i = 0; i < infoElements.length - 1; i++) {
      let info = infoElements[i];
      // change the html content after condition--use indexOf
      if (info.id === 'bankTile') {
        info.innerHTML = '';
        var value = document.createElement('p');
        value.style.fontSize = '20pt';
        value.innerHTML = this.bankValue;
        value.style.transform = "translateY(15px)"; // Move the text down
        info.appendChild(value)
        if (this.bankValue < 0) {
          this.bankValue == 0;
        }
      } else if (info.id === 'timeTile') {
        info.innerHTML = '';
        var value = document.createElement('p');
        value.style.fontSize = '20pt';
        value.innerHTML = this.updateGameTime();
        value.style.transform = "translateY(15px)"; // Move the text down
        info.appendChild(value);
      }
      if (info.id === 'scoreTile') {
        info.innerHTML = '';
        var value = document.createElement('p');
        value.style.fontSize = '20pt';
        value.innerHTML = this.score;
        value.style.transform = "translateY(23px)"; // Move the text down
        info.appendChild(value);
      }
      if (info.id === 'waveTile') {
        info.innerHTML = '';
        var value = document.createElement('p');
        value.style.fontSize = '20pt';
        value.innerHTML = towerGame.numWave;
        value.style.transform = "translateY(15px)"; // Move the text down
        info.appendChild(value);
      }
      if (info.id === 'healthTile') {
        info.innerHTML = '';
        var value = document.createElement('p');
        value.style.fontSize = '20pt';
        value.innerHTML = this.health;
        value.style.transform = "translateY(15px)"; // Move the text down
        info.appendChild(value);
      }

    }
  }
  updateCostInfoElement(value) {


    let infoElements = document.getElementById('infoDiv').getElementsByClassName('infoTileDiv');
    let info = infoElements[infoElements.length - 3];
    info.innerHTML = ''; // Clear existing content
    var valueElement = document.createElement('div'); // Create a new div for the text
    valueElement.innerHTML = value;
    valueElement.style.transform = "translateY(-15px)"; // Move the text up
    info.appendChild(valueElement); // Append the new div with the text to the info element
  }



  updateGameTime() {
    var millis = Date.now();
    if (millis - this.lastTime >= 1000) {
      this.gameTime++;
      this.lastTime = millis;
      return this.gameTime;
    }
    return this.gameTime;
  }

  // +++++++++++++++++++++++++++++++++++++++++++  load a 2D array with cells
  loadGrid() {
    for (var i = 0; i < this.cols; i++) {     // columns of rows
      this.grid[i] = [];
      for (var j = 0; j < this.rows; j++) {
        this.grid[i][j] = new Cell(this, vector2d((i * this.w), (j * this.w)), ++cellId);

      }
    }

  }  // ++++++++++++++++++++++++++++++++++++++++++++++  End LoadGrid

  createTowerBitmaps(ssImage, mtd, index) {
    if (!ssImage || !bsImage.complete) {
      alert("Images not loaded");
      // quit code
    }
    var propertyName = "T" + (index + 1) + "0000";

    var frame = json.frames[propertyName].frame;
    var bulletPropertyName = "p" + (index + 1) + "0000";
    var bulletFrame = json.frames[bulletPropertyName].frame;
    //cool stuff

    Promise.all([
      createImageBitmap(ssImage, frame.x, frame.y, frame.w, frame.h),
      createImageBitmap(ssImage, bulletFrame.x, bulletFrame.y, bulletFrame.w, bulletFrame.h)
    ])
      .then(
        function (bmps) {
          mtd.cnvTurImg = bmps[0];
          mtd.cnvBulImg = bmps[1];
        }, function () {
          alert("Error in creating bitmap");
        });

  }

  // Create the divs to hold the menu of towers with
  // the large images.  This divs also contain the
  // parameters for creating towers to be drawn on the
  // canvas.
  createTileDivs() {
    while (document.getElementById("menuDiv").hasChildNodes()) {

      document.getElementById("menuDiv").firstChild.remove();
    }

    var buttons = ["B10000", "B20000", "B30000", "B40000", "B50000",
      "B60000", "B70000", "B80000", "B90000", "B100000"];

    if (towerState == 1) {


      //  loop through the towers and DO NOT include wall element
      for (var i = 0; i < 5; i++) {
        var mtd = document.createElement("div"); // createDiv("");
        if (i == 0) {
          mtd.ability = "normal";

        } else if (i == 1) {
          mtd.ability = "fast";

        } else if (i == 2) {
          mtd.ability = "freeze";

        } else if (i == 3) {
          mtd.ability = "explosive";

        } else if (i == 4) {
          mtd.ability = "ray";
        }
        var b = buttons[i];
        var button = buttonsJSON.frames[b].frame;

        var innerDiv = document.createElement("div");
        innerDiv.id = "innerDiv" + i;
        innerDiv.style.width = "90px";
        innerDiv.style.height = "90px";
        // Not using imageBitmaps for the buttons
        // As they are not on the canvas
        innerDiv.style.backgroundImage = "url(TowerGameJS-Phase4/resources/images/spritesheets/buttons.png)";
        innerDiv.style.backgroundPosition = `${-button.x}px ${-button.y}px`;

        innerDiv.style.margin = "5px";
        mtd.appendChild(innerDiv);
        document.getElementById("menuDiv").appendChild(mtd);
        mtd.cost = 50 * (i) + 100;




        mtd.setAttribute('title', 'Cost = ' + mtd.cost);
        mtd.id = 'towImgDiv' + i;
        tiles[i] = mtd;
        this.createTowerBitmaps(ssImage, mtd, i)

        if (firstRun == 0) {//this is for loading all things the first frame
          towerState == 2;
          firstRun++;
        }

      }
    } if (towerState == 2) {//tower state 2 gets called when you click the
      // button and changes back to 1 after you click it again
      for (var i = 5; i < 10; i++) {
        var mtd = document.createElement("div");
        if (i == 5) {
          mtd.ability = "cannon";
        } else if (i == 6) {
          mtd.ability = "bladeStorm";
        } else if (i == 7) {
          mtd.ability = "liquify";
        } else if (i == 8) {
          mtd.ability = "missile";
        } else if (i == 9) {
          mtd.ability = "buffregen";
        }


        var b = buttons[i];
        var button = buttonsJSON.frames[b].frame;

        var innerDiv = document.createElement("div");
        innerDiv.id = "innerDiv" + (i);
        innerDiv.style.width = "90px";
        innerDiv.style.height = "90px";
        // Not using imageBitmaps for the buttons
        // As they are not on the canvas
        innerDiv.style.backgroundImage = "url(TowerGameJS-Phase4/resources/images/spritesheets/buttons.png)";
        innerDiv.style.backgroundPosition = `${-button.x}px ${-button.y}px`;

        innerDiv.style.margin = "5px";
        mtd.appendChild(innerDiv);
        document.getElementById("menuDiv").appendChild(mtd);
        mtd.cost = 50 * (i) + 100;




        mtd.setAttribute('title', 'Cost = ' + mtd.cost);
        mtd.id = 'towImgDiv' + i;
        tiles[i] = mtd;
        this.createTowerBitmaps(ssImage, mtd, i)
      }


    }
    return tiles;


  }

  getBankValue() {
    return this.bankValue;
  }

  setBankValue(refund) {
    this.bankValue += refund;
  }

  loadAllWaves() { //hardcodded wave arrays
    this.enemyNumArray = [
      //normal (1)
      //normal fast (2)
      //normal slow (3)
      //shark (4)
      //blue jellyfish (5)
      //flyingfish (6)
      //octopus (7)
      //turtle(8)
      //frog(9)
      //starfish(10)


      [5, 0, 0, 0, 0, 0, 0, 0, 0, 0], //tells you how many of each type of enemy are in each wave
      [4, 2, 1, 0, 0, 0, 0, 0, 0, 0],
      [7, 7, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 3, 2, 0, 0, 0, 0, 0, 0],
      [0, 5, 0, 0, 3, 0, 0, 0, 0, 0],

      [10, 0, 0, 4, 0, 0, 0, 0, 0, 0],
      [30, 30, 0, 0, 0, 0, 0, 0, 0, 0],
      [12, 12, 12, 0, 0, 0, 0, 0, 0, 0],
      [0, 25, 0, 0, 5, 0, 7, 0, 0, 0],
      [0, 12, 0, 4, 0, 24, 0, 0, 0, 0],

      [8, 8, 0, 0, 0, 8, 8, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 10, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 6, 0],
      [3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
      [0, 0, 0, 0, 6, 0, 0, 6, 6, 6],

      [25, 25, 25, 25, 25, 0, 0, 0, 0, 0],
      [0, 100, 0, 0, 0, 30, 0, 0, 0, 0],
      [0, 0, 10, 0, 0, 0, 0, 0, 10, 10],
      [8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
      [0, 0, 0, 0, 0, 25, 25, 0, 0, 25],


    
    ];
    //this just parses the enemy array and adds it to the waves
    for (let i = 0; i < this.enemyNumArray.length; i++) {
      this.waves[i] = [];
      for (let j = 0; j < this.enemyNumArray[i].length; j++) {
        this.waves[i].push(this.enemyNumArray[i][j]);
      }
    }

  }


  //  Logic to add tower +++++++++++++++++++++++
  canAddTower(cell) {
    // add conditions before allowing user to place turret
    // Some money required but also cannot place tower on a cell
    // of the grid that is occupied or is the root cell
    if (towerGame.placingTower) {
      if (!cell.occupied && !cell.hasTower && cell != towerGame.root) {
        return true;
      }
      return false;
    }
  }

  createTower(mtd) { // menu turret div
    // create a new tower object and add to array list
    // the menu tower div contains the parameters for the tower
    console.log("Bankvalue = " + this.bankValue);
    console.log("Cost = " + mtd.cost);
    if (this.bankValue >= mtd.cost) {
      var tower = new Tower(mtd.cost, mtd.cnvTurImg, mtd.cnvBulImg, mtd.ability);
      if (tower) {
        this.towers.push(tower); // add tower to the end of the array of towers
        return (true);
      }
      else {
        println('failed to make tower');
      }
    }
    else {
      this.displayOverDraftBanner = true;
    }

    return (false);
  }

  placeTower(cell) {
    //  place tower into play area at center of cell
    towerGame.towers[towerGame.towers.length - 1].loc = cell.center.copy();
    //    console.log(towerGame.towers[towerGame.towers.length-1].loc.toString());
    //  tower needs to know if it is placed
    towerGame.towers[towerGame.towers.length - 1].placed = true;
    cell.hasTower = true;
    //  only one tower placed at a time
    towerGame.placingTower = false;
    // placing a tower makes the cell containing the tower
    // unavailable to enemies the same as if it were
    // occupied (blocked)
    towerGame.brushfire(towerGame.undo(cell, towerGame.towers[towerGame.towers.length - 1]));   // all new distances and parents
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ load callbacks
  loadDOMCallBacks(menuTiles) {
    //  load tile menu callbacks
    for (var i = 0; i < menuTiles.length; i++) {
      var mtd = menuTiles[i];
      mtd.addEventListener('mouseover', this.tileRollOver, false);
      mtd.addEventListener('mouseout', this.tileRollOut, false);
      mtd.addEventListener('mousedown', this.tilePressed, false);
      mtd.addEventListener('click', this.tileClicked, false);
    }

  }

  //+++++++++++++++++++++++++   tile menu callbacks
  tileRollOver() {
    this.style.backgroundColor = '#f7e22a';
    towerGame.updateCostInfoElement(this.cost);
  }

  tileRollOut() {
    this.style.backgroundColor = '#DDD';
    towerGame.updateCostInfoElement("");
  }

  tilePressed() {
    this.style.backgroundColor = '#900';
  }

  tileClicked() {
    //if user clicks tile and not placing tile change placing to true
    // can add Tower checks cost and other conditions
    if (towerGame.placingTower === true) return;
    if (towerGame.createTower(this))
      towerGame.placingTower = true;
  }

  //  ++++++++++++++++++++++++++++++++++++++++++++++++++    mouse handlers

  handleCNVMouseOver() {
    if (towerGame.towers.length < 1) return;
    towerGame.towers[towerGame.towers.length - 1].visible = true;
  }

  handleCNVMouseMoved(event) {
    // add some properties to the canvas to track the mouse.
    this.mouseX = event.offsetX;
    this.mouseY = event.offsetY;
    if (towerGame.towers.length < 1) return;
    if (!towerGame.towers[towerGame.towers.length - 1].placed &&
      towerGame.placingTower === true) {
      //follow mouse
      towerGame.towers[towerGame.towers.length - 1].loc.x = this.mouseX;
      towerGame.towers[towerGame.towers.length - 1].loc.y = this.mouseY;

    }
  }

  handleCNVMouseClicked(event) {
    let row = Math.floor(event.offsetY / towerGame.w);
    let col = Math.floor(event.offsetX / towerGame.w);
    let cell = towerGame.grid[col][row];

    if (towerGame.placingTower && towerGame.canAddTower(cell)) {

      towerGame.placeTower(cell);
    }
    else if (!towerGame.placingTower && !cell.hasTower) {
      // toggle the occupied property of the clicked cell
      if (!cell.occupied && towerGame.bankValue >= towerGame.wallCost && towerGame.allowPlace && towerGame.gameStateID === 5) {
        towerGame.bankValue -= towerGame.wallCost;
        cell.occupied = true;
      }
      else if (towerGame.allowPlace && towerGame.gameStateID === 5 && cell.hasTower) {
        towerGame.bankValue += towerGame.wallCost;
        cell.occupied = false;
      }
      towerGame.brushfire(towerGame.undo(cell));   // all new distances and parents
    } else if (!towerGame.placingTower && cell.hasTower) {
      console.log("Clicked cell at column: " + col + ", row: " + row);

      if (col < 0 || col >= this.cols || row < 0 || row >= this.rows) {
        console.log("Clicked outside of grid bounds.");
        return; // Clicked outside the grid
      }

      console.log("Cell has tower: " + cell.hasTower); // Debugging

      if (cell.hasTower) {
        for (let i = 0; i < towerGame.towers.length; i++) {
          let tower = towerGame.towers[i];
          console.log("Tower " + i + " at: " + tower.loc.x + ", " + tower.loc.y); // Debugging
          if (Math.abs(tower.loc.x - cell.center.x) < 1 && Math.abs(tower.loc.y - cell.center.y) < 1) {
            // Instantiate Popup near the tower location
            const popupX = event.offsetX + 375; // Adjust based on your canvas or element positioning
            const popupY = event.offsetY + 45; // Adjust based on your canvas or element positioning
            // Set popupOpen to true as we are now opening a popup

            // Instantiate Popup near the tower location
            if (towerGame.shownBase === false) {
              const popup = new Popup(popupX, popupY, tower);
              towerGame.shownBase = true;
              // Refund and remove tower logic moved to button event listener


              document.getElementById('refundButton').addEventListener('click', () => {
                towerGame.setBankValue(Math.floor(popup.sellPrice)); // Refund the cost of the tower


                towerGame.towers.splice(i, 1); // Remove the tower from the array

                cell.hasTower = false; // Update the cell's state
                console.log("Tower removed and cost refunded.");
                towerGame.brushfire(); // Re-run the pathfinding algorithm
                popup.hide(); // Close the popup

              });
              // Upgrade tower logic (You'll need to define it)
              document.getElementById('upgradeButton').addEventListener('click', () => {
                console.log("Upgrade button clicked");
                popup.hide(); // Close the popup
              });

              document.getElementById('cancleButton').addEventListener('click', () => {
                towerGame.showBase = false;
                popup.hide(); // Close the popup
              });
              return;
            }
          }
        }
      }
    }
    //removeTower ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  }



  levelRender(key) { //premade level render
    //they are called levels, but are really just maps. 
    //you don't have to complete the previous one to go to the next one

    for (let row = 0; row < key.length; row++) {
      for (let col = 0; col < key[0].length; col++) {
        if (key[row][col] === 'b') { // creates a block at place indicated in level.js
          if (towerGame.placingTower && towerGame.canAddTower(towerGame.grid[col][row])) {
            towerGame.placeTower(towerGame.grid[col][row]);
          }
          else if (!towerGame.placingTower && !towerGame.grid[col][row].hasTower) {
            // toggle the occupied property of the clicked cell
            towerGame.grid[col][row].occupied = true;
            towerGame.brushfire(towerGame.undo(towerGame.grid[col][row]));
          }
        } else if (key[row][col] === 'e') { // sets the cell that the enemies go to
          this.root = this.grid[col][row];
        }
      }
      //}
    }
  }



  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //collision detection utilities
  distance(c0, c1) {
    this.x0 = c0.x;
    this.y0 = c0.y;
    this.x1 = c1.x;
    this.y1 = c1.y;

    var dx = this.x1 - this.x0;
    var dy = this.y1 - this.y0;

    return Math.sqrt(dx * dx + dy * dy);

  }

  distanceXY(x0, y0, x1, y1) {
    var dx = x1 - x0;
    var dy = y1 - y0;

    return Math.sqrt(dx * dx + dy * dy);
  }

  inRange(value, min, max) {
    return value >= Math.min(min, max) && Math.max(min, max) <= Math.max(min, max);
  }


  //loc1 = location vector of first circle
  //loc2 = location vector of second circle
  //rad1 = radius of first circle
  //rad2 = radius of second circle
  circleCollision(loc1, loc2, rad1, rad2) {
    if (this.distance(loc1, loc2) <= rad1 + rad2) {
      return true;
    }
  }

  //parameters:
  //x, y = locations of point
  //circx, circy = locations of circle
  //radius = radius of circle
  circlePointCollision(x, y, circx, circy, radius) {
    if (this.distanceXY(x, y, circx, circy) < radius) {
      return true;
    }
  }

  //parameters:
  //x, y = locations of point
  //loc = location vector of rectangle
  //rect width, height = width and height of rectangle
  rectanglePointCollision(x, y, loc, rectWidth, rectHeight) {
    if (this.inRange(x, loc.x, loc.x + rectWidth) && inRange(y, loc.y, loc.y + rectHeight)) {
      return true;
    }
  }


  range(min0, max0, min1, max1) {
    return Math.max(min0, max0) >= Math.min(min1, max1) && Math.min(min0, max0) <= Math.max(min1, max1);
  }


  //parameters:
  //loc1 = location vector of first rectangle
  //loc2 = location vector of second rectangle
  rectangleCollision(loc1, rectWidth1, rectHeight1, loc2, rectWidth2, rectHeight2) {
    if (this.range(loc1.x, loc1.x + rectWidth1, loc2.x, loc2.x + rectWidth2) &&
      this.range(loc1.y, loc1.y + rectHeight1, loc2.y, loc2.y + rectHeight2)) {
      return true;
    }


    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Other
  } // end Game class +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
}


