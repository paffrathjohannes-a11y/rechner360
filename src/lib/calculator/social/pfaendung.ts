/**
 * Pfändungsrechner — Pfändungsfreigrenzen nach § 850c ZPO
 *
 * Perioden (jeweils 01.07.–30.06., per Pfändungsfreigrenzenbekanntmachung):
 * - 2025/26 (BGBl. 2025 I Nr. 110): Grundfreibetrag 1.555,00 €,
 *   1. Person +585,23 €, 2.–5. Person je +326,04 €, Höchstbetrag 4.767,00 €
 * - ab 01.07.2026 (BGBl. 2026 I Nr. 80): Grundfreibetrag 1.587,40 €,
 *   1. Person +597,42 €, 2.–5. Person je +332,83 €, Höchstbetrag 4.866,30 €
 *
 * Pfändungsquote auf den Mehrbetrag über der Freigrenze (§ 850c Abs. 3 ZPO):
 * 70 % ohne Unterhaltspflichten; bei 1 Person 50 %, je weitere Person −10
 * Prozentpunkte (5+ Personen: 10 %). Einkommen über dem Höchstbetrag ist
 * voll pfändbar.
 *
 * Vereinfachung: kontinuierliche Berechnung statt der amtlichen
 * 10-€-Stufen-Tabelle (Abweichung < 7 € zum Tabellenwert).
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

interface PfaendungsPeriode {
  gueltigAb: string; // ISO-Datum
  grundfreibetrag: number;
  erhoehungErstePerson: number;
  erhoehungWeiterePerson: number; // 2.–5. Person
  hoechstbetrag: number; // darüber voll pfändbar
}

const PERIODEN: PfaendungsPeriode[] = [
  // Neueste zuerst
  {
    gueltigAb: '2026-07-01',
    grundfreibetrag: 1587.40,
    erhoehungErstePerson: 597.42,
    erhoehungWeiterePerson: 332.83,
    hoechstbetrag: 4866.30,
  },
  {
    gueltigAb: '2025-07-01',
    grundfreibetrag: 1555.00,
    erhoehungErstePerson: 585.23,
    erhoehungWeiterePerson: 326.04,
    hoechstbetrag: 4767.00,
  },
];

function getPeriode(datum: Date = new Date()): PfaendungsPeriode {
  return PERIODEN.find((p) => datum >= new Date(p.gueltigAb)) ?? PERIODEN[PERIODEN.length - 1];
}

/** Pfändbarer Anteil des Mehrbetrags nach Anzahl Unterhaltspflichten (§ 850c Abs. 3 ZPO) */
function getPfaendungsquote(unterhaltspflichten: number): number {
  const quoten = [0.7, 0.5, 0.4, 0.3, 0.2, 0.1];
  return quoten[Math.min(Math.max(unterhaltspflichten, 0), 5)];
}

export function calculatePfaendung(input: PfaendungInput): PfaendungResult {
  const { nettoEinkommen, unterhaltspflichten } = input;
  const periode = getPeriode();

  // Pfändungsfreigrenze berechnen
  const beruecksichtigtePersonen = Math.min(Math.max(unterhaltspflichten, 0), 5);
  let freigrenze = periode.grundfreibetrag;
  if (beruecksichtigtePersonen >= 1) freigrenze += periode.erhoehungErstePerson;
  if (beruecksichtigtePersonen >= 2) {
    freigrenze += (beruecksichtigtePersonen - 1) * periode.erhoehungWeiterePerson;
  }
  freigrenze = Math.round(freigrenze * 100) / 100;

  let pfaendbarerBetrag = 0;
  if (nettoEinkommen > freigrenze) {
    // Mehrbetrag bis zum Höchstbetrag: anteilig pfändbar nach Quote
    const quotierterMehrbetrag = Math.min(nettoEinkommen, periode.hoechstbetrag) - freigrenze;
    // Einkommen über dem Höchstbetrag: voll pfändbar
    const vollPfaendbar = Math.max(0, nettoEinkommen - periode.hoechstbetrag);
    pfaendbarerBetrag =
      Math.round((quotierterMehrbetrag * getPfaendungsquote(unterhaltspflichten) + vollPfaendbar) * 100) / 100;
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
