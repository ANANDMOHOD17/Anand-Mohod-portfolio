/**
 * WebGL Capability and Hardware Detection Utility
 */

export interface WebGLCapabilities {
  isSupported: boolean;
  isWebGL2: boolean;
  isLowEnd: boolean;
  maxDpr: number;
  particleCount: number;
  prefersReducedMotion: boolean;
}

export function detectWebGL(): WebGLCapabilities {
  if (typeof window === 'undefined') {
    return {
      isSupported: false,
      isWebGL2: false,
      isLowEnd: true,
      maxDpr: 1,
      particleCount: 500,
      prefersReducedMotion: false,
    };
  }

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  let isSupported = false;
  let isWebGL2 = false;

  try {
    const canvas = document.createElement('canvas');
    const gl2 = canvas.getContext('webgl2');
    if (gl2) {
      isSupported = true;
      isWebGL2 = true;
    } else {
      const gl =
        canvas.getContext('webgl') ||
        (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
      if (gl) {
        isSupported = true;
      }
    }
  } catch {
    isSupported = false;
  }

  // Device & Screen heuristics
  const isMobile =
    window.innerWidth < 768 ||
    /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const isLowEnd = isMobile || hardwareConcurrency <= 4;

  const maxDpr = isLowEnd ? 1.5 : Math.min(window.devicePixelRatio || 1, 2);
  const particleCount = prefersReducedMotion
    ? 0
    : isLowEnd
    ? 500
    : 1500;

  return {
    isSupported,
    isWebGL2,
    isLowEnd,
    maxDpr,
    particleCount,
    prefersReducedMotion,
  };
}
