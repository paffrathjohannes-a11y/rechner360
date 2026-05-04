import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/utils/constants';

// `/icon` wird von `src/app/icon.tsx` zur Build-Zeit generiert und ist
// unter `/icon.png` als Brand-Asset abrufbar. Bis ein echtes Logo im
// public-Ordner liegt, nutzen wir diese URL als verifizierbares Bild.
const BRAND_LOGO_URL = `${SITE_URL}/icon.png`;

/**
 * Stabile `@id`-Anker für die zentralen Site-Entities. Andere Schemas
 * referenzieren diese IDs statt die Felder zu duplizieren — Google
 * dedupliziert das und versteht: Author/Publisher der WebApplication ist
 * dieselbe Organisation, die im OrganizationJsonLd voll definiert ist.
 *
 * Konvention: `${URL}/#<entity>` ist die in Schema.org-Dokus übliche Form.
 */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

interface WebApplicationJsonLdProps {
  name: string;
  url: string;
  description: string;
  category?: string;
}

export function WebApplicationJsonLd({ name, url, description, category = 'FinanceApplication' }: WebApplicationJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    url: `${SITE_URL}${url}`,
    description,
    applicationCategory: category,
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    inLanguage: 'de-DE',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
    },
    // Author + Publisher referenzieren die site-weite Organization per @id.
    // Das ist Schema.org-Best-Practice: keine Duplikation, klare Entity-Graph-
    // Verbindung, Google kombiniert die Signale (E-E-A-T).
    author: { '@id': ORGANIZATION_ID },
    publisher: { '@id': ORGANIZATION_ID },
    isPartOf: { '@id': WEBSITE_ID },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function WebSiteJsonLd() {
  // SearchAction entfernt: Die Seite hat keinen serverseitigen /?q= Endpoint,
  // der echte Such-Ergebnisse rendert. Google aktiviert das Sitelinks-Searchbox-
  // Feature nur bei funktionalen Endpunkten — leere Ziele schaden dem Signal.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'de-DE',
    publisher: { '@id': ORGANIZATION_ID },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/**
 * HowTo-Schema für Schritt-Anleitungen (z. B. "Wie nutze ich diesen
 * Rechner?"). Google hat zwar die Rich-Result-Anzeige für HowTo Mitte
 * 2023 weitgehend zurückgenommen, das Markup hilft aber weiterhin
 * dem Crawler beim Verstehen der Seitenstruktur — und wenn Google die
 * Anzeige zurückbringt, sind die Seiten sofort qualifiziert.
 *
 * `step.text` MUSS Plain-Text sein (kein HTML, keine Markdown-Inlines).
 */
export interface HowToStep {
  name: string;
  text: string;
  url?: string;
}

interface HowToJsonLdProps {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTimeISO?: string;
}

export function HowToJsonLd({ name, description, steps, totalTimeISO }: HowToJsonLdProps) {
  if (steps.length === 0) return null;
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(s.url ? { url: s.url } : {}),
    })),
  };
  if (totalTimeISO) jsonLd.totalTime = totalTimeISO;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function OrganizationJsonLd() {
  // `sameAs` bleibt bewusst leer, bis verifizierte externe Profile vorliegen
  // (Wikidata, LinkedIn-Company, X/Twitter). Leere Arrays sind valide Schema.org —
  // besser als falsche oder nicht-verifizierte Links.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: BRAND_LOGO_URL,
    description: SITE_DESCRIPTION,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
