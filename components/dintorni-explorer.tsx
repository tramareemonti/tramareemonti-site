'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { allPlaces, allRoutes, categories, categoryLabels, isRoute } from '@/lib/data';
import type { Category, ExplorerItem, RouteItem } from '@/lib/types';
import { siteConfig } from '@/lib/site-config';

const TerritoryMap = dynamic(() => import('@/components/territory-map'), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[420px] items-center justify-center rounded-[1.5rem] border border-line/70 bg-card text-sm text-muted md:min-h-[600px]">
      Caricamento mappa...
    </div>
  ),
});

const distanceRanges = [
  { label: 'Entro 15 min', max: 15 },
  { label: '15–30 min', min: 15, max: 30 },
  { label: '30–60 min', min: 30, max: 60 },
  { label: 'Oltre 60 min', min: 60 },
] as const;

const seasonStyles: Record<string, string> = {
  'estate': 'border-amber-300/60 bg-amber-50 text-amber-700',
  'inverno': 'border-sky-300/60 bg-sky-50 text-sky-700',
  'primavera': 'border-emerald-300/60 bg-emerald-50 text-emerald-700',
  'autunno': 'border-orange-300/60 bg-orange-50 text-orange-700',
  "tutto-l'anno": 'border-stone-300/60 bg-stone-50 text-stone-600',
};

function tagClassName(tag: string) {
  return seasonStyles[tag] ?? 'border-line bg-canvas text-muted';
}

function itemLabel(item: ExplorerItem) {
  if (isRoute(item)) return `${categoryLabels[item.category]} · ${item.routeType}`;
  return item.sublabel ?? categoryLabels[item.category];
}

