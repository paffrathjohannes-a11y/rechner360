import type { MetadataRoute } from 'next';
import { RECHNER } from '@/lib/utils/constants';
import { KREDIT_PAGES } from '@/data/programmatic/kredit-pages';
import { TILGUNGS_PAGES } from '@/data/programmatic/tilgungs-pages';
import { ZINSESZINS_PAGES } from '@/data/programmatic/zinseszins-pages';
import { PKV_PAGES } from '@/data/programmatic/pkv-pages';
import { KFZ_PAGES } from '@/data/programmatic/kfz-pages';
import { BU_PAGES } from '@/data/programmatic/bu-pages';
import { BRUTTO_NETTO_PAGES } from '@/data/programmatic/brutto-netto-pages';
import { RATGEBER_ARTIKEL } from '@/data/content/ratgeber';

const SITE_URL = 'https://www.rechner360.de';

// Statische lastModified-Werte verhindern, dass bei jedem Deploy alle URLs
// als "neu geändert" beim Crawler ankommen (GSC: Crawl-Budget-Verschwendung).
// Bei echten Content-Änderungen einen dieser Werte anpassen.
const RECHNER_LAST_MODIFIED = '2026-04-17';
const PROGRAMMATIC_LAST_MODIFIED = '2026-04-07';
const HOME_LAST_MODIFIED = '2026-04-17';
const UEBER_UNS_LAST_MODIFIED = '2026-04-05';

export default function sitemap(): MetadataRoute.Sitemap {
  // Impressum und Datenschutz stehen auf `robots: noindex` — sie gehören
  // daher NICHT in die Sitemap (widersprüchliches Signal an Google).
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: HOME_LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    ...RECHNER.map((r) => ({
      url: `${SITE_URL}/${r.slug}`,
      lastModified: RECHNER_LAST_MODIFIED,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    {
      url: `${SITE_URL}/ueber-uns`,
      lastModified: UEBER_UNS_LAST_MODIFIED,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/ratgeber`,
      lastModified: RECHNER_LAST_MODIFIED,
      changeFrequency: 'weekly',
      // Hub-Seite mindestens so prominent wie ihre Unterseiten (0.8)
      priority: 0.8,
    },
    ...RATGEBER_ARTIKEL.map((a) => ({
      url: `${SITE_URL}/ratgeber/${a.slug}`,
      // Echtes Publish-Datum aus dem Content → ehrliches Freshness-Signal
      lastModified: a.publishDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];

  // Nur programmatische Seiten mit unique Content (Intro + FAQs) in die Sitemap
  const programmaticPages: MetadataRoute.Sitemap = [
    ...KREDIT_PAGES.map((p) => ({
      url: `${SITE_URL}/kreditrechner/${p.slug}`,
      lastModified: PROGRAMMATIC_LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...TILGUNGS_PAGES.map((p) => ({
      url: `${SITE_URL}/tilgungsrechner/${p.slug}`,
      lastModified: PROGRAMMATIC_LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...ZINSESZINS_PAGES.map((p) => ({
      url: `${SITE_URL}/zinseszinsrechner/${p.slug}`,
      lastModified: PROGRAMMATIC_LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...PKV_PAGES.map((p) => ({
      url: `${SITE_URL}/pkv-rechner/${p.slug}`,
      lastModified: PROGRAMMATIC_LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...KFZ_PAGES.map((p) => ({
      url: `${SITE_URL}/kfz-versicherung-rechner/${p.slug}`,
      lastModified: PROGRAMMATIC_LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...BU_PAGES.map((p) => ({
      url: `${SITE_URL}/bu-rechner/${p.slug}`,
      lastModified: PROGRAMMATIC_LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Brutto-Netto-Varianten: unique Intro + FAQs pro Seite → indexierbar.
    // Nur Seiten mit `indexable: true` werden aufgenommen.
    ...BRUTTO_NETTO_PAGES
      .filter((p) => p.indexable)
      .map((p) => ({
        url: `${SITE_URL}/brutto-netto-rechner/${p.slug}`,
        lastModified: PROGRAMMATIC_LAST_MODIFIED,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      })),
  ];

  return [...staticPages, ...programmaticPages];
}
