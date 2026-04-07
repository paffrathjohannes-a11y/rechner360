import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { BruttoNettoForm } from './brutto-netto-form';
import { BRUTTO_NETTO_FAQS } from '@/data/content/brutto-netto-guide';

export const metadata: Metadata = {
  title: 'Brutto Netto Rechner 2026 — Kostenlos & Aktuell',
  description:
    'Berechnen Sie schnell und genau, wie viel Netto von Ihrem Bruttogehalt übrig bleibt. Aktuell für 2026 gemäß BMF-Programmablaufplan. Kostenlos, ohne Registrierung.',
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
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Brutto Netto Rechner' }]} />

      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">
          Brutto Netto Rechner 2026
        </h1>
        <p className="text-text-secondary text-lg">
          Berechnen Sie Ihr Nettogehalt &mdash; aktuell gem&auml;&szlig; BMF-Programmablaufplan 2026.
        </p>
        <TrustSignals compact className="mt-3" />
      </div>

      <WebApplicationJsonLd
        name="Brutto Netto Rechner 2026"
        url="/brutto-netto-rechner"
        description="Kostenloser Brutto-Netto-Rechner 2026. Berechnen Sie Ihr Nettogehalt mit allen Abzügen."
      />

      <BruttoNettoForm />

      {/* SEO Guide Content */}
      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-text">So funktioniert der Brutto Netto Rechner</h2>
        <div className="space-y-3 text-text-secondary leading-relaxed">
          <p>
            Unser Brutto Netto Rechner berechnet pr&auml;zise, wie viel von Ihrem Bruttogehalt nach Abzug aller Steuern
            und Sozialversicherungsbeitr&auml;ge &uuml;brig bleibt. Die Berechnung basiert auf dem offiziellen
            Programmablaufplan (PAP) 2026 des Bundesministeriums der Finanzen und ber&uuml;cksichtigt alle aktuellen
            Steuer- und Sozialversicherungsparameter.
          </p>
          <p>
            Vom Bruttogehalt werden zun&auml;chst die Lohnsteuer (abh&auml;ngig von Steuerklasse und Einkommen), ggf.
            der Solidarit&auml;tszuschlag und die Kirchensteuer abgezogen. Zus&auml;tzlich fallen Beitr&auml;ge zur
            Krankenversicherung (14,6% + Zusatzbeitrag), Rentenversicherung (18,6%), Arbeitslosenversicherung (2,6%)
            und Pflegeversicherung (3,6% + ggf. Kinderlosenzuschlag) an &mdash; jeweils h&auml;lftig von Arbeitnehmer
            und Arbeitgeber getragen.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-text mt-8">Steuerklassen im &Uuml;berblick</h2>
        <div className="space-y-3 text-text-secondary leading-relaxed">
          <p>
            In Deutschland gibt es sechs Steuerklassen. <strong className="text-text">Steuerklasse I</strong> gilt f&uuml;r Ledige,
            <strong className="text-text"> Steuerklasse II</strong> f&uuml;r Alleinerziehende mit Entlastungsbetrag (4.260 &euro;).
            <strong className="text-text"> Steuerklasse III</strong> (Splitting) und <strong className="text-text">V</strong> sind
            f&uuml;r Ehepaare mit unterschiedlichem Einkommen. <strong className="text-text">Steuerklasse IV</strong> ist f&uuml;r
            Ehepaare mit &auml;hnlichem Einkommen. <strong className="text-text">Steuerklasse VI</strong> gilt f&uuml;r Zweit- und Nebenjobs.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-text mt-8">Sozialversicherung 2026 &mdash; die wichtigsten Werte</h2>
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
              <tr className="border-t border-border"><td className="px-4 py-2">Krankenversicherung</td><td className="px-4 py-2 text-right font-currency">14,6% + Zusatz</td><td className="px-4 py-2 text-right font-currency">5.812,50 &euro;</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">Rentenversicherung</td><td className="px-4 py-2 text-right font-currency">18,6%</td><td className="px-4 py-2 text-right font-currency">8.450 &euro;</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">Arbeitslosenversicherung</td><td className="px-4 py-2 text-right font-currency">2,6%</td><td className="px-4 py-2 text-right font-currency">8.450 &euro;</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">Pflegeversicherung</td><td className="px-4 py-2 text-right font-currency">3,6% + ggf. 0,6%</td><td className="px-4 py-2 text-right font-currency">5.812,50 &euro;</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <FAQSection faqs={BRUTTO_NETTO_FAQS} className="mt-8" />

      <RelatedCalculators currentSlug="brutto-netto-rechner" className="mt-8" />
    </div>
  );
}
