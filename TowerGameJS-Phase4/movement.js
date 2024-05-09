class Movement {
    constructor(loc, target, speed) {
        this.loc = loc; // Initial location
        this.target = target; // Target location
        this.speed = speed; // Movement speed
        this.finished = false; // Flag to indicate if movement is finished
        this.vel = new vector2d(0, 0);
    }

    update() {
        if (!this.finished) {
            // Calculate the direction vector from loc to target
            let direction = this.target.copy().sub(this.loc);
            direction.normalize();
            // Calculate the distance between loc and target
            let distance = this.loc.dist(this.target);

            // Calculate the displacement for this update based on speed
            let displacement = direction.multiply(this.speed);

            // If the displacement is greater than or equal to the distance to the target, we have reached the target
            if (displacement.length() >= distance) {
                this.loc = this.target.copy(); // Set loc location to target
                this.finished = true; // Set finished flag to true
            } else {
                // Move loc location by displacement
                // this.vel.add(displacement);
                this.loc.add(displacement);


            }
        }
    }

    setTarget(loc, newTarget) {
        this.loc = loc;
        this.target = newTarget; // Update target location
        this.finished = false; // Reset finished flag
    }

}
