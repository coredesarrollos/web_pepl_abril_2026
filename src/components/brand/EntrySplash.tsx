'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const STORAGE_KEY = 'pepl_entry_seen';

/** Nebula blobs — brand hues as large glowing spheres, mix-blend: screen */
const BLOBS = [
  { color: '#5B1FE8', x: 8,  y: 12, size: 720, dur: 20, ox: [0, 50, -30, 20, 0],  oy: [0, -40, 50, -20, 0]  },
  { color: '#00B7E9', x: 74, y: 70, size: 600, dur: 24, ox: [0, -40, 25, -15, 0], oy: [0, 30, -45, 20, 0]   },
  { color: '#F58634', x: 60, y: 6,  size: 460, dur: 17, ox: [0, 30, -20, 35, 0],  oy: [0, 40, -25, 30, 0]   },
  { color: '#E91E5A', x: 15, y: 75, size: 520, dur: 21, ox: [0, -35, 40, -25, 0], oy: [0, -30, 20, -40, 0]  },
  { color: '#9B1DFF', x: 84, y: 38, size: 380, dur: 15, ox: [0, 20, -45, 15, 0],  oy: [0, 35, -20, 45, 0]   },
];

/** Colors for the exit burst rings */
const BURST_COLORS = ['#00B7E9', '#F58634', '#E91E5A'];

export function EntrySplash() {
  const [visible, setVisible] = useState(false);
  const [bursting, setBursting] = useState(false);
  const t = useTranslations('splash');

  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  function enter() {
    setBursting(true);
    setTimeout(() => {
      sessionStorage.setItem(STORAGE_KEY, '1');
      setVisible(false);
      setBursting(false);
    }, 680);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="entry-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#06040F]"
          aria-modal="true"
          role="dialog"
          aria-label={t('ariaLabel')}
        >
          {/* ── Nebula blobs ───────────────────────────────────── */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {BLOBS.map((b, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: b.size,
                  height: b.size,
                  left: `${b.x}%`,
                  top: `${b.y}%`,
                  translate: '-50% -50%',
                  background: `radial-gradient(circle, ${b.color}CC 0%, ${b.color}44 45%, transparent 70%)`,
                  filter: 'blur(72px)',
                  mixBlendMode: 'screen',
                }}
                animate={{ x: b.ox, y: b.oy, scale: [1, 1.18, 0.88, 1.12, 1] }}
                transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>

          {/* ── Exit burst rings ───────────────────────────────── */}
          <AnimatePresence>
            {bursting && BURST_COLORS.map((c, i) => (
              <motion.span
                key={i}
                className="pointer-events-none absolute left-1/2 top-1/2 block rounded-full"
                style={{ background: `radial-gradient(circle, ${c}99, transparent 70%)` }}
                initial={{ width: 60, height: 60, x: '-50%', y: '-50%', opacity: 0.95 }}
                animate={{ width: '280vmax', height: '280vmax', opacity: 0 }}
                transition={{ delay: i * 0.07, duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </AnimatePresence>

          {/* ── Center content ─────────────────────────────────── */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Glow halo */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ width: 340, height: 340, background: 'radial-gradient(circle, #5B1FE866 0%, transparent 70%)', filter: 'blur(32px)' }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.45 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 1.1, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                filter:
                  'drop-shadow(0 0 32px rgba(0,183,233,0.9)) drop-shadow(0 0 64px rgba(91,31,232,0.6))',
              }}
            >
              {/* source: 150×219 — display at 90×auto for solo hero moment */}
              <Image
                src="/brand/logo-isotype-mask.png"
                alt="PEpL"
                width={150}
                height={219}
                quality={100}
                priority
                style={{ width: '90px', height: 'auto' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.7, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6"
              style={{
                filter: 'drop-shadow(0 2px 18px rgba(0,183,233,0.4))',
              }}
            >
              {/* source: 529×273 — display at 264×auto for perfect 2x retina rendering */}
              <Image
                src="/brand/logo-wordmark-mask.png"
                alt=""
                width={529}
                height={273}
                quality={100}
                priority
                style={{ width: '264px', height: 'auto' }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.7 }}
              className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60"
            >
              {t('tagline')}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.85, duration: 0.7 }}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.95 }}
              onClick={enter}
              className="mt-11 rounded-full border border-white/30 bg-white/5 px-14 py-3.5 text-sm font-bold uppercase tracking-[0.22em] text-white backdrop-blur-sm transition-colors hover:border-white/75 hover:bg-white/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              {t('enter')}
            </motion.button>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ delay: 4.0, duration: 2.8, repeat: Infinity }}
            className="absolute bottom-10 text-[10px] uppercase tracking-[0.3em] text-white/35"
          >
            {t('hint')}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
