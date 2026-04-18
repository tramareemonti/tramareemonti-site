import type { Locale } from './config';

/**
 * Static UI strings, keyed by semantic id.
 * Add a new entry here whenever a new hard-coded string appears in a component.
 */
const dict = {
  // ─── Nav / header / footer ──────────────────────────────────────────
  navCasolare: { it: 'Casolare', en: 'The Casolare' },
  navDintorni: { it: 'Dintorni', en: 'Around' },
  navAriaPrimary: { it: 'Principale', en: 'Primary' },
  menuOpen: { it: 'Apri menu', en: 'Open menu' },
  menuClose: { it: 'Chiudi menu', en: 'Close menu' },
  switchLanguage: { it: 'Cambia lingua', en: 'Switch language' },
  switchLanguageTo: { it: 'Passa alla versione inglese', en: 'Switch to the Italian version' },
  footerMapLink: { it: 'Mappa dintorni →', en: 'Area map →' },
  footerCasolareLabel: { it: 'Il Casolare', en: 'The Casolare' },
  footerDintorniLabel: { it: 'I Dintorni', en: 'Around' },

  // ─── Common CTAs ───────────────────────────────────────────────────
  ctaWhatsApp: { it: 'WhatsApp', en: 'WhatsApp' },
  ctaEmail: { it: 'Email', en: 'Email' },
  ctaWriteOnWhatsApp: { it: 'Scrivici su WhatsApp', en: 'Message us on WhatsApp' },
  ctaWriteUs: { it: 'Scrivici', en: 'Get in touch' },
  ctaExplore: { it: 'Esplora →', en: 'Explore →' },
  ctaDiscoverArea: { it: 'Scopri i dintorni →', en: 'Discover the area →' },
  ctaGoToMap: { it: 'Vai alla mappa →', en: 'Open the map →' },
  ctaSeeAreaMap: { it: 'Vedi la mappa dei dintorni →', en: 'See the area map →' },

  // ─── Home: WIP banner ──────────────────────────────────────────────
  wipBadge: { it: 'Work in progress', en: 'Work in progress' },
  wipMessage: {
    it: "Il casolare è in fase di ristrutturazione. Stiamo preparando l'apertura agli ospiti: se vuoi essere tra i primi, scrivici!  :)",
    en: "Il casolare is being renovated. We're preparing to open it to guests — if you'd like to be among the first to know, drop us a line!  :)",
  },
  wipWhatsAppAria: { it: 'Scrivici su WhatsApp', en: 'Message us on WhatsApp' },
  wipWhatsAppMessage: {
    it: 'Ciao! Mi interessa il Casolare tra Mare e Monti: vorrei essere tra i primi a sapere quando apre agli ospiti.',
    en: "Hi! I'm interested in Il Casolare tra Mare e Monti and would love to be among the first to know when it opens to guests.",
  },
  wipMailSubject: {
    it: 'Richiesta apertura ospiti - Il Casolare tra Mare e Monti',
    en: 'Guest opening waitlist - Il Casolare tra Mare e Monti',
  },

  // ─── Home: contact section ─────────────────────────────────────────
  contactEyebrow: { it: 'Contatti', en: 'Contact' },
  contactBody: {
    it: 'Date, disponibilità o domande sulla casa: il modo più rapido è WhatsApp, oppure via email.',
    en: 'Dates, availability or questions about the house: WhatsApp is fastest, or email us.',
  },
  contactAddressNote: {
    it: "· l'indirizzo preciso lo condividiamo in fase di prenotazione.",
    en: "· we'll share the exact address once you book.",
  },

  // ─── Home: hero caption / gallery ──────────────────────────────────
  galleryOpen: { it: 'Apri foto', en: 'Open photo' },
  galleryClose: { it: 'Chiudi', en: 'Close' },
  galleryPrev: { it: 'Foto precedente', en: 'Previous photo' },
  galleryNext: { it: 'Foto successiva', en: 'Next photo' },
  galleryCounterOf: { it: 'di', en: 'of' },
  galleryDialogLabel: { it: 'Foto', en: 'Photo' },

  // ─── Home: "La casa" eyebrow ───────────────────────────────────────
  laCasaEyebrow: { it: 'La casa', en: 'The house' },
  dintorniEyebrow: { it: 'I dintorni', en: 'Around' },
  featuredHeartTitle: { it: 'I nostri posti del cuore', en: 'Our favourite spots' },
  familyBarBadge: { it: 'Il nostro bar di famiglia', en: 'Our family bar' },

  // ─── Home: come arrivare overrides ─────────────────────────────────
  comeArrivareAereoInline: {
    it: "L'aeroporto più comodo è Ancona Falconara (AOI). In auto, il casolare è a circa 1 ora di distanza. Se arrivate in aereo, consigliamo quindi di noleggiare un'auto.",
    en: 'The most convenient airport is Ancona Falconara (AOI). By car, the casolare is about one hour away, so if you fly in we recommend renting a car.',
  },
  comeArrivareTrenoInline: {
    it: 'Ancona e Civitanova Marche sono le stazioni più comode: molti collegamenti, anche in alta velocità. Macerata e Urbisaglia-Sforzacosta sono più vicine al casolare ma meno servite. Da qualsiasi stazione serve comunque proseguire in auto fino alla casa.',
    en: 'Ancona and Civitanova Marche are the most convenient stations, with good connections including high-speed trains. Macerata and Urbisaglia-Sforzacosta are closer to the casolare but less served. From any station you will still need to continue by car to reach the house.',
  },

  // ─── Dintorni: page header ─────────────────────────────────────────
  dintorniTitle: { it: 'I nostri posti del cuore', en: 'Our favourite spots' },
  dintorniEyebrowUp: { it: 'I Dintorni', en: 'Around' },
  dintorniIntro: {
    it: 'Qualche idea per esplorare le Marche.',
    en: 'A few ideas for exploring Le Marche.',
  },

  // ─── Dintorni: quick start cards ───────────────────────────────────
  dintorniQuickStartTitle: { it: 'Per iniziare', en: 'Start here' },
  dintorniQS1Eyebrow: {
    it: 'Mezza giornata nella natura',
    en: 'Half a day in nature',
  },
  dintorniQS1Body: {
    it: "Giro a piedi all'Abbadia di Fiastra",
    en: 'Walk around Abbadia di Fiastra',
  },
  dintorniQS2Eyebrow: {
    it: "Gli impasti della signora Maria",
    en: "Signora Maria's fresh-baked doughs",
  },
  dintorniQS2Body: {
    it: 'Bar Seri a Passo Colmurano',
    en: 'Bar Seri in Passo Colmurano',
  },
  dintorniQS3Eyebrow: {
    it: 'Relax in montagna, con possibili hikes',
    en: 'Mountain downtime, optional hikes',
  },
  dintorniQS3Body: {
    it: 'Lago di Fiastra e Lame Rosse',
    en: 'Lago di Fiastra and Lame Rosse',
  },

  // ─── Dintorni: search / filters ────────────────────────────────────
  dintorniSearchPlaceholder: {
    it: 'Cerca per nome, luogo, tag, stagione...',
    en: 'Search by name, place, tag, season…',
  },
  dintorniSearchPlaceholderShort: {
    it: 'Cerca per nome, luogo, tag...',
    en: 'Search by name, place, tag…',
  },
  dintorniSearchLabel: { it: 'Cerca nella guida', en: 'Search the guide' },
  dintorniFilters: { it: 'Filtri', en: 'Filters' },
  dintorniFiltersClose: { it: 'Chiudi', en: 'Close' },
  dintorniFiltersOpenAria: { it: 'Apri filtri', en: 'Open filters' },
  dintorniFiltersCloseAria: { it: 'Chiudi filtri', en: 'Close filters' },
  dintorniFilterCategory: { it: 'Categoria', en: 'Category' },
  dintorniFilterDifficulty: { it: 'Difficoltà', en: 'Difficulty' },
  dintorniFilterDifficultyShort: { it: 'Difficoltà:', en: 'Difficulty:' },
  dintorniFilterReset: { it: 'Azzera filtri', en: 'Reset filters' },
  dintorniFilterAll: { it: 'Tutte', en: 'All' },

  // ─── Dintorni: results / pill ──────────────────────────────────────
  dintorniResultsSingular: { it: 'risultato', en: 'result' },
  dintorniResultsPlural: { it: 'risultati', en: 'results' },
  dintorniNoResults: { it: 'Nessun risultato.', en: 'No results.' },
  dintorniFavouritesPill: { it: 'Preferiti', en: 'Favourites' },
  dintorniBrowse: { it: 'Sfoglia', en: 'Browse' },
  dintorniBrowseClose: { it: 'Chiudi', en: 'Close' },
  dintorniDriveMinShort: { it: 'a', en: 'about' },
  dintorniMin: { it: 'min', en: 'min' },
  dintorniFromCasolare: { it: 'dal casolare', en: 'from the casolare' },

  // ─── Dintorni: detail card ─────────────────────────────────────────
  detailWhyGo: { it: 'Perché andarci', en: 'Why go' },
  detailMore: { it: 'Leggi tutto →', en: 'Read more →' },
  detailLess: { it: 'Meno dettagli', en: 'Less detail' },
  detailStatDifficulty: { it: 'Difficoltà', en: 'Difficulty' },
  detailStatDistance: { it: 'Distanza', en: 'Distance' },
  detailStatElevation: { it: 'Dislivello', en: 'Elevation gain' },
  detailStatDuration: { it: 'Durata', en: 'Duration' },
  detailOpenGoogleMapsShort: { it: 'Maps →', en: 'Maps →' },
  detailOpenGoogleMaps: { it: 'Google Maps →', en: 'Google Maps →' },
  detailOpenGoogleMapsLong: { it: 'Apri in Google Maps →', en: 'Open in Google Maps →' },
  detailMapyUrl: { it: 'Traccia su Mapy.com →', en: 'Track on Mapy.com →' },
  detailGpx: { it: 'Scarica GPX →', en: 'Download GPX →' },
  detailWebsite: { it: 'Sito / link →', en: 'Website →' },

  // ─── Dintorni: map tooltip / popup ─────────────────────────────────
  mapCasolareNote: {
    it: 'Punto sulla mappa indicativo, non l’ingresso esatto.',
    en: 'Pin is approximate, not the exact entrance.',
  },
  mapLoading: { it: 'Caricamento mappa...', en: 'Loading map…' },

  // ─── Dintorni: itinerari info blocks ───────────────────────────────
  itinerariBeforeTitle: { it: 'Prima di partire', en: 'Before you go' },
  itinerariBeforeBody: {
    it: 'Le tracce dettagliate dei percorsi sono visualizzabili su Mapy.com e scaricabili in formato GPX dalla scheda del percorso. Prima di ogni uscita in montagna, verificate che i sentieri siano aperti: neve, ghiaccio e frane possono rendere impraticabili anche percorsi semplici.',
    en: 'Detailed tracks can be viewed on Mapy.com and downloaded as GPX from each route page. Before any mountain outing, check that the trails are open: snow, ice and landslides can make even simple routes impassable.',
  },
  itinerariSibilliniTitle: {
    it: 'Parco Nazionale dei Monti Sibillini',
    en: 'Monti Sibillini National Park',
  },
  itinerariSibilliniBody: {
    it: 'Per sentieri, chiusure e condizioni nei Sibillini, contattate il Parco.',
    en: 'For trails, closures and conditions in the Sibillini, contact the Park office.',
  },
  itinerariSibilliniAddr: {
    it: 'Piazza del Forno 1, 62039 Visso (MC)',
    en: 'Piazza del Forno 1, 62039 Visso (MC)',
  },
  itinerariSibilliniPhones: {
    it: 'Tel. 0737 961563 · Info 0737 961014',
    en: 'Phone 0737 961563 · Info 0737 961014',
  },

  // ─── Category / difficulty / seasons (labels) ──────────────────────
  catAll: { it: 'Preferiti', en: 'Favourites' },
  catRistoranti: { it: 'Mangiare', en: 'Eat' },
  catProduttori: { it: 'Produttori', en: 'Producers' },
  catBorghi: { it: 'Luoghi', en: 'Places' },
  catAttivita: { it: 'Attività', en: 'Activities' },
  catItinerari: { it: 'Trekking', en: 'Trekking' },
  catMare: { it: 'Mare', en: 'Sea' },
  subBici: { it: 'Bici', en: 'Cycling' },

  difficultyFacile: { it: 'Facile', en: 'Easy' },
  difficultyMedia: { it: 'Media', en: 'Moderate' },
  difficultyImpegnativa: { it: 'Impegnativa', en: 'Hard' },

  seasonEstate: { it: 'estate', en: 'summer' },
  seasonInverno: { it: 'inverno', en: 'winter' },
  seasonPrimavera: { it: 'primavera', en: 'spring' },
  seasonAutunno: { it: 'autunno', en: 'autumn' },

  // ─── Default messages ──────────────────────────────────────────────
  whatsappDefaultMessage: {
    it: 'Ciao! Vorrei informazioni sul Casolare tra Mare e Monti.',
    en: "Hi! I'd like some information about Il Casolare tra Mare e Monti.",
  },
  emailDefaultSubject: {
    it: 'Richiesta informazioni - Il Casolare tra Mare e Monti',
    en: 'Info request - Il Casolare tra Mare e Monti',
  },
} satisfies Record<string, Record<Locale, string>>;

export type UIKey = keyof typeof dict;

/** Look up a static string in the UI dictionary. */
export function t(key: UIKey, locale: Locale): string {
  return dict[key][locale];
}

/** Bind the dictionary to a given locale for terser call-sites. */
export function makeT(locale: Locale) {
  return (key: UIKey) => t(key, locale);
}
