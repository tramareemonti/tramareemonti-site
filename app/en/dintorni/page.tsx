import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DintorniExplorer } from '@/components/dintorni-explorer';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: `Around · ${siteConfig.name}`,
  description:
    'Favourite places, producers, trails and sea ideas around the casolare: a hand-picked guide to Le Marche.',
  alternates: {
    canonical: '/en/dintorni',
    languages: {
      it: '/dintorni',
      en: '/en/dintorni',
      'x-default': '/dintorni',
    },
  },
};

export default function DintorniPageEn() {
  return (
    <Suspense>
      <DintorniExplorer locale="en" />
    </Suspense>
  );
}
