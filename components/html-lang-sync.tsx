'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { getLocaleFromPathname } from '@/lib/i18n/paths';

/**
 * Keeps `<html lang>` in sync with the URL-derived locale.
 *
 * Because the site is statically exported, the root `<html lang>` attribute
 * is pre-rendered as "it". This effect updates it to "en" after hydration
 * when the visitor is on an `/en/...` page, so screen readers and Google's
 * JS-aware crawler pick up the correct language.
 */
export function HtmlLangSync() {
  const pathname = usePathname() ?? '/';
  const locale = getLocaleFromPathname(pathname);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return null;
}
