import * as THREE from 'three';

export function setupInteraction(scene, camera) {
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener('click', event => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const object = intersects[0].object;
      const originalColor = object.material.color.getHex();

     // object.material.color.set('#ff0000');
     object.material.color.set('#edaab0');

      setTimeout(() => {
        object.material.color.set(originalColor);
      }, 300);
    }
  });
}
