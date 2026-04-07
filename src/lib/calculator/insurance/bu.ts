/**
 * Berufsunfähigkeitsversicherung (BU) Rechner 2026
 *
 * Schätzt den monatlichen BU-Beitrag basierend auf Alter, Beruf, Absicherungshöhe und Laufzeit.
 * Die BU-Rente sollte ca. 75-80% des Nettoeinkommens abdecken.
 */

export type Berufsgruppe = 'buero' | 'handwerk' | 'medizin' | 'it' | 'selbststaendig' | 'koerperlich';

export interface BuInput {
  alter: number;
  berufsgruppe: Berufsgruppe;
  nettoeinkommen: number; // monatlich
  buRente: number; // gewünschte monatliche BU-Rente
  laufzeit: number; // Endalter (60, 63, 65, 67)
  raucher: boolean;
}

export interface BuResult {
  monatsbeitrag: number;
  jahresbeitrag: number;
  gesamtkosten: number; // Beiträge über gesamte Laufzeit
  buRente: number;
  absicherungsgrad: number; // % des Nettoeinkommens
  empfehlung_rente: number; // empfohlene BU-Rente
  laufzeitJahre: number;
  kostenNutzenFaktor: number; // BU-Rente / Monatsbeitrag
  hinweis: string;
}

// Berufsgruppen-Risikofaktoren (1 = niedrig, 4 = hoch)
const RISIKO: Record<Berufsgruppe, number> = {
  buero: 1.0,
  it: 1.0,
  medizin: 1.3,
  selbststaendig: 1.4,
  handwerk: 1.8,
  koerperlich: 2.2,
};

const BERUFSGRUPPE_LABEL: Record<Berufsgruppe, string> = {
  buero: 'Büro/Verwaltung',
  it: 'IT/Technik',
  medizin: 'Medizin/Pflege',
  selbststaendig: 'Selbstständig',
  handwerk: 'Handwerk',
  koerperlich: 'Körperliche Arbeit',
};

export { BERUFSGRUPPE_LABEL };

export function calculateBu(input: BuInput): BuResult {
  const { alter, berufsgruppe, nettoeinkommen, buRente, laufzeit, raucher } = input;
  const laufzeitJahre = laufzeit - alter;

  // Basisbeitrag: ca. 1,2-1,8% der BU-Rente pro Monat (altersabhängig)
  let basisFaktor = 0.012;
  if (alter >= 40) basisFaktor = 0.018;
  else if (alter >= 35) basisFaktor = 0.015;
  else if (alter >= 30) basisFaktor = 0.013;

  let monatsbeitrag = buRente * basisFaktor;

  // Berufsgruppen-Risiko
  monatsbeitrag *= RISIKO[berufsgruppe];

  // Alter: exponentiell teurer
  const altersAufschlag = 1 + Math.pow((alter - 25) / 40, 1.5) * 0.8;
  monatsbeitrag *= altersAufschlag;

  // Laufzeit: längere Laufzeit = teurer
  if (laufzeit >= 67) monatsbeitrag *= 1.15;
  else if (laufzeit >= 65) monatsbeitrag *= 1.08;

  // Raucher: +30-50% Aufschlag
  if (raucher) monatsbeitrag *= 1.40;

  monatsbeitrag = Math.round(monatsbeitrag * 100) / 100;
  const jahresbeitrag = Math.round(monatsbeitrag * 12 * 100) / 100;
  const gesamtkosten = Math.round(monatsbeitrag * 12 * laufzeitJahre);

  const absicherungsgrad = Math.round((buRente / nettoeinkommen) * 100);
  const empfohleneRente = Math.round(nettoeinkommen * 0.75 / 50) * 50; // auf 50€ gerundet, 75% des Nettos

  const kostenNutzenFaktor = Math.round(buRente / monatsbeitrag);

  // Hinweis
  let hinweis: string;
  if (absicherungsgrad < 60) {
    hinweis = `Ihre BU-Rente deckt nur ${absicherungsgrad} % Ihres Nettos ab. Empfohlen sind 75-80 % (${empfohleneRente.toLocaleString('de-DE')} €/Monat). Eine zu niedrige Absicherung kann im Ernstfall existenzbedrohend sein.`;
  } else if (absicherungsgrad > 90) {
    hinweis = `${absicherungsgrad} % Absicherung ist sehr hoch. Viele Versicherer begrenzen die BU-Rente auf 60-80 % des Bruttoeinkommens. Prüfen Sie die maximale Absicherungshöhe beim gewünschten Anbieter.`;
  } else if (alter > 50) {
    hinweis = `Mit ${alter} Jahren sind BU-Beiträge deutlich höher. Prüfen Sie Alternativen wie Erwerbsminderungsversicherung oder Grundfähigkeitsversicherung — diese sind günstiger, bieten aber weniger Schutz.`;
  } else {
    hinweis = `Ihre Absicherung liegt bei ${absicherungsgrad} % des Nettoeinkommens — ein guter Wert. Je früher Sie abschließen, desto günstiger und einfacher die Gesundheitsprüfung.`;
  }

  return {
    monatsbeitrag,
    jahresbeitrag,
    gesamtkosten,
    buRente,
    absicherungsgrad,
    empfehlung_rente: empfohleneRente,
    laufzeitJahre,
    kostenNutzenFaktor,
    hinweis,
  };
}
