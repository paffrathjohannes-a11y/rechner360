import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';
import { WohngeldForm } from './wohngeld-form';
import { WOHNGELD_FAQS } from '@/data/content/wohngeld-guide';

export const metadata: Metadata = {
  title: 'Wohngeldrechner 2026 — Wohngeld-Anspruch berechnen',
  description: 'Berechnen Sie Ihr Wohngeld 2026 kostenlos. Mit Wohngeld-Plus, Heizkosten-Entlastung und Klimakomponente. Für alle Mietstufen I-VII.',
  keywords: ['Wohngeldrechner', 'Wohngeld berechnen', 'Wohngeld 2026', 'Wohngeld Plus', 'Mietzuschuss', 'Mietstufe'],
  alternates: { canonical: '/wohngeld-rechner' },
};

export default function WohngeldRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="wohngeld-rechner"
      title="Wohngeldrechner 2026"
      subtitle="Berechnen Sie Ihren Wohngeld-Anspruch mit Wohngeld-Plus, Heizkosten-Entlastung und Klimakomponente."
      jsonLd={{
        name: 'Wohngeldrechner 2026',
        url: '/wohngeld-rechner',
        description: 'Kostenloser Wohngeldrechner 2026 mit Wohngeld-Plus.',
      }}
      faqs={WOHNGELD_FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug['wohngeld-rechner'].headline} offers={affiliateOffersBySlug['wohngeld-rechner'].offers} />}
      guideContent={
        <>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text">Wohngeld-Höchstbeträge 2026 nach Mietstufe</h2>
            <p className="text-sm text-text-secondary">
              Die anrechenbare Miete ist durch Höchstbeträge begrenzt, die von Haushaltsgröße und Mietstufe abhängen.
              Zusätzlich werden Heizkosten-Entlastung und Klimakomponente addiert.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-surface-sunken">
                    <th className="px-3 py-2 text-left text-text font-medium">Personen</th>
                    <th className="px-3 py-2 text-right text-text font-medium">Stufe I</th>
                    <th className="px-3 py-2 text-right text-text font-medium">Stufe IV</th>
                    <th className="px-3 py-2 text-right text-text font-medium">Stufe VII</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-t border-border"><td className="px-3 py-2">1</td><td className="px-3 py-2 text-right font-currency">477 €</td><td className="px-3 py-2 text-right font-currency">687 €</td><td className="px-3 py-2 text-right font-currency">920 €</td></tr>
                  <tr className="border-t border-border"><td className="px-3 py-2">2</td><td className="px-3 py-2 text-right font-currency">579 €</td><td className="px-3 py-2 text-right font-currency">836 €</td><td className="px-3 py-2 text-right font-currency">1.118 €</td></tr>
                  <tr className="border-t border-border"><td className="px-3 py-2">3</td><td className="px-3 py-2 text-right font-currency">689 €</td><td className="px-3 py-2 text-right font-currency">988 €</td><td className="px-3 py-2 text-right font-currency">1.320 €</td></tr>
                  <tr className="border-t border-border"><td className="px-3 py-2">4</td><td className="px-3 py-2 text-right font-currency">812 €</td><td className="px-3 py-2 text-right font-currency">1.166 €</td><td className="px-3 py-2 text-right font-currency">1.557 €</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted">
              Quelle: §12 WoGG. Höchstbeträge inkl. Klimakomponente. Heizkosten-Entlastung wird zusätzlich berücksichtigt.
            </p>
          </section>

          <section className="space-y-3 mt-8">
            <h3 className="text-lg font-semibold text-text">Mietstufen — Beispielstädte</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-text-secondary">
              <div><span className="font-medium text-text">Stufe I-II:</span> ländliche Regionen, kleine Städte</div>
              <div><span className="font-medium text-text">Stufe III:</span> Leipzig, Magdeburg, Chemnitz</div>
              <div><span className="font-medium text-text">Stufe IV:</span> Berlin, Dresden, Dortmund, Essen</div>
              <div><span className="font-medium text-text">Stufe V:</span> Hamburg, Köln, Hannover</div>
              <div><span className="font-medium text-text">Stufe VI:</span> Frankfurt, Stuttgart, Düsseldorf</div>
              <div><span className="font-medium text-text">Stufe VII:</span> München, Landkreis München</div>
            </div>
          </section>
        </>
      }
    >
      <WohngeldForm />
    </CalculatorPageLayout>
  );
}
