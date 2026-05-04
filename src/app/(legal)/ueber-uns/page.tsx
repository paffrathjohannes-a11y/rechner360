import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Über uns',
  description:
    'Wer steckt hinter rechner360.de? Unsere Mission, Arbeitsweise und Qualitätsstandards für präzise Online-Rechner in Steuern, Finanzen und Alltag.',
  alternates: { canonical: '/ueber-uns' },
};

export default function UeberUnsPage() {
  return (
    <>
      <h1>Über rechner360.de</h1>

      <p>
        rechner360.de ist ein deutsches Online-Portal für kostenlose, tagesaktuelle
        Rechner rund um Gehalt, Steuern, Finanzierung, Versicherung und Alltag.
        Alle Berechnungen basieren auf den offiziellen Rechenformeln des
        Bundesfinanzministeriums (BMF), des GKV-Spitzenverbands und der Deutschen
        Rentenversicherung — und sie laufen ausnahmslos direkt im Browser. Ihre
        Eingaben verlassen Ihr Gerät nie, es werden keine Nutzerprofile angelegt
        und keine Daten gespeichert.
      </p>

      <h2>Unsere Mission</h2>
      <p>
        In Deutschland gibt es unzählige Gehalts- und Steuerrechner im Netz — aber
        viele davon sind entweder ungenau, mit Werbung überfrachtet oder hinter
        Login-Wänden versteckt. Unser Anspruch ist ein radikal einfacher:{' '}
        <strong>
          jeder Rechner liefert in Sekunden ein nachvollziehbares Ergebnis, ohne
          Registrierung, ohne Datenabfrage und ohne versteckte Nebenkosten.
        </strong>{' '}
        Jede Berechnung ist vollständig aufgeschlüsselt, mit Quellenangabe und
        Stand der zugrundeliegenden Parameter, damit Sie das Ergebnis selbst
        prüfen oder mit Ihrem Steuerberater besprechen können.
      </p>

      <h2>Wer steckt hinter rechner360.de?</h2>
      <p>
        rechner360.de wird als Einzelprojekt von{' '}
        <Link href="/autor/johannes-paffrath">Johannes Paffrath</Link> aus
        Bergneustadt (Nordrhein-Westfalen) betrieben. Die volle rechtliche
        Verantwortung und Anbieterkennzeichnung finden Sie im{' '}
        <Link href="/impressum">Impressum</Link>.
      </p>
      <p>
        Die Inhalte — vom Berechnungsalgorithmus über die Guide-Texte bis zu den
        Ratgeber-Artikeln — werden redaktionell betreut und vor jeder
        Veröffentlichung gegen offizielle Quellen abgeglichen. Bei komplexen
        Themen (z.&nbsp;B. Steuerklassenwechsel, Elterngeld-Plus-Kombinationen,
        Baufinanzierung mit Sondertilgung) ziehen wir zusätzlich öffentlich
        zugängliche Unterlagen des BMF, des Statistischen Bundesamts und der
        jeweiligen Spitzenverbände heran.
      </p>

      <h2>So entstehen unsere Rechner</h2>
      <p>
        Jeder Rechner durchläuft einen dreistufigen Prozess, bevor er live geht:
      </p>
      <ol>
        <li>
          <strong>Recherche:</strong> Wir lesen die zugrundeliegenden Gesetze,
          Verordnungen oder Rechengrundlagen im Original (z.&nbsp;B. den{' '}
          Programmablaufplan zur Lohnsteuer oder die Beitragsbemessungsgrenzen
          der Sozialversicherung) und dokumentieren jeden Parameter mit Quelle
          und Jahresstand.
        </li>
        <li>
          <strong>Implementierung:</strong> Der Algorithmus wird in TypeScript
          umgesetzt und mit automatisierten Tests gegen bekannte Beispielwerte
          des jeweiligen Amts verglichen — etwa gegen den offiziellen
          BMF-Steuerrechner bei Lohnsteuer-Berechnungen oder gegen Beispielfälle
          aus dem BEEG-Kommentar beim Elterngeld.
        </li>
        <li>
          <strong>Redaktionelle Abnahme:</strong> Jede Rechner-Seite bekommt
          einen erklärenden Guide-Text, der die wichtigsten Begriffe, Abzüge und
          Sonderfälle benennt. Erst wenn Rechenlogik und Erklärtext
          übereinstimmen, geht die Seite live.
        </li>
      </ol>
      <p>
        Methodik, Quellen und Aktualisierungs-Zyklus haben wir separat auf der
        Seite <Link href="/methodik">Methodik</Link> zusammengefasst.
      </p>

      <h2>Unsere Rechner im Überblick</h2>
      <p>
        Aktuell bieten wir 27 kostenlose Online-Rechner in vier Kategorien —
        jeder einzelne mit eigener Formel-Dokumentation und aktuellen Parametern
        für das Kalenderjahr 2026:
      </p>
      <ul>
        <li>
          <strong>Gehalt &amp; Steuern:</strong>{' '}
          <Link href="/brutto-netto-rechner">Brutto Netto Rechner</Link>,{' '}
          <Link href="/gehaltsrechner">Gehaltsrechner</Link>,{' '}
          <Link href="/einkommensteuer-rechner">Einkommensteuerrechner</Link>,{' '}
          <Link href="/stundenlohn-rechner">Stundenlohn Rechner</Link>,{' '}
          <Link href="/abfindungsrechner">Abfindungsrechner</Link>,{' '}
          <Link href="/erbschaftsteuer-rechner">Erbschaftsteuer Rechner</Link>,{' '}
          <Link href="/gehaltserhoehung-rechner">Gehaltserhöhung Rechner</Link>
        </li>
        <li>
          <strong>Immobilien &amp; Finanzen:</strong>{' '}
          <Link href="/kreditrechner">Kreditrechner</Link>,{' '}
          <Link href="/tilgungsrechner">Tilgungsrechner</Link>,{' '}
          <Link href="/baukosten-rechner">Baukosten Rechner</Link>,{' '}
          <Link href="/nebenkostenrechner">Nebenkostenrechner</Link>,{' '}
          <Link href="/zinseszinsrechner">Zinseszinsrechner</Link>,{' '}
          <Link href="/grundsteuer-rechner">Grundsteuer Rechner</Link>
        </li>
        <li>
          <strong>Vorsorge &amp; Soziales:</strong>{' '}
          <Link href="/elterngeld-rechner">Elterngeld Rechner</Link>,{' '}
          <Link href="/rentenrechner">Rentenrechner</Link>,{' '}
          <Link href="/unterhalt-rechner">Unterhalt Rechner</Link>,{' '}
          <Link href="/pkv-rechner">PKV Rechner</Link>,{' '}
          <Link href="/bu-rechner">BU-Rechner</Link>,{' '}
          <Link href="/wohngeld-rechner">Wohngeldrechner</Link>,{' '}
          <Link href="/kfz-versicherung-rechner">Kfz-Versicherung Rechner</Link>,{' '}
          <Link href="/buergergeld-rechner">Bürgergeld Rechner</Link>,{' '}
          <Link href="/pfaendungsrechner">Pfändungsrechner</Link>
        </li>
        <li>
          <strong>Alltag &amp; Tools:</strong>{' '}
          <Link href="/prozentrechner">Prozentrechner</Link>,{' '}
          <Link href="/mwst-rechner">MwSt Rechner</Link>,{' '}
          <Link href="/bmi-rechner">BMI Rechner</Link>,{' '}
          <Link href="/kalorienrechner">Kalorienrechner</Link>,{' '}
          <Link href="/inflationsrechner">Inflationsrechner</Link>
        </li>
      </ul>
      <p>
        Ergänzend finden Sie in unserem{' '}
        <Link href="/ratgeber">Ratgeber-Bereich</Link> redaktionelle Artikel zu
        Themen wie Steuererklärung, Baufinanzierung, Altersvorsorge und
        Sozialleistungen. Die Ratgeber sind als Ergänzung zu den Rechnern
        gedacht: wenn das Ergebnis eines Rechners Fragen aufwirft, liefert der
        passende Ratgeber die Hintergründe.
      </p>

      <h2>Unsere Grundprinzipien</h2>
      <ul>
        <li>
          <strong>Präzision vor Geschwindigkeit.</strong> Alle Steuerberechnungen
          folgen dem offiziellen Programmablaufplan (PAP) des BMF. Bei
          Sozialabgaben orientieren wir uns an den Beitragsbemessungsgrenzen und
          Beitragssätzen des GKV-Spitzenverbands und der Deutschen
          Rentenversicherung. Wir validieren gegen Beispiele aus den
          Rechengrundlagen des Amts.
        </li>
        <li>
          <strong>Datenschutz by design.</strong> Sämtliche Berechnungen laufen
          clientseitig im Browser. Keine Eingabe verlässt Ihr Gerät, es werden
          keine Cookies zu Tracking-Zwecken gesetzt (außer bei expliziter
          Einwilligung für Reichweitenmessung und Werbung). Details im{' '}
          <Link href="/datenschutz">Datenschutzhinweis</Link>.
        </li>
        <li>
          <strong>Transparenz bei Werbung.</strong> Einnahmen aus
          Anzeigen-Netzwerken (Google AdSense) und Affiliate-Partnerschaften
          (z.&nbsp;B. CHECK24, Verivox) finanzieren das Projekt. Alle
          sponsored Links sind klar als „Anzeige&ldquo; gekennzeichnet. Unsere
          Rechner-Ergebnisse werden nicht durch kommerzielle Interessen
          beeinflusst — der Algorithmus ist derselbe, egal ob eine Anzeige
          klickbar ist oder nicht.
        </li>
        <li>
          <strong>Aktualität.</strong> Jährlich zum 1. Januar aktualisieren wir
          alle Parameter (Steuertarif, Freibeträge, Beitragsbemessungsgrenzen,
          Zusatzbeitrag Krankenversicherung, etc.) und kennzeichnen jede Seite
          mit dem aktuellen Parameter-Jahr.
        </li>
      </ul>

      <h2>Rechtlicher Hinweis</h2>
      <p>
        Die auf rechner360.de bereitgestellten Berechnungen dienen ausschließlich
        der unverbindlichen Information und ersetzen keine individuelle
        Steuer-, Finanz-, Rechts- oder Versicherungsberatung. Gerade bei
        komplexen Lebenslagen (Selbstständigkeit, Ehegattensplitting,
        Immobilienfinanzierung, Erbschaft) empfehlen wir dringend, einen
        zugelassenen Steuerberater, Rechtsanwalt oder unabhängigen
        Finanzberater hinzuzuziehen. Trotz größter Sorgfalt können wir keine
        Gewähr für die Richtigkeit, Aktualität und Vollständigkeit der
        Berechnungen übernehmen.
      </p>

      <h2>Kontakt &amp; Feedback</h2>
      <p>
        Sie haben einen Fehler entdeckt, eine Frage zur Berechnung oder einen
        Vorschlag für einen neuen Rechner? Schreiben Sie uns über die{' '}
        im <Link href="/impressum">Impressum</Link> hinterlegte E-Mail-Adresse.
        Feedback zur Genauigkeit der Rechner ist uns besonders wichtig — bei
        nachvollziehbaren Abweichungen korrigieren wir die Implementierung
        innerhalb von 48 Stunden und vermerken die Änderung im jeweiligen
        Rechner-Guide.
      </p>
    </>
  );
}
