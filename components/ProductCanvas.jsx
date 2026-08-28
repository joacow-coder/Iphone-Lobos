'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';
import PhoneModel from './PhoneModel';

export default function ProductCanvas({ accentColor = '#8b5cf6' }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.8], fov: 32 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={40} color={accentColor} />
      <pointLight position={[-3, -1.5, 2]} intensity={25} color="#3b82f6" />
      <Environment preset="night" />
      <PhoneModel accentColor={accentColor} autoSpin />
      <ContactShadows position={[0, -1.7, 0]} opacity={0.5} blur={2.4} far={4} color="#3b0764" />
      <OrbitControls
        enablePan={false}
        enableZoom
        minDistance={3.5}
        maxDistance={9}
        autoRotate={false}
        rotateSpeed={0.6}
      />
    </Canvas>
  );
}
