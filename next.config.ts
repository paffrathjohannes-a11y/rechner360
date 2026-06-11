import type { NextConfig } from "next";

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // AdSense lädt Ad-Creatives von tpc.googlesyndication.com und nutzt
      // googleads.g.doubleclick.net für Auto-Ads / Click-Tracking.
      // www.googleadservices.com wird beim Klick auf Anzeigen aufgerufen.
      // fundingchoicesmessages.google.com = Googles EEA-Consent-Message (CMP),
      // ohne die AdSense im EWR keine/nur Limited Ads ausliefert.
      // ep1/ep2.adtrafficquality.google = AdSense Spam-/Quality-Signale.
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://googleads.g.doubleclick.net https://fundingchoicesmessages.google.com https://ep2.adtrafficquality.google",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' https: data:",
      "font-src 'self'",
      // *.google-analytics.com ist Pflicht: GA4 routet EU-Traffic über
      // region1.google-analytics.com — nur www. whitelisten = Datenverlust.
      "connect-src 'self' https://*.google-analytics.com https://stats.g.doubleclick.net https://www.googletagmanager.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.googleadservices.com https://fundingchoicesmessages.google.com https://ep1.adtrafficquality.google https://csi.gstatic.com https://data.ecb.europa.eu",
      // frame-src deckt Ad-iframes (pagead2 und tpc rendern beide in iframes).
      "frame-src https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://googleads.g.doubleclick.net https://www.google.com https://fundingchoicesmessages.google.com https://ep2.adtrafficquality.google",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      'upgrade-insecure-requests',
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  async redirects() {
    // 301s für gelöschte Duplikat-Artikel (Generator-Dedup-Vorfall, bereinigt
    // 11.06.2026): jeweils auf den älteren, weiter bestehenden Artikel.
    return [
      {
        source: '/ratgeber/aenderungen-steuern-rente-buergergeld-2026',
        destination: '/ratgeber/steuer-und-sozialaenderungen-2026',
        permanent: true,
      },
      {
        source: '/ratgeber/aenderungen-2026-steuern-rente-buergergeld',
        destination: '/ratgeber/steuer-und-sozialaenderungen-2026',
        permanent: true,
      },
      {
        source: '/ratgeber/grunderwerbsteuer-bayern-guenstiger',
        destination: '/ratgeber/grunderwerbsteuer-2026-bayern-guenstiger',
        permanent: true,
      },
      {
        source: '/ratgeber/steuererklaerung-2026-fristen-2',
        destination: '/ratgeber/steuererklaerung-2026-fristen',
        permanent: true,
      },
      {
        source: '/ratgeber/halbjahres-finanzcheck-kennzahlen-juli-pruefen-2',
        destination: '/ratgeber/halbjahres-finanzcheck-kennzahlen-juli-pruefen',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        // Cache static assets aggressively
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Cache fonts
        source: '/(.*)\\.woff2',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
