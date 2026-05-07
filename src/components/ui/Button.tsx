'use client';

import { motion } from 'framer-motion';
import { magnetic } from '@/lib/motion';
import { cn } from '@/lib/cn';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'outline';

const VARIANT: Record<Variant, string> = {
  primary:
    'bg-brand-gradient text-white shadow-[var(--shadow-card)] hover:brightness-110',
  ghost:
    'bg-transparent text-[var(--color-ink)] hover:bg-[color-mix(in_oklab,var(--accent)_8%,transparent)]',
  outline:
    'border border-[var(--accent)] text-[var(--color-ink)] hover:bg-[color-mix(in_oklab,var(--accent)_10%,transparent)]',
};

type Props = ComponentProps<'button'> & {
  variant?: Variant;
  children: ReactNode;
};

export function Button({ variant = 'primary', className, children, ...rest }: Props) {
  return (
    <motion.button
      type="button"
      {...magnetic}
      className={cn(
        'focus-ring inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-colors',
        VARIANT[variant],
        className
      )}
      {...(rest as ComponentProps<typeof motion.button>)}
    >
      {children}
    </motion.button>
  );
}
