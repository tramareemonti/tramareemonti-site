'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { siteConfig } from '@/lib/site-config';
import { getLocaleFromPathname, localePath, stripLocale } from '@/lib/i18n/paths';
import { makeT } from '@/lib/i18n/ui';
import { LocaleSwitcher } from '@/components/locale-switcher';

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
  const pathname = usePathname() ?? '/';
  const locale = getLocaleFromPathname(pathname);
  const tr = makeT(locale);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const navItems = useMemo(
    () => [
      { canonical: '/', href: localePath(locale, '/'), label: tr('navCasolare') },
      { canonical: '/dintorni', href: localePath(locale, '/dintorni'), label: tr('navDintorni') },
    ],
    [locale, tr],
  );

  const currentCanonical = stripLocale(pathname) || '/';

  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-canvas/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 md:px-10 md:py-4">
        <Link
          href={localePath(locale, '/')}
          className="min-w-0 flex flex-1 items-center gap-3 pr-2"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/images/logo_no_background.png"
            alt={`${siteConfig.name} logo`}
            width={44}
            height={44}
            className="h-10 w-10 shrink-0 object-contain sm:h-11 sm:w-11"
            priority
          />
          <div className="min-w-0">
            <div className="text-[11px] uppercase tracking-[0.22em] text-clay sm:text-xs">
              tramareemonti.it
            </div>
            <div className="line-clamp-2 font-serif text-[1.05rem] leading-snug text-ink sm:text-xl md:line-clamp-none md:text-2xl">
              {siteConfig.name}
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <nav
            className="flex shrink-0 items-center gap-1 rounded-full border border-line/70 bg-card px-1.5 py-1"
            aria-label={tr('navAriaPrimary')}
          >
            {navItems.map((item) => {
              const active = currentCanonical === item.canonical;
              return (
                <Link
                  key={item.canonical}
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
          <LocaleSwitcher variant="pill" />
        </div>

        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line/70 bg-card text-ink transition hover:border-clay hover:text-clay md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? tr('menuClose') : tr('menuOpen')}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`border-t border-line/70 bg-canvas md:hidden ${menuOpen ? 'block' : 'hidden'}`}
      >
        <nav
          className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6"
          aria-label={tr('navAriaPrimary')}
        >
          {navItems.map((item) => {
            const active = currentCanonical === item.canonical;
            return (
              <Link
                key={item.canonical}
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
          <div className="mt-2 px-1">
            <LocaleSwitcher variant="block" onNavigate={() => setMenuOpen(false)} />
          </div>
        </nav>
      </div>
    </header>
  );
}
