// This was made by the one and only Bryan James Calder

class Popup {
  constructor(x, y, tower) {
    this.x = x;
    this.y = y;
    this.popupElement = this.createPopup();
    //this.upgradePopup;
    this.show();
    this.tower = tower;
  }

  createButton(id, text, onClickCallback) {
    const button = document.createElement('button');
    button.id = id;
    button.textContent = text;
    button.style.margin = '0 5px';
    button.onclick = onClickCallback; // Assign the callback function to the click event
    return button;
  }

  createPopup() {
    const popup = document.createElement('div');
    popup.style.position = 'absolute';
    popup.style.left = `${this.x}px`;
    popup.style.top = `${this.y}px`;
    popup.style.padding = '10px';
    popup.style.border = '1px solid black';
    popup.style.background = 'white';
    popup.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

    const refundButton = this.createButton('refundButton', 'Refund', () => {
      console.log('Refund button clicked');
      
    });
    const upgradeButton = this.createButton('upgradeButton', 'Upgrade', () => {
      this.upgradeElement = this.createUpgradePopup();
    });

    popup.appendChild(refundButton);
    popup.appendChild(upgradeButton);

    return popup;
  }

  createUpgradePopup() {
    const upgradePopup = document.createElement('div');
    upgradePopup.style.position = 'fixed'; // Use fixed to center it on the screen
    upgradePopup.style.left = '50%';
    upgradePopup.style.top = '50%';
    upgradePopup.style.transform = 'translate(-50%, -50%)';
    upgradePopup.style.padding = '20px';
    upgradePopup.style.border = '1px solid #ddd';
    upgradePopup.style.background = '#fff';
    upgradePopup.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';
    upgradePopup.style.zIndex = '1000'; // Ensure it's above other content

    // Creating buttons for the upgrade popup
    const rangeButton = this.createButton('rangeButton', 'Range', () => {
      this.tower.range = this.tower.range*1.2;
      console.log("Range increased by 20%");
      this.hideUpgrade();
      
    });
    const cooldownButton = this.createButton('cooldownButton', 'Cooldown', () => {
      this.tower.cooldown = this.tower.cooldown*0.8;
console.log("Cooldown decreased by 20%");
this.hideUpgrade();
    });
    const damageButton = this.createButton('damageButton', 'Damage', () => {
      console.log("Damage increased by 20%");
      this.hideUpgrade();
    });


    // Adding buttons to the upgrade popup
    upgradePopup.appendChild(rangeButton);
    upgradePopup.appendChild(cooldownButton);
    upgradePopup.appendChild(damageButton);

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

  hideUpgrade(){
    document.body.removeChild(this.upgradeElement);
  }

}
    