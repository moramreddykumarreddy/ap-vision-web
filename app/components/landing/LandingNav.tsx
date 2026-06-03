'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/app/lib/cn';
import { scrollToSection } from '@/app/lib/scroll';

const NAV_LINKS = [
  { label: 'Challenge', href: '#challenge' },
  { label: 'Program', href: '#program' },
  { label: 'Screening', href: '#screening' },
];

function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string, onDone?: () => void) {
  e.preventDefault();
  scrollToSection(href);
  onDone?.();
}

export default function LandingNav({ variant = 'light' }: { variant?: 'light' | 'transparent' }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b backdrop-blur-md',
        variant === 'light'
          ? 'border-grey-200/80 bg-nav-bg/95'
          : 'border-white/10 bg-nav-bg/90',
      )}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-6 px-6 lg:px-10">
        <a href="/" className="flex shrink-0 items-center gap-3">
          <img
            src="/apvision.png"
            alt="Andhra Pradesh Vision Outreach Program"
            className="size-11 rounded-full bg-white object-contain p-0.5 shadow-sm ring-1 ring-grey-200"
          />
          <div className="leading-tight">
            <div className="font-serif text-[15px] font-semibold tracking-tight text-outreach-ink">
              Andhra Pradesh Vision
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-outreach-slate">
              Outreach Program
            </div>
          </div>
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[15px] font-medium text-outreach-slate transition-colors hover:text-outreach-teal"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => router.push('/login')}
          className="hidden shrink-0 rounded-full bg-outreach-teal px-7 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-outreach-teal-dark md:inline-flex"
        >
          Login
        </button>

        <button
          type="button"
          className="ml-auto text-2xl text-outreach-ink md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div className="border-t border-grey-200 bg-nav-bg px-6 pb-5 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, () => setOpen(false))}
              className="block border-b border-grey-100 py-3 text-sm font-medium text-outreach-slate"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="mt-3 w-full rounded-full bg-outreach-teal py-3 text-sm font-semibold text-white"
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
}
