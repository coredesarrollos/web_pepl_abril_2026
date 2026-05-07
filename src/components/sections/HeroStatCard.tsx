'use client';

import { motion } from 'framer-motion';

export function HeroStatCard({
  label,
  value,
  sublabel,
}: {
  label: string;
  value: string;
  sublabel: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, y: -8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 0.75, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="absolute right-6 top-12 z-20 min-w-[160px] rounded-2xl bg-white/92 px-5 py-4 shadow-2xl backdrop-blur-md"
    >
      <div className="mb-1 flex items-center gap-1.5 whitespace-nowrap text-xs font-medium text-[var(--color-mute)]">
        <span className="text-base leading-none">🏆</span>
        {label}
      </div>
      <div
        className="text-4xl font-black leading-none"
        style={{ color: 'var(--brand-from)' }}
      >
        {value}
      </div>
      <div className="mt-1 text-xs text-[var(--color-mute)]">{sublabel}</div>
    </motion.div>
  );
}
