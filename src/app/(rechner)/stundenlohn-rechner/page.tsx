import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
import { StundenlohnForm } from './stundenlohn-form';

const FAQS = [
  { question: 'Wie berechne ich meinen Stundenlohn?', answer: 'Stundenlohn = Monatsgehalt ÷ (Wochenstunden × 52 ÷ 12). Bei 40 Stunden/Woche und 3.000 € Monatsgehalt: 3.000 ÷ 173,3 = 17,31 €/Stunde.' },
  { question: 'Wie viel sind 15 € Stundenlohn im Monat?', answer: 'Bei 40 Stunden/Woche: 15 € × 173,3 Stunden/Monat = 2.600 € brutto/Monat oder 31.200 € brutto/Jahr.' },
  { question: 'Wie hoch ist der Mindestlohn 2026?', answer: 'Der gesetzliche Mindestlohn in Deutschland beträgt seit Januar 2025 12,82 €/Stunde (brutto). Das entspricht bei Vollzeit (40h) ca. 2.222 €/Monat.' },
  { question: 'Was ist ein guter Stundenlohn?', answer: 'Das hängt von Branche und Qualifikation ab. Der deutsche Durchschnitt liegt bei ca. 25 €/Stunde brutto (Stand 2025). Ab ca. 30 €/h gilt das Einkommen als überdurchschnittlich.' },
];

export const metadata: Metadata = {
  title: 'Stundenlohn Rechner — Gehalt umrechnen',
  description: 'Stundenlohn in Monatsgehalt und Jahresgehalt umrechnen — und umgekehrt. Mit variabler Wochenarbeitszeit.',
  keywords: ['Stundenlohn Rechner', 'Stundenlohn berechnen', 'Monatsgehalt in Stundenlohn', 'Gehalt umrechnen'],
  alternates: { canonical: '/stundenlohn-rechner' },
};

export default function StundenlohnRechnerPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Stundenlohn Rechner' }]} />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">Stundenlohn Rechner</h1>
        <p className="text-text-secondary text-lg">Rechnen Sie Stundenlohn, Monatsgehalt und Jahresgehalt ineinander um.</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name="Stundenlohn Rechner" url="/stundenlohn-rechner" description="Stundenlohn in Monatsgehalt und Jahresgehalt umrechnen." />
      <StundenlohnForm />
      <FAQSection faqs={FAQS} className="mt-12" />
      <RelatedCalculators currentSlug="stundenlohn-rechner" className="mt-8" />
    </div>
  );
}
