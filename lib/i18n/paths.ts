import { defaultLocale, isLocale, type Locale } from './config';

/**
 * Reads the locale out of a pathname.
 * - `/`          -> 'it'
 * - `/dintorni`  -> 'it'
 * - `/en`        -> 'en'
 * - `/en/...`    -> 'en'
 */
export function getLocaleFromPathname(pathname: string): Locale {
  const first = pathname.split('/').filter(Boolean)[0];
  return first && isLocale(first) ? first : defaultLocale;
}

/**
 * Strips the locale prefix from a pathname, returning a "canonical" path
 * that can be re-prefixed with any locale. Always starts with "/".
 */
export function stripLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    segments.shift();
  }
  return '/' + segments.join('/');
}

/**
 * Builds a path for the given locale. The Italian default has no prefix;
 * every other locale is prefixed with `/<locale>`.
 */
export function localePath(locale: Locale, path: string = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (locale === defaultLocale) {
    return clean === '' ? '/' : clean;
  }
  if (clean === '/') return `/${locale}`;
  return `/${locale}${clean}`;
}

/**
 * Given the current pathname, returns the equivalent URL in the target locale.
 * Preserves everything after the locale prefix.
 */
export function swapLocaleInPath(pathname: string, target: Locale): string {
  const canonical = stripLocale(pathname);
  return localePath(target, canonical);
}
