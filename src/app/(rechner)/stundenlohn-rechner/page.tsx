import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
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
    <CalculatorPageLayout
      slug="stundenlohn-rechner"
      title="Stundenlohn Rechner"
      subtitle="Rechnen Sie Stundenlohn, Monatsgehalt und Jahresgehalt ineinander um."
      jsonLd={{ name: 'Stundenlohn Rechner', url: '/stundenlohn-rechner', description: 'Stundenlohn in Monatsgehalt und Jahresgehalt umrechnen.' }}
      faqs={FAQS}
    >
      <StundenlohnForm />
    </CalculatorPageLayout>
  );
}
