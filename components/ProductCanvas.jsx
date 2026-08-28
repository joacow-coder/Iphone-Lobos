'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import PhoneGLTF from './PhoneGLTF';

export default function ProductCanvas() {
  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [0, 0, 5.8], fov: 32 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={40} color="#8b5cf6" />
      <pointLight position={[-3, -1.5, 2]} intensity={25} color="#3b82f6" />
      <Suspense fallback={null}>
        <PhoneGLTF />
      </Suspense>
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      <ContactShadows position={[0, -1.7, 0]} opacity={0.5} blur={2.4} far={4} color="#3b0764" />
      {/* frameloop="demand" needs a render loop to pause safely; drei's
          OrbitControls calls invalidate() on every drag automatically. */}
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={3.5}
        maxDistance={9}
        autoRotate={false}
        rotateSpeed={0.6}
        makeDefault
      />
    </Canvas>
  );
}
