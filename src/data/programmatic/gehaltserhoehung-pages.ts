/**
 * Programmatic SEO Pages für den Gehaltserhöhung-Rechner
 * "500 Euro Gehaltserhöhung netto" etc.
 */

const ERHOEHUNGEN = [200, 300, 500, 750, 1000, 1500, 2000, 3000];

export interface GehaltserhoehungPageDef {
  slug: string;
  erhoehung: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export const GEHALTSERHOEHUNG_PAGES: GehaltserhoehungPageDef[] = ERHOEHUNGEN.map((e) => {
  const eStr = e.toLocaleString('de-DE');
  return {
    slug: `${e}-euro-erhoehung`,
    erhoehung: e,
    title: `${eStr} € Gehaltserhöhung — Netto-Effekt`,
    metaTitle: `${eStr} € Gehaltserhöhung — Wie viel kommt netto an?`,
    metaDescription: `${eStr} € brutto mehr Gehalt: Wie viel bleibt netto? ✓ Steuerprogression ✓ Sozialabgaben ✓ Kostenlos berechnen`,
    h1: `${eStr} € Gehaltserhöhung — So viel bleibt netto`,
  };
});
