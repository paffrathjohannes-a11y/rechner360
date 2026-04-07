import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { BuForm } from './bu-form';
import { BU_FAQS } from '@/data/content/bu-guide';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';

export const metadata: Metadata = {
  title: 'BU-Rechner 2026 — Berufsunfähigkeitsversicherung berechnen',
  description: 'Berufsunfähigkeitsversicherung berechnen: Monatsbeitrag, empfohlene BU-Rente und Kosten-Nutzen-Verhältnis. Kostenlos und aktuell 2026.',
  keywords: ['BU Rechner', 'Berufsunfähigkeitsversicherung Rechner', 'BU Kosten', 'Berufsunfähigkeit Beitrag', 'BU Versicherung 2026'],
  alternates: { canonical: '/bu-rechner' },
  openGraph: {
    title: 'BU-Rechner 2026 — Berufsunfähigkeitsversicherung | rechner360.de',
    description: 'Berufsunfähigkeitsversicherung berechnen. Monatsbeitrag nach Alter, Beruf und gewünschter BU-Rente.',
    url: '/bu-rechner',
    type: 'website',
  },
};

export default function BuRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="bu-rechner"
      title="BU-Rechner 2026"
      subtitle="Berechnen Sie den Beitrag für Ihre Berufsunfähigkeitsversicherung — nach Alter, Beruf und gewünschter Absicherung."
      jsonLd={{
        name: 'BU-Rechner 2026',
        url: '/bu-rechner',
        description: 'Kostenloser BU-Rechner 2026. Berufsunfähigkeitsversicherung Beitrag berechnen.',
      }}
      faqs={BU_FAQS}
      affiliateSection={affiliateOffersBySlug['bu-rechner'] ? <AffiliateBox headline={affiliateOffersBySlug['bu-rechner'].headline} offers={affiliateOffersBySlug['bu-rechner'].offers} /> : undefined}
      guideContent={
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-text">BU-Beitrag nach Berufsgruppe</h2>
          <p className="text-text-secondary leading-relaxed">
            Der Beruf ist der größte Einflussfaktor auf den BU-Beitrag. Je höher das Risiko der Berufsunfähigkeit, desto teurer die Versicherung.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-surface-sunken">
                  <th className="px-4 py-2 text-left text-text font-medium">Berufsgruppe</th>
                  <th className="px-4 py-2 text-right text-text font-medium">Risiko</th>
                  <th className="px-4 py-2 text-right text-text font-medium">ca. Beitrag*</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-t border-border"><td className="px-4 py-2">Büro / Verwaltung / IT</td><td className="px-4 py-2 text-right text-accent-500">Niedrig</td><td className="px-4 py-2 text-right font-currency">40–70 €</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2">Medizin / Pflege</td><td className="px-4 py-2 text-right text-warning-500">Mittel</td><td className="px-4 py-2 text-right font-currency">55–90 €</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2">Selbstständige</td><td className="px-4 py-2 text-right text-warning-500">Mittel</td><td className="px-4 py-2 text-right font-currency">60–100 €</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2">Handwerk</td><td className="px-4 py-2 text-right text-warning-600">Erhöht</td><td className="px-4 py-2 text-right font-currency">80–140 €</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2">Körperliche Arbeit</td><td className="px-4 py-2 text-right text-negative-500">Hoch</td><td className="px-4 py-2 text-right font-currency">100–180 €</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-text-muted">* Geschätzt für 30 Jahre, 1.500 € BU-Rente, Nichtraucher, bis Alter 67.</p>
        </section>
      }
    >
      <BuForm />
    </CalculatorPageLayout>
  );
}
