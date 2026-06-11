import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Datenschutzerkl\u00e4rung',
  robots: { index: false, follow: true },
};

export default function DatenschutzPage() {
  return (
    <>
      <h1>Datenschutzerklärung</h1>

      <h2>1. Datenschutz auf einen Blick</h2>

      <h3>Allgemeine Hinweise</h3>
      <p>
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
        personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten
        sind alle Daten, mit denen Sie persönlich identifiziert werden können.
        Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem
        Text aufgeführten Datenschutzerklärung.
      </p>

      <h3>Datenerfassung auf dieser Website</h3>
      <p>
        <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen
        Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
      </p>
      <p>
        <strong>Wie erfassen wir Ihre Daten?</strong><br />
        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z. B. per
        E-Mail an uns). Andere Daten
        werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere
        IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser,
        Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt
        automatisch, sobald Sie diese Website betreten.
      </p>
      <p>
        <strong>Wofür nutzen wir Ihre Daten?</strong><br />
        Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
        gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens
        verwendet werden — jedoch nur mit Ihrer ausdrücklichen Einwilligung.
      </p>

      <h3>Berechnungen und Datenspeicherung</h3>
      <p>
        <strong>Alle Berechnungen auf rechner360.de werden ausschließlich in Ihrem Browser
        (clientseitig) durchgeführt.</strong> Das gilt für alle unsere Rechner — vom{' '}
        <Link href="/brutto-netto-rechner">Brutto Netto Rechner</Link> über den{' '}
        <Link href="/kreditrechner">Kreditrechner</Link> bis zum{' '}
        <Link href="/elterngeld-rechner">Elterngeld Rechner</Link>.
        Es werden keine Eingabedaten wie Gehalt,
        Steuerklasse oder Kreditbeträge an unsere Server übermittelt oder gespeichert.
        Ihre finanziellen Daten verlassen zu keinem Zeitpunkt Ihr Endgerät.
      </p>

      <h2>2. Hosting</h2>
      <p>
        Diese Website wird bei Vercel Inc. (340 S Lemon Ave #4133, Walnut, CA 91789, USA)
        gehostet. Die Inhalte werden primär über Server in der EU (Frankfurt am Main)
        ausgeliefert; ein Zugriff durch Vercel aus den USA kann jedoch nicht ausgeschlossen
        werden. Vercel ist nach dem EU-US Data Privacy Framework zertifiziert; zusätzlich
        bestehen Standardvertragsklauseln (Art. 46 DSGVO). Vercel verarbeitet personenbezogene
        Daten in unserem Auftrag (Art. 28 DSGVO).
        Details finden Sie in der{' '}
        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">
          Datenschutzerklärung von Vercel
        </a>.
      </p>

      <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>

      <h3>Datenschutz</h3>
      <p>
        Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
        Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen
        Datenschutzvorschriften sowie dieser Datenschutzerklärung. Die Nutzung unserer Website
        ist in der Regel ohne Angabe personenbezogener Daten möglich.
      </p>

      <h3>Verantwortliche Stelle</h3>
      <p>
        Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br />
        Johannes Paffrath<br />
        Saltemerstr. 12, 51702 Bergneustadt<br />
        E-Mail: kontakt@rechner360.de
      </p>

      <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
      <p>
        Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung
        möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen —
        am einfachsten über den Link <strong>„Cookie-Einstellungen&ldquo;</strong> im Footer
        jeder Seite, mit dem Sie Ihre Auswahl jederzeit ändern können.
        Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt
        vom Widerruf unberührt.
      </p>

      <h3>Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
      <p>
        Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht
        bei einer Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat ihres gewöhnlichen
        Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.
      </p>

      <h2>4. Datenerfassung auf dieser Website</h2>

      <h3>Cookies</h3>
      <p>
        Unsere Website verwendet Cookies. Bei Cookies handelt es sich um kleine Textdateien, die
        Ihr Webbrowser auf Ihrem Endgerät speichert. Wir verwenden:
      </p>
      <ul>
        <li>
          <strong>Technisch notwendige Cookies/Speichervorgänge:</strong> Diese sind für die
          Funktion der Website erforderlich (z. B. Speicherung der Cookie-Einwilligung und des
          Design-Modus). Rechtsgrundlage: § 25 Abs. 2 Nr. 2 TDDDG sowie Art. 6 Abs. 1 lit. f DSGVO.
        </li>
        <li>
          <strong>Analyse-Cookies (nur mit Einwilligung):</strong> Google Analytics 4 zur
          Analyse des Nutzerverhaltens. Diese Cookies werden nur gesetzt, wenn Sie dem
          ausdrücklich zustimmen. Rechtsgrundlage: § 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO.
        </li>
        <li>
          <strong>Werbe-Cookies (nur mit Einwilligung):</strong> Google AdSense zur Anzeige
          von Werbung (siehe Abschnitt 5). Rechtsgrundlage: § 25 Abs. 1 TDDDG,
          Art. 6 Abs. 1 lit. a DSGVO.
        </li>
      </ul>
      <p>
        Ihre Auswahl können Sie jederzeit über den Link „Cookie-Einstellungen&ldquo; im
        Footer ändern oder widerrufen.
      </p>
      <p>
        Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies
        informiert werden und Cookies nur im Einzelfall erlauben. Bei der Deaktivierung von Cookies
        kann die Funktionalität dieser Website eingeschränkt sein.
      </p>

      <h3>Server-Log-Dateien</h3>
      <p>
        Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten
        Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
      </p>
      <ul>
        <li>Browsertyp und Browserversion</li>
        <li>Verwendetes Betriebssystem</li>
        <li>Referrer URL</li>
        <li>Uhrzeit der Serveranfrage</li>
        <li>IP-Adresse (anonymisiert)</li>
      </ul>
      <p>
        Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
        Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
      </p>

      <h2>5. Analyse-Tools und Werbung</h2>

      <h3>Google Analytics 4</h3>
      <p>
        Diese Website nutzt Google Analytics 4, einen Webanalysedienst der Google Ireland Limited,
        Gordon House, Barrow Street, Dublin 4, Irland („Google&ldquo;). Google Analytics
        verwendet Cookies, die eine Analyse der Benutzung der Website durch Sie ermöglichen.
        Die durch das Cookie erzeugten Informationen werden in der Regel an einen Server von Google
        in der EU übertragen und dort gespeichert.
      </p>
      <p>
        <strong>IP-Adressen:</strong> Google Analytics 4 protokolliert keine vollständigen
        IP-Adressen; IP-Daten werden nur kurzzeitig zur groben Standortbestimmung verwendet
        und nicht gespeichert.
      </p>
      <p>
        <strong>Drittlandtransfer:</strong> Eine Übermittlung von Daten an Google LLC in den
        USA kann nicht ausgeschlossen werden. Google ist nach dem EU-US Data Privacy Framework
        zertifiziert (Art. 45 DSGVO).
      </p>
      <p>
        Google Analytics wird nur aktiviert, wenn Sie im Cookie-Banner der Kategorie
        „Analyse&ldquo; ausdrücklich zustimmen. Ohne Ihre Einwilligung findet kein Tracking
        statt. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO. Sie können Ihre Einwilligung
        jederzeit über „Cookie-Einstellungen&ldquo; im Footer widerrufen.
      </p>

      <h3>Google AdSense</h3>
      <p>
        Diese Website nutzt Google AdSense, einen Dienst zum Einbinden von Werbeanzeigen der
        Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google&ldquo;).
        AdSense verwendet Cookies und vergleichbare Technologien (z. B. Web Beacons), um
        Werbung anzuzeigen und deren Wirksamkeit zu messen. Dabei können Informationen wie
        Ihre gekürzte IP-Adresse, Geräte- und Browserinformationen sowie besuchte Seiten
        verarbeitet und zur Anzeige interessenbezogener Werbung genutzt werden.
      </p>
      <p>
        AdSense wird <strong>nur mit Ihrer ausdrücklichen Einwilligung</strong> über den
        Cookie-Banner (Kategorie „Werbung&ldquo;) geladen. Rechtsgrundlage:
        § 25 Abs. 1 TDDDG, Art. 6 Abs. 1 lit. a DSGVO. Ohne Einwilligung wird kein
        AdSense-Code ausgeführt und es werden keine Werbe-Cookies gesetzt.
      </p>
      <p>
        <strong>Drittlandtransfer:</strong> Dabei können Daten an Server der Google LLC in
        den USA übertragen werden. Google ist nach dem EU-US Data Privacy Framework
        zertifiziert (Art. 45 DSGVO).
      </p>
      <p>
        Sie können Ihre Einwilligung jederzeit über „Cookie-Einstellungen&ldquo; im Footer
        widerrufen. Personalisierte Werbung können Sie zudem in den{' '}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Google-Einstellungen für Werbung
        </a>{' '}
        deaktivieren. Weitere Informationen finden Sie in der{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Datenschutzerklärung von Google
        </a>{' '}
        und unter{' '}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
          „Wie Google Daten verwendet&ldquo;
        </a>.
      </p>

      <h3>Affiliate-Links</h3>
      <p>
        Diese Website enthält Affiliate-Links zu Drittanbietern (z. B. CHECK24, Verivox,
        WISO/Buhl Data Service). Die Links werden über das Partnernetzwerk AWIN AG
        (Eichhornstraße 3, 10785 Berlin) vermittelt. Wenn Sie auf einen solchen Link klicken
        und dort einen Vertrag abschließen, erhalten wir eine Provision. Der Preis für Sie
        ändert sich dadurch nicht. Beim Klick auf einen Affiliate-Link verlassen Sie unsere
        Website; erst dort können durch den jeweiligen Anbieter bzw. AWIN Cookies zur
        Zuordnung der Vermittlung gesetzt werden. Affiliate-Links sind als
        „Anzeige&ldquo; gekennzeichnet.
      </p>

      <h2>6. Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht auf:</p>
      <ul>
        <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
      </ul>

      <p className="text-sm text-text-muted mt-8">
        Stand: Juni 2026
      </p>
    </>
  );
}
