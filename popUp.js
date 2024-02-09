// This was made by the one and only Bryan James Calder
// BRYAN JAMES CALDER is the only person that worked on this class
// This is the intellectual property of BRYAN JAMES CALDER

class Popup {
    constructor(x, y, onClose) {
      this.x = x;
      this.y = y;
      this.onClose = onClose; // Callback to remove the popup from the array
      this.popupElement = this.createPopup();
      this.show();
    }
  
    createButton(id, text, onClick) {
      const button = document.createElement('button');
      button.textContent = text;
      button.onclick = () => {
        onClick();
        this.hide(); // Automatically hide on button click
      };
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
      popup.style.zIndex = '1000'; // Ensure popup is above other elements
      popup.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
  
      // Refund button
      const refundButton = this.createButton('refundButton', 'Refund', () => {
        // Refund logic here
        console.log('Refund button clicked');
      });
  
      // Upgrade button
      const upgradeButton = this.createButton('upgradeButton', 'Upgrade', () => {
        // Upgrade logic here
        console.log('Upgrade button clicked');
      });
  
      popup.appendChild(refundButton);
      popup.appendChild(upgradeButton);
  
      return popup;
    }
  
    show() {
      document.body.appendChild(this.popupElement);
    }
  
    hide() {
        document.body.removeChild(this.popupElement);
        this.onClose(); // Ensure this callback sets towerGame.popupOpen to false
    }
  }
    
