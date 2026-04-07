/**
 * BMI (Body-Mass-Index) Rechner
 * Formel: BMI = Gewicht (kg) / (Größe (m))²
 * WHO-Klassifikation für Erwachsene (ab 18 Jahren)
 */

export interface BmiInput {
  gewicht: number; // kg
  groesse: number; // cm
  alter: number;
  geschlecht: 'mann' | 'frau';
}

export type BmiKategorie =
  | 'starkes-untergewicht'
  | 'untergewicht'
  | 'normalgewicht'
  | 'uebergewicht'
  | 'adipositas-1'
  | 'adipositas-2'
  | 'adipositas-3';

export interface BmiResult {
  bmi: number;
  kategorie: BmiKategorie;
  kategorieLabel: string;
  beschreibung: string;
  farbe: 'accent' | 'primary' | 'warning' | 'negative';
  idealgewichtMin: number;
  idealgewichtMax: number;
  differenz: number; // positiv = zu viel, negativ = zu wenig, 0 = ideal
}

const KATEGORIEN: {
  min: number;
  max: number;
  id: BmiKategorie;
  label: string;
  beschreibung: string;
  farbe: 'accent' | 'primary' | 'warning' | 'negative';
}[] = [
  { min: 0, max: 16, id: 'starkes-untergewicht', label: 'Starkes Untergewicht', beschreibung: 'Ihr BMI liegt deutlich unter dem Normalbereich. Bitte konsultieren Sie einen Arzt.', farbe: 'negative' },
  { min: 16, max: 18.5, id: 'untergewicht', label: 'Untergewicht', beschreibung: 'Ihr BMI liegt unter dem Normalbereich. Eine ausgewogene Ernährung kann helfen.', farbe: 'warning' },
  { min: 18.5, max: 25, id: 'normalgewicht', label: 'Normalgewicht', beschreibung: 'Ihr BMI liegt im gesunden Bereich. Halten Sie Ihren aktuellen Lebensstil bei.', farbe: 'accent' },
  { min: 25, max: 30, id: 'uebergewicht', label: 'Übergewicht (Präadipositas)', beschreibung: 'Ihr BMI liegt über dem Normalbereich. Regelmäßige Bewegung und bewusste Ernährung sind empfehlenswert.', farbe: 'warning' },
  { min: 30, max: 35, id: 'adipositas-1', label: 'Adipositas Grad I', beschreibung: 'Ihr BMI zeigt Adipositas Grad I an. Bitte sprechen Sie mit Ihrem Arzt über geeignete Maßnahmen.', farbe: 'negative' },
  { min: 35, max: 40, id: 'adipositas-2', label: 'Adipositas Grad II', beschreibung: 'Ihr BMI zeigt Adipositas Grad II an. Ärztliche Begleitung wird dringend empfohlen.', farbe: 'negative' },
  { min: 40, max: 100, id: 'adipositas-3', label: 'Adipositas Grad III', beschreibung: 'Ihr BMI zeigt Adipositas Grad III an. Bitte suchen Sie umgehend ärztliche Hilfe.', farbe: 'negative' },
];

export function calculateBmi(input: BmiInput): BmiResult {
  const groesseM = input.groesse / 100;
  const bmi = Math.round((input.gewicht / (groesseM * groesseM)) * 10) / 10;

  const kat = KATEGORIEN.find((k) => bmi >= k.min && bmi < k.max) ?? KATEGORIEN[KATEGORIEN.length - 1];

  // Idealgewicht (BMI 18.5-24.9)
  const idealgewichtMin = Math.round(18.5 * groesseM * groesseM * 10) / 10;
  const idealgewichtMax = Math.round(24.9 * groesseM * groesseM * 10) / 10;

  let differenz = 0;
  if (bmi < 18.5) {
    differenz = Math.round((input.gewicht - idealgewichtMin) * 10) / 10;
  } else if (bmi >= 25) {
    differenz = Math.round((input.gewicht - idealgewichtMax) * 10) / 10;
  }

  return {
    bmi,
    kategorie: kat.id,
    kategorieLabel: kat.label,
    beschreibung: kat.beschreibung,
    farbe: kat.farbe,
    idealgewichtMin,
    idealgewichtMax,
    differenz,
  };
}

/** WHO BMI Tabelle für die Anzeige */
export const BMI_TABELLE = KATEGORIEN.map((k) => ({
  kategorie: k.label,
  min: k.min,
  max: k.max,
  farbe: k.farbe,
}));
