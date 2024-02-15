class Blade {

    constructor(location, bImg, type){
        this.loc = location;
        this.shape = "square";
        this.img = bImg;
        this.ability=type;
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
        
      }
}