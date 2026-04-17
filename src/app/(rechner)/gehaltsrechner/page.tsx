import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { GehaltsrechnerForm } from './gehaltsrechner-form';
import { GEHALTS_FAQS } from '@/data/content/gehalts-guide';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';

export const metadata: Metadata = {
  title: 'Gehaltsrechner 2026 — Netto-Vergleich aller Steuerklassen',
  description:
    'Brutto-Netto 2026 über alle Steuerklassen I–VI vergleichen. Mit Arbeitgeberkosten, Kinderfreibeträgen, Kirchensteuer und Bundesland-Auswahl.',
  alternates: { canonical: '/gehaltsrechner' },
};

export default function GehaltsrechnerPage() {
  return (
    <CalculatorPageLayout
      slug="gehaltsrechner"
      title="Gehaltsrechner 2026"
      subtitle="Vergleichen Sie Ihr Nettogehalt über alle Steuerklassen auf einen Blick."
      jsonLd={{ name: 'Gehaltsrechner 2026', url: '/gehaltsrechner', description: 'Kostenloser Gehaltsrechner 2026 mit Steuerklassen-Vergleich und Arbeitgeberkosten.' }}
      faqs={GEHALTS_FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug.gehaltsrechner.headline} offers={affiliateOffersBySlug.gehaltsrechner.offers} />}
      guideContent={
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-text">Vom Brutto zum Netto — so funktioniert der Gehaltsrechner 2026</h2>
          <p className="text-text-secondary leading-relaxed">
            Der Gehaltsrechner nutzt den <strong>offiziellen Programmablaufplan (PAP) 2026</strong> des Bundesfinanzministeriums —
            genau dieselbe Formel, die Ihr Arbeitgeber zur Lohnabrechnung verwendet. Vom Bruttogehalt werden zwei
            Blöcke abgezogen: Steuern (Lohnsteuer, Solidaritätszuschlag, ggf. Kirchensteuer) und Sozialabgaben
            (Kranken-, Pflege-, Renten- und Arbeitslosenversicherung). Der Rechner zeigt jeden einzelnen Abzug
            transparent auf.
          </p>
          <h3 className="text-lg font-semibold text-text pt-2">Die sechs Steuerklassen im Überblick</h3>
          <ul className="space-y-2 text-text-secondary">
            <li><strong>I — Ledige:</strong> Standard für Unverheiratete, Getrenntlebende, Geschiedene ohne Kind.</li>
            <li><strong>II — Alleinerziehende:</strong> Mit Entlastungsbetrag von 4.260 € plus 240 € pro weiterem Kind.</li>
            <li><strong>III — Besserverdienender Ehepartner:</strong> Höheres Netto, Partner dann in V.</li>
            <li><strong>IV — Ähnliches Einkommen:</strong> Standard für Verheiratete, ähnlich wie I. Mit Faktor noch genauer.</li>
            <li><strong>V — Gegenklasse zu III:</strong> Deutlich weniger Netto, Rest wird über ESt-Erklärung ausgeglichen.</li>
            <li><strong>VI — Zweitjob:</strong> Kein Grundfreibetrag, höchste Abzüge — nur für zusätzliche Arbeitsverhältnisse.</li>
          </ul>
          <h3 className="text-lg font-semibold text-text pt-2">Sozialabgaben 2026 im Überblick</h3>
          <p className="text-text-secondary leading-relaxed">
            Arbeitnehmer und Arbeitgeber teilen sich die Beiträge in der Regel paritätisch. 2026 gelten:
            Krankenversicherung <strong>14,6 %</strong> plus durchschnittlicher Zusatzbeitrag ca. <strong>2,9 %</strong>,
            Pflegeversicherung <strong>3,6 %</strong> (kinderlos ab 23: +0,6 % AN-Anteil), Rentenversicherung
            <strong> 18,6 %</strong>, Arbeitslosenversicherung <strong>2,6 %</strong>. Oberhalb der Beitragsbemessungsgrenzen
            (KV/PV: 5.812,50 €/Monat, RV/ALV: 8.450 €/Monat) entfällt die weitere Beitragspflicht.
          </p>
          <h3 className="text-lg font-semibold text-text pt-2">Steuerklassen-Wechsel: Wann lohnt er?</h3>
          <p className="text-text-secondary leading-relaxed">
            Ein Wechsel ist seit 2020 mehrmals im Jahr möglich. Besonders sinnvoll vor größeren Lebensereignissen:
            <strong> 7 Monate vor der Geburt</strong> (Elterngeld richtet sich nach dem Netto der letzten 12 Monate),
            bei drohender Arbeitslosigkeit (ALG I ebenfalls Netto-basiert) oder wenn ein Partner in Elternzeit geht.
            Der Nettoeffekt ist über die Jahressumme identisch — aber der Cashflow über das Jahr hinweg kann
            entscheidend sein.
          </p>
        </section>
      }
    >
      <GehaltsrechnerForm />
    </CalculatorPageLayout>
  );
}
