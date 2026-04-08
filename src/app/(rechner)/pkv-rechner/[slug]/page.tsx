import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { PKV_PAGES } from '@/data/programmatic/pkv-pages';
import { ProgrammaticPkvForm } from './programmatic-pkv-form';
import type { Berufsgruppe } from '@/lib/calculator/insurance/pkv';

export const dynamicParams = false;

export function generateStaticParams() {
  return PKV_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = PKV_PAGES.find((p) => p.slug === slug);
    if (!page) return {};
    return {
      title: page.metaTitle,
      description: page.metaDescription,
      alternates: { canonical: `/pkv-rechner/${page.slug}` },
    };
  });
}

export default async function PkvSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = PKV_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'PKV Rechner', href: '/pkv-rechner' }, { label: page.title }]} />
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">{page.h1}</h1>
        <p className="text-text-secondary">{page.intro}</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name={page.metaTitle} url={`/pkv-rechner/${page.slug}`} description={page.metaDescription} />
      <ProgrammaticPkvForm
        alter={page.prefillValues.alter as number}
        brutto={page.prefillValues.bruttoeinkommen as number}
        berufsgruppe={page.prefillValues.berufsgruppe as Berufsgruppe}
      />
      {page.faqs.length > 0 && <FAQSection faqs={page.faqs} className="mt-8" />}
      <RelatedCalculators currentSlug="pkv-rechner" className="mt-8" />
    </div>
  );
}
