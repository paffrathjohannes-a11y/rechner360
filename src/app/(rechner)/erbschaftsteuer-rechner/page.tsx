import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { ErbschaftsteuerForm } from './erbschaftsteuer-form';
import { ERBSCHAFTSTEUER_FAQS } from '@/data/content/erbschaftsteuer-guide';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';

export const metadata: Metadata = {
  title: 'Erbschaftsteuer Rechner 2026 — Kostenlos berechnen',
  description:
    'Berechnen Sie die Erbschaftsteuer oder Schenkungsteuer mit allen Freibeträgen und Steuerklassen. Aktuell 2026, kostenlos und ohne Registrierung.',
  keywords: [
    'Erbschaftsteuer Rechner',
    'Erbschaftsteuer berechnen',
    'Schenkungsteuer Rechner',
    'Erbschaftsteuer Freibetrag',
    'Erbschaftsteuer Steuerklassen',
  ],
  alternates: { canonical: '/erbschaftsteuer-rechner' },
  openGraph: {
    title: 'Erbschaftsteuer Rechner 2026 — Kostenlos berechnen | rechner360.de',
    description: 'Berechnen Sie die Erbschaftsteuer oder Schenkungsteuer mit allen Freibeträgen und Steuerklassen.',
    url: '/erbschaftsteuer-rechner',
    type: 'website',
  },
};

export default function ErbschaftsteuerRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="erbschaftsteuer-rechner"
      title="Erbschaftsteuer Rechner 2026"
      subtitle="Berechnen Sie die Erbschaftsteuer oder Schenkungsteuer mit allen Freibeträgen, Versorgungsfreibeträgen und Steuerklassen."
      jsonLd={{
        name: 'Erbschaftsteuer Rechner 2026',
        url: '/erbschaftsteuer-rechner',
        description: 'Kostenloser Erbschaftsteuer-Rechner 2026. Berechnen Sie Erbschaftsteuer und Schenkungsteuer mit Freibeträgen.',
      }}
      faqs={ERBSCHAFTSTEUER_FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug['erbschaftsteuer-rechner'].headline} offers={affiliateOffersBySlug['erbschaftsteuer-rechner'].offers} />}
      guideContent={
        <>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text">Freibeträge bei der Erbschaftsteuer</h2>
            <p className="text-text-secondary leading-relaxed">
              Die Höhe des Freibetrags hängt vom Verwandtschaftsgrad zum Erblasser ab. Je enger die Verwandtschaft,
              desto höher der Freibetrag. Diese Freibeträge gelten sowohl für Erbschaften als auch für Schenkungen.
              Bei Schenkungen können die Freibeträge alle 10 Jahre erneut genutzt werden.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-surface-sunken">
                    <th className="px-4 py-2 text-left text-text font-medium">Verwandtschaft</th>
                    <th className="px-4 py-2 text-right text-text font-medium">Freibetrag</th>
                    <th className="px-4 py-2 text-right text-text font-medium">Steuerklasse</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-t border-border"><td className="px-4 py-2">Ehepartner / eingetr. Lebenspartner</td><td className="px-4 py-2 text-right font-currency">500.000 €</td><td className="px-4 py-2 text-right">I</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Kinder / Stiefkinder</td><td className="px-4 py-2 text-right font-currency">400.000 €</td><td className="px-4 py-2 text-right">I</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Enkelkinder</td><td className="px-4 py-2 text-right font-currency">200.000 €</td><td className="px-4 py-2 text-right">I</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Eltern / Großeltern (Erbschaft)</td><td className="px-4 py-2 text-right font-currency">100.000 €</td><td className="px-4 py-2 text-right">I</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Geschwister, Nichten, Neffen</td><td className="px-4 py-2 text-right font-currency">20.000 €</td><td className="px-4 py-2 text-right">II</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Sonstige Personen</td><td className="px-4 py-2 text-right font-currency">20.000 €</td><td className="px-4 py-2 text-right">III</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold text-text">Steuersätze nach Steuerklassen</h2>
            <p className="text-text-secondary leading-relaxed">
              Die Erbschaftsteuer ist nicht progressiv wie die Einkommensteuer. Der Steuersatz richtet sich nach der
              Höhe des steuerpflichtigen Erwerbs und der Steuerklasse. Der ermittelte Satz wird auf den gesamten
              steuerpflichtigen Betrag angewendet.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-surface-sunken">
                    <th className="px-4 py-2 text-left text-text font-medium">Steuerpfl. Erwerb bis</th>
                    <th className="px-4 py-2 text-right text-text font-medium">SK I</th>
                    <th className="px-4 py-2 text-right text-text font-medium">SK II</th>
                    <th className="px-4 py-2 text-right text-text font-medium">SK III</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-t border-border"><td className="px-4 py-2">75.000 €</td><td className="px-4 py-2 text-right font-currency">7%</td><td className="px-4 py-2 text-right font-currency">15%</td><td className="px-4 py-2 text-right font-currency">30%</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">300.000 €</td><td className="px-4 py-2 text-right font-currency">11%</td><td className="px-4 py-2 text-right font-currency">20%</td><td className="px-4 py-2 text-right font-currency">30%</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">600.000 €</td><td className="px-4 py-2 text-right font-currency">15%</td><td className="px-4 py-2 text-right font-currency">25%</td><td className="px-4 py-2 text-right font-currency">30%</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">6.000.000 €</td><td className="px-4 py-2 text-right font-currency">19%</td><td className="px-4 py-2 text-right font-currency">30%</td><td className="px-4 py-2 text-right font-currency">30%</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">13.000.000 €</td><td className="px-4 py-2 text-right font-currency">23%</td><td className="px-4 py-2 text-right font-currency">35%</td><td className="px-4 py-2 text-right font-currency">50%</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">26.000.000 €</td><td className="px-4 py-2 text-right font-currency">27%</td><td className="px-4 py-2 text-right font-currency">40%</td><td className="px-4 py-2 text-right font-currency">50%</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">darüber</td><td className="px-4 py-2 text-right font-currency">30%</td><td className="px-4 py-2 text-right font-currency">43%</td><td className="px-4 py-2 text-right font-currency">50%</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </>
      }
    >
      <ErbschaftsteuerForm />
    </CalculatorPageLayout>
  );
}
