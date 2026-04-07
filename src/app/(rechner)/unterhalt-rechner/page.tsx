import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { UnterhaltForm } from './unterhalt-form';

const FAQS = [
  { question: 'Was ist die Düsseldorfer Tabelle?', answer: 'Die Düsseldorfer Tabelle ist eine Leitlinie des OLG Düsseldorf zur Bemessung des Kindesunterhalts. Sie wird jährlich aktualisiert und von allen Familiengerichten in Deutschland als Orientierung genutzt. Die Tabelle staffelt den Unterhalt nach Einkommen des Unterhaltspflichtigen und Alter des Kindes.' },
  { question: 'Wie wird der Unterhalt berechnet?', answer: 'Der Kindesunterhalt richtet sich nach dem bereinigten Nettoeinkommen des Unterhaltspflichtigen und dem Alter des Kindes. Vom Tabellenunterhalt wird das hälftige Kindergeld (bei Minderjährigen) abgezogen. Bei Volljährigen wird das volle Kindergeld angerechnet.' },
  { question: 'Was ist der Selbstbehalt?', answer: 'Der Selbstbehalt ist der Betrag, der dem Unterhaltspflichtigen mindestens verbleiben muss. Für Erwerbstätige beträgt er 1.450 € (2025), für Nicht-Erwerbstätige 1.200 €. Reicht das Einkommen nicht für den vollen Unterhalt, liegt ein Mangelfall vor.' },
  { question: 'Wird Kindergeld auf den Unterhalt angerechnet?', answer: 'Ja. Bei minderjährigen Kindern wird das hälftige Kindergeld (127,50 €) vom Tabellenunterhalt abgezogen. Bei volljährigen Kindern wird das volle Kindergeld (255 €) angerechnet. Der verbleibende Betrag ist der Zahlbetrag.' },
];

export const metadata: Metadata = {
  title: 'Unterhalt Rechner 2026 — Kindesunterhalt (D\u00fcsseldorfer Tabelle)',
  description: 'Berechnen Sie den Kindesunterhalt nach der D\u00fcsseldorfer Tabelle. Mit Kindergeld-Anrechnung und Mangelfallpr\u00fcfung.',
  keywords: ['Unterhalt Rechner', 'Kindesunterhalt', 'D\u00fcsseldorfer Tabelle', 'Unterhalt berechnen 2026'],
  alternates: { canonical: '/unterhalt-rechner' },
};

export default function UnterhaltRechnerPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Unterhalt Rechner' }]} />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">Unterhalt Rechner 2026</h1>
        <p className="text-text-secondary text-lg">Berechnen Sie den Kindesunterhalt nach der Düsseldorfer Tabelle.</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name="Unterhalt Rechner 2026" url="/unterhalt-rechner" description="Kindesunterhalt nach D\u00fcsseldorfer Tabelle berechnen." />
      <UnterhaltForm />
      <FAQSection faqs={FAQS} className="mt-12" />
      <RelatedCalculators currentSlug="unterhalt-rechner" className="mt-8" />
    </div>
  );
}
