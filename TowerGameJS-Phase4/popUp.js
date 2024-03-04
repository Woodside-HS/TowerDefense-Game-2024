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
    // Set the background to a PNG image
    popup.style.background = `url('resources/images/button1.png')`;
    popup.style.backgroundSize = 'cover'; // Ensure the background covers the whole popup
    popup.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

    const refundButton = this.createButton('refundButton', 'Refund', () => {
      console.log('Refund button clicked');
      
    });
    const upgradeButton = this.createButton('upgradeButton', 'Upgrade', () => {
      if(towerGame.bankValue > this.tower.cost){
        this.upgradeElement = this.createUpgradePopup();
        } else {
          alert("Insufficient Funds!");
        }
    });

    const cancleButton = this.createButton('cancleButton', 'X', () => {
      console.log('Cancle button clicked');
    //  this.hide();
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
    const rangeButton = this.createButton('rangeButton', 'Range', () => {
      this.tower.range = this.tower.range*1.2;
      console.log("Range increased by 20%");
      towerGame.bankValue -= this.tower.cost;
      this.hideUpgrade();
      
    });
    const cooldownButton = this.createButton('cooldownButton', 'Cooldown', () => {
      this.tower.cooldown = this.tower.cooldown*0.8;
console.log("Cooldown decreased by 20%");
towerGame.bankValue -= this.tower.cost;
this.hideUpgrade();
    });
   
    const damageButton = this.createButton('damageButton', 'Damage', () => {
      console.log("Damage increased by 20%");
      towerGame.bankValue -= this.tower.cost;
      this.tower.damageUpgrade();
      this.hideUpgrade();
    });
    
    const cancleButton = this.createButton('cancleButton', 'X', () => {
      console.log("Cancle button clicked");
      this.hideUpgrade();
    });


    // Adding buttons to the upgrade popup
    upgradePopup.appendChild(rangeButton);
    upgradePopup.appendChild(cooldownButton);
    upgradePopup.appendChild(damageButton);
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

  hideUpgrade(){
    document.body.removeChild(this.upgradeElement);
  }

}
    