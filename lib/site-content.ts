import type { Locale } from '@/lib/i18n/config';

/**
 * Localisable helpers for home-page content.
 *
 * Design note: each exported value is a function `getXxx(locale)`. This keeps call-sites
 * ergonomic (`getHomeHero(locale)`) and makes adding a third locale a trivial change.
 *
 * Italian proper names (Il Casolare tra Mare e Monti, Abbadia di Fiastra, Sibillini, signora Maria,
 * Bar Seri, crostate, focacce, gnocchi, ...) are kept in both locales.
 */

type L<T> = Record<Locale, T>;

const homeHero: L<{ title: string; support: string; distancesLine: string }> = {
  it: {
    title:
      'Un casolare in campagna a Urbisaglia, nel cuore delle colline marchigiane.',
    support:
      'Ideale per chi cerca natura, tranquillità e una base comoda tra borghi, mare e Sibillini.',
    distancesLine:
      '8 min da Abbadia di Fiastra · 20 min da Macerata · 30 min dal mare · 45 min dai Sibillini',
  },
  en: {
    title:
      'A country casolare in Urbisaglia, in the heart of the Marche hills.',
    support:
      'Ideal for those looking for nature, quiet and a comfortable base between medieval villages, the Adriatic coast and the Sibillini mountains.',
    distancesLine:
      '8 min from Abbadia di Fiastra · 20 min from Macerata · 30 min from the sea · 45 min from the Sibillini',
  },
};

export const getHomeHero = (locale: Locale) => homeHero[locale];

const homeHeroImageCaption: L<string> = {
  it: 'Dai balconi: colline tra mare e monti.',
  en: 'From the balconies: hills between sea and mountains.',
};

export const getHomeHeroImageCaption = (locale: Locale) => homeHeroImageCaption[locale];

/**
 * Photos are the same assets for both locales; only the alt text changes.
 * Keep the `as const` shape so `readonly` semantics stay intact at call sites.
 */
const homeGalleryImages: L<readonly { src: string; alt: string }[]> = {
  it: [
    { src: '/images/photos/monti.jpeg', alt: 'Monti e paesaggio marchigiano' },
    { src: '/images/photos/mare.jpeg', alt: 'Mare e costa nelle vicinanze' },
    { src: '/images/photos/monti.jpeg', alt: 'Monti e paesaggio marchigiano' },
    { src: '/images/photos/mare.jpeg', alt: 'Mare e costa nelle vicinanze' },
    { src: '/images/photos/monti.jpeg', alt: 'Monti e paesaggio marchigiano' },
    { src: '/images/photos/mare.jpeg', alt: 'Mare e costa nelle vicinanze' },
  ],
  en: [
    { src: '/images/photos/monti.jpeg', alt: 'Mountains and Marche landscape' },
    { src: '/images/photos/mare.jpeg', alt: 'Adriatic sea and nearby coast' },
    { src: '/images/photos/monti.jpeg', alt: 'Mountains and Marche landscape' },
    { src: '/images/photos/mare.jpeg', alt: 'Adriatic sea and nearby coast' },
    { src: '/images/photos/monti.jpeg', alt: 'Mountains and Marche landscape' },
    { src: '/images/photos/mare.jpeg', alt: 'Adriatic sea and nearby coast' },
  ],
};

export const getHomeGalleryImages = (locale: Locale) => homeGalleryImages[locale];

const homeGalleryPlaceholderNote: L<string> = {
  it: 'Foto della casa in arrivo: qui per ora immagini del territorio intorno al casolare.',
  en: "Photos of the house are coming soon — for now, a few shots of the area around the casolare.",
};

export const getHomeGalleryPlaceholderNote = (locale: Locale) => homeGalleryPlaceholderNote[locale];

