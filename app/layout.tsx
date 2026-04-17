import type { Metadata } from 'next';
import { Spectral } from 'next/font/google';
import './globals.css';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { siteConfig } from '@/lib/site-config';

const displaySerif = Spectral({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const ogImage = {
  url: '/logo-primary.png',
  width: 523,
  height: 524,
  alt: `Logo ${siteConfig.name}`,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — casa in campagna nelle Marche`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — casa in campagna nelle Marche`,
    description: siteConfig.description,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} — casa in campagna nelle Marche`,
    description: siteConfig.description,
    images: [ogImage.url],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  '@id': `${siteConfig.url}/#lodging`,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.whatsapp.tel,
  image: [`${siteConfig.url}${ogImage.url}`],
  logo: `${siteConfig.url}/images/logo.png`,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'reservations',
      telephone: siteConfig.whatsapp.tel,
      email: siteConfig.email,
      availableLanguage: ['it', 'en'],
      url: `https://wa.me/${siteConfig.whatsapp.number}`,
    },
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Urbisaglia',
    addressRegion: 'MC',
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.casolareMap.lat,
    longitude: siteConfig.casolareMap.lng,
  },
  numberOfRooms: 3,
  petsAllowed: false,
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Wi-Fi gratuito', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Parcheggio gratuito', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Giardino', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Terrazza', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Cucina attrezzata', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Lavatrice', value: true },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={displaySerif.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="min-h-screen">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
