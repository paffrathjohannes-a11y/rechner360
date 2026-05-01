import type { Metadata } from 'next';
import { CalculatorPageLayout } from '@/components/calculator/calculator-page-layout';
import { AffiliateBox } from '@/components/ads/affiliate-box';
import { affiliateOffersBySlug } from '@/data/affiliates/offers';
import { BuergergeldForm } from './buergergeld-form';
import { BUERGERGELD_FAQS } from '@/data/content/buergergeld-guide';
import { BUERGERGELD_PAGES } from '@/data/programmatic/buergergeld-pages';

export const metadata: Metadata = {
  title: 'Bürgergeld-Rechner 2026 — Anspruch & Höhe berechnen',
  description: 'Bürgergeld-Anspruch 2026 kostenlos berechnen. Regelbedarf, Kosten der Unterkunft, Einkommensfreibeträge — mit Familiensituation und Einkommen.',
  keywords: ['Grundsicherung Rechner', 'Grundsicherung 2026', 'Bürgergeld Nachfolger', 'Grundsicherungsgeld berechnen', 'Neue Grundsicherung'],
  alternates: { canonical: '/buergergeld-rechner' },
};

export default function BuergergeldRechnerPage() {
  return (
    <CalculatorPageLayout
      slug="buergergeld-rechner"
      title="Grundsicherung Rechner 2026 (ehem. Bürgergeld)"
      subtitle="Ab 01.07.2026 ersetzt die Neue Grundsicherung das Bürgergeld. Berechnen Sie Ihren Anspruch mit Regelbedarf, Kosten der Unterkunft und Freibeträgen."
      jsonLd={{
        name: 'Grundsicherung Rechner 2026',
        url: '/buergergeld-rechner',
        description: 'Kostenloser Grundsicherung Rechner 2026 — ehemals Bürgergeld.',
      }}
      faqs={BUERGERGELD_FAQS}
      affiliateSection={<AffiliateBox headline={affiliateOffersBySlug['buergergeld-rechner'].headline} offers={affiliateOffersBySlug['buergergeld-rechner'].offers} />}
      guideContent={
        <>
          <section className="space-y-4">
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4">
              <p className="text-sm font-medium text-text">
                Ab 01.07.2026 ersetzt die <strong>Neue Grundsicherung</strong> das bisherige Bürgergeld.
                Die Regelsätze bleiben gleich, aber Vermögensprüfung und Sanktionen werden verschärft.
              </p>
            </div>
            <h2 className="text-2xl font-bold text-text">Regelsätze Grundsicherung 2026</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-surface-sunken">
                    <th className="px-4 py-2 text-left text-text font-medium">Regelbedarfsstufe</th>
                    <th className="px-4 py-2 text-right text-text font-medium">Monatlich</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-t border-border"><td className="px-4 py-2">Alleinstehende / Alleinerziehende</td><td className="px-4 py-2 text-right font-currency">563 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Partner in Bedarfsgemeinschaft</td><td className="px-4 py-2 text-right font-currency">506 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Jugendliche (14-17 Jahre)</td><td className="px-4 py-2 text-right font-currency">471 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Kinder (6-13 Jahre)</td><td className="px-4 py-2 text-right font-currency">390 €</td></tr>
                  <tr className="border-t border-border"><td className="px-4 py-2">Kinder (0-5 Jahre)</td><td className="px-4 py-2 text-right font-currency">357 €</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-text-muted">
              Zusätzlich zum Regelbedarf werden die Kosten der Unterkunft (Miete + Heizung) in angemessener
              Höhe übernommen. Die angemessene Höhe richtet sich nach dem örtlichen Mietspiegel.
            </p>
            <h3 className="text-lg font-semibold text-text mt-6">Was ändert sich ab 01.07.2026?</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-text-secondary">
              <li><strong>Vermögensprüfung:</strong> Die bisherige Karenzzeit (40.000 € Freibetrag) entfällt. Vermögen wird ab dem ersten Tag geprüft.</li>
              <li><strong>Verschärfte Sanktionen:</strong> Leistungskürzungen bei Pflichtverletzungen werden strenger durchgesetzt.</li>
              <li><strong>Mitwirkungspflichten:</strong> Zumutbare Arbeitsangebote müssen schneller angenommen werden.</li>
              <li><strong>Regelsätze:</strong> Die Höhe der Regelsätze bleibt 2026 unverändert (563 € für Alleinstehende).</li>
            </ul>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold text-text">So setzt sich der Anspruch zusammen</h2>
            <p className="text-text-secondary leading-relaxed">
              Die Grundsicherung folgt dem Bedarfsdeckungsprinzip: Der Staat zahlt die Differenz zwischen
              dem rechnerischen Gesamtbedarf einer Bedarfsgemeinschaft und dem anrechenbaren Einkommen.
              Diese Rechnung erfolgt monatlich und wird beim geringsten Einkommenswandel neu aufgemacht.
              Die drei Bausteine:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-text-secondary">
              <li><strong>Regelbedarf:</strong> deckt Ernährung, Kleidung, Hygiene, Strom, Mobilität, Kommunikation und Kultur. 2026 für Alleinstehende 563 €, für Partner je 506 €, gestaffelt für Kinder.</li>
              <li><strong>Kosten der Unterkunft (KdU):</strong> die <em>tatsächliche</em> Bruttokaltmiete plus Heizkosten — sofern angemessen. Maßstab ist der lokale Mietspiegel und die Personenzahl. Bei zu hoher Miete fordert das Jobcenter zur Kostensenkung auf, übernimmt aber meist sechs Monate lang die volle Miete (§ 22 SGB II).</li>
              <li><strong>Mehrbedarf:</strong> Aufschläge für Schwangere, Alleinerziehende, behinderte Menschen, kostenaufwendige Ernährung (z. B. ärztlich verordnete Diäten). Können den Bedarf um 17–60 % erhöhen.</li>
            </ol>
            <p className="text-text-secondary leading-relaxed">
              Die Summe aus Regelbedarf, KdU und Mehrbedarf ergibt den Gesamtbedarf. Davon wird das
              anrechenbare Einkommen abgezogen — der Rest wird als Grundsicherung ausgezahlt. Wer
              überhaupt kein Einkommen hat, erhält den vollen Bedarf.
            </p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold text-text">Bedarfsgemeinschaft — wer zählt mit?</h2>
            <p className="text-text-secondary leading-relaxed">
              Eine <strong>Bedarfsgemeinschaft (BG)</strong> umfasst alle Personen, die in einem Haushalt
              leben und füreinander einstehen. Ihre Einkommen und Vermögen werden gemeinsam betrachtet.
              Zur BG gehören regelmäßig:
            </p>
            <ul className="list-disc list-inside space-y-1 text-text-secondary">
              <li>der erwerbsfähige leistungsberechtigte Antragsteller,</li>
              <li>Ehepartner, eingetragene Lebenspartner oder Personen in eheähnlicher Gemeinschaft,</li>
              <li>unverheiratete Kinder unter 25 Jahren, die im Haushalt leben und ihren Bedarf nicht selbst decken können,</li>
              <li>Eltern oder Elternteile, sofern unverheiratete Kinder unter 25 mit ihnen leben.</li>
            </ul>
            <p className="text-text-secondary leading-relaxed">
              Wichtige Abgrenzung: Eine reine <em>Wohngemeinschaft</em> ist <strong>keine</strong> BG.
              Geschwister, Großeltern, erwachsene Kinder über 25 zählen nicht mit, auch wenn sie unter
              demselben Dach wohnen. Strittige Fälle (etwa eine neue Beziehung im gemeinsamen Haushalt)
              prüft das Jobcenter regelmäßig — die Beweislast für eine eheähnliche Gemeinschaft liegt
              beim Amt, in der Praxis ist die Anhörung jedoch oft entscheidend.
            </p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold text-text">Einkommen, Freibeträge und Hinzuverdienst</h2>
            <p className="text-text-secondary leading-relaxed">
              Wer zusätzlich zur Grundsicherung arbeitet, behält nicht den gesamten Verdienst — aber auch
              nicht 0 €. Die Freibetragsregelung ist gestuft:
            </p>
            <ul className="space-y-2 text-text-secondary">
              <li><strong>Grundfreibetrag</strong> von 100 € pro Monat bleibt vom Bruttolohn anrechnungsfrei.</li>
              <li><strong>20 %</strong> des Bruttoeinkommens zwischen 100 € und 520 € bleiben anrechnungsfrei.</li>
              <li><strong>30 %</strong> des Bruttoeinkommens zwischen 520 € und 1.000 € bleiben anrechnungsfrei (gilt seit Bürgergeld-Reform).</li>
              <li><strong>10 %</strong> zwischen 1.000 € und 1.200 € (Alleinstehende) bzw. 1.500 € (mit Kindern) bleiben anrechnungsfrei.</li>
              <li>Darüber hinaus wird Einkommen <strong>vollständig angerechnet</strong>.</li>
            </ul>
            <p className="text-text-secondary leading-relaxed">
              <strong>Beispiel:</strong> 800 € brutto Hinzuverdienst. Anrechnungsfrei: 100 € + 20 % von
              420 € = 84 € + 30 % von 280 € = 84 € → insgesamt 268 €. Es werden also 532 € auf den Bedarf
              angerechnet. Wer Mini-Job statt Mini-Hilfe wählt, hat unterm Strich rund ein Drittel mehr in
              der Tasche — das macht Erwerbstätigkeit auch für Aufstocker rechnerisch attraktiv.
            </p>
            <h3 className="text-lg font-semibold text-text pt-2">Was als Einkommen zählt</h3>
            <p className="text-text-secondary leading-relaxed">
              Faktisch alles: Lohn, Gehalt, Selbständigen-Einkünfte, Rente, Krankengeld, Elterngeld
              (bei Bezugsdauer), Unterhaltszahlungen, Kapitalerträge. <strong>Nicht angerechnet</strong>
              werden: Kindergeld (außer beim Kind selbst, soweit für eigenen Bedarf nötig), Pflegegeld,
              Stiftungsgelder, Schmerzensgeld, einmalige Zuwendungen unterhalb bestimmter Grenzen.
            </p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-bold text-text">Pflichten und Sanktionen</h2>
            <p className="text-text-secondary leading-relaxed">
              Wer Grundsicherung bezieht, ist zur aktiven Mitwirkung an der Wiederherstellung der
              Erwerbsfähigkeit verpflichtet. Pflichten umfassen unter anderem:
            </p>
            <ul className="list-disc list-inside space-y-1 text-text-secondary">
              <li>Termine beim Jobcenter wahrnehmen,</li>
              <li>angebotene Maßnahmen, Trainings und zumutbare Arbeit annehmen,</li>
              <li>Bewerbungsbemühungen nachweisen,</li>
              <li>Veränderungen in Einkommen, Vermögen, Wohnsituation und Familienstand unverzüglich melden.</li>
            </ul>
            <p className="text-text-secondary leading-relaxed">
              Bei Pflichtverletzungen drohen Sanktionen — gestuft 10 %, 20 %, 30 % des Regelbedarfs für
              jeweils drei Monate. Ab Juli 2026 verschärft die Neue Grundsicherung diesen Mechanismus.
              Kosten der Unterkunft sind von Sanktionen ausgenommen — die Wohnung bleibt also
              grundsätzlich gesichert. Wer eine Sanktion für unrechtmäßig hält, kann
              <strong> Widerspruch</strong> einlegen (1 Monat Frist) und im Anschluss Klage beim
              Sozialgericht erheben (kostenfrei).
            </p>
          </section>
        </>
      }
      programmaticVariants={{ pages: BUERGERGELD_PAGES }}
    >
      <BuergergeldForm />
    </CalculatorPageLayout>
  );
}
