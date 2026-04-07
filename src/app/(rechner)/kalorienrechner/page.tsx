import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { KalorienForm } from './kalorien-form';

const FAQS = [
  { question: 'Was ist der Grundumsatz?', answer: 'Der Grundumsatz ist die Energiemenge, die Ihr Körper im Ruhezustand benötigt, um lebenswichtige Funktionen aufrechtzuerhalten (Atmung, Herzschlag, Gehirnaktivität). Er macht ca. 60-70% des Gesamtenergieverbrauchs aus.' },
  { question: 'Was ist der Gesamtumsatz?', answer: 'Der Gesamtumsatz (TDEE) ist der Grundumsatz multipliziert mit dem Aktivitätsfaktor. Er gibt an, wie viele Kalorien Sie täglich verbrauchen — inklusive Bewegung, Sport und Alltagsaktivitäten.' },
  { question: 'Wie viel Kaloriendefizit zum Abnehmen?', answer: 'Ein moderates Defizit von 500 kcal/Tag führt zu ca. 0,5 kg Gewichtsverlust pro Woche. Unser Rechner empfiehlt ein 20%-Defizit, was einem gesunden und nachhaltigen Abnehmen entspricht. Vermeiden Sie Defizite über 1.000 kcal/Tag.' },
  { question: 'Welche Formel wird verwendet?', answer: 'Wir verwenden die Mifflin-St Jeor Formel, die als genaueste Methode zur Berechnung des Grundumsatzes gilt. Sie berücksichtigt Gewicht, Größe, Alter und Geschlecht.' },
];

export const metadata: Metadata = {
  title: 'Kalorienrechner \u2014 T\u00e4glichen Kalorienbedarf berechnen',
  description: 'Berechnen Sie Ihren t\u00e4glichen Kalorienbedarf. Grundumsatz, Gesamtumsatz und Zielkalorien zum Abnehmen, Halten oder Zunehmen.',
  keywords: ['Kalorienrechner', 'Kalorienbedarf', 'Grundumsatz', 'TDEE Rechner', 'Kalorien berechnen'],
  alternates: { canonical: '/kalorienrechner' },
};

export default function KalorienrechnerPage() {
  return (
    <CalculatorPageLayout
      slug="kalorienrechner"
      title="Kalorienrechner"
      subtitle="Berechnen Sie Ihren täglichen Kalorienbedarf — Grundumsatz, Gesamtumsatz und Zielkalorien."
      jsonLd={{ name: 'Kalorienrechner', url: '/kalorienrechner', description: 'T\u00e4glichen Kalorienbedarf berechnen.' }}
      faqs={FAQS}
    >
      <KalorienForm />
    </CalculatorPageLayout>
  );
}
