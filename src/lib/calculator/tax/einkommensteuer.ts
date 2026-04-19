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

/** Berechnet ESt nach Splittingtabelle (Verheiratete, Zusammenveranlagung) */
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

// ─── Altersentlastungsbetrag §24a EStG ──────────────────────────────────────
// Tabelle nach Wachstumschancengesetz (Abbau 0,4 Prozentpunkte/Jahr ab 2023).
// Key = Kalenderjahr, das auf die Vollendung des 64. Lebensjahres folgt.
// (D. h. erstmalige Berücksichtigung im Folgejahr des 64. Geburtstags.)
const ALTERSENTLASTUNG_TABELLE: Record<number, { prozent: number; hoechst: number }> = {
  2005: { prozent: 0.400, hoechst: 1900 },
  2006: { prozent: 0.384, hoechst: 1824 },
  2007: { prozent: 0.368, hoechst: 1748 },
  2008: { prozent: 0.352, hoechst: 1672 },
  2009: { prozent: 0.336, hoechst: 1596 },
  2010: { prozent: 0.320, hoechst: 1520 },
  2011: { prozent: 0.304, hoechst: 1444 },
  2012: { prozent: 0.288, hoechst: 1368 },
  2013: { prozent: 0.272, hoechst: 1292 },
  2014: { prozent: 0.256, hoechst: 1216 },
  2015: { prozent: 0.240, hoechst: 1140 },
  2016: { prozent: 0.224, hoechst: 1064 },
  2017: { prozent: 0.208, hoechst: 988 },
  2018: { prozent: 0.192, hoechst: 912 },
  2019: { prozent: 0.176, hoechst: 836 },
  2020: { prozent: 0.160, hoechst: 760 },
  2021: { prozent: 0.152, hoechst: 722 },
  2022: { prozent: 0.144, hoechst: 684 },
  2023: { prozent: 0.140, hoechst: 665 },
  2024: { prozent: 0.136, hoechst: 646 },
  2025: { prozent: 0.132, hoechst: 627 },
  2026: { prozent: 0.128, hoechst: 608 },
};

/**
 * Altersentlastungsbetrag nach §24a EStG.
 * Bemessungsgrundlage hier: Bruttojahreseinkommen (vereinfacht, ohne Renten/Pensionen).
 * Geburtsjahr bestimmt das Jahr der Vollendung des 64. LJ — relevant ab dem Folgejahr.
 */
function berechneAltersentlastung(geburtsjahr: number | undefined, einkommen: number): number {
  if (!geburtsjahr) return 0;
  const vollendung64 = geburtsjahr + 64;
  const anspruchAb = vollendung64 + 1; // erstmalig im Folgejahr
  if (anspruchAb > 2026) return 0;

  const eintrag = ALTERSENTLASTUNG_TABELLE[anspruchAb];
  if (!eintrag) return 0;

  return Math.min(eintrag.prozent * einkommen, eintrag.hoechst);
}

// ─── Interfaces ─────────────────────────────────────────────────────────────

export type EinkommensArt = 'zve' | 'brutto';

export interface EinkommensteuerInput {
  einkommen: number;
  einkommensArt: EinkommensArt; // 'zve' = direkt, 'brutto' = Pauschalen abziehen
  steuerklasse: 1 | 2 | 3 | 4 | 5 | 6;
  zusammenveranlagung: boolean; // eigener Schalter (unabhängig von SK)
  kirchensteuer: boolean;
  bundesland: string;
  kinderfreibetraege: number;
  /** Geburtsjahr für Altersentlastungsbetrag (optional). Leer = kein Abzug. */
  geburtsjahr?: number;
}

export interface EinkommensteuerResult {
  einkommensteuer: number;
  solidaritaetszuschlag: number;
  kirchensteuer: number;
  gesamtbelastung: number;
  grenzsteuersatz: number;
  durchschnittssteuersatz: number;
  nettoeinkommen: number;
  zvE: number;
  werbungskosten: number;
  sonderausgabenPausch: number;
  altersentlastung: number;
  kinderfreibetragAbzug: number;
  aufschluesselung: { label: string; betrag: number }[];
}

// Pauschbeträge 2026
const WERBUNGSKOSTEN_PAUSCHALE = 1230;
const SONDERAUSGABEN_PAUSCH_SINGLE = 36;
const SONDERAUSGABEN_PAUSCH_SPLIT = 72;
const KINDERFREIBETRAG_VOLL = 9754; // Existenzminimum 6.826 + BEA 2.928

// ─── Hauptberechnung ────────────────────────────────────────────────────────

