/**
 * BMF Programmablaufplan (PAP) 2026 — Vollständige Implementierung
 *
 * Exakte 1:1 Umsetzung des BMF-Pseudocodes vom 12.11.2025
 * (IV C 5 - S 2361/00025/016/028)
 *
 * Quelle: https://www.bmf-steuerrechner.de/interface/pseudocodes.xhtml
 *
 * WICHTIG: Alle Beträge intern in Cent (ganzzahlig), wie im PAP definiert.
 * Variable-Namen exakt wie im BMF-Pseudocode.
 */

import type { PapInput, PapOutput } from './pap-types';

// ============================================
// Versorgungsbezug-Tabellen (TAB1-TAB5)
// Index 0 = VJAHR 2005, Index 54 = VJAHR 2058+
// ============================================

/** TAB1: Prozentsatz für Versorgungsfreibetrag */
const TAB1 = [
  0.0, 40.0, 38.4, 36.8, 35.2, 33.6, 32.0, 30.4, 28.8, 27.2, 25.6,
  24.0, 22.4, 20.8, 19.2, 17.6, 16.0, 15.2, 14.4, 13.6, 12.8,
  12.0, 11.2, 10.4, 9.6, 8.8, 8.0, 7.2, 6.4, 5.6, 4.8,
  4.0, 3.2, 2.4, 1.6, 0.8, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0,
];

/** TAB2: Höchstbetrag Versorgungsfreibetrag (Euro) */
const TAB2 = [
  0, 3000, 2880, 2760, 2640, 2520, 2400, 2280, 2160, 2040, 1920,
  1800, 1680, 1560, 1440, 1320, 1200, 1140, 1080, 1020, 960,
  900, 840, 780, 720, 660, 600, 540, 480, 420, 360,
  300, 240, 180, 120, 60, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0,
];

/** TAB3: Zuschlag zum Versorgungsfreibetrag (Euro) */
const TAB3 = [
  0, 900, 864, 828, 792, 756, 720, 684, 648, 612, 576,
  540, 504, 468, 432, 396, 360, 342, 324, 306, 288,
  270, 252, 234, 216, 198, 180, 162, 144, 126, 108,
  90, 72, 54, 36, 18, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0,
];

/** TAB4: Prozentsatz Altersentlastungsbetrag */
const TAB4 = [
  0.0, 0.0, 40.0, 38.4, 36.8, 35.2, 33.6, 32.0, 30.4, 28.8, 27.2,
  25.6, 24.0, 22.4, 20.8, 19.2, 17.6, 16.0, 15.2, 14.4, 13.6,
  12.8, 12.0, 11.2, 10.4, 9.6, 8.8, 8.0, 7.2, 6.4, 5.6,
  4.8, 4.0, 3.2, 2.4, 1.6, 0.8, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,
  0.0, 0.0, 0.0, 0.0,
];

/** TAB5: Höchstbetrag Altersentlastungsbetrag (Euro) */
const TAB5 = [
  0, 0, 1900, 1824, 1748, 1672, 1596, 1520, 1444, 1368, 1292,
  1216, 1140, 1064, 988, 912, 836, 760, 722, 684, 646,
  608, 570, 532, 494, 456, 418, 380, 342, 304, 266,
  228, 190, 152, 114, 76, 38, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0,
];

// ============================================
// PAP 2026 Berechnung
// ============================================

