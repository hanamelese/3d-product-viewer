let autoRotate = true;

export function animateCamera(time, camera) {
  if (!autoRotate) return;

  const t = time * 0.0004; 
  const radius = 5;
  const y = camera.position.y||5;

  camera.position.x = radius * Math.cos(t);
  camera.position.z = radius * Math.sin(t);
  camera.position.y = y;

  camera.lookAt(2, 10, 0);
}
