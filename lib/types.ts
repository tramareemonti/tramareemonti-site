export type Category =
  | 'ristoranti'
  | 'produttori'
  | 'borghi-luoghi'
  | 'attivita-outdoor'
  | 'itinerari'
  | 'mare';

export type RouteType = 'trekking' | 'bici';

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
}

export type ExplorerItem = Place | RouteItem;
