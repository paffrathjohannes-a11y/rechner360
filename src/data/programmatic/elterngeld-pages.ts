/**
 * Programmatic SEO Pages für den Elterngeld Rechner
 * "Elterngeld bei 2000 Netto" etc.
 */

const EINKOMMEN = [0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 5000];

export interface ElterngeldPageDef {
  slug: string;
  netto: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export const ELTERNGELD_PAGES: ElterngeldPageDef[] = EINKOMMEN.map((netto) => {
  const nettoStr = netto.toLocaleString('de-DE');
  return {
    slug: `${netto}-euro-netto`,
    netto,
    title: `Elterngeld bei ${nettoStr} \u20ac Netto`,
    metaTitle: `Elterngeld bei ${nettoStr} \u20ac Netto \u2014 Berechnung 2026`,
    metaDescription: `Wie viel Elterngeld bei ${nettoStr} \u20ac Nettoeinkommen? \u2713 Basiselterngeld \u2713 ElterngeldPlus \u2713 Kostenlos berechnen`,
    h1: `Elterngeld bei ${nettoStr} \u20ac Netto`,
  };
});
