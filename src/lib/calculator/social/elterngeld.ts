/**
 * Elterngeld-Rechner 2026
 *
 * Basiert auf dem Bundeselterngeld- und Elternzeitgesetz (BEEG).
 * Vereinfachte Berechnung — für exakte Werte ist der individuelle
 * Einkommenssteuerbescheid relevant.
 *
 * Elterngeld-Arten:
 * - Basiselterngeld: 12 Monate (14 mit Partnermonate)
 * - ElterngeldPlus: 24 Monate (28 mit Partnermonate), halber Betrag
 * - Partnerschaftsbonus: 4 zusätzliche Monate bei Teilzeit
 */

export interface ElterngeldInput {
  nettoEinkommen: number; // Durchschnittliches monatliches Nettoeinkommen vor Geburt
  arbeitsstundenNachGeburt: number; // 0 = nicht erwerbstätig, >0 = Teilzeit
  elterngeldArt: 'basis' | 'plus';
  zwillinge: boolean;
  geschwisterbonus: boolean; // Kind unter 3 oder 2 Kinder unter 6
}

export interface ElterngeldResult {
  monatlich: number;
  laufzeitMonate: number;
  gesamt: number;
  ersatzrate: number; // Prozent des Nettoeinkommens
  mindestbetrag: boolean;
  hoechstbetrag: boolean;
  mehrlingszuschlag: number;
  geschwisterbonus: number;
}

const MINDESTBETRAG = 300;
const HOECHSTBETRAG = 1800;
const MINDESTBETRAG_PLUS = 150;
const HOECHSTBETRAG_PLUS = 900;

/**
 * Berechnet das Elterngeld.
 *
 * Ersatzrate:
 * - Netto < 1.000€: 67% + Aufschlag (bis 100%)
 * - Netto 1.000-1.200€: 67%
 * - Netto 1.200-1.240€: 66% (sinkend)
 * - Netto > 1.240€: 65%
 */
export function calculateElterngeld(input: ElterngeldInput): ElterngeldResult {
  const { nettoEinkommen, elterngeldArt, zwillinge, geschwisterbonus } = input;

  // Ersatzrate bestimmen
  let ersatzrate: number;
  if (nettoEinkommen < 1000) {
    // Aufschlag: +0,1% pro 2€ unter 1.000€
    const diff = 1000 - nettoEinkommen;
    ersatzrate = Math.min(1.0, 0.67 + (diff / 2) * 0.001);
  } else if (nettoEinkommen <= 1200) {
    ersatzrate = 0.67;
  } else if (nettoEinkommen <= 1240) {
    // Abschmelzung: -0,1% pro 2€ über 1.200€
    const diff = nettoEinkommen - 1200;
    ersatzrate = 0.67 - (diff / 2) * 0.001;
  } else {
    ersatzrate = 0.65;
  }

  let elterngeld = Math.round(nettoEinkommen * ersatzrate);

  // Min/Max
  const isPlus = elterngeldArt === 'plus';
  const min = isPlus ? MINDESTBETRAG_PLUS : MINDESTBETRAG;
  const max = isPlus ? HOECHSTBETRAG_PLUS : HOECHSTBETRAG;

  let mindestbetrag = false;
  let hoechstbetrag = false;

  if (elterngeld < min) {
    elterngeld = min;
    mindestbetrag = true;
  }
  if (elterngeld > max) {
    elterngeld = max;
    hoechstbetrag = true;
  }

  // Mehrlingszuschlag: 300€ pro weiterem Kind
  let mehrlingszuschlag = 0;
  if (zwillinge) {
    mehrlingszuschlag = isPlus ? 150 : 300;
  }

  // Geschwisterbonus: 10% (min. 75€/37,50€)
  let geschwisterbonusBetrag = 0;
  if (geschwisterbonus) {
    const bonusMin = isPlus ? 37.5 : 75;
    geschwisterbonusBetrag = Math.max(bonusMin, Math.round(elterngeld * 0.10));
  }

  const monatlich = elterngeld + mehrlingszuschlag + geschwisterbonusBetrag;
  const laufzeitMonate = isPlus ? 24 : 12;
  const gesamt = monatlich * laufzeitMonate;

  return {
    monatlich: Math.round(monatlich),
    laufzeitMonate,
    gesamt: Math.round(gesamt),
    ersatzrate,
    mindestbetrag,
    hoechstbetrag,
    mehrlingszuschlag,
    geschwisterbonus: geschwisterbonusBetrag,
  };
}
