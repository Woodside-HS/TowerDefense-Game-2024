'use strict'

class Bullet {

  constructor(location, bImg, angle, type, mouseLoc, towerLoc, damageMult, finalCannon, finalFast, finalFreeze) {
    // Constructor initializes the Bullet object with various properties
    this.cannonUpgradeFinal = finalCannon; // Boolean indicating if cannon upgrade is final
    this.fastUpgradeFinal = finalFast; // Boolean indicating if fast upgrade is final
    this.freezeUpgradeFinal = finalFreeze; // Boolean indicating if freeze upgrade is final
    this.spinny = false; // Boolean to control spin behavior
    this.loc = location; // Location vector of the bullet
    this.towerLoc = towerLoc; // Location vector of the tower
    this.speed = 15; // Default speed of the bullet

    this.lifeSpan = -1; // Default lifespan of the bullet
    this.choosenTarget = false; // Boolean to check if a target has been chosen
    this.shape = "square"; // Default shape of the bullet
    this.cannonBulletAngle = 0; // Initial angle for cannon bullet
    this.angle = angle; // Angle of the bullet's trajectory
    this.img = bImg; // Image of the bullet
    this.ability = type; // Type of bullet (e.g., cannon, fast, freeze)
    this.mouseLoc = mouseLoc; // Location vector of the mouse
    this.spots = []; // Array to store potential target spots
    this.choosenTargetLoc = 0; // Location vector of the chosen target
    this.cannonAngle; // Angle towards the chosen target
    this.r = this.img.width / 2; // Radius of the bullet for collision detection
    this.w = this.img.width / 2; // Width of the bullet for rendering
    this.damageMult = damageMult; // Damage multiplier
    this.slashArc = -Math.PI / 2; // Initial arc for slashing effect
    this.clr = this.randomColor(); // Random color for the bullet
    if (this.ability == "freeze") {
      this.speed = 10; // Reduced speed for freeze bullets
    }
    if (this.ability == "cannon") {
      this.speed = 14; // Adjusted speed for cannon bullets
      this.lifeSpan = 750; // Lifespan for cannon bullets
    }
    if (this.ability == "explosive") {
      this.lifeSpan = 750; // Lifespan for explosive bullets
    }
    if (this.ability == "fast" && this.fastUpgradeFinal) {
      this.speed = 0; // Speed set to 0 for final fast upgrade
    } else if (this.ability == "fast") {
      this.speed = 13; // Default speed for fast bullets
    }
    if (this.ability == "cannon") {
      this.lifeSpan = 1000; // Extended lifespan for cannon bullets
    }
  }

  randomColor() {
    // Generates a random color in rgba format
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return 'rgba(' + red + ',' + green + ',' + blue + ',' + 1 + ')';
  }

  run() {
    // Main method called to update bullet behavior per frame
    if (this.ability == "fast" && this.fastUpgradeFinal == true) {
      this.shape = "circle"; // Change shape to circle for final fast upgrade
      this.finalUpgradeSlashAttack(); // Perform slash attack
    } else {
      this.render(); // Render the bullet
    }
    if (this.ability == "cannon") {
      this.cannonMovement(); // Handle cannon movement
    } else if (this.ability == "explosive") {
      this.explosiveRandom(); // Handle explosive movement
    }

    this.update(); // Update the bullet's position
    this.lifeSpan--; // Decrease lifespan each frame
  }

  explosiveRandom() {
    // Handles movement for explosive bullets
    if (!this.randomChoosenTarget) {
      let can = this.chooseRandomExplosiveSpot(); // Choose a random target spot
      let angleOfTarget = Math.atan2(can.loc.y - this.loc.y, can.loc.x - this.loc.x); // Calculate angle to target
      this.randomChoosenTarget = true;
      this.cannonAngle = angleOfTarget; // Set cannon angle to target angle
      this.choosenTarget = true;
      this.choosenTargetLoc = new vector2d(can.loc.x, can.loc.y); // Set chosen target location
    }
    this.loc.y += Math.sin(this.cannonAngle) * this.speed; // Update Y position based on angle and speed
    this.loc.x += Math.cos(this.cannonAngle) * this.speed; // Update X position based on angle and speed
    let bulletFromTowerDist = this.loc.dist(this.towerLoc); // Calculate distance from bullet to tower
    let towerToLocation = this.towerLoc.dist(this.choosenTargetLoc); // Calculate distance from tower to target location
    let total = towerToLocation - bulletFromTowerDist; // Calculate remaining distance to target
    if (total < 0) {
      this.speed = 0; // Stop the bullet if it has reached the target
    }
  }

  chooseRandomExplosiveSpot() {
    // Chooses a random spot for explosive bullets to target
    this.spots = [];
    let count = 0;
    for (let i = 0; i < 18; i++) {
      for (let j = 0; j < 15; j++) {
        count++;
        this.spots.push(towerGame.grid[i][j]); // Add grid spot to spots array
      }
    }
    let j = Math.ceil(Math.random() * (this.spots.length)) - 1; // Select a random spot
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
        if (this.cannonUpgradeFinal) {
          this.spinny = true;
        }
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
    ctx.rotate(this.angle + Math.PI / 2);
    ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
    ctx.restore();


  }

  update() {
    this.loc.y += Math.sin(this.angle) * this.speed;
    this.loc.x += Math.cos(this.angle) * this.speed;

  }



  finalUpgradeSlashAttack() {

    let clr = 'rgba(0, 100, 0, 0.12)'
    var ctx = towerGame.context;
    ctx.save();
    ctx.strokeStyle = clr;
    ctx.fillStyle = clr;
    ctx.translate(this.loc.x, this.loc.y);
    //ctx.moveTo(0, 0);
    ctx.rotate(this.slashArc);
    this.loc.x += Math.cos(this.slashArc);
    this.loc.y += Math.sin(this.slashArc);
    ctx.drawImage(this.img, -this.img.width * 1.1, -this.img.height * 1.1);
    ctx.stroke();
    ctx.fill();
    ctx.restore();
    this.slashArc += 0.02 * Math.PI;
    if (this.slashArc > 0.5 * Math.PI) {
      this.slashArc = "over";
    }


  }
  checkCollide(shape1, shape2) {

    if (shape1.shape === "circle") {
      if (shape2.shape === "circle") {
        //circle-circle
        if (shape1.r + shape2.r >= shape1.loc.copy().dist(shape2.loc)) return true;
        return false;
      } else if (shape2.shape === "square") {
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
