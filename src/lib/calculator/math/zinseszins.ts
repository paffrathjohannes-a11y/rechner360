/**
 * Zinseszinsrechner / Sparrechner
 */

export interface ZinseszinsInput {
  startkapital: number;
  monatlicheSparrate: number;
  zinssatz: number; // % p.a.
  laufzeit: number; // Jahre
}

export interface ZinseszinsResult {
  endkapital: number;
  eingezahlt: number;
  zinsen: number;
  renditeGesamt: number; // %
  jahresEntwicklung: { jahr: number; eingezahlt: number; zinsen: number; gesamt: number }[];
}

export function calculateZinseszins(input: ZinseszinsInput): ZinseszinsResult {
  const { startkapital, monatlicheSparrate, zinssatz, laufzeit } = input;
  const monatsZins = zinssatz / 100 / 12;

  let gesamt = startkapital;
  let eingezahlt = startkapital;
  const jahresEntwicklung: ZinseszinsResult['jahresEntwicklung'] = [];

  for (let jahr = 1; jahr <= laufzeit; jahr++) {
    for (let monat = 0; monat < 12; monat++) {
      gesamt += monatlicheSparrate;
      eingezahlt += monatlicheSparrate;
      gesamt *= (1 + monatsZins);
    }

    jahresEntwicklung.push({
      jahr,
      eingezahlt: Math.round(eingezahlt * 100) / 100,
      zinsen: Math.round((gesamt - eingezahlt) * 100) / 100,
      gesamt: Math.round(gesamt * 100) / 100,
    });
  }

  const endkapital = Math.round(gesamt * 100) / 100;
  const zinsen = Math.round((endkapital - eingezahlt) * 100) / 100;
  const renditeGesamt = eingezahlt > 0 ? Math.round((zinsen / eingezahlt) * 10000) / 100 : 0;

  return { endkapital, eingezahlt, zinsen, renditeGesamt, jahresEntwicklung };
}
