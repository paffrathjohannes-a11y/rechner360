import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { BuergergeldForm } from './buergergeld-form';
import { BUERGERGELD_FAQS } from '@/data/content/buergergeld-guide';

export const metadata: Metadata = {
  title: 'Bürgergeld Rechner 2026 — Anspruch berechnen',
  description: 'Berechnen Sie Ihren Bürgergeld-Anspruch kostenlos. Regelbedarf, Kosten der Unterkunft und Freibeträge auf einen Blick.',
  keywords: ['Bürgergeld Rechner', 'Bürgergeld berechnen', 'Bürgergeld 2026', 'Regelbedarf', 'Bürgergeld Höhe'],
  alternates: { canonical: '/buergergeld-rechner' },
};

export default function BuergergeldRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="buergergeld-rechner"
      title="Bürgergeld Rechner 2026"
      subtitle="Berechnen Sie Ihren Bürgergeld-Anspruch mit Regelbedarf, Kosten der Unterkunft und Freibeträgen."
      jsonLd={{
        name: 'Bürgergeld Rechner 2026',
        url: '/buergergeld-rechner',
        description: 'Kostenloser Bürgergeld Rechner 2026.',
      }}
      faqs={BUERGERGELD_FAQS}
      guideContent={
        <>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text">Bürgergeld Regelsätze 2025/2026</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-surface-sunken">
                    <th className="px-4 py-2 text-left text-text font-medium">Regelbedarfsstufe</th>
                    <th className="px-4 py-2 text-right text-text font-medium">Monatlich</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-t border-border"><td className="px-4 py-2">Alleinstehende / Alleinerziehende</td><td className="px-4 py-2 text-right font-currency">563 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Partner in Bedarfsgemeinschaft</td><td className="px-4 py-2 text-right font-currency">506 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Jugendliche (14-17 Jahre)</td><td className="px-4 py-2 text-right font-currency">471 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Kinder (6-13 Jahre)</td><td className="px-4 py-2 text-right font-currency">390 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Kinder (0-5 Jahre)</td><td className="px-4 py-2 text-right font-currency">357 €</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted">
              Zusätzlich zum Regelbedarf werden die Kosten der Unterkunft (Miete + Heizung) in angemessener
              Höhe übernommen. Die angemessene Höhe richtet sich nach dem örtlichen Mietspiegel.
            </p>
          </section>
        </>
      }
    >
      <BuergergeldForm />
    </CalculatorPageLayout>
  );
}
