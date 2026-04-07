import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { GehaltserhoehungForm } from './gehaltserhoehung-form';

const FAQS = [
  { question: 'Wie viel kommt von einer Gehaltserhöhung netto an?', answer: 'Typischerweise kommen nur 45-60% einer Brutto-Gehaltserhöhung netto an. Der Rest geht für Steuern und Sozialversicherung drauf. Je höher Ihr Einkommen, desto weniger bleibt netto — wegen der Steuerprogression.' },
  { question: 'Warum ist die Netto-Erhöhung so viel kleiner als die Brutto-Erhöhung?', answer: 'Deutschland hat ein progressives Steuersystem: Jeder zusätzliche Euro wird höher besteuert als der vorherige. Dazu kommen Sozialversicherungsbeiträge (ca. 20% AN-Anteil). Bei einem Gehalt um 4.000-5.000 € brutto liegt der Grenzsteuersatz oft schon bei 35-42%.' },
  { question: 'Lohnt sich eine Gehaltserhöhung steuerlich überhaupt?', answer: 'Ja, immer! Es gibt keine Situation, in der Sie nach einer Erhöhung weniger netto haben als vorher. Das ist ein verbreiteter Irrglaube. Die Progression bedeutet nur, dass die zusätzlichen Euro höher besteuert werden — nicht das gesamte Gehalt.' },
  { question: 'Was bringt mehr: Gehaltserhöhung oder Firmenwagen?', answer: 'Das hängt vom Einzelfall ab. Ein Firmenwagen spart Ihnen die Anschaffungs- und Betriebskosten, wird aber als geldwerter Vorteil versteuert. Bei einem E-Auto (0,25%-Regel) ist der steuerliche Vorteil besonders groß. Nutzen Sie unseren BNR mit Firmenwagen-Option für den Vergleich.' },
];

export const metadata: Metadata = {
  title: 'Gehaltserhöhung Rechner — Was bleibt netto?',
  description: 'Wie viel kommt von einer Gehaltserhöhung netto an? Berechnen Sie den Netto-Unterschied vor und nach der Erhöhung.',
  keywords: ['Gehaltserhöhung Rechner', 'Gehaltserhöhung netto', 'Was bleibt von Gehaltserhöhung', 'Netto Erhöhung berechnen'],
  alternates: { canonical: '/gehaltserhoehung-rechner' },
};

export default function GehaltserhoehungRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="gehaltserhoehung-rechner"
      title="Gehaltserhöhung Rechner"
      subtitle="Berechnen Sie, wie viel von einer Gehaltserhöhung netto übrig bleibt."
      jsonLd={{ name: 'Gehaltserhöhung Rechner', url: '/gehaltserhoehung-rechner', description: 'Gehaltserhöhung: Wie viel bleibt netto?' }}
      faqs={FAQS}
    >
      <GehaltserhoehungForm />
    </CalculatorPageLayout>
  );
}
