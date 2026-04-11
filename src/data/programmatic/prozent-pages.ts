/**
 * Programmatic SEO Pages für den Prozentrechner
 * "20 Prozent von 500" etc.
 */

const KOMBIS: { prozent: number; grundwert: number; label: string }[] = [
  { prozent: 10, grundwert: 100, label: '10 Prozent von 100' },
  { prozent: 15, grundwert: 200, label: '15 Prozent von 200' },
  { prozent: 19, grundwert: 100, label: '19 Prozent von 100' },
  { prozent: 20, grundwert: 500, label: '20 Prozent von 500' },
  { prozent: 25, grundwert: 200, label: '25 Prozent von 200' },
  { prozent: 30, grundwert: 1000, label: '30 Prozent von 1000' },
  { prozent: 50, grundwert: 300, label: '50 Prozent von 300' },
  { prozent: 7, grundwert: 100, label: '7 Prozent von 100' },
];

export interface ProzentPageDef {
  slug: string;
  prozent: number;
  grundwert: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export const PROZENT_PAGES: ProzentPageDef[] = KOMBIS.map((k) => ({
  slug: `${k.prozent}-prozent-von-${k.grundwert}`,
  prozent: k.prozent,
  grundwert: k.grundwert,
  title: `${k.label} — Ergebnis`,
  metaTitle: `${k.label} = ${(k.grundwert * k.prozent / 100).toLocaleString('de-DE')} | Prozentrechner`,
  metaDescription: `${k.label} = ${(k.grundwert * k.prozent / 100).toLocaleString('de-DE')}. Prozent einfach berechnen mit dem kostenlosen Prozentrechner.`,
  h1: `${k.label} — So rechnen Sie es aus`,
}));
