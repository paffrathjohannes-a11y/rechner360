/**
 * Programmatic SEO Pages für den Stundenlohn Rechner
 * "15 Euro Stundenlohn Monatsgehalt" etc.
 */

const STUNDENLOHNE = [12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 25, 28, 30, 35, 40, 45, 50];

export interface StundenlohnPageDef {
  slug: string;
  stundenlohn: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export const STUNDENLOHN_PAGES: StundenlohnPageDef[] = STUNDENLOHNE.map((sl) => ({
  slug: `${sl}-euro-stundenlohn`,
  stundenlohn: sl,
  title: `${sl} € Stundenlohn — Monatsgehalt & Jahresgehalt`,
  metaTitle: `${sl} € Stundenlohn — wie viel Monatsgehalt & Jahresgehalt?`,
  metaDescription: `${sl} € Stundenlohn = wie viel im Monat und Jahr? ✓ Bei 40h/Woche ✓ Sofort berechnen ✓ Kostenlos`,
  h1: `${sl} € Stundenlohn — Monatsgehalt & Jahresgehalt`,
}));
