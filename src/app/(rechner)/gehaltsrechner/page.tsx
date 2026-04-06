import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { GehaltsrechnerForm } from './gehaltsrechner-form';

export const metadata: Metadata = {
  title: 'Gehaltsrechner 2026 — Netto-Vergleich aller Steuerklassen',
  description:
    'Vergleichen Sie Ihr Gehalt über alle Steuerklassen und berechnen Sie die Arbeitgeberkosten. Aktuell für 2026.',
  alternates: { canonical: '/gehaltsrechner' },
};

export default function GehaltsrechnerPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Gehaltsrechner' }]} />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
          Gehaltsrechner 2026
        </h1>
        <p className="text-text-secondary text-lg">
          Vergleichen Sie Ihr Nettogehalt &uuml;ber alle Steuerklassen auf einen Blick.
        </p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd
        name="Gehaltsrechner 2026"
        url="/gehaltsrechner"
        description="Kostenloser Gehaltsrechner 2026 mit Steuerklassen-Vergleich und Arbeitgeberkosten."
      />
      <GehaltsrechnerForm />
      <RelatedCalculators currentSlug="gehaltsrechner" className="mt-12" />
    </div>
  );
}
