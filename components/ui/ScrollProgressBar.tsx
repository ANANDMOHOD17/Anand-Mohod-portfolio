'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-accent via-sky-400 to-cyan-300 origin-left z-50 pointer-events-none shadow-[0_0_8px_rgba(56,189,248,0.5)]"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
