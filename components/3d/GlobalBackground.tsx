'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { detectWebGL, WebGLCapabilities } from '@/lib/webgl';

// Sub-component inside the R3F Canvas
function ParticleField({
  particleCount,
  isLowEnd,
}: {
  particleCount: number;
  isLowEnd: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ progress: 0, targetProgress: 0 });

  // Generate particle positions and colors
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color('#38bdf8'); // Cyan
    const color2 = new THREE.Color('#a855f7'); // Violet
    const tempColor = new THREE.Color();

    for (let i = 0; i < particleCount; i++) {
      // Cylindrical / spherical spread in depth
      const radius = 15 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 50;

      pos[i * 3] = Math.cos(theta) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60;

      // Color gradient between cyan and violet
      const mixRatio = Math.random();
      tempColor.lerpColors(color1, color2, mixRatio);
      col[i * 3] = tempColor.r;
      col[i * 3 + 1] = tempColor.g;
      col[i * 3 + 2] = tempColor.b;
    }

    return [pos, col];
  }, [particleCount]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        scrollRef.current.targetProgress = window.scrollY / maxScroll;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    // Smooth lerp mouse coordinates
    mouseRef.current.x +=
      (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
    mouseRef.current.y +=
      (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

    // Smooth lerp scroll progress
    scrollRef.current.progress +=
      (scrollRef.current.targetProgress - scrollRef.current.progress) * 0.05;

    // Subtle drift rotation
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x = mouseRef.current.y * 0.15;
    pointsRef.current.rotation.z = mouseRef.current.x * 0.1;

    // Scroll-driven camera drift along Z
    state.camera.position.z =
      25 - scrollRef.current.progress * 12;
    state.camera.position.y =
      mouseRef.current.y * 2 - scrollRef.current.progress * 5;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isLowEnd ? 0.12 : 0.18}
        vertexColors
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// 2D Fallback for non-WebGL / low-capability / reduced motion devices
function Canvas2DFallback() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.6 + 0.2,
      speed: Math.random() * 0.2 + 0.05,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Radial background glow
      const gradient = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        100,
        width * 0.5,
        height * 0.3,
        width * 0.8
      );
      gradient.addColorStop(0, 'rgba(56, 189, 248, 0.04)');
      gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.03)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw stars
      ctx.fillStyle = '#38bdf8';
      for (const star of stars) {
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.y -= star.speed;
        if (star.y < 0) {
          star.y = height;
          star.x = Math.random() * width;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      aria-hidden="true"
    />
  );
}

export function GlobalBackground() {
  const [caps, setCaps] = useState<WebGLCapabilities | null>(null);
  const [isTabVisible, setIsTabVisible] = useState(true);

  useEffect(() => {
    setCaps(detectWebGL());

    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  if (!caps) return null;

  // Graceful fallback to 2D canvas if WebGL unsupported or user prefers reduced motion
  if (!caps.isSupported || caps.prefersReducedMotion) {
    return <Canvas2DFallback />;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-1000 overflow-hidden"
      aria-hidden="true"
    >
      {/* Ambient gradient orbs that shift subtly */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" />
      <div className="absolute top-2/3 -right-48 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px] animate-pulse" />

      {isTabVisible && (
        <Canvas
          dpr={[1, caps.maxDpr]}
          camera={{ position: [0, 0, 25], fov: 60 }}
          gl={{
            antialias: false,
            powerPreference: 'high-performance',
            alpha: true,
            stencil: false,
            depth: false,
          }}
          className="w-full h-full"
        >
          <ParticleField
            particleCount={caps.particleCount}
            isLowEnd={caps.isLowEnd}
          />
        </Canvas>
      )}
    </div>
  );
}

export default GlobalBackground;
