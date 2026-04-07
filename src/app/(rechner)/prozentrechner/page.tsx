import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { ProzentForm } from './prozent-form';

const FAQS = [
  { question: 'Wie berechnet man Prozent?', answer: 'Die Grundformel lautet: Prozentwert = Grundwert × Prozentsatz ÷ 100. Beispiel: 20% von 150 = 150 × 20 ÷ 100 = 30.' },
  { question: 'Wie berechnet man die prozentuale Veränderung?', answer: 'Prozentuale Veränderung = (Neuer Wert - Alter Wert) ÷ Alter Wert × 100. Beispiel: Von 80 auf 100 = (100-80) ÷ 80 × 100 = 25% Zunahme.' },
  { question: 'Was ist der Unterschied zwischen Prozentpunkt und Prozent?', answer: 'Ein Prozentpunkt ist die absolute Differenz zwischen zwei Prozentwerten. Beispiel: Von 10% auf 15% sind 5 Prozentpunkte Unterschied, aber 50% mehr (relativ gesehen).' },
  { question: 'Wie rechne ich Mehrwertsteuer?', answer: 'Netto + 19% MwSt: Netto × 1,19 = Brutto. Brutto zu Netto: Brutto ÷ 1,19 = Netto. Bei 7% MwSt entsprechend mit 1,07.' },
];

export const metadata: Metadata = {
  title: 'Prozentrechner — Prozente einfach berechnen',
  description: 'Prozentrechner: Anteil, Prozentsatz, Grundwert und prozentuale Ver\u00e4nderung berechnen. Kostenlos und sofort.',
  keywords: ['Prozentrechner', 'Prozent berechnen', 'Prozentuale Ver\u00e4nderung', 'Prozentsatz berechnen'],
  alternates: { canonical: '/prozentrechner' },
};

export default function ProzentrechnerPage() {
  return (
    <CalculatorPageLayout
      slug="prozentrechner"
      title="Prozentrechner"
      subtitle="Prozente einfach berechnen — Anteil, Prozentsatz, Grundwert und prozentuale Veränderung."
      jsonLd={{ name: 'Prozentrechner', url: '/prozentrechner', description: 'Kostenloser Prozentrechner. Prozente berechnen leicht gemacht.' }}
      faqs={FAQS}
      guideContent={
        <>
          <section className="space-y-4 mt-12">
            <h2 className="text-2xl font-bold text-text">Prozentrechnung — die 4 Grundaufgaben</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-border p-4 space-y-2">
                <h3 className="font-semibold text-text">1. Prozentwert</h3>
                <p className="text-sm text-text-secondary">{'\u201eWie viel sind 25% von 200?\u201c'}</p>
                <p className="text-sm font-currency text-primary-600">200 × 25 ÷ 100 = 50</p>
              </div>
              <div className="rounded-xl border border-border p-4 space-y-2">
                <h3 className="font-semibold text-text">2. Prozentsatz</h3>
                <p className="text-sm text-text-secondary">{'\u201e50 ist wie viel % von 200?\u201c'}</p>
                <p className="text-sm font-currency text-primary-600">50 ÷ 200 × 100 = 25%</p>
              </div>
              <div className="rounded-xl border border-border p-4 space-y-2">
                <h3 className="font-semibold text-text">3. Grundwert</h3>
                <p className="text-sm text-text-secondary">{'\u201e50 sind 25% von was?\u201c'}</p>
                <p className="text-sm font-currency text-primary-600">50 ÷ 25 × 100 = 200</p>
              </div>
              <div className="rounded-xl border border-border p-4 space-y-2">
                <h3 className="font-semibold text-text">4. Prozentuale Veränderung</h3>
                <p className="text-sm text-text-secondary">{'\u201eVon 80 auf 100 \u2014 wie viel %?\u201c'}</p>
                <p className="text-sm font-currency text-primary-600">(100-80) ÷ 80 × 100 = +25%</p>
              </div>
            </div>
          </section>
        </>
      }
    >
      <ProzentForm />
    </CalculatorPageLayout>
  );
}
