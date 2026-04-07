import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { BuergergeldForm } from './buergergeld-form';
import { BUERGERGELD_FAQS } from '@/data/content/buergergeld-guide';

export const metadata: Metadata = {
  title: 'B\u00fcrgergeld Rechner 2026 — Anspruch berechnen',
  description: 'Berechnen Sie Ihren B\u00fcrgergeld-Anspruch kostenlos. Regelbedarf, Kosten der Unterkunft und Freibetr\u00e4ge auf einen Blick.',
  keywords: ['B\u00fcrgergeld Rechner', 'B\u00fcrgergeld berechnen', 'B\u00fcrgergeld 2026', 'Regelbedarf', 'B\u00fcrgergeld H\u00f6he'],
  alternates: { canonical: '/buergergeld-rechner' },
};

export default function BuergergeldRechnerPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'B\u00fcrgergeld Rechner' }]} />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">Bürgergeld Rechner 2026</h1>
        <p className="text-text-secondary text-lg">Berechnen Sie Ihren Bürgergeld-Anspruch mit Regelbedarf, Kosten der Unterkunft und Freibeträgen.</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name="B\u00fcrgergeld Rechner 2026" url="/buergergeld-rechner" description="Kostenloser B\u00fcrgergeld Rechner 2026." />
      <BuergergeldForm />

      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-text">Bürgergeld Regelsätze 2025/2026</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-surface-sunken">
                <th className="px-4 py-2 text-left text-text font-medium">Regelbedarfsstufe</th>
                <th className="px-4 py-2 text-right text-text font-medium">Monatlich</th>
              </tr>
            </thead>
            <tbody className="text-text-secondary">
              <tr className="border-t border-border"><td className="px-4 py-2">Alleinstehende / Alleinerziehende</td><td className="px-4 py-2 text-right font-currency">563 €</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">Partner in Bedarfsgemeinschaft</td><td className="px-4 py-2 text-right font-currency">506 €</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">Jugendliche (14-17 Jahre)</td><td className="px-4 py-2 text-right font-currency">471 €</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">Kinder (6-13 Jahre)</td><td className="px-4 py-2 text-right font-currency">390 €</td></tr>
              <tr className="border-t border-border"><td className="px-4 py-2">Kinder (0-5 Jahre)</td><td className="px-4 py-2 text-right font-currency">357 €</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-text-muted">
          Zusätzlich zum Regelbedarf werden die Kosten der Unterkunft (Miete + Heizung) in angemessener
          Höhe übernommen. Die angemessene Höhe richtet sich nach dem örtlichen Mietspiegel.
        </p>
      </section>

      <FAQSection faqs={BUERGERGELD_FAQS} className="mt-8" />
      <RelatedCalculators currentSlug="buergergeld-rechner" className="mt-8" />
    </div>
  );
}
