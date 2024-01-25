'use strict'

class Player extends Mover {
    constructor(gameState) {
        super();               // required
        this.gameState = this.gameState;  // access to all the other objects.  e.g. this.gameState.boids or this.gameState.game.canvas
        // other Player properties
    }
    run() {
        // do whatever actions
        this.render();
        }
    render() {
        // draw whatever
        }
    // other Player methods ...
}