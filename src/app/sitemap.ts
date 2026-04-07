import type { MetadataRoute } from 'next';
import { RECHNER } from '@/lib/utils/constants';
import { KREDIT_PAGES } from '@/data/programmatic/kredit-pages';
import { TILGUNGS_PAGES } from '@/data/programmatic/tilgungs-pages';
import { ZINSESZINS_PAGES } from '@/data/programmatic/zinseszins-pages';
import { PKV_PAGES } from '@/data/programmatic/pkv-pages';
import { RATGEBER_ARTIKEL } from '@/data/content/ratgeber';

const SITE_URL = 'https://rechner360.de';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    ...RECHNER.map((r) => ({
      url: `${SITE_URL}/${r.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    { url: `${SITE_URL}/impressum`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/datenschutz`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/ueber-uns`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/ratgeber`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    ...RATGEBER_ARTIKEL.map((a) => ({
      url: `${SITE_URL}/ratgeber/${a.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  // Nur programmatische Seiten mit unique Content (Intro + FAQs) in die Sitemap
  const programmaticPages: MetadataRoute.Sitemap = [
    ...KREDIT_PAGES.map((p) => ({
      url: `${SITE_URL}/kreditrechner/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...TILGUNGS_PAGES.map((p) => ({
      url: `${SITE_URL}/tilgungsrechner/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...ZINSESZINS_PAGES.map((p) => ({
      url: `${SITE_URL}/zinseszinsrechner/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...PKV_PAGES.map((p) => ({
      url: `${SITE_URL}/pkv-rechner/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return [...staticPages, ...programmaticPages];
}
