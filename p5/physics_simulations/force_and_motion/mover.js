// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

/**
 * Mover Class
 *
 * This class represents a physical object that follows Newton's laws of motion.
 * It has properties like position, velocity, acceleration, and mass,
 * and can respond to forces like gravity and wind.
 */
class Mover {
  constructor() {
    // Physical properties of our object
    this.mass = 1; // Mass affects how much force is needed to accelerate the object
    this.position = createVector(width / 2, 30); // Starting position (x,y) at the center top of canvas
    this.velocity = createVector(0, 0); // Starting velocity is zero (object is not moving)
    this.acceleration = createVector(0, 0); // Starting acceleration is zero (no forces yet)
  }

  /**
   * Apply a force to the object
   *
   * This implements Newton's Second Law: F = ma, or a = F/m
   * When a force is applied, it produces acceleration
   * Greater mass means less acceleration from the same force
   */
  applyForce(force) {
    // Newton's second law: acceleration = force ÷ mass
    let f = p5.Vector.div(force, this.mass);
    // Add this acceleration to our current acceleration
    this.acceleration.add(f);
    // Note: Multiple forces result in accumulated acceleration
  }

  /**
   * Update the object's physics for the next frame
   *
   * This method applies the physics formulas to update:
   * 1. velocity (based on acceleration)
   * 2. position (based on velocity)
   */
  update() {
    // Velocity changes based on acceleration (Physics formula: v = v + a)
    this.velocity.add(this.acceleration);

    // Position changes based on velocity (Physics formula: p = p + v)
    this.position.add(this.velocity);

    // Reset acceleration to 0 for the next frame
    // Forces need to be continually applied each frame
    this.acceleration.mult(0);
  }

  /**
   * Draw the object on the canvas
   */
  display() {
    stroke(0); // Black outline
    strokeWeight(2); // 2 pixel thick outline
    fill(127, 127); // Semi-transparent gray fill

    // Draw a circle at the object's position
    ellipse(this.position.x, this.position.y, 48, 48);
  }

  /**
   * Check if the object hits the edges of the canvas and bounce
   *
   * This implements a simple collision response
   * When the object hits an edge, it bounces back (velocity reverses)
   * This demonstrates conservation of momentum and Newton's Third Law
   */
  checkEdges() {
    // If hitting right edge
    if (this.position.x > width) {
      // Keep the object within the canvas
      this.position.x = width;
      // Reverse x velocity (bounce)
      this.velocity.x *= -1;
    }
    // If hitting left edge
    else if (this.position.x < 0) {
      // Reverse x velocity (bounce)
      this.velocity.x *= -1;
      // Keep the object within the canvas
      this.position.x = 0;
    }

    // If hitting bottom edge
    if (this.position.y > height) {
      // Reverse y velocity (bounce)
      this.velocity.y *= -1;
      // Keep the object within the canvas
      this.position.y = height;
    }
    // Note: No collision for the top edge (the object can leave through the top)
  }
}
