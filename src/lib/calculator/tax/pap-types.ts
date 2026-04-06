/**
 * BMF Programmablaufplan 2026 — Input/Output Types
 * Quelle: BMF-Schreiben vom 12.11.2025 (IV C 5 - S 2361/00025/016/028)
 */

export interface PapInput {
  /** Factor procedure flag (1=yes, SK IV with factor) */
  af: 0 | 1;
  /** Year following 64th birthday (for age relief) */
  AJAHR: number;
  /** 1 if born before 02.01.1962 (age relief §24a EStG) */
  ALTER1: 0 | 1;
  /** Unemployment insurance (1=insured, 0=not) */
  ALV: 0 | 1;
  /** Registered factor (3 decimal places, only if af=1) */
  f: number;
  /** Annual tax exemption for Sonstiges in cents */
  JFREIB: number;
  /** Annual addition amount in cents */
  JHINZU: number;
  /** Projected annual gross in cents */
  JRE4: number;
  /** Compensations per §24 Nr.1 EStG in cents */
  JRE4ENT: number;
  /** Provision benefits within JRE4 in cents */
  JVBEZ: number;
  /** Pension insurance (0=West/standard, 1=none, 2=East) */
  KRV: 0 | 1 | 2;
  /** Health insurance additional contribution in % */
  KVZ: number;
  /** Pay period (1=year, 2=month, 3=week, 4=day) */
  LZZ: 1 | 2 | 3 | 4;
  /** Period-specific exemption in cents */
  LZZFREIB: number;
  /** Period-specific addition in cents */
  LZZHINZU: number;
  /** Non-taxable benefits §19a(1) EStG in cents */
  MBV: number;
  /** Private health insurance monthly in cents */
  PKPV: number;
  /** Employer subsidy private insurance monthly in cents */
  PKPVAGZ: number;
  /** Health ins type (0=statutory, 1=private no AG, 2=private with AG) */
  PKV: 0 | 1 | 2;
  /** Nursing insurance deduction count (children for multi-child discount) */
  PVA: number;
  /** Saxony care insurance (1=Saxony, 0=other) */
  PVS: 0 | 1;
  /** Care surcharge for childless (1=yes, 0=no) */
  PVZ: 0 | 1;
  /** Church tax (0=none, >0=applicable) */
  R: number;
  /** Taxable work income for period in cents */
  RE4: number;
  /** Sonstige Bezuege in cents */
  SONSTB: number;
  /** Compensations within SONSTB in cents */
  SONSTENT: number;
  /** Sterbegeld/capital distributions in cents */
  STERBE: number;
  /** Tax class (1-6) */
  STKL: 1 | 2 | 3 | 4 | 5 | 6;
  /** Provision benefits within RE4 in cents */
  VBEZ: number;
  /** Provision benefit Jan 2005 / first month in cents */
  VBEZM: number;
  /** Anticipated special provision payments in cents */
  VBEZS: number;
  /** Provision benefits within SONSTB in cents */
  VBS: number;
  /** Year provision first granted */
  VJAHR: number;
  /** Child deduction fractions */
  ZKF: number;
  /** Number of months provision paid */
  ZMVB: number;
}

export interface PapOutput {
  /** Lohnsteuer for pay period in cents */
  LSTLZZ: number;
  /** Solidaritaetszuschlag for pay period in cents */
  SOLZLZZ: number;
  /** Bemessungsgrundlage Kirchensteuer in cents */
  BK: number;
  /** Bemessungsgrundlage KiSt for Sonstige in cents */
  BKS: number;
  /** Lohnsteuer for Sonstige Bezuege in cents */
  STS: number;
  /** Solidaritaetszuschlag for Sonstige in cents */
  SOLZS: number;
  /** Sterbegeld LSt in cents */
  STV: number;
  /** Sterbegeld SolZ in cents */
  SOLZV: number;
  /** Sterbegeld BK in cents */
  BKV: number;
}

/**
 * Simplified input for the Brutto-Netto-Rechner frontend.
 * Maps to PapInput internally.
 */
export interface SimplePapInput {
  bruttoMonatlich: number;
  steuerklasse: 1 | 2 | 3 | 4 | 5 | 6;
  kirchensteuer: boolean;
  kinderfreibetraege: number;
  bundesland: string;
  kvZusatzbeitrag: number;
  pvKinderlos: boolean;
  pvKinderAnzahl: number;
  isSachsen: boolean;
  geburtsjahr: number;
  krankenversicherungTyp: 'gesetzlich' | 'privat';
}
