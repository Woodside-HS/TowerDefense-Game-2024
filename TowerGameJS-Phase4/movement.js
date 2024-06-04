class Movement {
    constructor(loc, target, speed) {
        this.loc = loc; // current location of the object
        this.target = target; // target location to move towards
        this.vel = vector2d(0, 0); // velocity vector initialized to zero
        this.acc = vector2d(0, 0); // acceleration vector initialized to zero
        this.speed = speed; // speed of the movement
        this.finished = false; // flag to check if the movement is finished
    }
    render() {
        // var ctx = towerGame.context;
        //   ctx.save();
        //   ctx.translate(this.target.x, this.target.y);
        //   ctx.strokeStyle = "rgba(0,250,210, 0.8)";
        //   ctx.fillStyle = "rgba(0, 250, 210, 0.08)";
        //   ctx.beginPath();
        //   ctx.arc(0, 0, 2, 0, Math.PI * 2, false);
        //   ctx.closePath();
        //   ctx.stroke();
        //   ctx.fill();
        //   ctx.restore();
        //   ctx.save();
        //   ctx.translate(this.loc.x, this.loc.y);
        //   ctx.strokeStyle = "rgba(0,250,210, 0.8)";
        //   ctx.fillStyle = "rgba(0, 250, 210, 0.08)";
        //   ctx.beginPath();
        //   ctx.arc(0, 0, 2, 0, Math.PI * 2, false);
        //   ctx.closePath();
        //   ctx.stroke();
        //   ctx.fill();
        //   ctx.restore();
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
            // Calculate the acceleration as the difference between current location and target
            this.acc = this.loc.subGet(this.target);
            this.acc.normalize(); // Normalize the acceleration vector
            if (this.loc.dist(this.target) > 10) {
                if (towerGame.w == 25) {
                    this.acc.multiply(0.5); // Modify acceleration if specific condition is met
                }
                this.acc.multiply(this.speed / 10); // Scale the acceleration by speed
            } else {
                if (towerGame.w == 25) {
                    this.acc.multiply(0.5); // Modify acceleration if specific condition is met
                }
                this.vel = this.loc.subGet(this.target);
                this.vel.normalize(); // Normalize the velocity vector

            }
            this.vel.add(this.acc); // Update velocity by adding acceleration
            this.vel.limit(this.speed / 2); // Limit the velocity to half the speed
            if (this.loc.dist(this.target) < 8) {
                this.loc = this.target.copy(); // Set location to target if close enough
                this.finished = true; // Mark movement as finished

            } else {

                this.loc.add(this.vel); // Update location by adding velocity


            }
        }
    }
    setTarget(loc, newTarget) {
        this.loc = loc; // Update current location
        this.target = newTarget; // Update target location
        this.finished = false; // Reset finished flag
    }

}
