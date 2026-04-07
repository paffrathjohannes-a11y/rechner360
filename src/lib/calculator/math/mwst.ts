/**
 * MwSt Rechner — Mehrwertsteuer / Umsatzsteuer
 */

export interface MwstResult {
  netto: number;
  mwst: number;
  brutto: number;
  steuersatz: number;
}

export function nettoZuBrutto(netto: number, steuersatz: number): MwstResult {
  const mwst = Math.round(netto * steuersatz / 100 * 100) / 100;
  return { netto, mwst, brutto: Math.round((netto + mwst) * 100) / 100, steuersatz };
}

export function bruttoZuNetto(brutto: number, steuersatz: number): MwstResult {
  const netto = Math.round(brutto / (1 + steuersatz / 100) * 100) / 100;
  const mwst = Math.round((brutto - netto) * 100) / 100;
  return { netto, mwst, brutto, steuersatz };
}

export function mwstAusBetrag(betrag: number, steuersatz: number): MwstResult {
  // betrag = MwSt-Anteil → Netto und Brutto berechnen
  const netto = Math.round(betrag / steuersatz * 100 * 100) / 100;
  return { netto, mwst: betrag, brutto: Math.round((netto + betrag) * 100) / 100, steuersatz };
}
