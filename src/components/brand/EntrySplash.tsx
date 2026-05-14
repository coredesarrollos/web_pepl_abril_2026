'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const STORAGE_KEY = 'pepl_entry_seen';

export function EntrySplash() {
  const [visible, setVisible] = useState(false);
  const t = useTranslations('splash');

  useEffect(() => {
    if (!sessionStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function enter() {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="entry-splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, var(--brand-from) 0%, var(--brand-to) 100%)',
          }}
          aria-modal="true"
          role="dialog"
          aria-label={t('ariaLabel')}
        >
          {/* ── Animated rings ─────────────────────────────────── */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            {([0.25, 0.5, 0.78] as const).map((s, i) => (
              <motion.span
                key={i}
                className="absolute left-1/2 top-1/2 block rounded-full border border-white/10"
                style={{ width: '90vmax', height: '90vmax' }}
                initial={{ opacity: 0, scale: s, x: '-50%', y: '-50%' }}
                animate={{ opacity: 1, scale: s + 0.08 }}
                transition={{
                  delay: i * 0.18,
                  duration: 2,
                  ease: [0.16, 1, 0.3, 1],
                  repeat: Infinity,
                  repeatType: 'reverse',
                  repeatDelay: 1.5,
                }}
              />
            ))}
          </div>

          {/* ── Isotype ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative drop-shadow-2xl"
          >
            <Image
              src="/brand/logo-isotype-mask.png"
              alt="PEpL"
              width={140}
              height={140}
              priority
            />
          </motion.div>

          {/* ── Wordmark ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 drop-shadow-lg"
          >
            <Image
              src="/brand/logo-wordmark-mask.png"
              alt=""
              width={210}
              height={50}
              priority
            />
          </motion.div>

          {/* ── Tagline ────────────────────────────────────────── */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-center text-sm font-medium uppercase tracking-[0.2em] text-white/75"
          >
            {t('tagline')}
          </motion.p>

          {/* ── Enter button ───────────────────────────────────── */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.18)' }}
            whileTap={{ scale: 0.97 }}
            onClick={enter}
            className="mt-12 rounded-full border-2 border-white/55 px-12 py-3.5 text-base font-bold tracking-widest text-white uppercase transition-colors hover:border-white/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          >
            {t('enter')}
          </motion.button>

          {/* ── Pulse hint ─────────────────────────────────────── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ delay: 1.8, duration: 2.4, repeat: Infinity }}
            className="absolute bottom-10 text-xs text-white/45 tracking-widest uppercase"
          >
            {t('hint')}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
