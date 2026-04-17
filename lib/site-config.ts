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
    defaultMessage:
      'Ciao! Vorrei informazioni sul Casolare tra Mare e Monti.',
  },
  description:
    'Casolare in campagna nelle Marche, a Urbisaglia: una base tranquilla tra Abbadia di Fiastra, il mare e i Monti Sibillini.',
  /** Indirizzo pubblico volutamente approssimativo (privacy). */
  address: 'Campagna marchigiana, Urbisaglia (MC)',
  /**
   * Punto sulla mappa Dintorni: coordinate leggermente spostate rispetto all’ingresso
   * reale, senza link Google Maps al casolare.
   */
  casolareMap: {
    lat: 43.192374,
    lng: 13.366559,
    label: 'Il casolare',
  },
  logo: '/images/logo_no_background.png',
};

/**
 * Costruisce un link `https://wa.me/...` con messaggio precompilato.
 * Passa un `message` per adattarlo al contesto della pagina.
 */
export function whatsappHref(message: string = siteConfig.whatsapp.defaultMessage): string {
  const base = `https://wa.me/${siteConfig.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/**
 * Costruisce un link `mailto:` con oggetto coerente col nome del casolare.
 */
export function mailtoHref(subject: string = `Richiesta informazioni - ${siteConfig.name}`): string {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`;
}
