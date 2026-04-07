/**
 * Grundsteuer Rechner 2025/2026
 *
 * Nach der Grundsteuerreform (ab 01.01.2025) berechnet sich die
 * Grundsteuer nach dem Bundesmodell wie folgt:
 *
 * Grundsteuer = Grundsteuerwert × Steuermesszahl × Hebesatz
 *
 * Steuermesszahl:
 * - Wohngrundstücke: 0,031%
 * - Nichtwohngrundstücke: 0,034%
 *
 * Vereinfachte Berechnung des Grundsteuerwerts
 * (tatsächlich komplex — hier Annäherung für Orientierung)
 */

export interface GrundsteuerInput {
  grundstuecksflaeche: number; // m²
  bodenrichtwert: number; // €/m²
  wohnflaeche: number; // m²
  baujahr: number;
  gebaeudeart: 'efh' | 'dhh' | 'rh' | 'etw' | 'mfh';
  hebesatz: number; // % (z.B. 400 = 400%)
  nutzung: 'wohnen' | 'gewerbe';
}

export interface GrundsteuerResult {
  bodenwert: number;
  gebaeudewert: number;
  grundsteuerwert: number;
  steuermessbetrag: number;
  grundsteuerJahr: number;
  grundsteuerMonat: number;
  steuermesszahl: number;
}

// Vereinfachte Gebäudenormalherstellungskosten (NHK) nach Gebäudeart
const NHK: Record<string, number> = {
  efh: 1500, // Einfamilienhaus €/m²
  dhh: 1400, // Doppelhaushälfte
  rh: 1300,  // Reihenhaus
  etw: 1600, // Eigentumswohnung
  mfh: 1200, // Mehrfamilienhaus
};

// Alterswertminderung: ca. 1% pro Jahr, max 70%
function alterswertminderung(baujahr: number): number {
  const alter = Math.max(0, 2026 - baujahr);
  return Math.min(alter * 0.01, 0.70);
}

export function calculateGrundsteuer(input: GrundsteuerInput): GrundsteuerResult {
  const { grundstuecksflaeche, bodenrichtwert, wohnflaeche, baujahr, gebaeudeart, hebesatz, nutzung } = input;

  // 1. Bodenwert
  const bodenwert = grundstuecksflaeche * bodenrichtwert;

  // 2. Gebäudewert (vereinfacht)
  const nhk = NHK[gebaeudeart] || 1500;
  const awm = alterswertminderung(baujahr);
  const gebaeudewert = Math.round(wohnflaeche * nhk * (1 - awm));

  // 3. Grundsteuerwert (vereinfacht = Bodenwert + Gebäudewert)
  const grundsteuerwert = bodenwert + gebaeudewert;

  // 4. Steuermesszahl
  const steuermesszahl = nutzung === 'wohnen' ? 0.00031 : 0.00034;

  // 5. Steuermessbetrag
  const steuermessbetrag = Math.round(grundsteuerwert * steuermesszahl * 100) / 100;

  // 6. Grundsteuer = Messbetrag × Hebesatz
  const grundsteuerJahr = Math.round(steuermessbetrag * (hebesatz / 100) * 100) / 100;
  const grundsteuerMonat = Math.round((grundsteuerJahr / 12) * 100) / 100;

  return {
    bodenwert,
    gebaeudewert,
    grundsteuerwert,
    steuermessbetrag,
    grundsteuerJahr,
    grundsteuerMonat,
    steuermesszahl,
  };
}
