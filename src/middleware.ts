import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADSENSE_APPROVAL_MODE } from '@/config/seo-mode';

// Alle 25 Rechner-Slugs, deren programmatische Unter-Varianten im Approval-
// Mode auf noindex gesetzt werden. Hubs selbst (exact match) bleiben index.
const RECHNER_WITH_VARIANTS = new Set([
  'abfindungsrechner',
  'baukosten-rechner',
  'bmi-rechner',
  'brutto-netto-rechner',
  'bu-rechner',
  'buergergeld-rechner',
  'elterngeld-rechner',
  'erbschaftsteuer-rechner',
  'gehaltserhoehung-rechner',
  'gehaltsrechner',
  'grundsteuer-rechner',
  'inflationsrechner',
  'kalorienrechner',
  'kfz-versicherung-rechner',
  'kreditrechner',
  'mwst-rechner',
  'nebenkostenrechner',
  'pfaendungsrechner',
  'pkv-rechner',
  'prozentrechner',
  'rentenrechner',
  'stundenlohn-rechner',
  'tilgungsrechner',
  'unterhalt-rechner',
  'zinseszinsrechner',
]);

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';

  // Redirect non-www to www
  if (host === 'rechner360.de') {
    const url = request.nextUrl.clone();
    url.host = 'www.rechner360.de';
    return NextResponse.redirect(url, 301);
  }

  const response = NextResponse.next();

  // AdSense-Approval-Modus: X-Robots-Tag: noindex auf ALLE Variant-URLs
  // (Path hat 2 Segmente und erstes Segment ist ein Rechner-Hub).
  // Hub-Seiten selbst (/brutto-netto-rechner) bleiben index.
  if (ADSENSE_APPROVAL_MODE) {
    const segments = request.nextUrl.pathname.split('/').filter(Boolean);
    if (segments.length === 2 && RECHNER_WITH_VARIANTS.has(segments[0])) {
      response.headers.set('X-Robots-Tag', 'noindex, follow');
    }
  }

  return response;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|manifest.webmanifest|ads.txt|robots.txt|sitemap.xml).*)',
};
