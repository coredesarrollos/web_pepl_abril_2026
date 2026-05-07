'use client';

import { useState } from 'react';

export function HeroEmailForm({
  placeholder,
  cta,
}: {
  placeholder: string;
  cta: string;
}) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contact = document.getElementById('contact');
    if (!contact) return;
    contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (email) {
      requestAnimationFrame(() => {
        const input = contact.querySelector<HTMLInputElement>('input[type="email"]');
        if (input) {
          // Use native value setter so React's onChange fires correctly
          const setter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value'
          )?.set;
          setter?.call(input, email);
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex max-w-md overflow-hidden rounded-full bg-white p-1.5 shadow-[0_8px_32px_-4px_rgb(0_0_0/0.25)]"
    >
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        className="min-w-0 flex-1 rounded-full bg-transparent px-5 py-2 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-mute)] outline-none"
      />
      <button
        type="submit"
        className="flex-shrink-0 rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2"
        style={{
          background: 'linear-gradient(to right, var(--brand-from), var(--brand-to))',
        }}
      >
        {cta}
      </button>
    </form>
  );
}
