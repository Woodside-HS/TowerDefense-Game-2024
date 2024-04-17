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
    this.panel.style.top = this.y + "px"
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
        towerGame.gameState.panelInstructions = new Panel(towerGame, 1)
        document.getElementById("firstPanel").parentNode.removeChild(document.getElementById("firstPanel"));
      }
    }, {
      name: "Catalog Button",
      id: "catalogButton",
      pic: "TowerGameJS-Phase4/resources/images/panels/homePanel/catalog.png",
      picId: "catalog",
      funk: function () {
        towerGame.gameState = new GameState4(towerGame, 4)
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
        towerGame.gameState.panelStart = new Panel(towerGame, 0)
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
        towerGame.currentWaveNum = 0; // Reset the current wave number to 0
        towerGame.wave = new Wave(towerGame, AllWaves[towerGame.currentWaveNum]); // Create a new Wave instance with the first wave
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
      }
    }, {
      name: "Credits Button",
      id: "creditsButton",
      pic: "TowerGameJS-Phase4/resources/images/panels/endPanel/credits.png",
      picId: "wframe",
      funk: function () {
        towerGame.gameState.panelCredits = new Panel(towerGame, 4)
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
        towerGame.gameState = new GameState5(towerGame, 4)
        document.getElementById("levelSelector").parentNode.removeChild(document.getElementById("levelSelector"))

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

}, {
  name: "Catalog Home Panel", //panel 5
  id: "catalogHomePanel",
  pic: "",
  picId: "pan",
  buttonJSON: [
    {
      name: "Tower Button",
      id: "towerButton",
      pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/tower.png",
      picId: "tower",
      funk: function () {
        towerGame.gameState.towerPanel = new Panel(towerGame, 6, 180, 450, 290)
        towerGame.gameState.towerPanel = new Panel(towerGame, 6, 180, 450, 290)
        towerGame.gameState.towerPanel = new Panel(towerGame, 6, 180, 450, 290)
        document.getElementById("catalogHomePanel").parentNode.removeChild(document.getElementById("catalogHomePanel"))
      }
    }, {
      name: "Quit Button",
      id: "quitButton",
      pic: "TowerGameJS-Phase4/resources/images/panels/home.png",
      picId: "quit",
      funk: function () {
        document.getElementById("catalogHomePanel").parentNode.removeChild(document.getElementById("catalogHomePanel"))
        towerGame.gameState = new GameState1(towerGame)
        towerGame.currentWaveNum = 0; // Reset the current wave number to 0
        towerGame.wave = new Wave(towerGame, AllWaves[towerGame.currentWaveNum]); // Create a new Wave instance with the first wave
        towerGame.wave.referenceTime = 20;
        document.getElementById('fastForward').innerHTML = "Start";
        FRAME_RATE = 30;
        document.getElementById("catalogHomePanel").parentNode.removeChild(document.getElementById("catalogHomePanel"))
      }
    }
  ]
}, { //panel 6
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
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 7, 180, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
      }
    }, {
      name: "Knight Button",
      id: "knightButt",
      pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanButt/knightButt.png",
      picId: "knight",
      funk: function () {
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 8, 180, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
      }
    }, {
      name: "Wizard Button",
      id: "wizButt",
      pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanButt/cannonButt.png",
      picId: "wizard",
      funk: function () {
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 9, 180, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
      }
    }, {
      name: "Cannoneer Button",
      id: "cannonButt",
      pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanButt/cannonButt.png",
      picId: "cannoneer",
      funk: function () {
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 10, 180, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
      }
    }, {
      name: "Sniper Button",
      id: "snipButt",
      pic: "TowerGameJS-Phase4/resources/images/panels/home.png",
      picId: "sniper",
      funk: function () {
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 11, 180, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
      }
    }
  ]
}, { //panel 7
  name: "Tower Info Panel 2",
  id: "towerInfoPanel2",
  pic: "",
  picId: "towerPan2",
  buttonJSON: [
    {
      name: "Assassin Button",
      id: "assassinButt",
      pic: "TowerGameJS-Phase4/resources/images/panels/home.png",
      picId: "assasThrower",
      funk: function () {
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 12, 180, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
      }
    }, {
      name: "Bladestorm Button",
      id: "bladeButt",
      pic: "TowerGameJS-Phase4/resources/images/panels/home.png",
      picId: "bladeTower",
      funk: function () {
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 13, 180, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
      }
    }, {
      name: "Vampire Button",
      id: "vampButt",
      pic: "TowerGameJS-Phase4/resources/images/panels/home.png",
      picId: "vampire",
      funk: function () {
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 14, 180, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
      }
    }, {
      name: "Rock Thrower Button",
      id: "rockButt",
      pic: "TowerGameJS-Phase4/resources/images/panels/home.png",
      picId: "rockThrower",
      funk: function () {
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 15, 180, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
      }
    }, {
      name: "Buff Tower Button",
      id: "buffButt",
      pic: "TowerGameJS-Phase4/resources/images/panels/home.png",
      picId: "buffTower",
      funk: function () {
        towerGame.gameState.specificTowerPanel = new Panel(towerGame, 16, 180, 800, 680)
        document.getElementById("towerInfoPanel").parentNode.removeChild(document.getElementById("towerInfoPanel"))
      }
    }
  ]
}, { // panel 8
  name: "Catalog Home",
  id: "cataHome",
  pic: "",
  picId: "homeCata",
  buttonJSON: [
    {
      name: "Back Button",
      id: "back",
      pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
      picId: "back",
      funk: function () {
        towerGame.gameState.panelQuit = new Panel(towerGame, 2)
        document.getElementById("cataHome").parentNode.removeChild(document.getElementById("cataHome"))
      }
    }
  ]
},



