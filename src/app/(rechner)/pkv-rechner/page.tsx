import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { PkvForm } from './pkv-form';
import { PKV_FAQS } from '@/data/content/pkv-guide';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';
import { PKV_PAGES } from '@/data/programmatic/pkv-pages';

export const metadata: Metadata = {
  title: 'PKV Rechner 2026 — Private vs. Gesetzliche Krankenversicherung',
  description:
    'PKV oder GKV? Vergleichen Sie Ihre Beiträge und finden Sie heraus, ob sich ein Wechsel in die private Krankenversicherung lohnt. Aktuell für 2026.',
  keywords: [
    'PKV Rechner',
    'PKV GKV Vergleich',
    'Private Krankenversicherung Rechner',
    'PKV Beitrag berechnen',
    'PKV oder GKV',
    'Krankenversicherung Vergleich 2026',
  ],
  alternates: { canonical: '/pkv-rechner' },
  openGraph: {
    title: 'PKV Rechner 2026 — Private vs. Gesetzliche Krankenversicherung | rechner360.de',
    description: 'PKV oder GKV? Vergleichen Sie Ihre Beiträge und finden Sie heraus, ob sich ein Wechsel lohnt.',
    url: '/pkv-rechner',
    type: 'website',
  },
};

export default function PkvRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="pkv-rechner"
      title="PKV Rechner 2026"
      subtitle="Vergleichen Sie GKV und PKV — lohnt sich ein Wechsel in die private Krankenversicherung?"
      jsonLd={{
        name: 'PKV Rechner 2026',
        url: '/pkv-rechner',
        description: 'Kostenloser PKV-Rechner 2026. GKV vs. PKV Beitragsvergleich mit Empfehlung.',
      }}
      faqs={PKV_FAQS}
      affiliateSection={affiliateOffersBySlug['pkv-rechner'] ? <AffiliateBox headline={affiliateOffersBySlug['pkv-rechner'].headline} offers={affiliateOffersBySlug['pkv-rechner'].offers} /> : undefined}
      guideContent={
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-text">PKV vs. GKV — Die wichtigsten Unterschiede</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-surface-sunken">
                  <th className="px-4 py-2 text-left text-text font-medium">Kriterium</th>
                  <th className="px-4 py-2 text-left text-text font-medium">GKV</th>
                  <th className="px-4 py-2 text-left text-text font-medium">PKV</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium text-text">Beitrag</td><td className="px-4 py-2">Einkommensabhängig (max. BBG)</td><td className="px-4 py-2">Alter + Gesundheit + Tarif</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium text-text">Leistungen</td><td className="px-4 py-2">Gesetzlich festgelegt</td><td className="px-4 py-2">Individuell wählbar, oft umfangreicher</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium text-text">Familienversicherung</td><td className="px-4 py-2">Kostenlos für Ehepartner + Kinder</td><td className="px-4 py-2">Jedes Familienmitglied zahlt eigenen Beitrag</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium text-text">Beitrag im Alter</td><td className="px-4 py-2">Sinkt mit Rente (niedrigeres Einkommen)</td><td className="px-4 py-2">Steigt tendenziell (Altersrückstellungen federn ab)</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium text-text">Rückwechsel</td><td className="px-4 py-2">Jederzeit möglich</td><td className="px-4 py-2">Nur unter bestimmten Bedingungen, ab 55 kaum möglich</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2 font-medium text-text">Wartezeiten</td><td className="px-4 py-2">Keine</td><td className="px-4 py-2">Facharzttermine oft schneller</td></tr>
              </tbody>
            </table>
          </div>
        </section>
      }
      programmaticVariants={{ pages: PKV_PAGES }}
    >
      <PkvForm />
    </CalculatorPageLayout>
  );
}
