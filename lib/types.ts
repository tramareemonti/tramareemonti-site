export type Category =
  | 'ristoranti'
  | 'produttori'
  | 'borghi-luoghi'
  | 'attivita-outdoor'
  | 'itinerari'
  | 'mare';

export type RouteType = 'trekking' | 'bici';

/**
 * Optional per-entry English translations.
 * Only the fields that are actually meant to be localised appear here.
 * Anything missing falls back to the Italian original.
 */
export interface PlaceI18n {
  title?: string;
  sublabel?: string;
  summary?: string;
  whyGo?: string;
  tags?: string[];
  town?: string;
}

export interface RouteI18n {
  title?: string;
  summary?: string;
  highlights?: string[];
  tags?: string[];
  startTown?: string;
  duration?: string;
}

export interface Place {
  id: string;
  title: string;
  category: Exclude<Category, 'itinerari'>;
  tags: string[];
  town: string;
  lat: number;
  lng: number;
  summary: string;
  whyGo: string;
  /** Link condiviso da Google Maps (scheda luogo); se presente usato per «Apri in Google Maps». */
  googleMapsUrl?: string;
  website?: string;
  driveMinutes: number;
  featured?: boolean;
  sublabel?: string;
  /** Optional English translation block. Missing fields fall back to Italian. */
  i18n?: { en?: PlaceI18n };
}

export interface RouteItem {
  id: string;
  title: string;
  category: 'itinerari';
  routeType: RouteType;
  tags: string[];
  startTown: string;
  lat: number;
  lng: number;
  distanceKm: number;
  elevationM: number;
  difficulty: 'facile' | 'media' | 'impegnativa';
  duration: string;
  summary: string;
  highlights: string[];
  driveMinutes: number;
  polyline: [number, number][];
  gpxFile?: string;
  mapyUrl?: string;
  googleMapsUrl?: string;
  featured?: boolean;
  /** Optional English translation block. Missing fields fall back to Italian. */
  i18n?: { en?: RouteI18n };
}

export type ExplorerItem = Place | RouteItem;
