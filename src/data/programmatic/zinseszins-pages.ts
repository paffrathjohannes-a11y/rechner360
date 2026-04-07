/**
 * Programmatic SEO Pages für den Zinseszinsrechner
 * "100 Euro monatlich sparen", "200 Euro Sparplan" etc.
 */

const SPARRATEN = [50, 100, 150, 200, 250, 300, 400, 500, 750, 1000];

export interface ZinseszinsPageDef {
  slug: string;
  sparrate: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export const ZINSESZINS_PAGES: ZinseszinsPageDef[] = SPARRATEN.map((sr) => ({
  slug: `${sr}-euro-monatlich`,
  sparrate: sr,
  title: `${sr} € monatlich sparen — was kommt raus?`,
  metaTitle: `${sr} € monatlich sparen — Vermögen nach 10, 20, 30 Jahren`,
  metaDescription: `${sr} € monatlich sparen — wie viel Vermögen nach 10, 20 oder 30 Jahren? ✓ Mit Zinseszins ✓ Verschiedene Renditen ✓ Kostenlos`,
  h1: `${sr} € monatlich sparen — Vermögensentwicklung`,
}));
