/**
 * PKV vs. GKV Vergleichsrechner 2026
 *
 * GKV-Beitragssätze 2026:
 * - Krankenversicherung: 14,6 % + durchschnittlicher Zusatzbeitrag 2,9 % = 17,5 %
 * - Pflegeversicherung: 3,6 % (+ 0,6 % Zuschlag für Kinderlose ab 23)
 * - Beitragsbemessungsgrenze KV: 69.750 €/Jahr (5.812,50 €/Monat)
 * - Versicherungspflichtgrenze 2026: 77.400 €/Jahr (6.450 €/Monat)
 *
 * PKV-Beiträge sind altersabhängig und pauschal geschätzt.
 */

export type Berufsgruppe = 'angestellt' | 'selbststaendig' | 'beamter';

export interface PkvInput {
  alter: number;
  bruttoeinkommen: number; // Jahresbrutto
  berufsgruppe: Berufsgruppe;
  kinder: number;
  zusatzbeitrag: number; // Prozent, z.B. 2.9 (Durchschnitt 2026)
}

export interface PkvResult {
  gkv_arbeitnehmer: number;    // monatlicher AN-Anteil GKV (KV + PV)
  gkv_arbeitgeber: number;     // monatlicher AG-Anteil
  gkv_gesamt: number;          // monatlicher Gesamtbeitrag
  pkv_geschaetzt: number;      // geschätzter PKV-Beitrag
  pkv_ag_zuschuss: number;     // AG-Zuschuss zur PKV
  pkv_eigenanteil: number;     // Eigenanteil PKV
  differenz: number;           // PKV-Eigenanteil minus GKV-AN-Anteil (negativ = PKV günstiger)
  empfehlung: 'pkv' | 'gkv' | 'neutral';
  empfehlung_text: string;
  pkv_berechtigt: boolean;     // Über Versicherungspflichtgrenze?
  jahresersparnis: number;     // Jährliche Ersparnis/Mehrkosten
}

// Beitragsbemessungsgrenze KV 2026
const BBG_KV_MONAT = 5812.50;
// Versicherungspflichtgrenze 2026: 77.400 €/Jahr (6.450 €/Monat)
const VPFLICHT_JAHR = 77400;

// PKV-Basisbeiträge nach Alter (monatlich, Durchschnitt für guten Tarif)
const PKV_BASIS: Record<number, number> = {
  20: 230, 25: 270, 30: 320, 35: 380, 40: 450,
  45: 530, 50: 620, 55: 720, 60: 830, 65: 950,
};

function interpolatePkvBasis(alter: number): number {
  if (alter <= 20) return PKV_BASIS[20];
  if (alter >= 65) return PKV_BASIS[65];

  const lower = Math.floor(alter / 5) * 5;
  const upper = lower + 5;
  const lowerVal = PKV_BASIS[lower] ?? PKV_BASIS[20];
  const upperVal = PKV_BASIS[upper] ?? PKV_BASIS[65];
  const ratio = (alter - lower) / 5;
  return Math.round(lowerVal + (upperVal - lowerVal) * ratio);
}

