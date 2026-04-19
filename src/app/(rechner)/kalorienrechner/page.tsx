import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';
import { KalorienForm } from './kalorien-form';
import { KALORIEN_PAGES } from '@/data/programmatic/kalorien-pages';

const FAQS = [
  { question: 'Was ist der Grundumsatz?', answer: 'Der Grundumsatz ist die Energiemenge, die Ihr Körper im Ruhezustand benötigt, um lebenswichtige Funktionen aufrechtzuerhalten (Atmung, Herzschlag, Gehirnaktivität). Er macht ca. 60-70% des Gesamtenergieverbrauchs aus.' },
  { question: 'Was ist der Gesamtumsatz?', answer: 'Der Gesamtumsatz (TDEE) ist der Grundumsatz multipliziert mit dem Aktivitätsfaktor. Er gibt an, wie viele Kalorien Sie täglich verbrauchen — inklusive Bewegung, Sport und Alltagsaktivitäten.' },
  { question: 'Wie viel Kaloriendefizit zum Abnehmen?', answer: 'Ein moderates Defizit von 500 kcal/Tag führt zu ca. 0,5 kg Gewichtsverlust pro Woche. Unser Rechner empfiehlt ein 20%-Defizit, was einem gesunden und nachhaltigen Abnehmen entspricht. Vermeiden Sie Defizite über 1.000 kcal/Tag.' },
  { question: 'Welche Formel wird verwendet?', answer: 'Wir verwenden die Mifflin-St Jeor Formel, die als genaueste Methode zur Berechnung des Grundumsatzes gilt. Sie berücksichtigt Gewicht, Größe, Alter und Geschlecht.' },
  { question: 'Wie viele Kalorien braucht man am Tag?', answer: 'Der durchschnittliche Tagesbedarf liegt bei Frauen bei ca. 1.800-2.200 kcal und bei Männern bei ca. 2.200-2.800 kcal. Der genaue Wert hängt von Alter, Gewicht, Größe und Aktivitätslevel ab.' },
  { question: 'Was ist der PAL-Wert?', answer: 'Der PAL-Wert (Physical Activity Level) beschreibt Ihr Aktivitätsniveau als Faktor. 1,2 = kaum Bewegung, 1,4 = sitzende Tätigkeit mit wenig Sport, 1,6 = mäßig aktiv, 1,8 = körperlich aktiv, 2,0+ = sehr anstrengend. Er wird mit dem Grundumsatz multipliziert.' },
  { question: 'Wie viele Kalorien muss ich für 1 kg Abnehmen einsparen?', answer: '1 kg Körperfett entspricht ca. 7.000 kcal. Bei einem täglichen Defizit von 500 kcal dauert es also ca. 14 Tage, um 1 kg abzunehmen. Ein langsames, moderates Abnehmen ist nachhaltiger als Crash-Diäten.' },
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
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug.kalorienrechner.headline} offers={affiliateOffersBySlug.kalorienrechner.offers} />}
      programmaticVariants={{ pages: KALORIEN_PAGES }}
    >
      <KalorienForm />
    </CalculatorPageLayout>
  );
}
