'use strict'

class Missile {
    constructor(location, bImg, angle, type) {
        this.loc = location;
        this.r = 16;
         let red = Math.floor(Math.random() * 256);
         let green = Math.floor(Math.random() * 256);
         let blue = Math.floor(Math.random() * 256);
        this.clr = 'rgba(' + red + ',' + green + ',' + blue + ',' + 0.5 + ')';
        this.speed = 15;
        this.shape = "circle";
        this.angle = angle;
        this.img = bImg;
        this.ability = type;
    }

    run() {
        this.render();
        this.update();
        this.randomNess();
    }

    render() {
        let ctx = towerGame.context;
        ctx.beginPath();
        ctx.save();
        ctx.fillStyle = this.clr;
        ctx.strokeStyle = this.clr;
        ctx.translate(this.loc.x, this.loc.y);
            ctx.drawImage(this.img, -this.img.width/2,-this.img.height/2);
        ctx.fill();
        ctx.restore();
    }
    update() {
        
        this.loc.y += Math.sin(this.angle) * this.speed;
        this.loc.x += Math.cos(this.angle) * this.speed;
    }
randomNess(){
    let randomNum = Math.floor(Math.random()*4+1);//don't want all the missiles to be straight so implementing some sort of randomness to the missiles
    if(randomNum < 3){
    this.loc.x += Math.random()*25-12.5;
    this.loc.y += Math.random()*25-12.5;
    }
   
    }
}