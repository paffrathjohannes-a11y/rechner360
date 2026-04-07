/**
 * Prozentrechner — 4 Berechnungsmodi
 */

export type ProzentModus = 'anteil' | 'prozentsatz' | 'grundwert' | 'aenderung';

export interface ProzentResult {
  ergebnis: number;
  formel: string;
  erklaerung: string;
}

/** Wie viel sind X% von Y? */
export function prozentAnteil(prozent: number, grundwert: number): ProzentResult {
  const ergebnis = Math.round((grundwert * prozent / 100) * 100) / 100;
  return {
    ergebnis,
    formel: `${grundwert} × ${prozent}% = ${ergebnis}`,
    erklaerung: `${prozent}% von ${grundwert} sind ${ergebnis}.`,
  };
}

/** X ist wie viel % von Y? */
export function prozentSatz(anteil: number, grundwert: number): ProzentResult {
  if (grundwert === 0) return { ergebnis: 0, formel: '', erklaerung: 'Division durch 0.' };
  const ergebnis = Math.round((anteil / grundwert * 100) * 100) / 100;
  return {
    ergebnis,
    formel: `${anteil} ÷ ${grundwert} × 100 = ${ergebnis}%`,
    erklaerung: `${anteil} sind ${ergebnis}% von ${grundwert}.`,
  };
}

/** X ist Y% von was? */
export function prozentGrundwert(anteil: number, prozent: number): ProzentResult {
  if (prozent === 0) return { ergebnis: 0, formel: '', erklaerung: 'Division durch 0.' };
  const ergebnis = Math.round((anteil / prozent * 100) * 100) / 100;
  return {
    ergebnis,
    formel: `${anteil} ÷ ${prozent}% × 100 = ${ergebnis}`,
    erklaerung: `Wenn ${anteil} genau ${prozent}% sind, dann ist der Grundwert ${ergebnis}.`,
  };
}

/** Prozentuale Veränderung von X zu Y */
export function prozentAenderung(altWert: number, neuWert: number): ProzentResult {
  if (altWert === 0) return { ergebnis: 0, formel: '', erklaerung: 'Alter Wert darf nicht 0 sein.' };
  const ergebnis = Math.round(((neuWert - altWert) / altWert * 100) * 100) / 100;
  const richtung = ergebnis >= 0 ? 'Zunahme' : 'Abnahme';
  return {
    ergebnis,
    formel: `(${neuWert} - ${altWert}) ÷ ${altWert} × 100 = ${ergebnis}%`,
    erklaerung: `Von ${altWert} zu ${neuWert} ist eine ${richtung} um ${Math.abs(ergebnis)}%.`,
  };
}
