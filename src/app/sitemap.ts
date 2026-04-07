import type { MetadataRoute } from 'next';
import { RECHNER } from '@/lib/utils/constants';
import { BRUTTO_NETTO_PAGES } from '@/data/programmatic/brutto-netto-pages';
import { GEHALTS_PAGES } from '@/data/programmatic/gehalts-pages';
import { BMI_PAGES } from '@/data/programmatic/bmi-pages';
import { KREDIT_PAGES } from '@/data/programmatic/kredit-pages';
import { TILGUNGS_PAGES } from '@/data/programmatic/tilgungs-pages';
import { ELTERNGELD_PAGES } from '@/data/programmatic/elterngeld-pages';
import { NEBENKOSTEN_PAGES } from '@/data/programmatic/nebenkosten-pages';
import { KALORIEN_PAGES } from '@/data/programmatic/kalorien-pages';

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
  ];

  const programmaticPages: MetadataRoute.Sitemap = [
    ...BRUTTO_NETTO_PAGES.map((p) => ({
      url: `${SITE_URL}/brutto-netto-rechner/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...BMI_PAGES.map((p) => ({
      url: `${SITE_URL}/bmi-rechner/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...GEHALTS_PAGES.map((p) => ({
      url: `${SITE_URL}/gehaltsrechner/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
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
    ...ELTERNGELD_PAGES.map((p) => ({
      url: `${SITE_URL}/elterngeld-rechner/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...NEBENKOSTEN_PAGES.map((p) => ({
      url: `${SITE_URL}/nebenkostenrechner/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...KALORIEN_PAGES.map((p) => ({
      url: `${SITE_URL}/kalorienrechner/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  return [...staticPages, ...programmaticPages];
}
