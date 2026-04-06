import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { TILGUNGS_PAGES } from '@/data/programmatic/tilgungs-pages';
import { ProgrammaticTilgungsForm } from './programmatic-tilgungs-form';

export const dynamicParams = false;

export function generateStaticParams() {
  return TILGUNGS_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = TILGUNGS_PAGES.find((p) => p.slug === slug);
    if (!page) return {};
    return {
      title: page.metaTitle,
      description: page.metaDescription,
      alternates: { canonical: `/tilgungsrechner/${page.slug}` },
    };
  });
}

export default async function TilgungsSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = TILGUNGS_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Tilgungsrechner', href: '/tilgungsrechner' }, { label: page.title }]} />
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">{page.h1}</h1>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name={page.metaTitle} url={`/tilgungsrechner/${page.slug}`} description={page.metaDescription} />
      <ProgrammaticTilgungsForm betrag={page.betrag} tilgung={page.tilgung} />
      <RelatedCalculators currentSlug="tilgungsrechner" className="mt-8" />
    </div>
  );
}
