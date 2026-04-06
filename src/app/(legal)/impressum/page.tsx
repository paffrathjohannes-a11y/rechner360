import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum',
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <>
      <h1>Impressum</h1>

      <h2>Angaben gem&auml;&szlig; &sect; 5 DDG</h2>
      <p>
        Johannes Paffrath<br />
        Saltemerstr. 12<br />
        51702 Bergneustadt<br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: 0170 5409134<br />
        E-Mail: kontakt@rechner360.de
      </p>

      <h2>Verantwortlich f&uuml;r den Inhalt nach &sect; 18 Abs. 2 MStV</h2>
      <p>
        Johannes Paffrath<br />
        Saltemerstr. 12<br />
        51702 Bergneustadt
      </p>

      <h2>Haftungsausschluss</h2>

      <h3>Haftung f&uuml;r Inhalte</h3>
      <p>
        Die Inhalte unserer Seiten wurden mit gr&ouml;&szlig;ter Sorgfalt erstellt.
        F&uuml;r die Richtigkeit, Vollst&auml;ndigkeit und Aktualit&auml;t der Inhalte
        k&ouml;nnen wir jedoch keine Gew&auml;hr &uuml;bernehmen. Als Diensteanbieter
        sind wir gem&auml;&szlig; &sect; 7 Abs. 1 DDG f&uuml;r eigene Inhalte auf diesen
        Seiten nach den allgemeinen Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 DDG
        sind wir als Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte oder
        gespeicherte fremde Informationen zu &uuml;berwachen oder nach Umst&auml;nden zu
        forschen, die auf eine rechtswidrige T&auml;tigkeit hinweisen.
      </p>

      <h3>Haftung f&uuml;r Links</h3>
      <p>
        Unser Angebot enth&auml;lt Links zu externen Webseiten Dritter, auf deren Inhalte
        wir keinen Einfluss haben. Deshalb k&ouml;nnen wir f&uuml;r diese fremden Inhalte
        auch keine Gew&auml;hr &uuml;bernehmen. F&uuml;r die Inhalte der verlinkten Seiten
        ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
      </p>

      <h3>Urheberrecht</h3>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
        unterliegen dem deutschen Urheberrecht. Die Vervielf&auml;ltigung, Bearbeitung,
        Verbreitung und jede Art der Verwertung au&szlig;erhalb der Grenzen des Urheberrechtes
        bed&uuml;rfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
      </p>

      <h2>Hinweis zu den Berechnungen</h2>
      <p>
        Die auf rechner360.de bereitgestellten Rechner und Berechnungen dienen ausschlie&szlig;lich
        der unverbindlichen Information. Sie ersetzen keine professionelle Steuer-, Finanz- oder
        Rechtsberatung. Trotz sorgf&auml;ltiger Pr&uuml;fung &uuml;bernehmen wir keine Haftung
        f&uuml;r die Richtigkeit der Berechnungsergebnisse. Die Lohnsteuerberechnung basiert auf
        dem Programmablaufplan (PAP) 2026 des Bundesministeriums der Finanzen.
      </p>

      <h2>Streitschlichtung</h2>
      <p>
        Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
        bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
        https://ec.europa.eu/consumers/odr</a>. Wir sind nicht bereit oder verpflichtet, an
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </>
  );
}
