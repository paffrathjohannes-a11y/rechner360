import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/theme-provider';
import { CookieBanner } from '@/components/layout/cookie-banner';
import { Analytics } from '@/components/layout/analytics';
import { AdsenseScript } from '@/components/ads/adsense-script';
import { OrganizationJsonLd } from '@/components/seo/json-ld';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/utils/constants';
import { ScrollToTop } from '@/components/layout/scroll-to-top';
import './globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0B1120' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  verification: {
    google: 'eJ8na0jojkqKp59IIAq1M97YM8cKdGM1M0UoU1_nYhA',
  },
  title: {
    default: `Kostenlose Online-Rechner 2026 | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Brutto Netto Rechner',
    'Gehaltsrechner',
    'Kreditrechner',
    'Tilgungsrechner',
    'Online Rechner',
    'Steuerrechner 2026',
    'Gehaltsrechner 2026',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `Kostenlose Online-Rechner 2026 | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `Kostenlose Online-Rechner 2026 | ${SITE_NAME}`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    // Kein `languages`-Hreflang: Wir haben nur deutsche Inhalte und im Root
    // gesetzte Hreflang-Einträge werden von Next.js an alle Unterseiten
    // weitervererbt — ohne seitenspezifisches Override würde jede Seite
    // fälschlich auf die Root-URL zeigen (bekannter App-Router-Bug).
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={inter.variable}
      suppressHydrationWarning
    >
      <body className="min-h-dvh flex flex-col antialiased">
        {/* Skip-Link für Tastatur- und Screenreader-Nutzer (WCAG 2.4.1). */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[1000] focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
        >
          Zum Hauptinhalt springen
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* Site-weites Organization-Schema (E-E-A-T Identity-Signal auf jeder
              Seite, nicht nur auf der Home). WebSite-Schema bleibt bewusst nur
              auf der Home, weil Google das Schema nur einmal pro Site indexiert. */}
          <OrganizationJsonLd />
          {children}
          <ScrollToTop />
          <CookieBanner />
          <Analytics />
          <AdsenseScript />
        </ThemeProvider>
      </body>
    </html>
  );
}