// ─── "Perché scegliere il casolare" ──────────────────────────────────
const homePerche: L<{
  eyebrow: string;
  title: string;
  points: { emoji: string; title: string; body: string }[];
}> = {
  it: {
    eyebrow: 'Perché scegliere il casolare',
    title: 'Una base semplice per vivere le Marche con calma',
    points: [
      {
        emoji: '🌾',
        title: 'Silenzio vero',
        body:
          'In aperta campagna, lontano dai rumori della città: si sentono il vento, i grilli e le campane dei borghi vicini.',
      },
      {
        emoji: '🏖️',
        title: 'Mare in mezz’ora',
        body:
          'La costa adriatica (Civitanova, Porto Recanati, Porto Sant’Elpidio) è a 30 minuti: perfetto anche per una mezza giornata.',
      },
      {
        emoji: '⛰️',
        title: 'Porta dei Sibillini',
        body:
          'In 45 minuti sei ai Piani di Castelluccio, alle Lame Rosse, al Monte Vettore: il casolare è un ottimo campo base per escursioni.',
      },
      {
        emoji: '☕',
        title: 'Colazione al Bar Seri',
        body:
          'Il nostro bar-pasticceria di famiglia è a 5 minuti: crostate, focacce e i dolci della signora Maria. Gli ospiti hanno un trattamento speciale.',
      },
    ],
  },
  en: {
    eyebrow: 'Why choose the casolare',
    title: 'A simple base to experience Le Marche at a slow pace',
    points: [
      {
        emoji: '🌾',
        title: 'Real silence',
        body:
          "Out in open countryside, far from city noise: you hear the wind, the crickets and the church bells of the nearby hilltop villages.",
      },
      {
        emoji: '🏖️',
        title: 'Sea in half an hour',
        body:
          "The Adriatic coast (Civitanova, Porto Recanati, Porto Sant'Elpidio) is 30 minutes away — even a half-day trip works.",
      },
      {
        emoji: '⛰️',
        title: 'Gateway to the Sibillini',
        body:
          "In 45 minutes you're at the Piani di Castelluccio, Lame Rosse or Monte Vettore: the casolare is a great base camp for day hikes.",
      },
      {
        emoji: '☕',
        title: 'Breakfast at Bar Seri',
        body:
          "Our family bar-pasticceria is 5 minutes away: crostate (Italian jam tarts), focacce and signora Maria's homemade cakes. Guests get special treatment.",
      },
    ],
  },
};

export const getHomePerche = (locale: Locale) => homePerche[locale];

// ─── "La casa" ──────────────────────────────────────────────────────
const homeLaCasa: L<{ title: string; body: string; note?: string }> = {
  it: {
    title: 'Una casa semplice ma curata',
    body:
      'Vista sulle colline, terrazza e giardino, interni essenziali ma curati. Uno spazio accogliente dove prendersi tempo, con calma.',
    note: 'Camere prenotabili singolarmente.',
  },
  en: {
    title: 'A simple but well-kept house',
    body:
      'Views over the hills, terrace and garden, interiors that are pared-back but well looked-after. A welcoming space where you can take your time, calmly.',
    note: 'Rooms can also be booked individually.',
  },
};

export const getHomeLaCasa = (locale: Locale) => homeLaCasa[locale];

const homeDintorniIntro: L<string> = {
  it:
    'Una buona base per esplorare un territorio meno conosciuto di altri, con tanto da offrire: borghi, natura, mare e montagne, mete gastronomiche.',
  en:
    'A good base to explore a region that is less known than others but has a lot to offer: medieval villages, nature, sea and mountains, food destinations.',
};

export const getHomeDintorniIntro = (locale: Locale) => homeDintorniIntro[locale];

// ─── "Come arrivare" ────────────────────────────────────────────────
const homeComeArrivare: L<{
  eyebrow: string;
  title: string;
  intro: string;
  cards: { emoji: string; title: string; body: string }[];
}> = {
  it: {
    eyebrow: 'Come arrivare',
    title: 'In campagna, meglio con mezzo proprio 🚗🚐🚲',
    intro:
      'Il casolare è in aperta campagna: per arrivare e per spostamenti quotidiani l’auto è di solito la scelta più comoda.',
    cards: [
      {
        emoji: '🚗',
        title: 'In auto',
        body:
          'È il modo più pratico. Dalla strada si raggiunge la casa senza impegno. Ampio parcheggio disponibile sotto casa.',
      },
      {
        emoji: '✈️',
        title: 'In aereo',
        body:
          'L’aeroporto più comodo è Ancona Falconara (AOI). In auto, il casolare è a circa 1 ora di distanza. Se arrivate in aereo, consigliamo quindi di noleggiare un’auto.',
      },
      {
        emoji: '🚆',
        title: 'In treno',
        body:
          'Ancona e Civitanova Marche sono le stazioni più comode: molti collegamenti, anche in alta velocità. Macerata e Urbisaglia-Sforzacosta sono più vicine al casolare ma meno servite. Da qualsiasi stazione serve comunque proseguire in auto fino alla casa.',
      },
    ],
  },
  en: {
    eyebrow: 'Getting here',
    title: 'In the countryside, your own wheels help 🚗🚐🚲',
    intro:
      'The casolare sits in open countryside: for arriving and for day-to-day trips, a car is usually the most comfortable option.',
    cards: [
      {
        emoji: '🚗',
        title: 'By car',
        body:
          "Easiest option by far. The house is reached directly from the road with no fuss. Plenty of parking right below the house.",
      },
      {
        emoji: '✈️',
        title: 'By plane',
        body:
          'The most convenient airport is Ancona Falconara (AOI). By car, the casolare is about one hour away. If you fly in, we recommend renting a car.',
      },
      {
        emoji: '🚆',
        title: 'By train',
        body:
          'Ancona and Civitanova Marche are the most convenient stations, with good connections including high-speed trains. Macerata and Urbisaglia-Sforzacosta are closer to the casolare but less served. From any station you will still need to continue by car to reach the house.',
      },
    ],
  },
};

