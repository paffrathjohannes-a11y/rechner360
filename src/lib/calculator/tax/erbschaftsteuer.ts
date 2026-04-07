import type { Verwandtschaft, ErbschaftsteuerInput, ErbschaftsteuerResult } from '@/types/calculator';

// §16 ErbStG — Freibeträge
const FREIBETRAEGE: Record<Verwandtschaft, number> = {
  ehepartner: 500_000,
  kind: 400_000,
  enkelkind: 200_000,
  elternteil: 100_000, // 100k at inheritance, 20k at gift (handled in calculation)
  geschwister: 20_000,
  nichte_neffe: 20_000,
  sonstige: 20_000,
};

// Steuerklasse mapping
function getSteuerklasse(verwandtschaft: Verwandtschaft, art: 'erbschaft' | 'schenkung'): 1 | 2 | 3 {
  switch (verwandtschaft) {
    case 'ehepartner':
    case 'kind':
    case 'enkelkind':
      return 1;
    case 'elternteil':
      return art === 'erbschaft' ? 1 : 2;
    case 'geschwister':
    case 'nichte_neffe':
      return 2;
    case 'sonstige':
      return 3;
  }
}

// §17 ErbStG — Versorgungsfreibeträge (nur bei Erbschaft)
function getVersorgungsfreibetrag(verwandtschaft: Verwandtschaft, alterDesKindes?: number): number {
  if (verwandtschaft === 'ehepartner') return 256_000;
  if (verwandtschaft === 'kind') {
    if (alterDesKindes === undefined) return 0;
    if (alterDesKindes <= 5) return 52_000;
    if (alterDesKindes <= 10) return 41_000;
    if (alterDesKindes <= 15) return 30_700;
    if (alterDesKindes <= 20) return 20_500;
    if (alterDesKindes <= 27) return 10_300;
    return 0;
  }
  return 0;
}

// §13 Abs. 1 Nr. 1 ErbStG — Hausrat-Freibetrag
function getHausratFreibetrag(steuerklasse: 1 | 2 | 3): number {
  return steuerklasse === 1 ? 41_000 : 12_000;
}

// §19 ErbStG — Steuersätze (nicht progressiv, ganzer Betrag wird mit einem Satz besteuert)
interface Stufe {
  bis: number;
  raten: [number, number, number]; // [SK I, SK II, SK III]
}

const STUFEN: Stufe[] = [
  { bis: 75_000, raten: [0.07, 0.15, 0.30] },
  { bis: 300_000, raten: [0.11, 0.20, 0.30] },
  { bis: 600_000, raten: [0.15, 0.25, 0.30] },
  { bis: 6_000_000, raten: [0.19, 0.30, 0.30] },
  { bis: 13_000_000, raten: [0.23, 0.35, 0.50] },
  { bis: 26_000_000, raten: [0.27, 0.40, 0.50] },
  { bis: Infinity, raten: [0.30, 0.43, 0.50] },
];

function getSteuersatzUndBetrag(betrag: number, steuerklasse: 1 | 2 | 3): { satz: number; steuer: number } {
  if (betrag <= 0) return { satz: 0, steuer: 0 };

  const skIndex = steuerklasse - 1;

  // Find applicable bracket
  let stufeIndex = 0;
  for (let i = 0; i < STUFEN.length; i++) {
    if (betrag <= STUFEN[i].bis) {
      stufeIndex = i;
      break;
    }
  }

  const satz = STUFEN[stufeIndex].raten[skIndex];
  let steuer = Math.floor(betrag * satz);

  // §19 Abs. 3 — Härteausgleich
  // When amount just crosses a bracket, cap the tax
  if (stufeIndex > 0) {
    const vorherigeGrenze = STUFEN[stufeIndex - 1].bis;
    const vorherigerSatz = STUFEN[stufeIndex - 1].raten[skIndex];
    const vorherigerBetrag = Math.floor(vorherigeGrenze * vorherigerSatz);
    const haerteausgleich = vorherigerBetrag + Math.floor((betrag - vorherigeGrenze) * 0.5);

    if (haerteausgleich < steuer) {
      steuer = haerteausgleich;
    }
  }

  return { satz, steuer };
}

export function calculateErbschaftsteuer(input: ErbschaftsteuerInput): ErbschaftsteuerResult {
  const { wert, verwandtschaft, artDesErwerbs, versorgungsfreibetrag, hausratFreibetrag, alterDesKindes } = input;

  const steuerklasse = getSteuerklasse(verwandtschaft, artDesErwerbs);

  // Freibetrag — Elternteil bei Schenkung nur 20k
  let freibetrag = FREIBETRAEGE[verwandtschaft];
  if (verwandtschaft === 'elternteil' && artDesErwerbs === 'schenkung') {
    freibetrag = 20_000;
  }

  // Versorgungsfreibetrag — nur bei Erbschaft
  let versorgungsFB = 0;
  if (artDesErwerbs === 'erbschaft' && versorgungsfreibetrag) {
    versorgungsFB = getVersorgungsfreibetrag(verwandtschaft, alterDesKindes);
  }

  // Hausrat-Freibetrag
  let hausratFB = 0;
  if (hausratFreibetrag) {
    hausratFB = getHausratFreibetrag(steuerklasse);
  }

  // Steuerpflichtiger Erwerb
  const steuerpflichtigerErwerb = Math.max(0, wert - freibetrag - versorgungsFB - hausratFB);

  // Steuerberechnung
  const { satz, steuer } = getSteuersatzUndBetrag(steuerpflichtigerErwerb, steuerklasse);

  const nettoErbe = wert - steuer;
  const effektiverSteuersatz = wert > 0 ? steuer / wert : 0;

  return {
    bruttoWert: wert,
    freibetrag,
    versorgungsfreibetrag: versorgungsFB,
    hausratFreibetrag: hausratFB,
    steuerpflichtigerErwerb,
    steuerklasse,
    steuersatz: satz,
    steuerBetrag: steuer,
    effektiverSteuersatz,
    nettoErbe,
  };
}

// Labels for UI
export const VERWANDTSCHAFT_OPTIONS: { value: Verwandtschaft; label: string }[] = [
  { value: 'ehepartner', label: 'Ehepartner/in' },
  { value: 'kind', label: 'Kind / Stiefkind' },
  { value: 'enkelkind', label: 'Enkelkind' },
  { value: 'elternteil', label: 'Elternteil / Großelternteil' },
  { value: 'geschwister', label: 'Geschwister' },
  { value: 'nichte_neffe', label: 'Nichte / Neffe' },
  { value: 'sonstige', label: 'Sonstige Person' },
];
