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
    this.ability = ability;
    if (ability == "freeze") {
      this.coolDown = 100;
      this.range = 150;
    }
    else if (ability == "normal" || ability == "explosive") {
      this.coolDown = 750;
    }
    else if (ability == "fast") {
      this.coolDown = 500;
    }
    else if (ability == "buffregen") {
      this.coolDown = 19622;//why is this such a random number
      this.buffConstant = 0.8; //multiply cooldown by buffConstant
    }
    else if (ability == "missile") {
      this.range = 800;
      this.minRange = this.range / 3;
      this.coolDown = 1000 / 6;

    }
    this.MaxCoolDown = this.coolDown;

    this.target = null;
    this.enemy = null;
  }

  run() {
    this.render();
    this.update();
  }

  render() {
    var ctx = towerGame.context;
    if (this.ability == "buffregen") {
      ctx.save();
      ctx.translate(this.loc.x, this.loc.y)
      ctx.strokeStyle = "rgba(0,250,210, 0.8)"
      ctx.fillStyle = "rgba(0, 250, 210, 0.08)"

      ctx.beginPath();
      ctx.arc(0, 0, this.range, 0, Math.PI * 2, false);

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
      ctx.arc(0, 0, this.range, 0, 2 * Math.PI, false);

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
      if (this.ability == "missile") {
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
    if (this.ability != "missile") {
      console.log(this.loc)
      let dx = this.loc.x - this.target.x;
      let dy = this.loc.y - this.target.y;
      this.towAngle = Math.atan2(dy, dx) - Math.PI;
    } else {

     

      towerGame.canvas.addEventListener('click', () => {
        let mouseLoc = vector2d(towerGame.canvas.mouseX, towerGame.canvas.mouseY);
        let dist = this.loc.dist(mouseLoc)
        if(this.isInRange){
          this.isInRange = false;
        }
         if (dist < 80) {
          this.isInRange = true;
        }
      

      towerGame.canvas.addEventListener('mousemove', (event) => {
        if (this.isInRange) {
        // let mouseLoc = vector2d(towerGame.canvas.mouseX, towerGame.canvas.mouseY);
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
  checkBuffandHeal() {
    if (this.ability == "buffregen") {
      for (let i = 0; i < towerGame.towers.length; i++) {
        if (towerGame.towers[i].ability != "buffregen") {
          let dist = this.loc.dist(towerGame.towers[i].loc);
          if (dist < this.range) {
            towerGame.towers[i].coolDown = towerGame.towers[i].MaxCoolDown * this.buffConstant;
            //this current system is non stackable
            //will eventually
          }
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
      let b = new Bullet(bulletLocation, this.bulletImg, this.towAngle, this.ability);
      let q = new Missile(bulletLocation, this.bulletImg, this.towAngle, this.ability);
      if (this.ability == "fast" || this.ability == "normal"
        || this.ability == "freeze" || this.ability == "explosive") {
        towerGame.bullets.push(b);//first four use this
      }
      if (this.ability == "buffregen") {
        if (towerGame.health < 150) {
          towerGame.health++;
        }

      }
      if (this.ability == "missile") {
        towerGame.missiles.push(q);
      }
    }
    if (this.ability == "ray" && towerGame.enemies.length != 0) {//I will fix this code eventually
      var a3 = this.loc.x - this.target.x;
      var b3 = this.loc.y - this.target.y;
      var k = Math.sqrt(a3 * a3 + b3 * b3);
      if (k < 300 && towerGame.enemies.length != 0 && this.target.x != towerGame.canvas.mouseX) {
        var rys = new LockOn(this.loc, this.target);
        rys.run();
        if (this.findEnemyIndex() < towerGame.enemies.length)

          towerGame.enemies[this.findEnemyIndex()].isLocked = true;//health -=  10;
      } else {
        towerGame.rays = [];
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
        return this.enemies[i]
      }
    }
  }

}//  end Tower class +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
