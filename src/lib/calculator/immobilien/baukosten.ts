/**
 * Baukosten Rechner 2026
 *
 * Durchschnittliche Baukosten pro m² nach Ausstattung und Region.
 * Quelle: Statistisches Bundesamt, BKI (Baukosteninformationszentrum)
 *
 * Kostengruppen nach DIN 276:
 * KG 300: Bauwerk – Baukonstruktionen
 * KG 400: Bauwerk – Technische Anlagen
 * KG 500: Außenanlagen
 * KG 700: Baunebenkosten (Architekt, Statik, Genehmigungen)
 */

export interface BaukostenInput {
  wohnflaeche: number; // m²
  ausstattung: 'einfach' | 'mittel' | 'gehoben' | 'luxus';
  bauweise: 'massiv' | 'fertighaus';
  keller: boolean;
  garage: 'keine' | 'einzelgarage' | 'doppelgarage' | 'carport';
  grundstueckspreis: number; // Gesamtpreis Grundstück
  region: 'guenstig' | 'mittel' | 'teuer'; // ländlich / mittel / Großstadt
}

export interface BaukostenResult {
  baukostenProQm: number;
  baukostenGesamt: number;
  kellerkosten: number;
  garagenkosten: number;
  baunebenkosten: number;
  aussenanlagen: number;
  grundstueck: number;
  gesamtkosten: number;
  aufschluesselung: { label: string; betrag: number; prozent: number }[];
}

// Baukosten pro m² Wohnfläche nach Ausstattung (2025/2026, inkl. KG 300+400)
const KOSTEN_PRO_QM: Record<string, Record<string, number>> = {
  massiv: {
    einfach: 1800,
    mittel: 2200,
    gehoben: 2800,
    luxus: 3500,
  },
  fertighaus: {
    einfach: 1600,
    mittel: 2000,
    gehoben: 2500,
    luxus: 3200,
  },
};

// Regionalfaktoren
const REGIONAL_FAKTOR: Record<string, number> = {
  guenstig: 0.85,  // ländlich, Ostdeutschland
  mittel: 1.0,     // Durchschnitt
  teuer: 1.25,     // München, Hamburg, Frankfurt, Stuttgart
};

const KELLER_PRO_QM = 600; // Zusatzkosten Keller pro m² Grundfläche (ca. 60-70% der Wohnfläche)
const GARAGE_KOSTEN: Record<string, number> = {
  keine: 0,
  carport: 5000,
  einzelgarage: 15000,
  doppelgarage: 25000,
};

export function calculateBaukosten(input: BaukostenInput): BaukostenResult {
  const { wohnflaeche, ausstattung, bauweise, keller, garage, grundstueckspreis, region } = input;

  const basisProQm = KOSTEN_PRO_QM[bauweise][ausstattung];
  const faktor = REGIONAL_FAKTOR[region];
  const baukostenProQm = Math.round(basisProQm * faktor);
  const baukostenGesamt = baukostenProQm * wohnflaeche;

  // Keller (ca. 65% der Wohnfläche als Kellerfläche)
  const kellerflaeche = Math.round(wohnflaeche * 0.65);
  const kellerkosten = keller ? kellerflaeche * KELLER_PRO_QM * faktor : 0;

  // Garage
  const garagenkosten = Math.round((GARAGE_KOSTEN[garage] || 0) * faktor);

  // Außenanlagen: ca. 5% der Baukosten
  const aussenanlagen = Math.round(baukostenGesamt * 0.05);

  // Baunebenkosten: ca. 15-20% der Baukosten (Architekt, Statik, Baugenehmigung, Versicherungen)
  const baunebenkosten = Math.round(baukostenGesamt * 0.18);

  const gesamtkosten = baukostenGesamt + kellerkosten + garagenkosten + aussenanlagen + baunebenkosten + grundstueckspreis;

  const aufschluesselung = [
    { label: 'Baukosten (KG 300+400)', betrag: baukostenGesamt, prozent: 0 },
    ...(kellerkosten > 0 ? [{ label: 'Keller', betrag: Math.round(kellerkosten), prozent: 0 }] : []),
    ...(garagenkosten > 0 ? [{ label: garage === 'carport' ? 'Carport' : garage === 'einzelgarage' ? 'Einzelgarage' : 'Doppelgarage', betrag: garagenkosten, prozent: 0 }] : []),
    { label: 'Au\u00dfenanlagen (ca. 5%)', betrag: aussenanlagen, prozent: 0 },
    { label: 'Baunebenkosten (ca. 18%)', betrag: baunebenkosten, prozent: 0 },
    { label: 'Grundst\u00fcck', betrag: grundstueckspreis, prozent: 0 },
  ].map((item) => ({
    ...item,
    prozent: gesamtkosten > 0 ? Math.round((item.betrag / gesamtkosten) * 1000) / 10 : 0,
  }));

  return {
    baukostenProQm,
    baukostenGesamt,
    kellerkosten: Math.round(kellerkosten),
    garagenkosten,
    baunebenkosten,
    aussenanlagen,
    grundstueck: grundstueckspreis,
    gesamtkosten,
    aufschluesselung,
  };
}
