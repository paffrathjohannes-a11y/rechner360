import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { NativeAdSlot } from '@/components/ads/native-ad-slot';
import { KREDIT_PAGES } from '@/data/programmatic/kredit-pages';
import { ProgrammaticKreditForm } from './programmatic-kredit-form';

export const dynamicParams = false;

export function generateStaticParams() {
  return KREDIT_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = KREDIT_PAGES.find((p) => p.slug === slug);
    if (!page) return {};
    return {
      title: page.metaTitle,
      description: page.metaDescription,
      alternates: { canonical: `/kreditrechner/${page.slug}` },
    };
  });
}

export default async function KreditSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = KREDIT_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Kreditrechner', href: '/kreditrechner' }, { label: page.title }]} />
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">{page.h1}</h1>
        <p className="text-text-secondary leading-relaxed">{page.intro}</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name={page.metaTitle} url={`/kreditrechner/${page.slug}`} description={page.metaDescription} />
      <ProgrammaticKreditForm betrag={page.betrag} zinssatz={page.zinssatz} />
      <NativeAdSlot format="horizontal" className="mt-10" />
      {page.faqs.length > 0 && <FAQSection faqs={page.faqs} className="mt-8" />}
      <RelatedCalculators currentSlug="kreditrechner" className="mt-8" />
    </div>
  );
}
