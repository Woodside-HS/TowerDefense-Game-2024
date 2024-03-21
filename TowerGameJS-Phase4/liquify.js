'use strict'

class Liquify {

  constructor(location, bImg, angle, type, tier, damageMult) {
    // issue#1 use preloaded bullet image instead of loadImage
    this.loc = location;
    this.vel = vector2d(0, 0);
    this.acc = vector2d(0, 0);
    this.towerLoc = location;
    this.tier = tier;
    this.speed = 3;
    this.r = 30;
    this.shape = "circle";
    this.angle = angle;
    this.img = bImg;
    this.ability = type;
    this.nearestEnemy = 100000;
    this.death = false;
    this.damageMult = damageMult;
    if(this.tier == "basic"){
      this.lifeSpan = 500;
    }else if (this.tier == "advanced"){
      this.lifeSpan = 5000;
    }else if (this.tier == "maxxed"){
      this.lifeSpan = 50000;
    }
  }

  run() {
    this.render();
    this.update();
  }
  render() {

    var ctx = towerGame.context;
    ctx.save();
    ctx.translate(this.loc.x, this.loc.y);
    ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
    ctx.restore();
  }
  subGetNew(v1, v2) {//I hate the vector2d class I just did this for my own sanity
    return new Vector2d(v1.x - v2.x, v1.y - v2.y);
  }
  multiply(v1, scalar) {
    return new Vector2d(v1.x * scalar, v1.y * scalar);
  }
  limit(v1, lim) {
    if (Math.abs(v1.x) > lim) {
      if (v1.x > 0) {
        v1.x = lim;
      } else {
        v1.x = -lim;
      }
    }

    if (Math.abs(v1.y) > lim) {
      if (v1.y > 0) {
        v1.y = lim;
      } else {
        v1.y = -lim;
      }
    }
    return new Vector2d(v1.x, v1.y);
  }
  newDist(v1, v2){
    return(Math.sqrt((v2.x-v2.x)*(v2.x-v1.x) + (v2.y-v1.y)*(v2.y-v1.y)));
}
  update() {
    this.lifeSpan --;
    if(this.lifeSpan <= 0){
      this.death = true;
    }
    for (let i = 0; i < towerGame.enemies.length; i++) {
      let dist = this.loc.dist(towerGame.enemies[i].loc);

      if (dist < this.nearestEnemy) {
        this.nearestEnemy = towerGame.enemies[i];
      }
    }
    this.acc = this.subGetNew(this.nearestEnemy.loc, this.loc);
    this.acc.normalize();
    this.acc = this.multiply(this.acc, 1);
    this.vel = this.vel.add(this.acc);
    this.vel = this.limit(this.vel, 4);
    this.loc = this.loc.add(this.vel);//movement is terrible but its a feature ig
//after a enemy dies in just stays there 
  }

}
