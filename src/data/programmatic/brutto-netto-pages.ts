/**
 * Programmatic SEO Pages für den Brutto-Netto-Rechner
 * ~195 Seiten für Long-Tail Keywords
 */

const GEHAELTER = [
  1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000,
  5500, 6000, 6500, 7000, 7500, 8000, 9000, 10000, 12000, 15000,
];

const STEUERKLASSEN = [1, 2, 3, 4, 5] as const;

export interface BruttoNettoPageDef {
  slug: string;
  brutto: number;
  steuerklasse: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export function generateBruttoNettoPages(): BruttoNettoPageDef[] {
  const pages: BruttoNettoPageDef[] = [];

  for (const brutto of GEHAELTER) {
    for (const sk of STEUERKLASSEN) {
      const bruttoStr = brutto.toLocaleString('de-DE');
      const slug = `${brutto}-euro-steuerklasse-${sk}`;

      pages.push({
        slug,
        brutto,
        steuerklasse: sk,
        title: `${bruttoStr} € brutto in netto — Steuerklasse ${sk}`,
        metaTitle: `${bruttoStr} € brutto in netto (Steuerklasse ${sk}) 2026`,
        metaDescription: `Wie viel Netto bleiben von ${bruttoStr} € Brutto in Steuerklasse ${sk}? ✓ Aktuell 2026 ✓ Alle Abzüge ✓ Kostenlos berechnen`,
        h1: `${bruttoStr} € brutto — wie viel netto in Steuerklasse ${sk}?`,
      });
    }
  }

  return pages;
}

export const BRUTTO_NETTO_PAGES = generateBruttoNettoPages();
