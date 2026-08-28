import * as THREE from 'three';

/**
 * Tiny self-contained procedural normal map (brushed-metal / soft grain).
 * No external image assets — generated once on the client and memoized,
 * keeping the bundle small with zero licensing surface.
 */
export function createBrushedNormalMap({ size = 128, strength = 0.35, vertical = true } = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const heights = new Float32Array(size * size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const grainAxis = vertical ? x : y;
      const grain = Math.sin(grainAxis * 1.7) * 0.5 + Math.sin(grainAxis * 5.3) * 0.2;
      const noise = Math.random() * 2 - 1;
      heights[y * size + x] = grain * 0.6 + noise * strength;
    }
  }

  const imageData = ctx.createImageData(size, size);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const l = heights[y * size + Math.max(0, x - 1)];
      const r = heights[y * size + Math.min(size - 1, x + 1)];
      const u = heights[Math.max(0, y - 1) * size + x];
      const d = heights[Math.min(size - 1, y + 1) * size + x];

      const nx = (l - r) * 1.5;
      const ny = (u - d) * 1.5;
      const nz = 1;
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz);

      const i = (y * size + x) * 4;
      imageData.data[i] = ((nx / len) * 0.5 + 0.5) * 255;
      imageData.data[i + 1] = ((ny / len) * 0.5 + 0.5) * 255;
      imageData.data[i + 2] = ((nz / len) * 0.5 + 0.5) * 255;
      imageData.data[i + 3] = 255;
    }
  }
  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}
