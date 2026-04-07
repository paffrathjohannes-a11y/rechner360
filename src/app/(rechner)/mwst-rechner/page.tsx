import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { MwstForm } from './mwst-form';

const FAQS = [
  { question: 'Wie berechne ich die MwSt?', answer: 'Netto zu Brutto: Netto × 1,19 (bei 19%) oder × 1,07 (bei 7%). Brutto zu Netto: Brutto ÷ 1,19 bzw. ÷ 1,07. Die Mehrwertsteuer ist die Differenz zwischen Brutto und Netto.' },
  { question: 'Wann gilt 7% und wann 19%?', answer: 'Der ermäßigte Satz von 7% gilt für Lebensmittel, Bücher, Zeitungen, öffentlichen Nahverkehr, Hotelübernachtungen und kulturelle Veranstaltungen. Für alle anderen Waren und Dienstleistungen gilt der Regelsatz von 19%.' },
  { question: 'Was ist der Unterschied zwischen MwSt und USt?', answer: 'Es gibt keinen Unterschied — Mehrwertsteuer (MwSt) und Umsatzsteuer (USt) bezeichnen dieselbe Steuer. Offiziell heißt sie Umsatzsteuer, umgangssprachlich wird häufig Mehrwertsteuer verwendet.' },
];

export const metadata: Metadata = {
  title: 'MwSt Rechner — Mehrwertsteuer berechnen (19% / 7%)',
  description: 'Mehrwertsteuer berechnen: Netto zu Brutto und Brutto zu Netto. Mit 19% oder 7% MwSt. Kostenlos und sofort.',
  keywords: ['MwSt Rechner', 'Mehrwertsteuer Rechner', 'Netto Brutto', 'Umsatzsteuer berechnen', 'MwSt 19%'],
  alternates: { canonical: '/mwst-rechner' },
};

export default function MwstRechnerPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'MwSt Rechner' }]} />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">MwSt Rechner</h1>
        <p className="text-text-secondary text-lg">Mehrwertsteuer berechnen — Netto zu Brutto und zurück. 19% oder 7%.</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name="MwSt Rechner" url="/mwst-rechner" description="Mehrwertsteuer berechnen: Netto ↔ Brutto." category="FinanceApplication" />
      <MwstForm />
      <FAQSection faqs={FAQS} className="mt-12" />
      <RelatedCalculators currentSlug="mwst-rechner" className="mt-8" />
    </div>
  );
}
