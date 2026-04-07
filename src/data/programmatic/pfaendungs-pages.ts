/**
 * Programmatic SEO Pages für den Pfändungsrechner
 */

const EINKOMMEN = [1500, 1800, 2000, 2200, 2500, 3000, 3500, 4000];

export interface PfaendungsPageDef {
  slug: string;
  netto: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export const PFAENDUNGS_PAGES: PfaendungsPageDef[] = EINKOMMEN.map((n) => {
  const nStr = n.toLocaleString('de-DE');
  return {
    slug: `${n}-euro-netto`,
    netto: n,
    title: `Pfändung bei ${nStr} € Netto`,
    metaTitle: `Pfändung bei ${nStr} € Netto — Freigrenze & pfändbarer Betrag`,
    metaDescription: `Wie viel ist pfändbar bei ${nStr} € Nettoeinkommen? ✓ Pfändungsfreigrenze ✓ Mit Unterhaltspflichten ✓ Kostenlos`,
    h1: `Pfändung bei ${nStr} € Netto — wie viel bleibt?`,
  };
});
