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

export const metadata: Metadata = {
  title: siteConfig.name,
  description:
    'Casa in campagna nelle Marche e guida curata dei dintorni tra colline, borghi, produttori e attività outdoor.',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
  openGraph: {
    images: ['/images/logo.png'],
  },
  twitter: {
    images: ['/images/logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={displaySerif.variable}>
      <body>
        <div className="min-h-screen">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
