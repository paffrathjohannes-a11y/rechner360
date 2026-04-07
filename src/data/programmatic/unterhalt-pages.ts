/**
 * Programmatic SEO Pages für den Unterhalt Rechner
 * "Unterhalt bei 3000 Netto" etc.
 */

const EINKOMMEN = [2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500];

export interface UnterhaltPageDef {
  slug: string;
  netto: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export const UNTERHALT_PAGES: UnterhaltPageDef[] = EINKOMMEN.map((netto) => {
  const nettoStr = netto.toLocaleString('de-DE');
  return {
    slug: `${netto}-euro-netto`,
    netto,
    title: `Unterhalt bei ${nettoStr} € Netto`,
    metaTitle: `Kindesunterhalt bei ${nettoStr} € Netto — Düsseldorfer Tabelle 2026`,
    metaDescription: `Wie viel Unterhalt bei ${nettoStr} € Nettoeinkommen? ✓ Düsseldorfer Tabelle ✓ Kindergeld-Anrechnung ✓ Kostenlos berechnen`,
    h1: `Kindesunterhalt bei ${nettoStr} € Netto`,
  };
});