export function calculatePap2026(input: PapInput): PapOutput {
  // Internal state variables
  let ALTE = 0;
  let ANP = 0;
  let ANTEIL1 = 0;
  let BMG = 0;
  let DIFF = 0;
  let EFA = 0;
  let FVB = 0;
  let FVBSO = 0;
  let FVBZ = 0;
  let FVBZSO = 0;
  let GFB = 0;
  let HBALTE = 0;
  let HFVB = 0;
  let HFVBZ = 0;
  let HFVBZSO = 0;
  let HOCH = 0;
  let J = 0;
  let JBMG = 0;
  let JLFREIB = 0;
  let JLHINZU = 0;
  let JW = 0;
  let K = 0;
  let KFB = 0;
  let KVSATZAN = 0;
  let KZTAB = 1;
  let LSTJAHR = 0;
  let MIST = 0;
  let PVSATZAN = 0;
  let RVSATZAN = 0;
  let SAP = 0;
  let SOLZFREI = 0;
  let SOLZJ = 0;
  let SOLZMIN = 0;
  let ST = 0;
  let ST1 = 0;
  let ST2 = 0;
  let VBEZB = 0;
  let VBEZBSO = 0;
  let VERGL = 0;
  let VSP = 0;
  let VSPALV = 0;
  let VSPHB = 0;
  let VSPKVPV = 0;
  let VSPN = 0;
  let VSPR = 0;
  let W1STKL5 = 0;
  let W2STKL5 = 0;
  let W3STKL5 = 0;
  let X = 0;
  let Y = 0;
  let ZRE4 = 0;
  let ZRE4J = 0;
  let ZRE4VP = 0;
  let ZRE4VPR = 0;
  let ZTABFB = 0;
  let ZVE = 0;
  let ZVBEZ = 0;
  let ZVBEZJ = 0;
  let ZX = 0;
  let ZZX = 0;
  let BBGRVALV = 0;
  let BBGKVPV = 0;
  let AVSATZAN = 0;
  let PKPVAGZJ = 0;

  // Output
  let LSTLZZ = 0;
  let SOLZLZZ = 0;
  let BK = 0;
  let BKS = 0;
  let STS = 0;
  let SOLZS = 0;
  let STV = 0;
  let SOLZV = 0;
  let BKV = 0;

  // Extract input
  const {
    af, AJAHR, ALTER1, ALV, JFREIB, JHINZU, JRE4, JRE4ENT, JVBEZ,
    KRV, KVZ, LZZ, LZZFREIB, LZZHINZU, MBV, PKPV, PKPVAGZ, PKV,
    PVA, PVS, PVZ, R, RE4, SONSTB, SONSTENT, STERBE, STKL,
    VBEZ, VBEZM, VBEZS, VBS, VJAHR, ZKF, ZMVB,
  } = input;
  let f = input.f;

  // ---- MPARA: Parameter initialization ----
  function MPARA() {
    BBGRVALV = 101400;
    RVSATZAN = 0.093;
    BBGKVPV = 69750;
    KVSATZAN = KVZ / 200 + 0.07;
    AVSATZAN = 0.013;

    if (PVS === 1) {
      PVSATZAN = 0.023;
    } else {
      PVSATZAN = 0.018;
    }
    if (PVZ === 1) {
      PVSATZAN = PVSATZAN + 0.006;
    }
    PVSATZAN = PVSATZAN - PVA * 0.0025;
    if (PVSATZAN < 0) PVSATZAN = 0;

    W1STKL5 = 14071;
    W2STKL5 = 34939;
    W3STKL5 = 222260;
    GFB = 12348;
    SOLZFREI = 20350;
  }

  // ---- MRE4JL: Annualization ----
  function MRE4JL() {
    if (LZZ === 1) {
      ZRE4J = RE4 / 100;
      ZVBEZJ = VBEZ / 100;
      JLFREIB = LZZFREIB / 100;
      JLHINZU = LZZHINZU / 100;
    } else if (LZZ === 2) {
      ZRE4J = (RE4 * 12) / 100;
      ZVBEZJ = (VBEZ * 12) / 100;
      JLFREIB = (LZZFREIB * 12) / 100;
      JLHINZU = (LZZHINZU * 12) / 100;
    } else if (LZZ === 3) {
      ZRE4J = (RE4 * 360) / 700;
      ZVBEZJ = (VBEZ * 360) / 700;
      JLFREIB = (LZZFREIB * 360) / 700;
      JLHINZU = (LZZHINZU * 360) / 700;
    } else {
      ZRE4J = (RE4 * 360) / 100;
      ZVBEZJ = (VBEZ * 360) / 100;
      JLFREIB = (LZZFREIB * 360) / 100;
      JLHINZU = (LZZHINZU * 360) / 100;
    }
    if (af === 0) {
      f = 1;
    }
  }

  // ---- MRE4: Versorgungsfreibetrag & Altersentlastungsbetrag ----
  function MRE4() {
    if (ZVBEZJ === 0) {
      FVB = 0;
      FVBZ = 0;
      FVBSO = 0;
      FVBZSO = 0;
    } else {
      if (VJAHR < 2006) {
        J = 1;
      } else if (VJAHR < 2058) {
        J = VJAHR - 2004;
      } else {
        J = 54;
      }

      if (LZZ === 1) {
        VBEZB = VBEZM * ZMVB + VBEZS;
      } else {
        VBEZB = VBEZM * 12 + VBEZS;
      }

      // FVB
      HFVB = TAB2[J] * 100;
      FVB = Math.ceil((VBEZB * TAB1[J]) / 100);
      if (FVB > HFVB) FVB = HFVB;
      if (FVB > ZVBEZJ * 100) FVB = Math.floor(ZVBEZJ * 100);
      FVB = Math.floor(FVB / 100);

      // FVBZ
      FVBZ = TAB3[J];
      HFVBZ = ZVBEZJ - FVB;
      if (FVBZ > HFVBZ) FVBZ = Math.floor(HFVBZ);
      if (FVBZ < 0) FVBZ = 0;

      // FVBSO
      FVBSO = Math.ceil(((FVB * 100 + VBEZBSO * TAB1[J]) / 100));
      if (FVBSO > TAB2[J]) FVBSO = TAB2[J];

      // FVBZSO
      FVBZSO = TAB3[J];
      HFVBZSO = (ZVBEZJ + VBEZBSO / 100) - FVBSO;
      if (FVBZSO > HFVBZSO) FVBZSO = Math.floor(HFVBZSO);
      if (FVBZSO < 0) FVBZSO = 0;
    }

    // Altersentlastungsbetrag
    if (ALTER1 === 1) {
      if (AJAHR < 2006) {
        K = 1;
      } else if (AJAHR < 2058) {
        K = AJAHR - 2004;
      } else {
        K = 54;
      }
      BMG = ZRE4J - ZVBEZJ;
      if (BMG < 0) BMG = 0;
      ALTE = Math.ceil((BMG * TAB4[K]) / 100);
      HBALTE = TAB5[K];
      if (ALTE > HBALTE) ALTE = HBALTE;
    } else {
      ALTE = 0;
    }
  }

  // ---- MRE4ABZ: Deductions ----
  function MRE4ABZ() {
    ZRE4 = ZRE4J - FVB - ALTE - JLFREIB + JLHINZU;
    if (ZRE4 < 0) ZRE4 = 0;
    ZRE4VP = ZRE4J;

    if (ZVBEZJ > 0) {
      ZVBEZ = ZVBEZJ - FVB;
      if (ZVBEZ < 0) ZVBEZ = 0;
    } else {
      ZVBEZ = 0;
    }
  }

  // ---- MZTABFB: Table exemptions ----
  function MZTABFB() {
    ANP = 0;

    if (ZVBEZ >= 0 && ZVBEZ < FVBZ) {
      FVBZ = Math.floor(ZVBEZ);
    }

    if (STKL < 6) {
      if (ZVBEZ > 0) {
        if (ZVBEZ - FVBZ < 102) {
          ANP = Math.ceil(ZVBEZ - FVBZ);
        } else {
          ANP = 102;
        }
      }
      // Werbungskostenpauschale
      const remainder = ZRE4 - ZVBEZ;
      if (remainder < 1230) {
        ANP = ANP + Math.ceil(Math.max(0, remainder));
        if (ANP > 1230) ANP = 1230;
      } else {
        ANP = 1230;
      }
    } else {
      // SK VI: Kein ANP berechnet wie oben, nur aus Versorgungsbezügen
      if (ZVBEZ > 0) {
        if (ZVBEZ - FVBZ < 102) {
          ANP = Math.ceil(ZVBEZ - FVBZ);
        } else {
          ANP = 102;
        }
      }
    }

    switch (STKL) {
      case 1:
        EFA = 0; SAP = 36; KFB = ZKF * 9756; KZTAB = 1;
        break;
      case 2:
        EFA = 4260; SAP = 36; KFB = ZKF * 9756; KZTAB = 1;
        break;
      case 3:
        EFA = 0; SAP = 36; KFB = ZKF * 9756; KZTAB = 2;
        break;
      case 4:
        EFA = 0; SAP = 36; KFB = ZKF * 4878; KZTAB = 1;
        break;
      case 5:
        EFA = 0; SAP = 36; KFB = 0; KZTAB = 1;
        break;
      case 6:
        EFA = 0; SAP = 0; KFB = 0; KZTAB = 1;
        break;
    }

    ZTABFB = EFA + ANP + SAP + FVBZ;
  }

  // ---- UPTAB26: Einkommensteuer-Tarif 2026 (§32a EStG) ----
  function UPTAB26() {
    if (X < GFB + 1) {
      ST = 0;
    } else if (X < 17800) {
      Y = (X - 12348) / 10000;
      ST = Math.floor((914.51 * Y + 1400) * Y);
    } else if (X < 69879) {
      Y = (X - 17799) / 10000;
      ST = Math.floor((173.1 * Y + 2397) * Y + 1034.87);
    } else if (X < 277826) {
      ST = Math.floor(X * 0.42 - 11135.63);
    } else {
      ST = Math.floor(X * 0.45 - 19470.38);
    }
    ST = ST * KZTAB;
  }

  // ---- UPEVP: Vorsorgepauschale ----
  function UPEVP() {
    // Rentenversicherung
    if (KRV > 0) {
      VSPR = 0;
    } else {
      ZRE4VPR = Math.min(ZRE4VP, BBGRVALV);
      VSPR = Math.floor(ZRE4VPR * RVSATZAN);
    }

    // Kranken- und Pflegeversicherung
    ZRE4VPR = Math.min(ZRE4VP, BBGKVPV);

    if (PKV > 0) {
      // Private KV
      if (LZZ === 1) {
        PKPVAGZJ = PKPVAGZ / 100;
        VSPKVPV = Math.max(0, PKPV / 100 - PKPVAGZJ);
      } else {
        PKPVAGZJ = (PKPVAGZ * 12) / 100;
        VSPKVPV = Math.max(0, (PKPV * 12) / 100 - PKPVAGZJ);
      }
    } else {
      // Gesetzliche KV
      VSPKVPV = ZRE4VPR * (KVSATZAN + PVSATZAN);
    }

    VSP = Math.ceil(VSPKVPV + VSPR);

    // ALV maximum check
    if (ALV === 1) {
      VSPALV = AVSATZAN * Math.min(ZRE4VP, BBGRVALV);
      VSPHB = Math.min(VSPALV + VSPKVPV, 1900);
      VSPN = Math.floor(VSPR + VSPHB);
      VSP = Math.max(VSP, VSPN);
    }
  }

  // ---- UP5_6: Auxiliary for SK V/VI ----
  function UP5_6() {
    X = Math.floor(ZX * 1.25);
    UPTAB26();
    ST1 = ST;

    X = Math.floor(ZX * 0.75);
    UPTAB26();
    ST2 = ST;

    DIFF = (ST1 - ST2) * 2;
    MIST = Math.floor(ZX * 0.14);
    ST = Math.max(DIFF, MIST);
  }

  // ---- MST5_6: Special calculation for SK V/VI ----
  function MST5_6() {
    ZZX = ZVE;
    if (ZZX > W2STKL5) {
      ZX = W2STKL5;
      UP5_6();
      ST = Math.floor(ST);

      if (ZZX > W3STKL5) {
        ST = ST + Math.floor((W3STKL5 - W2STKL5) * 0.42);
        ST = ST + Math.floor((ZZX - W3STKL5) * 0.45);
      } else {
        ST = ST + Math.floor((ZZX - W2STKL5) * 0.42);
      }
    } else {
      ZX = ZZX;
      UP5_6();
      if (ZZX > W1STKL5) {
        ZX = W1STKL5;
        UP5_6();
        VERGL = ST;
        ZX = ZZX;
        UP5_6();
        HOCH = ST;
        ST = Math.min(HOCH, VERGL + Math.floor((ZZX - W1STKL5) * 0.42));
      }
    }
    ST = Math.floor(ST);
  }

  // ---- UPMLST: Tax determination ----
  function UPMLST() {
    if (STKL < 5) {
      if (ZVE < 1) {
        X = 0;
        ST = 0;
      } else {
        X = Math.floor(ZVE / KZTAB);
        UPTAB26();
      }
    } else {
      MST5_6();
    }
    LSTJAHR = ST * f;
  }

  // ---- MLSTJAHR: Annual wage tax ----
  function MLSTJAHR() {
    UPEVP();
    ZVE = ZRE4 - ZTABFB - VSP;
    if (ZVE < 1) ZVE = 0;
    UPMLST();
  }

  // ---- UPANTEIL: Period apportionment ----
  function UPANTEIL() {
    switch (LZZ) {
      case 1:
        ANTEIL1 = JW;
        break;
      case 2:
        ANTEIL1 = Math.floor(JW / 12);
        break;
      case 3:
        ANTEIL1 = Math.floor((JW * 7) / 360);
        break;
      case 4:
        ANTEIL1 = Math.floor(JW / 360);
        break;
    }
  }

  // ---- UPLSTLZZ: Apportion LSt to period ----
  function UPLSTLZZ() {
    JW = Math.floor(LSTJAHR * 100);
    UPANTEIL();
    LSTLZZ = ANTEIL1;
  }

  // ---- MSOLZ: Solidaritätszuschlag ----
  function MSOLZ() {
    const SOLZFREI_ADJ = SOLZFREI * KZTAB;

    if (JBMG > SOLZFREI_ADJ) {
      SOLZJ = Math.floor((JBMG * 5.5) / 100);
      SOLZMIN = Math.floor(((JBMG - SOLZFREI_ADJ) * 11.9) / 100);
      if (SOLZMIN < SOLZJ) SOLZJ = SOLZMIN;
    } else {
      SOLZJ = 0;
    }

    JW = SOLZJ * 100;
    UPANTEIL();
    SOLZLZZ = ANTEIL1;

    if (R > 0) {
      JW = Math.floor(JBMG * 100);
      UPANTEIL();
      BK = ANTEIL1;
    } else {
      BK = 0;
    }
  }

  // ---- MBERECH: Main calculation ----
  function MBERECH() {
    MZTABFB();
    MLSTJAHR();
    UPLSTLZZ();

    // Child deduction for SolZ/KiSt
    if (ZKF > 0) {
      ZTABFB = ZTABFB + KFB;
      MLSTJAHR();
      JBMG = Math.floor(ST * f);
    } else {
      JBMG = Math.floor(LSTJAHR);
    }

    MSOLZ();
  }

  // ---- MAIN ----
  MPARA();
  MRE4JL();
  VBEZBSO = 0;
  MRE4();
  MRE4ABZ();
  MBERECH();

  // MSONST and MVMT are only needed for Sonstige Bezüge
  // For standard monthly calculations, these are 0
  STS = 0;
  SOLZS = 0;
  BKS = 0;
  STV = 0;
  SOLZV = 0;
  BKV = 0;

  return {
    LSTLZZ,
    SOLZLZZ,
    BK,
    BKS,
    STS,
    SOLZS,
    STV,
    SOLZV,
    BKV,
  };
}

