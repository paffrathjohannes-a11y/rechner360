import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { TrustSignals } from '@/components/content/trust-signals';
import { RelatedCalculators } from '@/components/content/related-calculators';
import { FAQSection } from '@/components/content/faq-section';
import { WebApplicationJsonLd } from '@/components/seo/json-ld';
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
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Kalorienrechner' }]} />
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text">Kalorienrechner</h1>
        <p className="text-text-secondary text-lg">Berechnen Sie Ihren täglichen Kalorienbedarf — Grundumsatz, Gesamtumsatz und Zielkalorien.</p>
        <TrustSignals compact className="mt-3" />
      </div>
      <WebApplicationJsonLd name="Kalorienrechner" url="/kalorienrechner" description="T\u00e4glichen Kalorienbedarf berechnen." category="HealthApplication" />
      <KalorienForm />
      <FAQSection faqs={FAQS} className="mt-12" />
      <RelatedCalculators currentSlug="kalorienrechner" className="mt-8" />
    </div>
  );
}
