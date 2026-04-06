import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { BruttoNettoForm } from './brutto-netto-form';

export const metadata: Metadata = {
  title: 'Brutto Netto Rechner 2026 — Kostenlos & Aktuell',
  description:
    'Berechnen Sie schnell und genau, wie viel Netto von Ihrem Bruttogehalt übrig bleibt. Aktuell für 2026 gemäß BMF-Programmablaufplan. Kostenlos, ohne Registrierung.',
  keywords: [
    'Brutto Netto Rechner',
    'Brutto Netto Rechner 2026',
    'Gehaltsrechner',
    'Nettolohn berechnen',
    'Lohnsteuerrechner',
  ],
  alternates: {
    canonical: '/brutto-netto-rechner',
  },
  openGraph: {
    title: 'Brutto Netto Rechner 2026 — Kostenlos & Aktuell | rechner360.de',
    description:
      'Berechnen Sie schnell und genau, wie viel Netto von Ihrem Bruttogehalt übrig bleibt.',
    url: '/brutto-netto-rechner',
    type: 'website',
  },
};

export default function BruttoNettoRechnerPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[{ label: 'Brutto Netto Rechner' }]}
      />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
          Brutto Netto Rechner 2026
        </h1>
        <p className="text-text-secondary text-lg">
          Berechnen Sie Ihr Nettogehalt &mdash; aktuell gem&auml;&szlig; BMF-Programmablaufplan 2026.
        </p>
        <TrustSignals compact className="mt-3" />
      </div>

      <WebApplicationJsonLd
        name="Brutto Netto Rechner 2026"
        url="/brutto-netto-rechner"
        description="Kostenloser Brutto-Netto-Rechner 2026. Berechnen Sie Ihr Nettogehalt mit allen Abzügen."
      />

      <BruttoNettoForm />

      <RelatedCalculators currentSlug="brutto-netto-rechner" className="mt-12" />
    </div>
  );
}
