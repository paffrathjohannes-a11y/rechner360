import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { ABFINDUNGS_PAGES } from '@/data/programmatic/abfindungs-pages';
import { ProgrammaticAbfindungsForm } from './programmatic-abfindungs-form';

export const dynamicParams = false;
export function generateStaticParams() { return ABFINDUNGS_PAGES.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = ABFINDUNGS_PAGES.find((p) => p.slug === slug);
    if (!page) return {};
    return { robots: { index: false, follow: true }, title: page.metaTitle, description: page.metaDescription, alternates: { canonical: `/abfindungsrechner` } };
  });
}

export default async function AbfindungsSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = ABFINDUNGS_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Abfindungsrechner', href: '/abfindungsrechner' }, { label: page.title }]} />
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">{page.h1}</h1>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name={page.metaTitle} url={`/abfindungsrechner/${page.slug}`} description={page.metaDescription} />
      <ProgrammaticAbfindungsForm abfindung={page.abfindung} />
      <RelatedCalculators currentSlug="abfindungsrechner" className="mt-8" />
    </div>
  );
}
