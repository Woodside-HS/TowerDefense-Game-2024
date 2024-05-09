"use strict";

class Panel {
  constructor(game, number, y = 550, w = 450, h = 290) {
    this.game = game;
    this.temp = 0;
    this.y = -590;
    this.endY = y;

    this.panel = document.createElement("div");
    this.panel.id = panelJSON[number].id;
    this.panel.style.width = w + "px";
    this.panel.style.height = h + "px";
    this.panel.style.backgroundImage = 'url("' + panelJSON[number].pic + '")';
    this.panel.style.position = "fixed";
    this.panel.style.align = "center";
    this.panel.style.top = 0 + "px";
    this.panel.style.left = 0 + "px";
    this.panel.style.right = 0 + "px";
    this.panel.style.textAlign = "center";

    this.wrapper = document.getElementById('wrapperDiv').appendChild(this.panel);
    for (let i = 0; i < panelJSON[number].buttonJSON.length; i++) {
      this.createButton(panelJSON[number], i);
    }
    this.updatePanelPosition();


    // Add event listener for window resize
    window.addEventListener('resize', () => {
      this.updatePanelPosition();
    });
  }

  render(slideCheck) {
    if (slideCheck === true) {
      this.y = this.slideDown(this.y, this.endY, .03);
    } else if (slideCheck === false) {
      this.y = this.endY;
    }
    this.panel.style.top = this.y + "px";
  }

  slideDown(start, end, incroment) {
    if ((incroment * (end - start)) > 1)
      return start + incroment * (end - start)
    return start;
  }



  createButton(JSON1, i) {
    var button = document.createElement("div");
    button.id = JSON1.buttonJSON[i].picId;
    button.style.width = 123 + "px";
    button.style.height = 30 + "px";
    button.style.position = "relative";
    button.style.top = 5 + 21 * i + "%";
    button.style.left = 50 + "px";
    button.image = document.createElement("img");
    button.image.id = JSON1.buttonJSON[i].picId;
    button.image.src = JSON1.buttonJSON[i].pic;
    button.image.addEventListener("click", JSON1.buttonJSON[i].funk, false);
    button.appendChild(button.image);
    this.panel.appendChild(button);
  }