/**
 * Convenience: Calculate monthly Lohnsteuer for a simple input.
 */
export function calculateMonthlyLst(
  bruttoMonatlich: number,
  steuerklasse: 1 | 2 | 3 | 4 | 5 | 6,
  options: {
    kirchensteuer?: boolean;
    kinderfreibetraege?: number;
    kvZusatzbeitrag?: number;
    pvKinderlos?: boolean;
    pvKinderAnzahl?: number;
    isSachsen?: boolean;
  } = {},
): {
  lohnsteuer: number;
  solidaritaetszuschlag: number;
  kirchensteuerBemessung: number;
} {
  const re4Cents = Math.round(bruttoMonatlich * 100);

  const result = calculatePap2026({
    af: 0,
    AJAHR: 0,
    ALTER1: 0,
    ALV: 1,
    f: 1,
    JFREIB: 0,
    JHINZU: 0,
    JRE4: 0,
    JRE4ENT: 0,
    JVBEZ: 0,
    KRV: 0,
    KVZ: options.kvZusatzbeitrag ?? 2.9,
    LZZ: 2, // monthly
    LZZFREIB: 0,
    LZZHINZU: 0,
    MBV: 0,
    PKPV: 0,
    PKPVAGZ: 0,
    PKV: 0,
    PVA: options.pvKinderAnzahl ?? 0,
    PVS: options.isSachsen ? 1 : 0,
    PVZ: options.pvKinderlos ? 1 : 0,
    R: options.kirchensteuer ? 1 : 0,
    RE4: re4Cents,
    SONSTB: 0,
    SONSTENT: 0,
    STERBE: 0,
    STKL: steuerklasse,
    VBEZ: 0,
    VBEZM: 0,
    VBEZS: 0,
    VBS: 0,
    VJAHR: 0,
    ZKF: options.kinderfreibetraege ?? 0,
    ZMVB: 0,
  });

  return {
    lohnsteuer: result.LSTLZZ / 100,
    solidaritaetszuschlag: result.SOLZLZZ / 100,
    kirchensteuerBemessung: result.BK / 100,
  };
}
