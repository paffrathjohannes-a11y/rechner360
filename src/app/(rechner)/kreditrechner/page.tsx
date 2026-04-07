import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { KreditrechnerForm } from './kreditrechner-form';
import { KREDIT_FAQS } from '@/data/content/kredit-guide';

export const metadata: Metadata = {
  title: 'Kreditrechner 2026 — Monatliche Rate & Gesamtkosten',
  description:
    'Berechnen Sie die monatliche Rate, Gesamtkosten und Zinsen für Ihren Kredit. Kostenlos und aktuell.',
  alternates: { canonical: '/kreditrechner' },
};

export default function KreditrechnerPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Kreditrechner' }]} />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
          Kreditrechner 2026
        </h1>
        <p className="text-text-secondary text-lg">
          Berechnen Sie monatliche Rate, Gesamtkosten und Zinsen für Ihren Kredit.
        </p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd
        name="Kreditrechner 2026"
        url="/kreditrechner"
        description="Kostenloser Kreditrechner 2026. Monatliche Rate, Gesamtkosten und detaillierter Tilgungsplan."
      />
      <KreditrechnerForm />
      <FAQSection faqs={KREDIT_FAQS} className="mt-12" />
      <RelatedCalculators currentSlug="kreditrechner" className="mt-8" />
    </div>
  );
}
