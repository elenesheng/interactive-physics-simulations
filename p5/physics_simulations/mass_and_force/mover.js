// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

/**
 * Enhanced Mover Class
 *
 * This class represents a physical object with variable mass that follows Newton's laws of motion.
 * The key improvement in this version is that we can create movers with different masses,
 * which allows us to see how mass affects the response to forces.
 */
class Mover {
  constructor(x, y, m) {
    // Physical properties with customizable mass and position
    this.mass = m; // Mass of the object (affects force response)
    this.radius = m * 8; // Size of the object is proportional to its mass
    this.position = createVector(x, y); // Starting position is customizable
    this.velocity = createVector(0, 0); // Starting velocity is zero (not moving)
    this.acceleration = createVector(0, 0); // Starting acceleration is zero (no forces yet)
  }

  /**
   * Apply a force to the object
   *
   * This implements Newton's Second Law: F = ma, or a = F/m
   * Heavier objects (larger mass) will accelerate less from the same force
   */
  applyForce(force) {
    // Create a copy of the force vector to avoid modifying the original
    // This is important when the same force is applied to multiple objects
    let forceCopy = p5.Vector.div(force, this.mass);

    // Add the resulting acceleration to our current acceleration
    this.acceleration.add(forceCopy);

    // Note: For heavier objects (larger mass), the same force
    // will produce less acceleration (F/m will be smaller)
  }

  /**
   * Update the object's physics for the next frame
   *
   * This method applies the physics formulas to update:
   * 1. velocity (based on acceleration)
   * 2. position (based on velocity)
   */
  update() {
    // Velocity changes based on acceleration
    this.velocity.add(this.acceleration);

    // Position changes based on velocity
    this.position.add(this.velocity);

    // Reset acceleration to 0 for the next frame
    // Forces need to be continually applied each frame
    this.acceleration.mult(0);
  }

  /**
   * Draw the object on the canvas
   * The size of the circle represents the mass of the object
   */
  display() {
    stroke(0); // Black outline
    strokeWeight(2); // 2 pixel thick outline
    fill(127, 127); // Semi-transparent gray fill

    // Draw a circle with diameter proportional to mass
    ellipse(this.position.x, this.position.y, this.radius * 2);
  }

  /**
   * Check if the object hits the edges of the canvas and bounce
   *
   * This implements a simple collision response accounting for the object's size
   * Larger objects (with more mass) will hit the edges sooner due to their radius
   */
  checkEdges() {
    // If hitting right edge (accounting for object radius)
    if (this.position.x > width - this.radius) {
      // Keep the object within the canvas
      this.position.x = width - this.radius;
      // Reverse x velocity (bounce)
      this.velocity.x *= -1;
    }
    // If hitting left edge (accounting for object radius)
    else if (this.position.x < this.radius) {
      // Keep the object within the canvas
      this.position.x = this.radius;
      // Reverse x velocity (bounce)
      this.velocity.x *= -1;
    }

    // If hitting bottom edge (accounting for object radius)
    if (this.position.y > height - this.radius) {
      // Keep the object within the canvas
      this.position.y = height - this.radius;
      // Reverse y velocity (bounce)
      this.velocity.y *= -1;
    }
    // Note: No collision for the top edge (objects can leave through the top)
  }
}
