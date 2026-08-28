'use client';

import { forwardRef, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Cylinder } from '@react-three/drei';
import { createBrushedNormalMap } from './proceduralTextures';

const FRAME_COLOR = '#5b4bb8'; // "Cosmic Glass" metallic violet finish
const GLASS_BACK_COLOR = '#0a0a14';

/**
 * Stylized, procedural "premium smartphone" — no borrowed CAD data,
 * textures, or copyrighted photography. Built from primitives so it evokes
 * a premium metal-and-glass handset without reproducing any specific
 * manufacturer's design, in the site's own "Cosmic Glass" finish.
 */
const PhoneModel = forwardRef(function PhoneModel(
  { accentColor = '#8b5cf6', autoSpin = false, ...groupProps },
  forwardedRef
) {
  const screenRef = useRef(null);
  const groupRef = useRef(null);

  const metalNormal = useMemo(() => createBrushedNormalMap({ size: 128, strength: 0.3, vertical: true }), []);
  const glassNormal = useMemo(() => createBrushedNormalMap({ size: 64, strength: 0.5, vertical: false }), []);

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
      {/* Metal frame */}
      <RoundedBox args={[1.42, 2.88, 0.16]} radius={0.17} smoothness={4} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={FRAME_COLOR}
          metalness={0.9}
          roughness={0.32}
          normalMap={metalNormal}
          normalScale={[0.6, 0.6]}
          clearcoat={0.6}
          clearcoatRoughness={0.25}
        />
      </RoundedBox>

      {/* Glass back panel (inset, slightly smaller than the frame) */}
      <RoundedBox
        args={[1.34, 2.8, 0.03]}
        radius={0.15}
        smoothness={4}
        position={[0, 0, -0.07]}
      >
        <meshPhysicalMaterial
          color={GLASS_BACK_COLOR}
          metalness={0.15}
          roughness={0.22}
          normalMap={glassNormal}
          normalScale={[0.15, 0.15]}
          clearcoat={1}
          clearcoatRoughness={0.1}
          iridescence={0.25}
          iridescenceIOR={1.3}
          envMapIntensity={1.1}
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

      {/* Thin glass edge highlight */}
      <RoundedBox args={[1.44, 2.9, 0.17]} radius={0.18} smoothness={4}>
        <meshPhysicalMaterial
          color="#ffffff"
          transparent
          opacity={0.05}
          roughness={0}
          metalness={0}
          transmission={0.9}
          thickness={0.2}
        />
      </RoundedBox>

      {/* Camera plateau — wide rounded bar, generic layout (not brand-specific) */}
      <group position={[0, 1.02, -0.095]}>
        <RoundedBox args={[1.06, 0.62, 0.055]} radius={0.16} smoothness={4}>
          <meshPhysicalMaterial
            color="#111018"
            metalness={0.75}
            roughness={0.28}
            normalMap={metalNormal}
            normalScale={[0.3, 0.3]}
            clearcoat={0.4}
          />
        </RoundedBox>
        {[
          [-0.3, 0.08],
          [0.02, 0.08],
          [-0.14, -0.14],
        ].map(([x, y], i) => (
          <group key={i} position={[x, y, 0.032]}>
            <Cylinder args={[0.135, 0.135, 0.025, 28]} rotation={[Math.PI / 2, 0, 0]}>
              <meshPhysicalMaterial color="#06070c" metalness={0.6} roughness={0.4} />
            </Cylinder>
            <Cylinder args={[0.095, 0.095, 0.03, 28]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.006]}>
              <meshPhysicalMaterial
                color="#02040a"
                metalness={0.95}
                roughness={0.04}
                clearcoat={1}
                envMapIntensity={1.6}
              />
            </Cylinder>
          </group>
        ))}
        {/* flash */}
        <Cylinder
          args={[0.05, 0.05, 0.02, 16]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[0.32, 0.08, 0.03]}
        >
          <meshPhysicalMaterial color="#d8d8e0" metalness={0.2} roughness={0.5} />
        </Cylinder>
      </group>
    </group>
  );
});

export default PhoneModel;
