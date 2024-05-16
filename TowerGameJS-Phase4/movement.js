class Movement {
    constructor(loc, target, speed) {
        this.loc = loc; 
        this.target = target;
       // this.vel = vector2d(0, 0);
       // this.acc = vector2d(0, 0);
        this.speed = speed; 
        this.finished = false; 
    }

    update() {
        if (!this.finished) {

            let direction = this.target.copy().sub(this.loc);
            direction.normalize();
         
            let distance = this.loc.dist(this.target);

            let displacement = direction.multiply(this.speed);

            if (displacement.length() >= distance) {
                this.loc = this.target.copy(); 
                this.finished = true; 
            } else {
            
                 this.loc.add(displacement);
                 
            }
        }
    }

    // update() {
    //     if (!this.finished) {

    //         this.acc = vector2d.subGetNew(this.loc, this.target);
    //         this.acc.normalize();
    //         this.acc.multiply(this.speed/3);
    //         this.vel.add(this.acc); 

    //         let displacement = direction.multiply(this.speed);

    //         if (displacement.length() >= distance) {
    //             this.loc = this.target.copy(); 
    //             this.finished = true; 
    //         } else {
                
    //              this.loc.add(this.vel);
                 
    //         }
    //     }
    // }
    setTarget(loc, newTarget) {
        this.loc = loc;
        this.target = newTarget;
        this.finished = false; 
    }

}
