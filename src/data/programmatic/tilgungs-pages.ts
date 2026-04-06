/**
 * Programmatic SEO Pages für den Tilgungsrechner
 */

const BETRAEGE = [150000, 200000, 250000, 300000, 350000, 400000, 500000];
const TILGUNGEN = [1, 2, 3];

export interface TilgungsPageDef {
  slug: string;
  betrag: number;
  tilgung: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export function generateTilgungsPages(): TilgungsPageDef[] {
  const pages: TilgungsPageDef[] = [];

  for (const betrag of BETRAEGE) {
    const betragStr = betrag.toLocaleString('de-DE');
    const slug = `${betrag}-euro-baufinanzierung`;

    pages.push({
      slug,
      betrag,
      tilgung: 2,
      title: `${betragStr} € Baufinanzierung — Tilgungsplan`,
      metaTitle: `${betragStr} € Baufinanzierung — Tilgungsplan & Rate 2026`,
      metaDescription: `Tilgungsplan für ${betragStr} € Baufinanzierung. ✓ Monatliche Rate ✓ Restschuld ✓ Laufzeit ✓ Kostenlos berechnen`,
      h1: `${betragStr} € Baufinanzierung — Tilgungsplan berechnen`,
    });
  }

  return pages;
}

export const TILGUNGS_PAGES = generateTilgungsPages();
