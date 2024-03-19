// This was made by the one and only Bryan James Calder

class Popup {
  constructor(x, y, tower) {
    this.x = x;
    this.y = y;
    this.tower = tower;
    this.baseSellPrice = this.tower.cost/3;
    this.sellPrice = this.baseSellPrice;
    this.popupElement = this.createPopup();
    this.show();
  }



  createButton(cost, id, text, onClickCallback) {
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
    const popup = document.createElement('popupDiv');
    popup.style.position = 'absolute';
    popup.style.left = `${this.x}px`;
    popup.style.top = `${this.y}px`;
    popup.style.padding = '10px';
    popup.style.border = '1px solid black';
    // Set the background to a PNG image
    popup.style.background = `url('resources/images/button1.png')`;
    popup.style.backgroundSize = 'cover'; // Ensure the background covers the whole popup
    popup.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

    const refundButton = this.createButton(this.sellPrice, 'refundButton', 'Refund', () => {
      console.log('Refund button clicked');
      towerGame.shownBase = false;
    });
    const upgradeButton = this.createButton('', 'upgradeButton', 'Upgrade', () => {
        this.upgradeElement = this.createUpgradePopup();
    });

    const cancleButton = this.createButton('', 'cancleButton', 'X', () => {
      towerGame.shownBase = false;
      console.log('Cancle button clicked');
    });

    popup.appendChild(refundButton);
    popup.appendChild(upgradeButton);
    popup.appendChild(cancleButton);

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
    upgradePopup.style.background = `url('resources/images/button2.png')`;
    upgradePopup.style.backgroundSize = 'cover'; // Ensure the background covers the whole popup
    upgradePopup.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    upgradePopup.style.zIndex = '1000';

    // Creating buttons for the upgrade popup
    console.log(this.tower.upgradedRange + "    " + this.tower.upgradedCoolDown + "    " + this.tower.upgradedDamage);
    let cost = Math.ceil(this.tower.cost*4)
    const finalUpgrade = this.createButton(cost, 'finalUpgrade', 'Final', () => {
      this.tower.finalUpgrade(this.tower.ability);
      console.log("Final Upgrade");
      this.tower.upgradedFinal = true;
      this.hideUpgrade();
      towerGame.bankValue -= Math.ceil(this.tower.cost*4);
      this.sellPrice+=this.tower.cost*4;
      towerGame.shownBase = false;
    });
    cost = Math.ceil(this.tower.cost*1.2);
    const rangeButton = this.createButton(cost, 'rangeButton', 'Range', () => {
      this.tower.rangeUpgrade();
      console.log("Range increased by 20%");
      this.tower.upgradedRange = true;
      towerGame.bankValue -= Math.ceil(this.tower.cost*1.2);
      this.sellPrice +=this.tower.cost*1.2;
      this.hideUpgrade();
      towerGame.shownBase = false;
    });
    cost = Math.ceil(this.tower.cost*1.35)
    const cooldownButton = this.createButton(cost, 'cooldownButton', 'Cooldown', () => {
      this.tower.coolDownUpgrade();
      console.log("Cooldown decreased by 20%");
      this.tower.upgradedCoolDown = true;
      towerGame.bankValue -= Math.ceil(this.tower.cost*1.35);
      this.sellPrice +=this.tower.cost*1.35;
      this.hideUpgrade();
      towerGame.shownBase = false;
    });
    cost = Math.ceil(this.tower.cost*1.5)
    const damageButton = this.createButton(cost, 'damageButton', 'Damage', () => {
      console.log("Damage increased by 20%");
      this.tower.upgradedDamage = true;
      towerGame.bankValue -= Math.ceil(this.tower.cost*1.5);
      this.sellPrice +=this.tower.cost*1.5;
      this.tower.damageUpgrade();
      this.hideUpgrade();
      towerGame.shownBase = false;
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
