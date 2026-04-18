'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { localeLabels, locales, type Locale } from '@/lib/i18n/config';
import { getLocaleFromPathname, swapLocaleInPath } from '@/lib/i18n/paths';
import { t } from '@/lib/i18n/ui';

type Props = {
  /**
   * Visual style.
   * - `pill`: desktop-style inline pill (used inside the nav pill).
   * - `block`: full-width row (used in the mobile menu).
   */
  variant?: 'pill' | 'block';
  onNavigate?: () => void;
};

/**
 * Public wrapper: isolates `useSearchParams` inside a Suspense boundary so
 * this component can live inside the global `SiteHeader` without tripping
 * Next.js' "useSearchParams needs suspense" prerender check on static export.
 */
export function LocaleSwitcher(props: Props) {
  return (
    <Suspense fallback={<LocaleSwitcherSkeleton variant={props.variant ?? 'pill'} />}>
      <LocaleSwitcherInner {...props} />
    </Suspense>
  );
}

function LocaleSwitcherSkeleton({ variant }: { variant: 'pill' | 'block' }) {
  if (variant === 'block') {
    return <div className="h-11 rounded-xl border border-line bg-card" aria-hidden="true" />;
  }
  return (
    <div
      className="h-7 w-[4.5rem] rounded-full border border-line/70 bg-canvas"
      aria-hidden="true"
    />
  );
}

function LocaleSwitcherInner({ variant = 'pill', onNavigate }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current: Locale = getLocaleFromPathname(pathname ?? '/');
  const query = searchParams?.toString();

  const hrefFor = (target: Locale) => {
    const base = swapLocaleInPath(pathname ?? '/', target);
    return query ? `${base}?${query}` : base;
  };

  if (variant === 'block') {
    return (
      <div
        className="flex items-center gap-1 rounded-xl border border-line bg-card p-1 text-sm"
        role="group"
        aria-label={t('switchLanguage', current)}
      >
        {locales.map((loc) => {
          const active = loc === current;
          return (
            <Link
              key={loc}
              href={hrefFor(loc)}
              onClick={onNavigate}
              aria-current={active ? 'page' : undefined}
              lang={loc}
              className={`flex-1 rounded-lg px-3 py-2 text-center text-sm font-semibold tracking-wide transition ${
                active ? 'bg-olive text-white' : 'text-muted hover:bg-canvas hover:text-ink'
              }`}
            >
              {localeLabels[loc].short}
            </Link>
          );
        })}
      </div>
    );
  }

  return (
    <div
      className="flex items-center gap-0.5 rounded-full border border-line/70 bg-canvas px-1 py-0.5 text-xs font-semibold"
      role="group"
      aria-label={t('switchLanguage', current)}
    >
      {locales.map((loc) => {
        const active = loc === current;
        return (
          <Link
            key={loc}
            href={hrefFor(loc)}
            onClick={onNavigate}
            aria-current={active ? 'page' : undefined}
            lang={loc}
            className={`rounded-full px-2.5 py-1 tracking-wide transition ${
              active ? 'bg-olive text-white' : 'text-muted hover:text-ink'
            }`}
          >
            {localeLabels[loc].short}
          </Link>
        );
      })}
    </div>
  );
}
