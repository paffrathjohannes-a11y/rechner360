import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '\u00dcber uns',
  description: 'Erfahren Sie mehr \u00fcber rechner360.de \u2014 kostenlose, pr\u00e4zise Online-Rechner f\u00fcr Deutschland.',
};

export default function UeberUnsPage() {
  return (
    <>
      <h1>&Uuml;ber rechner360.de</h1>

      <p>
        rechner360.de bietet kostenlose, pr&auml;zise Online-Rechner f&uuml;r Finanzen,
        Steuern und mehr. Unsere Berechnungen basieren auf dem offiziellen Programmablaufplan
        (PAP) 2026 des Bundesministeriums der Finanzen und den aktuellen Sozialversicherungss&auml;tzen.
      </p>

      <h2>Unsere Grundprinzipien</h2>
      <ul>
        <li>
          <strong>Pr&auml;zision:</strong> Alle Steuerberechnungen basieren auf dem offiziellen
          BMF-Programmablaufplan. Wir validieren unsere Ergebnisse regelm&auml;&szlig;ig gegen
          den BMF-Steuerrechner.
        </li>
        <li>
          <strong>Datenschutz:</strong> Alle Berechnungen laufen ausschlie&szlig;lich in Ihrem
          Browser. Keine Eingabedaten werden an Server &uuml;bermittelt oder gespeichert.
        </li>
        <li>
          <strong>Transparenz:</strong> Werbung und Affiliate-Links sind klar als solche
          gekennzeichnet. Unsere Berechnungen sind unabh&auml;ngig von kommerziellen Interessen.
        </li>
        <li>
          <strong>Aktualit&auml;t:</strong> Wir aktualisieren unsere Rechner j&auml;hrlich
          entsprechend den neuen Steuer- und Sozialversicherungsparametern.
        </li>
      </ul>

      <h2>Hinweis</h2>
      <p>
        Die auf rechner360.de bereitgestellten Berechnungen dienen der unverbindlichen Information.
        Sie ersetzen keine professionelle Steuer-, Finanz- oder Rechtsberatung. F&uuml;r
        individuelle Fragen wenden Sie sich bitte an einen Steuerberater oder Finanzberater.
      </p>
    </>
  );
}
