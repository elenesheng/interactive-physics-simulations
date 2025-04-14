// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

/**
 * Mass and Force Simulation
 *
 * This sketch demonstrates how objects with different masses
 * respond differently to identical forces. It shows:
 * - Newton's Second Law in action (F = ma)
 * - The effects of gravitational force (proportional to mass)
 * - The effects of a uniform wind force (not proportional to mass)
 */

// Global variables
let moverA; // A larger, heavier object
let moverB; // A smaller, lighter object
let canvasSize = { width: 640, height: 240 };
let isMobile = false;

/**
 * Setup function runs once at the beginning
 * Here we create the canvas and initialize our physics objects
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

  // Calculate a radiusFactor based on screen size
  // For mobile, we want to reduce the size of objects proportionally
  let radiusFactor = isMobile ? 4 : 8;

  // Create a large Mover (mass = 10) on the left side of the window
  // Using the common Mover class with appropriate options
  moverA = new Mover(width * 0.3, 30, 10, {
    bounceFactor: -1, // Perfectly elastic bounce
    frictionCoefficient: 0, // No friction in this simulation
    fillColor: color(214, 69, 65, 127), // Reddish color
    topEdgeBounce: true, // Bounce off all edges including top
    radiusFactor: radiusFactor, // Adjust the size ratio for better display
  });

  // Create a smaller Mover (mass = 2) on the right side of the window
  moverB = new Mover(width * 0.7, 30, 2, {
    bounceFactor: -1,
    frictionCoefficient: 0,
    fillColor: color(66, 133, 244, 127), // Bluish color
    topEdgeBounce: true,
    radiusFactor: radiusFactor,
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

  // Create a basic gravity force (same for all objects)
  let gravity = createVector(0, 0.1);

  // APPROACH #1: REALISTIC GRAVITY (proportional to mass)
  // The gravitational force is proportional to the mass (F = mg)
  // This is like real-world gravity - heavier objects experience more gravitational force
  let gravityA = p5.Vector.mult(gravity, moverA.mass);
  moverA.applyForce(gravityA);

  let gravityB = p5.Vector.mult(gravity, moverB.mass);
  moverB.applyForce(gravityB);

  // Note: Although the gravitational force is larger for the heavier object,
  // the resulting acceleration is the same because F/m cancels out the mass.
  // This is why objects fall at the same rate in a vacuum.

  // Apply wind force when mouse is pressed
  // Wind is a uniform force - same for all objects regardless of mass
  if (mouseIsPressed) {
    // Create a rightward force vector (simulating wind)
    let wind = createVector(0.1, 0);

    // Apply the SAME wind force to both objects
    moverA.applyForce(wind);
    moverB.applyForce(wind);

    // Note: The lighter object (moverB) will respond more dramatically to the
    // same wind force because it has less mass (F/m will be larger)
  }

  // STEP 2: Update and display both objects

  // Update and display the heavy object
  moverA.update();
  moverA.show();
  moverA.bounceEdges();

  // Update and display the light object
  moverB.update();
  moverB.show();
  moverB.bounceEdges();

  // Draw labels for the movers
  drawLabels();
}

/**
 * Draw labels for the two movers
 */
function drawLabels() {
  textSize(isMobile ? 10 : 12);
  fill(214, 69, 65);

  // Adjust label position to prevent it from going off-screen
  let labelX = constrain(moverA.position.x - 30, 10, width - 60);
  text('Mass: ' + moverA.mass, labelX, moverA.position.y - moverA.radius - 8);

  fill(66, 133, 244);
  labelX = constrain(moverB.position.x - 30, 10, width - 60);
  text('Mass: ' + moverB.mass, labelX, moverB.position.y - moverB.radius - 8);
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

    // Update mobile flag
    isMobile = window.innerWidth < 768;

    // Update radius factor for both movers
    let newRadiusFactor = isMobile ? 4 : 8;
    moverA.options.radiusFactor = newRadiusFactor;
    moverB.options.radiusFactor = newRadiusFactor;

    // Recalculate radius based on new factor
    moverA.radius = moverA.mass * newRadiusFactor;
    moverB.radius = moverB.mass * newRadiusFactor;

    // Resize and redraw
    resizeCanvas(canvasSize.width, canvasSize.height);
  }
}
