'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { EASE } from '@/lib/motion';

/**
 * Decorative animated gradient blobs behind the hero copy.
 * Pure CSS/SVG — no images, no third-party loads (CSP-friendly).
 */
export function HeroBackdrop() {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        className="absolute -right-20 -top-20 h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, var(--brand-from), transparent 70%)',
        }}
        initial={reduce ? false : { scale: 0.9, opacity: 0 }}
        animate={reduce ? undefined : { scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.4, ease: EASE.ceremony }}
      />
      <motion.div
        className="absolute -left-20 top-40 h-[420px] w-[420px] rounded-full opacity-50 blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, var(--brand-to), transparent 70%)',
        }}
        initial={reduce ? false : { scale: 0.85, opacity: 0 }}
        animate={reduce ? undefined : { scale: 1, opacity: 0.5 }}
        transition={{ duration: 1.6, ease: EASE.ceremony, delay: 0.15 }}
      />
    </div>
  );
}
