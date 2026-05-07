'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { PRESETS, type PresetName } from '@/lib/motion';
import type { ElementType, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  preset?: PresetName;
  delay?: number;
  className?: string;
  /** Render as a different element (default `div`). */
  as?: ElementType;
  /** Animate every time it enters viewport (default false = once). */
  repeat?: boolean;
  /** viewport amount threshold (0..1) */
  amount?: number;
};

export function Reveal({
  children,
  preset = 'fadeUp',
  delay = 0,
  className,
  as = 'div',
  repeat = false,
  amount = 0.3,
}: Props) {
  const reduce = useReducedMotion();
  const variants = PRESETS[preset];
  const Tag = motion[as as keyof typeof motion] as typeof motion.div;

  if (reduce) {
    const Static = as as ElementType;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, amount }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}
