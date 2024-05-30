class Blade {

  constructor(location, bImg, angle, type, blades, damageMult, isOrginal) {
    this.loc = new vector2d(0, 0);
    this.towerLoc = location;
    this.shape = "sword";
    this.img = bImg;
    this.ability = type;
    this.orbitalRadius = 0;
    this.isOrginal = isOrginal;
    this.angle = 0;
    this.angularVelocity = 0.05;
    this.w = this.img.width;
    this.h = this.img.height;
    this.blades = blades;
    this.damageMult = damageMult;
  }


  run() {
    this.render();
    this.update();
  }

  render() {
    if (this.isOrginal == "first") {
      var ctx = towerGame.context;
      ctx.save();
      ctx.translate(this.towerLoc.x + 0, this.towerLoc.y + 0)
      ctx.rotate(this.blades * 0.5 * Math.PI);//idk the png is scuffed so its not perfect
      // but I can not be asked to fix the png yet
      ctx.rotate(this.angle)


      ctx.drawImage(this.img, 0 , 0,
        this.img.width/1.5, this.img.height/1.5);

      ctx.restore();
    } else {
      var ctx = towerGame.context;
      ctx.save();
      ctx.translate(this.towerLoc.x, this.towerLoc.y);
      ctx.rotate((this.blades + 1) * 0.275 * Math.PI);//idk the png is scuffed so its not perfect
      // but I can not be asked to fix the png yet
      ctx.rotate(this.angle)


      ctx.drawImage(this.img, 0, 0,
        this.img.width/1.5, this.img.height/1.5);

      ctx.restore();
    }
  }


  update() {
    this.loc.x = this.towerLoc.x + Math.cos(this.angle) * this.orbitalRadius;
    this.loc.y = this.towerLoc.y + Math.sin(this.angle) * this.orbitalRadius;
    this.angle += this.angularVelocity;
  }
}