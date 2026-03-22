'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/lib/site-config';

const navItems = [
  { href: '/', label: 'Casolare' },
  { href: '/dintorni', label: 'Dintorni' },
  { href: '/#come-arrivare', label: 'Come arrivare' },
];

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-canvas/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 md:px-10 md:py-4">
        <Link href="/" className="min-w-0 flex-1 pr-2" onClick={() => setMenuOpen(false)}>
          <div className="text-[11px] uppercase tracking-[0.22em] text-clay sm:text-xs">
            tramareemonti.it
          </div>
          <div className="line-clamp-2 font-serif text-[1.05rem] leading-snug text-ink sm:text-xl md:line-clamp-none md:text-2xl">
            {siteConfig.name}
          </div>
        </Link>

        <nav
          className="hidden shrink-0 items-center gap-1 rounded-full border border-line/70 bg-card px-1.5 py-1 md:flex"
          aria-label="Principale"
        >
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  active ? 'bg-olive text-white' : 'text-muted hover:bg-canvas hover:text-ink'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line/70 bg-card text-ink transition hover:border-clay hover:text-clay md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-line/70 bg-canvas md:hidden ${menuOpen ? 'block' : 'hidden'}`}
      >
        <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6" aria-label="Principale">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-xl px-4 py-3 text-base font-medium transition ${
                  active ? 'bg-olive text-white' : 'text-ink hover:bg-canvas'
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
