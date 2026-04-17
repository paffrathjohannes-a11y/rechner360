import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { PFAENDUNGS_PAGES } from '@/data/programmatic/pfaendungs-pages';
import { ProgrammaticPfaendungsForm } from './programmatic-pfaendungs-form';

export const dynamicParams = false;
export function generateStaticParams() { return PFAENDUNGS_PAGES.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = PFAENDUNGS_PAGES.find((p) => p.slug === slug);
    if (!page) return {};
    return { robots: { index: false, follow: true }, title: page.metaTitle, description: page.metaDescription, alternates: { canonical: `/pfaendungsrechner` } };
  });
}

export default async function PfaendungsSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = PFAENDUNGS_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Pfändungsrechner', href: '/pfaendungsrechner' }, { label: page.title }]} />
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">{page.h1}</h1>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name={page.metaTitle} url={`/pfaendungsrechner/${page.slug}`} description={page.metaDescription} />
      <ProgrammaticPfaendungsForm netto={page.netto} />
      <RelatedCalculators currentSlug="pfaendungsrechner" className="mt-8" />
    </div>
  );
}
