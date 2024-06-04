class Blade {

  constructor(location, bImg, angle, type, blades, damageMult, isOrginal) {
    this.loc = new vector2d(0, 0); // Location vector initialized to (0,0)
    this.towerLoc = location; // Location of the tower
    this.shape = "sword"; // Shape of the blade
    this.img = bImg; // Image of the blade
    this.ability = type; // Type of ability the blade has
    this.orbitalRadius = this.img.height / 1.5; // Orbital radius for blade rotation
    this.isOrginal = isOrginal; // Flag to check if it's the original blade
    this.angle = 0; // Initial angle for rotation
    this.angularVelocity = 0.05; // Angular velocity for rotation
    this.w = this.img.width / 1.5; // Width of the blade image
    this.h = this.img.height / 1.5; // Height of the blade image
    this.blades = blades; // Number of blades
    this.damageMult = damageMult; // Damage multiplier
  }


  run() {
    this.render();
    this.update();
  }
  // Method to render the blade on the canvas

  render() {
    if (this.isOrginal == "first") {
      var ctx = towerGame.context; // Context from the tower game
      ctx.save(); // Save the current context state
      ctx.translate(this.towerLoc.x, this.towerLoc.y); // Translate to the tower location
      ctx.rotate((this.blades - 1) * 0.5 * Math.PI);//idk the png is scuffed so its not perfect
      // but I can not be asked to fix the png yet
      ctx.rotate(this.angle)
      //this.loc.y += Math.sin(this.angle)*10;
      //this.loc.x += Math.cos(this.angle)*10;

      ctx.drawImage(this.img, 0, 0,
        this.img.width / 1.5, this.img.height / 1.5);

      ctx.restore();
    } else {
      var ctx = towerGame.context;
      ctx.save();
      ctx.translate(this.towerLoc.x, this.towerLoc.y);
      ctx.rotate((this.blades + 1) * 0.275 * Math.PI);//idk the png is scuffed so its not perfect
      // but I can not be asked to fix the png yet
      ctx.rotate(this.angle)

      //draw the blade image
      ctx.drawImage(this.img, 0, 0,
        this.img.width / 1.5, this.img.height / 1.5);

      ctx.restore();
    }
  }


  update() {
    // Update the position of the blade based on its rotation
    this.loc.x = this.towerLoc.x + Math.cos(this.angle) * this.orbitalRadius;
    this.loc.y = this.towerLoc.y + Math.sin(this.angle) * this.orbitalRadius;
    this.angle += this.angularVelocity;
  }
}