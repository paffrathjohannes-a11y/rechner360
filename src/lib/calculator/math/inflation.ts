/**
 * Inflationsrechner
 * Berechnet die Kaufkraftveränderung über einen Zeitraum.
 */

export interface InflationInput {
  betrag: number;
  inflationsrate: number; // % pro Jahr
  jahre: number;
}

export interface InflationResult {
  kaufkraft: number;       // Was der Betrag in X Jahren wert ist
  wertverlust: number;     // Absoluter Verlust
  wertverlustProzent: number;
  benoetigtFuerGleicheKaufkraft: number; // Was man in X Jahren braucht
  jahresEntwicklung: { jahr: number; kaufkraft: number; benoetigtBetrag: number }[];
}

export function calculateInflation(input: InflationInput): InflationResult {
  const { betrag, inflationsrate, jahre } = input;
  const rate = inflationsrate / 100;

  const faktor = Math.pow(1 + rate, jahre);
  const kaufkraft = Math.round((betrag / faktor) * 100) / 100;
  const wertverlust = Math.round((betrag - kaufkraft) * 100) / 100;
  const wertverlustProzent = Math.round((1 - 1 / faktor) * 10000) / 100;
  const benoetigtFuerGleicheKaufkraft = Math.round(betrag * faktor * 100) / 100;

  const jahresEntwicklung = Array.from({ length: jahre }, (_, i) => {
    const j = i + 1;
    const f = Math.pow(1 + rate, j);
    return {
      jahr: j,
      kaufkraft: Math.round((betrag / f) * 100) / 100,
      benoetigtBetrag: Math.round(betrag * f * 100) / 100,
    };
  });

  return { kaufkraft, wertverlust, wertverlustProzent, benoetigtFuerGleicheKaufkraft, jahresEntwicklung };
}
