export const homeHero = {
  title:
    'Un casolare in campagna a Urbisaglia, nel cuore delle colline marchigiane.',
  support:
    'Ideale per chi cerca natura, tranquillità e una base comoda tra borghi, mare e Sibillini.',
  distancesLine:
    '8 min da Abbadia di Fiastra · 20 min da Macerata · 30 min dal mare · 45 min dai Sibillini',
};

export const homeHeroImageCaption =
  'Dai balconi: colline tra mare e monti.';

export const homeLaCasa = {
  title: 'Una casa semplice ma curata',
  body:
    'Vista sulle colline, terrazza e giardino, interni essenziali ma curati. Uno spazio accogliente dove prendersi tempo, con calma.',
  note: 'Camere prenotabili singolarmente.',
};

export const homeDintorniIntro =
  'Una buona base per esplorare un territorio meno conosciuto di altri, con tanto da offrire: borghi, natura, mare e montagne, mete gastronomiche.';

export const homeComeArrivare = {
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
} as const;

export const homeStats = [
  { label: 'Posti letto', value: '6' },
  { label: 'Camere', value: '3' },
];

export const homeFeatures = [
  {
    label: 'Fuori',
    value: 'Terrazza, giardino, parcheggio comodo.',
  },
  {
    label: 'Soggiorno',
    value: 'Ampio tavolo e divano, vista sulle colline.',
  },
  {
    label: 'Cucina',
    value: 'Attrezzata per pranzare e cenare in casa (induzione, forno, microonde, lavastoviglie, macchina caffè con cialde disponibili).',
  },
  {
    label: 'Notte',
    value: 'Camere tranquille: sonni lontani dai rumori delle città.',
  },
  {
    label: 'Servizi',
    value:
      'Wifi, lavatrice, asciugamani e lenzuola.',
  },
  {
    label: 'Per chi',
    value: 'Famiglie, coppie, piccoli gruppi di amici.',
  },
];

export const featuredNearby = [
  {
    title: 'Bar Seri',
    description:
      'Il nostro bar-pasticceria e tavola calda di famiglia a 5 minuti dal casolare: crostate, dolci, focacce e pizze della signora Maria, piatti freddi e insalatone.',
    href: '/dintorni?cat=ristoranti',
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
];
