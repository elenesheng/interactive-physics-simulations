// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

/**
 * Friction Simulation
 *
 * This sketch demonstrates how friction affects an object's motion.
 * Friction is a force that opposes motion when objects are in contact.
 */

// Global variables
let mover;
let canvasSize = { width: 640, height: 240 };
let isMobile = false;

/**
 * Setup function runs once at the beginning
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

  // Create a mover object with mass 5 at the center-top of the canvas
  // Using our reusable Mover class with specific options for this simulation
  mover = new Mover(width / 2, 30, 5, {
    showVelocityVector: true, // Show the velocity vector by default
    bounceFactor: -0.9, // Lose 10% energy with each bounce
    frictionCoefficient: 0.1, // Coefficient of friction when touching ground
  });
}

/**
 * Draw function runs continuously in a loop
 */
function draw() {
  // Clear the background to white
  background(255);

  // STEP 1: Create and apply forces
  // Create a downward force vector (simulating gravity)
  let gravity = createVector(0, 1);
  // Apply gravity force to our object
  mover.applyForce(gravity);

  // Apply wind force when mouse is pressed
  if (mouseIsPressed) {
    let wind = createVector(0.5, 0);
    mover.applyForce(wind);
  }

  // STEP 2: Apply friction when in contact with the ground
  mover.applyFriction();

  // STEP 3: Handle collisions, update physics, and display
  mover.bounceEdges();
  mover.update();
  mover.show();

  // STEP 4: Show debug information on screen
  displayDebugInfo();

  // Draw ground reference line
  drawGround();
}

/**
 * Display debug information about the object's motion
 */
function displayDebugInfo() {
  // Adjust text position for mobile screens
  let textX = 10;
  let textY = 20;

  // Use the built-in debug display in the Mover class
  mover.displayDebugInfo(textX, textY);
}

/**
 * Draw a line representing the ground
 */
function drawGround() {
  stroke(0);
  strokeWeight(1);
  line(0, height - 1, width, height - 1);
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
