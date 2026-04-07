import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { ElterngeldForm } from './elterngeld-form';
import { ELTERNGELD_FAQS } from '@/data/content/elterngeld-guide';

export const metadata: Metadata = {
  title: 'Elterngeld Rechner 2026 — Basiselterngeld & ElterngeldPlus',
  description:
    'Berechnen Sie Ihr Elterngeld kostenlos. Basiselterngeld, ElterngeldPlus, Geschwisterbonus und Mehrlingszuschlag. Aktuell für 2026.',
  keywords: ['Elterngeld Rechner', 'Elterngeld berechnen', 'Basiselterngeld', 'ElterngeldPlus', 'Elterngeld 2026'],
  alternates: { canonical: '/elterngeld-rechner' },
};

export default function ElterngeldRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="elterngeld-rechner"
      title="Elterngeld Rechner 2026"
      subtitle="Berechnen Sie Ihr Elterngeld — Basiselterngeld oder ElterngeldPlus mit Geschwisterbonus."
      jsonLd={{
        name: 'Elterngeld Rechner 2026',
        url: '/elterngeld-rechner',
        description: 'Kostenloser Elterngeld Rechner 2026.',
      }}
      faqs={ELTERNGELD_FAQS}
      guideContent={
        <>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text">Wie wird das Elterngeld berechnet?</h2>
            <div className="space-y-3 text-text-secondary leading-relaxed">
              <p>
                Das Elterngeld ersetzt einen Teil des wegfallenden Einkommens nach der Geburt eines Kindes.
                Die Höhe richtet sich nach dem durchschnittlichen monatlichen Nettoeinkommen der letzten
                12 Monate vor der Geburt.
              </p>
              <p>
                Die <strong className="text-text">Ersatzrate</strong> beträgt grundsätzlich 65-67%
                des Nettoeinkommens. Bei niedrigem Einkommen (unter 1.000 €) steigt die Ersatzrate
                schrittweise auf bis zu 100%. Das <strong className="text-text">Basiselterngeld</strong> liegt
                zwischen 300 € und 1.800 € monatlich für bis zu 12 Monate (14 mit Partnermonaten).
              </p>
              <p>
                <strong className="text-text">ElterngeldPlus</strong> beträgt die Hälfte des
                Basiselterngelds (150-900 €), wird aber doppelt so lang gezahlt (bis zu 24 Monate).
                Es lohnt sich besonders für Eltern, die nach der Geburt in Teilzeit arbeiten möchten.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-text mt-8">Elterngeld-Tabelle</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-surface-sunken">
                    <th className="px-4 py-2 text-left text-text font-medium">Nettoeinkommen</th>
                    <th className="px-4 py-2 text-right text-text font-medium">Ersatzrate</th>
                    <th className="px-4 py-2 text-right text-text font-medium">Basiselterngeld</th>
                    <th className="px-4 py-2 text-right text-text font-medium">ElterngeldPlus</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-t border-border"><td className="px-4 py-2">0 €</td><td className="px-4 py-2 text-right">—</td><td className="px-4 py-2 text-right font-currency">300 €</td><td className="px-4 py-2 text-right font-currency">150 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">500 €</td><td className="px-4 py-2 text-right">92%</td><td className="px-4 py-2 text-right font-currency">460 €</td><td className="px-4 py-2 text-right font-currency">230 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">1.000 €</td><td className="px-4 py-2 text-right">67%</td><td className="px-4 py-2 text-right font-currency">670 €</td><td className="px-4 py-2 text-right font-currency">335 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">2.000 €</td><td className="px-4 py-2 text-right">65%</td><td className="px-4 py-2 text-right font-currency">1.300 €</td><td className="px-4 py-2 text-right font-currency">650 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">3.000 €</td><td className="px-4 py-2 text-right">60%</td><td className="px-4 py-2 text-right font-currency">1.800 €</td><td className="px-4 py-2 text-right font-currency">900 €</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </>
      }
    >
      <ElterngeldForm />
    </CalculatorPageLayout>
  );
}
