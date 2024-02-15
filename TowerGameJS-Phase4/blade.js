class Blade {

    constructor(location, bImg, angle, type){
        this.loc = new vector2d(0, 0);
        this.towerLoc = location;
        this.shape = "square";
        this.img = bImg;
        this.ability=type;
        this.orbitalRadius = 25;
        this.angle = angle;
        this.angularVelocity = 0.05;
    }


    run(){
        this.render();
        this.update();
    }

    render(){

        var ctx = towerGame.context;
        ctx.save();
        ctx.translate(this.loc.x, this.loc.y);
        ctx.rotate(this.angle+(Math.PI*0.8));
        this.angle += this.angularVelocity;
    
        ctx.drawImage(this.img, -this.img.width/2,-this.img.height/2);
    
        ctx.restore();
      }

      update(){
        this.loc.x = this.towerLoc.x + Math.cos(this.angle)*this.orbitalRadius;
        this.loc.y = this.towerLoc.y + Math.sin(this.angle)*this.orbitalRadius;
      }
    }