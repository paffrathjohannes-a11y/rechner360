import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { InflationsForm } from './inflations-form';

const FAQS = [
  { question: 'Was ist Inflation?', answer: 'Inflation bezeichnet den allgemeinen Anstieg des Preisniveaus. Wenn die Inflation 3% betr&auml;gt, kosten G&uuml;ter und Dienstleistungen im Durchschnitt 3% mehr als im Vorjahr. Dadurch sinkt die Kaufkraft des Geldes.' },
  { question: 'Wie hoch ist die aktuelle Inflation in Deutschland?', answer: 'Die Inflationsrate in Deutschland lag 2024 bei ca. 2,2% und 2023 bei ca. 5,9%. Die EZB strebt langfristig eine Inflationsrate von 2% an. Die aktuellen Werte ver&ouml;ffentlicht das Statistische Bundesamt monatlich.' },
  { question: 'Wie wirkt sich Inflation auf Ersparnisse aus?', answer: 'Bei 3% Inflation verliert Geld auf dem Girokonto (0% Zinsen) j&auml;hrlich 3% an Kaufkraft. Nach 10 Jahren sind 10.000 &euro; nur noch ca. 7.440 &euro; wert. Nur wenn die Rendite &uuml;ber der Inflation liegt, w&auml;chst die reale Kaufkraft.' },
  { question: 'Was sch&uuml;tzt vor Inflation?', answer: 'Sachwerte wie Immobilien, Aktien und Gold gelten als Inflationsschutz, da ihr Wert tendenziell mit dem Preisniveau steigt. Auch inflationsindexierte Anleihen und breit gestreute ETFs k&ouml;nnen helfen, die Kaufkraft zu erhalten.' },
];

export const metadata: Metadata = {
  title: 'Inflationsrechner — Kaufkraftverlust berechnen',
  description: 'Berechnen Sie den Kaufkraftverlust durch Inflation. Wie viel sind 1.000\u20ac in 10 Jahren noch wert?',
  keywords: ['Inflationsrechner', 'Kaufkraftverlust', 'Inflation berechnen', 'Kaufkraft Rechner'],
  alternates: { canonical: '/inflationsrechner' },
};

export default function InflationsrechnerPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Inflationsrechner' }]} />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">Inflationsrechner</h1>
        <p className="text-text-secondary text-lg">Berechnen Sie, wie Inflation den Wert Ihres Geldes &uuml;ber die Zeit ver&auml;ndert.</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name="Inflationsrechner" url="/inflationsrechner" description="Kaufkraftverlust durch Inflation berechnen." />
      <InflationsForm />
      <FAQSection faqs={FAQS} className="mt-12" />
      <RelatedCalculators currentSlug="inflationsrechner" className="mt-8" />
    </div>
  );
}
