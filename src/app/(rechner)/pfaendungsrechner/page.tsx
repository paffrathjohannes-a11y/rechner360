import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';
import { PfaendungsForm } from './pfaendungs-form';
import { PFAENDUNGS_PAGES } from '@/data/programmatic/pfaendungs-pages';

const FAQS = [
  { question: 'Was ist die Pfändungsfreigrenze?', answer: 'Die Pfändungsfreigrenze ist der Betrag Ihres Nettoeinkommens, der nicht gepfändet werden darf. Sie sichert das Existenzminimum. Seit Juli 2025 liegt der Grundfreibetrag bei 1.555,00 € monatlich für Alleinstehende ohne Unterhaltspflichten; zum 01.07.2026 steigt er auf 1.587,40 €.' },
  { question: 'Wie erhöht sich die Freigrenze bei Unterhaltspflichten?', answer: 'Für die erste unterhaltsberechtigte Person erhöht sich die Freigrenze um 585,23 €, für die zweite bis fünfte Person um je 326,04 € (ab 01.07.2026: 597,42 € bzw. 332,83 €). Bei einer Person mit 2 Unterhaltspflichten liegt die Freigrenze damit bei 2.466,27 € (ab 01.07.2026: 2.517,65 €).' },
  { question: 'Wird das gesamte Einkommen über der Freigrenze gepfändet?', answer: 'Nein. Vom Mehrbetrag über der Freigrenze sind ohne Unterhaltspflichten 70% pfändbar. Mit Unterhaltspflichten sinkt die Quote: bei 1 Person 50%, je weitere Person 10 Prozentpunkte weniger (§ 850c Abs. 3 ZPO). Einkommen über dem Höchstbetrag (4.767 €, ab 01.07.2026: 4.866,30 €) ist voll pfändbar.' },
  { question: 'Wann werden die Pfändungsfreigrenzen angepasst?', answer: 'Die Pfändungsfreigrenzen werden jährlich zum 1. Juli angepasst, basierend auf der Entwicklung des steuerlichen Grundfreibetrags. Die letzte Anpassung erfolgte am 01.07.2025, die nächste folgt zum 01.07.2026 (Bekanntmachung vom 26.03.2026 bereits veröffentlicht).' },
  { question: 'Was ist ein P-Konto und wie schützt es mein Geld?', answer: 'Ein Pfändungsschutzkonto (P-Konto) schützt automatisch einen Grundfreibetrag von 1.560 € pro Monat (ab 01.07.2026: 1.590 €) vor Kontopfändung. Jede Bank muss ein bestehendes Girokonto kostenfrei in ein P-Konto umwandeln. Höhere Freibeträge sind mit Bescheinigung möglich.' },
  { question: 'Wird Weihnachtsgeld gepfändet?', answer: 'Weihnachtsgeld ist bis zur Hälfte des monatlichen Arbeitseinkommens, maximal 500 €, unpfändbar (§ 850a Nr. 4 ZPO). Darüber hinausgehende Beträge werden zum regulären Einkommen addiert und sind nach der Pfändungstabelle pfändbar.' },
  { question: 'Kann Arbeitslosengeld gepfändet werden?', answer: 'Ja, Arbeitslosengeld I ist grundsätzlich pfändbar und wird wie Arbeitseinkommen behandelt. Die gleichen Pfändungsfreigrenzen gelten. Bürgergeld bzw. die Grundsicherung ist hingegen unpfändbar, da es das Existenzminimum sichert.' },
];

export const metadata: Metadata = {
  title: 'Pfändungsrechner 2026 — Pfändungsfreigrenze berechnen',
  description: 'Berechnen Sie Ihre Pfändungsfreigrenze und den pfändbaren Betrag. Mit Unterhaltspflichten und aktuellem Freibetrag.',
  keywords: ['Pfändungsrechner', 'Pfändungsfreigrenze', 'Pfändbarer Betrag', 'Lohnpfändung Rechner'],
  alternates: { canonical: '/pfaendungsrechner' },
};

export default function PfaendungsrechnerPage() {
  return (
    <CalculatorPageLayout
      slug="pfaendungsrechner"
      title="Pfändungsrechner 2026"
      subtitle="Berechnen Sie Ihre Pfändungsfreigrenze und den pfändbaren Betrag Ihres Einkommens."
      jsonLd={{
        name: 'Pfändungsrechner 2026',
        url: '/pfaendungsrechner',
        description: 'Pfändungsfreigrenze und pfändbaren Betrag berechnen.',
      }}
      faqs={FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug.pfaendungsrechner.headline} offers={affiliateOffersBySlug.pfaendungsrechner.offers} />}
      guideContent={
        <>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text">Pfändungsfreigrenzen nach § 850c ZPO</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-surface-sunken">
                    <th className="px-4 py-2 text-left text-text font-medium">Unterhaltspflichten</th>
                    <th className="px-4 py-2 text-right text-text font-medium">bis 30.06.2026</th>
                    <th className="px-4 py-2 text-right text-text font-medium">ab 01.07.2026</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-t border-border"><td className="px-4 py-2">Keine</td><td className="px-4 py-2 text-right font-currency">1.555,00 €</td><td className="px-4 py-2 text-right font-currency">1.587,40 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">1 Person</td><td className="px-4 py-2 text-right font-currency">2.140,23 €</td><td className="px-4 py-2 text-right font-currency">2.184,82 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">2 Personen</td><td className="px-4 py-2 text-right font-currency">2.466,27 €</td><td className="px-4 py-2 text-right font-currency">2.517,65 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">3 Personen</td><td className="px-4 py-2 text-right font-currency">2.792,31 €</td><td className="px-4 py-2 text-right font-currency">2.850,48 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">4 Personen</td><td className="px-4 py-2 text-right font-currency">3.118,35 €</td><td className="px-4 py-2 text-right font-currency">3.183,31 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">5 Personen</td><td className="px-4 py-2 text-right font-currency">3.444,39 €</td><td className="px-4 py-2 text-right font-currency">3.516,14 €</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </>
      }
      programmaticVariants={{ pages: PFAENDUNGS_PAGES }}
    >
      <PfaendungsForm />
    </CalculatorPageLayout>
  );
}
