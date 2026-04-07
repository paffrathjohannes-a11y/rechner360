/**
 * Nebenkostenrechner — Kaufnebenkosten beim Immobilienkauf
 *
 * Grunderwerbsteuer nach Bundesland + Notar + Grundbuch + Makler
 */

export interface NebenkostenInput {
  kaufpreis: number;
  bundesland: string;
  makler: boolean;
  maklerSatz: number; // in % (z.B. 3.57 für 3,57%)
}

export interface NebenkostenResult {
  grunderwerbsteuer: number;
  grunderwerbsteuerSatz: number;
  notar: number;
  grundbuch: number;
  makler: number;
  nebenkosten_gesamt: number;
  gesamtkosten: number;
  nebenkosten_prozent: number;
}

/** Grunderwerbsteuer-Sätze nach Bundesland (Stand 2025/2026) */
const GRUNDERWERBSTEUER: Record<string, number> = {
  bw: 5.0,
  by: 3.5,
  be: 6.0,
  bb: 6.5,
  hb: 5.0,
  hh: 5.5,
  he: 6.0,
  mv: 6.0,
  ni: 5.0,
  nw: 6.5,
  rp: 5.0,
  sl: 6.5,
  sn: 5.5,
  st: 5.0,
  sh: 6.5,
  th: 5.0,
};

export function calculateNebenkosten(input: NebenkostenInput): NebenkostenResult {
  const { kaufpreis, bundesland, makler: hatMakler, maklerSatz } = input;

  const grewStSatz = GRUNDERWERBSTEUER[bundesland] ?? 5.0;
  const grunderwerbsteuer = Math.round(kaufpreis * grewStSatz / 100);

  // Notar: ca. 1,5% des Kaufpreises (vereinfacht)
  const notar = Math.round(kaufpreis * 0.015);

  // Grundbuch: ca. 0,5% des Kaufpreises
  const grundbuch = Math.round(kaufpreis * 0.005);

  // Makler
  const maklerKosten = hatMakler ? Math.round(kaufpreis * maklerSatz / 100) : 0;

  const nebenkosten_gesamt = grunderwerbsteuer + notar + grundbuch + maklerKosten;
  const gesamtkosten = kaufpreis + nebenkosten_gesamt;
  const nebenkosten_prozent = kaufpreis > 0 ? Math.round((nebenkosten_gesamt / kaufpreis) * 10000) / 100 : 0;

  return {
    grunderwerbsteuer,
    grunderwerbsteuerSatz: grewStSatz,
    notar,
    grundbuch,
    makler: maklerKosten,
    nebenkosten_gesamt,
    gesamtkosten,
    nebenkosten_prozent,
  };
}
