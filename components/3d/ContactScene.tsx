'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { detectWebGL } from '@/lib/webgl';

function FloatingIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.5;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.3;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.7}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.3}
            wireframe
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* Orbiting Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[1.8, 1.85, 48]} />
        <meshBasicMaterial
          color="#a855f7"
          transparent
          opacity={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      <ambientLight intensity={0.8} />
      <pointLight position={[4, 4, 4]} intensity={2.5} color="#38bdf8" />
      <pointLight position={[-4, -4, -2]} intensity={2} color="#a855f7" />
    </group>
  );
}

export function ContactScene() {
  const caps = typeof window !== 'undefined' ? detectWebGL() : null;

  if (caps && (!caps.isSupported || caps.isLowEnd || caps.prefersReducedMotion)) {
    return null;
  }

  return (
    <div className="w-24 h-24 sm:w-28 sm:h-28 relative mx-auto mb-6 pointer-events-none">
      <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-[30px]" />
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        className="w-full h-full"
      >
        <FloatingIcosahedron />
      </Canvas>
    </div>
  );
}

export default ContactScene;
