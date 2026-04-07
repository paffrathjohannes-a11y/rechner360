import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { GRUNDSTEUER_PAGES } from '@/data/programmatic/grundsteuer-pages';
import { ProgrammaticGrundsteuerForm } from './programmatic-grundsteuer-form';

export const dynamicParams = false;
export function generateStaticParams() { return GRUNDSTEUER_PAGES.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = GRUNDSTEUER_PAGES.find((p) => p.slug === slug);
    if (!page) return {};
    return { title: page.metaTitle, description: page.metaDescription, alternates: { canonical: `/grundsteuer-rechner/${page.slug}` } };
  });
}

export default async function GrundsteuerSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = GRUNDSTEUER_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Grundsteuer Rechner', href: '/grundsteuer-rechner' }, { label: page.title }]} />
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">{page.h1}</h1>
        <p className="text-text-secondary">Neue Grundsteuer nach der Reform 2025 für {page.bundeslandName}.</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name={page.metaTitle} url={`/grundsteuer-rechner/${page.slug}`} description={page.metaDescription} />
      <ProgrammaticGrundsteuerForm bundesland={page.bundesland} />
      <RelatedCalculators currentSlug="grundsteuer-rechner" className="mt-8" />
    </div>
  );
}
