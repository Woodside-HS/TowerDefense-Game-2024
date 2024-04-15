'use strict'

class Bullet {

  constructor(location, bImg, angle, type, mouseLoc, towerLoc, damageMult, finalCannon, finalFast, finalFreeze) {
    // issue#1 use preloaded bullet image instead of loadImage
    this.cannonUpgradeFinal = finalCannon;
    this.fastUpgradeFinal = finalFast;
    this.freezeUpgradeFinal = finalFreeze;
    this.spinny = false;
    this.loc = location;
    this.towerLoc = towerLoc;
    this.speed = 15;
    this.r = 30;
    this.choosenTarget = false;
    this.shape = "circle";
    this.cannonBulletAngle = 0;
    this.angle = angle;
    this.img = bImg;
    this.ability = type;
    this.mouseLoc = mouseLoc;
    this.spots = [];
    this.choosenTargetLoc = 0;
    this.cannonAngle;
    this.damageMult = damageMult;
    this.slashArc = 80;
    if (this.ability == "freeze") {
      this.speed = 10;
    }
    if (this.ability == "cannon") {
      this.speed = 50;
    }
    if(this.ability == "fast"){
      this.speed = 5;
    }
  }

  run() {
    this.render();
    if (this.ability == "cannon") {
      this.cannonMovement();
      //this.cannonSpinny();
    } else if (this.ability == "explosive") {
      this.explosiveRandom();
    }
      this.update();
    }
    
  
  explosiveRandom() {
    if(!this.randomChoosenTarget){
    let can = this.chooseRandomExplosiveSpot();
    let angleOfTarget = Math.atan2(can.loc.y - this.loc.y, can.loc.x - this.loc.x);
      this.randomChoosenTarget = true;
      this.cannonAngle = angleOfTarget;
      this.choosenTarget = true;
      this.choosenTargetLoc = new vector2d(can.loc.x, can.loc.y);
    }
      this.loc.y += Math.sin(this.cannonAngle) * this.speed;
      this.loc.x += Math.cos(this.cannonAngle) * this.speed;
      let bulletFromTowerDist = this.loc.dist(this.towerLoc);
      let towerToLocation = this.towerLoc.dist(this.choosenTargetLoc);
      let total = towerToLocation - bulletFromTowerDist;
      if(total < 0){
        this.speed = 0;
      
    }
  }
  chooseRandomExplosiveSpot() {
    this.spots = [];
    let count = 0;
    for (let i = 0; i < 18; i++) {
      for (let j = 0; j < 15; j++) {
        count++;
        this.spots.push(towerGame.grid[i][j]);
      }
    }
    let j = Math.ceil(Math.random() * (this.spots.length)) - 1;
    return this.spots[j];
  }
  cannonMovement() {
    if (this.choosenTarget == false) {
      let can = this.chooseCannonSpot();
      let angleOfTarget = Math.atan2(can.loc.y - this.loc.y, can.loc.x - this.loc.x);
      this.cannonAngle = angleOfTarget;
      this.choosenTarget = true;
      this.choosenTargetLoc = new vector2d(can.loc.x, can.loc.y);
    }
    if (this.spinny == false) {
      this.loc.y += Math.sin(this.cannonAngle) * this.speed;
      this.loc.x += Math.cos(this.cannonAngle) * this.speed;
      let bulletFromTowerDist = this.loc.dist(this.towerLoc);
      let towerToLocation = this.towerLoc.dist(this.choosenTargetLoc);
      let total = towerToLocation - bulletFromTowerDist;
      if (total < 0) {
        this.speed = 0;
      }
    } else if (this.spinny == true) {
      this.cannonSpinny();
    }

  }

  cannonSpinny() {
    if (this.cannonUpgradeFinal) {
      let angularMovement = 0.05;
      this.loc.x += Math.cos(this.cannonBulletAngle) * 2.5;//the * 2.5 does not really make sense idk
      this.loc.y += Math.sin(this.cannonBulletAngle) * 2.5;//The number should be orbital radius and it technically is.
      this.cannonBulletAngle += angularMovement;
    }
  }

