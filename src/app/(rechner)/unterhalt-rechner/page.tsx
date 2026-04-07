import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { UnterhaltForm } from './unterhalt-form';

const FAQS = [
  { question: 'Was ist die Düsseldorfer Tabelle?', answer: 'Die Düsseldorfer Tabelle ist eine Leitlinie des OLG Düsseldorf zur Bemessung des Kindesunterhalts. Sie wird jährlich aktualisiert und von allen Familiengerichten in Deutschland als Orientierung genutzt. Die Tabelle staffelt den Unterhalt nach Einkommen des Unterhaltspflichtigen und Alter des Kindes.' },
  { question: 'Wie wird der Unterhalt berechnet?', answer: 'Der Kindesunterhalt richtet sich nach dem bereinigten Nettoeinkommen des Unterhaltspflichtigen und dem Alter des Kindes. Vom Tabellenunterhalt wird das hälftige Kindergeld (bei Minderjährigen) abgezogen. Bei Volljährigen wird das volle Kindergeld angerechnet.' },
  { question: 'Was ist der Selbstbehalt?', answer: 'Der Selbstbehalt ist der Betrag, der dem Unterhaltspflichtigen mindestens verbleiben muss. Für Erwerbstätige beträgt er 1.450 € (2025), für Nicht-Erwerbstätige 1.200 €. Reicht das Einkommen nicht für den vollen Unterhalt, liegt ein Mangelfall vor.' },
  { question: 'Wird Kindergeld auf den Unterhalt angerechnet?', answer: 'Ja. Bei minderjährigen Kindern wird das hälftige Kindergeld (127,50 €) vom Tabellenunterhalt abgezogen. Bei volljährigen Kindern wird das volle Kindergeld (255 €) angerechnet. Der verbleibende Betrag ist der Zahlbetrag.' },
];

export const metadata: Metadata = {
  title: 'Unterhalt Rechner 2026 — Kindesunterhalt (Düsseldorfer Tabelle)',
  description: 'Berechnen Sie den Kindesunterhalt nach der Düsseldorfer Tabelle. Mit Kindergeld-Anrechnung und Mangelfallprüfung.',
  keywords: ['Unterhalt Rechner', 'Kindesunterhalt', 'Düsseldorfer Tabelle', 'Unterhalt berechnen 2026'],
  alternates: { canonical: '/unterhalt-rechner' },
};

export default function UnterhaltRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="unterhalt-rechner"
      title="Unterhalt Rechner 2026"
      subtitle="Berechnen Sie den Kindesunterhalt nach der Düsseldorfer Tabelle."
      jsonLd={{
        name: 'Unterhalt Rechner 2026',
        url: '/unterhalt-rechner',
        description: 'Kindesunterhalt nach Düsseldorfer Tabelle berechnen.',
      }}
      faqs={FAQS}
    >
      <UnterhaltForm />
    </CalculatorPageLayout>
  );
}
