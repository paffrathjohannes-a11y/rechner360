/**
 * Programmatic SEO Pages für den MwSt Rechner
 * "MwSt von 1000 Euro" etc.
 */

const BETRAEGE = [100, 200, 500, 1000, 1500, 2000, 3000, 5000, 10000, 20000, 50000];

export interface MwstPageDef {
  slug: string;
  betrag: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export const MWST_PAGES: MwstPageDef[] = BETRAEGE.map((b) => {
  const bStr = b.toLocaleString('de-DE');
  return {
    slug: `${b}-euro`,
    betrag: b,
    title: `MwSt von ${bStr} €`,
    metaTitle: `MwSt von ${bStr} € — Netto, Brutto & Steueranteil`,
    metaDescription: `Wie viel MwSt steckt in ${bStr} €? ✓ 19% und 7% ✓ Netto ↔ Brutto ✓ Sofort berechnen`,
    h1: `MwSt von ${bStr} € berechnen`,
  };
});
