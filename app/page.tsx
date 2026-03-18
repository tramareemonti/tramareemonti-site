import Image from 'next/image';
import Link from 'next/link';
import { homeStats, homeFeatures, featuredNearby } from '@/lib/site-content';
import { siteConfig } from '@/lib/site-config';

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-8 md:px-10 md:pb-16 md:pt-12">
        <div className="grid gap-8 rounded-[2rem] border border-line/70 bg-card p-6 shadow-soft md:grid-cols-[1.02fr_0.98fr] md:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <h1 className="max-w-xl font-serif text-2xl leading-snug text-ink md:text-3xl lg:text-4xl">
                Una casa in campagna a Urbisaglia, tra colline, borghi e Sibillini.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-muted">
                Posizione comoda per giornate lente e uscite con criterio.
              </p>
              <p className="text-sm text-muted">
                15 min da Abbadia di Fiastra &middot; 30 min da Macerata &middot; 50 min dal mare &middot; 70 min dai Sibillini
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/i-dintorni"
                className="inline-flex items-center justify-center rounded-full bg-olive px-6 py-3 text-sm font-medium text-white transition hover:bg-ink"
              >
                Scopri i dintorni
              </Link>
              <a
                href={`mailto:${siteConfig.email}?subject=Richiesta%20informazioni%20-%20${encodeURIComponent(siteConfig.name)}`}
                className="inline-flex items-center justify-center rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition hover:border-clay hover:text-clay"
              >
                Scrivici
              </a>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:grid-rows-[1fr_auto]">
            <div className="relative min-h-[280px] overflow-hidden rounded-[1.5rem] border border-line/70 md:col-span-2">
              <Image
                src="/images/photos/zona_relax_esternajpeg.jpeg"
                alt="Vista dalla terrazza del casolare sulle colline marchigiane"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="rounded-[1.5rem] border border-line/70 bg-canvas p-5">
              <p className="text-sm uppercase tracking-[0.22em] text-muted">Dove</p>
              <p className="mt-2 font-serif text-xl text-ink">Urbisaglia (MC)</p>
              <p className="mt-1 text-sm leading-6 text-muted">{siteConfig.address}</p>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex text-sm font-medium text-clay transition hover:text-ink"
              >
                Apri su Google Maps &rarr;
              </a>
            </div>
            <div className="relative min-h-[160px] overflow-hidden rounded-[1.5rem] border border-line/70">
              <Image
                src="/images/photos/sala_comune.jpeg"
                alt="Sala comune con camino e vista sulle colline"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.25em] text-muted">La casa</p>
              <h2 className="font-serif text-3xl leading-tight md:text-4xl">Una base per stare bene e muoversi bene</h2>
              <p className="max-w-xl leading-8 text-muted">
                Casa in campagna con spazio esterno, camino e vista sulle colline.
                Funziona come punto di partenza per esplorare il territorio con calma.
              </p>
            </div>
            <div className="flex gap-4">
              {homeStats.map((item) => (
                <div key={item.label} className="flex-1 rounded-[1.25rem] border border-line/70 bg-card p-4 text-center">
                  <p className="font-serif text-3xl text-ink">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {homeFeatures.map((item) => (
              <div key={item.label} className="rounded-[1.5rem] border border-line/70 bg-card p-5">
                <p className="text-sm uppercase tracking-[0.22em] text-muted">{item.label}</p>
                <p className="mt-3 text-lg font-medium text-ink">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-muted">I dintorni</p>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl">I nostri posti del cuore</h2>
            </div>
            <Link href="/i-dintorni" className="text-sm font-medium text-clay transition hover:text-ink">
              Vai alla mappa &rarr;
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {featuredNearby.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-[1.5rem] border border-line/70 bg-card p-6 shadow-soft transition hover:border-clay"
              >
                <p className="text-sm uppercase tracking-[0.22em] text-muted">{item.category}</p>
                <h3 className="mt-3 font-serif text-2xl text-ink">{item.title}</h3>
                <p className="mt-3 leading-7 text-muted">{item.description}</p>
                <p className="mt-4 text-sm font-medium text-clay transition group-hover:text-ink">
                  Esplora &rarr;
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-12 md:px-10">
        <div className="grid gap-6 rounded-[2rem] border border-line/70 bg-card p-6 shadow-soft md:grid-cols-[0.92fr_1.08fr] md:p-8">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-muted">Contatti</p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl">Scrivici</h2>
            <p className="mt-4 max-w-lg leading-8 text-muted">
              Per disponibilit&agrave;, periodi, informazioni sulla casa o sui dintorni, scrivici direttamente.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <a
              href={`mailto:${siteConfig.email}?subject=Richiesta%20informazioni%20-%20${encodeURIComponent(siteConfig.name)}`}
              className="rounded-[1.5rem] border border-line/70 bg-canvas p-5 transition hover:border-clay"
            >
              <p className="text-sm uppercase tracking-[0.22em] text-muted">Email</p>
              <p className="mt-3 text-lg font-medium text-ink">{siteConfig.email}</p>
              <p className="mt-2 text-sm text-clay">Scrivici &rarr;</p>
            </a>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-[1.5rem] border border-line/70 bg-canvas p-5 transition hover:border-clay"
            >
              <p className="text-sm uppercase tracking-[0.22em] text-muted">Dove siamo</p>
              <p className="mt-3 text-lg font-medium text-ink">{siteConfig.address}</p>
              <p className="mt-2 text-sm text-clay">Apri mappa &rarr;</p>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
