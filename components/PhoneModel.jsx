'use client';

import { forwardRef, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Cylinder } from '@react-three/drei';

/**
 * Stylized, procedural "premium smartphone" — no borrowed CAD data or
 * copyrighted assets, built entirely from primitives so it evokes the
 * category without reproducing any specific manufacturer's design.
 */
const PhoneModel = forwardRef(function PhoneModel(
  { accentColor = '#8b5cf6', autoSpin = false, ...groupProps },
  forwardedRef
) {
  const screenRef = useRef(null);
  const groupRef = useRef(null);

  const setRefs = (node) => {
    groupRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  useFrame((state, delta) => {
    if (autoSpin && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
    }
    if (screenRef.current) {
      const pulse = 0.55 + Math.sin(state.clock.elapsedTime * 1.2) * 0.15;
      screenRef.current.material.emissiveIntensity = pulse;
    }
  });

  return (
    <group ref={setRefs} {...groupProps}>
      {/* Body */}
      <RoundedBox args={[1.4, 2.85, 0.16]} radius={0.16} smoothness={6} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#0b0b14"
          metalness={0.75}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.08}
          reflectivity={0.6}
        />
      </RoundedBox>

      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0, 0.082]}>
        <planeGeometry args={[1.22, 2.62]} />
        <meshStandardMaterial
          color="#05030d"
          emissive={accentColor}
          emissiveIntensity={0.55}
          roughness={0.25}
          metalness={0.2}
        />
      </mesh>

      {/* Edge glass rim highlight */}
      <RoundedBox args={[1.42, 2.87, 0.17]} radius={0.17} smoothness={6}>
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.06}
          roughness={0}
          metalness={0}
          transmission={0.9}
          thickness={0.2}
        />
      </RoundedBox>

      {/* Camera module */}
      <group position={[-0.42, 0.95, -0.1]}>
        <RoundedBox args={[0.58, 0.58, 0.05]} radius={0.14} smoothness={4} position={[0, 0, 0]}>
          <meshPhysicalMaterial color="#111118" metalness={0.7} roughness={0.3} />
        </RoundedBox>
        {[
          [-0.14, 0.14],
          [0.14, 0.14],
          [-0.14, -0.14],
        ].map(([x, y], i) => (
          <Cylinder
            key={i}
            args={[0.11, 0.11, 0.04, 24]}
            rotation={[Math.PI / 2, 0, 0]}
            position={[x, y, 0.03]}
          >
            <meshPhysicalMaterial
              color="#02040a"
              metalness={0.9}
              roughness={0.05}
              clearcoat={1}
              envMapIntensity={1.4}
            />
          </Cylinder>
        ))}
      </group>
    </group>
  );
});

export default PhoneModel;
