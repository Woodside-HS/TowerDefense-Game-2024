'use strict'

class Tower {
  // issue#1 use preloaded images
  constructor(cost, tImg, bImg, ability) {
    this.isInRange = false;
    this.loc = vector2d(0, 0);
    this.placed = false;
    this.visible = false;
    this.enX = 0;
    this.enY = 0;
    this.cost = cost;
    this.bulletImg = bImg;
    this.towImg = tImg;
    this.towAngle = 0;
    this.lastTime = Date.now();
    this.coolDown = 500;
    towerGame.bankValue = towerGame.bankValue - this.cost;
    this.enemies = towerGame.enemies;
    this.range = 200;
    this.minRange = 0;
    this.blades = 0;
    this.ability = ability;
    this.chooseTargetArea = true;
    this.mouseLoc;
    this.count = 0;
    this.healthPulse = false;
    this.upgradedDamage = false;
    this.upgradedRange = false;
    this.upgradedCoolDown = false;
    this.surroundingHands = 0;
    this.liquifylFinal = false;
    this.creatures = [];
    this.maxSurroundingHands = 0;

    if (ability == "freeze") {
      this.coolDown = 1000;
      this.range = 150;
    }
    else if (ability == "normal" || ability == "explosive") {
      this.coolDown = 750;
    }
    else if (ability == "fast") {
      this.coolDown = 500;
    }
    else if (ability == "cannon") {
      this.coolDown = 1000;
      this.range = 3000;
    }
    else if (ability == "bladeStorm") {
      this.coolDown = 0;
      this.range = 3000;
    }
    else if (ability == "buffregen") {
      this.coolDown = 19622;//why is this such a random number
      this.buffConstant = 0.8; //multiply cooldown by buffConstant
    }
    else if (ability == "missile") {
      this.range = 800;
      this.minRange = this.range / 3;
      this.coolDown = 1000 / 6;

    } else if (ability == "liquify") {
      this.range = 800;
      this.coolDown = 1000;
    }
    this.MaxCoolDown = this.coolDown;

    this.target = null;
    this.enemy = null;
  }

  run() {
    this.render();
    this.update();
    if (this.liquifylFinal == false) {
      this.liquifylFinalUpgrade();
    }
  }

  damageUpgrade() {
    this.damageMult *= 1.2;
  }
  coolDownUpgrade() {
    this.coolDown *= 0.8;
  }
  rangeUpgrade() {
    this.range *= 1.2;

  }
  finalUpgrade(ability) {
    if (ability == "normal") {
      this.normalFinalUpgrade();
    } else if (ability == "fast") {

    } else if (ability == "freeze") {

    } else if (ability == "explosive") {

    } else if (ability == "ray") {

    } else if (ability == "cannon") {

    } else if (ability == "bladeStorm") {

    } else if (ability == "liquify") {
      this.liquifylFinal = true;
    } else if (ability == "missile") {
      towerGame.straighterShooting = true;
      towerGame.damageMult *= 1.3;
    } else if (ability == "buffregen") {
      this.healthPulse = true;
    }
  }
  normalFinalUpgrade() {

  }
  liquifylFinalUpgrade() {
    for (let i = 0; i < towerGame.hands.length; i++) {
      this.surroundingHands = 0;
      this.creatures.push(towerGame.hands[i]);
      for (let j = 0; j < towerGame.hands.length; j++) {
        if (!(j == i)) {
          let dist = towerGame.hands[i].loc.dist(towerGame.hands[j].loc);
          if (dist < 80) {
            this.surroundingHands++;
            this.creatures.push(towerGame.hands.push(j));
          }
        }
      }

      if (this.surroundingHands > 5) {

        let distToCell = 100000;
        let checkDistToCell = 0;
        for (let i = 0; i < 18; i++) {
          for (let j = 0; j < 15; j++) {
            checkDistToCell = this.creatures[0].loc.dist(towerGame.grid[i][j].center);
            let legalSpot = towerGame.canAddTower(towerGame.grid[i][j]);
            if (checkDistToCell < distToCell && legalSpot) {
              let closestCell = towerGame.grid[i][j];
            }
          }
        }

      }
    }

  }

