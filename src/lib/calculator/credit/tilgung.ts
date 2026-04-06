/**
 * Tilgungsrechner — Baufinanzierung mit anfänglicher Tilgung
 */

import type { TilgungsInput, TilgungsResult, TilgungsplanZeile } from '@/types/calculator';

export function calculateTilgung(input: TilgungsInput): TilgungsResult {
  const {
    darlehensbetrag,
    zinssatz,
    anfaengliche_tilgung,
    sondertilgung_jaehrlich = 0,
    zinsbindung_jahre,
  } = input;

  const monatszins = zinssatz / 100 / 12;
  const jahresAnnuitaet = darlehensbetrag * (zinssatz / 100 + anfaengliche_tilgung / 100);
  const monatliche_rate = Math.round((jahresAnnuitaet / 12) * 100) / 100;

  const tilgungsplan: TilgungsplanZeile[] = [];
  let restschuld = darlehensbetrag;
  let gezahlte_zinsen = 0;
  let getilgter_betrag = 0;
  let monat = 0;

  // Berechne bis Restschuld = 0 oder max 50 Jahre
  const maxMonate = 50 * 12;

  while (restschuld > 0.01 && monat < maxMonate) {
    monat++;
    const jahr = Math.ceil(monat / 12);
    const zins = Math.round(restschuld * monatszins * 100) / 100;
    let tilgung = Math.round((monatliche_rate - zins) * 100) / 100;

    // Sondertilgung am Jahresende
    let sondertilgung = 0;
    if (sondertilgung_jaehrlich > 0 && monat % 12 === 0) {
      sondertilgung = Math.min(sondertilgung_jaehrlich, restschuld - tilgung);
      sondertilgung = Math.max(0, sondertilgung);
    }

    if (tilgung + sondertilgung > restschuld) {
      tilgung = restschuld;
      sondertilgung = 0;
    }

    restschuld = Math.round((restschuld - tilgung - sondertilgung) * 100) / 100;
    restschuld = Math.max(0, restschuld);
    gezahlte_zinsen += zins;
    getilgter_betrag += tilgung + sondertilgung;

    // Nur Zeilen innerhalb Zinsbindung + etwas darüber für den Plan speichern
    if (monat <= zinsbindung_jahre * 12 + 12) {
      tilgungsplan.push({
        monat,
        jahr,
        rate: Math.round((zins + tilgung) * 100) / 100,
        zins,
        tilgung,
        sondertilgung,
        restschuld,
      });
    }
  }

  // Restschuld nach Zinsbindung
  const zinsbindungMonate = zinsbindung_jahre * 12;
  const zinsbindungZeile = tilgungsplan.find((z) => z.monat === zinsbindungMonate);
  const restschuld_nach_zinsbindung = zinsbindungZeile?.restschuld ?? restschuld;

  return {
    monatliche_rate,
    restschuld_nach_zinsbindung: Math.round(restschuld_nach_zinsbindung * 100) / 100,
    gezahlte_zinsen: Math.round(gezahlte_zinsen * 100) / 100,
    getilgter_betrag: Math.round(getilgter_betrag * 100) / 100,
    gesamtlaufzeit_monate: monat,
    tilgungsplan,
  };
}
