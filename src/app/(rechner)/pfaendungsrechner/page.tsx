import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { PfaendungsForm } from './pfaendungs-form';

const FAQS = [
  { question: 'Was ist die Pfändungsfreigrenze?', answer: 'Die Pfändungsfreigrenze ist der Betrag Ihres Nettoeinkommens, der nicht gepfändet werden darf. Sie sichert das Existenzminimum. Ab Juli 2023 liegt der Grundfreibetrag bei 1.402,28 € monatlich für Alleinstehende ohne Unterhaltspflichten.' },
  { question: 'Wie erhöht sich die Freigrenze bei Unterhaltspflichten?', answer: 'Für die erste unterhaltspflichtige Person erhöht sich die Freigrenze um 527,76 €, für jede weitere Person um jeweils 294,02 €. Bei einer Person mit 2 Unterhaltspflichten liegt die Freigrenze somit bei ca. 2.224 €.' },
  { question: 'Wird das gesamte Einkommen über der Freigrenze gepfändet?', answer: 'Nein. Vom Einkommen über der Freigrenze werden ca. 70% gepfändet, 30% verbleiben beim Schuldner. Ab einer bestimmten Obergrenze (ca. 4.299 € bei 0 Unterhaltspflichten) wird das gesamte Mehreinkommen gepfändet.' },
  { question: 'Wann werden die Pfändungsfreigrenzen angepasst?', answer: 'Die Pfändungsfreigrenzen werden alle zwei Jahre zum 1. Juli angepasst, basierend auf dem steuerlichen Grundfreibetrag. Die letzte Anpassung erfolgte am 01.07.2023. Die nächste Anpassung ist für 01.07.2025 vorgesehen.' },
];

export const metadata: Metadata = {
  title: 'Pfändungsrechner 2026 — Pfändungsfreigrenze berechnen',
  description: 'Berechnen Sie Ihre Pfändungsfreigrenze und den pfändbaren Betrag. Mit Unterhaltspflichten und aktuellem Freibetrag.',
  keywords: ['Pfändungsrechner', 'Pfändungsfreigrenze', 'Pfändbarer Betrag', 'Lohnpfändung Rechner'],
  alternates: { canonical: '/pfaendungsrechner' },
};

export default function PfaendungsrechnerPage() {
  return (
    <CalculatorPageLayout
      slug="pfaendungsrechner"
      title="Pfändungsrechner 2026"
      subtitle="Berechnen Sie Ihre Pfändungsfreigrenze und den pfändbaren Betrag Ihres Einkommens."
      jsonLd={{
        name: 'Pfändungsrechner 2026',
        url: '/pfaendungsrechner',
        description: 'Pfändungsfreigrenze und pfändbaren Betrag berechnen.',
      }}
      faqs={FAQS}
      guideContent={
        <>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text">Pfändungsfreigrenzen (ab 01.07.2023)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-surface-sunken">
                    <th className="px-4 py-2 text-left text-text font-medium">Unterhaltspflichten</th>
                    <th className="px-4 py-2 text-right text-text font-medium">Freigrenze/Monat</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-t border-border"><td className="px-4 py-2">Keine</td><td className="px-4 py-2 text-right font-currency">1.402,28 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">1 Person</td><td className="px-4 py-2 text-right font-currency">1.930,04 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">2 Personen</td><td className="px-4 py-2 text-right font-currency">2.224,06 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">3 Personen</td><td className="px-4 py-2 text-right font-currency">2.518,08 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">4 Personen</td><td className="px-4 py-2 text-right font-currency">2.812,10 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">5 Personen</td><td className="px-4 py-2 text-right font-currency">3.106,12 €</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </>
      }
    >
      <PfaendungsForm />
    </CalculatorPageLayout>
  );
}
