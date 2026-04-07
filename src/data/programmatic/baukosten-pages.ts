/**
 * Programmatic SEO Pages für den Baukosten Rechner
 * "Hausbau 120 qm Kosten", "Haus bauen 150 qm" etc.
 */

const FLAECHEN = [100, 120, 130, 140, 150, 160, 180, 200];

export interface BaukostenPageDef {
  slug: string;
  wohnflaeche: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export const BAUKOSTEN_PAGES: BaukostenPageDef[] = FLAECHEN.map((f) => ({
  slug: `${f}-qm-haus`,
  wohnflaeche: f,
  title: `Hausbau ${f} m² — Kosten berechnen`,
  metaTitle: `Haus bauen ${f} m² — Was kostet ein ${f} qm Haus 2026?`,
  metaDescription: `Was kostet ein Haus mit ${f} m² Wohnfläche? ✓ Massiv vs. Fertighaus ✓ Mit Keller ✓ Alle Nebenkosten ✓ 2026`,
  h1: `Was kostet ein Haus mit ${f} m² Wohnfläche?`,
}));
