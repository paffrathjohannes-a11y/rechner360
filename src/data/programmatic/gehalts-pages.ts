/**
 * Programmatic SEO Pages für den Gehaltsrechner
 */

const GEHAELTER = [2000, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7000, 8000, 10000, 12000];

export interface GehaltsPageDef {
  slug: string;
  brutto: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export function generateGehaltsPages(): GehaltsPageDef[] {
  return GEHAELTER.map((brutto) => {
    const bruttoStr = brutto.toLocaleString('de-DE');
    return {
      slug: `${brutto}-euro-brutto`,
      brutto,
      title: `${bruttoStr} € Gehalt — Netto in allen Steuerklassen`,
      metaTitle: `${bruttoStr} € Gehalt — Netto-Vergleich aller Steuerklassen 2026`,
      metaDescription: `Wie viel Netto bei ${bruttoStr} € Brutto? ✓ Alle 6 Steuerklassen im Vergleich ✓ Arbeitgeberkosten ✓ Aktuell 2026`,
      h1: `${bruttoStr} € Gehalt — Netto in allen Steuerklassen`,
    };
  });
}

export const GEHALTS_PAGES = generateGehaltsPages();