export function calculatePkv(input: PkvInput): PkvResult {
  const { alter, bruttoeinkommen, berufsgruppe, kinder, zusatzbeitrag } = input;
  const monatsbrutto = bruttoeinkommen / 12;

  // ─── GKV-Berechnung ───
  const beitragspflichtig = Math.min(monatsbrutto, BBG_KV_MONAT);

  // KV-Satz: 14,6 % + Zusatzbeitrag
  const kvSatzGesamt = (14.6 + zusatzbeitrag) / 100;
  // Selbstständige tragen den vollen Beitrag allein (kein AG-Anteil)
  const isSelbststaendig = berufsgruppe === 'selbststaendig';
  const kvAN = isSelbststaendig ? beitragspflichtig * kvSatzGesamt : beitragspflichtig * kvSatzGesamt / 2;
  const kvAG = isSelbststaendig ? 0 : beitragspflichtig * kvSatzGesamt / 2;

  // PV-Satz: 3,6 % + ggf. Kinderlosenzuschlag (0,6 % voll AN)
  const pvBasis = isSelbststaendig ? beitragspflichtig * 0.036 : beitragspflichtig * 0.036 / 2;
  const pvZuschlag = (kinder === 0 && alter >= 23) ? beitragspflichtig * 0.006 : 0;
  // Ab 2. Kind: Abschlag von 0,25 % pro Kind (max. 5 Kinder), voll AN
  const pvKinderAbschlag = kinder >= 2 ? beitragspflichtig * Math.min(kinder - 1, 4) * 0.0025 : 0;
  const pvAN = pvBasis + pvZuschlag - pvKinderAbschlag;
  const pvAG = isSelbststaendig ? 0 : beitragspflichtig * 0.036 / 2;

  const gkvAN = Math.round((kvAN + pvAN) * 100) / 100;
  const gkvAG = Math.round((kvAG + pvAG) * 100) / 100;
  const gkvGesamt = Math.round((gkvAN + gkvAG) * 100) / 100;

  // ─── PKV-Berechnung ───
  let pkvBeitrag = interpolatePkvBasis(alter);

  // Beamte: Beihilfe übernimmt 50–80 %, PKV nur Resttarif
  if (berufsgruppe === 'beamter') {
    pkvBeitrag = Math.round(pkvBeitrag * 0.45); // ~55 % Beihilfe
  }

  // Kinder: +80–120 € pro Kind in PKV (ohne Beihilfe)
  if (berufsgruppe !== 'beamter') {
    pkvBeitrag += kinder * 100;
  } else {
    pkvBeitrag += kinder * 30; // Beamtenkinder: Beihilfe 80 %
  }

  // AG-Zuschuss zur PKV (max. halber GKV-Höchstbeitrag)
  let agZuschuss = 0;
  if (berufsgruppe === 'angestellt') {
    const maxZuschuss = BBG_KV_MONAT * kvSatzGesamt / 2 + BBG_KV_MONAT * 0.036 / 2;
    agZuschuss = Math.min(pkvBeitrag / 2, maxZuschuss);
  }
  // Beamte: kein AG-Zuschuss (Beihilfe stattdessen)
  // Selbstständige: kein AG-Zuschuss

  agZuschuss = Math.round(agZuschuss * 100) / 100;
  const pkvEigenanteil = Math.round((pkvBeitrag - agZuschuss) * 100) / 100;

  // ─── Vergleich ───
  const differenz = Math.round((pkvEigenanteil - gkvAN) * 100) / 100;
  const jahresersparnis = Math.round(differenz * -12 * 100) / 100;

  // PKV-Berechtigung
  const pkvBerechtigt = berufsgruppe !== 'angestellt' || bruttoeinkommen >= VPFLICHT_JAHR;

  // Empfehlung
  let empfehlung: 'pkv' | 'gkv' | 'neutral';
  let empfehlung_text: string;

  if (!pkvBerechtigt) {
    empfehlung = 'gkv';
    empfehlung_text = `Ihr Einkommen liegt unter der Versicherungspflichtgrenze von ${(VPFLICHT_JAHR).toLocaleString('de-DE')} €/Jahr. Ein Wechsel in die PKV ist als Angestellter erst ab diesem Einkommen möglich.`;
  } else if (alter >= 55) {
    empfehlung = 'gkv';
    empfehlung_text = 'Ab 55 Jahren ist ein Wechsel in die PKV selten sinnvoll — die Beiträge sind hoch und steigen weiter, während ein Rückwechsel in die GKV kaum möglich ist.';
  } else if (berufsgruppe === 'beamter') {
    empfehlung = 'pkv';
    empfehlung_text = 'Als Beamter profitieren Sie von der Beihilfe und zahlen in der PKV deutlich weniger als in der GKV. Die PKV ist in Ihrem Fall fast immer die bessere Wahl.';
  } else if (differenz < -100) {
    empfehlung = 'pkv';
    empfehlung_text = `Die PKV ist für Sie aktuell ca. ${Math.abs(Math.round(differenz))} € pro Monat günstiger als die GKV. Beachten Sie aber, dass PKV-Beiträge im Alter steigen. Lassen Sie sich unverbindlich beraten.`;
  } else if (differenz > 100) {
    empfehlung = 'gkv';
    empfehlung_text = `Die PKV wäre aktuell ca. ${Math.round(differenz)} € pro Monat teurer als die GKV. Ein Wechsel lohnt sich in Ihrer Situation wahrscheinlich nicht.`;
  } else {
    empfehlung = 'neutral';
    empfehlung_text = 'GKV und PKV liegen bei Ihnen preislich nah beieinander. Entscheidend sind hier die Leistungsunterschiede und Ihre persönliche Situation. Eine individuelle Beratung ist empfehlenswert.';
  }

  return {
    gkv_arbeitnehmer: gkvAN,
    gkv_arbeitgeber: gkvAG,
    gkv_gesamt: gkvGesamt,
    pkv_geschaetzt: pkvBeitrag,
    pkv_ag_zuschuss: agZuschuss,
    pkv_eigenanteil: pkvEigenanteil,
    differenz,
    empfehlung,
    empfehlung_text,
    pkv_berechtigt: pkvBerechtigt,
    jahresersparnis,
  };
}
