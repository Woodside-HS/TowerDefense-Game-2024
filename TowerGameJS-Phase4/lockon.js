class LockOn {

  constructor(locationOne, locationTwo) {
    // Constructor initializes the LockOn object with two locations
    this.loc = locationOne; // Starting location of the lock-on
    this.targetLoc = locationTwo; // Target location for the lock-on

  }

  run() {
    // Method to handle the operations of the lock-on
    this.render(); // Render the lock-on visuals
    this.update(); // Update the lock-on state
  }

  render() {
    // Method to draw the lock-on line between two points
    var ctx = towerGame.context; // Context from the game's main canvas

    ctx.save(); // Save the current drawing context
    // Create a linear gradient from the starting point to the target point
    let gradient = ctx.createLinearGradient(this.loc.x, this.loc.x, this.targetLoc.x, this.targetLoc.y);
    gradient.addColorStop(0, "rgba(0, 0, 255, 1)"); // Blue color at the start
    gradient.addColorStop(1, "rgba(0, 100, 50, 1"); // Greenish color at the end
    ctx.strokeStyle = gradient; // Set the gradient as the stroke style
    ctx.beginPath(); // Begin a new path for drawing
    ctx.moveTo(this.loc.x, this.loc.y); // Move to the starting point
    ctx.lineTo(this.targetLoc.x, this.targetLoc.y); // Draw a line to the target point
    ctx.closePath(); // Close the current path
    ctx.stroke(); // Render the line
    ctx.restore(); // Restore the previous drawing context

  }

  update() {
    // Method to update the state of the lock-on (currently empty)
  }
}//  end LockOn class