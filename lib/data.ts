import places from '@/data/places.json';
import routes from '@/data/routes.json';
import type { Category, Place, RouteItem } from '@/lib/types';
import type { Locale } from '@/lib/i18n/config';
import { t } from '@/lib/i18n/ui';

export const allPlaces = places as Place[];
export const allRoutes = routes as RouteItem[];

type CategoryKey = Category | 'all';

/** Ordered list of categories shown in the Dintorni filters. */
export const categoryOrder: CategoryKey[] = [
  'all',
  'ristoranti',
  'produttori',
  'borghi-luoghi',
  'attivita-outdoor',
  'itinerari',
  'mare',
];

/** UI dictionary key that labels each category. Order follows categoryOrder. */
const categoryUIKey = {
  all: 'catAll',
  ristoranti: 'catRistoranti',
  produttori: 'catProduttori',
  'borghi-luoghi': 'catBorghi',
  'attivita-outdoor': 'catAttivita',
  itinerari: 'catItinerari',
  mare: 'catMare',
} as const;

/** Locale-aware list for rendering the category filter pills. */
export function getCategories(locale: Locale): { key: CategoryKey; label: string }[] {
  return categoryOrder.map((key) => ({ key, label: t(categoryUIKey[key], locale) }));
}

/** Locale-aware lookup for the label of a single (non-`all`) category. */
export function getCategoryLabel(category: Category, locale: Locale): string {
  return t(categoryUIKey[category], locale);
}

export function isRoute(item: Place | RouteItem): item is RouteItem {
  return item.category === 'itinerari';
}
