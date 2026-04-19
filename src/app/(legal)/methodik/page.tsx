import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Methodik & Quellen',
  description:
    'Wie wir auf rechner360.de rechnen: Algorithmen, Parameter-Quellen, Aktualisierungs-Zyklus und Qualitätssicherung unserer Online-Rechner.',
  alternates: { canonical: '/methodik' },
};

export default function MethodikPage() {
  return (
    <>
      <h1>Methodik &amp; Quellen</h1>
      <p>
        Jeder Rechner auf rechner360.de folgt den offiziellen deutschen
        Rechengrundlagen. Auf dieser Seite haben wir für Sie transparent
        zusammengefasst, welche Quellen wir nutzen, wie wir die Berechnungen
        validieren, wann wir aktualisieren und wie wir mit Fehlern umgehen.
      </p>

      <h2>Unser Redaktionsprozess</h2>
      <p>
        Ein neuer oder überarbeiteter Rechner durchläuft drei Phasen, bevor er
        veröffentlicht wird:
      </p>
      <ol>
        <li>
          <strong>Recherche</strong> — Wir arbeiten ausschließlich mit
          Primärquellen: Gesetzestexten (z.&nbsp;B. EStG, SGB, BEEG), amtlichen
          Verordnungen, Programmablaufplänen des BMF und den veröffentlichten
          Parametern der zuständigen Spitzenverbände. Sekundärquellen (Blogs,
          Foren) werden nicht akzeptiert.
        </li>
        <li>
          <strong>Implementierung &amp; Tests</strong> — Die Rechenlogik wird in
          TypeScript umgesetzt und mit Unit-Tests gegen amtliche Beispielwerte
          überprüft. Beispiel: Für den Brutto-Netto-Rechner testen wir etwa 40
          konkrete Lohnfälle aus den BMF-Rechenhilfen (verschiedene
          Bruttogehälter, Steuerklassen, Bundesländer) und prüfen, ob unser
          Ergebnis aufs Cent genau mit dem amtlichen Wert übereinstimmt.
        </li>
        <li>
          <strong>Redaktionelle Abnahme</strong> — Bevor die Seite live geht,
          verfassen wir einen Guide-Text, der die wichtigsten Begriffe erklärt,
          Sonderfälle erwähnt und sinnvolle Eingabebeispiele gibt. Erst wenn
          Rechenlogik, Erklärung und UI sauber ineinandergreifen, schalten wir
          frei.
        </li>
      </ol>

      <h2>Quellen pro Themengebiet</h2>

      <h3>Lohn- und Einkommensteuer</h3>
      <ul>
        <li>
          Programmablaufplan (PAP) für den maschinellen Lohnsteuerabzug,
          herausgegeben vom Bundesministerium der Finanzen (BMF). Die aktuelle
          Fassung 2026 wurde zum 1.&nbsp;Januar in Kraft gesetzt und ist die
          verbindliche Berechnungsgrundlage für alle deutschen Arbeitgeber.
        </li>
        <li>
          Einkommensteuergesetz (EStG), insbesondere §§ 32a–32b für den Tarif,
          den Grundfreibetrag und den Solidaritätszuschlag.
        </li>
        <li>
          Kirchensteuergesetze der Bundesländer (8 % in Bayern und
          Baden-Württemberg, 9 % in allen anderen Bundesländern).
        </li>
      </ul>

      <h3>Sozialversicherung</h3>
      <ul>
        <li>
          Beitragssätze und Beitragsbemessungsgrenzen 2026 des GKV-Spitzenverbands,
          der Deutschen Rentenversicherung und der Bundesagentur für Arbeit. Die
          Rechengrößen werden jährlich per Verordnung im Bundesgesetzblatt
          veröffentlicht.
        </li>
        <li>
          Durchschnittlicher Zusatzbeitrag zur gesetzlichen Krankenversicherung
          (2026: 2,9&nbsp;%) gemäß BMG-Bekanntmachung.
        </li>
        <li>
          Pflegeversicherungsbeitrag inklusive Kinderlosenzuschlag nach § 55
          SGB&nbsp;XI und Kinderabschlag nach § 55 Abs.&nbsp;3 SGB&nbsp;XI.
        </li>
      </ul>

      <h3>Finanzierung &amp; Kredite</h3>
      <ul>
        <li>
          Annuitätenformel für Annuitätendarlehen:{' '}
          <code>A = K · (q<sup>n</sup> · (q − 1)) / (q<sup>n</sup> − 1)</code> —
          Standardformel der Finanzmathematik, verwendet von allen deutschen
          Banken für Privat- und Immobilienkredite.
        </li>
        <li>
          Aktuelle Referenzzinsen: EZB-Leitzins (Hauptrefinanzierungssatz)
          sowie Durchschnittszinsen der Bundesbank-Statistik für Konsumenten-
          und Immobilienkredite. Die Zins-Dropdowns in unseren Rechnern sind an
          die aktuellen Marktbereiche angepasst.
        </li>
        <li>
          Für Baufinanzierungsrechner orientieren wir uns an den Daten des
          Verbands Deutscher Pfandbriefbanken (vdp) für Sollzinsbindungen.
        </li>
      </ul>

      <h3>Sozial- und Familienleistungen</h3>
      <ul>
        <li>
          <strong>Elterngeld:</strong> Bundeselterngeld- und Elternzeitgesetz
          (BEEG), §§ 2–2f für die Berechnung des Basiselterngelds und des
          ElterngeldPlus. Berücksichtigung von Geschwister-Bonus, Mehrlings-
          Zuschlag und der Einkommensobergrenze nach § 1 Abs.&nbsp;8 BEEG.
        </li>
        <li>
          <strong>Bürgergeld:</strong> Regelbedarfe nach § 28 SGB&nbsp;XII und
          den jährlich aktualisierten Regelbedarfsstufen. Angemessene
          Unterkunftskosten nach den Richtlinien der Bundesländer.
        </li>
        <li>
          <strong>Unterhalt:</strong> Düsseldorfer Tabelle 2026 für den
          Kindesunterhalt nach § 1612a BGB, bereinigtes Nettoeinkommen nach der
          SüdL (Süddeutsche Leitlinien der Familiensenate).
        </li>
        <li>
          <strong>Pfändungsfreigrenzen:</strong> Pfändungsfreigrenzenbekanntmachung
          gemäß § 850c ZPO, aktualisiert jeweils zum 1.&nbsp;Juli.
        </li>
      </ul>

      <h3>Versicherung</h3>
      <ul>
        <li>
          <strong>GKV:</strong> Allgemeiner Beitragssatz 14,6&nbsp;% plus
          kassenindividueller Zusatzbeitrag. Beitragsbemessungsgrenze gemäß SGB V.
        </li>
        <li>
          <strong>PKV:</strong> Altersunabhängige Basistarife nach § 152 VAG,
          Berechnungsmodell basierend auf durchschnittlichen Marktprämien
          verschiedener Berufs- und Altersgruppen aus PKV-Verband-Statistiken.
        </li>
        <li>
          <strong>KFZ:</strong> Typklassen-Einstufung des GDV (Gesamtverband der
          Deutschen Versicherungswirtschaft), Regionalklassen 2026,
          Schadenfreiheitsrabatte nach der branchenüblichen SF-Tabelle.
        </li>
        <li>
          <strong>BU:</strong> Prämien-Modelle orientieren sich an öffentlich
          zugänglichen Durchschnittswerten der Finanztest- und
          Map-Report-Rankings, differenziert nach Berufsgruppe, Eintrittsalter,
          Laufzeit und monatlicher Rente.
        </li>
      </ul>

      <h2>Aktualisierungs-Zyklus</h2>
      <ul>
        <li>
          <strong>Jährlich zum 1. Januar:</strong> Neue Steuertarife,
          Beitragssätze, Beitragsbemessungsgrenzen, Freibeträge und
          Kirchensteuer-Parameter.
        </li>
        <li>
          <strong>Jährlich zum 1. Juli:</strong> Neue Pfändungsfreigrenzen und
          ggf. unterjährige Anpassungen der Regelbedarfe.
        </li>
        <li>
          <strong>Laufend:</strong> EZB-Zinsen und Marktzinsen werden täglich
          aus offiziellen Quellen (EZB Data Portal, Bundesbank) gezogen und in
          den Finanzierungs-Rechnern verwendet.
        </li>
        <li>
          <strong>Ad hoc:</strong> Bei unterjährigen Gesetzesänderungen oder
          Korrekturen durch das BMF passen wir die betroffenen Rechner
          innerhalb von 48 Stunden an.
        </li>
      </ul>

      <h2>Umgang mit Fehlern</h2>
      <p>
        Trotz größter Sorgfalt können einzelne Abweichungen auftreten — etwa
        bei sehr ungewöhnlichen Eingabekonstellationen oder bei Rundungsregeln
        im Grenzbereich. Wir sind dankbar für jeden Hinweis: eine kurze E-Mail
        an die im <Link href="/impressum">Impressum</Link> genannte Adresse mit
        den konkreten Eingabewerten und dem erwarteten Ergebnis genügt. Wir
        prüfen jede Meldung, und bei bestätigten Abweichungen korrigieren wir
        den Algorithmus innerhalb von 48 Stunden und vermerken die Änderung am
        betroffenen Rechner.
      </p>

      <h2>Haftungsausschluss</h2>
      <p>
        Alle Rechner sind unverbindliche Informationswerkzeuge. Sie ersetzen
        keine professionelle Beratung durch Steuerberater, Rechtsanwälte,
        Finanzberater oder Versicherungsmakler. Bei komplexen Lebenslagen — etwa
        Selbstständigkeit, Ehegattensplitting, Immobilienkauf, größeren
        Erbschaften oder kombinierten Elterngeld-Varianten — empfehlen wir
        dringend eine individuelle Beratung. Details im Abschnitt{' '}
        <Link href="/ueber-uns#rechtlicher-hinweis">Rechtlicher Hinweis</Link>{' '}
        unserer Über-uns-Seite.
      </p>
    </>
  );
}
