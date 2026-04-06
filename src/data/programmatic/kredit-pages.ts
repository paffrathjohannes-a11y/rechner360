/**
 * Programmatic SEO Pages für den Kreditrechner
 */

const BETRAEGE = [5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 75000, 100000];
const ZINSSAETZE = [3.0, 4.5, 5.5, 7.0];

export interface KreditPageDef {
  slug: string;
  betrag: number;
  zinssatz: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export function generateKreditPages(): KreditPageDef[] {
  const pages: KreditPageDef[] = [];

  for (const betrag of BETRAEGE) {
    const betragStr = betrag.toLocaleString('de-DE');
    const slug = `${betrag}-euro-kredit`;

    pages.push({
      slug,
      betrag,
      zinssatz: 5.5,
      title: `${betragStr} € Kredit — Rate & Kosten berechnen`,
      metaTitle: `${betragStr} € Kredit — Monatliche Rate berechnen 2026`,
      metaDescription: `Was kostet ein ${betragStr} € Kredit? ✓ Monatliche Rate ✓ Gesamtkosten ✓ Tilgungsplan ✓ Kostenlos berechnen`,
      h1: `${betragStr} € Kredit — monatliche Rate & Gesamtkosten`,
    });
  }

  return pages;
}

export const KREDIT_PAGES = generateKreditPages();
