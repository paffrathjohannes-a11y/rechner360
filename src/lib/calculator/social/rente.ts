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

// Vorläufiges Durchschnittsentgelt 2026 laut Bundeskabinettsbeschluss
// (SV-Rechengrößen-Verordnung 2026): 51.944 €.
const DURCHSCHNITTSEINKOMMEN = 51944;
const RENTENWERT = 39.32; // € pro Entgeltpunkt, bundeseinheitlich seit 2024
const REGELALTERSGRENZE = 67; // Ab Jahrgang 1964
// Beitragsbemessungsgrenze RV 2026: 101.400 € — darüber werden keine Entgeltpunkte erworben
const BBG_RV_JAHR = 101400;

export function calculateRente(input: RenteInput): RenteResult {
  const { aktuellesBrutto, alter, berufsjahre, renteneintrittsalter, gehaltsSteigerung } = input;

  const restjahre = Math.max(0, renteneintrittsalter - alter);

  // Bisherige Entgeltpunkte (progressives Modell: Gehalt startete bei 60% des aktuellen)
  // Annahme: Gehalt stieg linear von 60% auf 100% über die Berufsjahre
  const startAnteil = 0.6;
  const durchschnittlicherAnteil = berufsjahre > 0 ? (startAnteil + 1.0) / 2 : 1.0; // Mittelwert 0.6..1.0 = 0.8
  const durchschnittsGehalt = aktuellesBrutto * durchschnittlicherAnteil;
  // Gehalt über BBG bringt keine weiteren Entgeltpunkte (§70 SGB VI).
  const bemessungsGehaltBisher = Math.min(durchschnittsGehalt, BBG_RV_JAHR);
  const bisherigePunkte = berufsjahre * (bemessungsGehaltBisher / DURCHSCHNITTSEINKOMMEN);

  // Künftige Entgeltpunkte (mit Gehaltssteigerung)
  let kuenftigePunkte = 0;
  let gehalt = aktuellesBrutto;
  for (let j = 0; j < restjahre; j++) {
    // Auch künftig: Beitragsbemessungsgrenze deckelt die EP-Erwerbung.
    kuenftigePunkte += Math.min(gehalt, BBG_RV_JAHR) / DURCHSCHNITTSEINKOMMEN;
    gehalt *= (1 + gehaltsSteigerung / 100);
  }

  const entgeltpunkteGesamt = Math.round((bisherigePunkte + kuenftigePunkte) * 100) / 100;

  // Zugangsfaktor (Abschlag bei Frührente: 0,3% pro Monat vor 67, Zuschlag: 0,5% pro Monat nach 67)
  let zugangsfaktor = 1.0;
  if (renteneintrittsalter < REGELALTERSGRENZE) {
    const monateVorher = (REGELALTERSGRENZE - renteneintrittsalter) * 12;
    zugangsfaktor = Math.max(0.7, 1.0 - monateVorher * 0.003);
  } else if (renteneintrittsalter > REGELALTERSGRENZE) {
    const monateNachher = (renteneintrittsalter - REGELALTERSGRENZE) * 12;
    zugangsfaktor = 1.0 + monateNachher * 0.005;
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
