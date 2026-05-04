import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { EinkommensteuerForm } from './einkommensteuer-form';
import { EINKOMMENSTEUER_FAQS } from '@/data/content/einkommensteuer-guide';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';

export const metadata: Metadata = {
  title: 'Einkommensteuerrechner 2026 — Steuer berechnen',
  description: 'Berechnen Sie Ihre Einkommensteuer 2026 kostenlos. Mit Grundfreibetrag, Solidaritätszuschlag, Kirchensteuer und Grenzsteuersatz.',
  keywords: ['Einkommensteuerrechner', 'Einkommensteuer berechnen', 'Einkommensteuer 2026', 'Steuertarif', 'Grenzsteuersatz'],
  alternates: { canonical: '/einkommensteuer-rechner' },
};

export default function EinkommensteuerRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="einkommensteuer-rechner"
      title="Einkommensteuerrechner 2026"
      subtitle="Berechnen Sie Ihre Einkommensteuer mit Grenzsteuersatz, Solidaritätszuschlag und Kirchensteuer."
      jsonLd={{
        name: 'Einkommensteuerrechner 2026',
        url: '/einkommensteuer-rechner',
        description: 'Kostenloser Einkommensteuerrechner 2026.',
      }}
      faqs={EINKOMMENSTEUER_FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug['einkommensteuer-rechner'].headline} offers={affiliateOffersBySlug['einkommensteuer-rechner'].offers} />}
      guideContent={
        <>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text">Einkommensteuertarif 2026 (§32a EStG)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-surface-sunken">
                    <th className="px-4 py-2 text-left text-text font-medium">Zone</th>
                    <th className="px-4 py-2 text-right text-text font-medium">Einkommen (zvE)</th>
                    <th className="px-4 py-2 text-right text-text font-medium">Steuersatz</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-t border-border"><td className="px-4 py-2">Grundfreibetrag</td><td className="px-4 py-2 text-right font-currency">0 – 12.348 €</td><td className="px-4 py-2 text-right">0 %</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Progressionszone I</td><td className="px-4 py-2 text-right font-currency">12.349 – 17.799 €</td><td className="px-4 py-2 text-right">14 – 24 %</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Progressionszone II</td><td className="px-4 py-2 text-right font-currency">17.800 – 69.878 €</td><td className="px-4 py-2 text-right">24 – 42 %</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Spitzensteuersatz</td><td className="px-4 py-2 text-right font-currency">69.879 – 277.825 €</td><td className="px-4 py-2 text-right">42 %</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Reichensteuersatz</td><td className="px-4 py-2 text-right font-currency">ab 277.826 €</td><td className="px-4 py-2 text-right">45 %</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted">
              Berechnung erfolgt nach dem offiziellen BMF Programmablaufplan 2026. Grundfreibetrag: 12.348 € (Ledige) / 24.696 € (Verheiratete).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text">Vom Bruttoeinkommen zum zu versteuernden Einkommen</h2>
            <p className="text-text-secondary leading-relaxed">
              Die Einkommensteuer wird nicht auf das Bruttogehalt berechnet, sondern auf das
              <strong> zu versteuernde Einkommen (zvE)</strong>. Der Weg dorthin ist im
              Einkommensteuergesetz gesetzlich vorgegeben (§ 2 EStG) und reduziert die Bemessungsgrundlage
              meist deutlich:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-text-secondary">
              <li><strong>Summe der Einkünfte</strong> aus allen sieben Einkunftsarten (z. B. nichtselbstständige Arbeit, Kapitalerträge, Vermietung).</li>
              <li><strong>Minus Werbungskosten</strong> bzw. Pauschbetrag (1.230 € bei Arbeitnehmern, höher bei tatsächlichem Nachweis).</li>
              <li><strong>Minus Sonderausgaben</strong>: Vorsorgeaufwendungen (gesetzliche und private), Kirchensteuer, Spenden, Kinderbetreuung, Schulgeld.</li>
              <li><strong>Minus außergewöhnliche Belastungen</strong>: Krankheits-, Pflege-, Bestattungskosten oberhalb der zumutbaren Eigenbelastung.</li>
              <li><strong>Minus Freibeträge</strong>: Grundfreibetrag, Kinderfreibetrag (sofern günstiger als Kindergeld), Entlastungsbetrag für Alleinerziehende.</li>
            </ol>
            <p className="text-text-secondary leading-relaxed">
              Erst auf das so ermittelte zvE wird der Tarif aus § 32a EStG angewendet. Auf die berechnete
              Einkommensteuer kommen Solidaritätszuschlag (5,5 % der ESt, faktisch nur ab ca. 73.500 €
              zvE für Ledige) und ggf. Kirchensteuer (8 % oder 9 % der ESt, je nach Bundesland).
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text">Grenzsteuersatz vs. Durchschnittssteuersatz</h2>
            <p className="text-text-secondary leading-relaxed">
              Die wohl am häufigsten verwechselten Begriffe im deutschen Steuerrecht. Der
              <strong> Grenzsteuersatz</strong> ist der Steuersatz, mit dem der zuletzt verdiente Euro
              besteuert wird — relevant für die Frage „Was bleibt mir von einer Gehaltserhöhung netto übrig?&ldquo;.
              Der <strong>Durchschnittssteuersatz</strong> ist die tatsächliche Steuerlast geteilt durch das
              zvE — relevant für die Frage „Wie hoch ist meine Gesamtbelastung?&ldquo;.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Beispiel: Bei einem zu versteuernden Einkommen von 60.000 € (Ledige, 2026) liegt die
              Einkommensteuer bei rund 14.330 €. Der Durchschnittssteuersatz beträgt also etwa 23,9 %, der
              Grenzsteuersatz aber rund 38 %. Eine Gehaltserhöhung von 1.000 € brutto wird daher nur mit
              etwa 620 € netto wirksam — vor SV-Abgaben. Diese Differenz ist die Grundlage für nahezu jede
              Optimierungs-Strategie: Ehegattensplitting, Freibetrag-Eintragung in den Lohnsteuerklassen,
              gezielte Verlagerung von Werbungskosten in Hochsteuer-Jahre, Verlustverrechnung über
              Veranlagungszeiträume.
            </p>
            <h3 className="text-lg font-semibold text-text pt-2">Wichtige Sonderfälle</h3>
            <ul className="space-y-2 text-text-secondary">
              <li><strong>Ehegattensplitting:</strong> Verheiratete werden zusammen veranlagt, das gemeinsame zvE wird halbiert, der Tarif darauf angewendet, das Ergebnis verdoppelt. Spürbarer Vorteil bei ungleichen Einkommen.</li>
              <li><strong>Progressionsvorbehalt:</strong> Steuerfreie Lohnersatzleistungen (Arbeitslosengeld, Krankengeld, Elterngeld, Kurzarbeitergeld) erhöhen den Steuersatz auf das übrige Einkommen.</li>
              <li><strong>Abgeltungssteuer:</strong> Kapitalerträge oberhalb des Sparerpauschbetrags (1.000 € / 2.000 €) werden pauschal mit 25 % + Soli besteuert, nicht im Tarif.</li>
              <li><strong>Außerordentliche Einkünfte:</strong> Abfindungen können mit der Fünftelregelung (§ 34 EStG) glatt gezogen werden — senkt die Belastung deutlich, wenn das laufende Einkommen niedrig ist.</li>
            </ul>
          </section>
        </>
      }
    >
      <EinkommensteuerForm />
    </CalculatorPageLayout>
  );
}
