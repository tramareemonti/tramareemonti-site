import Image from 'next/image';
import Link from 'next/link';
import {
  getHomeHero,
  getHomeHeroImageCaption,
  getHomeGalleryImages,
  getHomeGalleryPlaceholderNote,
  getHomePerche,
  getHomeLaCasa,
  getHomeDintorniIntro,
  getHomeComeArrivare,
  getHomeStats,
  getHomeFeatures,
  getFeaturedNearby,
} from '@/lib/site-content';
import { HomeGallery } from '@/components/home-gallery';
import { MailIcon, WhatsAppIcon } from '@/components/icons';
import {
  getSiteAddress,
  mailtoHref,
  siteConfig,
  whatsappHref,
} from '@/lib/site-config';
import type { Locale } from '@/lib/i18n/config';
import { makeT, t } from '@/lib/i18n/ui';
import { localePath } from '@/lib/i18n/paths';

type HomeViewProps = { locale: Locale };

export function HomeView({ locale }: HomeViewProps) {
  const tr = makeT(locale);
  const homeHero = getHomeHero(locale);
  const homePerche = getHomePerche(locale);
  const homeLaCasa = getHomeLaCasa(locale);
  const homeComeArrivare = getHomeComeArrivare(locale);
  const homeStats = getHomeStats(locale);
  const homeFeatures = getHomeFeatures(locale);
  const featuredNearby = getFeaturedNearby(locale);

  const galleryImages = getHomeGalleryImages(locale);
  const galleryNote = getHomeGalleryPlaceholderNote(locale);
  const galleryLabels = {
    openPrefix: tr('galleryOpen'),
    close: tr('galleryClose'),
    prev: tr('galleryPrev'),
    next: tr('galleryNext'),
    counterOf: tr('galleryCounterOf'),
    dialogPrefix: tr('galleryDialogLabel'),
  };

  // Keys for the "Come arrivare" cards are the (Italian) emojis; we detect by emoji
  // so the English labels can differ without breaking the switch.
  const renderComeArrivareBody = (card: { emoji: string; title: string; body: string }) => {
    if (card.emoji === '✈️') {
      return t('comeArrivareAereoInline', locale);
    }
    if (card.emoji === '🚆') {
      return t('comeArrivareTrenoInline', locale);
    }
    return card.body;
  };

  return (
    <div>
      <section className="mx-auto max-w-7xl px-6 pt-8 md:px-10 md:pt-10">
        <div className="rounded-[1.4rem] border border-amber-300/80 bg-gradient-to-r from-amber-50 to-amber-100/70 p-4 text-amber-950 shadow-soft sm:p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="inline-flex items-center gap-2 rounded-full border border-amber-400/60 bg-amber-200/40 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-amber-800">
                <span className="text-xl leading-none sm:text-2xl" aria-hidden="true">
                  👷‍♂️👷‍♀️
                </span>
                {tr('wipBadge')}
              </p>
              <p className="mt-2 text-sm leading-6 text-amber-900 sm:text-[0.95rem]">
                {tr('wipMessage')}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <a
                href={whatsappHref(tr('wipWhatsAppMessage'), locale)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={tr('wipWhatsAppAria')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-400/70 bg-white/80 px-4 py-2.5 text-sm font-medium text-amber-900 transition hover:border-amber-600 hover:text-amber-700"
              >
                <WhatsAppIcon size={16} />
                {tr('ctaWhatsApp')}
              </a>
              <a
                href={mailtoHref(tr('wipMailSubject'), locale)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-400/70 bg-white/80 px-4 py-2.5 text-sm font-medium text-amber-900 transition hover:border-amber-600 hover:text-amber-700"
              >
                <MailIcon size={16} />
                {tr('ctaEmail')}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-8 md:px-10 md:pb-16 md:pt-12">
        <div className="grid gap-8 rounded-[2rem] border border-line/70 bg-card p-6 shadow-soft md:grid-cols-[1.02fr_0.98fr] md:p-8 lg:p-10">
          <div className="flex flex-col justify-between gap-8">
            <div className="space-y-5">
              <h1 className="max-w-xl font-display font-normal leading-[1.28] tracking-tight text-inkSoft md:leading-[1.22] text-[1.7rem] sm:text-[1.9rem] md:text-[2.35rem] lg:text-[2.7rem]">
                {homeHero.title}
              </h1>
              <p className="max-w-xl text-base font-light leading-8 text-mutedWarm sm:text-lg sm:leading-9">
                {homeHero.support}
              </p>
              <p className="text-sm leading-6 text-mutedWarm/90">{homeHero.distancesLine}</p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={whatsappHref(undefined, locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-olive px-6 py-3 text-sm font-medium text-white transition hover:bg-ink"
                >
                  <WhatsAppIcon size={18} />
                  {tr('ctaWriteOnWhatsApp')}
                </a>
                <a
                  href={mailtoHref(undefined, locale)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition hover:border-clay hover:text-clay"
                >
                  <MailIcon size={18} />
                  {tr('ctaEmail')}
                </a>
              </div>
              <Link
                href={localePath(locale, '/dintorni')}
                className="inline-flex items-center gap-1 text-sm font-medium text-clay transition hover:text-ink"
              >
                {tr('ctaDiscoverArea')}
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <figure className="space-y-2">
              <div className="relative min-h-[280px] overflow-hidden rounded-[1.5rem] border border-line/70">
                <Image
                  src="/images/photos/monti.jpeg"
                  alt={galleryImages[0]?.alt ?? ''}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <figcaption className="text-xs leading-snug text-muted">
                {getHomeHeroImageCaption(locale)}
              </figcaption>
            </figure>
            <div className="relative min-h-[160px] overflow-hidden rounded-[1.5rem] border border-line/70">
              <Image
                src="/images/photos/mare.jpeg"
                alt={galleryImages[1]?.alt ?? ''}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-label={homePerche.eyebrow} className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="space-y-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-sm uppercase tracking-[0.25em] text-muted">{homePerche.eyebrow}</p>
            <h2 className="font-serif text-3xl leading-tight md:text-4xl">{homePerche.title}</h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {homePerche.points.map((point) => (
              <li
                key={point.title}
                className="flex h-full flex-col rounded-[1.5rem] border border-line/70 bg-card p-5 shadow-soft"
              >
                <span className="text-2xl leading-none" aria-hidden="true">
                  {point.emoji}
                </span>
                <h3 className="mt-3 font-serif text-xl text-ink">{point.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{point.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-[0.25em] text-muted">{tr('laCasaEyebrow')}</p>
              <h2 className="font-serif text-3xl leading-tight md:text-4xl">{homeLaCasa.title}</h2>
              <p className="max-w-xl leading-8 text-muted">{homeLaCasa.body}</p>
            </div>
            <div className="flex gap-4">
              {homeStats.map((item) => (
                <div key={item.label} className="flex-1 rounded-[1.25rem] border border-line/70 bg-card p-4 text-center">
                  <p className="font-serif text-3xl text-ink">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted">{item.label}</p>
                </div>
              ))}
            </div>
            {homeLaCasa.note && (
              <p className="text-base italic text-muted">{homeLaCasa.note}</p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {homeFeatures.map((item) => (
              <div
                key={item.label}
                className="flex h-full flex-col rounded-[1.25rem] border border-line/70 bg-canvas p-4 sm:p-5"
              >
                <p className="font-serif text-lg leading-snug text-ink">{item.label}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="gallery"
        aria-label={tr('galleryDialogLabel')}
        className="mx-auto max-w-7xl px-6 pb-6 pt-0 md:px-10 md:pb-7"
      >
        <HomeGallery images={galleryImages} note={galleryNote} labels={galleryLabels} />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12 pt-6 md:px-10 md:pb-16 md:pt-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-muted">{tr('dintorniEyebrow')}</p>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl">{tr('featuredHeartTitle')}</h2>
            </div>
            <Link
              href={localePath(locale, '/dintorni')}
              className="shrink-0 text-sm font-medium text-clay transition hover:text-ink"
            >
              {tr('ctaGoToMap')}
            </Link>
          </div>
          <p className="max-w-3xl text-base leading-7 text-muted">{getHomeDintorniIntro(locale)}</p>
          <div className="grid gap-4 md:grid-cols-3">
            {featuredNearby.map((item, index) => (
              <Link
                key={item.title}
                href={localePath(locale, item.href)}
                className={`group rounded-[1.5rem] border bg-card p-6 shadow-soft transition hover:border-clay ${
                  index === 0 ? 'border-clay/80 bg-card' : 'border-line/70'
                }`}
              >
                {item.isFamilyBar && (
                  <p className="mb-2 inline-flex items-center rounded-full border border-clay/60 bg-clay/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-clay">
                    {tr('familyBarBadge')}
                  </p>
                )}
                <h3 className="font-serif text-2xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
                <p className="mt-4 text-sm font-medium text-clay transition group-hover:text-ink">
                  {tr('ctaExplore')}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="come-arrivare" className="mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <div className="space-y-6">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-muted">{homeComeArrivare.eyebrow}</p>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl">{homeComeArrivare.title}</h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted">{homeComeArrivare.intro}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {homeComeArrivare.cards.map((card) => (
              <div
                key={card.title}
                className="rounded-[1.5rem] border border-line/70 bg-card p-6 shadow-soft"
              >
                <p className="flex items-center gap-2 font-serif text-xl text-ink">
                  <span className="select-none text-[1.35rem] leading-none" aria-hidden="true">
                    {card.emoji}
                  </span>
                  {card.title}
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">{renderComeArrivareBody(card)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contatti" className="mx-auto max-w-7xl px-6 pb-20 pt-12 md:px-10">
        <div className="rounded-[2rem] border border-line/70 bg-card p-6 shadow-soft md:p-8">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-xl">
              <p className="text-sm uppercase tracking-[0.25em] text-muted">{tr('contactEyebrow')}</p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">{tr('ctaWriteUs')}</h2>
              <p className="mt-4 leading-8 text-muted">{tr('contactBody')}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end lg:flex-row">
              <a
                href={whatsappHref(undefined, locale)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-olive px-6 py-3 text-sm font-medium text-white transition hover:bg-ink"
              >
                <WhatsAppIcon size={18} />
                {tr('ctaWhatsApp')}
              </a>
              <a
                href={mailtoHref(undefined, locale)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium text-ink transition hover:border-clay hover:text-clay"
              >
                <MailIcon size={18} />
                {tr('ctaEmail')}
              </a>
            </div>
          </div>
          <p className="mt-6 border-t border-line/60 pt-4 text-sm leading-6 text-muted">
            <span className="font-medium text-ink">{getSiteAddress(locale)}</span>
            <span> {tr('contactAddressNote')} </span>
            <Link
              href={localePath(locale, '/dintorni')}
              className="font-medium text-clay transition hover:text-ink"
            >
              {tr('ctaSeeAreaMap')}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
