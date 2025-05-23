import * as THREE from 'three';

export function createProduct(scene) {
  const group = new THREE.Group();

  // === Chair Components (Updated Color) ===
  const chairMaterial = new THREE.MeshPhysicalMaterial({
    color: '#aaafff', // Updated chair color
    metalness: 0.6,
    roughness: 0.1,
    clearcoat: 1.0,
    reflectivity: 1.5,
    transparent: true,
    opacity: 0.9,
  });

  const seat = new THREE.Mesh(new THREE.BoxGeometry(2, 0.15, 2), chairMaterial);
  seat.position.y = 1;
  group.add(seat);

  const back = new THREE.Mesh(new THREE.BoxGeometry(2, 1.5, 0.2), chairMaterial);
  back.position.set(0, 1.75, -0.8);
  group.add(back);

  const legMaterial = new THREE.MeshStandardMaterial({ color: '#aaafff', metalness: 1.0, roughness: 0.1 });
  const legGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.2, 32);
  const positions = [
    [-0.9, 0.5, -0.9], [0.9, 0.5, -0.9], [-0.9, 0.5, 0.9], [0.9, 0.5, 0.9]
  ];
  positions.forEach(pos => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(...pos);
    group.add(leg);
  });

  // === Vase (Slightly Smaller) ===
  const vase = new THREE.Mesh(
    new THREE.CylinderGeometry(0.41, 0.22, 0.8, 28),
    new THREE.MeshStandardMaterial({ color: '#4455aa', metalness: 0.4, roughness: 0.5 })
  );
  vase.position.set(0, 1.4, 0);
  group.add(vase);

  // === Flower Stem ===
  const stem = new THREE.Mesh(
    new THREE.CylinderGeometry(0.04, 0.04, 0.8, 16),
    new THREE.MeshStandardMaterial({ color: 0x228833 })
  );
  stem.position.set(0, 2, 0);
  group.add(stem);

  // === Petals ===
  const petalMaterial = new THREE.MeshStandardMaterial({ color: 0xff66cc });
  const petalGeometry = new THREE.SphereGeometry(0.15, 24, 24);
  const petalPositions = [
    [0.25, 2.4, 0], [-0.25, 2.4, 0], [0, 2.4, 0.25], [0, 2.4, -0.25],
    [0.2, 2.4, -0.15], [-0.2, 2.4, 0.15]
  ];
  petalPositions.forEach(pos => {
    const petal = new THREE.Mesh(petalGeometry, petalMaterial);
    petal.position.set(...pos);
    group.add(petal);
  });

  // === Flower Center ===
  const center = new THREE.Mesh(
    new THREE.SphereGeometry(0.12, 16, 16),
    new THREE.MeshStandardMaterial({ color: 0xffff00, emissive: 0xffdd44 })
  );
  center.position.set(0, 2.4, 0);
  group.add(center);

  // === Two Pollen Spheres (New Addition) ===
  const pollenMaterial = new THREE.MeshStandardMaterial({ color: 0xff66cc }); // Gold color
  const pollen1 = new THREE.Mesh(new THREE.SphereGeometry(0.15, 24, 24), pollenMaterial);
  pollen1.position.set(0.2, 2.4, 0.2);
  group.add(pollen1);

  const pollen2 = pollen1.clone();
  pollen2.position.set(-0.2, 2.4, -0.2);
  group.add(pollen2);

  // === Shadows ===
  group.traverse(obj => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  scene.add(group);
}


