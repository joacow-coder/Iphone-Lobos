'use client';

import { forwardRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

const MODEL_PATH = '/models/iphone.glb';
// The source model is real-world scale (~0.15 world units tall); this
// brings it in line with the scene's own unit convention.
const BASE_SCALE = 19;

const PhoneGLTF = forwardRef(function PhoneGLTF(groupProps, forwardedRef) {
  const { scene } = useGLTF(MODEL_PATH);
  // Clone so the cached GLTF scene graph can be reused safely across the
  // hero and the product modal without fighting over a single parent.
  const cloned = useMemo(() => scene.clone(true), [scene]);

  return (
    <group ref={forwardedRef} {...groupProps}>
      <primitive object={cloned} scale={BASE_SCALE} />
    </group>
  );
});

useGLTF.preload(MODEL_PATH);

export default PhoneGLTF;
