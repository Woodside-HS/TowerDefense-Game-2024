class Enemy {

  constructor(game, enemyNumber, parent, summon) {
    console.log(towerGame.numWave)
    this.game = game;
    this.parent = parent;
    this.summoned = summon;
    this.summoningEffect = false;
    this.exploding = false;
    this.explodingAfterMath = false;
    this.explodingAfterMathGrowth = 0;
    this.countDown = 400;
    this.type = enemyNumber + 1;
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
    if (this.type == 1) {
      this.img = Enemy.image1;
      this.health = 2000;
      this.normalEnemy = true; //orange guy
      this.speed = 2; this.baseSpeed = this.speed;
    } else if (this.type == 2) {
      this.img = Enemy.image2;
      this.health = 1000;
      this.normalFastEnemy = true; //blue guy
      this.speed = 3; this.baseSpeed = this.speed;
    } else if (this.type == 3) {
      this.img = Enemy.image3;
      this.health = 4000;
      this.dolphinEnemy = true; //Dolphin
      //this is either the last I will do or not do it at all.
      this.speed = 1; this.baseSpeed = this.speed;
    } else if (this.type == 4) {
      this.img = Enemy.image4;
      this.health = 3000;
      this.speedUpSurroundingEnemy = true;//shark
      this.speed = 1; this.baseSpeed = this.speed;
    } else if (this.type == 5) {
      this.img = Enemy.image5;
      this.health = 1500;
      this.freezeEnemy = true;//blue jellyfish
      this.renderFreezeAura = true;
      this.speed = 1.5; this.baseSpeed = this.speed;
    } else if (this.type == 6) {
      this.img = Enemy.image6;
      this.health = 1000;
      this.flyingEnemy = true;//flying fish
      this.speed = 1; this.baseSpeed = this.speed;
    } else if (this.type == 7) {
      this.img = Enemy.image7;
      this.health = 2000;
      this.stealthEnemy = true; // octopus
      this.timeSinceSpawn = 0;
      this.normalImmunities = [false, "untargetable"];
      this.normalUpgradedImmunities = [false, "untargetable"];
      this.fastImmunities = [false, "untargetable"];
      this.fastUpgradedImmunities = [false, "untargetable"];
      this.freezeImmunities = [false, "untargetable"];
      this.freezeUpgradedImmunities = [false, "untargetable"];
      this.explosiveImmunities = [false, "untargetable"];
      this.explosiveUpgradedImmunities = [false, "untargetable"];
      this.rayImmunities = [false, "untargetable"];
      this.rayUpgradedImmunities = [false, "untargetable"];
      this.cannonImmunities = [false, "untargetable"];
      this.cannonUpgradedImmunities = [false, "untargetable"];
      this.bladeStormImmunities = [false, "untargetable"];
      this.bladeStormUpgradedImmunities = [false, "untargetable"];
      this.liquifyImmunities = [false, "untargetable"];
      this.liquifyUpgradedImmunities = [false, "untargetable"];
      this.missileImmunities = [false, "untargetable"];
      this.missileUpgradedImmunities = [false, "untargetable"];
      this.visible = false;
      this.speed = 1; this.baseSpeed = this.speed;
    } else if (this.type == 8) {
      this.img = Enemy.image8;
      this.health = 4000;
      this.normalImmunities = [false, "untargetable"];
      this.normalUpgradedImmunities = [false, "untargetable"];
      this.fastImmunities = [false, "untargetable"];
      this.fastUpgradedImmunities = [false, "untargetable"];
      this.freezeImmunities = [false, "untargetable"];
      this.freezeUpgradedImmunities = [false, "untargetable"];
      this.explosiveImmunities = [false, "targetable"];
      this.explosiveUpgradedImmunities = [false, "targetable"];
      this.rayImmunities = [false, "targetable"];
      this.rayUpgradedImmunities = [false, "targetable"];
      this.cannonImmunities = [false, "untargetable"];
      this.cannonUpgradedImmunities = [false, "untargetable"];
      this.bladeStormImmunities = [false, "untargetable"];
      this.bladeStormUpgradedImmunities = [false, "untargetable"];
      this.liquifyImmunities = [false, "untargetable"];
      this.liquifyUpgradedImmunities = [false, "untargetable"];
      this.missileImmunities = [false, "untargetable"];
      this.missileUpgradedImmunities = [false, "untargetable"];
      this.shieldedEnemy = true;//turtle
      this.speed = 1; this.baseSpeed = this.speed;
    } else if (this.type == 9) {
      this.img = Enemy.image9;
      this.health = 4000;
      this.summonerEnemy = true;//frog 
      this.nextSpawn = 0;
      this.speed = 0.5; this.baseSpeed = this.speed;
    } else if (this.type == 10) {
      this.img = Enemy.image10;
      this.health = 10000;
      this.bombEnemy = true;//starfish
      this.speed = 1; this.baseSpeed = this.speed;
    }
    // currentCell is the start position of the enemies
    this.currentCell = [1][1];
    for (let row = 0; row < this.game.levelKey.length; row++) {
      for (let col = 0; col < this.game.levelKey[0].length; col++) {
        if (this.game.levelKey[row][col] === 's') {
          this.currentCell = this.game.grid[col][row];
        }
      }
    }
    if (!this.summoned) {
      this.loc = this.currentCell.center.copy();
    } else {
      this.loc = this.parent.currentCell.center.copy();
    }
    this.randomPath = 1;   //boolean to randomize or not
    this.radius = 15.0;
    this.r = 15.0;
    this.vel = vector2d(0, 0); // Initialize velocity vector
    this.count = 0;
    this.slowed = 1.2;
    this.isLocked = false;
    this.isTarget = false;
    this.deathSound = new Audio('TowerGameJS-Phase4/resources/sounds/splat.mp3');
    this.lastTime = Date.now();
    this.health;
    this.renderFreezeAura = false;
    this.damages = 0;
    if (!this.flyingEnemy && !this.summoned) {
      this.targetCell = this.nextTarget();
    } else if (this.flyingEnemy) {
      this.targetCell = this.nextTargetForFlyingEnemy();
    } else {
      this.targetCell = this.parent.targetCell;
    }
    this.target = this.targetCell.center;
    this.shape = "circle";
    this.kill = false;
    this.angle = this.vel.angle();
    this.img; // image for enemy
    this.hitByFreezeUpgraded = false;
    this.movement = new Movement(this.loc, this.target, this.speed);
    this.deathTimer = null;



    this.clr1 = this.randomColor();
    this.clr2 = this.randomColor();
  }

  run() {
    this.render();
    this.update();
    this.specificEnemyUpgrade();
  }


  randomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    return 'rgba(' + red + ',' + green + ',' + blue + ',' + 1 + ')';
  }
  specificEnemyUpgrade() {
    if (this.normalEnemy) {
      //probably will be nothing
    }

    if (this.normalFastEnemy) {
      //probably will be nothing
    }

    if (this.dolphinEnemy) {

    }
    if (this.speedUpSurroundingEnemy) {
      for (let i = 0; i < towerGame.enemies.length; i++) {
        if (this != towerGame.enemies[i]) {
          let distToEnemy = this.loc.dist(towerGame.enemies[i].loc);
          if (distToEnemy < 120) {
            towerGame.enemies[i].movement.speed = 1.5 * towerGame.enemies[i].baseSpeed;

          } else {
            towerGame.enemies[i].movement.speed = towerGame.enemies[i].baseSpeed;
          }
        }
      }
    }
    if (this.freezeEnemy) {
      for (let i = 0; i < towerGame.towers.length; i++) {
        let distToTower = this.loc.dist(towerGame.towers[i].loc);
        if (distToTower < 120) {
          towerGame.towers[i].coolDown = towerGame.towers[i].maxCoolDown * 2;
        } else {
          towerGame.towers[i].coolDown = towerGame.towers[i].maxCoolDown;
        }

      }
    }

    if (this.flyingEnemy) {

    }

    if (this.stealthEnemy) {
      this.timeSinceSpawn++;

      if (this.timeSinceSpawn > 500) {
        //  console.log(this.timeSinceSpawn)
        this.visible = true;
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
    }

    if (this.shieldedEnemy) {

    }

    if (this.summonerEnemy) {
      this.nextSpawn++;
      if (this.nextSpawn > 600) {
        this.summomingEffect = true;
        this.movement.speed = 0;
      }
      if (this.nextSpawn > 1500) {
        let randomSummon = Math.round(Math.random() * 7);
        towerGame.enemies.push(new Enemy(towerGame, randomSummon, this, true));
        towerGame.enemies[towerGame.enemies.length - 1].loc;
        this.summomingEffect = false;
        this.nextSpawn = 0;
        this.movement.speed = this.baseSpeed;

      }
    }

    if (this.bombEnemy) {
      if (this.kill || this.exploding) {
        this.normalImmunities = [true, "untargetable"];
        this.normalUpgradedImmunities = [true, "untargetable"];
        this.fastImmunities = [true, "untargetable"];
        this.fastUpgradedImmunities = [true, "untargetable"];
        this.freezeImmunities = [true, "untargetable"];
        this.freezeUpgradedImmunities = [true, "untargetable"];
        this.explosiveImmunities = [true, "untargetable"];
        this.explosiveUpgradedImmunities = [true, "untargetable"];
        this.rayImmunities = [true, "untargetable"];
        this.rayUpgradedImmunities = [true, "untargetable"];
        this.cannonImmunities = [true, "untargetable"];
        this.cannonUpgradedImmunities = [true, "untargetable"];
        this.bladeStormImmunities = [true, "untargetable"];
        this.bladeStormUpgradedImmunities = [true, "untargetable"];
        this.liquifyImmunities = [true, "untargetable"];
        this.liquifyUpgradedImmunities = [true, "untargetable"];
        this.missileImmunities = [true, "untargetable"];
        this.missileUpgradedImmunities = [true, "untargetable"];
        this.exploding = true;
        this.movement.speed = 0;
        if(this.countDown >= 1){
        this.countDown--;
        }
        if (this.countDown <= 0 && !this.explodingAfterMath) {
          for (let i = 0; i < towerGame.towers.length; i++) {
            let distToTower = this.loc.dist(towerGame.towers[i].loc);
        
            if (distToTower < 120) {
              let doDestroyTower = Math.round(Math.random()*3);
              if (doDestroyTower == 3) {
                towerGame.towers.splice(i, 1);
              }
            }
          }
          this.exploding = false;
          this.explodingAfterMath = true;
        }
      }
    }

  }
  // nextTarget()
  // Return the next cell in the path to the root target
  // The parent of the current cell is always the optimal path
  // If we want some randomness in the path, choose from among all
  // the neighbor cells with a lesser distance to the root.
  nextTarget() {


    let candidates = [];
    for (let i = 0; i < this.currentCell.neighbors.length; i++) {
      if (this.currentCell.neighbors[i].dist < this.currentCell.dist)
        candidates.push(this.currentCell.neighbors[i]);
    }
    // randomly pick one of the candidates
    return candidates[Math.floor(Math.random() * candidates.length)];

  }
  nextTargetForFlyingEnemy() {
    return this.game.root;
  }

  oppositeNextTarget() {


    let candidates = [];
    for (let i = 0; i < this.currentCell.neighbors.length; i++) {
      if (this.currentCell.neighbors[i].dist > this.currentCell.dist)
        candidates.push(this.currentCell.neighbors[i]);
    }
    // randomly pick one of the candidates
    return candidates[Math.floor(Math.random() * candidates.length)];
  }


  // render()
  render() {
    let ctx = this.game.context;

    ctx.save();
    if (this.visible == false) {
      ctx.globalAlpha = 0.3;
    }
    ctx.translate(this.loc.x, this.loc.y)
    ctx.rotate(this.angle - Math.PI / 2);
    ctx.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
    ctx.globalAlpha = 1.0;
    ctx.restore();

    if (this.slowed < 1) {
      ctx.save();
      ctx.translate(this.loc.x, this.loc.y);
      ctx.strokeStyle = "rgba(0,0,100,0.4)";
      ctx.beginPath();
      ctx.arc(0, 0, (this.img.width + this.img.height) / 4, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    if (this.renderFreezeAura) {
      ctx.save();
      ctx.translate(this.loc.x, this.loc.y);
      ctx.strokeStyle = "rgba(0, 0, 255, 1)";
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.arc(0, 0, 120, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }

    if (this.summomingEffect) {
      ctx.save();
      ctx.translate(this.targetCell.center.x, this.targetCell.center.y);
      let gradient = ctx.createLinearGradient(-this.img.width / 2, -this.img.height / 2, this.img.width / 2, this.img.height / 2);
      gradient.addColorStop(0, this.clr1);
      gradient.addColorStop(1, this.clr2);
      ctx.strokeStyle = gradient;
      ctx.beginPath();
      ctx.lineWidth = 2;
      let length = 60;
      ctx.arc(0, 0, length, 0, Math.PI * 2, false);

      ctx.moveTo(-length / 2, -length / 2);
      ctx.arc(-length / 2, -length / 2, length / 4, Math.PI * 2, false);

      ctx.moveTo(length / 2, -length / 2);
      ctx.arc(length / 2, -length / 2, length / 4, Math.PI * 2, false);

      ctx.moveTo(length / 2, length / 2)
      ctx.arc(length / 2, length / 2, length / 4, Math.PI * 2, false);

      ctx.moveTo(-length / 2, length / 2)
      ctx.arc(-length / 2, length / 2, length / 4, Math.PI * 2, false);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

    }

    if (this.exploding) {
      ctx.save();
      ctx.translate(this.loc.x, this.loc.y);
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.fillStyle = 'rgba(255, 0, 0, 0.2';
      ctx.beginPath();
      
      ctx.arc(0, 0, 60 - (Math.abs(this.countDown*3/20 - 55)), 0, Math.PI * 2, false);
      
      ctx.closePath();
      ctx.stroke();
      ctx.fill();
      ctx.restore();

    }
    if(this.explodingAfterMath){
      ctx.save();
      ctx.translate(this.loc.x, this.loc.y);
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
      ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
      ctx.beginPath();
      ctx.arc(0, 0, this.explodingAfterMathGrowth, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.stroke();
      ctx.fill()
      ctx.restore();
      this.explodingAfterMathGrowth++;
    }
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
            this.health -= 800 * towerGame.missiles[h].damageMult;
            towerGame.missiles.splice(h, 1);
          }
        } else if (!this.missileUpgradedImmunities[0]) {
          this.health -= 800 * towerGame.missiles[h].damageMult;
          towerGame.missiles.splice(h, 1);
        }
      }
    }
    for (let h = 0; h < towerGame.hands.length; h++) {
      if (this.checkCollide(this, towerGame.hands[h])) {
        if (towerGame.hands[h].ability == "liquify") {
          if (!this.liquifyImmunities[0]) {
            this.health -= 10 * towerGame.hands[h].damageMult;
          } else if (!this.liquifyUpgradedImmunities[0]) {
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
              this.health = this.health - 750 * towerGame.bullets[h].damageMult;
              towerGame.bullets.splice(h, 1);
            }
          } else {
            if (!this.normalUpgradedImmunities[0]) {
              this.health = this.health - 150 * towerGame.bullets[h].damageMult;
            }
          }
        } else if (towerGame.bullets[h].ability == "fast") {
          if (!this.fastImmunities[0]) {
            this.health = this.health - 500 * towerGame.bullets[h].damageMult;
            towerGame.bullets.splice(h, 1);
          } else if (!this.fastUpgradedImmunities) {
            this.health = this.health - 500 * towerGame.bullets[h].damageMult;
            towerGame.bullets.splice(h, 1);
          }
        } else if (towerGame.bullets[h].ability == "freeze") {
          if (!this.freezeImmunities[0]) {
            this.health = this.health - 25 * towerGame.bullets[h].damageMult;
            this.slowed -= 1;
            this.movement.speed = this.baseSpeed * 0.3;
            setTimeout(() => {
              this.slowed = 1.2;
              this.speed = this.baseSpeed;
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
          } else if (!this.cannonUpgradedImmunities[0]) {
            this.health = this.health - 500 * towerGame.bullets[h].damageMult;
            towerGame.bullets.splice(h, 1);
          }
        } else if (towerGame.bullets[h].ability == "explosive") {
          if (!this.explosiveImmunities[0]) {
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
    if (this.isLocked) {
      setTimeout(() => {
        this.kill = true;
      }, this.deathTimer);
    }

    // Handle reaching target and updating path
    if (this.health <= 0) {
      this.kill = true;
      this.deathSound.play();
      towerGame.bankValue += (10*this.type);
    }
    this.movement.update();
    let dx = this.targetCell.center.x - this.loc.x;
    let dy = this.targetCell.center.y - this.loc.y;

    // Calculate angle of rotation
    this.angle = Math.atan2(dy, dx);
    if (this.movement.finished) {
      this.currentCell = this.targetCell;
      if (!this.flyingEnemy) {
        this.targetCell = this.nextTarget();

        if (this.currentCell == this.game.root) {
          this.kill = true;
          towerGame.health--;
          return;
        }
        if (!this.targetCell) {
          this.kill = true;   // can happen if user blocks cells while enemies are attacking
          return;
        }
        this.target = this.targetCell.center;
        this.movement.setTarget(this.loc, this.target);
      } else {
        this.targetCell = this.game.root;
        if (this.currentCell == this.game.root) {
          this.kill = true;
          towerGame.health--;
          return;
        }
        if (!this.targetCell) {
          this.kill = true;   // can happen if user blocks cells while enemies are attacking
          return;
        }
        this.target = this.targetCell.center;
        this.movement.setTarget(this.loc, this.target);
      }
    }

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
}

// end class ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


