class Enemy {

  constructor(game) {
    this.game = game;

    // currentCell is the start position of the enemies
    this.currentCell = [1][1];
    for (let row = 0; row < this.game.levelKey.length; row++) {
      for (let col = 0; col < this.game.levelKey[0].length; col++) {
        if (this.game.levelKey[row][col] === 's') {
          this.currentCell = this.game.grid[col][row];
        }
      }
    }
    this.loc = this.currentCell.center.copy();
    this.randomPath = 1;   //boolean to randomize or not
    this.radius = 15.0;
    this.r = 15.0;
    this.vel = 3.0;
    this.count = 0;
    this.slowed = 1.2;
    this.isLocked = false;
    this.isTarget = false;
    this.deathSound = new Audio('resources/sounds/splat.mp3');
    this.lastTime = Date.now();
    this.coolDown = 1000;
    this.towerLoc = vector2d(0, 0);
    this.health;
    this.targetCell = this.nextTarget();
    this.target = this.targetCell.center;
    this.shape = "circle";
    var targetVec = this.target.copy().sub(this.loc);
    this.velVec = targetVec.copy().normalize().scale(this.vel);      // initial velocity vector
    this.kill = false;
    this.angle = this.velVec.angle()
    this.img = Enemy.image3;// image for enemy
    this.hitByFreezeUpgraded = false;


    this.normalImmunities = [false, "targetable"];
    this.normalUpgradedImmunities = [false, "targetable"];
    this.fastImmunities = [false, "targetable"];
    this.fastUpgradedImmunities = [false, "targetable"];
    this.freezeImmunities = [false, "targetable"];
    this.freezeUpgradedImmunities = [false, "targetable"];
    this.explosiveImmunities = [false, "targetable"];
    this.explosiveUpgradedImmunities = [false, "targetable"];
    this.rayImmunities = [false, "targetable"];
    this.rayUpgradedImmunities = [false, "targetable"];
    this.cannonImmunities = [false, "targetable"];
    this.cannonUpgradedImmunities = [false, "targetable"];
    this.bladeStormImmunities = [false, "targetable"];
    this.bladeStormUpgradedImmunities = [false, "targetable"];
    this.liquifyImmunities = [false, "targetable"];
    this.liquifyUpgradedImmunities = [false, "targetable"];
    this.missileImmunities = [false, "targetable"];
    this.missileUpgradedImmunities = [false, "targetable"];

  }

  run() {
    this.render();
    this.update();
  }

  // nextTarget()
  // Return the next cell in the path to the root target
  // The parent of the current cell is always the optimal path
  // If we want some randomness in the path, choose from among all
  // the neighbor cells with a lesser distance to the root.
  nextTarget() {
    if (!this.randomPath)
      return (this.currentCell.parent);    // the parent cell is always the shortest path
    else {  // else choose from cells with a lesser distance to the root
      let candidates = [];
      for (let i = 0; i < this.currentCell.neighbors.length; i++) {
        if (this.currentCell.neighbors[i].dist < this.currentCell.dist)
          candidates.push(this.currentCell.neighbors[i]);
      }
      // randomly pick one of the candidates
      return (candidates[Math.floor(Math.random() * candidates.length)]);
    }
  }
  oppositeNextTarget() {//idk

    if (!this.randomPath)
      return (this.currentCell.parent);    // the parent cell is always the shortest path
    else {  // else choose from cells with a lesser distance to the root
      let candidates = [];
      for (let i = 0; i < this.currentCell.neighbors.length; i++) {
        if (this.currentCell.neighbors[i].dist > this.currentCell.dist)
          candidates.push(this.currentCell.neighbors[i]);
      }
      // randomly pick one of the candidates
      return (candidates[Math.floor(Math.random() * candidates.length)]);
    }
  }


  // render()
  // Draw the enemy at its current location
  // Enemies with a randomized path are blue and
  // enemies with an optimal path are green
  render() {
    var ctx = this.game.context
    if (this.slowed < 1) {
      ctx.save();
      ctx.translate(this.loc.x, this.loc.y)
      ctx.strokeStyle = "rgba(0,0,100,0.4)";
      ctx.beginPath();
      ctx.arc(0, 0, (this.img.width + this.img.height) / 4, 0, Math.PI * 2, false);

      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    }

    ctx.save();

    ctx.translate(this.loc.x, this.loc.y);
    ctx.rotate(this.angle + Math.PI / 2);
    ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
    ctx.restore();

  }

