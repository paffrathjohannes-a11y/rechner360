import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/utils/constants';

// `/icon` wird von `src/app/icon.tsx` zur Build-Zeit generiert und ist
// unter `/icon.png` als Brand-Asset abrufbar. Bis ein echtes Logo im
// public-Ordner liegt, nutzen wir diese URL als verifizierbares Bild.
const BRAND_LOGO_URL = `${SITE_URL}/icon.png`;

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
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
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
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'de-DE',
  };

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
