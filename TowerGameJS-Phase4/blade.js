class Blade {

    constructor(location, bImg, type){
        this.loc = location;
        this.shape = "square";
        this.img = bImg;
        this.ability=type;
        this.orbitalRadius = 35;
        this.angle = 0;
        this.angularVelocity = 0;
    }


    run(){
        this.render();
        this.update();
    }

    render(){

        var ctx = towerGame.context;
        ctx.save();
        ctx.translate(this.loc.x, this.loc.y);
        ctx.rotate(this.angle+Math.PI/2);
    
    
        ctx.drawImage(this.img, -this.img.width/2,-this.img.height/2);
    
        ctx.restore();
      }

      update(){
        console.log(this.loc.x);
        this.loc.x = tower.loc.x + Math.cos(this.angle)*this.orbitalRadius;
        this.loc.y = tower.loc.y + Math.sin(this.angle)*this.orbitalRadius;
        this.angle += this.angularVelocity;
      }
}