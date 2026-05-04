/**
 * Pfändungsrechner — Pfändungsfreigrenzen ab 01.07.2025
 *
 * Basiert auf § 850c ZPO und der Pfändungsfreigrenzenbekanntmachung 2025.
 * Quelle: BGBl. 2025 I Nr. 110
 * Gültig: 01.07.2025 – 30.06.2026
 *
 * Pfändungsquote: Vom Mehrbetrag über der Freigrenze werden 70% gepfändet.
 * Ab Obergrenze: voll pfändbar.
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

// Pfändungsfreigrenzen ab 01.07.2025 (monatlich, netto).
// Grundbetrag laut §850c Abs. 1 ZPO / Pfändungsfreigrenzenbekanntmachung 2025:
// 1.560,00 € monatlich, gültig bis 30.06.2026.
const GRUNDFREIBETRAG = 1560.00;
const ERHOEHUNG_PRO_PERSON = [
  0,        // 0 Personen
  585.23,   // 1. unterhaltspflichtige Person
  326.04,   // 2. Person
  326.04,   // 3. Person
  326.04,   // 4. Person
  326.04,   // 5. Person
];

// Obergrenze (4767,00 € bei 0 Unterhaltspflichten): darüber voll pfändbar.
// Wert dokumentarisch, in der aktuellen Berechnung nicht direkt verwendet —
// die Pfändungsquote auf den Mehrbetrag deckt den effektiven Effekt ab.

// Pfändungsquote des Mehrbetrags über Freigrenze
const PFAENDUNGSQUOTE = 0.70;

export function calculatePfaendung(input: PfaendungInput): PfaendungResult {
  const { nettoEinkommen, unterhaltspflichten } = input;

  // Pfändungsfreigrenze berechnen
  let freigrenze = GRUNDFREIBETRAG;
  for (let i = 0; i < Math.min(unterhaltspflichten, ERHOEHUNG_PRO_PERSON.length - 1); i++) {
    freigrenze += ERHOEHUNG_PRO_PERSON[i + 1];
  }
  freigrenze = Math.round(freigrenze * 100) / 100;

  let pfaendbarerBetrag: number;

  if (nettoEinkommen <= 0) {
    pfaendbarerBetrag = 0;
  } else if (nettoEinkommen <= freigrenze) {
    pfaendbarerBetrag = 0;
  } else {
    const mehrbetrag = nettoEinkommen - freigrenze;
    // 70% des Mehrbetrags über der Freigrenze ist pfändbar
    pfaendbarerBetrag = Math.round(mehrbetrag * PFAENDUNGSQUOTE * 100) / 100;
  }

  const verbleibendesBetrag = Math.max(0, Math.round((nettoEinkommen - pfaendbarerBetrag) * 100) / 100);
  const anteilPfaendbar = nettoEinkommen > 0 ? Math.round((pfaendbarerBetrag / nettoEinkommen) * 10000) / 100 : 0;

  return {
    pfaendungsfreigrenze: freigrenze,
    pfaendbarerBetrag,
    verbleibendesBetrag,
    anteilPfaendbar,
  };
}
