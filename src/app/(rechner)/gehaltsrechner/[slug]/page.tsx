import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { GEHALTS_PAGES } from '@/data/programmatic/gehalts-pages';
import { ProgrammaticGehaltsForm } from './programmatic-gehalts-form';

export const dynamicParams = false;

export function generateStaticParams() {
  return GEHALTS_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = GEHALTS_PAGES.find((p) => p.slug === slug);
    if (!page) return {};
    return {
      robots: { index: false, follow: true },
      title: page.metaTitle,
      description: page.metaDescription,
      alternates: { canonical: `/gehaltsrechner/${page.slug}` },
    };
  });
}

export default async function GehaltsSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = GEHALTS_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Gehaltsrechner', href: '/gehaltsrechner' }, { label: page.title }]} />
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">{page.h1}</h1>
        <p className="text-text-secondary">Vergleich aller Steuerklassen bei {page.brutto.toLocaleString('de-DE')} € brutto — aktuell für 2026.</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name={page.metaTitle} url={`/gehaltsrechner/${page.slug}`} description={page.metaDescription} />
      <ProgrammaticGehaltsForm brutto={page.brutto} />
      <RelatedCalculators currentSlug="gehaltsrechner" className="mt-8" />
    </div>
  );
}
