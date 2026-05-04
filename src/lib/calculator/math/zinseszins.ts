/**
 * Zinseszinsrechner / Sparrechner
 * Optional: Abgeltungsteuer (26,375% inkl. Soli) mit Freibetrag
 */

export interface ZinseszinsInput {
  startkapital: number;
  monatlicheSparrate: number;
  zinssatz: number; // % p.a.
  laufzeit: number; // Jahre
  steuerBeruecksichtigen?: boolean;
  freibetrag?: number; // Sparerpauschbetrag (Standard: 1000 € für Ledige)
}

export interface ZinseszinsResult {
  endkapital: number;
  endkapitalNachSteuer: number;
  eingezahlt: number;
  zinsen: number;
  zinsenNachSteuer: number;
  steuerGesamt: number;
  renditeGesamt: number; // %
  jahresEntwicklung: { jahr: number; eingezahlt: number; zinsen: number; gesamt: number; steuer: number; gesamtNachSteuer: number }[];
}

// Abgeltungsteuer 25% + 5,5% Soli = 26,375%
const ABGELTUNGSTEUER_SATZ = 0.26375;

export function calculateZinseszins(input: ZinseszinsInput): ZinseszinsResult {
  const { startkapital, monatlicheSparrate, zinssatz, laufzeit, steuerBeruecksichtigen = false, freibetrag = 1000 } = input;
  const monatsZins = zinssatz / 100 / 12;

  let gesamt = startkapital;
  let gesamtNachSteuer = startkapital;
  let eingezahlt = startkapital;
  let steuerGesamt = 0;
  const jahresEntwicklung: ZinseszinsResult['jahresEntwicklung'] = [];

  for (let jahr = 1; jahr <= laufzeit; jahr++) {
    let jahresZinsenNachSteuer = 0;

    for (let monat = 0; monat < 12; monat++) {
      // Ohne Steuer
      gesamt += monatlicheSparrate;
      const zinsBrutto = gesamt * monatsZins;
      gesamt += zinsBrutto;

      // Mit Steuer
      gesamtNachSteuer += monatlicheSparrate;
      const zinsNachSteuerBrutto = gesamtNachSteuer * monatsZins;
      gesamtNachSteuer += zinsNachSteuerBrutto;
      jahresZinsenNachSteuer += zinsNachSteuerBrutto;
    }

    eingezahlt += monatlicheSparrate * 12;

    // Jährliche Steuerabrechnung (vereinfacht)
    let jahresSteuer = 0;
    if (steuerBeruecksichtigen && jahresZinsenNachSteuer > freibetrag) {
      jahresSteuer = (jahresZinsenNachSteuer - freibetrag) * ABGELTUNGSTEUER_SATZ;
      gesamtNachSteuer -= jahresSteuer;
      steuerGesamt += jahresSteuer;
    }

    jahresEntwicklung.push({
      jahr,
      eingezahlt: Math.round(eingezahlt * 100) / 100,
      zinsen: Math.round((gesamt - eingezahlt) * 100) / 100,
      gesamt: Math.round(gesamt * 100) / 100,
      steuer: Math.round(jahresSteuer * 100) / 100,
      gesamtNachSteuer: Math.round(gesamtNachSteuer * 100) / 100,
    });
  }

  const endkapital = Math.round(gesamt * 100) / 100;
  const endkapitalNachSteuer = Math.round(gesamtNachSteuer * 100) / 100;
  const zinsen = Math.round((endkapital - eingezahlt) * 100) / 100;
  const zinsenNachSteuer = Math.round((endkapitalNachSteuer - eingezahlt) * 100) / 100;
  const renditeGesamt = eingezahlt > 0 ? Math.round((zinsen / eingezahlt) * 10000) / 100 : 0;
  steuerGesamt = Math.round(steuerGesamt * 100) / 100;

  return { endkapital, endkapitalNachSteuer, eingezahlt, zinsen, zinsenNachSteuer, steuerGesamt, renditeGesamt, jahresEntwicklung };
}
