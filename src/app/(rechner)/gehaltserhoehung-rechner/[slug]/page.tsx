import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { GEHALTSERHOEHUNG_PAGES } from '@/data/programmatic/gehaltserhoehung-pages';
import { ProgrammaticGehaltserhoehungForm } from './programmatic-gehaltserhoehung-form';

export const dynamicParams = false;
export function generateStaticParams() { return GEHALTSERHOEHUNG_PAGES.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = GEHALTSERHOEHUNG_PAGES.find((p) => p.slug === slug);
    if (!page) return {};
    return { robots: { index: false, follow: true }, title: page.metaTitle, description: page.metaDescription, alternates: { canonical: `/gehaltserhoehung-rechner/${page.slug}` } };
  });
}

export default async function GehaltserhoehungSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = GEHALTSERHOEHUNG_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Gehaltserhöhung Rechner', href: '/gehaltserhoehung-rechner' }, { label: page.title }]} />
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">{page.h1}</h1>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name={page.metaTitle} url={`/gehaltserhoehung-rechner/${page.slug}`} description={page.metaDescription} />
      <ProgrammaticGehaltserhoehungForm erhoehung={page.erhoehung} />
      <RelatedCalculators currentSlug="gehaltserhoehung-rechner" className="mt-8" />
    </div>
  );
}
