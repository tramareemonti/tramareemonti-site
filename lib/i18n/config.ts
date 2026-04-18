/**
 * Centralised i18n configuration.
 *
 * The site is statically exported (see next.config.ts), so we route locales via URL prefix:
 * Italian stays at "/" and English lives under "/en". Everything locale-related should
 * derive from the URL — no cookies, no localStorage, no flash.
 */

export const locales = ['it', 'en'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'it';

export const localeLabels: Record<Locale, { short: string; long: string }> = {
  it: { short: 'IT', long: 'Italiano' },
  en: { short: 'EN', long: 'English' },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
