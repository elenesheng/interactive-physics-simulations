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

// Global variables
let mover;
let canvasSize = { width: 640, height: 240 };
let isMobile = false;

/**
 * Setup function runs once at the beginning
 * Here we create the canvas and initialize our physics object
 */
function setup() {
  // Check if we're on a mobile device
  isMobile = window.innerWidth < 768;

  // Adjust canvas size for mobile if needed
  if (isMobile) {
    canvasSize.width = min(window.innerWidth - 40, 640); // Account for padding
    // Keep the aspect ratio similar
    canvasSize.height = int(canvasSize.width * 0.375);
  }

  // Create canvas and place it in the canvas-container div
  let canvas = createCanvas(canvasSize.width, canvasSize.height);
  canvas.parent('canvas-container');

  // Create a mover object using the common Mover class
  mover = new Mover(width / 2, 30, 1, {
    showVelocityVector: false,
    bounceFactor: -1, // Perfectly elastic bounce
    frictionCoefficient: 0, // No friction in this basic simulation
  });
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
  // The value 0.1 represents the strength of gravity
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
  mover.show();

  // STEP 4: Check if the object has hit any boundaries and respond
  mover.bounceEdges();
}

/**
 * Handle window resize events
 */
function windowResized() {
  // Only resize if on mobile
  if (window.innerWidth < 768) {
    // Update canvas size
    canvasSize.width = min(window.innerWidth - 40, 640);
    canvasSize.height = int(canvasSize.width * 0.375);

    // Resize and redraw
    resizeCanvas(canvasSize.width, canvasSize.height);
  }
}

/**
 * Try experimenting with this code:
 * 1. Change the gravity or wind force values
 * 2. Add a new force like friction or air resistance
 * 3. Change the mass of the mover (in the Mover class)
 * 4. Add a second mover with different properties
 */
