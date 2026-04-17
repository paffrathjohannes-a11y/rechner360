/**
 * Elterngeld-Rechner 2026
 *
 * Basiert auf dem Bundeselterngeld- und Elternzeitgesetz (BEEG).
 *
 * Elterngeld-Netto wird vereinfacht aus dem Bruttoeinkommen berechnet:
 * Pauschalabzüge (§ 2e BEEG): Lohnsteuer, Sozialversicherung (ca. 21%).
 *
 * Elterngeld-Arten:
 * - Basiselterngeld: 12 Monate (14 mit Partnermonaten)
 * - ElterngeldPlus: 24 Monate (28 mit Partnermonaten), halber Betrag
 */

export interface ElterngeldInput {
  bruttoEinkommen: number; // Durchschnittliches monatliches Bruttoeinkommen vor Geburt
  teilzeitBrutto: number; // Brutto-Einkommen während Elterngeldphase (0 = nicht erwerbstätig)
  elterngeldArt: 'basis' | 'plus';
  partnermonate: boolean; // +2 Monate (14 statt 12 / 28 statt 24)
  zwillinge: boolean;
  geschwisterbonus: boolean;
}

export interface ElterngeldResult {
  elterngeldNetto: number; // Berechnetes Elterngeld-Netto (vor Geburt)
  teilzeitNetto: number; // Berechnetes Netto während Elternzeit
  monatlich: number;
  laufzeitMonate: number;
  gesamt: number;
  ersatzrate: number;
  mindestbetrag: boolean;
  hoechstbetrag: boolean;
  mehrlingszuschlag: number;
  geschwisterbonus: number;
}

const MINDESTBETRAG = 300;
const HOECHSTBETRAG = 1800;
const MINDESTBETRAG_PLUS = 150;
const HOECHSTBETRAG_PLUS = 900;

/**
 * Vereinfachte Berechnung des Elterngeld-Nettos nach § 2e BEEG:
 * Pauschalabzüge: ~21% SV + Lohnsteuer (progressiv)
 */
function berechneElterngeldNetto(brutto: number): number {
  if (brutto <= 0) return 0;
  // Pauschalabzüge Sozialversicherung: ca. 21%
  const svAbzug = brutto * 0.21;
  // Vereinfachte Lohnsteuer (Elterngeld-Pauschale nach § 2e BEEG)
  const zvE = brutto - svAbzug;
  let steuer = 0;
  if (zvE > 1000) {
    steuer = (zvE - 1000) * 0.25; // Vereinfachte Progression
  }
  return Math.max(0, Math.round(brutto - svAbzug - steuer));
}

/**
 * Ersatzrate nach § 2 BEEG:
 * - Netto < 1.000€: 67% + Aufschlag (bis 100%)
 * - Netto 1.000-1.200€: 67%
 * - Netto 1.200-1.240€: 66% (sinkend)
 * - Netto > 1.240€: 65%
 */
function berechneErsatzrate(netto: number): number {
  if (netto < 1000) {
    const diff = 1000 - netto;
    return Math.min(1.0, 0.67 + (diff / 2) * 0.001);
  }
  if (netto <= 1200) return 0.67;
  if (netto <= 1240) {
    const diff = netto - 1200;
    return 0.67 - (diff / 2) * 0.001;
  }
  return 0.65;
}

// §1 Abs. 8 BEEG: Kein Elterngeldanspruch, wenn das zu versteuernde Einkommen
// im Kalenderjahr vor der Geburt > 200.000 € (bei Paaren gemeinsam)
// bzw. > 150.000 € (Alleinerziehende) lag. Wir schätzen zvE ≈ 12·Brutto.
const EINKOMMENSGRENZE_JAHR = 200_000;

export function calculateElterngeld(input: ElterngeldInput): ElterngeldResult {
  const { bruttoEinkommen, teilzeitBrutto, elterngeldArt, partnermonate, zwillinge, geschwisterbonus } = input;

  // Einkommensgrenze prüfen — über 200k kein Anspruch
  if (bruttoEinkommen * 12 > EINKOMMENSGRENZE_JAHR) {
    return {
      elterngeldNetto: 0,
      teilzeitNetto: 0,
      monatlich: 0,
      laufzeitMonate: 0,
      gesamt: 0,
      ersatzrate: 0,
      mindestbetrag: false,
      hoechstbetrag: false,
      mehrlingszuschlag: 0,
      geschwisterbonus: 0,
    };
  }

  const elterngeldNetto = berechneElterngeldNetto(bruttoEinkommen);
  const teilzeitNetto = berechneElterngeldNetto(teilzeitBrutto);

  // Einkommensdifferenz (was "wegfällt")
  const differenz = Math.max(0, elterngeldNetto - teilzeitNetto);

  const ersatzrate = berechneErsatzrate(differenz);
  let elterngeld = Math.round(differenz * ersatzrate);

  const isPlus = elterngeldArt === 'plus';
  const min = isPlus ? MINDESTBETRAG_PLUS : MINDESTBETRAG;
  const max = isPlus ? HOECHSTBETRAG_PLUS : HOECHSTBETRAG;

  let mindestbetrag = false;
  let hoechstbetrag = false;

  if (elterngeld < min) { elterngeld = min; mindestbetrag = true; }
  if (elterngeld > max) { elterngeld = max; hoechstbetrag = true; }

  // Mehrlingszuschlag: 300€ (Basis) / 150€ (Plus) pro weiterem Kind
  let mehrlingszuschlag = 0;
  if (zwillinge) {
    mehrlingszuschlag = isPlus ? 150 : 300;
  }

  // Geschwisterbonus: 10% (min. 75€ Basis / 37,50€ Plus)
  let geschwisterbonusBetrag = 0;
  if (geschwisterbonus) {
    const bonusMin = isPlus ? 37.5 : 75;
    geschwisterbonusBetrag = Math.max(bonusMin, Math.round(elterngeld * 0.10));
  }

  const monatlich = elterngeld + mehrlingszuschlag + geschwisterbonusBetrag;
  const basisMonate = isPlus ? 24 : 12;
  const laufzeitMonate = partnermonate ? basisMonate + (isPlus ? 4 : 2) : basisMonate;
  const gesamt = monatlich * laufzeitMonate;

  return {
    elterngeldNetto,
    teilzeitNetto,
    monatlich: Math.round(monatlich),
    laufzeitMonate,
    gesamt: Math.round(gesamt),
    ersatzrate,
    mindestbetrag,
    hoechstbetrag,
    mehrlingszuschlag,
    geschwisterbonus: geschwisterbonusBetrag,
  };
}
