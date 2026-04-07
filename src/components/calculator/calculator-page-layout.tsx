import type { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { NativeAdSlot } from '@/components/ads/native-ad-slot';
import { getCategoryForRechner } from '@/lib/utils/constants';
import { RATGEBER_ARTIKEL } from '@/data/content/ratgeber';

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
  affiliateSection?: ReactNode;
}

export function CalculatorPageLayout({
  slug,
  title,
  subtitle,
  jsonLd,
  children,
  guideContent,
  faqs,
  affiliateSection,
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

      {/* Ad: after calculator results */}
      <NativeAdSlot format="horizontal" className="mt-10" />

      {/* Affiliate recommendations — natural next step after results */}
      {affiliateSection && <div className="mt-8">{affiliateSection}</div>}

      {guideContent && <div className="mt-12">{guideContent}</div>}

      {/* Ad: between guide content and FAQ */}
      {guideContent && <NativeAdSlot format="horizontal" className="mt-6" />}

      {faqs && faqs.length > 0 && (
        <FAQSection faqs={faqs} className="mt-8" />
      )}

      {/* Ad: after FAQ, before related calculators */}
      {faqs && faqs.length > 0 && (
        <NativeAdSlot format="horizontal" className="mt-4" />
      )}

      {/* Related ratgeber articles */}
      {(() => {
        const relatedArticles = RATGEBER_ARTIKEL.filter((a) => a.relatedRechner === slug).slice(0, 3);
        if (relatedArticles.length === 0) return null;
        return (
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold text-text">Passende Ratgeber</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/ratgeber/${a.slug}`}
                  className="group block rounded-xl border border-border bg-surface p-4 hover:border-accent-500/30 hover:bg-surface-raised transition-all"
                >
                  <h3 className="text-sm font-medium text-text group-hover:text-accent-600 transition-colors line-clamp-2">
                    {a.title}
                  </h3>
                  <p className="text-sm text-text-muted mt-1 line-clamp-2">{a.intro.substring(0, 100)}...</p>
                  <span className="inline-flex items-center gap-1 text-sm text-accent-600 mt-2">
                    Weiterlesen <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        );
      })()}

      <RelatedCalculators currentSlug={slug} className="mt-8" />
    </div>
  );
}
