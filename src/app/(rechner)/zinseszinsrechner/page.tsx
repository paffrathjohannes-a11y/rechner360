import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { ZinseszinsForm } from './zinseszins-form';

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
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Zinseszinsrechner' }]} />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">Zinseszinsrechner</h1>
        <p className="text-text-secondary text-lg">Berechnen Sie, wie Ihr Geld durch Zinseszins und regelmäßiges Sparen wächst.</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name="Zinseszinsrechner" url="/zinseszinsrechner" description="Zinseszins und Sparplan berechnen." />
      <ZinseszinsForm />
      <FAQSection faqs={FAQS} className="mt-12" />
      <RelatedCalculators currentSlug="zinseszinsrechner" className="mt-8" />
    </div>
  );
}
