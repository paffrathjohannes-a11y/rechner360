/**
 * Programmatic SEO Pages für den Abfindungsrechner
 * "Abfindung 20000 Euro Steuer" etc.
 */

const ABFINDUNGEN = [10000, 15000, 20000, 25000, 30000, 40000, 50000, 75000, 100000];

export interface AbfindungsPageDef {
  slug: string;
  abfindung: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export const ABFINDUNGS_PAGES: AbfindungsPageDef[] = ABFINDUNGEN.map((a) => {
  const aStr = a.toLocaleString('de-DE');
  return {
    slug: `${a}-euro-abfindung`,
    abfindung: a,
    title: `${aStr} € Abfindung — Steuer & Netto`,
    metaTitle: `${aStr} € Abfindung — wie viel Steuer? Netto mit Fünftelregelung`,
    metaDescription: `${aStr} € Abfindung: Wie viel Steuer fällt an? ✓ Mit Fünftelregelung ✓ Netto-Abfindung ✓ Kostenlos berechnen`,
    h1: `${aStr} € Abfindung — Steuer und Netto-Betrag`,
  };
});
