import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { EinkommensteuerForm } from './einkommensteuer-form';
import { EINKOMMENSTEUER_FAQS } from '@/data/content/einkommensteuer-guide';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';

export const metadata: Metadata = {
  title: 'Einkommensteuerrechner 2026 — Steuer berechnen',
  description: 'Berechnen Sie Ihre Einkommensteuer 2026 kostenlos. Mit Grundfreibetrag, Solidaritätszuschlag, Kirchensteuer und Grenzsteuersatz.',
  keywords: ['Einkommensteuerrechner', 'Einkommensteuer berechnen', 'Einkommensteuer 2026', 'Steuertarif', 'Grenzsteuersatz'],
  alternates: { canonical: '/einkommensteuer-rechner' },
};

export default function EinkommensteuerRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="einkommensteuer-rechner"
      title="Einkommensteuerrechner 2026"
      subtitle="Berechnen Sie Ihre Einkommensteuer mit Grenzsteuersatz, Solidaritätszuschlag und Kirchensteuer."
      jsonLd={{
        name: 'Einkommensteuerrechner 2026',
        url: '/einkommensteuer-rechner',
        description: 'Kostenloser Einkommensteuerrechner 2026.',
      }}
      faqs={EINKOMMENSTEUER_FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug['einkommensteuer-rechner'].headline} offers={affiliateOffersBySlug['einkommensteuer-rechner'].offers} />}
      guideContent={
        <>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text">Einkommensteuertarif 2026 (§32a EStG)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-surface-sunken">
                    <th className="px-4 py-2 text-left text-text font-medium">Zone</th>
                    <th className="px-4 py-2 text-right text-text font-medium">Einkommen (zvE)</th>
                    <th className="px-4 py-2 text-right text-text font-medium">Steuersatz</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-t border-border"><td className="px-4 py-2">Grundfreibetrag</td><td className="px-4 py-2 text-right font-currency">0 – 12.348 €</td><td className="px-4 py-2 text-right">0 %</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Progressionszone I</td><td className="px-4 py-2 text-right font-currency">12.349 – 17.799 €</td><td className="px-4 py-2 text-right">14 – 24 %</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Progressionszone II</td><td className="px-4 py-2 text-right font-currency">17.800 – 69.878 €</td><td className="px-4 py-2 text-right">24 – 42 %</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Spitzensteuersatz</td><td className="px-4 py-2 text-right font-currency">69.879 – 277.825 €</td><td className="px-4 py-2 text-right">42 %</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Reichensteuersatz</td><td className="px-4 py-2 text-right font-currency">ab 277.826 €</td><td className="px-4 py-2 text-right">45 %</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted">
              Berechnung erfolgt nach dem offiziellen BMF Programmablaufplan 2026. Grundfreibetrag: 12.348 € (Ledige) / 24.696 € (Verheiratete).
            </p>
          </section>
        </>
      }
    >
      <EinkommensteuerForm />
    </CalculatorPageLayout>
  );
}
