import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { ZinseszinsForm } from './zinseszins-form';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';

const FAQS = [
  { question: 'Was ist der Zinseszinseffekt?', answer: 'Beim Zinseszins werden nicht nur das Startkapital, sondern auch die bereits angefallenen Zinsen verzinst. Dadurch wächst das Vermögen exponentiell — je länger der Anlagezeitraum, desto stärker der Effekt. Albert Einstein soll ihn als „achtes Weltwunder" bezeichnet haben.' },
  { question: 'Wie berechnet man Zinseszins?', answer: 'Die Formel lautet: Endkapital = Startkapital × (1 + Zinssatz)^Jahre. Bei monatlicher Sparrate wird zusätzlich die Sparplanformel angewendet. Unser Rechner berücksichtigt beides automatisch.' },
  { question: 'Wie lange dauert es, sein Geld zu verdoppeln?', answer: 'Die „72er-Regel" gibt eine schnelle Schätzung: 72 ÷ Zinssatz = Jahre bis zur Verdopplung. Bei 6% Rendite dauert es ca. 12 Jahre (72÷6=12), bei 3% ca. 24 Jahre.' },
  { question: 'Welche Rendite ist realistisch?', answer: 'Tagesgeld: 1-3%, Festgeld: 2-4%, Anleihen: 3-5%, Aktien-ETFs (langfristig): 7-9% p.a. im Durchschnitt. Die reale Rendite (nach Inflation) liegt typisch 2-3% niedriger.' },
];

export const metadata: Metadata = {
  title: 'Zinseszinsrechner — Vermögenswachstum berechnen',
  description: 'Berechnen Sie den Zinseszinseffekt: Startkapital, monatliche Sparrate, Zinssatz und Laufzeit. Wie wächst Ihr Geld?',
  keywords: ['Zinseszinsrechner', 'Zinseszins berechnen', 'Sparrechner', 'Vermögensrechner', 'Sparplan Rechner'],
  alternates: { canonical: '/zinseszinsrechner' },
};

export default function ZinseszinsrechnerPage() {
  return (
    <CalculatorPageLayout
      slug="zinseszinsrechner"
      title="Zinseszinsrechner"
      subtitle="Berechnen Sie, wie Ihr Geld durch Zinseszins und regelmäßiges Sparen wächst."
      jsonLd={{ name: 'Zinseszinsrechner', url: '/zinseszinsrechner', description: 'Zinseszins und Sparplan berechnen.' }}
      faqs={FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug.zinseszinsrechner.headline} offers={affiliateOffersBySlug.zinseszinsrechner.offers} />}
    >
      <ZinseszinsForm />
    </CalculatorPageLayout>
  );
}
