/**
 * Wohngeld-Berechnung nach §19 WoGG (Wohngeld-Plus, Stand 2026)
 * Koeffizienten: Anlage 2 WoGG
 * Rechenschritte: Anlage 3 WoGG
 * Höchstbeträge & Heizkosten: §12 WoGG
 */

// ─── Anlage 2: Koeffizienten a, b, c je Haushaltsgröße ──────────────────────

const KOEFFIZIENTEN: Record<number, { a: number; b: number; c: number }> = {
  1:  { a:  4.000e-2, b: 4.797e-4, c: 4.080e-5 },
  2:  { a:  3.000e-2, b: 3.571e-4, c: 3.040e-5 },
  3:  { a:  2.000e-2, b: 2.917e-4, c: 2.450e-5 },
  4:  { a:  1.000e-2, b: 2.163e-4, c: 1.760e-5 },
  5:  { a:  0,        b: 1.907e-4, c: 1.720e-5 },
  6:  { a: -1.000e-2, b: 1.722e-4, c: 1.660e-5 },
  7:  { a: -2.000e-2, b: 1.592e-4, c: 1.650e-5 },
  8:  { a: -3.000e-2, b: 1.583e-4, c: 1.650e-5 },
  9:  { a: -4.000e-2, b: 1.376e-4, c: 1.660e-5 },
  10: { a: -6.000e-2, b: 1.249e-4, c: 1.660e-5 },
  11: { a: -9.000e-2, b: 1.141e-4, c: 1.960e-5 },
  12: { a: -1.200e-1, b: 1.107e-4, c: 2.210e-5 },
};

// ─── Anlage 3: Mindestwerte M und Y je Haushaltsgröße ────────────────────────

const MINDESTWERTE: Record<number, { M: number; Y: number }> = {
  1:  { M: 54,  Y: 396 },
  2:  { M: 67,  Y: 679 },
  3:  { M: 79,  Y: 906 },
  4:  { M: 92,  Y: 1132 },
  5:  { M: 103, Y: 1358 },
  6:  { M: 103, Y: 1585 },
  7:  { M: 115, Y: 1811 },
  8:  { M: 128, Y: 2037 },
  9:  { M: 140, Y: 2264 },
  10: { M: 152, Y: 2490 },
  11: { M: 187, Y: 2717 },
  12: { M: 298, Y: 2943 },
};

// ─── §12 Abs. 1-5: Höchstbeträge Miete (Bruttokalt + Klimakomponente) ───────
// Mietstufe I-VII × Haushaltsgröße 1-6 (ab 7: +78€ je Person bei Stufe I, steigend)

const HOECHSTBETRAEGE: number[][] = [
  // Mietstufe:  I       II      III     IV      V       VI      VII
  /* 1 Pers */ [476.60, 538.60, 608.60, 686.60, 752.60, 818.60, 919.60],
  /* 2 Pers */ [578.80, 653.80, 740.80, 835.80, 915.80, 995.80, 1117.80],
  /* 3 Pers */ [688.60, 774.60, 874.60, 987.60, 1081.60, 1175.60, 1319.60],
  /* 4 Pers */ [812.40, 914.40, 1034.40, 1166.40, 1277.40, 1388.40, 1557.40],
  /* 5 Pers */ [937.20, 1054.20, 1190.20, 1342.20, 1470.20, 1598.20, 1793.20],
  /* 6 Pers */ [1055.20, 1187.20, 1343.20, 1515.20, 1659.20, 1803.20, 2023.20],
];

// Zuschlag je weitere Person ab 7 Personen (je Mietstufe)
const ZUSCHLAG_PRO_PERSON = [118, 133, 153, 173, 189, 205, 230];

// ─── §12 Abs. 6: Heizkosten-Entlastung (CO2 + permanente Komponente) ────────

const HEIZKOSTEN: Record<number, number> = {
  1: 110.40,
  2: 142.60,
  3: 170.20,
  4: 197.80,
  5: 225.40,
};
const HEIZKOSTEN_ZUSCHLAG = 27.60; // je weitere Person ab 6

// ─── §12 Abs. 7: Klimakomponente ────────────────────────────────────────────

const KLIMAKOMPONENTE: Record<number, number> = {
  1: 19.20,
  2: 24.80,
  3: 29.60,
  4: 34.40,
  5: 39.20,
};
const KLIMA_ZUSCHLAG = 4.80; // je weitere Person ab 6

