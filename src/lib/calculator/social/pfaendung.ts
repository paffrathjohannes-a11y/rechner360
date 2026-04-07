/**
 * Pfändungsrechner — Pfändungsfreigrenzen 2025/2026
 *
 * Basiert auf § 850c ZPO und der Pfändungsfreigrenzenbekanntmachung.
 * Die Pfändungstabelle wird alle 2 Jahre angepasst (zuletzt 01.07.2023).
 *
 * Vereinfachte Berechnung basierend auf den Grundfreibeträgen.
 */

export interface PfaendungInput {
  nettoEinkommen: number;
  unterhaltspflichten: number; // Anzahl Personen mit Unterhaltspflicht
}

export interface PfaendungResult {
  pfaendungsfreigrenze: number;
  pfaendbarerBetrag: number;
  verbleibendesBetrag: number;
  anteilPfaendbar: number; // Prozent
}

// Pfändungsfreigrenzen ab 01.07.2023 (monatlich, netto)
// Grundfreibetrag + Erhöhung pro unterhaltspflichtige Person
const GRUNDFREIBETRAG = 1402.28; // monatlich
const ERHOEHUNG_PRO_PERSON = [
  0,       // 0 Personen
  527.76,  // 1. Person
  294.02,  // 2. Person
  294.02,  // 3. Person
  294.02,  // 4. Person
  294.02,  // 5. Person
];

// Oberhalb Pfändungsfreigrenze: gestaffelte Pfändung
// Bis 4298,81€ (bei 0 Unterhaltspflichten):
// Vom Mehrbetrag werden 30% nicht gepfändet (70% pfändbar)
// Ab Obergrenze: voll pfändbar
const PFAENDUNGSQUOTE = 0.70; // 70% des Mehrbetrags über Freigrenze pfändbar
const OBERGRENZE_BASIS = 4298.81;

export function calculatePfaendung(input: PfaendungInput): PfaendungResult {
  const { nettoEinkommen, unterhaltspflichten } = input;

  // Pfändungsfreigrenze berechnen
  let freigrenze = GRUNDFREIBETRAG;
  for (let i = 0; i < Math.min(unterhaltspflichten, ERHOEHUNG_PRO_PERSON.length - 1); i++) {
    freigrenze += ERHOEHUNG_PRO_PERSON[i + 1];
  }
  freigrenze = Math.round(freigrenze * 100) / 100;

  let pfaendbarerBetrag: number;

  if (nettoEinkommen <= freigrenze) {
    pfaendbarerBetrag = 0;
  } else {
    const mehrbetrag = nettoEinkommen - freigrenze;
    // Vereinfacht: 70% des Mehrbetrags über der Freigrenze ist pfändbar
    // (tatsächlich wird in 10€-Schritten gerechnet, hier vereinfacht)
    pfaendbarerBetrag = Math.round(mehrbetrag * PFAENDUNGSQUOTE * 100) / 100;
  }

  const verbleibendesBetrag = Math.round((nettoEinkommen - pfaendbarerBetrag) * 100) / 100;
  const anteilPfaendbar = nettoEinkommen > 0 ? Math.round((pfaendbarerBetrag / nettoEinkommen) * 10000) / 100 : 0;

  return {
    pfaendungsfreigrenze: freigrenze,
    pfaendbarerBetrag,
    verbleibendesBetrag,
    anteilPfaendbar,
  };
}
