import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '\u00dcber uns',
  description: 'Erfahren Sie mehr \u00fcber rechner360.de \u2014 kostenlose, pr\u00e4zise Online-Rechner f\u00fcr Deutschland.',
};

export default function UeberUnsPage() {
  return (
    <>
      <h1>Über rechner360.de</h1>

      <p>
        rechner360.de bietet kostenlose, präzise Online-Rechner für Finanzen,
        Steuern und mehr. Unsere Berechnungen basieren auf dem offiziellen Programmablaufplan
        (PAP) 2026 des Bundesministeriums der Finanzen und den aktuellen Sozialversicherungssätzen.
      </p>

      <h2>Unsere Grundprinzipien</h2>
      <ul>
        <li>
          <strong>Präzision:</strong> Alle Steuerberechnungen basieren auf dem offiziellen
          BMF-Programmablaufplan. Wir validieren unsere Ergebnisse regelmäßig gegen
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
