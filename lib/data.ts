import places from '@/data/places.json';
import routes from '@/data/routes.json';
import type { Category, Place, RouteItem } from '@/lib/types';

export const allPlaces = places as Place[];
export const allRoutes = routes as RouteItem[];

export const categories: { key: Category | 'all'; label: string }[] = [
  { key: 'all', label: 'Preferiti' },
  { key: 'ristoranti', label: 'Mangiare' },
  { key: 'produttori', label: 'Produttori' },
  { key: 'borghi-luoghi', label: 'Luoghi' },
  { key: 'attivita-outdoor', label: 'Attività' },
  { key: 'itinerari', label: 'Trekking' },
  { key: 'mare', label: 'Mare' },
];

export const categoryLabels: Record<Category, string> = {
  ristoranti: 'Mangiare',
  produttori: 'Produttori',
  'borghi-luoghi': 'Luoghi',
  'attivita-outdoor': 'Attività',
  itinerari: 'Trekking',
  mare: 'Mare',
};

export function isRoute(item: Place | RouteItem): item is RouteItem {
  return item.category === 'itinerari';
}
