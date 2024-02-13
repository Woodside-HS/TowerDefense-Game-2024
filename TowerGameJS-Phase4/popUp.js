// This was made by the one and only Bryan James Calder

class Popup{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.popupElement = this.createPopup();
        this.show();
      }
    
      createButton(id, text) {
        const button = document.createElement('button');
        button.id = id;
        button.textContent = text;
        button.style.margin = '0 5px';
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
    
        const refundButton = this.createButton('refundButton', 'Refund');
        const upgradeButton = this.createButton('upgradeButton', 'Upgrade');
    
        // Event listeners for buttons
        refundButton.addEventListener('click', () => {
          console.log('Refund button clicked');
          // Handle refund logic here
        });
    
        upgradeButton.addEventListener('click', () => {
          console.log('Upgrade button clicked');
          // Handle upgrade logic here
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
      }
    }
    