  //chooseExplosiveSpot()
  // look through all grid spots
  //if they are in the chossen towers range then add them to array
  //pick a random one to fly towards and damage them
  chooseCannonSpot() {
    this.spots = [];
    let count = 0;
    for (let i = 0; i < 18; i++) {
      for (let j = 0; j < 15; j++) {
        let dist = towerGame.grid[i][j].loc.dist(this.mouseLoc);
        if (dist < 120) {
          count++;
          this.spots.push(towerGame.grid[i][j]);
        }

      }
    }
    let j = Math.ceil(Math.random() * (this.spots.length)) - 1;
    return this.spots[j];
  }
  render() {

    var ctx = towerGame.context;
    ctx.save();
    ctx.translate(this.loc.x, this.loc.y);
    ctx.rotate(this.angle + Math.PI / 2)

    ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);

    ctx.restore();

    if (this.fastUpgradeFinal && this.slashArc > 0) {
      let clr = 'rgba(0, 100, 0, 0.12)'
      var ctx = towerGame.context;
      ctx.save();
      ctx.strokeStyle = clr;
      ctx.fillStyle = clr;
      ctx.translate(this.loc.x, this.loc.y);
      ctx.moveTo(0, 0);
      ctx.ellipse(0, 0, this.slashArc, this.slashArc / 2, this.angle, 0, Math.PI * 2, true)
      ctx.stroke();
      ctx.fill();
      ctx.restore();
      this.slashArc -= 0.3;
    }
  }

  update() {
    this.loc.y += Math.sin(this.angle) * this.speed;
    this.loc.x += Math.cos(this.angle) * this.speed;

  }


  checkCollide(shape1, shape2) {

    if (shape1.shape === "circle") {
      if (shape2.shape === "circle") {
        //circle-circle
        if (shape1.r + shape2.r >= shape1.loc.copy().dist(shape2.loc)) return true;
        return false;
      } else if (shape2.shape === "square") {//this does not work for rectangles but its close enought for a 57x50 thing
        //circle-square
        let topLeft = shape2.loc;
        let topRight = new vector2d(shape2.loc.x + shape2.w, shape2.loc.y);
        let bottomRight = new vector2d(shape2.loc.x + shape2.w, shape2.loc.y + shape2.w);
        let bottomLeft = new vector2d(shape2.loc.x, shape2.loc.y + shape2.w);
        let dist1 = topLeft.dist(shape1.loc);
        let dist2 = topRight.dist(shape1.loc);
        let dist3 = bottomRight.dist(shape1.loc);
        let dist4 = bottomLeft.dist(shape1.loc);
        if (dist1 <= shape1.r || dist2 <= shape1.r || dist3 <= shape1.r || dist4 <= shape1.r) return true;
        return false;
      } else if (shape2.shape === "point") {
        //circle-point
        if (shape1.r >= shape1.loc.dist(shape2.loc)) return true;
        return false;
      } else {
        throw "shape2 shape not acceptable.";
      }

    } else if (shape1.shape === "square") {
      if (shape2.shape === "circle") {
        //square-circle
        let topLeft = shape1.loc;
        let topRight = new vector2d(shape1.loc.x + shape1.w, shape1.loc.y);
        let bottomRight = new vector2d(shape1.loc.x + shape1.w, shape1.loc.y + shape1.w);
        let bottomLeft = new vector2d(shape1.loc.x, shape1.loc.y + shape1.w);
        let dist1 = topLeft.dist(shape2.loc);
        let dist2 = topRight.dist(shape2.loc);
        let dist3 = bottomRight.dist(shape2.loc);
        let dist4 = bottomLeft.dist(shape2.loc);
        if (dist1 <= shape2.r || dist2 <= shape2.r || dist3 <= shape2.r || dist4 <= shape2.r) return true;
        return false;
      } else if (shape2.shape === "square") {
        //square-square
        if (shape1.loc.x < shape2.loc.x + shape2.w &&
          shape1.loc.x + shape1.w > shape2.loc.x &&
          shape1.loc.y < shape2.loc.y + shape2.w &&
          shape1.w + shape1.loc.y > shape2.loc.y) {
          return true;
        }
        return false;
      } else if (shape2.shape === "point") {
        //square-point
      } else {
        throw "shape2 shape not acceptable.";
      }
    } else if (shape1.shape === "point") {
      if (shape2.shape === "circle") {
        //point-circle
        if (shape2.r >= shape2.loc.dist(shape1.loc)) return true;
        return false;
      } else if (shape2.shape === "square") {
        //point-square
      } else if (shape2.shape === "point") {
        //point-point
        if (shape2.loc.dist(shape1.loc) < 1) return true;
        return false;
      } else {

        throw "shape2 shape not acceptable.";
      }
    } else {
      throw "shape1 shape not acceptable.";
    }


  }
}//  end Bullet class
