/**
 * Unterhalt Rechner — Düsseldorfer Tabelle 2026
 *
 * Berechnet den Kindesunterhalt nach der Düsseldorfer Tabelle.
 * Die Tabelle wird jährlich vom OLG Düsseldorf veröffentlicht.
 *
 * Stand: 01.01.2026 (OLG Düsseldorf, veröffentlicht 01.12.2025)
 */

export interface UnterhaltInput {
  nettoEinkommen: number; // bereinigtes Netto des Unterhaltspflichtigen
  kinderAnzahl: number;
  kinderAlter: number[]; // Alter jedes Kindes
  kindergeldAnrechnung: boolean; // hälftig anrechnen
}

export interface UnterhaltResult {
  tabellenUnterhalt: number[];
  zahlbetrag: number[]; // nach Kindergeld-Anrechnung
  gesamtUnterhalt: number;
  einkommensgruppe: number;
  selbstbehalt: number;
  mangelfall: boolean;
}

// Düsseldorfer Tabelle 2026 — Bedarfssätze (ohne Kindergeldanrechnung)
// Quelle: OLG Düsseldorf, Stand 01.01.2026. Altersstufen 0-5, 6-11, 12-17, ab 18.
const TABELLE: number[][] = [
  // Gruppe 1: bis 2.100€ (100% = Mindestunterhalt)
  [486, 558, 653, 698],
  // Gruppe 2: 2.101-2.500€ (105%)
  [511, 586, 686, 733],
  // Gruppe 3: 2.501-2.900€ (110%)
  [535, 614, 719, 768],
  // Gruppe 4: 2.901-3.300€ (115%)
  [559, 642, 751, 803],
  // Gruppe 5: 3.301-3.700€ (120%)
  [584, 670, 784, 838],
  // Gruppe 6: 3.701-4.100€ (128%)
  [623, 715, 836, 894],
  // Gruppe 7: 4.101-4.500€ (136%)
  [661, 759, 889, 950],
  // Gruppe 8: 4.501-4.900€ (144%)
  [700, 804, 941, 1006],
  // Gruppe 9: 4.901-5.300€ (152%)
  [739, 849, 993, 1061],
  // Gruppe 10: 5.301-5.700€ (160%)
  [778, 893, 1045, 1117],
];

const EINKOMMENS_GRENZEN = [2100, 2500, 2900, 3300, 3700, 4100, 4500, 4900, 5300, 5700];

// Kindergeld 2026: 259€ pro Kind (seit 01.01.2026)
const KINDERGELD = 259;

// Selbstbehalt (Düsseldorfer Tabelle 2026).
// Aktuell wird nur der Erwerbstätigen-Wert genutzt; der Nicht-Erwerbstätigen-
// Wert (1200 €) bleibt dokumentarisch erhalten für zukünftige Differenzierung
// nach Erwerbsstatus.
const SELBSTBEHALT_ERWERBSTAETIG = 1450;

function getAltersstufe(alter: number): number {
  if (alter <= 5) return 0;
  if (alter <= 11) return 1;
  if (alter <= 17) return 2;
  return 3;
}

function getEinkommensgruppe(netto: number, kinderAnzahl: number): number {
  // Bei mehr als 2 Kindern: eine Gruppe niedriger
  // Bei weniger als 2 Kindern: eine Gruppe höher
  let gruppe = 0;
  for (let i = 0; i < EINKOMMENS_GRENZEN.length; i++) {
    if (netto <= EINKOMMENS_GRENZEN[i]) {
      gruppe = i;
      break;
    }
    if (i === EINKOMMENS_GRENZEN.length - 1) {
      gruppe = i;
    }
  }

  // Anpassung nach Kinderanzahl (Tabelle ist für 2 Kinder ausgelegt)
  if (kinderAnzahl < 2) gruppe = Math.min(gruppe + 1, TABELLE.length - 1);
  if (kinderAnzahl > 2) gruppe = Math.max(gruppe - 1, 0);

  return gruppe;
}

export function calculateUnterhalt(input: UnterhaltInput): UnterhaltResult {
  const { nettoEinkommen, kinderAnzahl, kinderAlter, kindergeldAnrechnung } = input;

  const einkommensgruppe = getEinkommensgruppe(nettoEinkommen, kinderAnzahl);

  const tabellenUnterhalt: number[] = [];
  const zahlbetrag: number[] = [];

  for (let i = 0; i < kinderAnzahl; i++) {
    const alter = kinderAlter[i] ?? 6;
    const stufe = getAltersstufe(alter);
    const bedarf = TABELLE[einkommensgruppe]?.[stufe] ?? TABELLE[0][stufe];
    tabellenUnterhalt.push(bedarf);

    // Kindergeld hälftig anrechnen (bei minderjährigen Kindern)
    if (kindergeldAnrechnung && alter < 18) {
      zahlbetrag.push(Math.max(0, bedarf - KINDERGELD / 2));
    } else if (kindergeldAnrechnung && alter >= 18) {
      // Bei volljährigen Kindern: volles Kindergeld anrechnen
      zahlbetrag.push(Math.max(0, bedarf - KINDERGELD));
    } else {
      zahlbetrag.push(bedarf);
    }
  }

  const gesamtUnterhalt = zahlbetrag.reduce((sum, z) => sum + z, 0);
  const selbstbehalt = SELBSTBEHALT_ERWERBSTAETIG;
  const mangelfall = nettoEinkommen - gesamtUnterhalt < selbstbehalt;

  return {
    tabellenUnterhalt,
    zahlbetrag,
    gesamtUnterhalt,
    einkommensgruppe: einkommensgruppe + 1,
    selbstbehalt,
    mangelfall,
  };
}
