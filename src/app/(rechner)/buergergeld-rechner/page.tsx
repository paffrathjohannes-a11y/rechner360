import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { BuergergeldForm } from './buergergeld-form';
import { BUERGERGELD_FAQS } from '@/data/content/buergergeld-guide';

export const metadata: Metadata = {
  title: 'Bürgergeld-Rechner 2026 — Anspruch & Höhe berechnen',
  description: 'Bürgergeld-Anspruch 2026 kostenlos berechnen. Regelbedarf, Kosten der Unterkunft, Einkommensfreibeträge — mit Familiensituation und Einkommen.',
  keywords: ['Grundsicherung Rechner', 'Grundsicherung 2026', 'Bürgergeld Nachfolger', 'Grundsicherungsgeld berechnen', 'Neue Grundsicherung'],
  alternates: { canonical: '/buergergeld-rechner' },
};

export default function BuergergeldRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="buergergeld-rechner"
      title="Grundsicherung Rechner 2026 (ehem. Bürgergeld)"
      subtitle="Ab 01.07.2026 ersetzt die Neue Grundsicherung das Bürgergeld. Berechnen Sie Ihren Anspruch mit Regelbedarf, Kosten der Unterkunft und Freibeträgen."
      jsonLd={{
        name: 'Grundsicherung Rechner 2026',
        url: '/buergergeld-rechner',
        description: 'Kostenloser Grundsicherung Rechner 2026 — ehemals Bürgergeld.',
      }}
      faqs={BUERGERGELD_FAQS}
      guideContent={
        <>
          <section className="space-y-4">
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
              <p className="text-sm font-medium text-text">
                Ab 01.07.2026 ersetzt die <strong>Neue Grundsicherung</strong> das bisherige Bürgergeld.
                Die Regelsätze bleiben gleich, aber Vermögensprüfung und Sanktionen werden verschärft.
              </p>
            </div>
            <h2 className="text-2xl font-bold text-text">Regelsätze Grundsicherung 2026</h2>
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
            <h3 className="text-lg font-semibold text-text mt-6">Was ändert sich ab 01.07.2026?</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-text-secondary">
              <li><strong>Vermögensprüfung:</strong> Die bisherige Karenzzeit (40.000 € Freibetrag) entfällt. Vermögen wird ab dem ersten Tag geprüft.</li>
              <li><strong>Verschärfte Sanktionen:</strong> Leistungskürzungen bei Pflichtverletzungen werden strenger durchgesetzt.</li>
              <li><strong>Mitwirkungspflichten:</strong> Zumutbare Arbeitsangebote müssen schneller angenommen werden.</li>
              <li><strong>Regelsätze:</strong> Die Höhe der Regelsätze bleibt 2026 unverändert (563 € für Alleinstehende).</li>
            </ul>
          </section>
        </>
      }
    >
      <BuergergeldForm />
    </CalculatorPageLayout>
  );
}
