import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { BaukostenForm } from './baukosten-form';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';

const FAQS = [
  { question: 'Was kostet ein Haus bauen 2026?', answer: 'Die reinen Baukosten liegen 2026 bei ca. 1.800-3.500 €/m² je nach Ausstattung und Bauweise. Für ein Einfamilienhaus mit 140 m² in mittlerer Ausstattung sind das ca. 308.000 € Baukosten. Mit Grundstück, Nebenkosten und Außenanlagen rechnet man mit 450.000-600.000 € Gesamtkosten.' },
  { question: 'Was ist günstiger: Massivhaus oder Fertighaus?', answer: 'Fertighaus ist im Schnitt 10-15% günstiger als Massivbau. Dafür bietet ein Massivhaus höheren Wiederverkaufswert, besseren Schallschutz und längere Lebensdauer. Die Bauzeit ist beim Fertighaus deutlich kürzer (Aufbau in 1-2 Tagen vs. Monate).' },
  { question: 'Was sind Baunebenkosten?', answer: 'Baunebenkosten umfassen Architektenhonorar (ca. 10-15%), Statik, Baugenehmigung, Vermessung, Baustrom/-wasser, Versicherungen und Gutachten. Sie machen ca. 15-20% der reinen Baukosten aus und werden oft unterschätzt.' },
  { question: 'Lohnt sich ein Keller?', answer: 'Ein Keller kostet ca. 40.000-60.000 € zusätzlich, schafft aber 40-60 m² zusätzliche Nutzfläche. Pro m² ist Kellerfläche damit deutlich günstiger als Wohnfläche. Ohne Keller braucht man ggf. einen größeren Hauswirtschaftsraum und externen Stauraum.' },
  { question: 'Wie berechnet man die Baukosten pro Quadratmeter?', answer: 'Die Baukosten pro m² beziehen sich auf die Wohnfläche und umfassen die Kostengruppen 300 (Baukonstruktion) und 400 (Technische Anlagen) nach DIN 276. Grundstück, Außenanlagen und Baunebenkosten kommen extra dazu.' },
];

export const metadata: Metadata = {
  title: 'Baukosten Rechner 2026 — Hausbau Kosten berechnen',
  description: 'Berechnen Sie die Baukosten f\u00fcr Ihr Haus. Kosten pro m\u00b2, Massiv vs. Fertighaus, Keller, Garage und Baunebenkosten.',
  keywords: ['Baukosten Rechner', 'Hausbau Kosten', 'Baukosten pro qm', 'Was kostet Haus bauen', 'Baukosten 2026'],
  alternates: { canonical: '/baukosten-rechner' },
};

export default function BaukostenRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="baukosten-rechner"
      title="Baukosten Rechner 2026"
      subtitle="Berechnen Sie die Baukosten für Ihr Haus — nach Ausstattung, Bauweise und Region."
      jsonLd={{ name: 'Baukosten Rechner 2026', url: '/baukosten-rechner', description: 'Hausbaukosten berechnen: pro m\u00b2, Massiv vs. Fertighaus, mit Keller und Nebenkosten.' }}
      faqs={FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug['baukosten-rechner'].headline} offers={affiliateOffersBySlug['baukosten-rechner'].offers} />}
      guideContent={
        <section className="space-y-4 mt-12">
          <h2 className="text-2xl font-bold text-text">Baukosten pro m² nach Ausstattung (2026)</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-surface-sunken">
                  <th className="px-4 py-2 text-left text-text font-medium">Ausstattung</th>
                  <th className="px-4 py-2 text-right text-text font-medium">Massivhaus</th>
                  <th className="px-4 py-2 text-right text-text font-medium">Fertighaus</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-t border-border"><td className="px-4 py-2">Einfach</td><td className="px-4 py-2 text-right font-currency">1.800 €/m²</td><td className="px-4 py-2 text-right font-currency">1.600 €/m²</td></tr>
                <tr className="border-t border-border bg-accent-50/20 dark:bg-accent-900/5"><td className="px-4 py-2 font-medium">Mittel (Standard)</td><td className="px-4 py-2 text-right font-currency font-medium">2.200 €/m²</td><td className="px-4 py-2 text-right font-currency font-medium">2.000 €/m²</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2">Gehoben</td><td className="px-4 py-2 text-right font-currency">2.800 €/m²</td><td className="px-4 py-2 text-right font-currency">2.500 €/m²</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2">Luxus</td><td className="px-4 py-2 text-right font-currency">3.500 €/m²</td><td className="px-4 py-2 text-right font-currency">3.200 €/m²</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-text-muted">
            Durchschnittswerte für Deutschland 2025/2026 inkl. KG 300+400 nach DIN 276.
            Regionale Abweichungen: ländliche Gebiete ca. -15%, Großstädte ca. +25%.
          </p>
        </section>
      }
    >
      <BaukostenForm />
    </CalculatorPageLayout>
  );
}
