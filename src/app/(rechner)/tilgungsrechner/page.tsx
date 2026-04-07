import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { TilgungsrechnerForm } from './tilgungsrechner-form';
import { TILGUNGS_FAQS } from '@/data/content/tilgungs-guide';

export const metadata: Metadata = {
  title: 'Tilgungsrechner 2026 — Baufinanzierung & Tilgungsplan',
  description:
    'Erstellen Sie einen detaillierten Tilgungsplan für Ihre Baufinanzierung. Restschuld, Laufzeit und Zinsen auf einen Blick.',
  alternates: { canonical: '/tilgungsrechner' },
};

export default function TilgungsrechnerPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Tilgungsrechner' }]} />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
          Tilgungsrechner 2026
        </h1>
        <p className="text-text-secondary text-lg">
          Erstellen Sie einen detaillierten Tilgungsplan für Ihre Baufinanzierung.
        </p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd
        name="Tilgungsrechner 2026"
        url="/tilgungsrechner"
        description="Kostenloser Tilgungsrechner 2026. Detaillierter Tilgungsplan mit Restschuld und Gesamtkosten."
      />
      <TilgungsrechnerForm />
      <FAQSection faqs={TILGUNGS_FAQS} className="mt-12" />
      <RelatedCalculators currentSlug="tilgungsrechner" className="mt-8" />
    </div>
  );
}
