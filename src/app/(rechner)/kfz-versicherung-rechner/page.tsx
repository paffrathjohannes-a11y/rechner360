import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { KfzForm } from './kfz-form';
import { KFZ_FAQS } from '@/data/content/kfz-guide';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';
import { KFZ_PAGES } from '@/data/programmatic/kfz-pages';

export const metadata: Metadata = {
  title: 'Kfz-Versicherung Rechner 2026 — Beitrag berechnen & vergleichen',
  description: 'Kfz-Versicherung berechnen: Haftpflicht, Teilkasko, Vollkasko im Vergleich. Mit SF-Klasse, Fahrzeugtyp und Spartipps. Kostenlos 2026.',
  keywords: ['Kfz Versicherung Rechner', 'Autoversicherung berechnen', 'Kfz Versicherung Vergleich', 'Kfz Haftpflicht Kosten', 'Autoversicherung 2026'],
  alternates: { canonical: '/kfz-versicherung-rechner' },
  openGraph: {
    title: 'Kfz-Versicherung Rechner 2026 — Beitrag berechnen | rechner360.de',
    description: 'Kfz-Versicherung berechnen und vergleichen. Haftpflicht, Teilkasko oder Vollkasko?',
    url: '/kfz-versicherung-rechner',
    type: 'website',
  },
};

