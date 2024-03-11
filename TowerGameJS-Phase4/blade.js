class Blade {

  constructor(location, bImg, angle, type, blades) {
    this.loc = new vector2d(0, 0);
    this.towerLoc = location;
    this.shape = "square";
    this.img = bImg;
    this.ability = type;
    this.orbitalRadius = 7;
    this.angle = 0;
    this.angularVelocity = 0.10;
    this.w = this.img.width * 1.5;
    this.blades = blades;
  }


  run() {
    this.render();
    this.update();
  }

  render() {

    var ctx = towerGame.context;
    ctx.save();
    ctx.translate(this.towerLoc.x, this.towerLoc.y);
    ctx.rotate((Math.PI * 0.8) + Math.PI * this.blades * 0.53);//idk the png is scuffed so its not perfect
    // but I can not be asked to fix the png yet
    ctx.rotate(this.angle)


    ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2,
      -this.img.width * 1.5, -this.img.height * 1.5);

    ctx.restore();
  }

  update() {
    this.loc.x = this.towerLoc.x + Math.cos(this.angle) * this.orbitalRadius;
    this.loc.y = this.towerLoc.y + Math.sin(this.angle) * this.orbitalRadius;
    this.angle += this.angularVelocity;
  }
}