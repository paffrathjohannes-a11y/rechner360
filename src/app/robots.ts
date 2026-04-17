import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Next.js serviert den public-Ordner direkt unter `/` — eine Regel
        // für `/public/` würde nichts treffen. `/_next/` hält interne Assets
        // vom Crawl fern, `/api/` ist präventiv für spätere Routes.
        disallow: ['/api/', '/_next/'],
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
