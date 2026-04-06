import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
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

    return {
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

  // Find adjacent pages for internal linking
  const sameSk = BRUTTO_NETTO_PAGES.filter(
    (p) => p.steuerklasse === page.steuerklasse && p.slug !== page.slug,
  );
  const idx = sameSk.findIndex(
    (p) => p.brutto > page.brutto,
  );
  const prevPage = sameSk[Math.max(0, idx - 2)];
  const nextPage = sameSk[idx];

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
          Berechnung f&uuml;r 2026 gem&auml;&szlig; BMF-Programmablaufplan &mdash; alle Steuern und Sozialabgaben auf einen Blick.
        </p>
        <TrustSignals compact className="mt-3" />
      </div>

      <WebApplicationJsonLd
        name={page.metaTitle}
        url={`/brutto-netto-rechner/${page.slug}`}
        description={page.metaDescription}
      />

      <ProgrammaticBNRForm brutto={page.brutto} steuerklasse={page.steuerklasse} />

      {/* Internal linking to adjacent values */}
      <div className="flex flex-wrap gap-2 mt-6">
        {prevPage && (
          <a
            href={`/brutto-netto-rechner/${prevPage.slug}`}
            className="text-sm text-primary-600 hover:underline"
          >
            &larr; {prevPage.brutto.toLocaleString('de-DE')} &euro; brutto
          </a>
        )}
        {nextPage && (
          <a
            href={`/brutto-netto-rechner/${nextPage.slug}`}
            className="text-sm text-primary-600 hover:underline ml-auto"
          >
            {nextPage.brutto.toLocaleString('de-DE')} &euro; brutto &rarr;
          </a>
        )}
      </div>

      <RelatedCalculators currentSlug="brutto-netto-rechner" className="mt-8" />
    </div>
  );
}