  render() {
    var ctx = towerGame.context;
    if (this.ability == "buffregen") {
      ctx.save();
      ctx.translate(this.loc.x, this.loc.y);
      ctx.strokeStyle = "rgba(0,250,210, 0.8)";
      ctx.fillStyle = "rgba(0, 250, 210, 0.08)";

      ctx.beginPath();
      ctx.arc(0, 0, this.range, 0, Math.PI * 2, false);

      ctx.closePath();
      ctx.stroke();
      ctx.fill();


      ctx.restore();
    }
    if (this.ability == "cannon" && this.chooseTargetArea) {
      ctx.save();
      ctx.strokeStyle = "rgba(0,250,210, 0.8)";
      ctx.fillStyle = "rgba(0, 250, 210, 0.08)";

      ctx.beginPath();
      this.target = vector2d(towerGame.canvas.mouseX, towerGame.canvas.mouseY)
      ctx.arc(this.target.x, this.target.y, 120, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      ctx.restore();
    }
    ctx.save();

    // Translate to the location
    ctx.translate(this.loc.x, this.loc.y);

    // Rotate if needed
    ctx.rotate(this.towAngle + Math.PI / 2);

    // Check if not placed and x location is not zero
    if (!this.placed && this.loc.x !== 0) {
      // Begin a new path
      ctx.beginPath();

      // Draw the outer circle
      if (this.ability != "bladeStorm") {
        ctx.arc(0, 0, this.range, 0, 2 * Math.PI, false);
      } else {
        ctx.arc(0, 0, 80, 0, 2 * Math.PI, false);//dont question it
        //you got questioned this just look 
      }

      // Draw the inner circle for minRange
      ctx.moveTo(0 + this.minRange, 0); // Move to the starting point of the inner circle
      ctx.arc(0, 0, this.minRange, 0, 2 * Math.PI, false); // Draw the inner circle

      ctx.fillStyle = 'rgba(192, 192, 192, 0.5)';

      ctx.fill();
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#003300';

      ctx.stroke();
    }

    // Restore the saved context state
    if (this.visible) { //  not visible when first created
      ctx.drawImage(this.towImg, -this.towImg.width / 2, -this.towImg.height / 2);
    }
    ctx.restore();
  }

  update() {

    //  Rotate turret to follow mouse
    this.enemy = this.findEnemy()
    if (this.enemy) {
      this.target = this.enemy.loc;
      if (this.ability == "missile" || this.ability == "cannon") {
        let dx = this.loc.x - this.target.x;
        let dy = this.loc.y - this.target.y;
        let dist = vector2d(dx, dy).length();
        if (dist < this.minRange) {
          this.target = vector2d(towerGame.canvas.mouseX, towerGame.canvas.mouseY)
        }
      }
    } else {
      this.target = vector2d(towerGame.canvas.mouseX, towerGame.canvas.mouseY)
    }
    if (this.ability != "missile" && this.ability != "cannon") {
      let dx = this.loc.x - this.target.x;
      let dy = this.loc.y - this.target.y;
      this.towAngle = Math.atan2(dy, dx) - Math.PI;
    } else {

      towerGame.canvas.addEventListener('click', () => {
        if (this.count == 0) {
          this.count += 1;
          return;
        }


        let mouseLoc = vector2d(towerGame.canvas.mouseX, towerGame.canvas.mouseY);
        let dist = this.loc.dist(mouseLoc);
        if (this.chooseTargetArea) {
          this.chooseTargetArea = false;
          this.mouseLoc = mouseLoc;
          towerGame.allowPlace = true;
        }
        if (this.isInRange) {
          this.isInRange = false;
        }
        if (dist < 40) {
          this.isInRange = true;
          this.chooseTargetArea = true;
          towerGame.allowPlace = false;

        }
        towerGame.canvas.addEventListener('mousemove', () => {
          if (this.isInRange) {
            let mouseX = this.loc.x - towerGame.canvas.mouseX;
            let mouseY = this.loc.y - towerGame.canvas.mouseY;
            this.towAngle = Math.atan2(mouseY, mouseX) - Math.PI;

          }
        });
      });

    }




    this.checkEnemies();
    this.checkBuffandHeal();
  }
  checkBuffandHeal() {//buffregen tower stackable currently 
    let count = 0;
    if (this.ability != "buffregen") {
      for (let i = 0; i < towerGame.towers.length; i++) {
        if (towerGame.towers[i].ability == "buffregen") {
          let dist = this.loc.dist(towerGame.towers[i].loc);
          if (dist < this.range) {
            count++;
          }
        }
        if (count > 0) {
          towerGame.towers[i].coolDown = towerGame.towers[i].MaxCoolDown * this.buffConstant ^ (count);
        }
      }
    }
  }





  checkEnemies() {
    let dx = this.loc.x - this.target.x;
    let dy = this.loc.y - this.target.y;
    let dist = vector2d(dx, dy).length();
    let millis = Date.now();
    if (this.placed &&
      dist < this.range &&
      dist > this.minRange &&
      (millis - this.lastTime > this.coolDown) && towerGame.enemies.length != 0 && this.target.x != towerGame.canvas.mouseX) {
      // reset lastTime to current time
      this.lastTime = millis;
      let bulletLocation = vector2d(this.loc.x, this.loc.y);
      let b = new Bullet(bulletLocation, this.bulletImg, this.towAngle, this.ability, this.mouseLoc, this.loc);
      let q = new Missile(bulletLocation, this.bulletImg, this.towAngle, this.ability);
      let h = new Liquify(bulletLocation, this.bulletImg, this.towAngle, this.ability);
      if (this.ability == "fast" || this.ability == "normal"
        || this.ability == "freeze" || this.ability == "explosive" || this.ability == "cannon") {
        towerGame.bullets.push(b);

      }
      if (this.ability == "buffregen" && this.healthPulse) {
        if (towerGame.health < 150) {
          towerGame.health++;//the tower that buff sorrunding towers also ups healing bc idk why
        }

      }
      if (this.ability == "missile") {
        towerGame.missiles.push(q);
      }
      if (this.ability == "liquify") {
        towerGame.hands.push(h);
      }
      if (this.ability == "bladeStorm") {
        if (this.blades != 4) {//creating the four blades 
          let bulletLocation = vector2d(this.loc.x, this.loc.y);
          let s = new Blade(bulletLocation, this.bulletImg, this.towAngle, this.ability, this.blades);
          towerGame.blades.push(s);
          this.blades++;
        }
      }
    }




    if (this.ability == "ray" && towerGame.enemies.length != 0) {//I will fix this code eventually
      var a3 = this.loc.x - this.target.x;
      var b3 = this.loc.y - this.target.y;
      var k = Math.sqrt(a3 * a3 + b3 * b3);
      if (k < 300 && towerGame.enemies.length != 0 && this.target.x != towerGame.canvas.mouseX) {
        var rys = new LockOn(this.loc, this.target);
        rys.run();
        if (this.findEnemyIndex() < towerGame.enemies.length) {

          towerGame.enemies[this.findEnemyIndex()].isLocked = true;//health -=  10;
        } else {
          towerGame.rays = [];
        }
      }
    }
  }
  findEnemyIndex() {
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].loc.dist(this.loc) < this.range) {
        return i;
      }
    }
  }
  findEnemy() {
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i].loc.dist(this.loc) < this.range &&
        this.enemies[i].loc.dist(this.loc) > this.minRange) {
        return this.enemies[i];
      }
    }
  }

}//  end Tower class +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
