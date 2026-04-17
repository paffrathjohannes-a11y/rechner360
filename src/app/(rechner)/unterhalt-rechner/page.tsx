import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { UnterhaltForm } from './unterhalt-form';

const FAQS = [
  { question: 'Was ist die Düsseldorfer Tabelle?', answer: 'Die Düsseldorfer Tabelle ist eine Leitlinie des OLG Düsseldorf zur Bemessung des Kindesunterhalts. Sie wird jährlich aktualisiert und von allen Familiengerichten in Deutschland als Orientierung genutzt. Die Tabelle staffelt den Unterhalt nach Einkommen des Unterhaltspflichtigen und Alter des Kindes.' },
  { question: 'Wie wird der Unterhalt berechnet?', answer: 'Der Kindesunterhalt richtet sich nach dem bereinigten Nettoeinkommen des Unterhaltspflichtigen und dem Alter des Kindes. Vom Tabellenunterhalt wird das hälftige Kindergeld (bei Minderjährigen) abgezogen. Bei Volljährigen wird das volle Kindergeld angerechnet.' },
  { question: 'Was ist der Selbstbehalt?', answer: 'Der Selbstbehalt ist der Betrag, der dem Unterhaltspflichtigen mindestens verbleiben muss. Für Erwerbstätige beträgt er 1.450 € (2025), für Nicht-Erwerbstätige 1.200 €. Reicht das Einkommen nicht für den vollen Unterhalt, liegt ein Mangelfall vor.' },
  { question: 'Wird Kindergeld auf den Unterhalt angerechnet?', answer: 'Ja. Bei minderjährigen Kindern wird das hälftige Kindergeld (127,50 €) vom Tabellenunterhalt abgezogen. Bei volljährigen Kindern wird das volle Kindergeld (255 €) angerechnet. Der verbleibende Betrag ist der Zahlbetrag.' },
  { question: 'Was ist bereinigtes Nettoeinkommen?', answer: 'Vom Nettoeinkommen werden berufsbedingte Aufwendungen (5% Pauschale oder Nachweis), Schulden und weitere Belastungen abgezogen. Das bereinigte Netto bestimmt die Einkommensgruppe in der Düsseldorfer Tabelle.' },
  { question: 'Was passiert bei einem Mangelfall?', answer: 'Ein Mangelfall liegt vor, wenn das Einkommen nicht für den vollen Unterhalt aller Berechtigten reicht. Dann wird der verfügbare Betrag anteilig auf die Kinder verteilt. Minderjährige Kinder haben Vorrang vor volljährigen.' },
  { question: 'Muss ich Unterhalt auch während der Ausbildung zahlen?', answer: 'Ja, Eltern schulden ihren Kindern Unterhalt bis zum Abschluss der ersten Berufsausbildung oder des Erststudiums. Bei einer Ausbildungsvergütung wird diese abzüglich 100 € ausbildungsbedingtem Mehrbedarf angerechnet.' },
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
      guideContent={
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-text">Kindesunterhalt nach der Düsseldorfer Tabelle 2026</h2>
          <p className="text-text-secondary leading-relaxed">
            Die <strong>Düsseldorfer Tabelle</strong> ist zwar kein Gesetz, wird aber von allen deutschen Familiengerichten
            als Leitlinie zur Bemessung des Kindesunterhalts angewendet. Sie teilt das bereinigte Nettoeinkommen des
            Unterhaltspflichtigen in 15 Einkommensgruppen und staffelt den Unterhalt nach Alter der Kinder (0–5, 6–11,
            12–17, 18+). Der Rechner oben ermittelt den <strong>Zahlbetrag</strong> — also die Summe, die tatsächlich
            monatlich zu überweisen ist, nach Abzug des anzurechnenden Kindergelds.
          </p>
          <h3 className="text-lg font-semibold text-text pt-2">Bereinigtes Nettoeinkommen — was zählt</h3>
          <p className="text-text-secondary leading-relaxed">
            Ausgangspunkt ist das monatliche Nettoeinkommen. Davon werden als berufsbedingte Aufwendungen pauschal 5 %
            abgezogen (oder höhere Kosten nach Nachweis), dazu kommen Zins- und Tilgungsleistungen für selbstgenutztes
            Wohneigentum sowie bestimmte Schulden und Belastungen. Das Ergebnis bestimmt Ihre Einkommensgruppe in der
            Tabelle.
          </p>
          <h3 className="text-lg font-semibold text-text pt-2">Kindergeld-Anrechnung</h3>
          <ul className="space-y-2 text-text-secondary">
            <li><strong>Minderjährige Kinder:</strong> Das <em>hälftige</em> Kindergeld (127,50 €) wird vom Tabellenunterhalt abgezogen. Grund: Beide Elternteile teilen sich die Bar- und Betreuungsunterhalts-Pflicht.</li>
            <li><strong>Volljährige Kinder (Ausbildung / Studium):</strong> Das <em>volle</em> Kindergeld (255 €) wird angerechnet — sie sind selbst Empfänger des Kindergelds, das auf ihren Unterhaltsanspruch angerechnet wird.</li>
          </ul>
          <h3 className="text-lg font-semibold text-text pt-2">Selbstbehalt und Mangelfall</h3>
          <p className="text-text-secondary leading-relaxed">
            Der Unterhaltspflichtige muss mindestens seinen <strong>Selbstbehalt</strong> behalten dürfen — 1.450 € bei
            Erwerbstätigen, 1.200 € bei Nicht-Erwerbstätigen (Stand Düsseldorfer Tabelle 2025/2026). Reicht das
            Einkommen nicht für den vollen Unterhalt aller berechtigten Kinder, liegt ein <strong>Mangelfall</strong> vor.
            Minderjährige und privilegierte volljährige Kinder bis 21 (bei allgemeinbildender Schule im Elternhaus)
            haben Vorrang. Der verbleibende Betrag wird anteilig verteilt.
          </p>
          <h3 className="text-lg font-semibold text-text pt-2">Wann ist eine Anpassung fällig?</h3>
          <p className="text-text-secondary leading-relaxed">
            Die Düsseldorfer Tabelle wird typischerweise jährlich zum 1. Januar aktualisiert. Zusätzlich können
            Einkommensänderungen (Jobwechsel, Arbeitslosigkeit, Gehaltserhöhung) ein Anpassungsverfahren auslösen —
            in beide Richtungen. Für die rechtssichere Neufestsetzung ist meist eine Jugendamtsurkunde oder ein
            gerichtlicher Beschluss nötig.
          </p>
        </section>
      }
    >
      <UnterhaltForm />
    </CalculatorPageLayout>
  );
}
