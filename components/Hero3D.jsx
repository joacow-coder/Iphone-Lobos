'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import PhoneModel from './PhoneModel';

function ScrollLinkedPhone({ rotationProgress }) {
  const groupRef = useRef(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotationProgress.get();
      groupRef.current.rotation.x = Math.sin(rotationProgress.get() * 0.3) * 0.06;
    }
  });

  return <PhoneModel ref={groupRef} position={[0, 0, 0]} />;
}

export default function Hero3D() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const rotationProgress = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div ref={containerRef} className="relative h-[180vh]">
      <motion.div
        style={{ opacity, scale, y }}
        className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-cosmic-glow" aria-hidden="true" />
        <Canvas
          camera={{ position: [0, 0, 7], fov: 30 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.35} />
          <pointLight position={[3, 3, 3]} intensity={45} color="#8b5cf6" />
          <pointLight position={[-3, -1.5, 2]} intensity={28} color="#3b82f6" />
          <directionalLight position={[0, 4, 5]} intensity={0.6} color="#ffffff" />
          <Environment preset="night" />
          <ScrollLinkedPhone rotationProgress={rotationProgress} />
          <ContactShadows position={[0, -1.7, 0]} opacity={0.55} blur={2.6} far={4.2} color="#3b0764" />
        </Canvas>
        <span className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 animate-float text-xs uppercase tracking-[0.3em] text-white/40">
          Scroll para explorar
        </span>
      </motion.div>
    </div>
  );
}