  // update()
  // Calculate a new location for this enemy.
  // If has reached the root cell, kill itmin
  // If it has reached the current target along the path,
  // find a new target and rotate the velocity in the direaction
  // of the new target.
  update() {
    for (let h = 0; h < towerGame.missiles.length; h++) {
      if (this.checkCollide(this, towerGame.missiles[h])) {
        if (towerGame.missiles[h].ability == "missile") {
          if (!this.missileImmunities[0]) {
            this.health -= 800 * towerGame.missiles[h].damageMult;//this does not current work
            towerGame.missiles.splice(h, 1);
          }
        } else if (!this.missileUpgradedImmunities[0]) {
          this.health -= 800 * towerGame.missiles[h].damageMult;//this does not current work
          towerGame.missiles.splice(h, 1);
        }
      }
    }
    for (let h = 0; h < towerGame.hands.length; h++) {
      if (this.checkCollide(this, towerGame.hands[h])) {
        if (towerGame.hands[h].ability == "liquify") {
          if (!this.liquifyImmunities[0]) {
            this.health -= 10 * towerGame.hands[h].damageMult;
          }else if (!this.liquifyUpgradedImmunities[0]){
            this.health -= 10 * towerGame.hands[h].damageMult;
          }

        }
      }
    }
    for (let h = 0; h < towerGame.blades.length; h++) {
      if (this.checkCollide(this, towerGame.blades[h])) {
        if (towerGame.blades[h].ability == "bladeStorm") {
          if (!this.bladeStormImmunities[0]) {
            this.health -= 100 * towerGame.blades[h].damageMult;
          } else if (!this.bladeStormUpgradedImmunities[0]) {
            this.health -= 100 * towerGame.blades[h].damageMult;
          }
        }
      }
    }


    for (let h = 0; h < towerGame.bullets.length; h++) {
      if (this.checkCollide(this, towerGame.bullets[h])) {
        if (towerGame.bullets[h].ability == "normal") {
          if (!towerGame.piercingArrow) {
            if (!this.normalImmunities[0]) {
              this.health = this.health - 500 * towerGame.bullets[h].damageMult;
              towerGame.bullets.splice(h, 1);
            }
          } else {
            if (!this.normalUpgradedImmunities[0]) {
              this.health = this.health - 150 * towerGame.bullets[h].damageMult;
            }
          }
        } else if (towerGame.bullets[h].ability == "fast") {
          if (!this.fastImmunities[0]) {
            this.health = this.health - 350 * towerGame.bullets[h].damageMult;
            towerGame.bullets.splice(h, 1);
          }else if(!this.fastUpgradedImmunities){
            this.health = this.health - 350 * towerGame.bullets[h].damageMult;
            towerGame.bullets.splice(h, 1);
          }
        } else if (towerGame.bullets[h].ability == "freeze") {
          if (!this.freezeImmunities[0]) {
            this.health = this.health - 25 * towerGame.bullets[h].damageMult;
            this.slowed -= 1;
            setTimeout(() => {
              this.slowed = 1.2;
            }, 3500);
          }
          if (!this.freezeUpgradedImmunities[0]) {
            if (towerGame.bullets[h].freezeUpgradeFinal) {
              this.hitByFreezeUpgraded = true;
            }
            setTimeout(() => {
              this.slowed = 1.2;
              this.hitByFreezeUpgraded = false;
            }, 3500);
          }
        } else if (towerGame.bullets[h].ability == "cannon") {
          if (!this.cannonImmunities[0]) {
            this.health = this.health - 500 * towerGame.bullets[h].damageMult;
            towerGame.bullets.splice(h, 1);
          }else if (!this.cannonUpgradedImmunities[0]){
            this.health = this.health - 500 * towerGame.bullets[h].damageMult;
            towerGame.bullets.splice(h, 1);
          }
        } else if (towerGame.bullets[h].ability == "explosive") {
          if (!this.bladestormImmunities[0]) {
            this.health = this.health - 100 * towerGame.bullets[h].damageMult;
            if (this.health <= 0) {
              this.kill = true;
            }
            this.locations = this.loc;
            towerGame.explosiveBullets.push(new Explosives(towerGame.bullets[h].loc, towerGame.bullets[h].ability));

            towerGame.bullets.splice(h, 1);
          }
        }
        else if (towerGame.bullets[h].ability == "explosive") {
          if (!this.explosiveImmunities[0] || !this.explosiveUpgradedImmunities[0]) {
            this.health -= 100 * towerGame.bullets[h].damageMult;
            if (this.health <= 0) {
              this.kill = true;
            }
            this.locations = this.loc;
            towerGame.explosiveBullets.push(new Explosives(towerGame.bullets[h].loc, towerGame.bullets[h].ability));

            towerGame.bullets.splice(h, 1);
          }
        }


      }
    }






    for (let i = 0; i < towerGame.explosiveBullets.length; i++) {
      if (this.loc.dist(towerGame.explosiveBullets[i].loc) < 70) {
        this.health = this.health - 100;
      }
      if (towerGame.explosiveBullets[i].kills == true) {
        towerGame.explosiveBullets.splice(i, 1);
      }
    }


    if (this.health <= 0) {
      this.kill = true;

      this.deathSound.play();
      towerGame.bankValue += 10;

    }

    if (this.loc.dist(this.target) <= this.vel.mag()) { // if we have reached the current target
      this.currentCell = this.targetCell;
      if (this.currentCell == this.game.root) { // we have reached the end of the path
          this.kill = true;
          towerGame.health = towerGame.health - 1;
          return;
      }
      if (!this.hitByFreezeUpgraded) {
          this.targetCell = this.nextTarget(); // set a new target
      } else {
          let random = Math.floor(Math.random() * 5);
          if (random < 3) {
              this.targetCell = this.oppositeNextTarget();
          } else {
              this.targetCell = this.nextTarget();
          }
      }
      if (!this.targetCell) {
          this.kill = true; // can happen if user blocks cells while enemies are attacking
          return;
      }
      this.target = this.targetCell.center; // always target the center of the cell
  } else {
      // calculate new vector from current location to the target.
      var targetVec = this.target.copy().sub(this.loc); // the direction we want to go
      var angleBetween = this.vel.angleBetween(targetVec);
      if (angleBetween) { // if there is some angle between
          if (angleBetween > 0 && angleBetween > Math.PI) // positive and > 180 degrees
              angleBetween = angleBetween - 2 * Math.PI; // make negative and < 180 degrees
          else if (angleBetween < 0 && angleBetween < -Math.PI) // negative and < -180 degrees
              angleBetween = angleBetween = angleBetween + 2 * Math.PI; // make positive and < 180 degrees
  
          // now rotate the current velocity in the direction of the targetAngle
          // a little at a time
          this.vel.rotate(angleBetween / 2);
          this.angle = this.vel.angle();
      }
      if (this.slowed < 1) { //the third guy does this
          this.count++;
          if (this.count == 3) {
              this.loc.add(this.vel); //this make it look extremely jittery
              //I will eventually do a complete overhaul of the velocity to get with better.
              //(proboly after all the other towers are decent)
              this.count = 0;
          }
      } else if (this.slowed > 1) {
          this.loc.add(this.vel);
      } // apply velocity to location
  }
  }
  checkCollide(shape1, shape2) {

    if (shape1.shape === "circle") {
      if (shape2.shape === "circle") {
        //circle-circle
        //console.log(this.dist(shape1.loc, shape2.loc) );
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

} // end class ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//this.normalImmunities = [false, "targetable"];
//false if it can't hit the enemy so false of default means yes you can hit
//targetable is basically if the enemy is immune to the towers attack the tower will still target it unless the targetable
// is set to something that is not targetable


//circle radius slows down enemies
//death explotion of high level enemies has a chance to completely destroy a nearby tower
//basic enemy normal fish
//plankton (lots of tiny ones that die gradually from damage)
//turtle immunities 
//fast shark
//


// this.normalImmunities = [false, "targetable"];
// this.normalUpgradedImmunities = [false, "targetable"];
// this.fastImmunities = [false, "targetable"];
// this.fastUpgradedImmunities = [false, "targetable"];
// this.freezeImmunities = [false, "targetable"];
// this.freezeUpgradedImmunities = [false, "targetable"];
// this.explosiveImmunities = [false, "targetable"];
// this.explosiveUpgradedImmunities = [false, "targetable"];
// this.rayImmunities = [false, "targetable"];
// this.rayUpgradedImmunities = [false, "targetable"];
// this.cannonImmunities = [false, "targetable"];
// this.cannonUpgradedImmunities = [false, "targetable"];
// this.bladeStormImmunities = [false, "targetable"];
// this.bladeStormUpgradedImmunities = [false, "targetable"];
// this.liquifyImmunities = [false, "targetable"];
// this.liquifyUpgradedImmunities = [false, "targetable"];
// this.missileImmunities = [false, "targetable"];
// this.missileUpgradedImmunities = [false, "targetable"];
class Enemy1 extends Enemy {
  constructor(game) {
    super(game);
    this.img = Enemy.image1;
    this.health = 1000;
    this.normalSmallEnemy = true;
  }
}
class Enemy2 extends Enemy {
  constructor(game) {
    super(game);
    this.img = Enemy.image2;
    this.health = 2000;
    this.normalEnemy = true;
  }
}
class Enemy3 extends Enemy {
  constructor(game) {
    super(game);
    this.img = Enemy.image3;
    this.health = 4000;
    this.freezeEnemy = true;
  }
}
class Enemy4 extends Enemy {
  constructor(game) {
    super(game);
    this.img = Enemy.image4;
    this.health = 4000;
    this.explosiveEnemy = true;
  }
}
class Enemy5 extends Enemy {
  constructor(game) {
    super(game)
    this.img = Enemy.image5;
    this.health = 10000;
    this.turtleEnemy = true;
  }
}
