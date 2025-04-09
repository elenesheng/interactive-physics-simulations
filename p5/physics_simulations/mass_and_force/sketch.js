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

// Global variables to store our physical objects
let moverA; // A larger, heavier object
let moverB; // A smaller, lighter object

/**
 * Setup function runs once at the beginning
 * Here we create the canvas and initialize our physics objects
 */
function setup() {
  // Create canvas and place it in the canvas-container div
  let canvas = createCanvas(640, 240);
  canvas.parent('canvas-container');

  // Create a large Mover (mass = 10) on the left side of the window
  moverA = new Mover(200, 30, 10);

  // Create a smaller Mover (mass = 2) on the right side of the window
  moverB = new Mover(440, 30, 2);
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
  moverA.display();
  moverA.checkEdges();

  // Update and display the light object
  moverB.update();
  moverB.display();
  moverB.checkEdges();
}
