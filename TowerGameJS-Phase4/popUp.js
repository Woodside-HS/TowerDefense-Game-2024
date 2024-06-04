// This was made by the one and only Bryan James Calder

class Popup {
  constructor(x, y, tower) {
    this.x = x;
    this.y = y;
    this.tower = tower;
    this.baseSellPrice = this.tower.cost / 3; //towers that are already placed sell for 1/3 of their original cost
    this.sellPrice = this.baseSellPrice; //seems extraneous but whatever
    this.popupElement = this.createPopup(); //creates new popup object
    this.show();
  }

  createButton(cost, id, text, onClickCallback) { //general function to create a customizable button
    towerGame.shownBase = true;
    const button = document.createElement('button');
    button.id = id;
    button.textContent = text;
    button.style.margin = '0 5px';
    button.onclick = onClickCallback; // Assign the callback function to the click event
    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = 'lightgray'; // Change background color on hover
      towerGame.updateCostInfoElement(cost);
    });

    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = ''; // Revert to original background color when not hovered
      towerGame.updateCostInfoElement('');
    });

    return button;
  }

  createPopup() {
    // Create a new div element for the popup
    const popup = document.createElement('popupDiv');
    // Set the position of the popup to be absolute
    popup.style.position = 'absolute';
    // Set the left position of the popup based on the x coordinate
    popup.style.left = `${this.x}px`;
    // Set the top position of the popup based on the y coordinate
    popup.style.top = `${this.y}px`;
    // Add padding around the content inside the popup
    popup.style.padding = '10px';
    // Set the border style of the popup
    popup.style.border = '1px solid black';
    // Set the background image of the popup
    popup.style.background = `url('TowerGameJS-Phase4/resources/images/button1.png')`;
    // Ensure the background image covers the entire area of the popup
    popup.style.backgroundSize = 'cover';
    // Add shadow to the popup for better visibility
    popup.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

    // Create a refund button and define its behavior on click
    const refundButton = this.createButton(Math.floor(this.sellPrice), 'refundButton', 'Refund', () => {
      console.log('Refund button clicked'); // Log action to console
      towerGame.shownBase = false; // Update game state to not show base
    });
    // Create an upgrade button and define its behavior on click
    const upgradeButton = this.createButton('', 'upgradeButton', 'Upgrade', () => {
      this.upgradeElement = this.createUpgradePopup(); // Create and show upgrade popup
    });
    // Create a cancel button, correct the spelling in comments only
    const cancleButton = this.createButton('', 'cancleButton', 'X', () => {
      towerGame.shownBase = false; // Update game state to not show base
      console.log('Cancle button clicked'); // Log action to console, note the spelling mistake
    });

    // Append all buttons to the popup
    popup.appendChild(refundButton);
    popup.appendChild(upgradeButton);
    popup.appendChild(cancleButton);

    // Return the complete popup element
    return popup;
  }

  createUpgradePopup() {
    const upgradePopup = document.createElement('div');
    upgradePopup.style.position = 'absolute';
    upgradePopup.style.left = `${this.x + 100}px`;
    upgradePopup.style.top = `${this.y}px`;
    upgradePopup.style.transform = 'translate(-50%, -50%)';
    upgradePopup.style.padding = '20px';
    upgradePopup.style.border = '1px solid #ddd';
    // Set the background to a different PNG image for the upgrade popup
    upgradePopup.style.background = `url('TowerGameJS-Phase4/resources/images/button2.png')`;
    upgradePopup.style.backgroundSize = 'cover'; // Ensure the background covers the whole popup
    upgradePopup.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    upgradePopup.style.zIndex = '1000';

    // Creating buttons for the upgrade popup
    console.log(this.tower.upgradedRange + "    " + this.tower.upgradedCoolDown + "    " + this.tower.upgradedDamage);
    let cost = Math.ceil(this.tower.cost * 2)
    const finalUpgrade = this.createButton(cost, 'finalUpgrade', 'Final', () => {
      if (towerGame.bankValue >= Math.ceil(this.tower.cost * 2)) {
        this.tower.finalUpgrade(this.tower.ability);
        console.log("Final Upgrade");
        this.tower.upgradedFinal = true;
        this.hideUpgrade();
        towerGame.bankValue -= Math.ceil(this.tower.cost * 2);
        this.sellPrice += this.tower.cost * 2;
        towerGame.shownBase = false;
      }
    });
    cost = Math.ceil(this.tower.cost * 0.6);
    const rangeButton = this.createButton(cost, 'rangeButton', 'Range', () => {
      if (towerGame.bankValue >= Math.ceil(this.tower.cost * 0.6)) {
        this.tower.rangeUpgrade();
        console.log("Range increased by 20%");
        this.tower.upgradedRange = true;
        towerGame.bankValue -= Math.ceil(this.tower.cost * 0.6);
        this.sellPrice += this.tower.cost * 0.6;
        this.tower.buff3 *= 1.25;

        this.hideUpgrade();
        towerGame.shownBase = false;
      }
    });
    cost = Math.ceil(this.tower.cost * 1)
    const cooldownButton = this.createButton(cost, 'cooldownButton', 'Cooldown', () => {
      if (towerGame.bankValue >= Math.ceil(this.tower.cost * 1)) {
        this.tower.coolDownUpgrade();
        console.log("Cooldown decreased by 20%");
        this.tower.upgradedCoolDown = true;
        towerGame.bankValue -= Math.ceil(this.tower.cost * 1);
        this.sellPrice += this.tower.cost * 1;
        this.tower.buff2 *= 0.8;
        this.hideUpgrade();
        towerGame.shownBase = false;
      }
    });
    cost = Math.ceil(this.tower.cost * 1.25)
    const damageButton = this.createButton(cost, 'damageButton', 'Damage', () => {
      if (towerGame.bankValue >= Math.ceil(this.tower.cost * 1.25)) {
        console.log("Damage increased by 20%");
        this.tower.upgradedDamage = true;
        towerGame.bankValue -= Math.ceil(this.tower.cost * 1.25);
        this.sellPrice += this.tower.cost * 1.25;
        this.tower.buff1 *= 1.2;
        this.tower.damageUpgrade();
        this.hideUpgrade();
        towerGame.shownBase = false;
      }
    });

    const cancleButton = this.createButton('', 'cancleButton', 'X', () => {//the spelling tho
      console.log("Cancel button clicked");
      this.hideUpgrade();
      towerGame.shownBase = false;
    });


    // Adding buttons to the upgrade popup
    if (this.tower.upgradedRange == false) {
      upgradePopup.appendChild(rangeButton);
    }
    if (this.tower.upgradedCoolDown == false) {
      upgradePopup.appendChild(cooldownButton);
    }
    if (this.tower.upgradedDamage == false) {
      upgradePopup.appendChild(damageButton);
    }
    if (this.tower.upgradedRange && this.tower.upgradedCoolDown && this.tower.upgradedDamage && !this.tower.upgradedFinal) {
      upgradePopup.appendChild(finalUpgrade);
    }
    upgradePopup.appendChild(cancleButton);
    // Show the upgrade popup
    document.body.appendChild(upgradePopup);
    return upgradePopup;

    // Optionally, you can add a close button or a method to remove this popup
  }

  show() {
    document.body.appendChild(this.popupElement);
  }


  hide() {
    document.body.removeChild(this.popupElement);

  }

  hideUpgrade() {
    document.body.removeChild(this.upgradeElement);


  }

}
