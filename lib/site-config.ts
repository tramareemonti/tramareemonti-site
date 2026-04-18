import type { Locale } from '@/lib/i18n/config';
import { defaultLocale } from '@/lib/i18n/config';
import { t } from '@/lib/i18n/ui';

export const siteConfig = {
  name: 'Il Casolare tra Mare e Monti',
  domain: 'tramareemonti.it',
  url: 'https://tramareemonti.it',
  email: 'info@tramareemonti.it',
  /**
   * WhatsApp business del casolare.
   * Il numero non è mostrato in UI: gli utenti vedono solo il bottone/link WhatsApp.
   * `number` è in formato internazionale senza "+" (come richiesto da wa.me).
   * `tel` è il formato E.164, usato solo nel JSON-LD (non visibile).
   */
  whatsapp: {
    number: '33649958039',
    tel: '+33649958039',
  },
  /**
   * Per-locale site description (used in metadata, SEO, default subjects, ...).
   * Intentionally keeps Italian proper names in both locales.
   */
  description: {
    it: 'Casolare in campagna nelle Marche, a Urbisaglia: una base tranquilla tra Abbadia di Fiastra, il mare e i Monti Sibillini.',
    en: 'A country casolare in Le Marche at Urbisaglia: a quiet base between Abbadia di Fiastra, the Adriatic coast and the Monti Sibillini.',
  } satisfies Record<Locale, string>,
  /** Short per-locale page-title tail appended to the brand name. */
  titleTail: {
    it: 'casa in campagna nelle Marche',
    en: 'country house in Le Marche',
  } satisfies Record<Locale, string>,
  /** Indirizzo pubblico volutamente approssimativo (privacy). */
  address: {
    it: 'Campagna marchigiana, Urbisaglia (MC)',
    en: 'Marche countryside, Urbisaglia (MC)',
  } satisfies Record<Locale, string>,
  /**
   * Punto sulla mappa Dintorni: coordinate leggermente spostate rispetto all'ingresso
   * reale, senza link Google Maps al casolare.
   *
   * Note: the label is deliberately always "Il casolare" — an Italian proper name.
   */
  casolareMap: {
    lat: 43.192374,
    lng: 13.366559,
    label: 'Il casolare',
  },
  logo: '/images/logo_no_background.png',
};

/** Returns the localised description string. */
export function getSiteDescription(locale: Locale = defaultLocale): string {
  return siteConfig.description[locale];
}

/** Returns the localised address string. */
export function getSiteAddress(locale: Locale = defaultLocale): string {
  return siteConfig.address[locale];
}

/**
 * Costruisce un link `https://wa.me/...` con messaggio precompilato per la lingua scelta.
 */
export function whatsappHref(
  message?: string,
  locale: Locale = defaultLocale,
): string {
  const text = message ?? t('whatsappDefaultMessage', locale);
  const base = `https://wa.me/${siteConfig.whatsapp.number}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/**
 * Costruisce un link `mailto:` con oggetto coerente col nome del casolare.
 */
export function mailtoHref(subject?: string, locale: Locale = defaultLocale): string {
  const effective = subject ?? t('emailDefaultSubject', locale);
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(effective)}`;
}
