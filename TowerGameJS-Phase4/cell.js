class Cell {
  constructor(game, loc, id) {
    this.game = game;       // Reference to the global game instance
    this.loc = loc;         // Top-left pixel location of the cell
    this.center = vector2d(loc.x + (game.w) / 2, loc.y + (game.w) / 2); // Center position of the cell
    this.color = 'pink';    // Default color of the cell
    this.shape = "square";  // Shape of the cell
    this.id = id;           // Unique identifier for the cell
    this.neighbors = [];    // Array to hold neighboring cells
    this.occupied = false;  // Boolean to check if the cell is occupied
    this.parent = 0;        // Reference to the parent cell
    this.dist = -1;         // Distance from the source or root cell
    this.vec = null;        // Vector from this cell to its parent
    this.hasTower = false;  // Boolean to check if the cell has a tower
  }

  // render() --
  // draw cells that are occupied and the root cell
  render(allowCheck) {
    let ctx = this.game.context; // Context of the canvas to draw on

    // Draw an image if the cell is occupied and checking is allowed
    if (this.occupied && allowCheck === true) {
      ctx.drawImage(Cell.wallImage, 0, 0, Cell.wallImage.width, Cell.wallImage.height, this.loc.x, this.loc.y, this.game.w, this.game.w);
    }
    // Highlight the root cell with a yellow ellipse
    else if (this === this.game.root) {
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.ellipse(this.center.x, this.center.y, this.game.w / 2, this.game.w / 2, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.stroke();
    }
  }

  // addNeighbors()
  // Find all the neighbors of this cell that exist and are not occupied
  // and do not have a tower.
  // Diagonal neighbors must not be blocked diagonally.
  // For example, a southeast neighbor might not be occupied
  // but if east and south are both occupied then southeast is blocked
  // and not considered to be a neighbor.
  addNeighbors(game, grid) {
    this.neighbors = [];    // Reset neighbors list
    let col = this.loc.x / game.w; // Column index of the cell
    let row = this.loc.y / game.w; // Row index of the cell
    let n, ne, e, se, s, sw, w, nw = null; // Variables to hold all eight possible neighbors

    // Check and add unblocked neighbors
    if (row > 0) {
      n = grid[col][row - 1];
      if (!n.occupied && !n.hasTower)
        this.neighbors.push(n);    // North
    }
    if (col < game.cols - 1) {
      e = grid[col + 1][row];
      if (!e.occupied && !e.hasTower)
        this.neighbors.push(e);    // East
    }
    if (row < game.rows - 1) {
      s = grid[col][row + 1];
      if (!s.occupied && !s.hasTower)
        this.neighbors.push(s);    // South
    }
    if (col > 0) {
      w = grid[col - 1][row];
      if (!w.occupied && !w.hasTower)
        this.neighbors.push(w);    // West
    }
    // Diagonal neighbors with additional checks for blocked paths
    if (col < game.cols - 1 && row > 0) {           //  NE
      ne = grid[col + 1][row - 1];
      if (!ne.occupied && !ne.hasTower && !(n && (n.occupied || n.hasTower) && e && (e.occupied || e.hasTower))) {
        this.neighbors.push(ne);
      }
    }
    if (col < game.cols - 1 && row < game.rows - 1) {      //  SE
      se = grid[col + 1][row + 1];
      if (!se.occupied && !se.hasTower && !(e && (e.occupied || e.hasTower) && s && (s.occupied || s.hasTower))) {
        this.neighbors.push(se);
      }
    }
    if (col > 0 && row < game.rows - 1) {             //  SW
      sw = grid[col - 1][row + 1];
      if (!sw.occupied && !sw.hasTower && !(s && (s.occupied || s.hasTower) && w && (w.occupied || w.hasTower))) {
        this.neighbors.push(sw);
      }
    }
    if (col > 0 && row > 0) {                     //  NW
      nw = grid[col - 1][row - 1];
      if (!nw.occupied && !nw.hasTower && !(w && (w.occupied || w.hasTower) && n && (n.occupied || n.hasTower))) {
        this.neighbors.push(nw);
      }
    }
  }

  // Return a vector from this cell to its parent
  getVector() {
    if (this.parent) {
      let dx = this.parent.loc.x - this.loc.x; // Difference in x coordinates
      let dy = this.parent.loc.y - this.loc.y; // Difference in y coordinates
      let v = new vector2d(dx, dy); // Create a new vector with the differences
      return v;
    }
    else return (vector2d(0, 0)); // Return a zero vector if no parent
  }

  // Display distance and ID text within the cell
  getText() {
    var context = this.game.context;
    context.save(); // Save the current drawing state
    context.fillStyle = "white";
    context.font = "14px sans-serif";
    context.fillText("" + this.dist, this.loc.x + .2 * this.game.w / 2, this.loc.y + this.game.w / 2 - 5);
    context.fillStyle = "black";
    context.fillText("" + this.id, this.loc.x + .2 * this.game.w / 2, this.loc.y + this.game.w / 2 + 15);
    context.restore(); // Restore the saved drawing state
  }
}