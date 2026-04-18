'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  getSiteAddress,
  mailtoHref,
  siteConfig,
  whatsappHref,
} from '@/lib/site-config';
import { WhatsAppIcon } from '@/components/icons';
import { getLocaleFromPathname, localePath } from '@/lib/i18n/paths';
import { makeT } from '@/lib/i18n/ui';

export function SiteFooter() {
  const pathname = usePathname() ?? '/';
  const locale = getLocaleFromPathname(pathname);
  const tr = makeT(locale);

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
              <p className="text-sm text-muted">{getSiteAddress(locale)}</p>
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm sm:justify-center">
            <Link
              href={localePath(locale, '/')}
              className="font-medium text-muted transition hover:text-ink"
            >
              {tr('footerCasolareLabel')}
            </Link>
            <Link
              href={localePath(locale, '/dintorni')}
              className="font-medium text-muted transition hover:text-ink"
            >
              {tr('footerDintorniLabel')}
            </Link>
            <a
              href={whatsappHref(undefined, locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-muted transition hover:text-ink"
            >
              <WhatsAppIcon size={14} />
              {tr('ctaWhatsApp')}
            </a>
            <a
              href={mailtoHref(undefined, locale)}
              className="font-medium text-muted transition hover:text-ink"
            >
              {siteConfig.email}
            </a>
          </nav>

          <Link
            href={localePath(locale, '/dintorni')}
            className="text-sm font-medium text-clay transition hover:text-ink"
          >
            {tr('footerMapLink')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
