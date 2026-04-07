import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impressum',
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <>
      <h1>Impressum</h1>

      <h2>Angaben gemäß § 5 DDG</h2>
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

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        Johannes Paffrath<br />
        Saltemerstr. 12<br />
        51702 Bergneustadt
      </p>

      <h2>Haftungsausschluss</h2>

      <h3>Haftung für Inhalte</h3>
      <p>
        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt.
        Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte
        können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter
        sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen
        Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG
        sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
        gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
        forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
      </p>

      <h3>Haftung für Links</h3>
      <p>
        Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte
        wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte
        auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten
        ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
      </p>

      <h3>Urheberrecht</h3>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten
        unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung,
        Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes
        bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
      </p>

      <h2>Hinweis zu den Berechnungen</h2>
      <p>
        Die auf rechner360.de bereitgestellten Rechner und Berechnungen dienen ausschließlich
        der unverbindlichen Information. Sie ersetzen keine professionelle Steuer-, Finanz- oder
        Rechtsberatung. Trotz sorgfältiger Prüfung übernehmen wir keine Haftung
        für die Richtigkeit der Berechnungsergebnisse. Die Lohnsteuerberechnung basiert auf
        dem Programmablaufplan (PAP) 2026 des Bundesministeriums der Finanzen.
      </p>

      <h2>Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
        bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
        https://ec.europa.eu/consumers/odr</a>. Wir sind nicht bereit oder verpflichtet, an
        Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </>
  );
}
