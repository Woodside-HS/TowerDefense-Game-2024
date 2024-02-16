class Enemy {

  constructor(game) {
    this.game = game;
    this.currentCell = this.game.grid[0][0];
    this.loc = this.currentCell.center.copy();
    this.randomPath = 0;   //boolean to randomize or not
    this.radius = 15.0;
    this.r = 3.0;
    this.vel = 3.0;
    this.slowed = 1.2;
    this.isLocked = false;
    this.isTarget = false;
    this.deathSound = new Audio('resources/sounds/splat.mp3');
    this.lastTime = Date.now();
    this.coolDown = 1000;
    this.towerLoc = vector2d(0, 0);
    this.increasedDamg = 20;
    this.health = 1000;
    this.damages = 0;
    this.targetCell = this.nextTarget();
    this.target = this.targetCell.center;
    this.shape = "circle";
    var targetVec = this.target.copy().sub(this.loc);
    this.velVec = targetVec.copy().normalize().scale(this.vel);      // initial velocity vector
    this.kill = false;
    this.angle = this.velVec.angle()

    this.img = Enemy.image3;// image for enemy


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
  oppositeNextTarget(){//idk

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
    let millis = Date.now();
    for (let h = 0; h < towerGame.missiles.length; h++) {
      if (this.checkCollide(this, towerGame.missiles[h])) {
        console.log(towerGame.missiles[h].ability)
        if (towerGame.missiles[h].ability == "missile") {
          this.health -= 800;//this does not current work
          towerGame.missiles.splice(h, 1);
        }
      }
    }
    for (let h = 0; h < towerGame.hands.length; h++) {
      if (this.checkCollide(this, towerGame.hands[h])) {
        if (towerGame.hands[h].ability == "liquify") {
            this.health -= 10;


        }
      }
    }
    for (let h = 0; h < towerGame.blades.length; h++) {
      if (this.checkCollide(this, towerGame.blades[h])) {
        if (towerGame.blades[h].ability == "bladeStorm") {
            this.health -= 100;


        }
      }
    }


    for (let h = 0; h < towerGame.bullets.length; h++) {
      if (this.checkCollide(this, towerGame.bullets[h])) {
        if (towerGame.bullets[h].ability == "normal") {
          this.health = this.health - 500;
          towerGame.bullets.splice(h, 1);
        } else if (towerGame.bullets[h].ability == "fast") {
          this.health = this.health - 350;

          towerGame.bullets.splice(h, 1);
        } else if (towerGame.bullets[h].ability == "freeze") {
          this.health = this.health - 10;
          this.slowed -= 0.1;
          setTimeout(() => {
            this.slowed = 1.2;
          }, 5000);
        } else if (towerGame.bullets[h].ability == "cannon"){
          this.health -= 250;
        
        }
        else if (towerGame.bullets[h].ability == "explosive") {
          this.health -= 100;
          if (this.health <= 0) {
            this.kill = true;
          }
          this.locations = this.loc;
          towerGame.explosiveBullets.push(new Explosives(towerGame.bullets[h].loc));

          towerGame.bullets.splice(h, 1);
        }


      }
    }

    if (this.isLocked) {
      this.damages = this.damages + this.increasedDamg;
      this.health = this.health - this.increasedDamg;
    }



    for (let i = 0; i < towerGame.explosiveBullets.length; i++) {
      if (this.loc.dist(towerGame.explosiveBullets[i].loc) < 70) {
        this.health = this.health - 100;
      }
      if (towerGame.explosiveBullets[i].kills == true) {
        towerGame.explosiveBullets.splice(i, 1);
        console.log("die");
      }
    }




    //  console.log(this.health);
    if (this.health <= 0) {
      this.kill = true;

      this.deathSound.play();
      towerGame.bankValue += 10;

      //console.log("kills");
    }

    if (this.loc.dist(this.target) <= this.vel) {    // if we have reached the current target
      this.currentCell = this.targetCell;
      if (this.currentCell == this.game.root) {   // we have reached the end of the path
        this.kill = true;
        towerGame.health = towerGame.health - 1;
        return;
      }
      this.targetCell = this.nextTarget();                  // set a new target
      if (!this.targetCell) {
        this.kill = true;   // can happen if user blocks cells while enemies are attacking
        return;
      }
      this.target = this.targetCell.center;      // always target the center of the cell
    }
    // calculate new vector from current location to the target.
    var targetVec = this.target.copy().sub(this.loc);    // the direction we want to go
    var angleBetween = this.velVec.angleBetween(targetVec);
    if (angleBetween) {  // if there is some angle between
      if (angleBetween > 0 && angleBetween > Math.PI)  // positive and > 180 degrees
        angleBetween = angleBetween - 2 * Math.PI;   // make negative and < 180 degrees
      else if (angleBetween < 0 && angleBetween < -Math.PI)   // negative and < -180 degrees
        angleBetween = angleBetween = angleBetween + 2 * Math.PI;  // make positive and < 180 degrees

      // now rotate the current velocity in the direction of the targetAngle
      // a little at a time
      this.velVec.rotate(angleBetween / 2);
      this.angle = this.velVec.angle();
    }
    if (this.slowed < 1) {//the third guy does this
      this.count++;
      if (this.count == 3) {
        this.loc.add(this.velVec)//this make it look extremely jittery 
        //I will eventually do a complete overhaul of the velocity to get with better.
        //(proboly after all the other towers are decent)
        this.count = 0;
      }
    } else if (this.slowed > 1) {
      this.loc.add(this.velVec);
    }          // apply velocity to location
  }

  checkCollide(shape1, shape2) {

    if (shape1.shape === "circle") {
      if (shape2.shape === "circle") {
        //circle-circle
        //console.log(this.dist(shape1.loc, shape2.loc) );
        if (shape1.r + shape2.r >= shape1.loc.copy().dist(shape2.loc)) return true;
        return false;
      } else if (shape2.shape === "square") {
        //circle-square
        let topLeft = shape2.loc;
        let topRight = new vector2d(shape2.loc.x + shape2.w, shape2.loc.y);
        let bottomRight = new vector2d(shape2.loc.x + shape2.w, shape2.loc.y + shape2.w);
        let bottomLeft = new vector2d(shape2.loc.x, shape2.loc.y + shape2.w);
        let dist1 = vector2d.dist5(topLeft, shape1.loc);
        let dist2 = vector2d.dist5(topRight, shape1.loc);
        let dist3 = vector2d.dist5(bottomRight, shape1.loc);
        let dist4 = vector2d.dist5(bottomLeft, shape1.loc);
        if (dist1 <= shape1.r || dist2 <= shape1.r || dist3 <= shape1.r || dist4 <= shape1.r) return true;
        return false;
      } else if (shape2.shape === "point") {
        //circle-point
        if (shape1.r >= this.dist(shape1.loc, shape2.loc)) return true;
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
        let dist1 = vector2d.dist5(topLeft, shape2.loc);
        let dist2 = vector2d.dist5(topRight, shape2.loc);
        let dist3 = vector2d.dist5(bottomRight, shape2.loc);
        let dist4 = vector2d.dist5(bottomLeft, shape2.loc);
        if (dist1 <= shape2.r || vector2d.dist2 <= shape2.r || dist3 <= shape2.r || dist4 <= shape2.r) return true;
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
        if (shape2.r >= vector2d.dist(shape2.loc, shape1.loc)) return true;
        return false;
      } else if (shape2.shape === "square") {
        //point-square
      } else if (shape2.shape === "point") {
        //point-point
        if (vector2d.dist(shape2.loc, shape1.loc) < 1) return true;
        return false;
      } else {
        throw "shape2 shape not acceptable.";
      }
    } else {
      throw "shape1 shape not acceptable.";
    }


  }

} // end class ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
class Enemy1 extends Enemy {
  constructor(game) {
    super(game)
    this.randomPath = 1
    this.img = Enemy.image1
  }
}
class Enemy2 extends Enemy {
  constructor(game) {
    super(game)
    this.img = Enemy.image2
  }
}
class Enemy3 extends Enemy {
  constructor(game) {
    super(game)
    this.img = Enemy.image3
    this.health = 5000
  }
}
class Enemy4 extends Enemy {
  constructor(game) {
    super(game)
    this.img = Enemy.image4
    this.health = 15000
  }
}
class Enemy5 extends Enemy {
  constructor(game) {
    super(game)
    this.img = Enemy.image5
    this.health = 1000000000000000000
  }
}
