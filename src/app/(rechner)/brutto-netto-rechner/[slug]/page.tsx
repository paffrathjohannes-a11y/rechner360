import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { BRUTTO_NETTO_PAGES } from '@/data/programmatic/brutto-netto-pages';
import { ProgrammaticBNRForm } from './programmatic-bnr-form';

export const dynamicParams = false;

export function generateStaticParams() {
  return BRUTTO_NETTO_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = BRUTTO_NETTO_PAGES.find((p) => p.slug === slug);
    if (!page) return {};

    // Jede Seite hat einen unique Intro + FAQs → indexierbar.
    // Canonical zeigt auf SICH SELBST, damit Google die Seite als
    // vollwertige URL behandelt (kein Content-Consolidation mehr).
    return {
      robots: page.indexable
        ? { index: true, follow: true }
        : { index: false, follow: true },
      title: page.metaTitle,
      description: page.metaDescription,
      alternates: {
        canonical: `/brutto-netto-rechner/${page.slug}`,
      },
      openGraph: {
        title: page.metaTitle,
        description: page.metaDescription,
        url: `/brutto-netto-rechner/${page.slug}`,
      },
    };
  });
}

export default async function BruttoNettoSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = BRUTTO_NETTO_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  // Internal Linking: jeweils zwei Nachbarn in derselben Steuerklasse
  const sameSk = BRUTTO_NETTO_PAGES
    .filter((p) => p.steuerklasse === page.steuerklasse && p.slug !== page.slug)
    .sort((a, b) => a.brutto - b.brutto);
  const sameSkIdxAfter = sameSk.findIndex((p) => p.brutto > page.brutto);
  const prevPage = sameSkIdxAfter > 0 ? sameSk[sameSkIdxAfter - 1] : undefined;
  const nextPage = sameSkIdxAfter >= 0 ? sameSk[sameSkIdxAfter] : undefined;

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Brutto Netto Rechner', href: '/brutto-netto-rechner' },
          { label: page.title },
        ]}
      />

      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">
          {page.h1}
        </h1>
        <p className="text-text-secondary">
          Berechnung für 2026 nach den offiziellen Steuerformeln — alle Steuern und Sozialabgaben auf einen Blick.
        </p>
        <TrustSignals compact className="mt-3" />
      </div>

      <WebApplicationJsonLd
        name={page.metaTitle}
        url={`/brutto-netto-rechner/${page.slug}`}
        description={page.metaDescription}
      />

      {/* Unique, kontextueller Einleitungstext — hebt die Seite aus Thin-Content heraus */}
      <section className="rounded-xl border border-border bg-surface-raised/50 p-5 sm:p-6">
        <p className="text-text-secondary leading-relaxed">{page.intro}</p>
      </section>

      <ProgrammaticBNRForm brutto={page.brutto} steuerklasse={page.steuerklasse} />

      {/* Nachbar-Navigation innerhalb derselben Steuerklasse — verteilt Crawl-Tiefe */}
      {(prevPage || nextPage) && (
        <nav aria-label="Weitere Beträge" className="flex flex-wrap gap-2 mt-6">
          {prevPage && (
            <a
              href={`/brutto-netto-rechner/${prevPage.slug}`}
              className="text-sm text-primary-600 hover:underline"
            >
              ← {prevPage.brutto.toLocaleString('de-DE')} € brutto
            </a>
          )}
          {nextPage && (
            <a
              href={`/brutto-netto-rechner/${nextPage.slug}`}
              className="text-sm text-primary-600 hover:underline ml-auto"
            >
              {nextPage.brutto.toLocaleString('de-DE')} € brutto →
            </a>
          )}
        </nav>
      )}

      {/* FAQPage-Schema wird in FAQSection selbst als JSON-LD ausgegeben */}
      <FAQSection faqs={page.faqs} className="mt-8" />

      <RelatedCalculators currentSlug="brutto-netto-rechner" className="mt-8" />
    </div>
  );
}
