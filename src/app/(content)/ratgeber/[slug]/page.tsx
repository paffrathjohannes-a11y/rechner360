import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { NativeAdSlot } from '@/components/ads/native-ad-slot';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';
import { RATGEBER_ARTIKEL } from '@/data/content/ratgeber';
import { sanitizeArticleHtml } from '@/lib/content/sanitize';
import '@/app/(legal)/legal.css';

// Welche Affiliate-Offers passen zu welchem Ratgeber-Artikel?
// Wir mappen über `relatedRechner` auf die thematische WISO-Platzierung.
const STEUER_RECHNER = new Set([
  'brutto-netto-rechner',
  'gehaltsrechner',
  'gehaltserhoehung-rechner',
  'abfindungsrechner',
  'einkommensteuer-rechner',
  'mwst-rechner',
  'erbschaftsteuer-rechner',
  'grundsteuer-rechner',
  'elterngeld-rechner',
]);
const VORSORGE_RECHNER = new Set([
  'rentenrechner',
  'zinseszinsrechner',
  'inflationsrechner',
  'pkv-rechner',
  'bu-rechner',
]);
function getRatgeberAffiliateKey(relatedRechner: string): 'ratgeber-steuer' | 'ratgeber-altersvorsorge' | null {
  if (STEUER_RECHNER.has(relatedRechner)) return 'ratgeber-steuer';
  if (VORSORGE_RECHNER.has(relatedRechner)) return 'ratgeber-altersvorsorge';
  return null;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return RATGEBER_ARTIKEL.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const artikel = RATGEBER_ARTIKEL.find((a) => a.slug === slug);
    if (!artikel) return {};
    return {
      title: artikel.metaTitle,
      description: artikel.metaDescription,
      alternates: { canonical: `/ratgeber/${artikel.slug}` },
      openGraph: {
        title: artikel.metaTitle,
        description: artikel.metaDescription,
        url: `/ratgeber/${artikel.slug}`,
        type: 'article',
        publishedTime: artikel.publishDate,
        authors: ['rechner360.de'],
      },
    };
  });
}

export default async function RatgeberArtikelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artikel = RATGEBER_ARTIKEL.find((a) => a.slug === slug);
  if (!artikel) notFound();

  // Optional gepflegtes `lastModified`-Feld aus den Datendateien nutzen,
  // sonst auf das Publish-Datum zurückfallen. Ein eigenes `dateModified`
  // liefert Google ehrliche Freshness-Signale, wenn der Artikel aktualisiert wurde.
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: artikel.title,
    description: artikel.metaDescription,
    // `image` ist für das Article-Rich-Result Pflicht. Das Route-Segment-OG-Image
    // dient als Fallback, bis pro Artikel ein eigenes Hero-Bild existiert.
    image: [`https://www.rechner360.de/opengraph-image`],
    datePublished: artikel.publishDate,
    dateModified: (artikel as { lastModified?: string }).lastModified ?? artikel.publishDate,
    author: { '@type': 'Organization', name: 'rechner360.de', url: 'https://www.rechner360.de' },
    publisher: {
      '@type': 'Organization',
      name: 'rechner360.de',
      url: 'https://www.rechner360.de',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.rechner360.de/icon.png',
      },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.rechner360.de/ratgeber/${artikel.slug}` },
    inLanguage: 'de-DE',
  };

  return (
    <div className="space-y-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <Breadcrumbs items={[{ label: 'Ratgeber', href: '/ratgeber' }, { label: artikel.title }]} />

      <article className="legal-content">
        <h1>{artikel.title}</h1>
        <p className="text-text-muted text-sm mb-6">
          {/* Semantisches <time> macht das Datum für Crawler und Screenreader maschinenlesbar */}
          <time dateTime={artikel.publishDate}>
            {new Date(artikel.publishDate).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
        </p>
        <p className="text-lg leading-relaxed mb-8">{artikel.intro}</p>

        {/* Ad placement — after intro, before article sections */}
        <NativeAdSlot format="horizontal" className="my-8" />

        {artikel.sections.map((section, i) => (
          <div key={i}>
            <h2>{section.title}</h2>
            {/* sanitize gegen XSS aus AI- oder Redaktions-Content. Whitelist: strong/em/u/br. */}
            <div
              dangerouslySetInnerHTML={{
                __html: `<p>${sanitizeArticleHtml(section.content)}</p>`,
              }}
            />
          </div>
        ))}

        <div className="mt-8 p-4 rounded-xl border border-primary-200 dark:border-primary-800 bg-primary-50/30 dark:bg-primary-900/10">
          <p className="text-sm text-text-secondary">
            Passender Rechner:{' '}
            <Link href={`/${artikel.relatedRechner}`} className="font-medium text-primary-600 hover:underline">
              Jetzt berechnen →
            </Link>
          </p>
        </div>
      </article>

      {/* Themen-basiertes Affiliate-Angebot (WISO) */}
      {(() => {
        const key = getRatgeberAffiliateKey(artikel.relatedRechner);
        if (!key) return null;
        const entry = affiliateOffersBySlug[key];
        return (
          <AffiliateBox
            headline={entry.headline}
            offers={entry.offers}
            className="mt-8"
          />
        );
      })()}

      <RelatedCalculators currentSlug={artikel.relatedRechner} className="mt-8" />
    </div>
  );
}
