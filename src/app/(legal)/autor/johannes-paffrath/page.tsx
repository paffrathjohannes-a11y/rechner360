import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Johannes Paffrath — Autor & Betreiber von rechner360.de',
  description:
    'Johannes Paffrath, Software-Entwickler aus Bergneustadt, betreibt rechner360.de. Profil, Arbeitsweise, Transparenz und Geschäftsmodell.',
  alternates: { canonical: '/autor/johannes-paffrath' },
  openGraph: {
    title: 'Johannes Paffrath — Autor von rechner360.de',
    description: 'Software-Entwickler und Betreiber von rechner360.de.',
    url: '/autor/johannes-paffrath',
    type: 'profile',
    images: ['/images/autor/johannes-paffrath.jpg'],
  },
};

// Person-Schema für E-E-A-T. Bei YMYL-Content (Finanzen, Steuern,
// Sozialleistungen) erwartet Google einen konkret identifizierbaren Autor
// mit externen Verifikations-Spuren (sameAs).
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Johannes Paffrath',
  url: 'https://www.rechner360.de/autor/johannes-paffrath',
  image: 'https://www.rechner360.de/images/autor/johannes-paffrath.jpg',
  jobTitle: 'Software-Entwickler, Betreiber von rechner360.de',
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
  knowsAbout: [
    'Webentwicklung',
    'Berechnungsalgorithmen',
    'Steuerformeln',
    'Sozialleistungen',
    'Finanzmathematik',
  ],
  sameAs: [
    'https://www.xing.com/profile/Johannes_Paffrath2',
    'https://github.com/paffrathjohannes-a11y',
    'https://bautagebuch.org',
  ],
};

export default function AutorJohannesPaffrathPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <div className="not-prose mb-8 flex flex-col sm:flex-row gap-6 items-start">
        <Image
          src="/images/autor/johannes-paffrath.jpg"
          alt="Johannes Paffrath, Betreiber von rechner360.de"
          width={200}
          height={300}
          priority
          className="rounded-lg shadow-md w-32 sm:w-48 h-auto"
        />
        <div>
          <h1 className="text-3xl font-bold mb-2">Johannes Paffrath</h1>
          <p className="text-lg text-text-secondary">
            Software-Entwickler aus Bergneustadt, Nordrhein-Westfalen.
            Betreiber von rechner360.de und{' '}
            <a
              href="https://bautagebuch.org"
              rel="me noopener"
              className="underline"
            >
              bautagebuch.org
            </a>
            .
          </p>
        </div>
      </div>

      <h2>Über mich</h2>
      <p>
        Ich bin Quereinsteiger im Software-Bereich. Vor der selbstständigen
        Tätigkeit habe ich mehrere Jahre im Vertrieb von Baumaschinen,
        Baugeräten und baunahen Dienstleistungen gearbeitet — daraus ist
        bautagebuch.org entstanden, mein erstes eigenes SaaS-Produkt für
        die digitale Baudokumentation. rechner360.de baue ich parallel als
        unabhängiges Tool-Portal mit Fokus auf einfache, schnelle und
        werbearm gestaltete Online-Rechner ohne Tracking-Wildwuchs.
      </p>

      <h2>Was ich mache — und was ich nicht mache</h2>
      <p>
        Ich baue <strong>Werkzeuge</strong>, keine Beratungsleistungen. Jeder
        Rechner auf rechner360.de bildet eine offizielle Berechnungsvorschrift
        ab und wird gegen amtliche Beispielwerte geprüft. Bei rechtlichen oder
        individuellen Fragen verweise ich konsequent an die zuständigen
        Stellen — Steuerberater, Versicherungsmakler, Verbraucherzentrale,
        Sozialleistungsträger.
      </p>
      <p>
        Eine fachliche Beratung im Sinne des Steuerberatungsgesetzes (StBerG)
        oder Rechtsdienstleistungsgesetzes (RDG) findet auf dieser Seite
        nicht statt. Die Inhalte ersetzen keine individuelle Beratung im
        Einzelfall.
      </p>

      <h2>Arbeitsweise &amp; Qualitätsstandards</h2>
      <p>
        Für jeden Rechner gilt ein dreistufiger Prozess: Recherche der
        rechtlichen Grundlage im Original (Gesetzestext, Programmablaufplan,
        Verordnung), Implementierung mit automatisierten Tests gegen amtliche
        Beispielwerte, und redaktionelle Abnahme vor Veröffentlichung.
        Änderungen an den zugrundeliegenden Parametern (jährliche
        Steuertarife, Sozialversicherungs-Beitragssätze, Regelbedarfe,
        WoGG-Höchstbeträge) werden binnen 48 Stunden nach offizieller
        Veröffentlichung eingepflegt und im Changelog dokumentiert.
      </p>
      <p>
        Methodik und verwendete Quellen sind vollständig offengelegt auf der
        Seite <Link href="/methodik">Methodik</Link>. Wo immer möglich,
        verweise ich auf den Originalquellen-Link (BMF, GDV, Bundesanzeiger,
        Düsseldorfer Tabelle, BMAS).
      </p>

      <h2>Transparenz &amp; Geschäftsmodell</h2>
      <p>
        rechner360.de ist ein eigenfinanziertes Ein-Personen-Projekt.
        Einnahmen erzielen wir ausschließlich über zwei klar gekennzeichnete
        Kanäle:
      </p>
      <ul>
        <li>
          <strong>Google-AdSense-Display-Anzeigen</strong> an festen Positionen
          (Top, Mid, Bottom, Sticky-Desktop). Die Werbeeinwilligung kann im
          Cookie-Banner jederzeit widerrufen werden.
        </li>
        <li>
          <strong>Affiliate-Partnerschaften</strong>, z.&nbsp;B. mit CHECK24
          und Verivox für Kredit-, Strom- und Versicherungsvergleiche, sowie
          Buhl Data für WISO Steuer. Affiliate-Links sind als „Anzeige"
          gekennzeichnet und mit{' '}
          <code>rel=&quot;nofollow sponsored&quot;</code> attribuiert.
        </li>
      </ul>
      <p>
        Weder Anzeigenkunden noch Affiliate-Partner nehmen Einfluss auf die
        Berechnungsalgorithmen oder den redaktionellen Inhalt. Es bestehen
        keine Provisionsabhängigkeiten zugunsten bestimmter Anbieter, die
        nicht ausdrücklich offengelegt sind.
      </p>

      <h2>Externe Profile</h2>
      <p>
        Wer mehr über meinen beruflichen Hintergrund wissen möchte, findet
        mich auf{' '}
        <a
          href="https://www.xing.com/profile/Johannes_Paffrath2"
          rel="me noopener"
        >
          XING
        </a>{' '}
        und{' '}
        <a
          href="https://github.com/paffrathjohannes-a11y"
          rel="me noopener"
        >
          GitHub
        </a>
        . Mein zweites SaaS-Projekt ist{' '}
        <a href="https://bautagebuch.org" rel="me noopener">
          bautagebuch.org
        </a>
        .
      </p>

      <h2>Kontakt</h2>
      <p>
        Sachliche Fehlerhinweise zu Rechnern, Vorschläge für neue Tools oder
        Hinweise auf veraltete Parameter sind jederzeit willkommen. Die
        Kontakt-E-Mail findet sich im{' '}
        <Link href="/impressum">Impressum</Link>. Antwort meist binnen 48
        Stunden.
      </p>
    </>
  );
}
