import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export function SiteFooter() {
  return (
    <footer className="border-t border-line/70 bg-card">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        <div className="grid gap-8 sm:grid-cols-[auto_1fr_auto] sm:items-start">
          <div className="flex items-center gap-3">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={120}
              height={80}
              className="h-auto w-[52px]"
            />
            <div>
              <p className="font-serif text-lg text-ink">{siteConfig.name}</p>
              <p className="text-sm text-muted">{siteConfig.address}</p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm sm:justify-center">
            <Link href="/" className="font-medium text-muted transition hover:text-ink">
              Il Casolare
            </Link>
            <Link href="/i-dintorni" className="font-medium text-muted transition hover:text-ink">
              I Dintorni
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-muted transition hover:text-ink"
            >
              {siteConfig.email}
            </a>
          </nav>

          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-clay transition hover:text-ink"
          >
            Apri mappa &rarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
