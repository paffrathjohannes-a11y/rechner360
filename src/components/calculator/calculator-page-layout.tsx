import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { getCategoryForRechner } from '@/lib/utils/constants';

interface FAQ {
  question: string;
  answer: string;
}

interface CalculatorPageLayoutProps {
  slug: string;
  title: string;
  subtitle: string;
  jsonLd: { name: string; url: string; description: string };
  children: ReactNode;
  guideContent?: ReactNode;
  faqs?: FAQ[];
}

export function CalculatorPageLayout({
  slug,
  title,
  subtitle,
  jsonLd,
  children,
  guideContent,
  faqs,
}: CalculatorPageLayoutProps) {
  const category = getCategoryForRechner(slug);

  const breadcrumbItems = [
    ...(category ? [{ label: category.title, href: `/#${category.id}` }] : []),
    { label: title },
  ];

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">{title}</h1>
        <p className="text-text-secondary text-lg">{subtitle}</p>
        <TrustSignals compact className="mt-3" />
      </div>

      <WebApplicationJsonLd {...jsonLd} />

      {children}

      {guideContent && <div className="mt-12">{guideContent}</div>}

      {faqs && faqs.length > 0 && (
        <FAQSection faqs={faqs} className="mt-8" />
      )}

      <RelatedCalculators currentSlug={slug} className="mt-8" />
    </div>
  );
}
