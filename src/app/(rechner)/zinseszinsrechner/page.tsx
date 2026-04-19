import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { ZinseszinsForm } from './zinseszins-form';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';
import { ZinsTicker } from '@/components/calculator/zins-ticker';
import { getCurrentRates } from '@/lib/rates/fetch-rates';
import { ZINSESZINS_PAGES } from '@/data/programmatic/zinseszins-pages';

const FAQS = [
  { question: 'Was ist der Zinseszinseffekt?', answer: 'Beim Zinseszins werden nicht nur das Startkapital, sondern auch die bereits angefallenen Zinsen verzinst. Dadurch wächst das Vermögen exponentiell — je länger der Anlagezeitraum, desto stärker der Effekt. Albert Einstein soll ihn als „achtes Weltwunder" bezeichnet haben.' },
  { question: 'Wie berechnet man Zinseszins?', answer: 'Die Formel lautet: Endkapital = Startkapital × (1 + Zinssatz)^Jahre. Bei monatlicher Sparrate wird zusätzlich die Sparplanformel angewendet. Unser Rechner berücksichtigt beides automatisch.' },
  { question: 'Wie lange dauert es, sein Geld zu verdoppeln?', answer: 'Die „72er-Regel" gibt eine schnelle Schätzung: 72 ÷ Zinssatz = Jahre bis zur Verdopplung. Bei 6% Rendite dauert es ca. 12 Jahre (72÷6=12), bei 3% ca. 24 Jahre.' },
  { question: 'Welche Rendite ist realistisch?', answer: 'Tagesgeld: 1-3%, Festgeld: 2-4%, Anleihen: 3-5%, Aktien-ETFs (langfristig): 7-9% p.a. im Durchschnitt. Die reale Rendite (nach Inflation) liegt typisch 2-3% niedriger.' },
  { question: 'Was bringt ein ETF-Sparplan mit 100 € monatlich?', answer: 'Bei 7% durchschnittlicher Rendite und 100 €/Monat ergibt sich nach 10 Jahren ca. 17.300 €, nach 20 Jahren ca. 52.000 € und nach 30 Jahren ca. 122.000 € — bei nur 36.000 € eigenen Einzahlungen. Der Rest ist Zinseszins.' },
  { question: 'Wie wirkt sich die Sparrate auf das Endergebnis aus?', answer: 'Kleine Unterschiede in der monatlichen Sparrate haben langfristig große Auswirkungen. 50 € mehr pro Monat bei 7% Rendite ergeben nach 30 Jahren ca. 61.000 € zusätzliches Vermögen — ein enormer Hebeleffekt durch den Zinseszins.' },
  { question: 'Wann sollte man mit dem Sparen anfangen?', answer: 'So früh wie möglich. Wer mit 25 statt mit 35 anfängt (bei 200 €/Monat, 7% Rendite), hat mit 65 ca. 525.000 € statt 244.000 € — mehr als doppelt so viel. Die zusätzlichen 10 Jahre machen durch den Zinseszinseffekt den entscheidenden Unterschied.' },
];

export const metadata: Metadata = {
  title: 'Zinseszinsrechner — Vermögenswachstum berechnen',
  description: 'Berechnen Sie den Zinseszinseffekt: Startkapital, monatliche Sparrate, Zinssatz und Laufzeit. Wie wächst Ihr Geld?',
  keywords: ['Zinseszinsrechner', 'Zinseszins berechnen', 'Sparrechner', 'Vermögensrechner', 'Sparplan Rechner'],
  alternates: { canonical: '/zinseszinsrechner' },
};

export default async function ZinseszinsrechnerPage() {
  const rates = await getCurrentRates();

  return (
    <CalculatorPageLayout
      slug="zinseszinsrechner"
      title="Zinseszinsrechner"
      subtitle="Berechnen Sie, wie Ihr Geld durch Zinseszins und regelmäßiges Sparen wächst."
      jsonLd={{ name: 'Zinseszinsrechner', url: '/zinseszinsrechner', description: 'Zinseszins und Sparplan berechnen.' }}
      faqs={FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug.zinseszinsrechner.headline} offers={affiliateOffersBySlug.zinseszinsrechner.offers} />}
      programmaticVariants={{ pages: ZINSESZINS_PAGES }}
    >
      <ZinsTicker rates={rates} variant="anlage" className="mb-4" />
      <ZinseszinsForm />
    </CalculatorPageLayout>
  );
}
