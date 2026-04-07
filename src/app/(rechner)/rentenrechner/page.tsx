import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { RentenForm } from './renten-form';

const FAQS = [
  { question: 'Wie berechnet sich die gesetzliche Rente?', answer: 'Die Monatsrente ergibt sich aus: Entgeltpunkte × Zugangsfaktor × aktueller Rentenwert. Pro Jahr, in dem Sie das Durchschnittseinkommen verdienen, erhalten Sie 1 Entgeltpunkt. Der aktuelle Rentenwert liegt 2026 bei ca. 39,32 € (West).' },
  { question: 'Was sind Entgeltpunkte?', answer: 'Entgeltpunkte spiegeln Ihr Einkommen im Verhältnis zum Durchschnitt wider. Wer genau das Durchschnittseinkommen (ca. 45.358 €/Jahr) verdient, bekommt 1 Punkt pro Jahr. Wer doppelt so viel verdient, bekommt 2 Punkte. Maximum: ca. 2,1 Punkte (Beitragsbemessungsgrenze).' },
  { question: 'Was ist die Rentenlücke?', answer: 'Die Rentenlücke ist die Differenz zwischen Ihrem aktuellen Nettoeinkommen und der zu erwartenden Rente. Sie zeigt, wie viel Sie privat vorsorgen müssen, um Ihren Lebensstandard im Alter zu halten. Typisch liegt die Rentenlücke bei 30-50% des letzten Nettos.' },
  { question: 'Was kostet Frührente?', answer: 'Für jeden Monat vor dem Regelalter (67) wird die Rente um 0,3% gekürzt (Zugangsfaktor). Bei 2 Jahren Frührente (ab 65) sind das 7,2% weniger Rente — dauerhaft. Früheste Rente mit Abschlag: 63 Jahre (für langjährig Versicherte mit 35 Beitragsjahren).' },
];

export const metadata: Metadata = {
  title: 'Rentenrechner 2026 — Gesetzliche Rente berechnen',
  description: 'Berechnen Sie Ihre voraussichtliche gesetzliche Rente. Mit Entgeltpunkten, Zugangsfaktor und Rentenlücke.',
  keywords: ['Rentenrechner', 'Rente berechnen', 'Gesetzliche Rente', 'Entgeltpunkte', 'Rentenlücke'],
  alternates: { canonical: '/rentenrechner' },
};

export default function RentenrechnerPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Rentenrechner' }]} />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">Rentenrechner 2026</h1>
        <p className="text-text-secondary text-lg">Berechnen Sie Ihre voraussichtliche gesetzliche Rente und die Rentenlücke.</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name="Rentenrechner 2026" url="/rentenrechner" description="Gesetzliche Rente berechnen mit Entgeltpunkten und Rentenlücke." />
      <RentenForm />
      <FAQSection faqs={FAQS} className="mt-12" />
      <RelatedCalculators currentSlug="rentenrechner" className="mt-8" />
    </div>
  );
}
