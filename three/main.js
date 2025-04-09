// Import necessary modules from three.js
import * as THREE from 'https://unpkg.com/three@0.175.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.175.0/examples/jsm/controls/OrbitControls.js';

// Error handling
window.addEventListener('error', function (event) {
  console.error(
    'Error occurred:',
    event.message,
    'at',
    event.filename,
    ':',
    event.lineno
  );
  alert('Error loading Three.js: ' + event.message);
});

// Add a debug message to indicate the script is running
console.log('Three.js script starting...');

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });

// Set up renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x111111);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Add lights
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Add camera controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Set camera position
camera.position.z = 5;

// Create a group to hold all objects
const group = new THREE.Group();
scene.add(group);

// Add a variety of 3D objects
const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshPhongMaterial({
  color: 0x00ff00,
  shininess: 100,
  flatShading: true,
});
const cube = new THREE.Mesh(geometry1, material1);
cube.position.x = -2;
group.add(cube);

const geometry2 = new THREE.SphereGeometry(0.7, 32, 32);
const material2 = new THREE.MeshPhongMaterial({
  color: 0xff0000,
  shininess: 100,
});
const sphere = new THREE.Mesh(geometry2, material2);
sphere.position.x = 0;
group.add(sphere);

const geometry3 = new THREE.TorusKnotGeometry(0.5, 0.2, 100, 16);
const material3 = new THREE.MeshPhongMaterial({
  color: 0x0000ff,
  shininess: 100,
  flatShading: false,
});
const torusKnot = new THREE.Mesh(geometry3, material3);
torusKnot.position.x = 2;
group.add(torusKnot);

// Add many small stars
const starGeometry = new THREE.SphereGeometry(0.05, 8, 8);
const starMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

for (let i = 0; i < 200; i++) {
  const star = new THREE.Mesh(starGeometry, starMaterial);

  // Random positions between -50 and 50
  star.position.x = Math.random() * 100 - 50;
  star.position.y = Math.random() * 100 - 50;
  star.position.z = Math.random() * 100 - 50;

  // Don't place stars too close to the center
  if (star.position.length() < 10) {
    star.position.normalize().multiplyScalar(10 + Math.random() * 10);
  }

  scene.add(star);
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the objects
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  sphere.rotation.y += 0.01;

  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.01;

  // Rotate the entire group slowly
  group.rotation.y += 0.002;

  // Update controls
  controls.update();

  // Render the scene
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', function () {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Start animation
animate();
