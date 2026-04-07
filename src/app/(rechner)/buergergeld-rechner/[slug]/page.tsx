import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { BUERGERGELD_PAGES } from '@/data/programmatic/buergergeld-pages';
import { ProgrammaticBuergergeldForm } from './programmatic-buergergeld-form';

export const dynamicParams = false;
export function generateStaticParams() { return BUERGERGELD_PAGES.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = BUERGERGELD_PAGES.find((p) => p.slug === slug);
    if (!page) return {};
    return { title: page.metaTitle, description: page.metaDescription, alternates: { canonical: `/buergergeld-rechner/${page.slug}` } };
  });
}

export default async function BuergergeldSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = BUERGERGELD_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Bürgergeld Rechner', href: '/buergergeld-rechner' }, { label: page.title }]} />
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">{page.h1}</h1>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name={page.metaTitle} url={`/buergergeld-rechner/${page.slug}`} description={page.metaDescription} />
      <ProgrammaticBuergergeldForm typ={page.typ} />
      <RelatedCalculators currentSlug="buergergeld-rechner" className="mt-8" />
    </div>
  );
}
