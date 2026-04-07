/**
 * Rentenrechner — Gesetzliche Rente schätzen
 *
 * Rentenformel: Monatliche Rente = Entgeltpunkte × Zugangsfaktor × Rentenwert
 *
 * Entgeltpunkte: Jahresgehalt / Durchschnittseinkommen (2026: ca. 45.358 €)
 * Rentenwert 2026: ca. 39,32 € (West, nach Rentenanpassung)
 * Zugangsfaktor: 1.0 bei Regelalter, Abschläge bei Frühverrentung
 */

export interface RenteInput {
  aktuellesBrutto: number; // Jahresbrutto
  alter: number;
  berufsjahre: number;
  renteneintrittsalter: number;
  gehaltsSteigerung: number; // % p.a.
}

export interface RenteResult {
  entgeltpunkteGesamt: number;
  monatsrente: number;
  jahresrente: number;
  rentenluecke: number; // Differenz zum aktuellen Netto
  zugangsfaktor: number;
  restjahre: number;
}

const DURCHSCHNITTSEINKOMMEN = 45358; // 2026 geschätzt
const RENTENWERT = 39.32; // € pro Entgeltpunkt (West, 2025/2026)
const REGELALTERSGRENZE = 67; // Ab Jahrgang 1964

export function calculateRente(input: RenteInput): RenteResult {
  const { aktuellesBrutto, alter, berufsjahre, renteneintrittsalter, gehaltsSteigerung } = input;

  const restjahre = Math.max(0, renteneintrittsalter - alter);

  // Bisherige Entgeltpunkte (vereinfacht: durchschnittlich)
  const bisherigePunkte = berufsjahre * (aktuellesBrutto / DURCHSCHNITTSEINKOMMEN);

  // Künftige Entgeltpunkte (mit Gehaltssteigerung)
  let kuenftigePunkte = 0;
  let gehalt = aktuellesBrutto;
  for (let j = 0; j < restjahre; j++) {
    kuenftigePunkte += gehalt / DURCHSCHNITTSEINKOMMEN;
    gehalt *= (1 + gehaltsSteigerung / 100);
  }

  const entgeltpunkteGesamt = Math.round((bisherigePunkte + kuenftigePunkte) * 100) / 100;

  // Zugangsfaktor (Abschlag bei Frührente: 0,3% pro Monat vor 67)
  let zugangsfaktor = 1.0;
  if (renteneintrittsalter < REGELALTERSGRENZE) {
    const monateVorher = (REGELALTERSGRENZE - renteneintrittsalter) * 12;
    zugangsfaktor = Math.max(0.7, 1.0 - monateVorher * 0.003);
  }
  zugangsfaktor = Math.round(zugangsfaktor * 1000) / 1000;

  const monatsrente = Math.round(entgeltpunkteGesamt * zugangsfaktor * RENTENWERT * 100) / 100;
  const jahresrente = Math.round(monatsrente * 12 * 100) / 100;

  // Rentenlücke (aktuelles Netto ca. 65% des Brutto vs. Rente)
  const aktuellesNetto = aktuellesBrutto * 0.65 / 12;
  const rentenluecke = Math.round((aktuellesNetto - monatsrente) * 100) / 100;

  return {
    entgeltpunkteGesamt,
    monatsrente,
    jahresrente,
    rentenluecke: Math.max(0, rentenluecke),
    zugangsfaktor,
    restjahre,
  };
}
