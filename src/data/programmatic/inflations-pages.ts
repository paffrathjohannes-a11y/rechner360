/**
 * Programmatic SEO Pages für den Inflationsrechner
 * "Kaufkraft 10000 Euro seit 2000" etc.
 */

const SZENARIEN: { betrag: number; jahre: number; rate: number; label: string; slugSuffix: string }[] = [
  { betrag: 1000, jahre: 10, rate: 3, label: '1.000 € Kaufkraft in 10 Jahren', slugSuffix: '1000-euro-in-10-jahren' },
  { betrag: 10000, jahre: 10, rate: 3, label: '10.000 € Kaufkraft in 10 Jahren', slugSuffix: '10000-euro-in-10-jahren' },
  { betrag: 10000, jahre: 20, rate: 3, label: '10.000 € Kaufkraft in 20 Jahren', slugSuffix: '10000-euro-in-20-jahren' },
  { betrag: 50000, jahre: 10, rate: 3, label: '50.000 € Kaufkraft in 10 Jahren', slugSuffix: '50000-euro-in-10-jahren' },
  { betrag: 100000, jahre: 10, rate: 3, label: '100.000 € Kaufkraft in 10 Jahren', slugSuffix: '100000-euro-in-10-jahren' },
  { betrag: 100000, jahre: 20, rate: 2, label: '100.000 € bei 2% Inflation über 20 Jahre', slugSuffix: '100000-euro-2-prozent-20-jahre' },
  { betrag: 10000, jahre: 30, rate: 2, label: '10.000 € Kaufkraft in 30 Jahren', slugSuffix: '10000-euro-in-30-jahren' },
  { betrag: 50000, jahre: 20, rate: 3, label: '50.000 € Kaufkraft in 20 Jahren', slugSuffix: '50000-euro-in-20-jahren' },
];

export interface InflationsPageDef {
  slug: string;
  betrag: number;
  jahre: number;
  rate: number;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
}

export const INFLATIONS_PAGES: InflationsPageDef[] = SZENARIEN.map((s) => {
  const bStr = s.betrag.toLocaleString('de-DE');
  const kaufkraft = Math.round(s.betrag / Math.pow(1 + s.rate / 100, s.jahre));
  const kStr = kaufkraft.toLocaleString('de-DE');
  return {
    slug: `kaufkraft-${s.slugSuffix}`,
    betrag: s.betrag,
    jahre: s.jahre,
    rate: s.rate,
    title: `${s.label} — Kaufkraftrechner`,
    metaTitle: `${bStr} € in ${s.jahre} Jahren — nur noch ${kStr} € wert (${s.rate}% Inflation)`,
    metaDescription: `Was sind ${bStr} € in ${s.jahre} Jahren noch wert? Bei ${s.rate}% Inflation nur noch ${kStr} €. ✓ Kostenloser Inflationsrechner`,
    h1: `${bStr} € — Kaufkraft in ${s.jahre} Jahren bei ${s.rate}% Inflation`,
  };
});
