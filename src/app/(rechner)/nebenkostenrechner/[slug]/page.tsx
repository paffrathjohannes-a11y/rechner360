import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { NEBENKOSTEN_PAGES } from '@/data/programmatic/nebenkosten-pages';
import { ProgrammaticNebenkostenForm } from './programmatic-nebenkosten-form';

export const dynamicParams = false;

export function generateStaticParams() {
  return NEBENKOSTEN_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = NEBENKOSTEN_PAGES.find((p) => p.slug === slug);
    if (!page) return {};
    return { title: page.metaTitle, description: page.metaDescription, alternates: { canonical: `/nebenkostenrechner/${page.slug}` } };
  });
}

export default async function NebenkostenSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = NEBENKOSTEN_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Nebenkostenrechner', href: '/nebenkostenrechner' }, { label: page.title }]} />
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">{page.h1}</h1>
        <p className="text-text-secondary">Berechnen Sie die Kaufnebenkosten für Immobilien in {page.bundeslandName}.</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name={page.metaTitle} url={`/nebenkostenrechner/${page.slug}`} description={page.metaDescription} />
      <ProgrammaticNebenkostenForm bundesland={page.bundesland} />
      <RelatedCalculators currentSlug="nebenkostenrechner" className="mt-8" />
    </div>
  );
}
