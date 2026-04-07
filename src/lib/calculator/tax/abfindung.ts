/**
 * Abfindungsrechner — Fünftelregelung (§ 34 EStG)
 *
 * Berechnet die Steuer auf eine Abfindung unter Anwendung
 * der Fünftelregelung zur Progressionsglättung.
 */

export interface AbfindungInput {
  jahresbrutto: number; // reguläres Jahresbrutto ohne Abfindung
  abfindung: number;
  steuerklasse: 1 | 2 | 3 | 4 | 5 | 6;
  kirchensteuer: boolean;
  kirchensteuerSatz: number; // 0.08 oder 0.09
}

export interface AbfindungResult {
  steuerOhneAbfindung: number;
  steuerMitAbfindungOhneFuenftel: number;
  steuerMitFuenftel: number;
  ersparnisDurchFuenftel: number;
  effektiverSteuersatzAbfindung: number;
  nettoAbfindung: number;
}

// Vereinfachter ESt-Tarif 2026
function estTarif(zvE: number): number {
  if (zvE <= 12348) return 0;
  if (zvE <= 17799) {
    const y = (zvE - 12348) / 10000;
    return Math.floor((914.51 * y + 1400) * y);
  }
  if (zvE <= 69878) {
    const y = (zvE - 17799) / 10000;
    return Math.floor((173.1 * y + 2397) * y + 1034.87);
  }
  if (zvE <= 277825) return Math.floor(zvE * 0.42 - 11135.63);
  return Math.floor(zvE * 0.45 - 19470.38);
}

export function calculateAbfindung(input: AbfindungInput): AbfindungResult {
  const { jahresbrutto, abfindung, steuerklasse, kirchensteuer, kirchensteuerSatz } = input;

  // Vereinfachtes zvE
  const wk = 1230;
  const sap = steuerklasse <= 5 ? 36 : 0;
  const vorsorge = Math.min(jahresbrutto * 0.12, 5000);
  const efa = steuerklasse === 2 ? 4260 : 0;

  const zvE = Math.max(0, jahresbrutto - wk - sap - vorsorge - efa);
  const kztab = steuerklasse === 3 ? 2 : 1;

  // Steuer ohne Abfindung
  const stOhne = estTarif(Math.floor(zvE / kztab)) * kztab;

  // Steuer mit Abfindung OHNE Fünftelregelung
  const zvEMit = zvE + abfindung;
  const stMitOhne5tel = estTarif(Math.floor(zvEMit / kztab)) * kztab;

  // Fünftelregelung: § 34 EStG
  // 1. Steuer auf reguläres Einkommen
  // 2. Steuer auf reguläres + 1/5 der Abfindung
  // 3. Differenz × 5 = Steuer auf Abfindung
  const zvEPlus1_5 = zvE + abfindung / 5;
  const stMit1_5 = estTarif(Math.floor(zvEPlus1_5 / kztab)) * kztab;
  const differenz = stMit1_5 - stOhne;
  const steuerAbfindung5tel = differenz * 5;
  const stMitFuenftel = stOhne + steuerAbfindung5tel;

  // Kirchensteuer
  const kiStFaktor = kirchensteuer ? (1 + kirchensteuerSatz) : 1;

  const steuerOhneAbfindung = Math.round(stOhne * kiStFaktor);
  const steuerMitAbfindungOhneFuenftel = Math.round(stMitOhne5tel * kiStFaktor);
  const steuerMitFuenftel = Math.round(stMitFuenftel * kiStFaktor);
  const ersparnisDurchFuenftel = steuerMitAbfindungOhneFuenftel - steuerMitFuenftel;

  const steuerAufAbfindung = steuerMitFuenftel - steuerOhneAbfindung;
  const effektiverSteuersatzAbfindung = abfindung > 0 ? steuerAufAbfindung / abfindung : 0;
  const nettoAbfindung = abfindung - steuerAufAbfindung;

  return {
    steuerOhneAbfindung,
    steuerMitAbfindungOhneFuenftel,
    steuerMitFuenftel,
    ersparnisDurchFuenftel: Math.max(0, ersparnisDurchFuenftel),
    effektiverSteuersatzAbfindung,
    nettoAbfindung: Math.max(0, nettoAbfindung),
  };
}
