import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { ElterngeldForm } from './elterngeld-form';
import { ELTERNGELD_FAQS } from '@/data/content/elterngeld-guide';

export const metadata: Metadata = {
  title: 'Elterngeld Rechner 2026 — Basiselterngeld & ElterngeldPlus',
  description:
    'Berechnen Sie Ihr Elterngeld kostenlos. Basiselterngeld, ElterngeldPlus, Geschwisterbonus und Mehrlingszuschlag. Aktuell für 2026.',
  keywords: ['Elterngeld Rechner', 'Elterngeld berechnen', 'Basiselterngeld', 'ElterngeldPlus', 'Elterngeld 2026'],
  alternates: { canonical: '/elterngeld-rechner' },
};

export default function ElterngeldRechnerPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Elterngeld Rechner' }]} />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">Elterngeld Rechner 2026</h1>
        <p className="text-text-secondary text-lg">
          Berechnen Sie Ihr Elterngeld &mdash; Basiselterngeld oder ElterngeldPlus mit Geschwisterbonus.
        </p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name="Elterngeld Rechner 2026" url="/elterngeld-rechner" description="Kostenloser Elterngeld Rechner 2026." />
      <ElterngeldForm />

      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-text">Wie wird das Elterngeld berechnet?</h2>
        <div className="space-y-3 text-text-secondary leading-relaxed">
          <p>
            Das Elterngeld ersetzt einen Teil des wegfallenden Einkommens nach der Geburt eines Kindes.
            Die H&ouml;he richtet sich nach dem durchschnittlichen monatlichen Nettoeinkommen der letzten
            12 Monate vor der Geburt.
          </p>
          <p>
            Die <strong className="text-text">Ersatzrate</strong> betr&auml;gt grunds&auml;tzlich 65-67%
            des Nettoeinkommens. Bei niedrigem Einkommen (unter 1.000 &euro;) steigt die Ersatzrate
            schrittweise auf bis zu 100%. Das <strong className="text-text">Basiselterngeld</strong> liegt
            zwischen 300 &euro; und 1.800 &euro; monatlich f&uuml;r bis zu 12 Monate (14 mit Partnermonaten).
          </p>
          <p>
            <strong className="text-text">ElterngeldPlus</strong> betr&auml;gt die H&auml;lfte des
            Basiselterngelds (150-900 &euro;), wird aber doppelt so lang gezahlt (bis zu 24 Monate).
            Es lohnt sich besonders f&uuml;r Eltern, die nach der Geburt in Teilzeit arbeiten m&ouml;chten.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-text mt-8">Elterngeld-Tabelle</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-surface-sunken">
                <th className="px-4 py-2 text-left text-text font-medium">Nettoeinkommen</th>
                <th className="px-4 py-2 text-right text-text font-medium">Ersatzrate</th>
                <th className="px-4 py-2 text-right text-text font-medium">Basiselterngeld</th>
                <th className="px-4 py-2 text-right text-text font-medium">ElterngeldPlus</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-t border-border"><td className="px-4 py-2">0 &euro;</td><td className="px-4 py-2 text-right">—</td><td className="px-4 py-2 text-right font-currency">300 &euro;</td><td className="px-4 py-2 text-right font-currency">150 &euro;</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">500 &euro;</td><td className="px-4 py-2 text-right">92%</td><td className="px-4 py-2 text-right font-currency">460 &euro;</td><td className="px-4 py-2 text-right font-currency">230 &euro;</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">1.000 &euro;</td><td className="px-4 py-2 text-right">67%</td><td className="px-4 py-2 text-right font-currency">670 &euro;</td><td className="px-4 py-2 text-right font-currency">335 &euro;</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">2.000 &euro;</td><td className="px-4 py-2 text-right">65%</td><td className="px-4 py-2 text-right font-currency">1.300 &euro;</td><td className="px-4 py-2 text-right font-currency">650 &euro;</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">3.000 &euro;</td><td className="px-4 py-2 text-right">60%</td><td className="px-4 py-2 text-right font-currency">1.800 &euro;</td><td className="px-4 py-2 text-right font-currency">900 &euro;</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <FAQSection faqs={ELTERNGELD_FAQS} className="mt-8" />
      <RelatedCalculators currentSlug="elterngeld-rechner" className="mt-8" />
    </div>
  );
}
