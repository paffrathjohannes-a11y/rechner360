/**
 * Programmatic SEO Pages für den Erbschaftsteuer Rechner
 * "Erbschaftsteuer bei 500.000 Euro Ehepartner" etc.
 */

import type { Verwandtschaft } from '@/types/calculator';

const BETRAEGE = [100_000, 200_000, 300_000, 400_000, 500_000, 750_000, 1_000_000];

const BEZIEHUNGEN: { id: Verwandtschaft; label: string; slug: string }[] = [
  { id: 'ehepartner', label: 'Ehepartner', slug: 'ehepartner' },
  { id: 'kind', label: 'Kind', slug: 'kind' },
  { id: 'enkelkind', label: 'Enkelkind', slug: 'enkelkind' },
  { id: 'geschwister', label: 'Geschwister', slug: 'geschwister' },
];

export interface ErbschaftsteuerPageDef {
  slug: string;
  wert: number;
  verwandtschaft: Verwandtschaft;
  beziehungLabel: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export const ERBSCHAFTSTEUER_PAGES: ErbschaftsteuerPageDef[] = BETRAEGE.flatMap((wert) => {
  const wertStr = wert.toLocaleString('de-DE');
  return BEZIEHUNGEN.map((bez) => ({
    slug: `${wert}-euro-${bez.slug}`,
    wert,
    verwandtschaft: bez.id,
    beziehungLabel: bez.label,
    title: `Erbschaftsteuer bei ${wertStr} \u20ac f\u00fcr ${bez.label}`,
    metaTitle: `Erbschaftsteuer ${wertStr} \u20ac ${bez.label} \u2014 Berechnung 2026`,
    metaDescription: `Wie viel Erbschaftsteuer bei ${wertStr} \u20ac f\u00fcr ${bez.label}? \u2713 Freibetr\u00e4ge \u2713 Steuerklasse \u2713 Kostenlos berechnen`,
    h1: `Erbschaftsteuer bei ${wertStr} \u20ac f\u00fcr ${bez.label}`,
  }));
});
