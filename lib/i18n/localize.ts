import type { ExplorerItem, Place, RouteItem } from '@/lib/types';
import { isRoute } from '@/lib/data';
import type { Locale } from './config';
import { defaultLocale } from './config';
import { t, type UIKey } from './ui';

/**
 * Returns a place with Italian fields replaced by English when available.
 * Falls back to Italian for any field that has no translation yet.
 */
export function localizePlace(place: Place, locale: Locale): Place {
  if (locale === defaultLocale) return place;
  const tr = place.i18n?.en;
  if (!tr) return place;
  return {
    ...place,
    title: tr.title ?? place.title,
    sublabel: tr.sublabel ?? place.sublabel,
    summary: tr.summary ?? place.summary,
    whyGo: tr.whyGo ?? place.whyGo,
    tags: tr.tags ?? place.tags,
    town: tr.town ?? place.town,
  };
}

/**
 * Returns a route with Italian fields replaced by English when available.
 * Falls back to Italian for any field that has no translation yet.
 */
export function localizeRoute(route: RouteItem, locale: Locale): RouteItem {
  if (locale === defaultLocale) return route;
  const tr = route.i18n?.en;
  if (!tr) return route;
  return {
    ...route,
    title: tr.title ?? route.title,
    summary: tr.summary ?? route.summary,
    highlights: tr.highlights ?? route.highlights,
    tags: tr.tags ?? route.tags,
    startTown: tr.startTown ?? route.startTown,
    duration: tr.duration ?? route.duration,
  };
}

export function localizeItem<T extends ExplorerItem>(item: T, locale: Locale): T {
  if (isRoute(item)) {
    return localizeRoute(item, locale) as T;
  }
  return localizePlace(item as Place, locale) as T;
}

/**
 * Best-effort translation for season tags that come from the data files.
 * Unknown tags are returned as-is so new tags don't disappear from the UI.
 */
export function localizeTag(tag: string, locale: Locale): string {
  const seasonKey: Record<string, UIKey> = {
    estate: 'seasonEstate',
    inverno: 'seasonInverno',
    primavera: 'seasonPrimavera',
    autunno: 'seasonAutunno',
  };
  const key = seasonKey[tag];
  return key ? t(key, locale) : tag;
}