export function calculateEinkommensteuer(input: EinkommensteuerInput): EinkommensteuerResult {
  const {
    einkommen,
    einkommensArt,
    steuerklasse,
    zusammenveranlagung,
    kirchensteuer,
    bundesland,
    kinderfreibetraege,
    geburtsjahr,
  } = input;

  // Splitting-Tarif greift bei Zusammenveranlagung ODER Steuerklasse III
  // (SK III impliziert Zusammenveranlagung im Lohnsteuerabzug)
  const splitting = zusammenveranlagung || steuerklasse === 3;

  // Wenn "brutto": Pauschalen und ggf. Altersentlastungsbetrag abziehen
  let werbungskosten = 0;
  let sonderausgabenPausch = 0;
  let altersentlastung = 0;
  let zvEAusgangsbasis = einkommen;

  if (einkommensArt === 'brutto') {
    werbungskosten = WERBUNGSKOSTEN_PAUSCHALE;
    sonderausgabenPausch = splitting ? SONDERAUSGABEN_PAUSCH_SPLIT : SONDERAUSGABEN_PAUSCH_SINGLE;
    altersentlastung = berechneAltersentlastung(geburtsjahr, einkommen);
    zvEAusgangsbasis = Math.max(0, einkommen - werbungskosten - sonderausgabenPausch - altersentlastung);
  } else {
    // Bei zvE-Modus: Altersentlastung nur informativ nicht abgezogen
    // (User gibt bereits bereinigtes Einkommen ein).
    altersentlastung = 0;
  }

  // Kinderfreibetrag abziehen (§32 Abs. 6 EStG)
  const kinderfreibetragAbzug = kinderfreibetraege * KINDERFREIBETRAG_VOLL;
  const zvE = Math.max(0, zvEAusgangsbasis - kinderfreibetragAbzug);

  // Tariflicher Est
  const est = splitting ? splittingEst(zvE) : tarifEst(zvE);

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
  const netto = einkommen - gesamt;

  // Grenzsteuersatz: Steuersatz auf den nächsten verdienten Euro
  const estBase = splitting ? splittingEst(zvE) : tarifEst(zvE);
  const estPlus = splitting ? splittingEst(zvE + 100) : tarifEst(zvE + 100);
  const grenzsteuersatz = zvE > 0
    ? Math.round((estPlus - estBase) * 100) / 100
    : 0;

  const durchschnittssteuersatz = einkommen > 0 ? Math.round((est / einkommen) * 10000) / 100 : 0;

  const aufschluesselung: { label: string; betrag: number }[] = [];

  if (einkommensArt === 'brutto') {
    aufschluesselung.push({ label: 'Bruttojahreseinkommen', betrag: einkommen });
    aufschluesselung.push({ label: 'Werbungskostenpauschale', betrag: werbungskosten });
    aufschluesselung.push({ label: `Sonderausgaben-Pauschbetrag${splitting ? ' (Splitting)' : ''}`, betrag: sonderausgabenPausch });
    if (altersentlastung > 0) {
      aufschluesselung.push({ label: 'Altersentlastungsbetrag (§24a EStG)', betrag: altersentlastung });
    }
  } else {
    aufschluesselung.push({ label: 'Zu versteuerndes Einkommen (Eingabe)', betrag: einkommen });
  }
  if (kinderfreibetragAbzug > 0) {
    aufschluesselung.push({ label: 'Kinderfreibetrag', betrag: kinderfreibetragAbzug });
  }
  aufschluesselung.push({ label: 'Zu versteuerndes Einkommen', betrag: zvE });
  aufschluesselung.push({ label: `Einkommensteuer${splitting ? ' (Splitting)' : ''}`, betrag: est });
  aufschluesselung.push({ label: 'Solidaritätszuschlag', betrag: soli });
  if (kirchensteuer) aufschluesselung.push({ label: 'Kirchensteuer', betrag: kist });
  aufschluesselung.push({ label: 'Steuerbelastung gesamt', betrag: gesamt });
  aufschluesselung.push({ label: 'Verbleibendes Einkommen', betrag: netto });

  return {
    einkommensteuer: est,
    solidaritaetszuschlag: soli,
    kirchensteuer: kist,
    gesamtbelastung: gesamt,
    grenzsteuersatz,
    durchschnittssteuersatz,
    nettoeinkommen: netto,
    zvE,
    werbungskosten,
    sonderausgabenPausch,
    altersentlastung,
    kinderfreibetragAbzug,
    aufschluesselung,
  };
}
