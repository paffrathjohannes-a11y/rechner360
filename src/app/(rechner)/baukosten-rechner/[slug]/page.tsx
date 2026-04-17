import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { BAUKOSTEN_PAGES } from '@/data/programmatic/baukosten-pages';
import { ProgrammaticBaukostenForm } from './programmatic-baukosten-form';

export const dynamicParams = false;
export function generateStaticParams() { return BAUKOSTEN_PAGES.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = BAUKOSTEN_PAGES.find((p) => p.slug === slug);
    if (!page) return {};
    return { robots: { index: false, follow: true }, title: page.metaTitle, description: page.metaDescription, alternates: { canonical: `/baukosten-rechner` } };
  });
}

export default async function BaukostenSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = BAUKOSTEN_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Baukosten Rechner', href: '/baukosten-rechner' }, { label: page.title }]} />
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">{page.h1}</h1>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name={page.metaTitle} url={`/baukosten-rechner/${page.slug}`} description={page.metaDescription} />
      <ProgrammaticBaukostenForm wohnflaeche={page.wohnflaeche} />
      <RelatedCalculators currentSlug="baukosten-rechner" className="mt-8" />
    </div>
  );
}