export const getHomeComeArrivare = (locale: Locale) => homeComeArrivare[locale];

// ─── Stats & features ───────────────────────────────────────────────
const homeStats: L<{ label: string; value: string }[]> = {
  it: [
    { label: 'Posti letto', value: '6' },
    { label: 'Camere', value: '3' },
  ],
  en: [
    { label: 'Sleeps', value: '6' },
    { label: 'Bedrooms', value: '3' },
  ],
};

export const getHomeStats = (locale: Locale) => homeStats[locale];

const homeFeatures: L<{ label: string; value: string }[]> = {
  it: [
    { label: 'Fuori', value: 'Terrazza, giardino, parcheggio comodo.' },
    { label: 'Soggiorno', value: 'Ampio tavolo e divano, vista sulle colline.' },
    {
      label: 'Cucina',
      value:
        'Attrezzata per pranzare e cenare in casa (induzione, forno, microonde, lavastoviglie, macchina caffè con cialde disponibili).',
    },
    { label: 'Notte', value: 'Camere tranquille: sonni lontani dai rumori delle città.' },
    { label: 'Servizi', value: 'Wifi, lavatrice, asciugamani e lenzuola.' },
    { label: 'Per chi', value: 'Famiglie, coppie, piccoli gruppi di amici.' },
  ],
  en: [
    { label: 'Outside', value: 'Terrace, garden, easy parking.' },
    { label: 'Living room', value: 'Large table and sofa, view over the hills.' },
    {
      label: 'Kitchen',
      value:
        'Equipped for cooking lunch and dinner at home (induction hob, oven, microwave, dishwasher, pod coffee machine with capsules provided).',
    },
    { label: 'Bedrooms', value: 'Quiet rooms: sleep far from city noise.' },
    { label: 'Services', value: 'Wi-Fi, washing machine, towels and linens included.' },
    { label: 'Good for', value: 'Families, couples, small groups of friends.' },
  ],
};

export const getHomeFeatures = (locale: Locale) => homeFeatures[locale];

// ─── Featured "posti del cuore" cards on the home page ──────────────
/**
 * `href` is a canonical (locale-less) path; pages prefix it with the active locale.
 */
export type FeaturedNearby = {
  title: string;
  description: string;
  href: string;
  isFamilyBar?: boolean;
};

const featuredNearby: L<FeaturedNearby[]> = {
  it: [
    {
      title: 'Bar Seri',
      description:
        'Il nostro bar-pasticceria e tavola calda di famiglia a 5 minuti dal casolare: crostate, dolci, focacce e pizze della signora Maria, piatti freddi e insalatone.',
      href: '/dintorni?cat=ristoranti',
      isFamilyBar: true,
    },
    {
      title: 'Luoghi',
      description: 'Borghi, panorami, abbazie.',
      href: '/dintorni?cat=borghi-luoghi',
    },
    {
      title: 'Outdoor',
      description: 'Sentieri, colline, mare e monti in giornata.',
      href: '/dintorni?cat=itinerari',
    },
  ],
  en: [
    {
      title: 'Bar Seri',
      description:
        "Our family bar-pasticceria and lunch spot, 5 minutes from the casolare: crostate (Italian jam tarts), cakes, focacce and pizze by signora Maria, plus cold plates and generous salads.",
      href: '/dintorni?cat=ristoranti',
      isFamilyBar: true,
    },
    {
      title: 'Places',
      description: 'Hilltop villages, viewpoints, medieval abbeys.',
      href: '/dintorni?cat=borghi-luoghi',
    },
    {
      title: 'Outdoor',
      description: 'Trails, hills, sea and mountains — all within a day.',
      href: '/dintorni?cat=itinerari',
    },
  ],
};

export const getFeaturedNearby = (locale: Locale) => featuredNearby[locale];
