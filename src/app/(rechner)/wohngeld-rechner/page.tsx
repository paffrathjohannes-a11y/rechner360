import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';
import { WohngeldForm } from './wohngeld-form';
import { WOHNGELD_FAQS } from '@/data/content/wohngeld-guide';

export const metadata: Metadata = {
  title: 'Wohngeldrechner 2026 — Wohngeld-Anspruch berechnen',
  description: 'Berechnen Sie Ihr Wohngeld 2026 kostenlos. Mit Wohngeld-Plus, Heizkosten-Entlastung und Klimakomponente. Für alle Mietstufen I-VII.',
  keywords: ['Wohngeldrechner', 'Wohngeld berechnen', 'Wohngeld 2026', 'Wohngeld Plus', 'Mietzuschuss', 'Mietstufe'],
  alternates: { canonical: '/wohngeld-rechner' },
};

export default function WohngeldRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="wohngeld-rechner"
      title="Wohngeldrechner 2026"
      subtitle="Berechnen Sie Ihren Wohngeld-Anspruch mit Wohngeld-Plus, Heizkosten-Entlastung und Klimakomponente."
      jsonLd={{
        name: 'Wohngeldrechner 2026',
        url: '/wohngeld-rechner',
        description: 'Kostenloser Wohngeldrechner 2026 mit Wohngeld-Plus.',
      }}
      faqs={WOHNGELD_FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug['wohngeld-rechner'].headline} offers={affiliateOffersBySlug['wohngeld-rechner'].offers} />}
      guideContent={
        <>
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text">Wohngeld-Höchstbeträge 2026 nach Mietstufe</h2>
            <p className="text-sm text-text-secondary">
              Die anrechenbare Miete ist durch Höchstbeträge begrenzt, die von Haushaltsgröße und Mietstufe abhängen.
              Zusätzlich werden Heizkosten-Entlastung und Klimakomponente addiert.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-surface-sunken">
                    <th className="px-3 py-2 text-left text-text font-medium">Personen</th>
                    <th className="px-3 py-2 text-right text-text font-medium">Stufe I</th>
                    <th className="px-3 py-2 text-right text-text font-medium">Stufe IV</th>
                    <th className="px-3 py-2 text-right text-text font-medium">Stufe VII</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-t border-border"><td className="px-3 py-2">1</td><td className="px-3 py-2 text-right font-currency">477 €</td><td className="px-3 py-2 text-right font-currency">687 €</td><td className="px-3 py-2 text-right font-currency">920 €</td></tr>
                  <tr className="border-t border-border"><td className="px-3 py-2">2</td><td className="px-3 py-2 text-right font-currency">579 €</td><td className="px-3 py-2 text-right font-currency">836 €</td><td className="px-3 py-2 text-right font-currency">1.118 €</td></tr>
                  <tr className="border-t border-border"><td className="px-3 py-2">3</td><td className="px-3 py-2 text-right font-currency">689 €</td><td className="px-3 py-2 text-right font-currency">988 €</td><td className="px-3 py-2 text-right font-currency">1.320 €</td></tr>
                  <tr className="border-t border-border"><td className="px-3 py-2">4</td><td className="px-3 py-2 text-right font-currency">812 €</td><td className="px-3 py-2 text-right font-currency">1.166 €</td><td className="px-3 py-2 text-right font-currency">1.557 €</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted">
              Quelle: §12 WoGG. Höchstbeträge inkl. Klimakomponente. Heizkosten-Entlastung wird zusätzlich berücksichtigt.
            </p>
          </section>

          <section className="space-y-3 mt-8">
            <h3 className="text-lg font-semibold text-text">Mietstufen — Beispielstädte</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-text-secondary">
              <div><span className="font-medium text-text">Stufe I-II:</span> ländliche Regionen, kleine Städte</div>
              <div><span className="font-medium text-text">Stufe III:</span> Leipzig, Magdeburg, Chemnitz</div>
              <div><span className="font-medium text-text">Stufe IV:</span> Berlin, Dresden, Dortmund, Essen</div>
              <div><span className="font-medium text-text">Stufe V:</span> Hamburg, Köln, Hannover</div>
              <div><span className="font-medium text-text">Stufe VI:</span> Frankfurt, Stuttgart, Düsseldorf</div>
              <div><span className="font-medium text-text">Stufe VII:</span> München, Landkreis München</div>
            </div>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold text-text">Wer hat Anspruch auf Wohngeld?</h2>
            <p className="text-text-secondary leading-relaxed">
              Wohngeld ist ein staatlicher Mietzuschuss nach dem Wohngeldgesetz (WoGG) für Haushalte mit
              niedrigen Einkommen, die keine vorrangigen Sozialleistungen wie Bürgergeld oder Grundsicherung
              im Alter beziehen. Anspruch besteht, wenn das anrechenbare Einkommen einen Mindestbedarf
              überschreitet (sonst Bürgergeld) und gleichzeitig unter einer einkommensabhängigen
              Höchstgrenze bleibt. Das <strong>Wohngeld-Plus</strong> hat seit 2023 die Empfängerzahl
              verdreifacht — viele Berechtigte wissen es nur noch nicht.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Anspruchsberechtigt sind insbesondere:
            </p>
            <ul className="list-disc list-inside space-y-1 text-text-secondary">
              <li><strong>Geringverdiener und Mini-Jobber</strong> mit eigenem Einkommen oberhalb des Bürgergeld-Bedarfs.</li>
              <li><strong>Auszubildende und Studierende</strong>, sofern sie keinen BAföG-Anspruch haben (Mischfälle möglich).</li>
              <li><strong>Rentner mit kleiner Rente</strong>, die nicht in die Grundsicherung im Alter fallen.</li>
              <li><strong>Familien mit Kindergeld</strong> und einem Hauptverdiener im unteren Lohnsegment.</li>
              <li><strong>Eigentümer (Lastenzuschuss)</strong> für selbst genutztes Wohneigentum mit Finanzierungs- oder Erbbaurechts-Belastung.</li>
            </ul>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold text-text">So wird das Wohngeld berechnet</h2>
            <p className="text-text-secondary leading-relaxed">
              Das Wohngeld ergibt sich aus drei Größen: <strong>Haushaltsgröße</strong>,
              <strong> anrechenbarem Einkommen</strong> und der <strong>zuschussfähigen Miete</strong>
              (gedeckelt durch die Höchstbeträge oben). Die Wohngeldformel selbst ist komplex (§ 19 WoGG)
              und nutzt mehrere haushaltsspezifische Konstanten — vereinfacht lässt sich die Wirkung der
              Stellschrauben aber gut beschreiben:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li><strong>Mehr Haushaltsmitglieder</strong> → höhere zuschussfähige Miete und höherer Freibetrag → mehr Wohngeld.</li>
              <li><strong>Höhere Bruttokaltmiete</strong> erhöht das Wohngeld bis zum Höchstbetrag der jeweiligen Mietstufe; darüber hinaus wirkt sich Mietsteigerung nicht mehr aus.</li>
              <li><strong>Höheres Einkommen</strong> reduziert das Wohngeld progressiv — bei Überschreiten der Einkommensgrenze fällt der Anspruch auf 0.</li>
              <li><strong>Heizkostenkomponente</strong>: Pauschaler Zuschlag, abhängig von Haushaltsgröße. 2026 z. B. ca. 19,20 €/Monat für 1-Personen-Haushalt.</li>
              <li><strong>Klimakomponente</strong>: Zusätzlicher Aufschlag auf die Höchstmiete für energetisch sanierte Gebäude.</li>
            </ul>
            <h3 className="text-lg font-semibold text-text pt-2">Was zählt als Einkommen?</h3>
            <p className="text-text-secondary leading-relaxed">
              Maßgeblich ist das Jahreseinkommen aller Haushaltsmitglieder, gemindert um pauschale Abzüge:
              je 10 % für Steuerpflicht, gesetzliche Krankenversicherung und gesetzliche Rentenversicherung
              (max. 30 %). Zusätzlich gibt es Freibeträge für Schwerbehinderte, Alleinerziehende und
              Erwerbstätige unter 25 Jahren. Vermögen ist erst ab 60.000 € (1. Person) bzw. 30.000 € je
              weiterer Person relevant.
            </p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold text-text">Wohngeld beantragen — Schritt für Schritt</h2>
            <ol className="list-decimal list-inside space-y-2 text-text-secondary">
              <li><strong>Wohngeldstelle finden</strong> — zuständig ist die Stadt- oder Kreisverwaltung des Wohnorts. Antrag online oder per Formular möglich.</li>
              <li><strong>Unterlagen sammeln:</strong> Mietvertrag, letzte Nebenkostenabrechnung, Einkommensnachweise aller Haushaltsmitglieder (3 Monate), Personalausweis, Kontoauszüge, ggf. Schwerbehindertenausweis.</li>
              <li><strong>Antrag stellen.</strong> Wohngeld wird ab dem Antragsmonat gezahlt — nicht rückwirkend. Wer überlegt, sollte zügig einreichen.</li>
              <li><strong>Bewilligungszeitraum</strong> beträgt in der Regel 12 Monate. Vor Ablauf muss ein Folgeantrag gestellt werden.</li>
              <li><strong>Meldepflicht</strong>: Einkommens- oder Mietänderungen während des Bewilligungszeitraums melden, sonst Rückforderung.</li>
            </ol>
            <p className="text-text-secondary leading-relaxed">
              Die Bearbeitungszeit liegt seit der Wohngeld-Plus-Reform bei 4 bis 12 Wochen — viele Stellen
              sind chronisch überlastet. Wer in finanziellen Engpässen ist, kann einen
              <strong> Vorschuss</strong> nach § 42 SGB I beantragen.
            </p>
          </section>
        </>
      }
    >
      <WohngeldForm />
    </CalculatorPageLayout>
  );
}
