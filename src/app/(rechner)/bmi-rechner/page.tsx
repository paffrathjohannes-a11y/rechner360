import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';
import { BmiForm } from './bmi-form';
import { BMI_FAQS } from '@/data/content/bmi-guide';
import { BMI_PAGES } from '@/data/programmatic/bmi-pages';

export const metadata: Metadata = {
  title: 'BMI Rechner 2026 — Body-Mass-Index berechnen',
  description:
    'Berechnen Sie Ihren BMI kostenlos. Erfahren Sie ob Ihr Gewicht im gesunden Bereich liegt. Mit WHO-Klassifikation und Idealgewicht.',
  keywords: ['BMI Rechner', 'BMI berechnen', 'Body Mass Index', 'Idealgewicht', 'BMI Tabelle'],
  alternates: { canonical: '/bmi-rechner' },
  openGraph: {
    title: 'BMI Rechner 2026 — Body-Mass-Index berechnen | rechner360.de',
    description: 'Berechnen Sie Ihren BMI kostenlos. Mit WHO-Klassifikation und Idealgewicht.',
    url: '/bmi-rechner',
    type: 'website',
  },
};

export default function BmiRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="bmi-rechner"
      title="BMI Rechner"
      subtitle="Berechnen Sie Ihren Body-Mass-Index und erfahren Sie, ob Ihr Gewicht im gesunden Bereich liegt."
      jsonLd={{
        name: 'BMI Rechner',
        url: '/bmi-rechner',
        description: 'Kostenloser BMI Rechner. Body-Mass-Index berechnen mit WHO-Klassifikation und Idealgewicht.',
      }}
      faqs={BMI_FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug['bmi-rechner'].headline} offers={affiliateOffersBySlug['bmi-rechner'].offers} />}
      guideContent={
        <>
          {/* BMI Tabelle */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text">BMI Tabelle — WHO-Klassifikation</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-surface-sunken">
                    <th className="px-4 py-2 text-left text-text font-medium">Kategorie</th>
                    <th className="px-4 py-2 text-right text-text font-medium">BMI-Bereich</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-t border-border"><td className="px-4 py-2">Starkes Untergewicht</td><td className="px-4 py-2 text-right font-currency">&lt; 16,0</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Untergewicht</td><td className="px-4 py-2 text-right font-currency">16,0 – 18,4</td></tr>
                  <tr className="border-t border-border bg-accent-50/30 dark:bg-accent-900/10"><td className="px-4 py-2 font-medium text-accent-600">Normalgewicht</td><td className="px-4 py-2 text-right font-currency font-medium text-accent-600">18,5 – 24,9</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Übergewicht (Präadipositas)</td><td className="px-4 py-2 text-right font-currency">25,0 – 29,9</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Adipositas Grad I</td><td className="px-4 py-2 text-right font-currency">30,0 – 34,9</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Adipositas Grad II</td><td className="px-4 py-2 text-right font-currency">35,0 – 39,9</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Adipositas Grad III</td><td className="px-4 py-2 text-right font-currency">≥ 40,0</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted">
              Quelle: Weltgesundheitsorganisation (WHO). Der BMI ist ein grober Richtwert und berücksichtigt
              nicht Muskelmasse, Körperbau oder Altersunterschiede. Für eine individuelle Beurteilung
              konsultieren Sie bitte Ihren Arzt.
            </p>
          </section>

          {/* Guide Content */}
          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold text-text">Was ist der BMI?</h2>
            <div className="space-y-3 text-text-secondary leading-relaxed">
              <p>
                Der Body-Mass-Index (BMI) ist eine Maßzahl zur Bewertung des Körpergewichts
                in Relation zur Körpergröße. Er wird berechnet, indem das Gewicht in
                Kilogramm durch die Körpergröße in Metern zum Quadrat geteilt wird:
                <strong className="text-text"> BMI = Gewicht (kg) ÷ Größe (m)²</strong>.
              </p>
              <p>
                Ein BMI zwischen 18,5 und 24,9 gilt laut WHO als Normalgewicht. Werte darunter deuten
                auf Untergewicht hin, Werte darüber auf Übergewicht. Ab einem BMI von 30
                spricht man von Adipositas (Fettleibigkeit).
              </p>
            </div>

            <h2 className="text-2xl font-bold text-text mt-8">Grenzen des BMI</h2>
            <div className="space-y-3 text-text-secondary leading-relaxed">
              <p>
                Der BMI berücksichtigt nicht die Körperzusammensetzung. Sportler mit hohem
                Muskelanteil können einen hohen BMI haben, ohne übergewichtig zu sein.
                Umgekehrt kann ein normaler BMI bei geringer Muskelmasse und hohem Körperfettanteil
                täuschen. Für eine genauere Beurteilung können der Bauchumfang oder
                die Bioimpedanzanalyse herangezogen werden.
              </p>
            </div>
          </section>
        </>
      }
      programmaticVariants={{ pages: BMI_PAGES }}
    >
      <BmiForm />
    </CalculatorPageLayout>
  );
}
