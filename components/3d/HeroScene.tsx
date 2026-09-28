'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { detectWebGL } from '@/lib/webgl';

function TorusCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useFrame((state, delta) => {
    // Mouse tracking lerp
    mouseRef.current.targetX = state.pointer.x * 0.8;
    mouseRef.current.targetY = state.pointer.y * 0.8;

    mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
    mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.35;
      meshRef.current.rotation.y += delta * 0.45;
      meshRef.current.rotation.z = mouseRef.current.x * 0.5;

      // Mouse tilt offset
      meshRef.current.position.x = mouseRef.current.x * 0.4;
      meshRef.current.position.y = mouseRef.current.y * 0.4;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.5;
      ring1Ref.current.rotation.y += delta * 0.2;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.4;
      ring2Ref.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group>
      {/* Floating Centerpiece */}
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1.3, 0.38, 128, 32, 2, 3]} />
          <meshPhysicalMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.4}
            roughness={0.18}
            metalness={0.82}
            clearcoat={0.9}
            clearcoatRoughness={0.1}
            wireframe={false}
          />
        </mesh>
      </Float>

      {/* Outer Cyan Orbital Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.6} />
      </mesh>

      {/* Outer Violet Orbital Ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.5} />
      </mesh>

      {/* Ambient & Accent Lights */}
      <ambientLight intensity={0.7} />
      <pointLight position={[6, 6, 6]} intensity={3.5} color="#38bdf8" />
      <pointLight position={[-6, -6, -4]} intensity={2.5} color="#a855f7" />
      <directionalLight position={[0, 10, 5]} intensity={1.5} color="#ffffff" />
    </group>
  );
}

export function HeroScene() {
  const caps = typeof window !== 'undefined' ? detectWebGL() : null;

  if (caps && (!caps.isSupported || caps.prefersReducedMotion)) {
    // 2D Static Glowing Emblem Fallback
    return (
      <div className="w-full h-full min-h-[340px] flex items-center justify-center relative">
        <div className="w-48 h-48 rounded-full border border-cyan-500/30 flex items-center justify-center bg-cyan-950/20 backdrop-blur-md shadow-[0_0_50px_rgba(56,189,248,0.2)]">
          <div className="w-32 h-32 rounded-full border border-violet-500/40 flex items-center justify-center animate-spin-slow">
            <span className="font-mono text-2xl font-bold bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">
              &lt;AM /&gt;
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[360px] sm:h-[440px] lg:h-[480px] relative pointer-events-auto">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 m-auto w-64 h-64 bg-cyan-500/15 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute inset-0 m-auto w-48 h-48 bg-violet-600/15 rounded-full blur-[80px] pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <TorusCore />
      </Canvas>
    </div>
  );
}

export default HeroScene;
