/**
 * Programmatic SEO Pages für den Grundsicherung Rechner (ehem. Bürgergeld)
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
  { slug: 'alleinstehend', typ: 'single', title: 'Grundsicherung Alleinstehende', metaTitle: 'Grundsicherung Alleinstehende 2026 — Regelsatz & Anspruch', metaDescription: 'Grundsicherung für Alleinstehende: 563 € Regelsatz + Miete. ✓ Freibeträge ✓ Vermögen ✓ Kostenlos berechnen', h1: 'Grundsicherung für Alleinstehende — Anspruch berechnen' },
  { slug: 'paar', typ: 'paar', title: 'Grundsicherung Paar / Bedarfsgemeinschaft', metaTitle: 'Grundsicherung Paar 2026 — Bedarfsgemeinschaft berechnen', metaDescription: 'Grundsicherung für Paare: 2× 506 € + Miete. ✓ Bedarfsgemeinschaft ✓ Freibeträge ✓ Kostenlos berechnen', h1: 'Grundsicherung für Paare — Bedarfsgemeinschaft berechnen' },
  { slug: 'mit-kind', typ: 'mit-kind', title: 'Grundsicherung mit Kind', metaTitle: 'Grundsicherung mit Kind 2026 — Regelsatz Kinder & Alleinerziehende', metaDescription: 'Grundsicherung mit Kind: Regelsatz nach Alter + Mehrbedarf Alleinerziehende. ✓ Kostenlos berechnen', h1: 'Grundsicherung mit Kind — Regelsatz & Mehrbedarf' },
  { slug: 'mit-2-kindern', typ: 'mit-2-kindern', title: 'Grundsicherung mit 2 Kindern', metaTitle: 'Grundsicherung mit 2 Kindern 2026 — Anspruch berechnen', metaDescription: 'Grundsicherung mit 2 Kindern: Regelsätze nach Alter + Warmmiete. ✓ Freibeträge ✓ Kostenlos berechnen', h1: 'Grundsicherung mit 2 Kindern — Anspruch berechnen' },
  { slug: 'alleinerziehend', typ: 'alleinerziehend', title: 'Grundsicherung Alleinerziehende', metaTitle: 'Grundsicherung Alleinerziehende 2026 — Regelsatz & Mehrbedarf', metaDescription: 'Grundsicherung für Alleinerziehende: 563 € + Mehrbedarf + Kinderzuschlag. ✓ Kostenlos berechnen', h1: 'Grundsicherung für Alleinerziehende — Mehrbedarf & Anspruch' },
];
