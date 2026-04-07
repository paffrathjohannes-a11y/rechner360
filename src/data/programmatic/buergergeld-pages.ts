/**
 * Programmatic SEO Pages für den Bürgergeld Rechner
 */

export interface BuergergeldPageDef {
  slug: string;
  typ: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export const BUERGERGELD_PAGES: BuergergeldPageDef[] = [
  { slug: 'alleinstehend', typ: 'single', title: 'Bürgergeld Alleinstehende', metaTitle: 'Bürgergeld Alleinstehende 2026 — Regelsatz & Anspruch', metaDescription: 'Bürgergeld für Alleinstehende: 563 € Regelsatz + Miete. ✓ Freibeträge ✓ Vermögen ✓ Kostenlos berechnen', h1: 'Bürgergeld für Alleinstehende — Anspruch berechnen' },
  { slug: 'paar', typ: 'paar', title: 'Bürgergeld Paar / Bedarfsgemeinschaft', metaTitle: 'Bürgergeld Paar 2026 — Bedarfsgemeinschaft berechnen', metaDescription: 'Bürgergeld für Paare: 2× 506 € + Miete. ✓ Bedarfsgemeinschaft ✓ Freibeträge ✓ Kostenlos berechnen', h1: 'Bürgergeld für Paare — Bedarfsgemeinschaft berechnen' },
  { slug: 'mit-kind', typ: 'mit-kind', title: 'Bürgergeld mit Kind', metaTitle: 'Bürgergeld mit Kind 2026 — Regelsatz Kinder & Alleinerziehende', metaDescription: 'Bürgergeld mit Kind: Regelsatz nach Alter + Mehrbedarf Alleinerziehende. ✓ Kostenlos berechnen', h1: 'Bürgergeld mit Kind — Regelsatz & Mehrbedarf' },
  { slug: 'mit-2-kindern', typ: 'mit-2-kindern', title: 'Bürgergeld mit 2 Kindern', metaTitle: 'Bürgergeld mit 2 Kindern 2026 — Anspruch berechnen', metaDescription: 'Bürgergeld mit 2 Kindern: Regelsätze nach Alter + Warmmiete. ✓ Freibeträge ✓ Kostenlos berechnen', h1: 'Bürgergeld mit 2 Kindern — Anspruch berechnen' },
  { slug: 'alleinerziehend', typ: 'alleinerziehend', title: 'Bürgergeld Alleinerziehende', metaTitle: 'Bürgergeld Alleinerziehende 2026 — Regelsatz & Mehrbedarf', metaDescription: 'Bürgergeld für Alleinerziehende: 563 € + Mehrbedarf + Kinderzuschlag. ✓ Kostenlos berechnen', h1: 'Bürgergeld für Alleinerziehende — Mehrbedarf & Anspruch' },
];