function mapsUrl(lat: number, lng: number) {
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

export function DintorniExplorer() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('cat') as Category | null;
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>(initialCategory ?? 'all');
  const [activeRange, setActiveRange] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const allItems = useMemo(() => [...allPlaces, ...allRoutes], []);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    let items = allItems.filter((item) => {
      if (activeCategory === 'all') {
        if (!item.featured) return false;
      } else {
        if (item.category !== activeCategory) return false;
      }

      if (!normalizedQuery) return true;

      const baseText = [
        item.title,
        isRoute(item) ? item.startTown : item.town,
        item.summary,
        ...item.tags,
      ]
        .join(' ')
        .toLowerCase();

      return baseText.includes(normalizedQuery);
    });

    if (activeRange !== null) {
      const range = distanceRanges[activeRange];
      items = items.filter((item) => {
        if ('min' in range && item.driveMinutes < range.min) return false;
        if ('max' in range && item.driveMinutes > range.max) return false;
        return true;
      });
    }

    return items.sort((a, b) => a.driveMinutes - b.driveMinutes);
  }, [activeCategory, activeRange, allItems, query]);

  const selectedItem = useMemo(() => {
    if (!selectedId) return filteredItems[0] ?? null;
    return filteredItems.find((item) => item.id === selectedId) ?? filteredItems[0] ?? null;
  }, [filteredItems, selectedId]);

  const handleSelect = (id: string) => setSelectedId(id);

  const resetRange = () => setActiveRange(null);

  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 pt-8 md:px-10 md:pb-20 md:pt-12">
      <div className="mb-8 max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.25em] text-muted">I Dintorni</p>
        <div className="flex items-center gap-4 md:gap-5">
          <Image
            src={siteConfig.logo}
            alt=""
            width={240}
            height={160}
            className="h-auto w-[70px] shrink-0 md:w-[100px]"
          />
          <h1 className="font-serif text-4xl leading-tight md:text-5xl">I nostri posti del cuore</h1>
        </div>
        <p className="leading-8 text-muted md:text-lg">
          Qualche idea per esplorare le Marche, niente foto, niente spoiler.
        </p>
      </div>

      <div className="mb-6 rounded-[1.5rem] border border-line/70 bg-card p-5 shadow-soft">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted">Per iniziare</p>
        <div className="grid gap-3 sm:grid-cols-3">
          <button type="button" onClick={() => { setActiveCategory('all'); setSelectedId(null); setActiveRange(null); setQuery(''); handleSelect('abbadia-giro-corto'); }} className="rounded-[1.25rem] border border-line bg-canvas p-4 text-left transition hover:border-clay">
            <p className="text-xs uppercase tracking-[0.18em] text-clay">Mezza giornata lenta</p>
            <p className="mt-2 text-sm font-medium text-ink">Giro a piedi all&apos;Abbadia di Fiastra</p>
          </button>
          <button type="button" onClick={() => { setActiveCategory('ristoranti'); setSelectedId(null); setActiveRange(null); setQuery(''); handleSelect('bar-seri'); }} className="rounded-[1.25rem] border border-line bg-canvas p-4 text-left transition hover:border-clay">
            <p className="text-xs uppercase tracking-[0.18em] text-clay">Gli impasti della nonna</p>
            <p className="mt-2 text-sm font-medium text-ink">Bar Seri a Passo Colmurano</p>
          </button>
          <button type="button" onClick={() => { setActiveCategory('attivita-outdoor'); setSelectedId(null); setActiveRange(null); setQuery(''); handleSelect('lago-fiastra'); }} className="rounded-[1.25rem] border border-line bg-canvas p-4 text-left transition hover:border-clay">
            <p className="text-xs uppercase tracking-[0.18em] text-clay">Salita e relax</p>
            <p className="mt-2 text-sm font-medium text-ink">Lago di Fiastra e Lame Rosse</p>
          </button>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-4 rounded-[1.5rem] border border-line/70 bg-card p-4 shadow-soft md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = activeCategory === category.key;
            return (
              <button
                key={category.key}
                type="button"
                onClick={() => {
                  setActiveCategory(category.key);
                  setSelectedId(null);
                  setActiveRange(null);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-olive text-white'
                    : 'border border-line bg-canvas text-muted hover:border-clay hover:text-ink'
                }`}
              >
                {category.label}
              </button>
            );
          })}
        </div>
        <label className="block min-w-[220px] flex-1 md:max-w-xs">
          <span className="sr-only">Cerca nella guida</span>
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSelectedId(null);
            }}
            placeholder="Cerca per nome, luogo, tag, stagione..."
            className="w-full rounded-full border border-line bg-canvas px-4 py-3 text-sm outline-none transition placeholder:text-muted focus:border-clay"
          />
        </label>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs text-muted">Distanza:</span>
        {distanceRanges.map((range, i) => (
          <button
            key={range.label}
            type="button"
            onClick={() => setActiveRange(activeRange === i ? null : i)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
              activeRange === i
                ? 'bg-clay text-white'
                : 'border border-line/70 text-muted hover:border-clay hover:text-ink'
            }`}
          >
            {range.label}
          </button>
        ))}
        {activeRange !== null && (
          <button type="button" onClick={resetRange} className="text-xs text-muted transition hover:text-ink">
            &times; Tutti
          </button>
        )}
      </div>

      <div className="mb-6 max-h-[260px] overflow-auto rounded-[1.5rem] border border-line/70 bg-card p-3 shadow-soft md:max-h-[280px]">
        <div className="flex flex-wrap gap-2">
          {filteredItems.map((item) => {
            const selected = selectedItem?.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`rounded-[1.25rem] border px-4 py-3 text-left transition ${
                  selected
                    ? 'border-olive bg-canvas'
                    : 'border-transparent bg-[#f4eadc] hover:border-line hover:bg-canvas'
                }`}
              >
                <p className="text-xs uppercase tracking-[0.22em] text-muted">
                  {itemLabel(item)}
                </p>
                <p className="mt-1 font-medium text-ink">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {isRoute(item) ? item.startTown : item.town} &middot; {item.driveMinutes} min
                </p>
              </button>
            );
          })}
          {filteredItems.length === 0 && (
            <p className="p-4 text-sm text-muted">Nessun risultato.</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.5rem] border border-line/70 bg-card p-3 shadow-soft">
          <TerritoryMap items={filteredItems} selectedId={selectedItem?.id ?? null} onSelect={handleSelect} />
        </div>

        {selectedItem ? (
          <aside className="rounded-[1.5rem] border border-line/70 bg-card p-6 shadow-soft xl:p-8">
            <p className="text-sm uppercase tracking-[0.22em] text-muted">
              {itemLabel(selectedItem)}
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-ink md:text-4xl">{selectedItem.title}</h2>
            <p className="mt-2 text-sm text-muted">
              {isRoute(selectedItem) ? selectedItem.startTown : selectedItem.town} &middot; a{' '}
              {selectedItem.driveMinutes} min dal casolare
            </p>

            <p className="mt-5 leading-8 text-muted md:text-lg md:leading-9">{selectedItem.summary}</p>

            {isRoute(selectedItem) ? (
              <div className="mt-6 space-y-5">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <DetailStat label="Tipo" value={selectedItem.routeType} />
                  <DetailStat label="Difficoltà" value={selectedItem.difficulty} />
                  <DetailStat label="Distanza" value={`${selectedItem.distanceKm} km`} />
                  <DetailStat label="Dislivello" value={`${selectedItem.elevationM} m`} />
                  <DetailStat label="Durata" value={selectedItem.duration} />
                  <DetailStat label="Highlights" value={selectedItem.highlights.join(', ') || '—'} />
                </div>

                <div className="flex flex-wrap gap-3">
                  {selectedItem.mapyUrl ? (
                    <a
                      href={selectedItem.mapyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full bg-olive px-4 py-2 text-sm font-medium text-white transition hover:bg-ink"
                    >
                      Vedi traccia su Mapy.com &rarr;
                    </a>
                  ) : null}
                  <GpxLink route={selectedItem} />
                  <a
                    href={mapsUrl(selectedItem.lat, selectedItem.lng)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex text-sm font-medium text-clay transition hover:text-ink"
                  >
                    Google Maps &rarr;
                  </a>
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                <div className="rounded-[1.25rem] bg-canvas p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-muted">Perché andarci</p>
                  <p className="mt-2 leading-7 text-ink md:leading-8">{selectedItem.whyGo}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={mapsUrl(selectedItem.lat, selectedItem.lng)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex text-sm font-medium text-clay transition hover:text-ink"
                  >
                    Apri in Google Maps &rarr;
                  </a>
                  {selectedItem.website ? (
                    <a
                      href={selectedItem.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex text-sm font-medium text-clay transition hover:text-ink"
                    >
                      Sito / link &rarr;
                    </a>
                  ) : null}
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {selectedItem.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em] ${tagClassName(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </aside>
        ) : null}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-[1.5rem] border border-line/70 bg-card p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.22em] text-muted">Prima di partire</p>
          <p className="mt-3 leading-7 text-muted">
            Le tracce GPX sono scaricabili dalla scheda del percorso.
            Prima di ogni uscita in montagna, verificate che i sentieri siano aperti:
            neve, ghiaccio e frane possono rendere impraticabili anche percorsi semplici.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-line/70 bg-card p-6 shadow-soft">
          <p className="text-sm uppercase tracking-[0.22em] text-muted">Parco Nazionale dei Monti Sibillini</p>
          <p className="mt-3 leading-7 text-muted">
            Per sentieri, chiusure e condizioni nei Sibillini, contattate il Parco.
          </p>
          <div className="mt-4 space-y-1 text-sm text-muted">
            <p>Piazza del Forno 1, 62039 Visso (MC)</p>
            <p>Tel. 0737 961563 &middot; Info 0737 961014</p>
            <p>
              <a href="mailto:parco@sibillini.net" className="font-medium text-clay transition hover:text-ink">
                parco@sibillini.net
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GpxLink({ route }: { route: RouteItem }) {
  if (!route.gpxFile) return null;

  return (
    <a
      href={route.gpxFile}
      download
      className="inline-flex text-sm font-medium text-clay transition hover:text-ink"
    >
      Scarica GPX &rarr;
    </a>
  );
}

function DetailStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.25rem] bg-canvas p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-muted">{label}</p>
      <p className="mt-2 text-sm font-medium text-ink">{value}</p>
    </div>
  );
}
