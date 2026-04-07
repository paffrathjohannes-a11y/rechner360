import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { MWST_PAGES } from '@/data/programmatic/mwst-pages';
import { ProgrammaticMwstForm } from './programmatic-mwst-form';

export const dynamicParams = false;
export function generateStaticParams() { return MWST_PAGES.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = MWST_PAGES.find((p) => p.slug === slug);
    if (!page) return {};
    return { title: page.metaTitle, description: page.metaDescription, alternates: { canonical: `/mwst-rechner/${page.slug}` } };
  });
}

export default async function MwstSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = MWST_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'MwSt Rechner', href: '/mwst-rechner' }, { label: page.title }]} />
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">{page.h1}</h1>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name={page.metaTitle} url={`/mwst-rechner/${page.slug}`} description={page.metaDescription} />
      <ProgrammaticMwstForm betrag={page.betrag} />
      <RelatedCalculators currentSlug="mwst-rechner" className="mt-8" />
    </div>
  );
}
