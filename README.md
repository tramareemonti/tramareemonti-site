# tramareemonti.it — base progetto v1

Prima implementazione del sito **Il Casolare tra Mare e Monti**.

## Cosa contiene

- pagina **Il Casolare**
- pagina **I Dintorni**
- mappa interattiva con categorie, ricerca e pannello dettaglio
- dataset locale in JSON per punti e itinerari
- struttura minimale, pronta da iterare in Cursor

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- Leaflet / React Leaflet

## Avvio locale

```bash
npm install
npm run dev
```

Poi apri `http://localhost:3000`.

## Struttura principale

- `app/page.tsx` → homepage Il Casolare
- `app/i-dintorni/page.tsx` → pagina guida con mappa
- `components/dintorni-explorer.tsx` → filtri, lista, dettaglio
- `components/territory-map.tsx` → mappa Leaflet
- `data/places.json` → punti mappa
- `data/routes.json` → itinerari
- `lib/types.ts` → tipi TypeScript

## Cose da personalizzare subito

1. sostituire l'immagine hero in `public/hero-casolare.svg`
2. aggiornare testi della home
3. riempire i campi reali di posti letto / camere / bagni
4. sostituire `info@tramareemonti.it`
5. popolare `places.json` e `routes.json` con dati veri
6. rivedere palette e tipografia se vuoi un carattere più distintivo

## Prossimi step consigliati

1. mettere contenuti reali del casolare
2. aggiungere 15–25 punti veri nella mappa
3. migliorare il pannello dettaglio con foto, orari o note
4. aggiungere file GPX agli itinerari
5. preparare la versione inglese in una seconda fase

## Nota

I link esterni nei dati mock usano `example.com` come segnaposto.
