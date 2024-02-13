'use strict'

class Liquify{

  constructor(location, bImg, angle, type){
    // issue#1 use preloaded bullet image instead of loadImage
    this.loc = location;
    this.vel = vector2d(0, 0);
    this.acc = vector2d(0, 0);
    this.towerLoc = location
    this.speed = 3;
    this.r=30;
    this.shape="circle";
    this.angle = angle;
    this.img = bImg;
    this.ability=type;

  }

  run(){
    this.render();
    this.update();
    this.checkRange();
  }
  render(){

    var ctx = towerGame.context;
    ctx.save();
    ctx.translate(this.loc.x, this.loc.y);
   // ctx.rotate(this.angle+Math.PI/2);
    ctx.drawImage(this.img, -this.img.width/2,-this.img.height/2);
    ctx.restore();
  }

  update(){
    this.loc.y += Math.sin(this.angle)*this.speed;
    this.loc.x += Math.cos(this.angle)*this.speed;

  }

  checkRange(){

  }
}