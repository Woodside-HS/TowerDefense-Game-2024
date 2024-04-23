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

    ctx.beginPath();
    ctx.moveTo(this.loc.x, this.loc.y);
    ctx.lineTo(this.targetLoc.x, this.targetLoc.y);
    ctx.strokeStyle = 'rgba(0, 0, 255, 1)';
    ctx.stroke();


    //ctx.restore();
  }

  update(){


  }
}//  end Bullet class
