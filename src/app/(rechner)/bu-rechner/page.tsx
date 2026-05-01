import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { BuForm } from './bu-form';
import { BU_FAQS } from '@/data/content/bu-guide';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';
import { BU_PAGES } from '@/data/programmatic/bu-pages';

export const metadata: Metadata = {
  title: 'BU-Rechner 2026 — Berufsunfähigkeitsversicherung berechnen',
  description: 'Berufsunfähigkeitsversicherung berechnen: Monatsbeitrag, empfohlene BU-Rente und Kosten-Nutzen-Verhältnis. Kostenlos und aktuell 2026.',
  keywords: ['BU Rechner', 'Berufsunfähigkeitsversicherung Rechner', 'BU Kosten', 'Berufsunfähigkeit Beitrag', 'BU Versicherung 2026'],
  alternates: { canonical: '/bu-rechner' },
  openGraph: {
    title: 'BU-Rechner 2026 — Berufsunfähigkeitsversicherung | rechner360.de',
    description: 'Berufsunfähigkeitsversicherung berechnen. Monatsbeitrag nach Alter, Beruf und gewünschter BU-Rente.',
    url: '/bu-rechner',
    type: 'website',
  },
};

export default function BuRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="bu-rechner"
      title="BU-Rechner 2026"
      subtitle="Berechnen Sie den Beitrag für Ihre Berufsunfähigkeitsversicherung — nach Alter, Beruf und gewünschter Absicherung."
      jsonLd={{
        name: 'BU-Rechner 2026',
        url: '/bu-rechner',
        description: 'Kostenloser BU-Rechner 2026. Berufsunfähigkeitsversicherung Beitrag berechnen.',
      }}
      faqs={BU_FAQS}
      affiliateSection={affiliateOffersBySlug['bu-rechner'] ? <AffiliateBox headline={affiliateOffersBySlug['bu-rechner'].headline} offers={affiliateOffersBySlug['bu-rechner'].offers} /> : undefined}
      guideContent={
        <>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-text">BU-Beitrag nach Berufsgruppe</h2>
          <p className="text-text-secondary leading-relaxed">
            Der Beruf ist der größte Einflussfaktor auf den BU-Beitrag. Je höher das Risiko der Berufsunfähigkeit, desto teurer die Versicherung.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-surface-sunken">
                  <th className="px-4 py-2 text-left text-text font-medium">Berufsgruppe</th>
                  <th className="px-4 py-2 text-right text-text font-medium">Risiko</th>
                  <th className="px-4 py-2 text-right text-text font-medium">ca. Beitrag*</th>
                </tr>
              </thead>
              <tbody className="text-text-secondary">
                <tr className="border-t border-border"><td className="px-4 py-2">Büro / Verwaltung / IT</td><td className="px-4 py-2 text-right text-accent-500">Niedrig</td><td className="px-4 py-2 text-right font-currency">40–70 €</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2">Medizin / Pflege</td><td className="px-4 py-2 text-right text-warning-500">Mittel</td><td className="px-4 py-2 text-right font-currency">55–90 €</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2">Selbstständige</td><td className="px-4 py-2 text-right text-warning-500">Mittel</td><td className="px-4 py-2 text-right font-currency">60–100 €</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2">Handwerk</td><td className="px-4 py-2 text-right text-warning-600">Erhöht</td><td className="px-4 py-2 text-right font-currency">80–140 €</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-2">Körperliche Arbeit</td><td className="px-4 py-2 text-right text-negative-500">Hoch</td><td className="px-4 py-2 text-right font-currency">100–180 €</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-text-muted">* Geschätzt für 30 Jahre, 1.500 € BU-Rente, Nichtraucher, bis Alter 67.</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-text">Wann gilt man als berufsunfähig?</h2>
          <p className="text-text-secondary leading-relaxed">
            Eine BU-Versicherung leistet, wenn der Versicherte voraussichtlich für mindestens
            <strong> sechs Monate zu mindestens 50 %</strong> außerstande ist, seinen
            zuletzt ausgeübten Beruf auszuüben — so wie er konkret gestaltet war. Entscheidend ist nicht
            das abstrakte Berufsbild, sondern die tatsächliche Arbeitsplatz-Realität: Aufgaben, Pensum,
            körperliche und geistige Belastung. Diese Definition ist deutlich enger als die staatliche
            Erwerbsminderungsrente, die nur leistet, wenn man auf dem allgemeinen Arbeitsmarkt unter
            drei Stunden täglich arbeiten kann. Daher reicht die gesetzliche Absicherung in der Regel
            bei weitem nicht aus.
          </p>
          <p className="text-text-secondary leading-relaxed">
            Die häufigsten BU-Ursachen sind seit Jahren stabil: <strong>psychische Erkrankungen
            (~33 %)</strong>, Erkrankungen des Bewegungsapparats (~21 %), Krebs (~18 %),
            Herz-Kreislauf (~9 %), Unfälle (~8 %). Wer sich gegen die häufigsten Ursachen absichern
            will, sollte den Versicherungsschutz also breit halten — nicht auf reine Unfall-Tarife
            ausweichen, die nur unter 1 % der realen Fälle abdecken.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-text">Wie hoch sollte die BU-Rente sein?</h2>
          <p className="text-text-secondary leading-relaxed">
            Faustregel: Die BU-Rente sollte etwa <strong>70–80 % des aktuellen Nettoeinkommens</strong>
            ersetzen. Sie wird bei Auszahlung mit dem Ertragsanteil besteuert (typisch 5–18 % je nach
            Restlaufzeit), kommt also netto fast voll an. Wer 2.500 € netto verdient, sollte eine BU-Rente
            zwischen 1.750 € und 2.000 € absichern. Zu niedrig gewählt, deckt sie die Fixkosten nicht;
            zu hoch gewählt, lehnen Versicherer wegen mangelnder Plausibilität oft ab.
          </p>
          <h3 className="text-lg font-semibold text-text pt-2">Vertragslaufzeit</h3>
          <p className="text-text-secondary leading-relaxed">
            Die BU sollte <strong>bis zum gesetzlichen Renteneintrittsalter (67)</strong> laufen, nicht
            früher enden. Eine Versicherung, die mit 60 ausläuft, hinterlässt eine sieben Jahre lange
            Versorgungslücke vor dem Rentenbeginn — gerade in einem Alter, in dem das BU-Risiko statistisch
            am höchsten ist. Beitragsdynamik (3 % p. a.) und Leistungsdynamik (im Leistungsfall) sind
            sinnvoll, weil sie den Inflationsschutz sicherstellen.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-text">Antrag: die häufigsten Fallen</h2>
          <p className="text-text-secondary leading-relaxed">
            Der Antrag ist die kritischste Phase. Wer hier eine Vorerkrankung verschweigt, riskiert im
            Leistungsfall Anfechtung wegen <strong>vorvertraglicher Anzeigepflichtverletzung</strong>
            (§ 19 VVG) — und steht trotz jahrelang gezahlter Beiträge ohne Schutz da. Die wichtigsten
            Tipps:
          </p>
          <ul className="space-y-2 text-text-secondary">
            <li><strong>Patientenakte anfordern</strong> bei Hausarzt und Fachärzten der letzten 5–10 Jahre, bevor man den Antrag stellt. Niemand erinnert alle Diagnosen.</li>
            <li><strong>Risikovoranfrage</strong> statt direktem Antrag: Versicherer prüfen anonym, ob ein Antrag angenommen würde, ohne dass eine Ablehnung in der HIS-Datei landet.</li>
            <li><strong>Konkrete Verweisung ausschließen:</strong> Tarif sollte „ohne abstrakte und ohne konkrete Verweisung" enthalten — sonst kann der Versicherer auf einen anderen Beruf verweisen, den man theoretisch noch ausüben könnte.</li>
            <li><strong>Nachversicherungsgarantie</strong> aufnehmen, um nach Heirat, Geburt, Hauskauf oder Gehaltssprung die BU-Rente ohne erneute Gesundheitsprüfung zu erhöhen.</li>
            <li><strong>Frühzeitig abschließen.</strong> Junge Akademiker zahlen 30–40 % weniger als Berufstätige Mitte 30. Studierendentarife sichern den Beruf gleich mit ab — auch ohne dass er schon ausgeübt wird.</li>
          </ul>
        </section>
        </>
      }
      programmaticVariants={{ pages: BU_PAGES }}
    >
      <BuForm />
    </CalculatorPageLayout>
  );
}
