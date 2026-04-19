import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';
import { StundenlohnForm } from './stundenlohn-form';
import { STUNDENLOHN_PAGES } from '@/data/programmatic/stundenlohn-pages';

const FAQS = [
  { question: 'Wie berechne ich meinen Stundenlohn?', answer: 'Stundenlohn = Monatsgehalt ÷ (Wochenstunden × 52 ÷ 12). Bei 40 Stunden/Woche und 3.000 € Monatsgehalt: 3.000 ÷ 173,3 = 17,31 €/Stunde.' },
  { question: 'Wie viel sind 15 € Stundenlohn im Monat?', answer: 'Bei 40 Stunden/Woche: 15 € × 173,3 Stunden/Monat = 2.600 € brutto/Monat oder 31.200 € brutto/Jahr.' },
  { question: 'Wie hoch ist der Mindestlohn 2026?', answer: 'Der gesetzliche Mindestlohn in Deutschland beträgt seit Januar 2025 12,82 €/Stunde (brutto). Das entspricht bei Vollzeit (40h) ca. 2.222 €/Monat.' },
  { question: 'Was ist ein guter Stundenlohn?', answer: 'Das hängt von Branche und Qualifikation ab. Der deutsche Durchschnitt liegt bei ca. 25 €/Stunde brutto (Stand 2025). Ab ca. 30 €/h gilt das Einkommen als überdurchschnittlich.' },
  { question: 'Wie viele Arbeitsstunden hat ein Monat?', answer: 'Im Durchschnitt hat ein Monat 173,33 Arbeitsstunden bei einer 40-Stunden-Woche (40 × 52 ÷ 12). Bei 35 Stunden/Woche sind es 151,67 Stunden, bei 38,5 Stunden/Woche 166,83 Stunden.' },
  { question: 'Wie rechne ich Jahresgehalt in Stundenlohn um?', answer: 'Stundenlohn = Jahresgehalt ÷ (Wochenstunden × 52). Beispiel: 45.000 € Jahresgehalt bei 40h/Woche = 45.000 ÷ 2.080 = 21,63 €/Stunde brutto.' },
  { question: 'Ist Stundenlohn brutto oder netto gemeint?', answer: 'In Deutschland wird der Stundenlohn üblicherweise als Bruttobetrag angegeben. Von diesem werden Steuern und Sozialversicherungsbeiträge abgezogen. Der Netto-Stundenlohn ist je nach Steuerklasse und Abzügen deutlich geringer.' },
];

export const metadata: Metadata = {
  title: 'Stundenlohn Rechner — Gehalt umrechnen',
  description: 'Stundenlohn in Monats- und Jahresgehalt umrechnen — auch umgekehrt. Mit Wochenarbeitszeit, Urlaubstagen und Feiertagen. Aktuell 2026.',
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
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug['stundenlohn-rechner'].headline} offers={affiliateOffersBySlug['stundenlohn-rechner'].offers} />}
      guideContent={
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-text">Stundenlohn, Monatsgehalt, Jahresgehalt — alle Formeln</h2>
          <p className="text-text-secondary leading-relaxed">
            Der Stundenlohn ist die zentrale Verhandlungsgröße in vielen Branchen. Ob Sie ein neues Stellenangebot
            bewerten oder als Freelancer kalkulieren — mit dem Rechner wandeln Sie Stundenlohn, Monatsgehalt und
            Jahresgehalt direkt ineinander um. Die Formel ist simpel: Das Jahr hat 52 Wochen, der Monat also
            im Schnitt 4,33 Wochen.
          </p>
          <h3 className="text-lg font-semibold text-text pt-2">Die Standardformeln</h3>
          <ul className="space-y-2 text-text-secondary">
            <li><strong>Stundenlohn → Monatsgehalt:</strong> Stundenlohn × Wochenstunden × 52 ÷ 12</li>
            <li><strong>Monatsgehalt → Stundenlohn:</strong> Monatsgehalt ÷ (Wochenstunden × 52 ÷ 12)</li>
            <li><strong>Jahresgehalt → Stundenlohn:</strong> Jahresgehalt ÷ (Wochenstunden × 52)</li>
          </ul>
          <p className="text-text-secondary leading-relaxed">
            Bei einer 40-Stunden-Woche entspricht das monatlich 173,33 Stunden, bei 38,5 Stunden 166,83, bei 35 Stunden 151,67.
          </p>
          <h3 className="text-lg font-semibold text-text pt-2">Mindestlohn 2026 und typische Gehälter</h3>
          <p className="text-text-secondary leading-relaxed">
            Der gesetzliche Mindestlohn wurde 2025 auf <strong>12,82 €/Stunde</strong> erhöht. Bei Vollzeit (40h)
            entspricht das rund 2.222 € brutto pro Monat. Der deutsche Durchschnitts-Stundenlohn liegt bei etwa
            25 € brutto, in tariflich gut organisierten Industriezweigen (Chemie, Metall, Pharma) oft deutlich darüber.
            Ab ca. 30 €/Stunde gilt das Einkommen als überdurchschnittlich.
          </p>
          <h3 className="text-lg font-semibold text-text pt-2">Urlaub und Feiertage berücksichtigen</h3>
          <p className="text-text-secondary leading-relaxed">
            Die klassische Formel ignoriert Urlaub und Feiertage — in Deutschland also rund 30 bezahlte Freitage. Der
            Rechner oben bietet optional eine Korrektur: Wenn Sie Ihren <strong>effektiven Stundenlohn</strong> wissen
            wollen (also den Betrag, den Sie pro tatsächlich gearbeiteter Stunde bekommen), berücksichtigen Sie die
            Urlaubstage. Das Ergebnis liegt üblicherweise 10–12 % über dem nominalen Stundenlohn.
          </p>
        </section>
      }
      programmaticVariants={{ pages: STUNDENLOHN_PAGES }}
    >
      <StundenlohnForm />
    </CalculatorPageLayout>
  );
}
