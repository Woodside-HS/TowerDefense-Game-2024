class Movement {
    constructor(loc, target, speed) {
        this.loc = loc; 
        this.target = target;
        this.vel = vector2d(0, 0);
        this.acc = vector2d(0, 0);
        this.speed = speed; 
        this.finished = false; 
    }
    render(){
        var ctx = towerGame.context;
          ctx.save();
          ctx.translate(this.target.x, this.target.y);
          ctx.strokeStyle = "rgba(0,250,210, 0.8)";
          ctx.fillStyle = "rgba(0, 250, 210, 0.08)";
          ctx.beginPath();
          ctx.arc(0, 0, 2, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
          ctx.restore();
          ctx.save();
          ctx.translate(this.loc.x, this.loc.y);
          ctx.strokeStyle = "rgba(0,250,210, 0.8)";
          ctx.fillStyle = "rgba(0, 250, 210, 0.08)";
          ctx.beginPath();
          ctx.arc(0, 0, 2, 0, Math.PI * 2, false);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
          ctx.restore();
    }
    // update() {
    //     if (!this.finished) {

    //         let direction = this.target.copy().sub(this.loc);
    //         direction.normalize();
         
    //         let distance = this.loc.dist(this.target);

    //         let displacement = direction.multiply(this.speed);

    //         if (displacement.length() >= distance) {
    //             this.loc = this.target.copy(); 
    //             this.finished = true; 
    //         } else {
            
    //              this.loc.add(displacement);
                 
    //         }
    //     }
    // }

    update() {
        if (!this.finished) {
            this.acc = this.loc.subGet(this.target);
            this.acc.normalize();
            if(this.loc.dist(this.target) > 35){
                if(towerGame.w == 25){
                    this.acc.multiply(0.5);
                }
            this.acc.multiply(this.speed/100);
            }else{
                if(towerGame.w == 25){
                    this.acc.multiply(0.5);
                }
             this.vel.multiply(0.91);
                this.acc.multiply(this.speed/50);
            }
            this.vel.add(this.acc);
            this.vel.limit(this.speed/2);
            if (this.loc.dist(this.target) < 8) {
                this.loc = this.target.copy(); 
                this.finished = true; 

             
            } else {
                
                 this.loc.add(this.vel);

                 
            }
        }
    }
    setTarget(loc, newTarget) {
        this.loc = loc;
        this.target = newTarget;
        this.finished = false; 
    }

}
