import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { KreditrechnerForm } from './kreditrechner-form';
import { KREDIT_FAQS } from '@/data/content/kredit-guide';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';
import { ZinsTicker } from '@/components/calculator/zins-ticker';
import { getCurrentRates } from '@/lib/rates/fetch-rates';

export const metadata: Metadata = {
  title: 'Kreditrechner 2026 — Monatliche Rate & Gesamtkosten',
  description:
    'Berechnen Sie die monatliche Rate, Gesamtkosten und Zinsen für Ihren Kredit. Kostenlos und aktuell.',
  alternates: { canonical: '/kreditrechner' },
};

export default async function KreditrechnerPage() {
  const rates = await getCurrentRates();

  return (
    <CalculatorPageLayout
      slug="kreditrechner"
      title="Kreditrechner 2026"
      subtitle="Berechnen Sie monatliche Rate, Gesamtkosten und Zinsen für Ihren Kredit."
      jsonLd={{ name: 'Kreditrechner 2026', url: '/kreditrechner', description: 'Kostenloser Kreditrechner 2026. Monatliche Rate, Gesamtkosten und detaillierter Tilgungsplan.' }}
      faqs={KREDIT_FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug.kreditrechner.headline} offers={affiliateOffersBySlug.kreditrechner.offers} />}
    >
      <ZinsTicker rates={rates} variant="kredit" className="mb-4" />
      <KreditrechnerForm />
    </CalculatorPageLayout>
  );
}
