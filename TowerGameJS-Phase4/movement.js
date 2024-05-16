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
          ctx.arc(0, 0, 25, 0, Math.PI * 2, false);
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
            this.acc.multiply(this.speed/300);
            this.vel.add(this.acc); 

          

            if (this.loc.dist(this.target) < 2) {
                this.loc = this.target.copy(); 
                this.finished = true; 
                console.log(this.vel);
                console.log(this.acc)
                this.vel = new vector2d(0, 0);
                this.acc = new vector2d(0, 0);
              
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
