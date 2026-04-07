import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { GrundsteuerForm } from './grundsteuer-form';

const FAQS = [
  { question: 'Wie berechnet sich die neue Grundsteuer?', answer: 'Die Grundsteuer ab 2025 wird berechnet als: Grundsteuerwert × Steuermesszahl × Hebesatz. Der Grundsteuerwert basiert auf dem Bodenwert (Fläche × Bodenrichtwert) und dem Gebäudewert. Die Steuermesszahl beträgt 0,031% für Wohngrundstücke.' },
  { question: 'Was ist der Hebesatz?', answer: 'Der Hebesatz wird von der jeweiligen Kommune festgelegt und variiert stark — typisch zwischen 200% und 900%. Er ist der größte Einflussfaktor auf die Höhe der Grundsteuer. Viele Kommunen haben ihre Hebesätze mit der Reform 2025 angepasst.' },
  { question: 'Was ist der Bodenrichtwert?', answer: 'Der Bodenrichtwert gibt den durchschnittlichen Quadratmeterpreis für Grundstücke in einer bestimmten Lage an. Er wird von den Gutachterausschüssen der Gemeinden ermittelt und ist öffentlich einsehbar (z.B. über BORIS).' },
  { question: 'Wird die Grundsteuer teurer durch die Reform?', answer: 'Das Ziel der Reform war Aufkommensneutralität — die Kommunen sollen insgesamt gleich viel einnehmen. Für einzelne Eigentümer kann die Grundsteuer aber steigen oder sinken, je nach Lage und Grundstückswert. Innenstadtlagen werden tendenziell teurer.' },
  { question: 'Gilt das Bundesmodell überall?', answer: 'Nein. Bayern, Baden-Württemberg, Hamburg, Hessen und Niedersachsen haben eigene Ländermodelle. Dieses Rechner nutzt das Bundesmodell, das in den meisten Bundesländern gilt.' },
];

export const metadata: Metadata = {
  title: 'Grundsteuer Rechner 2026 — Neue Grundsteuer berechnen',
  description: 'Berechnen Sie Ihre neue Grundsteuer nach der Reform 2025. Mit Bodenrichtwert, Hebesatz und Gebäudewert.',
  keywords: ['Grundsteuer Rechner', 'Grundsteuer berechnen', 'Grundsteuer Reform', 'Grundsteuer 2025 2026', 'Grundsteuerwert'],
  alternates: { canonical: '/grundsteuer-rechner' },
};

export default function GrundsteuerRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="grundsteuer-rechner"
      title="Grundsteuer Rechner 2026"
      subtitle="Berechnen Sie Ihre neue Grundsteuer nach der Reform 2025 — mit Bodenrichtwert und Hebesatz."
      jsonLd={{
        name: 'Grundsteuer Rechner 2026',
        url: '/grundsteuer-rechner',
        description: 'Neue Grundsteuer nach Reform 2025 berechnen.',
      }}
      faqs={FAQS}
      guideContent={
        <>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text">So berechnet sich die neue Grundsteuer</h2>
            <div className="space-y-3 text-text-secondary leading-relaxed">
              <p>
                Die Grundsteuerreform 2025 hat die Berechnung grundlegend geändert. Die Formel lautet:
              </p>
              <div className="rounded-lg bg-surface-raised p-4 text-center">
                <p className="font-currency font-semibold text-text text-lg">
                  Grundsteuer = Grundsteuerwert × Steuermesszahl × Hebesatz
                </p>
              </div>
              <p>
                Der <strong className="text-text">Grundsteuerwert</strong> basiert auf Bodenwert (Grundstücksfläche × Bodenrichtwert)
                und Gebäudewert (Wohnfläche × Normalherstellungskosten abzüglich Alterswertminderung).
                Die <strong className="text-text">Steuermesszahl</strong> beträgt 0,031% für Wohngrundstücke
                und 0,034% für Nichtwohngrundstücke. Der <strong className="text-text">Hebesatz</strong> wird
                von jeder Kommune individuell festgelegt.
              </p>
            </div>
          </section>
        </>
      }
    >
      <GrundsteuerForm />
    </CalculatorPageLayout>
  );
}
