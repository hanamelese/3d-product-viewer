import * as THREE from 'three';

export function addLighting(scene) {
//   const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
const ambientLight = new THREE.AmbientLight(0xaaaeea, 0.4);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xaaedba, 0.8);
  dirLight.position.set(5, 10, 7.5);
  dirLight.castShadow = true;

  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.near = 0.5;
  dirLight.shadow.camera.far = 20;

  scene.add(dirLight);

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
   // new THREE.MeshStandardMaterial({ color: 0xeeeeee })
   new THREE.MeshStandardMaterial({ color: 0xaafeed })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
}
