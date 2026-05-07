/**
 * PEpL motion presets — single source of truth for animations.
 * Use these via <Reveal preset="..."/> or pass directly to motion components.
 * NEVER define ad-hoc transitions in component files.
 */

import type { Transition, Variants } from 'framer-motion';

export const EASE = {
  /** Snappy, energetic — default for entrances */
  out: [0.16, 1, 0.3, 1] as const,
  /** Soft, ceremonial — for hero reveals */
  ceremony: [0.22, 1, 0.36, 1] as const,
  /** Quick, attention-grabbing — for badges, counters */
  pop: [0.34, 1.56, 0.64, 1] as const,
} as const;

export const DURATION = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  hero: 1.2,
} as const;

const baseTransition: Transition = {
  duration: DURATION.base,
  ease: EASE.out,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: baseTransition },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.fast, ease: EASE.pop },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: baseTransition },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: { opacity: 1, x: 0, transition: baseTransition },
};

/** Container for orchestrating staggered children. */
export const stagger = (stagger = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren },
  },
});

/** Per-letter / per-word reveal (used for hero copy). */
export const wordReveal: Variants = {
  hidden: { opacity: 0, y: '0.6em' },
  show: {
    opacity: 1,
    y: '0em',
    transition: { duration: DURATION.base, ease: EASE.ceremony },
  },
};

/** Parallax helper: returns a transform style; combine with useScroll/useTransform. */
export const parallaxOffset = (intensity = 50) => ({
  y: [`${-intensity}px`, `${intensity}px`],
});

/**
 * Magnetic hover preset — apply to interactive surfaces.
 * Returns props for a motion.div whileHover/whileTap.
 */
export const magnetic = {
  whileHover: { scale: 1.03, transition: { duration: 0.2, ease: EASE.out } },
  whileTap: { scale: 0.97, transition: { duration: 0.12, ease: EASE.out } },
} as const;

export const PRESETS = {
  fadeUp,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
  wordReveal,
} as const;

export type PresetName = keyof typeof PRESETS;
