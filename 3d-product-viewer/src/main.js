
import { scene, camera, renderer, controls } from './scripts/initScene.js';
import { createProduct } from './scripts/createProduct.js';
import { addLighting } from './scripts/addLighting.js';
import { setupInteraction } from './scripts/interaction.js';
import { animateCamera } from './scripts/cameraAnimation.js';

createProduct(scene);
addLighting(scene);
setupInteraction(scene, camera);

function animate(time) {
  requestAnimationFrame(animate);
  animateCamera(time, camera);
  controls.update();
  renderer.render(scene, camera);
}

animate();
