import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { ELTERNGELD_PAGES } from '@/data/programmatic/elterngeld-pages';
import { ProgrammaticElterngeldForm } from './programmatic-elterngeld-form';

export const dynamicParams = false;

export function generateStaticParams() {
  return ELTERNGELD_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = ELTERNGELD_PAGES.find((p) => p.slug === slug);
    if (!page) return {};
    return { title: page.metaTitle, description: page.metaDescription, alternates: { canonical: `/elterngeld-rechner/${page.slug}` } };
  });
}

export default async function ElterngeldSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = ELTERNGELD_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Elterngeld Rechner', href: '/elterngeld-rechner' }, { label: page.title }]} />
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">{page.h1}</h1>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name={page.metaTitle} url={`/elterngeld-rechner/${page.slug}`} description={page.metaDescription} />
      <ProgrammaticElterngeldForm netto={page.netto} />
      <RelatedCalculators currentSlug="elterngeld-rechner" className="mt-8" />
    </div>
  );
}
