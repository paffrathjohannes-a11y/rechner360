import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { BruttoNettoForm } from './brutto-netto-form';
import { BRUTTO_NETTO_FAQS } from '@/data/content/brutto-netto-guide';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';

export const metadata: Metadata = {
  title: 'Brutto Netto Rechner 2026 — Kostenlos & Aktuell',
  description:
    'Berechnen Sie schnell und genau, wie viel Netto von Ihrem Bruttogehalt übrig bleibt. Aktuell für 2026 nach den offiziellen Steuerformeln. Kostenlos, ohne Registrierung.',
  keywords: [
    'Brutto Netto Rechner',
    'Brutto Netto Rechner 2026',
    'Gehaltsrechner',
    'Nettolohn berechnen',
    'Lohnsteuerrechner',
  ],
  alternates: { canonical: '/brutto-netto-rechner' },
  openGraph: {
    title: 'Brutto Netto Rechner 2026 — Kostenlos & Aktuell | rechner360.de',
    description: 'Berechnen Sie schnell und genau, wie viel Netto von Ihrem Bruttogehalt übrig bleibt.',
    url: '/brutto-netto-rechner',
    type: 'website',
  },
};

export default function BruttoNettoRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="brutto-netto-rechner"
      title="Brutto Netto Rechner 2026"
      subtitle="Berechnen Sie Ihr Nettogehalt — aktuell nach den offiziellen Steuerformeln 2026."
      jsonLd={{
        name: 'Brutto Netto Rechner 2026',
        url: '/brutto-netto-rechner',
        description: 'Kostenloser Brutto-Netto-Rechner 2026. Berechnen Sie Ihr Nettogehalt mit allen Abzügen.',
      }}
      faqs={BRUTTO_NETTO_FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug['brutto-netto-rechner'].headline} offers={affiliateOffersBySlug['brutto-netto-rechner'].offers} />}
      guideContent={
        <>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text">So funktioniert der Brutto Netto Rechner</h2>
            <div className="space-y-3 text-text-secondary leading-relaxed">
              <p>
                Unser Brutto Netto Rechner berechnet präzise, wie viel von Ihrem Bruttogehalt nach Abzug aller Steuern
                und Sozialversicherungsbeiträge übrig bleibt. Die Berechnung basiert auf dem offiziellen
                offiziellen Steuerberechnungsformeln des Bundesfinanzministeriums für 2026 und berücksichtigt alle aktuellen
                Steuer- und Sozialversicherungsparameter.
              </p>
              <p>
                Vom Bruttogehalt werden zunächst die Lohnsteuer (abhängig von Steuerklasse und Einkommen), ggf.
                der Solidaritätszuschlag und die Kirchensteuer abgezogen. Zusätzlich fallen Beiträge zur
                Krankenversicherung (14,6% + Zusatzbeitrag), Rentenversicherung (18,6%), Arbeitslosenversicherung (2,6%)
                und Pflegeversicherung (3,6% + ggf. Kinderlosenzuschlag) an — jeweils hälftig von Arbeitnehmer
                und Arbeitgeber getragen.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-text mt-8">Steuerklassen im Überblick</h2>
            <div className="space-y-3 text-text-secondary leading-relaxed">
              <p>
                In Deutschland gibt es sechs Steuerklassen. <strong className="text-text">Steuerklasse I</strong> gilt für Ledige,
                <strong className="text-text"> Steuerklasse II</strong> für Alleinerziehende mit Entlastungsbetrag (4.260 €).
                <strong className="text-text"> Steuerklasse III</strong> (Splitting) und <strong className="text-text">Steuerklasse V</strong> sind
                für Ehepaare mit unterschiedlichem Einkommen. <strong className="text-text">Steuerklasse IV</strong> ist für
                Ehepaare mit ähnlichem Einkommen. <strong className="text-text">Steuerklasse VI</strong> gilt für Zweit- und Nebenjobs.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-text mt-8">Sozialversicherung 2026 — die wichtigsten Werte</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-surface-sunken">
                    <th className="px-4 py-2 text-left text-text font-medium">Versicherungszweig</th>
                    <th className="px-4 py-2 text-right text-text font-medium">Beitragssatz</th>
                    <th className="px-4 py-2 text-right text-text font-medium">BBG/Monat</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-t border-border"><td className="px-4 py-2">Krankenversicherung</td><td className="px-4 py-2 text-right font-currency">14,6% + Zusatz</td><td className="px-4 py-2 text-right font-currency">5.812,50 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Rentenversicherung</td><td className="px-4 py-2 text-right font-currency">18,6%</td><td className="px-4 py-2 text-right font-currency">8.450 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Arbeitslosenversicherung</td><td className="px-4 py-2 text-right font-currency">2,6%</td><td className="px-4 py-2 text-right font-currency">8.450 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Pflegeversicherung</td><td className="px-4 py-2 text-right font-currency">3,6% + ggf. 0,6%</td><td className="px-4 py-2 text-right font-currency">5.812,50 €</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </>
      }
    >
      <BruttoNettoForm />
    </CalculatorPageLayout>
  );
}
