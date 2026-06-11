import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // WICHTIG: `/_next/` darf NICHT geblockt werden — dort liegen alle
        // CSS/JS/Font-Assets. Blockt man sie, rendert Googlebot die Seiten
        // ohne Styles und ohne die client-seitigen Rechner-Formulare.
        // `/api/` ist präventiv für spätere Routes.
        disallow: ['/api/'],
      },
      {
        // Aggressive Bots blocken — schützt Crawl-Budget und Server-Ressourcen
        userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot'],
        disallow: '/',
      },
    ],
    sitemap: 'https://www.rechner360.de/sitemap.xml',
  };
}
