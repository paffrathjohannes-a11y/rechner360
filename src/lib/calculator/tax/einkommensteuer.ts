/**
 * Einkommensteuer-Berechnung 2026 nach §32a EStG
 * Direkte Tarifformel auf das zu versteuernde Einkommen (zvE).
 *
 * Grundfreibetrag 2026: 12.348 €
 * Tarif: BMF-Schreiben vom 12.11.2025
 */

import { BUNDESLAENDER } from '@/lib/utils/constants';

// ─── §32a EStG Tarif 2026 ───────────────────────────────────────────────────

const GRUNDFREIBETRAG = 12348;
const ZONE2_END = 17799;
const ZONE3_END = 69878;  // Spitzensteuersatz ab hier (42%)
const ZONE4_END = 277825; // Reichensteuersatz ab hier (45%)

/** Berechnet ESt nach §32a EStG 2026 für Grundtabelle (Ledige) */
function tarifEst(zvE: number): number {
  if (zvE <= GRUNDFREIBETRAG) return 0;

  if (zvE <= ZONE2_END) {
    const y = (zvE - GRUNDFREIBETRAG) / 10000;
    return Math.floor((914.51 * y + 1400) * y);
  }

  if (zvE <= ZONE3_END) {
    const z = (zvE - ZONE2_END) / 10000;
    return Math.floor((173.10 * z + 2397) * z + 1034.87);
  }

  if (zvE <= ZONE4_END) {
    return Math.floor(0.42 * zvE - 11135.63);
  }

  return Math.floor(0.45 * zvE - 19470.38);
}

/** Berechnet ESt nach Splittingtabelle (Verheiratete, SK III) */
function splittingEst(zvE: number): number {
  return 2 * tarifEst(Math.floor(zvE / 2));
}

// ─── Solidaritätszuschlag ────────────────────────────────────────────────────

const SOLI_SATZ = 0.055; // 5,5%
const SOLI_FREIGRENZE_GRUND = 20350; // Grundtabelle 2026
const SOLI_FREIGRENZE_SPLITTING = 40700; // Splittingtabelle 2026

function berechneSoli(est: number, splitting: boolean): number {
  const freigrenze = splitting ? SOLI_FREIGRENZE_SPLITTING : SOLI_FREIGRENZE_GRUND;
  if (est <= freigrenze) return 0;

  // Gleitzone: max 11,9% des Überhangs
  const ueberhang = est - freigrenze;
  const soliGleit = Math.round(ueberhang * 0.119 * 100) / 100;
  const soliVoll = Math.round(est * SOLI_SATZ * 100) / 100;

  return Math.min(soliGleit, soliVoll);
}

// ─── Interfaces ─────────────────────────────────────────────────────────────

export interface EinkommensteuerInput {
  zvE: number;
  steuerklasse: 1 | 2 | 3 | 4 | 5 | 6;
  kirchensteuer: boolean;
  bundesland: string;
  kinderfreibetraege: number;
}

export interface EinkommensteuerResult {
  einkommensteuer: number;
  solidaritaetszuschlag: number;
  kirchensteuer: number;
  gesamtbelastung: number;
  grenzsteuersatz: number;
  durchschnittssteuersatz: number;
  nettoeinkommen: number;
  aufschluesselung: { label: string; betrag: number }[];
}

// ─── Hauptberechnung ────────────────────────────────────────────────────────

export function calculateEinkommensteuer(input: EinkommensteuerInput): EinkommensteuerResult {
  const { zvE, steuerklasse, kirchensteuer, bundesland, kinderfreibetraege } = input;

  // Kinderfreibetrag abziehen (6.828€ pro Kind, 2026)
  const kinderfreibetrag = kinderfreibetraege * 6828;
  const zvEBereinigt = Math.max(0, zvE - kinderfreibetrag);

  // Splitting (SK III) oder Grundtarif
  const splitting = steuerklasse === 3;
  const est = splitting ? splittingEst(zvEBereinigt) : tarifEst(zvEBereinigt);

  // Solidaritätszuschlag
  const soli = berechneSoli(est, splitting);

  // Kirchensteuer
  let kist = 0;
  if (kirchensteuer) {
    const bl = BUNDESLAENDER.find((b) => b.id === bundesland);
    const kiStSatz = bl?.kirchensteuer ?? 0.09;
    kist = Math.round(est * kiStSatz * 100) / 100;
  }

  const gesamt = Math.round((est + soli + kist) * 100) / 100;
  const netto = zvE - gesamt;

  // Grenzsteuersatz: Steuersatz auf den nächsten verdienten Euro
  const estBase = splitting ? splittingEst(zvEBereinigt) : tarifEst(zvEBereinigt);
  const estPlus = splitting ? splittingEst(zvEBereinigt + 100) : tarifEst(zvEBereinigt + 100);
  const grenzsteuersatz = zvEBereinigt > 0
    ? Math.round((estPlus - estBase) * 100) / 100
    : 0;

  const durchschnittssteuersatz = zvE > 0 ? Math.round((est / zvE) * 10000) / 100 : 0;

  return {
    einkommensteuer: est,
    solidaritaetszuschlag: soli,
    kirchensteuer: kist,
    gesamtbelastung: gesamt,
    grenzsteuersatz,
    durchschnittssteuersatz,
    nettoeinkommen: netto,
    aufschluesselung: [
      { label: 'Zu versteuerndes Einkommen', betrag: zvE },
      { label: 'Einkommensteuer', betrag: est },
      { label: 'Solidaritätszuschlag', betrag: soli },
      ...(kirchensteuer ? [{ label: 'Kirchensteuer', betrag: kist }] : []),
      { label: 'Steuerbelastung gesamt', betrag: gesamt },
      { label: 'Verbleibendes Einkommen', betrag: netto },
    ],
  };
}
