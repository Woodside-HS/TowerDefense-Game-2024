"use strict";

class Panel {
  constructor(game, number, y = 550, w = 450, h = 290) {
    this.game = game; // Reference to the game object
    this.temp = 0; // Temporary variable, purpose unclear
    this.y = -590; // Initial y-position of the panel, off-screen
    this.endY = y; // Target y-position for the panel

    // Create a new div element for the panel
    this.panel = document.createElement("div");
    this.panel.id = panelJSON[number].id; // Set the id from the panelJSON data
    this.panel.style.width = w + "px"; // Set the width of the panel
    this.panel.style.height = h + "px"; // Set the height of the panel
    this.panel.style.backgroundImage = 'url("' + panelJSON[number].pic + '")'; // Set background image
    this.panel.style.position = "fixed"; // Fix position to make it stay in place during scroll
    this.panel.style.align = "center"; // Align the panel to center (not a valid CSS property for aligning)
    this.panel.style.top = 0 + "px"; // Initial top position
    this.panel.style.left = 0 + "px"; // Initial left position
    this.panel.style.right = 0 + "px"; // Initial right position
    this.panel.style.textAlign = "center"; // Text alignment

    // Append the panel to the wrapper div in the HTML
    this.wrapper = document.getElementById('wrapperDiv').appendChild(this.panel);
    // Create buttons for the panel based on the buttonJSON data
    for (let i = 0; i < panelJSON[number].buttonJSON.length; i++) {
      this.createButton(panelJSON[number], i);
    }
    this.updatePanelPosition(); // Update the panel position

    // Add event listener for window resize to update panel position
    window.addEventListener('resize', () => {
      this.updatePanelPosition();
    });
  }

  render(slideCheck) {
    // Slide the panel up or down based on slideCheck
    if (slideCheck === true) {
      this.y = this.slideDown(this.y, this.endY, .03);
    } else if (slideCheck === false) {
      this.y = this.endY;
    }
    this.panel.style.top = this.y + "px"; // Update the top style with new y position
  }

  slideDown(start, end, increment) {
    // Calculate the next position in a slide down animation
    if ((increment * (end - start)) > 1)
      return start + increment * (end - start)
    return start;
  }

  createButton(JSON1, i) {
    // Create a new button with properties from JSON
    var button = document.createElement("div");
    button.id = JSON1.buttonJSON[i].picId; // Set button id
    button.style.width = 123 + "px"; // Set button width
    button.style.height = 30 + "px"; // Set button height
    button.style.position = "relative"; // Set position relative to its normal position
    button.style.top = 5 + 21 * i + "%"; // Set top position based on index
    button.style.left = 50 + "px"; // Set left position
    button.image = document.createElement("img"); // Create an img element for the button
    button.image.id = JSON1.buttonJSON[i].picId; // Set image id
    button.image.src = JSON1.buttonJSON[i].pic; // Set image source
    button.image.addEventListener("click", JSON1.buttonJSON[i].funk, false); // Add click event listener
    button.appendChild(button.image); // Append image to button
    this.panel.appendChild(button); // Append button to panel
  }

