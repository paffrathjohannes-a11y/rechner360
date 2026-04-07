/**
 * Kalorienrechner — Grundumsatz + Gesamtumsatz
 *
 * Mifflin-St Jeor Formel (genauer als Harris-Benedict):
 * Männer: 10 × Gewicht(kg) + 6.25 × Größe(cm) - 5 × Alter - 161 + 166
 * Frauen: 10 × Gewicht(kg) + 6.25 × Größe(cm) - 5 × Alter - 161
 */

export interface KalorienInput {
  gewicht: number;
  groesse: number;
  alter: number;
  geschlecht: 'mann' | 'frau';
  aktivitaet: 'sitzend' | 'leicht' | 'moderat' | 'aktiv' | 'sehr-aktiv';
  ziel: 'abnehmen' | 'halten' | 'zunehmen';
}

export interface KalorienResult {
  grundumsatz: number;
  gesamtumsatz: number;
  zielKalorien: number;
  aktivitaetsFaktor: number;
  differenz: number;
}

const AKTIVITAETS_FAKTOREN: Record<string, { faktor: number; label: string }> = {
  'sitzend': { faktor: 1.2, label: 'Sitzend (kaum Bewegung)' },
  'leicht': { faktor: 1.375, label: 'Leicht aktiv (1-3x Sport/Woche)' },
  'moderat': { faktor: 1.55, label: 'Moderat aktiv (3-5x Sport/Woche)' },
  'aktiv': { faktor: 1.725, label: 'Sehr aktiv (6-7x Sport/Woche)' },
  'sehr-aktiv': { faktor: 1.9, label: 'Extrem aktiv (Leistungssport)' },
};

export function calculateKalorien(input: KalorienInput): KalorienResult {
  const { gewicht, groesse, alter, geschlecht, aktivitaet, ziel } = input;

  // Mifflin-St Jeor
  let grundumsatz: number;
  if (geschlecht === 'mann') {
    grundumsatz = 10 * gewicht + 6.25 * groesse - 5 * alter + 5;
  } else {
    grundumsatz = 10 * gewicht + 6.25 * groesse - 5 * alter - 161;
  }
  grundumsatz = Math.round(grundumsatz);

  const faktor = AKTIVITAETS_FAKTOREN[aktivitaet]?.faktor ?? 1.2;
  const gesamtumsatz = Math.round(grundumsatz * faktor);

  let zielKalorien: number;
  let differenz: number;
  switch (ziel) {
    case 'abnehmen':
      zielKalorien = Math.round(gesamtumsatz * 0.8); // 20% Defizit
      differenz = zielKalorien - gesamtumsatz;
      break;
    case 'zunehmen':
      zielKalorien = Math.round(gesamtumsatz * 1.15); // 15% Überschuss
      differenz = zielKalorien - gesamtumsatz;
      break;
    default:
      zielKalorien = gesamtumsatz;
      differenz = 0;
  }

  return { grundumsatz, gesamtumsatz, zielKalorien, aktivitaetsFaktor: faktor, differenz };
}

export { AKTIVITAETS_FAKTOREN };
