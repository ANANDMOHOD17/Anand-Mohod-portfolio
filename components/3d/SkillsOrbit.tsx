'use client';

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { skillsData } from '@/data/skills';
import { Skill } from '@/types';
import { detectWebGL } from '@/lib/webgl';
import {
  Terminal,
  Cpu,
  Code2,
  Coffee,
  Layout,
  Palette,
  FileCode,
  Atom,
  Database,
  Zap,
  Brain,
  Server,
  Layers,
  GitBranch,
  Github,
  MonitorCheck,
  LucideIcon,
  Sparkles,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Terminal,
  Cpu,
  Code2,
  Coffee,
  Layout,
  Palette,
  FileCode,
  Atom,
  Database,
  Zap,
  Brain,
  Server,
  Layers,
  GitBranch,
  Github,
  MonitorCheck,
};

interface SkillNodeProps {
  skill: Skill;
  position: [number, number, number];
  isSelectedCategory: boolean;
  onHover: (skill: Skill | null) => void;
}

function SkillNode({
  skill,
  position,
  isSelectedCategory,
  onHover,
}: SkillNodeProps) {
  const Icon = ICON_MAP[skill.iconName] || Code2;
  const projectCount = skill.relatedProjects.length;
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(skill);
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
        }}
      >
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial
          color={
            hovered
              ? '#38bdf8'
              : isSelectedCategory
              ? '#38bdf8'
              : '#64748b'
          }
          transparent
          opacity={isSelectedCategory ? 0.9 : 0.25}
        />
      </mesh>

      <Html
        center
        distanceFactor={10}
        style={{
          transition: 'all 0.3s ease',
          opacity: isSelectedCategory ? (hovered ? 1 : 0.9) : 0.25,
          transform: `scale(${hovered ? 1.25 : isSelectedCategory ? 1 : 0.85})`,
          pointerEvents: 'auto',
        }}
      >
        <div
          onMouseEnter={() => {
            setHovered(true);
            onHover(skill);
          }}
          onMouseLeave={() => {
            setHovered(false);
            onHover(null);
          }}
          className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl border backdrop-blur-md cursor-pointer transition-all duration-200 select-none ${
            hovered
              ? 'bg-cyan-500/25 border-cyan-400 text-white shadow-[0_0_25px_rgba(56,189,248,0.5)] scale-110 z-50'
              : isSelectedCategory
              ? 'bg-graphite-900/80 border-white/20 text-slate-200 hover:border-cyan-400'
              : 'bg-graphite-900/40 border-white/5 text-slate-500'
          }`}
        >
          <Icon
            className={`w-4 h-4 shrink-0 transition-colors ${
              hovered || isSelectedCategory ? 'text-cyan-400' : 'text-slate-500'
            }`}
          />
          <span className="text-xs font-semibold whitespace-nowrap">
            {skill.name}
          </span>
          {projectCount > 0 && (
            <span
              className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                hovered
                  ? 'bg-cyan-400 text-slate-950 font-bold'
                  : 'bg-white/10 text-slate-300'
              }`}
            >
              {projectCount}
            </span>
          )}
        </div>
      </Html>
    </group>
  );
}

function OrbitSphere({
  activeCategory,
  onHoverSkill,
}: {
  activeCategory: string;
  onHoverSkill: (skill: Skill | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const isDraggingRef = useRef(false);
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0.004 });

  // Calculate Fibonacci sphere distribution for uniform 3D placement
  const sphereNodes = useMemo(() => {
    const count = skillsData.length;
    const radius = 3.6;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    return skillsData.map((skill, i) => {
      const y = 1 - (i / (count - 1)) * 2; // y from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY * radius;
      const z = Math.sin(theta) * radiusAtY * radius;

      return {
        skill,
        position: [x, y * radius, z] as [number, number, number],
      };
    });
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (!isDraggingRef.current) {
      // Natural slow rotational drift with damping
      velocityRef.current.y = THREE.MathUtils.lerp(
        velocityRef.current.y,
        0.003,
        0.02
      );
      velocityRef.current.x = THREE.MathUtils.lerp(
        velocityRef.current.x,
        0,
        0.02
      );

      groupRef.current.rotation.y += velocityRef.current.y;
      groupRef.current.rotation.x += velocityRef.current.x;
    }
  });

  const handlePointerDown = (e: any) => {
    isDraggingRef.current = true;
    prevPointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: any) => {
    if (!isDraggingRef.current || !groupRef.current) return;

    const deltaX = e.clientX - prevPointerRef.current.x;
    const deltaY = e.clientY - prevPointerRef.current.y;

    velocityRef.current = { x: deltaY * 0.005, y: deltaX * 0.005 };

    groupRef.current.rotation.y += deltaX * 0.007;
    groupRef.current.rotation.x += deltaY * 0.007;

    prevPointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <group
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Central Ethereal Sphere Glow */}
      <mesh>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshBasicMaterial
          color="#0ea5e9"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Outer Connecting Ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.5, 3.55, 64]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {sphereNodes.map(({ skill, position }) => {
        const isSelectedCategory =
          activeCategory === 'All' || skill.category === activeCategory;

        return (
          <SkillNode
            key={skill.name}
            skill={skill}
            position={position}
            isSelectedCategory={isSelectedCategory}
            onHover={onHoverSkill}
          />
        );
      })}
    </group>
  );
}

interface SkillsOrbitProps {
  activeCategory: string;
}

export function SkillsOrbit({ activeCategory }: SkillsOrbitProps) {
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [caps, setCaps] = useState<any>(null);

  useEffect(() => {
    setCaps(detectWebGL());
  }, []);

  if (caps && (!caps.isSupported || caps.isLowEnd || caps.prefersReducedMotion)) {
    return null; // Return null so 2D grid displays seamlessly
  }

  return (
    <div className="w-full relative h-[480px] sm:h-[540px] md:h-[600px] flex items-center justify-center">
      {/* Background radial glow */}
      <div className="absolute inset-0 m-auto w-72 h-72 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

      {/* Floating Canvas */}
      <Canvas
        camera={{ position: [0, 0, 8.5], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ambientLight intensity={1.2} />
        <OrbitSphere
          activeCategory={activeCategory}
          onHoverSkill={setHoveredSkill}
        />
      </Canvas>

      {/* Active Skill Info HUD Overlay */}
      {hoveredSkill && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-5 py-3 rounded-2xl glass-panel border border-cyan-500/40 shadow-xl backdrop-blur-xl max-w-sm w-full text-center transition-all animate-fade-in pointer-events-none">
          <div className="flex items-center justify-center gap-2">
            <span className="font-bold text-white text-base">
              {hoveredSkill.name}
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              {hoveredSkill.category}
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed">
            {hoveredSkill.description}
          </p>
          {hoveredSkill.relatedProjects.length > 0 && (
            <p className="text-[11px] text-cyan-400 font-mono mt-1 font-semibold">
              Applied in {hoveredSkill.relatedProjects.length} portfolio{' '}
              {hoveredSkill.relatedProjects.length === 1 ? 'project' : 'projects'}
            </p>
          )}
        </div>
      )}

      {/* Hint Badge */}
      <div className="absolute top-2 right-4 px-3 py-1 rounded-full bg-graphite-900/80 border border-white/10 text-[11px] font-mono text-slate-400 flex items-center gap-1.5 shadow-sm pointer-events-none">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>Drag to rotate • Hover to inspect</span>
      </div>
    </div>
  );
}

export default SkillsOrbit;
