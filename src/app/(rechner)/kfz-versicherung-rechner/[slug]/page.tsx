import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { KFZ_PAGES } from '@/data/programmatic/kfz-pages';
import { KfzForm } from '../kfz-form';
import type { Fahrzeugtyp } from '@/lib/calculator/insurance/kfz';

export const dynamicParams = false;

export function generateStaticParams() {
  return KFZ_PAGES.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const page = KFZ_PAGES.find((p) => p.slug === slug);
    if (!page) return {};
    return { title: page.metaTitle, description: page.metaDescription, alternates: { canonical: `/kfz-versicherung-rechner/${page.slug}` } };
  });
}

export default async function KfzSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = KFZ_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Kfz-Versicherung Rechner', href: '/kfz-versicherung-rechner' }, { label: page.title }]} />
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text">{page.h1}</h1>
        <p className="text-text-secondary leading-relaxed">{page.intro}</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name={page.metaTitle} url={`/kfz-versicherung-rechner/${page.slug}`} description={page.metaDescription} />
      <KfzForm initialFahrzeugtyp={(page.prefillValues.fahrzeugtyp as Fahrzeugtyp) || 'kompakt'} initialAlter={(page.prefillValues.alter as number) || 35} />
      {page.faqs.length > 0 && <FAQSection faqs={page.faqs} className="mt-8" />}
      <RelatedCalculators currentSlug="kfz-versicherung-rechner" className="mt-8" />
    </div>
  );
}
