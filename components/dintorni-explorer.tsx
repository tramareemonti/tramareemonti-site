'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
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
};

const difficultyStyles: Record<RouteItem['difficulty'], string> = {
  facile: 'border-emerald-300/70 bg-emerald-50 text-emerald-700',
  media: 'border-amber-300/70 bg-amber-50 text-amber-700',
  impegnativa: 'border-rose-300/70 bg-rose-50 text-rose-700',
};

function tagClassName(tag: string) {
  return seasonStyles[tag] ?? 'border-line bg-canvas text-muted';
}

function itemLabel(item: ExplorerItem) {
  if (isRoute(item)) return categoryLabels[item.category];
  return item.sublabel ?? categoryLabels[item.category];
}

function difficultyOrder(difficulty: RouteItem['difficulty']) {
  switch (difficulty) {
    case 'facile':
      return 0;
    case 'media':
      return 1;
    case 'impegnativa':
      return 2;
  }
}

function difficultyLabel(difficulty: RouteItem['difficulty']) {
  switch (difficulty) {
    case 'facile':
      return 'Facile';
    case 'media':
      return 'Media';
    case 'impegnativa':
      return 'Impegnativa';
  }
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
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeDifficulty, setActiveDifficulty] = useState<RouteItem['difficulty'] | null>(null);
  const [mobileListOpen, setMobileListOpen] = useState(false);
  const [mobileDetailExpanded, setMobileDetailExpanded] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const mobileCardRef = useRef<HTMLDivElement>(null);

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

    if (activeCategory === 'itinerari' && activeDifficulty !== null) {
      items = items.filter((item) => isRoute(item) && item.difficulty === activeDifficulty);
    }

    return items.sort((a, b) => {
      if (activeCategory === 'itinerari' && isRoute(a) && isRoute(b)) {
        const diff = difficultyOrder(a.difficulty) - difficultyOrder(b.difficulty);
        if (diff !== 0) return diff;
      }
      return a.driveMinutes - b.driveMinutes;
    });
  }, [activeCategory, activeRange, allItems, query, activeDifficulty]);

  const selectedItem = useMemo(() => {
    if (!selectedId) return filteredItems[0] ?? null;
    return filteredItems.find((item) => item.id === selectedId) ?? filteredItems[0] ?? null;
  }, [filteredItems, selectedId]);

  const activeCategoryLabel = useMemo(() => {
    return categories.find((c) => c.key === activeCategory)?.label ?? '';
  }, [activeCategory]);

  const activeFilterLabel = useMemo(() => {
    const parts: string[] = [];
    if (activeCategoryLabel) parts.push(activeCategoryLabel);
    if (activeRange !== null) parts.push(distanceRanges[activeRange].label);
    if (activeDifficulty !== null) parts.push(difficultyLabel(activeDifficulty));
    return parts.join(' • ');
  }, [activeCategoryLabel, activeRange, activeDifficulty]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setMobileListOpen(false);
    setMobileDetailExpanded(false);
    setTimeout(() => {
      mobileCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const resetRange = () => setActiveRange(null);

  useEffect(() => {
    if (!mobileFiltersOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileFiltersOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileFiltersOpen]);

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
          Qualche idea per esplorare le Marche.
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

      {/* ─── Filters (desktop) ─── */}
      <div className="mb-4 hidden flex-col gap-4 rounded-[1.5rem] border border-line/70 bg-card p-4 shadow-soft md:flex md:flex-row md:items-center md:justify-between">
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
                  setActiveDifficulty(null);
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

      <div className="mb-6 hidden flex-wrap items-center gap-2 md:flex">
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

      {activeCategory === 'itinerari' && (
        <div className="hidden mb-6 flex-wrap items-center gap-2 md:flex">
          <span className="mr-1 text-xs text-muted">Difficoltà:</span>
          {(['facile', 'media', 'impegnativa'] as const).map((difficulty) => (
            <button
              key={difficulty}
              type="button"
              onClick={() => setActiveDifficulty(activeDifficulty === difficulty ? null : difficulty)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                activeDifficulty === difficulty
                  ? difficultyStyles[difficulty]
                  : 'border-line/70 text-muted hover:border-clay hover:text-ink'
              }`}
            >
              {difficultyLabel(difficulty)}
            </button>
          ))}
          {activeDifficulty !== null && (
            <button
              type="button"
              onClick={() => setActiveDifficulty(null)}
              className="text-xs text-muted transition hover:text-ink"
            >
              &times; Tutte
            </button>
          )}
        </div>
      )}

      {/* ─── Filters (mobile) ─── */}
      <div className="mb-4 flex flex-col gap-3 md:hidden">
        <div className="flex items-center gap-2 rounded-[1.5rem] border border-line/70 bg-card p-3 shadow-soft">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            aria-expanded={mobileFiltersOpen}
            className="shrink-0 rounded-full border border-line bg-canvas px-4 py-2 text-sm font-medium text-muted transition hover:border-clay hover:text-ink"
          >
            Filtri
          </button>
          <label className="block min-w-0 flex-1">
            <span className="sr-only">Cerca nella guida</span>
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSelectedId(null);
              }}
              placeholder="Cerca per nome, luogo, tag..."
              className="w-full rounded-full border border-line bg-canvas px-4 py-3 text-sm outline-none transition placeholder:text-muted focus:border-clay"
            />
          </label>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Chiudi filtri"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          <div className="relative w-full max-h-[85vh] overflow-auto rounded-t-[1.5rem] border border-line/70 bg-card p-4 shadow-soft">
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-line/60" />

            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm uppercase tracking-[0.22em] text-muted">Filtri</p>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="text-sm font-medium text-clay transition hover:text-ink"
              >
                Chiudi
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-muted">Categoria</p>
                <div className="grid grid-cols-2 gap-2">
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
                          setActiveDifficulty(null);
                          setMobileFiltersOpen(false);
                        }}
                        className={`rounded-full px-3 py-2 text-sm font-medium transition ${
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
              </div>

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-muted">Distanza</p>
                <div className="flex flex-wrap gap-2">
                  {distanceRanges.map((range, i) => (
                    <button
                      key={range.label}
                      type="button"
                      onClick={() => {
                        setActiveRange(activeRange === i ? null : i);
                        setMobileFiltersOpen(false);
                      }}
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
                    <button
                      type="button"
                      onClick={() => {
                        setActiveRange(null);
                        setMobileFiltersOpen(false);
                      }}
                      className="text-xs text-muted transition hover:text-ink"
                    >
                      &times; Tutti
                    </button>
                  )}
                </div>
              </div>

              {activeCategory === 'itinerari' && (
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.22em] text-muted">Difficoltà</p>
                  <div className="flex flex-wrap gap-2">
                    {(['facile', 'media', 'impegnativa'] as const).map((difficulty) => (
                      <button
                        key={difficulty}
                        type="button"
                        onClick={() => {
                          setActiveDifficulty(activeDifficulty === difficulty ? null : difficulty);
                          setMobileFiltersOpen(false);
                        }}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                          activeDifficulty === difficulty
                            ? difficultyStyles[difficulty]
                            : 'border-line/70 text-muted hover:border-clay hover:text-ink'
                        }`}
                      >
                        {difficultyLabel(difficulty)}
                      </button>
                    ))}
                    {activeDifficulty !== null && (
                      <button
                        type="button"
                        onClick={() => setActiveDifficulty(null)}
                        className="text-xs text-muted transition hover:text-ink"
                      >
                        &times; Tutte
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('all');
                    setActiveRange(null);
                    setActiveDifficulty(null);
                    setSelectedId(null);
                    setMobileFiltersOpen(false);
                  }}
                  className="w-full rounded-[1.25rem] border border-line bg-canvas px-4 py-3 text-sm font-medium text-ink transition hover:border-clay"
                >
                  Azzera filtri
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 md:gap-6">
      {/* ─── Mobile: collapsible results tab (above map) ─── */}
      <div className="order-1 md:hidden">
        <div className="overflow-hidden rounded-[1.5rem] border border-line/70 bg-card shadow-soft">
          <div className="flex items-center justify-between gap-3 px-5 py-4">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="min-w-0 flex-1 text-left"
              aria-label="Apri filtri"
            >
              <div className="flex items-baseline gap-2">
                <p
                  className="truncate rounded-full border border-olive/30 bg-olive/15 px-3 py-1 text-sm font-medium text-olive"
                >
                  {activeFilterLabel || 'Preferiti'}
                </p>
                <p className="shrink-0 text-xs font-medium text-muted">
                  {filteredItems.length} {filteredItems.length === 1 ? 'risultato' : 'risultati'}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setMobileListOpen((v) => !v)}
              className="shrink-0 rounded-full border border-line/70 bg-canvas px-3 py-1.5 text-xs font-medium text-clay transition hover:border-clay hover:text-ink"
              aria-expanded={mobileListOpen}
            >
              {mobileListOpen ? 'Chiudi' : 'Sfoglia'}
            </button>
          </div>
          {mobileListOpen && (
            <div className="max-h-[50vh] overflow-auto border-t border-line/40 px-2 pb-2">
              <div className="divide-y divide-line/30">
                {filteredItems.map((item) => {
                  const selected = selectedItem?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item.id)}
                      className={`flex w-full items-center justify-between gap-3 px-3 py-3 text-left transition ${
                        selected ? 'bg-canvas' : ''
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm ${selected ? 'font-semibold text-ink' : 'font-medium text-ink'}`}>
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-xs text-muted">
                          {isRoute(item) ? item.startTown : item.town} &middot; {item.driveMinutes} min
                        </p>
                      </div>
                      {selected && <span className="h-2 w-2 shrink-0 rounded-full bg-olive" />}
                    </button>
                  );
                })}
                {filteredItems.length === 0 && <p className="px-3 py-4 text-sm text-muted">Nessun risultato.</p>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Mobile: compact selected card (below map) ─── */}
      <div className="order-3 space-y-4 md:hidden">
        {selectedItem && (
          <div ref={mobileCardRef} className="rounded-[1.5rem] border border-olive/30 bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted">
                  <span>{itemLabel(selectedItem)}</span>
                  {isRoute(selectedItem) && (
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] ${difficultyStyles[selectedItem.difficulty]}`}
                    >
                      {difficultyLabel(selectedItem.difficulty)}
                    </span>
                  )}
                </p>
                <h2 className="mt-1 font-serif text-2xl leading-tight text-ink">{selectedItem.title}</h2>
                <p className="mt-1 text-sm text-muted">
                  {isRoute(selectedItem) ? selectedItem.startTown : selectedItem.town} &middot; a{' '}
                  {selectedItem.driveMinutes} min dal casolare
                </p>
              </div>
              <a
                href={mapsUrl(selectedItem.lat, selectedItem.lng)}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 rounded-full border border-line bg-canvas px-3 py-2 text-xs font-medium text-clay transition hover:border-clay"
              >
                Maps &rarr;
              </a>
            </div>

            {!mobileDetailExpanded && (
              <p className="mt-3 line-clamp-2 text-sm leading-7 text-muted">{selectedItem.summary}</p>
            )}

            {mobileDetailExpanded && (
              <div className="mt-4 space-y-4">
                <p className="leading-7 text-muted">{selectedItem.summary}</p>

                {isRoute(selectedItem) ? (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <DetailStat label="Difficoltà" value={difficultyLabel(selectedItem.difficulty)} />
                      <DetailStat label="Distanza" value={`${selectedItem.distanceKm} km`} />
                      <DetailStat label="Dislivello" value={`${selectedItem.elevationM} m`} />
                      <DetailStat label="Durata" value={selectedItem.duration} />
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <GpxLink route={selectedItem} />
                      {selectedItem.mapyUrl && (
                        <a
                          href={selectedItem.mapyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-clay transition hover:text-ink"
                        >
                          Traccia su Mapy.com &rarr;
                        </a>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="rounded-[1.25rem] bg-canvas p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-muted">Perché andarci</p>
                      <p className="mt-2 text-sm leading-7 text-ink">{selectedItem.whyGo}</p>
                    </div>
                    {selectedItem.website && (
                      <a
                        href={selectedItem.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex text-sm font-medium text-clay transition hover:text-ink"
                      >
                        Sito / link &rarr;
                      </a>
                    )}
                  </>
                )}

                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em] ${tagClassName(tag)}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setMobileDetailExpanded((v) => !v)}
              className="mt-3 text-sm font-medium text-clay transition hover:text-ink"
            >
              {mobileDetailExpanded ? 'Meno dettagli' : 'Leggi tutto \u2192'}
            </button>
          </div>
        )}
      </div>

      {/* ─── Desktop layout ─── */}
      <div className="hidden max-h-[280px] overflow-auto rounded-[1.5rem] border border-line/70 bg-card p-3 shadow-soft md:order-1 md:block">
        <div className="flex flex-wrap gap-2">
          {filteredItems.map((item) => {
            const selected = selectedItem?.id === item.id;
            const hovered = !selected && hoveredId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`rounded-[1.25rem] border px-4 py-3 text-left transition ${
                  selected
                    ? 'border-olive bg-canvas'
                    : hovered
                      ? 'border-clay/50 bg-canvas'
                      : 'border-transparent bg-[#f4eadc] hover:border-line hover:bg-canvas'
                }`}
              >
                <p className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted">
                  <span>{itemLabel(item)}</span>
                  {isRoute(item) ? (
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] ${difficultyStyles[item.difficulty]}`}
                    >
                      {difficultyLabel(item.difficulty)}
                    </span>
                  ) : null}
                </p>
                <p className="mt-1 font-medium text-ink">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {isRoute(item) ? (
                    <>
                      {item.startTown} &middot; {item.driveMinutes} min
                    </>
                  ) : (
                    <>
                      {item.town} &middot; {item.driveMinutes} min
                    </>
                  )}
                </p>
              </button>
            );
          })}
          {filteredItems.length === 0 && (
            <p className="p-4 text-sm text-muted">Nessun risultato.</p>
          )}
        </div>
      </div>

      <div className="order-2 grid gap-6 md:order-2 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[1.5rem] border border-line/70 bg-card p-2 shadow-soft md:p-3">
          <TerritoryMap items={filteredItems} selectedId={selectedItem?.id ?? null} hoveredId={hoveredId} onSelect={handleSelect} onHover={setHoveredId} />
        </div>

        {selectedItem ? (
          <aside className="hidden rounded-[1.5rem] border border-line/70 bg-card p-6 shadow-soft md:block xl:p-8">
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
                  <DetailStat label="Attività" value="trekking" />
                  <DetailStat label="Difficoltà" value={selectedItem.difficulty} />
                  <DetailStat label="Distanza" value={`${selectedItem.distanceKm} km`} />
                  <DetailStat label="Dislivello" value={`${selectedItem.elevationM} m`} />
                  <DetailStat label="Durata" value={selectedItem.duration} />
                  <DetailStat label="Highlights" value={selectedItem.highlights.join(', ') || '—'} />
                </div>

                <div className="flex flex-wrap gap-3">
                  <GpxLink route={selectedItem} />
                  <a
                    href={mapsUrl(selectedItem.lat, selectedItem.lng)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex text-sm font-medium text-clay transition hover:text-ink"
                  >
                    Google Maps &rarr;
                  </a>
                  {selectedItem.mapyUrl ? (
                    <a
                      href={selectedItem.mapyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex text-sm font-medium text-clay transition hover:text-ink"
                    >
                      Traccia su Mapy.com &rarr;
                    </a>
                  ) : null}
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
      </div>

      {activeCategory === 'itinerari' && (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-[1.5rem] border border-line/70 bg-card p-6 shadow-soft">
            <p className="text-sm uppercase tracking-[0.22em] text-muted">Prima di partire</p>
            <p className="mt-3 leading-7 text-muted">
              Le tracce dettagliate dei percorsi sono visualizzabili su <span className="font-medium">Mapy.com</span> e scaricabili in formato GPX dalla scheda del percorso.
              Prima di ogni uscita in montagna, verificate che i sentieri siano aperti: neve, ghiaccio e frane possono rendere impraticabili anche percorsi semplici.
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
      )}
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