  // Function to update panel position on resize
  updatePanelPosition() {
    let panelLeft = this.panel.offsetLeft; // Get the left position of the panel

    // Adjust panel position based on its current position and window width
    if (panelLeft > 260) {
      this.panel.style.left = (window.innerWidth / 2 - 40) - (this.panel.offsetWidth / 2) + 'px';
    } else {
      let centeredPosition = (window.innerWidth / 2 - 40) - (this.panel.offsetWidth / 2);
      if (centeredPosition > panelLeft) {
        this.panel.style.left = centeredPosition + 'px';
      }
    }
  }
}
var panelJSON = [{ // first panel that shows up when you open game
  name: "Start Panel", // panel 0
  id: "firstPanel",
  pic: "TowerGameJS-Phase4/resources/images/panels/panel.png",
  picId: "pan",
  buttonJSON: [
    {
      name: "Start Button", // goes to level screen
      id: "start",
      pic: "TowerGameJS-Phase4/resources/images/panels/homePanel/play.png",
      picId: "play",
      funk: function () {
        towerGame.gameState = new GameState2(towerGame)

        document.getElementById("firstPanel").parentNode.removeChild(document.getElementById("firstPanel"))
      }
    }, {
      name: "Instruction Button", // goes to instruction panel
      id: "instruction",
      pic: "TowerGameJS-Phase4/resources/images/panels/homePanel/help.png",
      picId: "wframe",
      funk: function () {
        towerGame.gameState.panelInstructions = new Panel(towerGame, 1, 185, 800, 680)
        document.getElementById("firstPanel").parentNode.removeChild(document.getElementById("firstPanel"));
      }
    }, {
      name: "Catalog Button", // goes to catalog gamestate (gamestate4)
      id: "catalogButton",
      pic: "TowerGameJS-Phase4/resources/images/panels/homePanel/catalog.png",
      picId: "catalog",
      funk: function () {
        towerGame.gameState = new GameState4(towerGame, 4)
        towerGame.gameState.towerPanel1 = new Panel(towerGame, 5, 180, 800, 290)
        towerGame.gameState.towerPanel2 = new Panel(towerGame, 6, 180, 100, 290)
        towerGame.gameState.towerPanel3 = new Panel(towerGame, 7, 650, 450, 86)
        document.getElementById("firstPanel").parentNode.removeChild(document.getElementById("firstPanel"))
      }

    }]
}, { //shows the instructions
  name: "Instruction Panel", // panel 1
  id: "instructionPanel",
  pic: "TowerGameJS-Phase4/resources/images/panels/homePanel/instructions.png",
  picId: "pan",
  buttonJSON: [
    {
      name: "Back Button",
      id: "back",
      pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
      picId: "back",
      funk: function () {
        towerGame.gameState.panelStart = new Panel(towerGame, 0)
        document.getElementById("instructionPanel").parentNode.removeChild(document.getElementById("instructionPanel"))
      }
    }]
}, { // Panel when u die or win
  name: "End Panel", // panel 2
  id: "endPanel",
  pic: "TowerGameJS-Phase4/resources/images/panels/panel.png",
  picId: "pan",
  buttonJSON: [
    {
      name: "Replay Button", //same code as play
      id: "replayButton",
      pic: "TowerGameJS-Phase4/resources/images/panels/endPanel/restart.png",
      picId: "wframe",
      funk: function () {
        towerGame.gameState = new GameState2(towerGame);
        towerGame.numWave = 0;
        towerGame.firstClick = true;
        towerGame.wave.referenceTime = 20;
        document.getElementById('fastForward').classList.remove('fast');
        document.getElementById('fastForward').classList.remove('slow');

        FRAME_RATE = 30;
        document.getElementById("endPanel").parentNode.removeChild(document.getElementById("endPanel"))
      }
    }, {
      name: "Home Button", // goes back to GameState1/ home screen
      id: "quitButton",
      pic: "TowerGameJS-Phase4/resources/images/panels/home.png",
      picId: "home",
      funk: function () {
        document.getElementById("endPanel").parentNode.removeChild(document.getElementById("endPanel"))
        towerGame.gameState.panelQuit = new Panel(towerGame, 2)
        towerGame.gameState = new GameState1(towerGame)
        document.getElementById("endPanel").parentNode.removeChild(document.getElementById("endPanel"))
        towerGame.numWave = 0;
        towerGame.firstClick = true;
        towerGame.wave.spawnOver = false;
        towerGame.wave.referenceTime = 20;
        document.getElementById('fastForward').classList.remove('fast');
        document.getElementById('fastForward').classList.remove('slow');
        FRAME_RATE = 30;
      }
    }, {
      name: "Credits Button", // opens credits.html and rolls the credits
      id: "creditsButton",
      pic: "TowerGameJS-Phase4/resources/images/panels/endPanel/credits.png",
      picId: "wframe",
      funk: function () {
        window.location.href = "credits.html";
        document.getElementById("endPanel").parentNode.removeChild(document.getElementById("endPanel"))
      }
    }]
}, { // choose which level you go to
  name: "Level Selector", // panel 3
  id: "levelSelector",
  pic: "",
  picId: "pan",
  buttonJSON: [
    {
      name: "Level 1 Button", // go to level 1
      id: "level1Button",
      pic: "TowerGameJS-Phase4/resources/images/panels/levelSelPanel/level1Butt.png",
      picId: "frame1",
      funk: function () {
        towerGame.gameState = new GameState5(towerGame, 1)
        document.getElementById("levelSelector").parentNode.removeChild(document.getElementById("levelSelector"))
      }
    }, {
      name: "Level 2 Button",// go to level 2
      id: "level2Button",
      pic: "TowerGameJS-Phase4/resources/images/panels/levelSelPanel/level2Butt.png",
      picId: "frame2",
      funk: function () {
        towerGame.gameState = new GameState5(towerGame, 2)
        document.getElementById("levelSelector").parentNode.removeChild(document.getElementById("levelSelector"))

      }
    }, {
      name: "Level 3 Button",// go to level 3
      id: "level3Button",
      pic: "TowerGameJS-Phase4/resources/images/panels/levelSelPanel/level3Butt.png",
      picId: "frame3",
      funk: function () {
        towerGame.gameState = new GameState5(towerGame, 3)
        document.getElementById("levelSelector").parentNode.removeChild(document.getElementById("levelSelector"))
      }
    }, {
      name: "Custom Level Button", // go to custom panel choice
      id: "customLvlButton",
      pic: "TowerGameJS-Phase4/resources/images/panels/levelSelPanel/custom.png",
      picId: "frame4",
      funk: function () {
        towerGame.gameStateID = 5;
        towerGame.gameState.customPanel = new Panel(towerGame, 18, 350)
        towerGame.gameStateID = 5;
        document.getElementById("levelSelector").parentNode.removeChild(document.getElementById("levelSelector"))

      }
    }, {
      name: "Home Button", // go back to homescreen
      id: "quitButton",
      pic: "TowerGameJS-Phase4/resources/images/panels/home.png",
      picId: "home",
      funk: function () {
        document.getElementById("levelSelector").parentNode.removeChild(document.getElementById("levelSelector"))
        towerGame.gameState = new GameState1(towerGame)
        document.getElementById("levelSelector").parentNode.removeChild(document.getElementById("levelSelector"))
      }
    }
  ]
}, { // completely useless but if deleted have to change all new Panel(towerGame, x-1), x being the original number there, after this panel
  name: "Credites Panel", //panel 4
  id: "creditesPanel",
  pic: "TowerGameJS-Phase4/resources/images/panels/pan.png",
  picId: "pan",
  buttonJSON: [
    {
      name: "Back Button",
      id: "back",
      pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
      picId: "back",
      funk: function () {
        towerGame.gameState.panelQuit = new Panel(towerGame, 2)
        document.getElementById("creditesPanel").parentNode.removeChild(document.getElementById("creditesPanel"))
      }
    },]

}, { // the left side of the catalog buttons on catalog gamestate
  name: "Tower Info Panel",//panel 5
  id: "towerInfoPanel",
  pic: "",
  picId: "towerPan",
  buttonJSON: [
    {
      name: "Archer Button", // when clicked goes to archer panel
      id: "archButt",
      pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanButt/archButt.png",
      picId: "arch",
      funk: function () {
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 8, 150, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
        document.getElementById("towerInfoPanel2").parentNode.removeChild(document.getElementById("towerInfoPanel2"))
        document.getElementById("cataHome").parentNode.removeChild(document.getElementById("cataHome"))
      }
    }, {
      name: "Knight Button",// when clicked goes to knight panel
      id: "knightButt",
      pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanButt/knightButt.png",
      picId: "knight",
      funk: function () {
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 9, 150, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
        document.getElementById("towerInfoPanel2").parentNode.removeChild(document.getElementById("towerInfoPanel2"))
        document.getElementById("cataHome").parentNode.removeChild(document.getElementById("cataHome"))
      }
    }, {
      name: "Wizard Button",// when clicked goes to wizard panel
      id: "wizButt",
      pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanButt/wizardButt.png",
      picId: "wizard",
      funk: function () {
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 10, 150, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
        document.getElementById("towerInfoPanel2").parentNode.removeChild(document.getElementById("towerInfoPanel2"))
        document.getElementById("cataHome").parentNode.removeChild(document.getElementById("cataHome"))
      }
    }, {
      name: "Cannoneer Button",// when clicked goes to cannonneer panel
      id: "cannonButt",
      pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanButt/cannonButt.png",
      picId: "cannoneer",
      funk: function () {
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 11, 150, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
        document.getElementById("towerInfoPanel2").parentNode.removeChild(document.getElementById("towerInfoPanel2"))
        document.getElementById("cataHome").parentNode.removeChild(document.getElementById("cataHome"))
      }
    }, {
      name: "Marksman Button",// when clicked goes to marksman panel
      id: "markButt",
      pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanButt/marksmanButt.png",
      picId: "marksman",
      funk: function () {
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 12, 150, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
        document.getElementById("towerInfoPanel2").parentNode.removeChild(document.getElementById("towerInfoPanel2"))
        document.getElementById("cataHome").parentNode.removeChild(document.getElementById("cataHome"))
      }
    }
  ]
}, { // the right side of catalog in catalog gamestate
  name: "Tower Info Panel 2", //panel 6
  id: "towerInfoPanel2",
  pic: "",
  picId: "towerPan2",
  buttonJSON: [
    {
      name: "Assassin Button", // when clickd goes to assassin panel
      id: "assassinButt",
      pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanButt/assassinButt.png",
      picId: "assasThrower",
      funk: function () {
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 13, 150, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
        document.getElementById("towerInfoPanel2").parentNode.removeChild(document.getElementById("towerInfoPanel2"))
        document.getElementById("cataHome").parentNode.removeChild(document.getElementById("cataHome"))
      }
    }, {
      name: "Bladestorm Button",// when clickd goes to bladestorm panel
      id: "bladeButt",
      pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanButt/bladestormButt.png",
      picId: "bladeTower",
      funk: function () {
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 14, 150, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
        document.getElementById("towerInfoPanel2").parentNode.removeChild(document.getElementById("towerInfoPanel2"))
        document.getElementById("cataHome").parentNode.removeChild(document.getElementById("cataHome"))
      }
    }, {
      name: "Vampire Button",// when clickd goes to vampire panel
      id: "vampButt",
      pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanButt/vampireButt.png",
      picId: "vampire",
      funk: function () {
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 15, 150, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
        document.getElementById("towerInfoPanel2").parentNode.removeChild(document.getElementById("towerInfoPanel2"))
        document.getElementById("cataHome").parentNode.removeChild(document.getElementById("cataHome"))
      }
    }, {
      name: "Rock Thrower Button",// when clickd goes to rock thrower panel
      id: "rockButt",
      pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanButt/stonefangButt.png",
      picId: "rockThrower",
      funk: function () {
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 16, 150, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
        document.getElementById("towerInfoPanel2").parentNode.removeChild(document.getElementById("towerInfoPanel2"))
        document.getElementById("cataHome").parentNode.removeChild(document.getElementById("cataHome"))
      }
    }, {
      name: "Buff Tower Button", // when clickd goes to buff tower/merman panel
      id: "buffButt",
      pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanButt/mermanButt.png",
      picId: "buffTower",
      funk: function () {
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 17, 150, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
        document.getElementById("towerInfoPanel2").parentNode.removeChild(document.getElementById("towerInfoPanel2"))
        document.getElementById("cataHome").parentNode.removeChild(document.getElementById("cataHome"))
      }
    }
  ]
}, { // panel 7
  name: "Catalog Home", // the home button on the catalog panel
  id: "cataHome",
  pic: "",
  picId: "homeCata",
  buttonJSON: [
    {
      name: "Home Button", // when clicked goes back to home screen
      id: "home",
      pic: "TowerGameJS-Phase4/resources/images/panels/home.png",
      picId: "home",
      funk: function () {

        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
        document.getElementById("towerInfoPanel2").parentNode.removeChild(document.getElementById("towerInfoPanel2"))
        document.getElementById("cataHome").parentNode.removeChild(document.getElementById("cataHome"))
        towerGame.gameState = new GameState1(towerGame)
        towerGame.numWave = 0;
        towerGame.firstClick = true;
        document.getElementById('fastForward').classList.remove('fast');
        document.getElementById('fastForward').classList.remove('slow');
        FRAME_RATE = 30;

        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
        document.getElementById("towerInfoPanel2").parentNode.removeChild(document.getElementById("towerInfoPanel2"))
        document.getElementById("cataHome").parentNode.removeChild(document.getElementById("cataHome"))
      }
    }
  ]
},

// The next set of panels (until 17) are all the catalog panels with the lore/description of the towers in the game.

{ //panel 8
  name: "Archer Catalog Panel",
  id: "archerCataPanel",
  pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/archerCatalog.png",
  picId: "archCata",
  buttonJSON: [{
    name: "Back Button",
    id: "back",
    pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
    picId: "back",
    funk: function () {
      towerGame.gameState.towerPanel1 = new Panel(towerGame, 5, 180, 800, 290)
      towerGame.gameState.towerPanel2 = new Panel(towerGame, 6, 180, 100, 290)
      towerGame.gameState.towerPanel3 = new Panel(towerGame, 7, 650, 450, 86)
      document.getElementById("archerCataPanel").parentNode.removeChild(document.getElementById("archerCataPanel"))
    }
  }
  ]
}, { //panel 9
  name: "Knight Catalog",
  id: "knightCata",
  pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/knightCatalog.png",
  picId: "knightCata",
  buttonJSON: [{
    name: "Back Button",
    id: "back",
    pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
    picId: "back",
    funk: function () {
      towerGame.gameState.towerPanel1 = new Panel(towerGame, 5, 180, 800, 290)
      towerGame.gameState.towerPanel2 = new Panel(towerGame, 6, 180, 100, 290)
      towerGame.gameState.towerPanel3 = new Panel(towerGame, 7, 650, 450, 86)
      document.getElementById("knightCata").parentNode.removeChild(document.getElementById("knightCata"))
    }
  }
  ]
}, { //panel 10
  name: "Wizard Catalog",
  id: "wizardCata",
  pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/wizardCatalog.png",
  picId: "wizardCata",
  buttonJSON: [{
    name: "Back Button",
    id: "back",
    pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
    picId: "back",
    funk: function () {
      towerGame.gameState.towerPanel1 = new Panel(towerGame, 5, 180, 800, 290)
      towerGame.gameState.towerPanel2 = new Panel(towerGame, 6, 180, 100, 290)
      towerGame.gameState.towerPanel3 = new Panel(towerGame, 7, 650, 450, 86)
      document.getElementById("wizardCata").parentNode.removeChild(document.getElementById("wizardCata"))
    }
  }
  ]
}, { //panel 11
  name: "Cannoneer Catalog",
  id: "cannoneerCata",
  pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/cannoneerCatalog.png",
  picId: "cannonCata",
  buttonJSON: [{
    name: "Back Button",
    id: "back",
    pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
    picId: "back",
    funk: function () {
      towerGame.gameState.towerPanel1 = new Panel(towerGame, 5, 180, 800, 290)
      towerGame.gameState.towerPanel2 = new Panel(towerGame, 6, 180, 100, 290)
      towerGame.gameState.towerPanel3 = new Panel(towerGame, 7, 650, 450, 86)
      document.getElementById("cannoneerCata").parentNode.removeChild(document.getElementById("cannoneerCata"))
    }
  }
  ]
}, { //panel 12
  name: "Marksman Catalog",
  id: "markCata",
  pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/marksmanCatalog.png",
  picId: "marksCata",
  buttonJSON: [{
    name: "Back Button",
    id: "back",
    pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
    picId: "back",
    funk: function () {
      towerGame.gameState.towerPanel1 = new Panel(towerGame, 5, 180, 800, 290)
      towerGame.gameState.towerPanel2 = new Panel(towerGame, 6, 180, 100, 290)
      towerGame.gameState.towerPanel3 = new Panel(towerGame, 7, 650, 450, 86)
      document.getElementById("markCata").parentNode.removeChild(document.getElementById("markCata"))
    }
  }
  ]
}, { //panel 13
  name: "Assassin Catalog",
  id: "assassinCata",
  pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/assassinCatalog.png",
  picId: "assasCata",
  buttonJSON: [{
    name: "Back Button",
    id: "back",
    pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
    picId: "back",
    funk: function () {
      towerGame.gameState.towerPanel1 = new Panel(towerGame, 5, 180, 800, 290)
      towerGame.gameState.towerPanel2 = new Panel(towerGame, 6, 180, 100, 290)
      towerGame.gameState.towerPanel3 = new Panel(towerGame, 7, 650, 450, 86)
      document.getElementById("assassinCata").parentNode.removeChild(document.getElementById("assassinCata"))
    }
  }
  ]
}, { //panel 14
  name: "Bladestorm Catalog",
  id: "bladestormCata",
  pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/bladeStormCatalog.png",
  picId: "bladeCata",
  buttonJSON: [{
    name: "Back Button",
    id: "back",
    pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
    picId: "back",
    funk: function () {
      towerGame.gameState.towerPanel1 = new Panel(towerGame, 5, 180, 800, 290)
      towerGame.gameState.towerPanel2 = new Panel(towerGame, 6, 180, 100, 290)
      towerGame.gameState.towerPanel3 = new Panel(towerGame, 7, 650, 450, 86)
      document.getElementById("bladestormCata").parentNode.removeChild(document.getElementById("bladestormCata"))
    }
  }
  ]
}, { //panel 15
  name: "Vampire Catalog",
  id: "vampireCata",
  pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/vampireCatalog.png",
  picId: "vampCata",
  buttonJSON: [{
    name: "Back Button",
    id: "back",
    pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
    picId: "back",
    funk: function () {
      towerGame.gameState.towerPanel1 = new Panel(towerGame, 5, 180, 800, 290)
      towerGame.gameState.towerPanel2 = new Panel(towerGame, 6, 180, 100, 290)
      towerGame.gameState.towerPanel3 = new Panel(towerGame, 7, 650, 450, 86)
      document.getElementById("vampireCata").parentNode.removeChild(document.getElementById("vampireCata"))
    }
  }
  ]
}, { //panel 16
  name: "Rock Thrower Catalog",
  id: "rockThrowerCata",
  pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/stonefangCatalog.png",
  picId: "rockCata",
  buttonJSON: [{
    name: "Back Button",
    id: "back",
    pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
    picId: "back",
    funk: function () {
      towerGame.gameState.towerPanel1 = new Panel(towerGame, 5, 180, 800, 290)
      towerGame.gameState.towerPanel2 = new Panel(towerGame, 6, 180, 100, 290)
      towerGame.gameState.towerPanel3 = new Panel(towerGame, 7, 650, 450, 86)
      document.getElementById("rockThrowerCata").parentNode.removeChild(document.getElementById("rockThrowerCata"))
    }
  }
  ]
}, { //panel 17
  name: "Buff Catalog",
  id: "buffTowerCata",
  pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/mermanCatalog.png",
  picId: "buffCata",
  buttonJSON: [{
    name: "Back Button",
    id: "back",
    pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
    picId: "back",
    funk: function () {
      towerGame.gameState.towerPanel1 = new Panel(towerGame, 5, 180, 800, 290)
      towerGame.gameState.towerPanel2 = new Panel(towerGame, 6, 180, 100, 290)
      towerGame.gameState.towerPanel3 = new Panel(towerGame, 7, 650, 450, 86)
      document.getElementById("buffTowerCata").parentNode.removeChild(document.getElementById("buffTowerCata"))
    }
  }
  ]
},

{ //panel 18
  name: "Custom Map Choice",
  id: "customChoice",
  pic: "",
  picId: "choicePic",
  buttonJSON: [{
    name: "Cabin Button", // when clicked, goes to the cabin map in custom mode
    id: "cabinButt",
    pic: "TowerGameJS-Phase4/resources/images/panels/customChoicePanel/shipCabinButt.png",
    picId: "cabinPic",
    funk: function () {
      towerGame.gameState = new GameState5(towerGame, 4, "url('TowerGameJS-Phase4/resources/images/bg/levels/level1.png")
      document.getElementById("customChoice").parentNode.removeChild(document.getElementById("customChoice"))
    }
  }, {
    name: "Deck Button",// when clicked, goes to the deck map in custom mode
    id: "deckButt",
    pic: "TowerGameJS-Phase4/resources/images/panels/customChoicePanel/shipDeckButt.png",
    picId: "deckPick",
    funk: function () {
      towerGame.gameState = new GameState5(towerGame, 4, "url('TowerGameJS-Phase4/resources/images/bg/levels/level2.jpg')")
      document.getElementById("customChoice").parentNode.removeChild(document.getElementById("customChoice"))
    }
  }, {
    name: "Dock Button",// when clicked, goes to the dock map in custom mode
    id: "Dock Butt",
    pic: "TowerGameJS-Phase4/resources/images/panels/customChoicePanel/villageDockButt.png",
    picId: "dockPick",
    funk: function () {
      towerGame.gameState = new GameState5(towerGame, 4, "url('TowerGameJS-Phase4/resources/images/bg/levels/level3.jpg')")
      document.getElementById("customChoice").parentNode.removeChild(document.getElementById("customChoice"))
    }
  }
  ]
}
]