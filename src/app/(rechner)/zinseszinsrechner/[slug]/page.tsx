import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { ZINSESZINS_PAGES } from '@/data/programmatic/zinseszins-pages';
import { ProgrammaticZinseszinsForm } from './programmatic-zinseszins-form';

export const dynamicParams = false;
export function generateStaticParams() { return ZINSESZINS_PAGES.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = ZINSESZINS_PAGES.find((p) => p.slug === slug);
    if (!page) return {};
    return { title: page.metaTitle, description: page.metaDescription, alternates: { canonical: `/zinseszinsrechner/${page.slug}` } };
  });
}

export default async function ZinseszinsSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = ZINSESZINS_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Zinseszinsrechner', href: '/zinseszinsrechner' }, { label: page.title }]} />
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">{page.h1}</h1>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name={page.metaTitle} url={`/zinseszinsrechner/${page.slug}`} description={page.metaDescription} />
      <ProgrammaticZinseszinsForm sparrate={page.sparrate} />
      <RelatedCalculators currentSlug="zinseszinsrechner" className="mt-8" />
    </div>
  );
}