export default function KfzVersicherungRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="kfz-versicherung-rechner"
      title="Kfz-Versicherung Rechner 2026"
      subtitle="Berechnen Sie Ihre Kfz-Versicherung — Haftpflicht, Teilkasko oder Vollkasko im Vergleich."
      jsonLd={{
        name: 'Kfz-Versicherung Rechner 2026',
        url: '/kfz-versicherung-rechner',
        description: 'Kostenloser Kfz-Versicherung Rechner 2026. Haftpflicht, Teilkasko und Vollkasko vergleichen.',
      }}
      faqs={KFZ_FAQS}
      affiliateSection={affiliateOffersBySlug['kfz-versicherung-rechner'] ? <AffiliateBox headline={affiliateOffersBySlug['kfz-versicherung-rechner'].headline} offers={affiliateOffersBySlug['kfz-versicherung-rechner'].offers} /> : undefined}
      guideContent={
        <>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text">Wie sich der Kfz-Versicherungsbeitrag zusammensetzt</h2>
            <p className="text-text-secondary leading-relaxed">
              Der Beitrag zu einer Kfz-Versicherung ist kein Pauschalpreis, sondern das Produkt aus mehr als
              20 Risikomerkmalen. Versicherer kombinieren diese Faktoren in eigenen Tarifrechnern und
              gewichten sie unterschiedlich — deshalb können dieselben Daten je nach Anbieter zu Beiträgen
              führen, die um 200 % auseinander liegen. Die wichtigsten Stellschrauben sind:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-surface-sunken">
                    <th className="px-4 py-2 text-left text-text font-medium">Faktor</th>
                    <th className="px-4 py-2 text-left text-text font-medium">Wirkung auf den Beitrag</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-t border-border"><td className="px-4 py-2 font-medium">SF-Klasse</td><td className="px-4 py-2">SF0 (Fahranfänger): bis zu 230 % des Grundbeitrags. SF35: ca. 20 %. Größter Einzelhebel.</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2 font-medium">Typklasse</td><td className="px-4 py-2">Schadenstatistik des Fahrzeugmodells. Skala 10–25 (Haftpflicht). Höhere Klasse = höherer Beitrag.</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2 font-medium">Regionalklasse</td><td className="px-4 py-2">Schadenhäufigkeit am Zulassungsort. Skala 1–12. Großstädte und Ballungsräume liegen meist über dem Schnitt.</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2 font-medium">Jahresfahrleistung</td><td className="px-4 py-2">Mehr Kilometer = höheres Unfallrisiko. Sprünge meist bei 6.000 / 9.000 / 12.000 / 15.000 / 20.000 km/Jahr.</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2 font-medium">Selbstbeteiligung</td><td className="px-4 py-2">Höhere SB senkt den Beitrag deutlich. Übliche Stufen: 150 € / 300 € / 500 € (Teilkasko), 300 € / 500 € / 1.000 € (Vollkasko).</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2 font-medium">Fahrerkreis</td><td className="px-4 py-2">Nur Versicherungsnehmer / + Partner / beliebig. Junge Fahrer (&lt;25) treiben den Beitrag stark nach oben.</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2 font-medium">Stellplatz</td><td className="px-4 py-2">Garage / Carport / Straße. Garagenstellplatz spart bei Kasko oft 5–10 %.</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2 font-medium">Werkstattbindung</td><td className="px-4 py-2">Reparatur nur in Partnerwerkstätten. Spart in Vollkasko meist 10–20 %, dafür weniger Wahlfreiheit.</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted">
              Quellen: GDV-Typklassenverzeichnis 2026, Regionalklassen-Statistik des Gesamtverbands der Deutschen
              Versicherungswirtschaft. Die SF-Rabattstaffel ist je Versicherer individuell, die hier genannten
              Prozente sind Marktdurchschnitt.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text">Haftpflicht, Teilkasko, Vollkasko — wann lohnt was?</h2>
            <p className="text-text-secondary leading-relaxed">
              Die Kfz-Haftpflicht ist gesetzlich vorgeschrieben (§ 1 PflVG), Teil- und Vollkasko sind freiwillig.
              Welche Variante sinnvoll ist, hängt vor allem vom Fahrzeugwert und vom subjektiven
              Sicherheitsbedürfnis ab — nicht vom Alter allein.
            </p>
            <h3 className="text-lg font-semibold text-text pt-2">Haftpflicht (Pflicht)</h3>
            <p className="text-text-secondary leading-relaxed">
              Deckt Personen-, Sach- und Vermögensschäden, die Sie mit Ihrem Fahrzeug bei Dritten verursachen.
              Mindestdeckungssummen: 7,5 Mio. € für Personenschäden, 1,12 Mio. € für Sachschäden. Praxis-Empfehlung:
              mindestens <strong>100 Mio. € pauschal</strong> — kostet kaum mehr und schützt vor existenzbedrohenden Forderungen
              bei schweren Personenschäden.
            </p>
            <h3 className="text-lg font-semibold text-text pt-2">Teilkasko (freiwillig)</h3>
            <p className="text-text-secondary leading-relaxed">
              Deckt Schäden am eigenen Fahrzeug durch Diebstahl, Brand, Glasbruch, Sturm, Hagel, Überschwemmung,
              Marderbiss und Wildunfälle (Haarwild). Sinnvoll bei Fahrzeugwerten ab ca. 5.000 €. Kein Einfluss
              auf die SF-Klasse — Schäden werden nicht hochgestuft. Empfohlene Selbstbeteiligung: 150–300 €.
            </p>
            <h3 className="text-lg font-semibold text-text pt-2">Vollkasko (freiwillig)</h3>
            <p className="text-text-secondary leading-relaxed">
              Enthält alle Teilkasko-Leistungen plus selbstverschuldete Unfälle und Vandalismus. Pflicht bei
              finanzierten oder geleasten Fahrzeugen. Sinnvoll bis ca. 5–7 Jahre Fahrzeugalter; bei höherem Alter
              meist nicht mehr wirtschaftlich, weil im Schadensfall nur der Wiederbeschaffungswert ersetzt wird.
              Faustregel: <strong>Beitrag pro Jahr × 5 ≤ Fahrzeugwert</strong> → Vollkasko lohnt.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text">Sparhebel: realistische Einsparpotenziale 2026</h2>
            <p className="text-text-secondary leading-relaxed">
              Die größten Beitragssprünge entstehen nicht durch einen besseren Tarif, sondern durch das
              Optimieren der Risikomerkmale, die der Versicherer abfragt. Geordnet nach realer Hebelwirkung:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li><strong>Anbieterwechsel zum 30.11.</strong> — bis 50 % Ersparnis, weil Bestandskunden mit Aufschlägen subventioniert werden. Pflichttermin in den Kalender.</li>
              <li><strong>Zweitwagen-Übernahme der SF-Klasse</strong> aus dem Familienkreis spart bei Fahranfängern oft 60–70 % der ersten zwei Jahre.</li>
              <li><strong>Selbstbeteiligung erhöhen</strong> — 300 € → 500 € senkt den Vollkasko-Beitrag durchschnittlich um 8–12 %.</li>
              <li><strong>Garagen-/Carport-Eintrag</strong> — wenn auch nur nachts genutzt: 5–10 % weniger Kasko.</li>
              <li><strong>Werkstattbindung akzeptieren</strong> — sinnvoll bei älteren Fahrzeugen, hier sind Partnerwerkstätten qualitätsneutral.</li>
              <li><strong>Jahresfahrleistung ehrlich, aber nicht zu hoch</strong> angeben — bei deutlicher Überschreitung Beitrag nachfordern, sonst Leistungskürzung im Schadenfall.</li>
              <li><strong>Jährliche Zahlweise</strong> statt Halb-/Vierteljahresraten — ratenmäßiger Aufschlag liegt bei 3–8 %.</li>
            </ul>
            <p className="text-text-secondary leading-relaxed">
              Wichtig: Wer beim Wechsel die SF-Klasse korrekt überträgt, behält den Schadenfreiheitsrabatt. Der
              alte Versicherer ist verpflichtet, die SF-Klasse innerhalb von 14 Tagen elektronisch zu melden.
              Ohne Vergleich zahlen viele Autofahrer über Jahre hinweg deutlich mehr als der Markt — eine
              jährliche Prüfung ist unter Aufwand-Nutzen-Aspekten praktisch konkurrenzlos.
            </p>
          </section>
        </>
      }
      programmaticVariants={{ pages: KFZ_PAGES }}
    >
      <KfzForm />
    </CalculatorPageLayout>
  );
}
