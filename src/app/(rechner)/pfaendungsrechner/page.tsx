import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { PfaendungsForm } from './pfaendungs-form';

const FAQS = [
  { question: 'Was ist die Pf&auml;ndungsfreigrenze?', answer: 'Die Pf&auml;ndungsfreigrenze ist der Betrag Ihres Nettoeinkommens, der nicht gepf&auml;ndet werden darf. Sie sichert das Existenzminimum. Ab Juli 2023 liegt der Grundfreibetrag bei 1.402,28 &euro; monatlich f&uuml;r Alleinstehende ohne Unterhaltspflichten.' },
  { question: 'Wie erh&ouml;ht sich die Freigrenze bei Unterhaltspflichten?', answer: 'F&uuml;r die erste unterhaltspflichtige Person erh&ouml;ht sich die Freigrenze um 527,76 &euro;, f&uuml;r jede weitere Person um jeweils 294,02 &euro;. Bei einer Person mit 2 Unterhaltspflichten liegt die Freigrenze somit bei ca. 2.224 &euro;.' },
  { question: 'Wird das gesamte Einkommen &uuml;ber der Freigrenze gepf&auml;ndet?', answer: 'Nein. Vom Einkommen &uuml;ber der Freigrenze werden ca. 70% gepf&auml;ndet, 30% verbleiben beim Schuldner. Ab einer bestimmten Obergrenze (ca. 4.299 &euro; bei 0 Unterhaltspflichten) wird das gesamte Mehreinkommen gepf&auml;ndet.' },
  { question: 'Wann werden die Pf&auml;ndungsfreigrenzen angepasst?', answer: 'Die Pf&auml;ndungsfreigrenzen werden alle zwei Jahre zum 1. Juli angepasst, basierend auf dem steuerlichen Grundfreibetrag. Die letzte Anpassung erfolgte am 01.07.2023. Die n&auml;chste Anpassung ist f&uuml;r 01.07.2025 vorgesehen.' },
];

export const metadata: Metadata = {
  title: 'Pf\u00e4ndungsrechner 2026 \u2014 Pf\u00e4ndungsfreigrenze berechnen',
  description: 'Berechnen Sie Ihre Pf\u00e4ndungsfreigrenze und den pf\u00e4ndbaren Betrag. Mit Unterhaltspflichten und aktuellem Freibetrag.',
  keywords: ['Pf\u00e4ndungsrechner', 'Pf\u00e4ndungsfreigrenze', 'Pf\u00e4ndbarer Betrag', 'Lohnpf\u00e4ndung Rechner'],
  alternates: { canonical: '/pfaendungsrechner' },
};

export default function PfaendungsrechnerPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Pf\u00e4ndungsrechner' }]} />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">Pf&auml;ndungsrechner 2026</h1>
        <p className="text-text-secondary text-lg">Berechnen Sie Ihre Pf&auml;ndungsfreigrenze und den pf&auml;ndbaren Betrag Ihres Einkommens.</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name="Pf\u00e4ndungsrechner 2026" url="/pfaendungsrechner" description="Pf\u00e4ndungsfreigrenze und pf\u00e4ndbaren Betrag berechnen." />
      <PfaendungsForm />

      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-text">Pf&auml;ndungsfreigrenzen (ab 01.07.2023)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-surface-sunken">
                <th className="px-4 py-2 text-left text-text font-medium">Unterhaltspflichten</th>
                <th className="px-4 py-2 text-right text-text font-medium">Freigrenze/Monat</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-t border-border"><td className="px-4 py-2">Keine</td><td className="px-4 py-2 text-right font-currency">1.402,28 &euro;</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">1 Person</td><td className="px-4 py-2 text-right font-currency">1.930,04 &euro;</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">2 Personen</td><td className="px-4 py-2 text-right font-currency">2.224,06 &euro;</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">3 Personen</td><td className="px-4 py-2 text-right font-currency">2.518,08 &euro;</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">4 Personen</td><td className="px-4 py-2 text-right font-currency">2.812,10 &euro;</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">5 Personen</td><td className="px-4 py-2 text-right font-currency">3.106,12 &euro;</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <FAQSection faqs={FAQS} className="mt-8" />
      <RelatedCalculators currentSlug="pfaendungsrechner" className="mt-8" />
    </div>
  );
}
