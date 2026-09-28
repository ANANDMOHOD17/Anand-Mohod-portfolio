/**
 * Central Motion Design Tokens & Easing Curves
 * Shared across GSAP, Framer Motion, and CSS transitions.
 */

export const TRANSITION_EASE = {
  // Cubic bezier easing curves
  smoothOut: [0.16, 1, 0.3, 1] as const,
  energetic: [0.22, 1, 0.36, 1] as const,
  anticipate: [0.34, 1.56, 0.64, 1] as const,
  soft: [0.25, 0.1, 0.25, 1] as const,
};

export const GSAP_EASE = {
  smoothOut: 'power3.out',
  power2Out: 'power2.out',
  power4Out: 'power4.out',
  circOut: 'circ.out',
  expoOut: 'expo.out',
  backOut: 'back.out(1.4)',
};

export const MOTION_DURATIONS = {
  instant: 0.1,
  fast: 0.25,
  base: 0.45,
  medium: 0.7,
  slow: 1.1,
  stagger: 0.08,
};

export const SPRING_PRESETS = {
  snappy: { type: 'spring', stiffness: 400, damping: 30 },
  bouncy: { type: 'spring', stiffness: 300, damping: 15 },
  gentle: { type: 'spring', stiffness: 180, damping: 24 },
  stiff: { type: 'spring', stiffness: 500, damping: 35 },
};

export const FADE_UP_VARIANTS = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.base,
      ease: TRANSITION_EASE.smoothOut,
      delay: custom * MOTION_DURATIONS.stagger,
    },
  }),
};
