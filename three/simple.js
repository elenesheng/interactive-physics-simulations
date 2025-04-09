// A simple fallback if module imports fail
document.addEventListener('DOMContentLoaded', function () {
  // Check if THREE is available through the CDN fallback
  if (typeof THREE === 'undefined') {
    console.error('THREE is not defined. Loading from CDN...');

    // Add the three.js script directly
    const script = document.createElement('script');
    script.src =
      'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.onload = initSimpleScene;
    script.onerror = function () {
      document.getElementById('error-message').style.display = 'block';
      document.getElementById('error-message').textContent =
        'Failed to load Three.js. Please check your internet connection.';
    };
    document.head.appendChild(script);
  } else {
    // THREE is already defined, initialize the scene
    initSimpleScene();
  }
});

function initSimpleScene() {
  console.log('Initializing simple scene...');

  try {
    // Create the scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create a cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Animation function
    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    // Start animation
    animate();

    // Handle window resize
    window.addEventListener('resize', function () {
      const width = window.innerWidth;
      const height = window.innerHeight;

      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
  } catch (error) {
    console.error('Error in simple scene:', error);
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('error-message').textContent =
      'Error in simple scene: ' + error.message;
  }
}
