import * as THREE from 'three';

export function createProduct(scene) {
  const group = new THREE.Group();

  // === Chair Components ===
  const chairMaterial = new THREE.MeshPhysicalMaterial({
    color: '#aaafff',
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

  // === Vase ===
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

  // === Pollen Spheres ===
  const pollenMaterial = new THREE.MeshStandardMaterial({ color: 0xff66cc });
  const pollen1 = new THREE.Mesh(new THREE.SphereGeometry(0.15, 24, 24), pollenMaterial);
  pollen1.position.set(0.2, 2.4, 0.2);
  group.add(pollen1);

  const pollen2 = pollen1.clone();
  pollen2.position.set(-0.2, 2.4, -0.2);
  group.add(pollen2);

  // === Tree Utilities ===
  function createLeaf(x, y, z) {
    return new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 20, 0),
      new THREE.MeshStandardMaterial({ color: 0x228b22 })
    ).position.set(x, y, z);
  }

  function createFlower(x, y, z) {
    const flowerGroup = new THREE.Group();
    const center = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 20, 20),
      new THREE.MeshStandardMaterial({ color: 0x00dd00 })
    );
    center.position.set(x, y, z);
    flowerGroup.add(center);

    const petalColors = [0xff66cc, 0xff9999, 0xffccff];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const px = x + Math.cos(angle) * 0.07;
      const pz = z + Math.sin(angle) * 0.07;
      const petal = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 12, 12),
        new THREE.MeshStandardMaterial({ color: petalColors[i % petalColors.length] })
      );
      petal.position.set(px, y, pz);
      flowerGroup.add(petal);
    }
    return flowerGroup;
  }

  function createTree({ position, withFlowers = false }) {
    const treeGroup = new THREE.Group();
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.3, 3, 12),
      new THREE.MeshStandardMaterial({ color: 0x8b5a2b })
    );
    trunk.position.set(position.x, position.y + 1, position.z);
    treeGroup.add(trunk);

    const branches = [
      [position.x + 0.3, position.y + 2.1, position.z - 0.3],
      [position.x - 0.3, position.y + 2.0, position.z + 0.3],
      [position.x, position.y + 2.4, position.z]
    ];
    branches.forEach(bPos => {
      const branch = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.8, 8),
        new THREE.MeshStandardMaterial({ color: 0x5d3a1a })
      );
      branch.position.set(...bPos);
      //treeGroup.add(branch);

      for (let i = 0; i < 13; i++) {
        const leaf = new THREE.Mesh(
          new THREE.SphereGeometry(0.04, 7, 7),
          new THREE.MeshStandardMaterial({ color:0xff66cc  })
        );
        leaf.position.set(
          bPos[0] + (Math.random() - 0.5),
          bPos[1] + 0.3 + Math.random() * 0.3,
          bPos[2] + (Math.random() - 0.5)
        );
        treeGroup.add(leaf);
      }

      if (withFlowers) {
        treeGroup.add(createFlower(bPos[0], bPos[1] + 0.4, bPos[2]));
      }
    });

    return treeGroup;
  }

  group.add(createTree({ position: { x: 0, y: 0, z: -3 }, withFlowers: true }));
  group.add(createTree({ position: { x: -3, y: 0, z: -2 }, withFlowers: true }));
  group.add(createTree({ position: { x: 3, y: 0, z: -2 }, withFlowers: true }));

  const groundColors = [0xff66cc, 0xffff66, 0x66ccff, 0xff9966];
  for (let i = 0; i < 23; i++) {
    const x = (Math.random() - 0.5) * 6;
    const z = (Math.random() - 0.5) * 6;
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.01, 0.01, 0.2, 8),
      new THREE.MeshStandardMaterial({ color: 0x228833 })
    );
    stem.position.set(x, 0.1, z);
    group.add(stem);

    const center = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xffff00 })
    );
    center.position.set(x, 0.25, z);
    group.add(center);

    for (let j = 0; j < 6; j++) {
      const angle = (j / 6) * Math.PI * 2;
      const px = x + Math.cos(angle) * 0.07;
      const pz = z + Math.sin(angle) * 0.07;
      const petal = new THREE.Mesh(
        new THREE.SphereGeometry(0.03, 12, 12),
        new THREE.MeshStandardMaterial({ color: groundColors[j % groundColors.length] })
      );
      petal.position.set(px, 0.25, pz);
      group.add(petal);
    }
  }

  group.traverse(obj => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  scene.add(group);
}
