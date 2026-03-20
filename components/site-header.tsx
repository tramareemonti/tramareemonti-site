'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/lib/site-config';

const navItems = [
  { href: '/', label: 'Casolare' },
  { href: '/dintorni', label: 'Dintorni' },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-canvas/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 md:px-10">
        <Link href="/" className="min-w-0">
          <div className="text-[11px] uppercase tracking-[0.22em] text-clay md:text-xs">tramareemonti.it</div>
          <div className="truncate font-serif text-xl text-ink md:text-2xl">{siteConfig.name}</div>
        </Link>
        <nav className="flex items-center gap-1 rounded-full border border-line/70 bg-card px-1.5 py-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-olive text-white'
                    : 'text-muted hover:bg-canvas hover:text-ink'
                }`}
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
