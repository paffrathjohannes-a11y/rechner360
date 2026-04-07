import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { InflationsForm } from './inflations-form';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';

const FAQS = [
  { question: 'Was ist Inflation?', answer: 'Inflation bezeichnet den allgemeinen Anstieg des Preisniveaus. Wenn die Inflation 3% beträgt, kosten Güter und Dienstleistungen im Durchschnitt 3% mehr als im Vorjahr. Dadurch sinkt die Kaufkraft des Geldes.' },
  { question: 'Wie hoch ist die aktuelle Inflation in Deutschland?', answer: 'Die Inflationsrate in Deutschland lag 2024 bei ca. 2,2% und 2023 bei ca. 5,9%. Die EZB strebt langfristig eine Inflationsrate von 2% an. Die aktuellen Werte veröffentlicht das Statistische Bundesamt monatlich.' },
  { question: 'Wie wirkt sich Inflation auf Ersparnisse aus?', answer: 'Bei 3% Inflation verliert Geld auf dem Girokonto (0% Zinsen) jährlich 3% an Kaufkraft. Nach 10 Jahren sind 10.000 € nur noch ca. 7.440 € wert. Nur wenn die Rendite über der Inflation liegt, wächst die reale Kaufkraft.' },
  { question: 'Was schützt vor Inflation?', answer: 'Sachwerte wie Immobilien, Aktien und Gold gelten als Inflationsschutz, da ihr Wert tendenziell mit dem Preisniveau steigt. Auch inflationsindexierte Anleihen und breit gestreute ETFs können helfen, die Kaufkraft zu erhalten.' },
];

export const metadata: Metadata = {
  title: 'Inflationsrechner — Kaufkraftverlust berechnen',
  description: 'Berechnen Sie den Kaufkraftverlust durch Inflation. Wie viel sind 1.000€ in 10 Jahren noch wert?',
  keywords: ['Inflationsrechner', 'Kaufkraftverlust', 'Inflation berechnen', 'Kaufkraft Rechner'],
  alternates: { canonical: '/inflationsrechner' },
};

export default function InflationsrechnerPage() {
  return (
    <CalculatorPageLayout
      slug="inflationsrechner"
      title="Inflationsrechner"
      subtitle="Berechnen Sie, wie Inflation den Wert Ihres Geldes über die Zeit verändert."
      jsonLd={{
        name: 'Inflationsrechner',
        url: '/inflationsrechner',
        description: 'Kaufkraftverlust durch Inflation berechnen.',
      }}
      faqs={FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug.inflationsrechner.headline} offers={affiliateOffersBySlug.inflationsrechner.offers} />}
    >
      <InflationsForm />
    </CalculatorPageLayout>
  );
}
