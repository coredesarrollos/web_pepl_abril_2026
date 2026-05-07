import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'default' | 'hero' | 'dark' | 'accent';

const TONE_CLASS: Record<Tone, string> = {
  default: 'bg-[var(--color-paper)] text-[var(--color-ink-soft)]',
  hero: 'bg-[var(--color-paper)] text-[var(--color-ink)]',
  dark: 'bg-[var(--color-ink)] text-[var(--color-paper)]',
  accent: 'bg-brand-gradient text-white',
};

export function Section({
  id,
  tone = 'default',
  children,
  className,
  as: Tag = 'section',
  containerClassName,
}: {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  as?: 'section' | 'header' | 'footer' | 'div';
}) {
  return (
    <Tag
      id={id}
      className={cn('relative w-full px-6 py-20 md:py-28 lg:py-32', TONE_CLASS[tone], className)}
    >
      <div className={cn('mx-auto w-full max-w-6xl', containerClassName)}>{children}</div>
    </Tag>
  );
}
