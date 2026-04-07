import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { TilgungsrechnerForm } from './tilgungsrechner-form';
import { TILGUNGS_FAQS } from '@/data/content/tilgungs-guide';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';

export const metadata: Metadata = {
  title: 'Tilgungsrechner 2026 — Baufinanzierung & Tilgungsplan',
  description:
    'Erstellen Sie einen detaillierten Tilgungsplan für Ihre Baufinanzierung. Restschuld, Laufzeit und Zinsen auf einen Blick.',
  alternates: { canonical: '/tilgungsrechner' },
};

export default function TilgungsrechnerPage() {
  return (
    <CalculatorPageLayout
      slug="tilgungsrechner"
      title="Tilgungsrechner 2026"
      subtitle="Erstellen Sie einen detaillierten Tilgungsplan für Ihre Baufinanzierung."
      jsonLd={{ name: 'Tilgungsrechner 2026', url: '/tilgungsrechner', description: 'Kostenloser Tilgungsrechner 2026. Detaillierter Tilgungsplan mit Restschuld und Gesamtkosten.' }}
      faqs={TILGUNGS_FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug.tilgungsrechner.headline} offers={affiliateOffersBySlug.tilgungsrechner.offers} />}
    >
      <TilgungsrechnerForm />
    </CalculatorPageLayout>
  );
}