  // Function to update panel position on resize
  updatePanelPosition() {
    let panelLeft = this.panel.offsetLeft; // Get the left position of the panel

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
var panelJSON = [{
  name: "Start Panel", // panel 0
  id: "firstPanel",
  pic: "TowerGameJS-Phase4/resources/images/panels/panel.png",
  picId: "pan",
  buttonJSON: [
    {
      name: "Start Button",
      id: "start",
      pic: "TowerGameJS-Phase4/resources/images/panels/homePanel/play.png",
      picId: "play",
      funk: function () {
        towerGame.gameState = new GameState2(towerGame)
        
        document.getElementById("firstPanel").parentNode.removeChild(document.getElementById("firstPanel"))
      }
    }, {
      name: "Instruction Button",
      id: "instruction",
      pic: "TowerGameJS-Phase4/resources/images/panels/homePanel/help.png",
      picId: "wframe",
      funk: function () {
        towerGame.gameState.panelInstructions = new Panel(towerGame, 1, 450, 800, 375)
        document.getElementById("firstPanel").parentNode.removeChild(document.getElementById("firstPanel"));
      }
    }, {
      name: "Catalog Button",
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
}, {
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
        towerGame.gameState.panelStart = new Panel(towerGame, 0, 400)
        document.getElementById("instructionPanel").parentNode.removeChild(document.getElementById("instructionPanel"))
      }
    }]
}, {
  name: "End Panel", // panel 2
  id: "endPanel",
  pic: "TowerGameJS-Phase4/resources/images/panels/panel.png",
  picId: "pan",
  buttonJSON: [
    {
      name: "Replay Button",
      id: "replayButton",
      pic: "TowerGameJS-Phase4/resources/images/panels/endPanel/restart.png",
      picId: "wframe",
      funk: function () {
        towerGame.gameState = new GameState2(towerGame);
        towerGame.numWave = 0;
        towerGame.firstClick = true;
        towerGame.wave.referenceTime = 20;
        document.getElementById('fastForward').innerHTML = "Start";
        FRAME_RATE = 30;
        document.getElementById("endPanel").parentNode.removeChild(document.getElementById("endPanel"))
      }
    }, {
      name: "Home Button",
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
        document.getElementById('fastForward').innerHTML = "Start"; // Reset the button text to "Start"
        FRAME_RATE = 30;
      }
    }, {
      name: "Credits Button",
      id: "creditsButton",
      pic: "TowerGameJS-Phase4/resources/images/panels/endPanel/credits.png",
      picId: "wframe",
      funk: function () {
        window.location.href = "credits.html";
        document.getElementById("endPanel").parentNode.removeChild(document.getElementById("endPanel"))
      }
    }]
}, {
  name: "Level Selector", // panel 3
  id: "levelSelector",
  pic: "",
  picId: "pan",
  buttonJSON: [
    {
      name: "Level 1 Button",
      id: "level1Button",
      pic: "TowerGameJS-Phase4/resources/images/panels/levelSelPanel/level1Butt.png",
      picId: "frame1",
      funk: function () {
        towerGame.gameState = new GameState5(towerGame, 1)
        document.getElementById("levelSelector").parentNode.removeChild(document.getElementById("levelSelector"))
      }
    }, {
      name: "Level 2 Button",
      id: "level2Button",
      pic: "TowerGameJS-Phase4/resources/images/panels/levelSelPanel/level2Butt.png",
      picId: "frame2",
      funk: function () {
        towerGame.gameState = new GameState5(towerGame, 2)
        document.getElementById("levelSelector").parentNode.removeChild(document.getElementById("levelSelector"))

      }
    }, {
      name: "Level 3 Button",
      id: "level3Button",
      pic: "TowerGameJS-Phase4/resources/images/panels/levelSelPanel/level3Butt.png",
      picId: "frame3",
      funk: function () {
        towerGame.gameState = new GameState5(towerGame, 3)
        document.getElementById("levelSelector").parentNode.removeChild(document.getElementById("levelSelector"))
      }
    }, {
      name: "Custom Level Button",
      id: "customLvlButton",
      pic: "TowerGameJS-Phase4/resources/images/panels/levelSelPanel/custom.png",
      picId: "frame4",
      funk: function () {
        towerGame.gameState.customPanel = new Panel(towerGame, 18, 350)
        document.getElementById("levelSelector").parentNode.removeChild(document.getElementById("levelSelector"))

      }
    }, {
      name: "Home Button",
      id: "quitButton",
      pic: "TowerGameJS-Phase4/resources/images/panels/home.png",
      picId: "home",
      funk: function () {
        document.getElementById("levelSelector").parentNode.removeChild(document.getElementById("levelSelector"))
     
        towerGame.gameState = new GameState1(towerGame)
        document.getElementById("levelSelector").parentNode.removeChild(document.getElementById("levelSelector"))
        towerGame.numWave = 0;
        towerGame.firstClick = true;
        towerGame.wave.spawnOver = false;
        towerGame.wave.referenceTime = 20;
        document.getElementById('fastForward').innerHTML = "Start"; // Reset the button text to "Start"
        FRAME_RATE = 30;
      }
    }
  ]
}, {
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

}, { //panel 5
  name: "Tower Info Panel",
  id: "towerInfoPanel",
  pic: "",
  picId: "towerPan",
  buttonJSON: [
    {
      name: "Archer Button",
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
      name: "Knight Button",
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
      name: "Wizard Button",
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
      name: "Cannoneer Button",
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
      name: "Marksman Button",
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
}, { //panel 6
  name: "Tower Info Panel 2",
  id: "towerInfoPanel2",
  pic: "",
  picId: "towerPan2",
  buttonJSON: [
    {
      name: "Assassin Button",
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
      name: "Bladestorm Button",
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
      name: "Vampire Button",
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
      name: "Rock Thrower Button",
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
      name: "Buff Tower Button",
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
  name: "Catalog Home",
  id: "cataHome",
  pic: "",
  picId: "homeCata",
  buttonJSON: [
    {
      name: "Home Button",
      id: "home",
      pic: "TowerGameJS-Phase4/resources/images/panels/home.png",
      picId: "home",
      funk: function () {
        document.getElementById("cataHome").parentNode.removeChild(document.getElementById("cataHome"))
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
        document.getElementById("towerInfoPanel2").parentNode.removeChild(document.getElementById("towerInfoPanel2"))
        towerGame.gameState = new GameState1(towerGame)
        towerGame.numWave = 0;
        towerGame.firstClick = true;
        towerGame.wave.spawnOver = false;

        towerGame.wave.referenceTime = 20;
        document.getElementById('fastForward').innerHTML = "Start";
        FRAME_RATE = 30;
        document.getElementById("cataHome").parentNode.removeChild(document.getElementById("cataHome"))
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
        document.getElementById("towerInfoPanel2").parentNode.removeChild(document.getElementById("towerInfoPanel2"))
      }
    }
  ]
},



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
  pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/archerCatalog.png",
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
  name: "Sniper Catalog",
  id: "sniperCata",
  pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/archerCatalog.png",
  picId: "sniperCata",
  buttonJSON: [{
    name: "Back Button",
    id: "back",
    pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
    picId: "back",
    funk: function () {
      towerGame.gameState.towerPanel1 = new Panel(towerGame, 5, 180, 800, 290)
      towerGame.gameState.towerPanel2 = new Panel(towerGame, 6, 180, 100, 290)
      towerGame.gameState.towerPanel3 = new Panel(towerGame, 7, 650, 450, 86)
      document.getElementById("sniperCata").parentNode.removeChild(document.getElementById("sniperCata"))
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
  pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/bladestormCatalog.png",
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
  pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/bladestormCatalog.png",
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
  pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/bladestormCatalog.png",
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
  pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/bladestormCatalog.png",
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
}, { //panel 18
  name: "Custom Map Choice",
  id: "customChoice",
  pic: "",
  picId: "choicePic",
  buttonJSON: [{
    name: "Cabin Button",
    id: "cabinButt",
    pic: "TowerGameJS-Phase4/resources/images/panels/customChoicePanel/shipCabinButt.png",
    picId: "cabinPic",
    funk: function () {
      towerGame.gameState = new GameState5(towerGame, 4, "url('TowerGameJS-Phase4/resources/images/bg/levels/level1.png")
      document.getElementById("customChoice").parentNode.removeChild(document.getElementById("customChoice"))
    }
  }, {
    name: "Deck Button",
    id: "deckButt",
    pic: "TowerGameJS-Phase4/resources/images/panels/customChoicePanel/shipDeckButt.png",
    picId: "deckPick",
    funk: function () {
      towerGame.gameState = new GameState5(towerGame, 4, "url('TowerGameJS-Phase4/resources/images/bg/levels/level2.jpg')")
      document.getElementById("customChoice").parentNode.removeChild(document.getElementById("customChoice"))
    }
}, {
  name: "Dock Button",
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