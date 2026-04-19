import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Johannes Paffrath — Autor & Betreiber',
  description:
    'Johannes Paffrath ist Gründer und redaktioneller Betreiber von rechner360.de. Fachprofil, Qualifikation und Kontakt.',
  alternates: { canonical: '/autor/johannes-paffrath' },
  openGraph: {
    title: 'Johannes Paffrath — Autor von rechner360.de',
    description: 'Gründer und redaktioneller Betreiber von rechner360.de.',
    url: '/autor/johannes-paffrath',
    type: 'profile',
  },
};

// Person-Schema für E-E-A-T (Google erwartet bei YMYL-Content — Finanzen,
// Steuern, Gesundheit — einen konkret identifizierbaren Autor mit Qualifikation).
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Johannes Paffrath',
  url: 'https://www.rechner360.de/autor/johannes-paffrath',
  jobTitle: 'Gründer und redaktioneller Betreiber',
  worksFor: {
    '@type': 'Organization',
    name: 'rechner360.de',
    url: 'https://www.rechner360.de',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bergneustadt',
    addressRegion: 'NRW',
    addressCountry: 'DE',
  },
  sameAs: [
    // Falls weitere Profile existieren: hier eintragen
    // 'https://www.linkedin.com/in/...',
    // 'https://github.com/paffrathjohannes-a11y',
  ],
};

export default function AutorJohannesPaffrathPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <h1>Johannes Paffrath</h1>
      <p>
        <strong>Gründer und redaktioneller Betreiber von rechner360.de</strong>
      </p>

      <h2>Kurzprofil</h2>
      <p>
        Johannes Paffrath lebt und arbeitet in Bergneustadt in Nordrhein-Westfalen.
        Als Einzelbetreiber verantwortet er bei rechner360.de die gesamte
        Kette — von der technischen Umsetzung der Rechenalgorithmen über die
        redaktionelle Pflege der Guide-Texte und Ratgeber-Artikel bis zur
        Qualitätssicherung der aktuellen Steuer- und Sozialversicherungs­parameter.
      </p>

      <h2>Schwerpunkte</h2>
      <ul>
        <li>
          <strong>Steuer- &amp; Gehaltsberechnung:</strong> Implementierung und
          Pflege der offiziellen Programmablaufpläne (PAP) des
          Bundesfinanzministeriums, Integration der jährlich neuen
          Sozialversicherungsparameter und Prüfung gegen den BMF-Referenzrechner.
        </li>
        <li>
          <strong>Finanzmathematik:</strong> Annuitätenrechnung, Tilgungspläne,
          Zinseszins-Simulationen — inklusive Sonderfälle wie Sondertilgung,
          Restschuld am Zinsbindungsende und realitätsnaher Baufinanzierung.
        </li>
        <li>
          <strong>Sozial- &amp; Familienleistungen:</strong> BEEG-konforme
          Elterngeldberechnung, Bürgergeld-Regelbedarf, Unterhaltsrecht nach
          Düsseldorfer Tabelle, Pfändungsfreigrenzen.
        </li>
        <li>
          <strong>Versicherung:</strong> GKV/PKV-Vergleichsrechner,
          Berufsunfähigkeitsversicherungs-Modelle, KFZ-Versicherungs-Kalkulation
          nach Typklasse und Regionalklasse.
        </li>
      </ul>

      <h2>Arbeitsweise &amp; Qualitätsstandards</h2>
      <p>
        Für jeden Rechner gilt ein dreistufiger Review-Prozess: Recherche der
        rechtlichen Grundlagen im Original, Implementierung mit
        automatisierten Tests gegen amtliche Beispielwerte, und redaktionelle
        Abnahme vor Go-Live. Änderungen an den zugrundeliegenden Gesetzen
        (jährlicher Tarif, SV-Beitragssätze, etc.) werden dokumentiert und
        innerhalb von 48 Stunden nach offizieller Veröffentlichung eingepflegt.
      </p>
      <p>
        Methodik und verwendete Quellen sind vollständig offengelegt auf der
        Seite <Link href="/methodik">Methodik</Link>.
      </p>

      <h2>Transparenz &amp; Geschäftsmodell</h2>
      <p>
        rechner360.de ist ein eigenfinanziertes Ein-Personen-Projekt. Einnahmen
        erzielen wir ausschließlich über zwei klar gekennzeichnete Kanäle:
      </p>
      <ul>
        <li>
          <strong>Google AdSense Display-Anzeigen</strong> an definierten
          Positionen (Top / Mid / Bottom / Sticky). Nutzer können die
          Werbeeinwilligung im Cookie-Banner jederzeit widerrufen.
        </li>
        <li>
          <strong>Affiliate-Partnerschaften</strong> (z.&nbsp;B. mit CHECK24 und
          Verivox für Kredit-, Strom- und Versicherungsvergleiche, sowie Buhl
          Data für WISO Steuer). Links sind mit „Anzeige" gekennzeichnet und
          mit <code>rel=&quot;nofollow sponsored&quot;</code> attribuiert.
        </li>
      </ul>
      <p>
        Weder Anzeigenkunden noch Affiliate-Partner nehmen Einfluss auf die
        Berechnungs-Algorithmen oder den redaktionellen Inhalt.
      </p>

      <h2>Kontakt</h2>
      <p>
        Sachliche Fehlerhinweise, Vorschläge für neue Rechner, Gastbeiträge oder
        Kooperations-Anfragen sind jederzeit willkommen. Die Kontakt-E-Mail
        findet sich im <Link href="/impressum">Impressum</Link>. Wir antworten
        in der Regel innerhalb von 48 Stunden.
      </p>
    </>
  );
}
