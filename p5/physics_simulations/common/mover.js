// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

/**
 * Universal Mover Class
 *
 * A reusable physics object that can be configured for different simulations
 * Supports various behaviors: gravity, friction, drag, bounce, etc.
 */
class Mover {
  /**
   * Create a new Mover object
   * @param {number} x - Initial x position
   * @param {number} y - Initial y position
   * @param {number} m - Mass of the object
   * @param {Object} options - Optional configuration settings
   */
  constructor(x, y, m, options = {}) {
    // Physical properties of our object
    this.mass = m; // Mass affects how forces impact it
    this.radius = m * (options.radiusFactor || 8); // Size proportional to mass, configurable ratio
    this.position = createVector(x, y); // Starting position
    this.velocity = createVector(options.vx || 0, options.vy || 0); // Initial velocity
    this.acceleration = createVector(0, 0); // Starting acceleration

    // Configurable simulation options with defaults
    this.options = {
      bounceFactor: options.bounceFactor || -0.9, // Energy loss on bounce (default 10%)
      frictionCoefficient: options.frictionCoefficient || 0.1, // Coefficient of friction
      dragCoefficient: options.dragCoefficient || 0.01, // Coefficient of drag (air resistance)
      showVelocityVector: options.showVelocityVector || false, // Whether to draw velocity vector
      fillColor: options.fillColor || color(127, 127), // Object fill color
      strokeColor: options.strokeColor || color(0), // Object stroke color
      topEdgeBounce:
        options.topEdgeBounce !== undefined ? options.topEdgeBounce : false, // Whether to bounce off top edge
      allowDebugDisplay:
        options.allowDebugDisplay !== undefined
          ? options.allowDebugDisplay
          : true, // Display debug info
    };
  }

  /**
   * Apply a force to the object (Newton's Second Law: F = ma, or a = F/m)
   * @param {p5.Vector} force - The force vector to apply
   */
  applyForce(force) {
    // Create a copy of the force vector to avoid modifying the original
    let f = p5.Vector.div(force, this.mass);
    // Add the resulting acceleration to our current acceleration
    this.acceleration.add(f);
  }

  /**
   * Apply friction force if the object is in contact with a surface
   * @param {boolean} alwaysApply - Apply friction regardless of contact (for air friction)
   */
  applyFriction(alwaysApply = false) {
    if (alwaysApply || this.contactEdge()) {
      // Copy the velocity vector and reverse it to oppose motion
      let friction = this.velocity.copy();
      friction.mult(-1);

      // Set the magnitude to the coefficient of friction
      friction.setMag(this.options.frictionCoefficient);

      // Apply the friction force
      this.applyForce(friction);
    }
  }

  /**
   * Apply fluid resistance (drag) proportional to velocity squared
   */
  applyDrag() {
    // Only apply drag if the object is moving
    if (this.velocity.mag() > 0) {
      // Calculate drag force magnitude: 0.5 * p * v² * A * Cd
      // We'll simplify this to: coefficient * v²
      let dragMagnitude = this.options.dragCoefficient * this.velocity.magSq();

      // Create drag force vector (opposite direction of velocity)
      let drag = this.velocity.copy();
      drag.mult(-1);
      drag.setMag(dragMagnitude);

      // Apply the drag force
      this.applyForce(drag);
    }
  }

  /**
   * Update the object's physics for the next frame
   */
  update() {
    // Velocity changes based on acceleration
    this.velocity.add(this.acceleration);

    // Position changes based on velocity
    this.position.add(this.velocity);

    // Reset acceleration to 0 for the next frame
    this.acceleration.mult(0);
  }

  /**
   * Draw the object on the canvas
   */
  show() {
    push();
    stroke(this.options.strokeColor);
    strokeWeight(2);
    fill(this.options.fillColor);

    // Draw a circle with diameter proportional to mass
    circle(this.position.x, this.position.y, this.radius * 2);

    // Optionally draw velocity vector
    if (this.options.showVelocityVector) {
      this.drawVector(this.velocity, 10, color(255, 0, 0));
    }

    pop();
  }

  /**
   * Draw a vector from the mover's position
   * @param {p5.Vector} vec - The vector to draw
   * @param {number} scale - Scale factor to make the vector visible
   * @param {p5.Color} lineColor - Color of the vector
   */
  drawVector(vec, scale, lineColor) {
    push();
    stroke(lineColor);
    strokeWeight(2);
    fill(lineColor);

    // Draw the main line
    line(
      this.position.x,
      this.position.y,
      this.position.x + vec.x * scale,
      this.position.y + vec.y * scale
    );

    // Draw arrowhead
    let arrowSize = 7;
    translate(this.position.x + vec.x * scale, this.position.y + vec.y * scale);
    rotate(vec.heading());
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);

    pop();
  }

  /**
   * Check if the object is in contact with the bottom edge
   * @returns {boolean} True if the object is touching the ground
   */
  contactEdge() {
    // The mover is touching the bottom edge when it's within one pixel
    return this.position.y > height - this.radius - 1;
  }

  /**
   * Handle bouncing off the edges of the canvas
   */
  bounceEdges() {
    let bounce = this.options.bounceFactor;

    // Right edge
    if (this.position.x > width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x *= bounce;
    }
    // Left edge
    else if (this.position.x < this.radius) {
      this.position.x = this.radius;
      this.velocity.x *= bounce;
    }

    // Bottom edge
    if (this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= bounce;
    }
    // Top edge (optional)
    else if (this.options.topEdgeBounce && this.position.y < this.radius) {
      this.position.y = this.radius;
      this.velocity.y *= bounce;
    }
  }

  /**
   * Display debug information about the mover's state
   * @param {number} x - X position to display the text
   * @param {number} y - Y position to display the text
   */
  displayDebugInfo(x, y) {
    if (!this.options.allowDebugDisplay) return;

    push();
    fill(0);
    noStroke();
    textSize(12);
    text('Velocity: ' + nfc(this.velocity.mag(), 2) + ' pixels/frame', x, y);
    text(
      'Position: (' +
        nfc(this.position.x, 0) +
        ', ' +
        nfc(this.position.y, 0) +
        ')',
      x,
      y + 20
    );

    // Show ground friction status
    if (this.contactEdge()) {
      fill(255, 0, 0);
      text('FRICTION ACTIVE: Ball is touching the ground', x, y + 40);
    }
    pop();
  }
}
