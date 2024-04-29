class LockOn{

  constructor(locationOne, locationTwo){
    // issue#1 use preloaded bullet image instead of loadImage
    this.loc = locationOne;
    this.targetLoc = locationTwo;

  }

  run(){
  
    this.render();
    this.update();
  }
  render(){
    var ctx = towerGame.context;

    ctx.save();
 //   ctx.translate(this.loc.x, this.loc.y);
    let gradient = ctx.createLinearGradient(this.loc.x, this.loc.x, this.targetLoc.x, this.targetLoc.y);
    gradient.addColorStop(0, "rgba(0, 0, 255, 1)");
    gradient.addColorStop(1, "rgba(0, 100, 50, 1");
    ctx.strokeStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(this.loc.x, this.loc.y);
    ctx.lineTo(this.targetLoc.x, this.targetLoc.y);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();

  }

  update(){


  }
}//  end Bullet class
