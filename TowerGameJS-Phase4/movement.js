class Movement {
    constructor(loc, target, speed) {
        this.loc = loc; 
        this.target = target;
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

    setTarget(loc, newTarget) {
        this.loc = loc;
        this.target = newTarget;
        this.finished = false; 
    }

}
