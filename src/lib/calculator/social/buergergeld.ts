/**
 * Bürgergeld-Rechner 2026
 *
 * Regelsätze gemäß SGB II ab 01.01.2026.
 * Hinweis: Regelsätze 2026 noch nicht final veröffentlicht.
 * Aktuell basierend auf den Werten von 2025 (letzte verfügbare).
 * Update bei Veröffentlichung der neuen Regelsätze.
 */

export interface BuergergeldInput {
  antragsteller: 'single' | 'paar';
  kinder: { alter: number }[];
  warmmiete: number; // Kosten der Unterkunft (KdU) inkl. Heizung
  einkommen: number; // Bruttoeinkommen Person 1
  einkommenPartner: number; // Bruttoeinkommen Person 2 (nur bei Paar)
  kindergeld: number; // pro Kind (wird als Einkommen angerechnet)
}

export interface BuergergeldResult {
  regelbedarf: number;
  kopiertKdu: number; // Kosten der Unterkunft
  gesamtbedarf: number;
  anrechenbares_einkommen: number;
  freibetrag: number;
  buergergeld: number;
  aufschluesselung: {
    label: string;
    betrag: number;
  }[];
}

// Regelsätze 2025 (2026 noch nicht veröffentlicht, Update nötig)
const REGELSAETZE = {
  // Regelbedarfsstufe 1: Alleinstehende/Alleinerziehende
  single: 563,
  // Regelbedarfsstufe 2: Partner in Bedarfsgemeinschaft
  partner: 506, // je Partner
  // Regelbedarfsstufe 3: Erwachsene unter 25 im Haushalt der Eltern
  u25: 451,
  // Regelbedarfsstufe 4: Jugendliche 14-17
  jugendlich: 471,
  // Regelbedarfsstufe 5: Kinder 6-13
  kind_6_13: 390,
  // Regelbedarfsstufe 6: Kinder 0-5
  kind_0_5: 357,
};

/**
 * Freibeträge bei Erwerbseinkommen (§ 11b SGB II):
 * - Grundfreibetrag: 100€
 * - 520,01-1.000€: 20%
 * - 1.000,01-1.200€: 10% (1.500€ mit Kind)
 */
function berechneFreibetrag(brutto: number, hatKinder: boolean): number {
  if (brutto <= 0) return 0;
  if (brutto <= 100) return brutto; // Grundfreibetrag

  let freibetrag = 100;

  if (brutto > 100 && brutto <= 520) {
    freibetrag += (brutto - 100) * 0.20;
  } else if (brutto > 520 && brutto <= 1000) {
    freibetrag += 420 * 0.20;
    freibetrag += (brutto - 520) * 0.30; // korrigiert: 520-1000 = 30%
  } else if (brutto > 1000) {
    freibetrag += 420 * 0.20;
    freibetrag += 480 * 0.30;
    const obergrenze = hatKinder ? 1500 : 1200;
    if (brutto <= obergrenze) {
      freibetrag += (brutto - 1000) * 0.10;
    } else {
      freibetrag += (obergrenze - 1000) * 0.10;
    }
  }

  return Math.round(freibetrag);
}

export function calculateBuergergeld(input: BuergergeldInput): BuergergeldResult {
  const { antragsteller, kinder, warmmiete, einkommen, einkommenPartner = 0, kindergeld } = input;

  const aufschluesselung: { label: string; betrag: number }[] = [];

  // Regelbedarf berechnen
  let regelbedarf = 0;

  if (antragsteller === 'single') {
    regelbedarf += REGELSAETZE.single;
    aufschluesselung.push({ label: 'Regelbedarf Alleinstehende(r)', betrag: REGELSAETZE.single });
  } else {
    regelbedarf += REGELSAETZE.partner * 2;
    aufschluesselung.push({ label: 'Regelbedarf Partner 1', betrag: REGELSAETZE.partner });
    aufschluesselung.push({ label: 'Regelbedarf Partner 2', betrag: REGELSAETZE.partner });
  }

  // Kinder
  for (let i = 0; i < kinder.length; i++) {
    const alter = kinder[i].alter;
    let kinderBedarf: number;
    let label: string;

    if (alter <= 5) {
      kinderBedarf = REGELSAETZE.kind_0_5;
      label = `Kind ${i + 1} (0-5 Jahre)`;
    } else if (alter <= 13) {
      kinderBedarf = REGELSAETZE.kind_6_13;
      label = `Kind ${i + 1} (6-13 Jahre)`;
    } else {
      kinderBedarf = REGELSAETZE.jugendlich;
      label = `Kind ${i + 1} (14-17 Jahre)`;
    }

    regelbedarf += kinderBedarf;
    aufschluesselung.push({ label, betrag: kinderBedarf });
  }

  // KdU
  const kdu = warmmiete;
  aufschluesselung.push({ label: 'Kosten der Unterkunft (Warmmiete)', betrag: kdu });

  const gesamtbedarf = regelbedarf + kdu;

  // Einkommen anrechnen — jede Person hat eigenen Freibetrag
  const hatKinder = kinder.length > 0;
  const freibetrag1 = berechneFreibetrag(einkommen, hatKinder);
  const freibetrag2 = antragsteller === 'paar' ? berechneFreibetrag(einkommenPartner, hatKinder) : 0;
  const freibetrag = freibetrag1 + freibetrag2;
  const gesamtEinkommen = einkommen + (antragsteller === 'paar' ? einkommenPartner : 0);
  const kindergeldGesamt = kindergeld * kinder.length;
  const anrechenbares_einkommen = Math.max(0, gesamtEinkommen - freibetrag) + kindergeldGesamt;

  const buergergeld = Math.max(0, Math.round(gesamtbedarf - anrechenbares_einkommen));

  return {
    regelbedarf,
    kopiertKdu: kdu,
    gesamtbedarf,
    anrechenbares_einkommen: Math.round(anrechenbares_einkommen),
    freibetrag,
    buergergeld,
    aufschluesselung,
  };
}
