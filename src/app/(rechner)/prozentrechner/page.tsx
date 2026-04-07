import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { ProzentForm } from './prozent-form';

const FAQS = [
  { question: 'Wie berechnet man Prozent?', answer: 'Die Grundformel lautet: Prozentwert = Grundwert &times; Prozentsatz &divide; 100. Beispiel: 20% von 150 = 150 &times; 20 &divide; 100 = 30.' },
  { question: 'Wie berechnet man die prozentuale Ver&auml;nderung?', answer: 'Prozentuale Ver&auml;nderung = (Neuer Wert - Alter Wert) &divide; Alter Wert &times; 100. Beispiel: Von 80 auf 100 = (100-80) &divide; 80 &times; 100 = 25% Zunahme.' },
  { question: 'Was ist der Unterschied zwischen Prozentpunkt und Prozent?', answer: 'Ein Prozentpunkt ist die absolute Differenz zwischen zwei Prozentwerten. Beispiel: Von 10% auf 15% sind 5 Prozentpunkte Unterschied, aber 50% mehr (relativ gesehen).' },
  { question: 'Wie rechne ich Mehrwertsteuer?', answer: 'Netto + 19% MwSt: Netto &times; 1,19 = Brutto. Brutto zu Netto: Brutto &divide; 1,19 = Netto. Bei 7% MwSt entsprechend mit 1,07.' },
];

export const metadata: Metadata = {
  title: 'Prozentrechner — Prozente einfach berechnen',
  description: 'Prozentrechner: Anteil, Prozentsatz, Grundwert und prozentuale Ver\u00e4nderung berechnen. Kostenlos und sofort.',
  keywords: ['Prozentrechner', 'Prozent berechnen', 'Prozentuale Ver\u00e4nderung', 'Prozentsatz berechnen'],
  alternates: { canonical: '/prozentrechner' },
};

export default function ProzentrechnerPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Prozentrechner' }]} />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">Prozentrechner</h1>
        <p className="text-text-secondary text-lg">Prozente einfach berechnen &mdash; Anteil, Prozentsatz, Grundwert und prozentuale Ver&auml;nderung.</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name="Prozentrechner" url="/prozentrechner" description="Kostenloser Prozentrechner. Prozente berechnen leicht gemacht." category="UtilityApplication" />
      <ProzentForm />

      <section className="space-y-4 mt-12">
        <h2 className="text-2xl font-bold text-text">Prozentrechnung &mdash; die 4 Grundaufgaben</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border p-4 space-y-2">
            <h3 className="font-semibold text-text">1. Prozentwert</h3>
            <p className="text-sm text-text-secondary">&bdquo;Wie viel sind 25% von 200?&ldquo;</p>
            <p className="text-sm font-currency text-primary-600">200 &times; 25 &divide; 100 = 50</p>
          </div>
          <div className="rounded-xl border border-border p-4 space-y-2">
            <h3 className="font-semibold text-text">2. Prozentsatz</h3>
            <p className="text-sm text-text-secondary">&bdquo;50 ist wie viel % von 200?&ldquo;</p>
            <p className="text-sm font-currency text-primary-600">50 &divide; 200 &times; 100 = 25%</p>
          </div>
          <div className="rounded-xl border border-border p-4 space-y-2">
            <h3 className="font-semibold text-text">3. Grundwert</h3>
            <p className="text-sm text-text-secondary">&bdquo;50 sind 25% von was?&ldquo;</p>
            <p className="text-sm font-currency text-primary-600">50 &divide; 25 &times; 100 = 200</p>
          </div>
          <div className="rounded-xl border border-border p-4 space-y-2">
            <h3 className="font-semibold text-text">4. Prozentuale Ver&auml;nderung</h3>
            <p className="text-sm text-text-secondary">&bdquo;Von 80 auf 100 &mdash; wie viel %?&ldquo;</p>
            <p className="text-sm font-currency text-primary-600">(100-80) &divide; 80 &times; 100 = +25%</p>
          </div>
        </div>
      </section>

      <FAQSection faqs={FAQS} className="mt-8" />
      <RelatedCalculators currentSlug="prozentrechner" className="mt-8" />
    </div>
  );
}
