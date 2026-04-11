import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { PROZENT_PAGES } from '@/data/programmatic/prozent-pages';
import { ProgrammaticProzentForm } from './programmatic-prozent-form';

export const dynamicParams = false;
export function generateStaticParams() { return PROZENT_PAGES.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = PROZENT_PAGES.find((p) => p.slug === slug);
    if (!page) return {};
    return { robots: { index: false, follow: true }, title: page.metaTitle, description: page.metaDescription, alternates: { canonical: `/prozentrechner/${page.slug}` } };
  });
}

export default async function ProzentSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = PROZENT_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Prozentrechner', href: '/prozentrechner' }, { label: page.title }]} />
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">{page.h1}</h1>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name={page.metaTitle} url={`/prozentrechner/${page.slug}`} description={page.metaDescription} />
      <ProgrammaticProzentForm prozent={page.prozent} grundwert={page.grundwert} />
      <RelatedCalculators currentSlug="prozentrechner" className="mt-8" />
    </div>
  );
}