{ //panel 9
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
      towerGame.gameState.towerPanel = new Panel(towerGame, 6, 180)
      document.getElementById("archerCataPanel").parentNode.removeChild(document.getElementById("archerCataPanel"))
    }
  }
  ]
}, { //panel 10
    name: "Knight Catalog",
    id: "knightCata",
    pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/archerCatalog.png",
    picId: "knightCata",
    buttonJSON:[{
        name: "Back Button",
        id: "back",
        pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
        picId: "back",
        funk: function () {
          towerGame.gameState.towerPanel = new Panel(towerGame, 6, 180)
          document.getElementById("knightCata").parentNode.removeChild(document.getElementById("knightCata"))
        }
      }
    ]
  }, { //panel 11
    name: "Wizard Catalog",
    id: "wizardCata",
    pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/archerCatalog.png",
    picId: "wizardCata",
    buttonJSON:[{
        name: "Back Button",
        id: "back",
        pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
        picId: "back",
        funk: function () {
          towerGame.gameState.towerPanel = new Panel(towerGame, 6, 180)
          document.getElementById("wizardCata").parentNode.removeChild(document.getElementById("wizardCata"))
        }
      }
    ]
  }, { //panel 12
    name: "Cannoneer Catalog",
    id: "cannoneerCata",
    pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/cannoneerCatalog.png",
    picId: "cannonCata",
    buttonJSON:[{
        name: "Back Button",
        id: "back",
        pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
        picId: "back",
        funk: function () {
          towerGame.gameState.towerPanel = new Panel(towerGame, 6, 180)
          document.getElementById("cannoneerCata").parentNode.removeChild(document.getElementById("cannoneerCata"))
        }
      }
    ]
  }, { //panel 13
    name: "Sniper Catalog",
    id: "sniperCata",
    pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/archerCatalog.png",
    picId: "sniperCata",
    buttonJSON:[{
        name: "Back Button",
        id: "back",
        pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
        picId: "back",
        funk: function () {
          towerGame.gameState.towerPanel = new Panel(towerGame, 6, 180)
          document.getElementById("sniperCata").parentNode.removeChild(document.getElementById("sniperCata"))
        }
      }
    ]
  }, { //panel 14
    name: "Assassin Catalog",
    id: "assassinCata",
    pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/assassinCatalog.png",
    picId: "assasCata",
    buttonJSON:[{
        name: "Back Button",
        id: "back",
        pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
        picId: "back",
        funk: function () {
          towerGame.gameState.towerPanel = new Panel(towerGame, 6, 180)
          document.getElementById("assassinCata").parentNode.removeChild(document.getElementById("assassinCata"))
        }
      }
    ]
  }, { //panel 15
    name: "Bladestorm Catalog",
    id: "bladestormCata",
    pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/bladestormCatalog.png",
    picId: "bladeCata",
    buttonJSON:[{
        name: "Back Button",
        id: "back",
        pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
        picId: "back",
        funk: function () {
          towerGame.gameState.towerPanel = new Panel(towerGame, 6, 180)
          document.getElementById("bladestormCata").parentNode.removeChild(document.getElementById("bladestormCata"))
        }
      }
    ]
  }, { //panel 16
    name: "Vampire Catalog",
    id: "vampireCata",
    pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/bladestormCatalog.png",
    picId: "vampCata",
    buttonJSON:[{
        name: "Back Button",
        id: "back",
        pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
        picId: "back",
        funk: function () {
          towerGame.gameState.towerPanel = new Panel(towerGame, 6, 180)
          document.getElementById("vampireCata").parentNode.removeChild(document.getElementById("vampireCata"))
        }
      }
    ]
  }, { //panel 17
    name: "Rock Thrower Catalog",
    id: "rockThrowerCata",
    pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/bladestormCatalog.png",
    picId: "rockCata",
    buttonJSON:[{
        name: "Back Button",
        id: "back",
        pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
        picId: "back",
        funk: function () {
          towerGame.gameState.towerPanel = new Panel(towerGame, 6, 180)
          document.getElementById("rockThrowerCata").parentNode.removeChild(document.getElementById("rockThrowerCata"))
        }
      }
    ]
  }, { //panel 18
    name: "Buff Catalog",
    id: "buffTowerCata",
    pic: "TowerGameJS-Phase4/resources/images/panels/catalogPanel/towerPanels/bladestormCatalog.png",
    picId: "buffCata",
    buttonJSON:[{
        name: "Back Button",
        id: "back",
        pic: "TowerGameJS-Phase4/resources/images/panels/back.png",
        picId: "back",
        funk: function () {
          towerGame.gameState.towerPanel = new Panel(towerGame, 6, 180)
          document.getElementById("buffTowerCata").parentNode.removeChild(document.getElementById("buffTowerCata"))
        }
      }
    ]
  }
]