// ─── Interfaces ─────────────────────────────────────────────────────────────

export interface WohngeldInput {
  haushaltsgroesse: number; // 1-12
  mietstufe: number;       // 1-7 (I-VII)
  bruttokaltmiete: number; // monatliche Bruttokaltmiete in €
  einkommen: number;       // monatliches anrechenbares Gesamteinkommen in €
}

export interface WohngeldResult {
  wohngeld: number;
  hoechstbetrag: number;
  heizkosten: number;
  klimakomponente: number;
  anrechenbareMiete: number; // min(Bruttokalt, Höchstbetrag) + Heizkosten + Klima
  einkommen: number;
  aufschluesselung: { label: string; betrag: number }[];
}

// ─── Hilfsfunktionen ────────────────────────────────────────────────────────

function getHeizkosten(n: number): number {
  if (n <= 5) return HEIZKOSTEN[n];
  return HEIZKOSTEN[5] + (n - 5) * HEIZKOSTEN_ZUSCHLAG;
}

function getKlimakomponente(n: number): number {
  if (n <= 5) return KLIMAKOMPONENTE[n];
  return KLIMAKOMPONENTE[5] + (n - 5) * KLIMA_ZUSCHLAG;
}

function getHoechstbetrag(n: number, mietstufe: number): number {
  const stufeIdx = Math.min(Math.max(mietstufe - 1, 0), 6);
  if (n <= 6) return HOECHSTBETRAEGE[n - 1][stufeIdx];
  const basis = HOECHSTBETRAEGE[5][stufeIdx];
  return basis + (n - 6) * ZUSCHLAG_PRO_PERSON[stufeIdx];
}

function getKoeffizienten(n: number) {
  const capped = Math.min(Math.max(n, 1), 12);
  return KOEFFIZIENTEN[capped];
}

function getMindestwerte(n: number) {
  const capped = Math.min(Math.max(n, 1), 12);
  return MINDESTWERTE[capped];
}

// ─── Hauptberechnung ────────────────────────────────────────────────────────

export function calculateWohngeld(input: WohngeldInput): WohngeldResult {
  const { haushaltsgroesse: n, mietstufe, bruttokaltmiete, einkommen } = input;

  const heizkosten = getHeizkosten(n);
  const klima = getKlimakomponente(n);
  const hoechstbetrag = getHoechstbetrag(n, mietstufe);

  // Anrechenbare Miete = min(Bruttokaltmiete, Höchstbetrag) + Heizkosten + Klimakomponente
  const mieteBegrenzt = Math.min(bruttokaltmiete, hoechstbetrag);
  const anrechenbareMiete = mieteBegrenzt + heizkosten + klima;

  // Mindestwerte aus Anlage 3 anwenden
  const min = getMindestwerte(n);
  const M = Math.max(anrechenbareMiete, min.M);
  const Y = Math.max(einkommen, min.Y);

  // Koeffizienten aus Anlage 2
  const { a, b, c } = getKoeffizienten(n);

  // Berechnung nach §19 WoGG (Anlage 3: Festkomma mit 10 Nachkommastellen)
  const z1 = a + b * M + c * Y;
  const z2 = z1 * Y;
  const z3 = M - z2;
  const z4 = 1.15 * z3;

  // Rundung nach Anlage 3: < 0,50 abrunden, >= 0,50 aufrunden
  const wohngeldUngerundet = Math.max(0, z4);
  const wohngeld = Math.round(wohngeldUngerundet);

  return {
    wohngeld,
    hoechstbetrag,
    heizkosten,
    klimakomponente: klima,
    anrechenbareMiete: M,
    einkommen: Y,
    aufschluesselung: [
      { label: `Höchstbetrag Miete (Stufe ${mietstufe})`, betrag: hoechstbetrag },
      { label: 'Ihre Bruttokaltmiete', betrag: bruttokaltmiete },
      { label: 'Heizkosten-Entlastung', betrag: heizkosten },
      { label: 'Klimakomponente', betrag: klima },
      { label: 'Anrechenbare Miete (M)', betrag: M },
      { label: 'Anrechenbares Einkommen (Y)', betrag: Y },
    ],
  };
}
