import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '\u00dcber uns',
  description: 'Erfahren Sie mehr \u00fcber rechner360.de \u2014 kostenlose, pr\u00e4zise Online-Rechner f\u00fcr Deutschland.',
  alternates: { canonical: '/ueber-uns' },
};

export default function UeberUnsPage() {
  return (
    <>
      <h1>Über rechner360.de</h1>

      <p>
        rechner360.de bietet kostenlose, präzise Online-Rechner für Finanzen,
        Steuern und mehr. Unsere Berechnungen basieren auf den offiziellen Berechnungsformeln
        (PAP) 2026 des Bundesministeriums der Finanzen und den aktuellen Sozialversicherungssätzen.
      </p>

      <h2>Unsere Rechner im Überblick</h2>
      <p>Aktuell bieten wir 26 kostenlose Online-Rechner in vier Kategorien:</p>
      <ul>
        <li>
          <strong>Gehalt &amp; Steuern:</strong>{' '}
          <Link href="/brutto-netto-rechner">Brutto Netto Rechner</Link>,{' '}
          <Link href="/gehaltsrechner">Gehaltsrechner</Link>,{' '}
          <Link href="/stundenlohn-rechner">Stundenlohn Rechner</Link>,{' '}
          <Link href="/abfindungsrechner">Abfindungsrechner</Link>,{' '}
          <Link href="/erbschaftsteuer-rechner">Erbschaftsteuer Rechner</Link>
        </li>
        <li>
          <strong>Immobilien &amp; Finanzen:</strong>{' '}
          <Link href="/kreditrechner">Kreditrechner</Link>,{' '}
          <Link href="/tilgungsrechner">Tilgungsrechner</Link>,{' '}
          <Link href="/baukosten-rechner">Baukosten Rechner</Link>,{' '}
          <Link href="/nebenkostenrechner">Nebenkostenrechner</Link>,{' '}
          <Link href="/zinseszinsrechner">Zinseszinsrechner</Link>
        </li>
        <li>
          <strong>Vorsorge &amp; Soziales:</strong>{' '}
          <Link href="/elterngeld-rechner">Elterngeld Rechner</Link>,{' '}
          <Link href="/rentenrechner">Rentenrechner</Link>,{' '}
          <Link href="/unterhalt-rechner">Unterhalt Rechner</Link>,{' '}
          <Link href="/pkv-rechner">PKV Rechner</Link>,{' '}
          <Link href="/bu-rechner">BU-Rechner</Link>
        </li>
        <li>
          <strong>Alltag &amp; Tools:</strong>{' '}
          <Link href="/prozentrechner">Prozentrechner</Link>,{' '}
          <Link href="/mwst-rechner">MwSt Rechner</Link>,{' '}
          <Link href="/bmi-rechner">BMI Rechner</Link>,{' '}
          <Link href="/kalorienrechner">Kalorienrechner</Link>
        </li>
      </ul>
      <p>
        Darüber hinaus finden Sie in unserem <Link href="/ratgeber">Ratgeber-Bereich</Link> hilfreiche
        Artikel zu Themen wie Steuererklärung, Baufinanzierung und Altersvorsorge.
      </p>

      <h2>Unsere Grundprinzipien</h2>
      <ul>
        <li>
          <strong>Präzision:</strong> Alle Steuerberechnungen basieren auf dem offiziellen
          offiziellen Steuerformeln. Wir validieren unsere Ergebnisse regelmäßig gegen
          den BMF-Steuerrechner.
        </li>
        <li>
          <strong>Datenschutz:</strong> Alle Berechnungen laufen ausschließlich in Ihrem
          Browser. Keine Eingabedaten werden an Server übermittelt oder gespeichert.
        </li>
        <li>
          <strong>Transparenz:</strong> Werbung und Affiliate-Links sind klar als solche
          gekennzeichnet. Unsere Berechnungen sind unabhängig von kommerziellen Interessen.
        </li>
        <li>
          <strong>Aktualität:</strong> Wir aktualisieren unsere Rechner jährlich
          entsprechend den neuen Steuer- und Sozialversicherungsparametern.
        </li>
      </ul>

      <h2>Hinweis</h2>
      <p>
        Die auf rechner360.de bereitgestellten Berechnungen dienen der unverbindlichen Information.
        Sie ersetzen keine professionelle Steuer-, Finanz- oder Rechtsberatung. Für
        individuelle Fragen wenden Sie sich bitte an einen Steuerberater oder Finanzberater.
      </p>
    </>
  );
}
