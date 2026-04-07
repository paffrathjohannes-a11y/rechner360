import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/public/'],
      },
      {
        // Aggressive bots: block to save server resources
        userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot'],
        disallow: '/',
      },
    ],
    sitemap: 'https://www.rechner360.de/sitemap.xml',
    host: 'https://www.rechner360.de',
  };
}
