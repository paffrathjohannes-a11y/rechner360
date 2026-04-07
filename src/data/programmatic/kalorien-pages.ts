/**
 * Programmatic SEO Pages für den Kalorienrechner
 * "Kalorienbedarf Mann 80kg", "Kalorienbedarf Frau 60kg" etc.
 */

const GEWICHTE_MANN = [65, 70, 75, 80, 85, 90, 95, 100];
const GEWICHTE_FRAU = [50, 55, 60, 65, 70, 75, 80];

export interface KalorienPageDef {
  slug: string;
  gewicht: number;
  geschlecht: 'mann' | 'frau';
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export const KALORIEN_PAGES: KalorienPageDef[] = [
  ...GEWICHTE_MANN.map((g) => ({
    slug: `mann-${g}kg`,
    gewicht: g,
    geschlecht: 'mann' as const,
    title: `Kalorienbedarf Mann ${g} kg`,
    metaTitle: `Kalorienbedarf Mann ${g} kg \u2014 T\u00e4gliche Kalorien berechnen`,
    metaDescription: `Wie viele Kalorien braucht ein Mann mit ${g} kg? \u2713 Grundumsatz \u2713 Gesamtumsatz \u2713 Zielkalorien \u2713 Kostenlos`,
    h1: `Kalorienbedarf f\u00fcr M\u00e4nner mit ${g} kg`,
  })),
  ...GEWICHTE_FRAU.map((g) => ({
    slug: `frau-${g}kg`,
    gewicht: g,
    geschlecht: 'frau' as const,
    title: `Kalorienbedarf Frau ${g} kg`,
    metaTitle: `Kalorienbedarf Frau ${g} kg \u2014 T\u00e4gliche Kalorien berechnen`,
    metaDescription: `Wie viele Kalorien braucht eine Frau mit ${g} kg? \u2713 Grundumsatz \u2713 Gesamtumsatz \u2713 Zielkalorien \u2713 Kostenlos`,
    h1: `Kalorienbedarf f\u00fcr Frauen mit ${g} kg`,
  })),
];
