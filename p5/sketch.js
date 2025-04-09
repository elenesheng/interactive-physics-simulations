// Particle system for p5.js demo
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);

  // Create initial particles
  for (let i = 0; i < 20; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(230, 10, 90);

  // Update and display all particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();

    // Remove dead particles
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }

  // Display particle count
  fill(0);
  textSize(16);
  text(`Particles: ${particles.length}`, 20, 100);
}

// Add new particles when mouse is clicked
function mousePressed() {
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(mouseX, mouseY));
  }
}

// Resize canvas when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// Particle class
class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.acceleration = createVector(0, 0);
    this.color = random(360);
    this.size = random(10, 30);
    this.lifespan = 255;
    this.decay = random(1, 2.5);
  }

  update() {
    // Add some random movement
    let randomForce = createVector(random(-0.1, 0.1), random(-0.1, 0.1));
    this.acceleration.add(randomForce);

    // Update velocity and position
    this.velocity.add(this.acceleration);
    this.velocity.limit(3);
    this.position.add(this.velocity);

    // Reset acceleration
    this.acceleration.mult(0);

    // Reduce lifespan
    this.lifespan -= this.decay;

    // Bounce off edges
    if (this.position.x < 0 || this.position.x > width) {
      this.velocity.x *= -1;
    }
    if (this.position.y < 0 || this.position.y > height) {
      this.velocity.y *= -1;
    }
  }

  display() {
    noStroke();
    fill(this.color, 80, 100, (this.lifespan / 255) * 100);
    ellipse(this.position.x, this.position.y, this.size);
  }

  isDead() {
    return this.lifespan <= 0;
  }
}
