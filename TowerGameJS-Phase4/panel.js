"use strict"
class Panel {
  constructor(game, number) {
    this.game = game
    this.temp = 0
    this.y = -590
    this.panel = document.createElement("div")
    this.panel.id = panelJSON[number].id
    this.panel.style.width = 450 + "px"
    this.panel.style.height = 290 + "px"
    this.panel.style.backgroundImage = 'url("' + panelJSON[number].pic + '")'
    this.panel.style.position = "absolute"
    this.panel.style.align = "center"
    this.panel.style.top = -800 + "px"
    this.panel.style.left = 725 + "px";
    this.panel.style.textAlign = "center"
    this.wrapper = document.getElementById('wrapperDiv').appendChild(this.panel)
    for (let i = 0; i < panelJSON[number].buttonJSON.length; i++) {
      this.createButton(panelJSON[number], i)
    }
  }

  render() {
    this.y = this.slideDown(this.y, 550, .05)
    this.panel.style.top = this.y + "px"
  }

  slideDown(start, end, incroment) {
    if ((incroment * (end - start)) > 1)
      return start + incroment * (end - start)
    return start
  }

  createButton(JSON1, i) {
    var button = document.createElement("div")
    button.id = JSON1.buttonJSON[i].picId
    button.style.width = 123 + "px"
    button.style.height = 30 + "px"
    button.style.position = "relative"
    button.style.top = 5 + 21 * i + "%"
    button.style.left = 50 + "px"
    button.image = document.createElement("img")
    button.image.id = JSON1.buttonJSON[i].picId
    button.image.src = JSON1.buttonJSON[i].pic
    button.image.addEventListener("click", JSON1.buttonJSON[i].funk, false)
    button.appendChild(button.image)
    this.panel.appendChild(button)
  }
}

var panelJSON = [{
  name: "Start Panel",
  id: "firstPanel",
  pic: "resources/images/panels/panel.png",
  picId: "pan",
  buttonJSON: [
    {
      name: "Start Button",
      id: "start",
      pic: "resources/images/panels/start.png",
      picId: "play",
      funk: function () {
        towerGame.gameState = new GameState2(towerGame)
        document.getElementById("firstPanel").parentNode.removeChild(document.getElementById("firstPanel"))
      }
    }, {
      name: "Instruction Button",
      id: "instruction",
      pic: "resources/images/panels/other.png",
      picId: "wframe",
      funk: function () {
        towerGame.gameState.panelInstructions = new Panel(towerGame, 1)
        document.getElementById("firstPanel").parentNode.removeChild(document.getElementById("firstPanel"))
      }
    }, {
      name: "Quit Button",
      id: "quitButton",
      pic: "resources/images/panels/end.png",
      picId: "exit",
      funk: function () {
        towerGame.gameState = new GameState4(towerGame)
        document.getElementById("firstPanel").parentNode.removeChild(document.getElementById("firstPanel"))
      }
    }]
}, {
  name: "Instruction Panel",
  id: "instructionPanel",
  pic: "resources/images/panels/panel.png",
  picId: "pan",
  buttonJSON: [
    {
      name: "Back Button",
      id: "back",
      pic: "resources/images/panels/back.png",
      picId: "back",
      funk: function () {
        towerGame.gameState.panelStart = new Panel(towerGame, 0)
        document.getElementById("instructionPanel").parentNode.removeChild(document.getElementById("instructionPanel"))
      }
    }]
}, {
  name: "End Panel",
  id: "endPanel",
  pic: "resources/images/panels/panel.png",
  picId: "pan",
  buttonJSON: [
    {
      name: "Replay Button",
      id: "replayButton",
      pic: "resources/images/panels/restart.png",
      picId: "wframe",
      funk: function () {
        towerGame.gameState = new GameState2(towerGame, 5);
        towerGame.currentWaveNum = 0; // Reset the current wave number to 0
        towerGame.wave = new Wave(towerGame, AllWaves[towerGame.currentWaveNum]); // Create a new Wave instance with the first wave
        towerGame.wave.referenceTime = 20;
        document.getElementById('fastForward').innerHTML = "Start";
        FRAME_RATE = 30;
        document.getElementById("endPanel").parentNode.removeChild(document.getElementById("endPanel"))
      }
    }, {
      name: "Quit Button",
      id: "quitButton",
      pic: "resources/images/panels/end.png",
      picId: "exit",
      funk: function () {
        document.getElementById("endPanel").parentNode.removeChild(document.getElementById("endPanel"))
        towerGame.gameState.panelQuit = new Panel(towerGame, 2)
        towerGame.gameState = new GameState1(towerGame)
        towerGame.currentWaveNum = 0; // Reset the current wave number to 0
        towerGame.wave = new Wave(towerGame, AllWaves[towerGame.currentWaveNum]); // Create a new Wave instance with the first wave
        towerGame.wave.referenceTime = 20;
        document.getElementById('fastForward').innerHTML = "Start";
        FRAME_RATE = 30;
        document.getElementById("endPanel").parentNode.removeChild(document.getElementById("endPanel"))
      }
    }, {
      name: "Credits Button",
      id: "creditsButton",
      pic: "resources/images/panels/credits.png",
      picId: "wframe",
      funk: function () {
        towerGame.gameState.panelCredits = new Panel(towerGame, 3)
        document.getElementById("endPanel").parentNode.removeChild(document.getElementById("endPanel"))
      }
    }]
}, {
  name: "Level Selector",
  id: "levelSelector",
  pic: "resources/images/panels/pan.png",
  picId: "pan",
  buttonJSON: [
    {
      name: "Level 1 Button",
      id: "level1Button",
      pic: "resources/images/panels/credits.png",
      picId: "frame1",
      funk: function (){
        towerGame.gameState = new GameState5(towerGame, 1)
        document.getElementById("levelSelector").parentNode.removeChild(document.getElementById("levelSelector"))
      }
    }, {
      name: "Level 2 Button",
      id: "level2Button",
      pic: "resources/images/panels/restart.png",
      picId: "frame2",
      funk: function (){
        towerGame.gameState = new GameState5(towerGame, 2)
        document.getElementById("levelSelector").parentNode.removeChild(document.getElementById("levelSelector"))
        
      }
    }, {
      name: "Level 3 Button",
      id: "level3Button",
      pic: "resources/images/panels/credits.png",
      picId: "frame3",
      funk: function (){
        towerGame.gameState = new GameState5(towerGame, 3)
        document.getElementById("levelSelector").parentNode.removeChild(document.getElementById("levelSelector"))
      }
    }, {
      name: "Level 4 Button",
      id: "level4Button",
      pic: "resources/images/panels/credits.png",
      picId: "frame4",
      funk: function (){
        towerGame.gameState = new GameState5(towerGame, 4)
        document.getElementById("levelSelector").parentNode.removeChild(document.getElementById("levelSelector"))
        
      }
    }, 
  ]
}, {
  name: "Credites Panel",
  id: "creditesPanel",
  pic: "resources/images/panels/pan.png",
  picId: "pan",
  buttonJSON: [
    {
      name: "Back Button",
      id: "back",
      pic: "resources/images/panels/back.png",
      picId: "back",
      funk: function () {
        towerGame.gameState.panelQuit = new Panel(towerGame, 2)
        document.getElementById("creditesPanel").parentNode.removeChild(document.getElementById("creditesPanel"))
      }
    }]
}



]


