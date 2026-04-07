import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { UNTERHALT_PAGES } from '@/data/programmatic/unterhalt-pages';
import { ProgrammaticUnterhaltForm } from './programmatic-unterhalt-form';

export const dynamicParams = false;

export function generateStaticParams() {
  return UNTERHALT_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = UNTERHALT_PAGES.find((p) => p.slug === slug);
    if (!page) return {};
    return { title: page.metaTitle, description: page.metaDescription, alternates: { canonical: `/unterhalt-rechner/${page.slug}` } };
  });
}

export default async function UnterhaltSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = UNTERHALT_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Unterhalt Rechner', href: '/unterhalt-rechner' }, { label: page.title }]} />
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">{page.h1}</h1>
        <p className="text-text-secondary">Berechnung nach Düsseldorfer Tabelle 2025 mit Kindergeld-Anrechnung.</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name={page.metaTitle} url={`/unterhalt-rechner/${page.slug}`} description={page.metaDescription} />
      <ProgrammaticUnterhaltForm netto={page.netto} />
      <RelatedCalculators currentSlug="unterhalt-rechner" className="mt-8" />
    </div>
  );
}
