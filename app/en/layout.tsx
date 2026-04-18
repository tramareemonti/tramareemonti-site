import type { Metadata } from 'next';
import { getSiteDescription, siteConfig } from '@/lib/site-config';

const enDescription = getSiteDescription('en');

const ogImage = {
  url: '/logo-primary.png',
  width: 523,
  height: 524,
  alt: `${siteConfig.name} logo`,
};

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.titleTail.en}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: enDescription,
  alternates: {
    canonical: '/en',
    languages: {
      it: '/',
      en: '/en',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['it_IT'],
    url: `${siteConfig.url}/en`,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.titleTail.en}`,
    description: enDescription,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — ${siteConfig.titleTail.en}`,
    description: enDescription,
    images: [ogImage.url],
  },
};

/**
 * Pass-through layout: the App Router already rendered `<html>` and `<body>`
 * in `app/layout.tsx`. We only need this layout to attach EN-specific metadata.
 * `<html lang>` is flipped to "en" at runtime by <HtmlLangSync /> in the root layout.
 */
export default function EnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
