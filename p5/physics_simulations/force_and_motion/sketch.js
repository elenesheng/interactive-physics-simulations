// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

/**
 * Force and Motion Simulation
 *
 * This sketch demonstrates basic physics principles including:
 * - Newton's laws of motion
 * - Gravity and wind forces
 * - Force accumulation
 * - Collision response
 */

// Global variable to store our physical object
let mover;

/**
 * Setup function runs once at the beginning
 * Here we create the canvas and initialize our physics object
 */
function setup() {
  // Create canvas and place it in the canvas-container div
  let canvas = createCanvas(640, 240);
  canvas.parent('canvas-container');

  // Create a new mover object (our physics-based ball)
  mover = new Mover();
}

/**
 * Draw function runs continuously in a loop
 * This is where we apply forces, update physics, and draw each frame
 */
function draw() {
  // Clear the background to white
  background(255);

  // STEP 1: Create and apply forces

  // Create a constant downward force vector (simulating gravity)
  // The value 0.1 represents the strength of gravity (try changing it!)
  let gravity = createVector(0, 0.1);

  // Apply gravity force to our object
  // This demonstrates a constant force that's always present
  mover.applyForce(gravity);

  // Conditionally apply wind force when mouse is pressed
  // This demonstrates how we can have multiple forces acting simultaneously
  if (mouseIsPressed) {
    // Create a rightward force vector (simulating wind)
    let wind = createVector(0.1, 0);

    // Apply wind force to our object
    mover.applyForce(wind);
  }

  // STEP 2: Update the physics simulation for this frame
  mover.update();

  // STEP 3: Display the object at its new position
  mover.display();

  // STEP 4: Check if the object has hit any boundaries and respond
  mover.checkEdges();

  // Then the draw loop repeats! (about 60 times per second)
}

/**
 * Try experimenting with this code:
 * 1. Change the gravity or wind force values
 * 2. Add a new force like friction or air resistance
 * 3. Change the mass of the mover (in the Mover class)
 * 4. Add a second mover with different properties
 */
