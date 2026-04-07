/**
 * Kreditrechner — Annuitätendarlehen
 */

import type { KreditInput, KreditResult, TilgungsplanZeile } from '@/types/calculator';

export function calculateKredit(input: KreditInput): KreditResult {
  const { darlehensbetrag, zinssatz, laufzeit_monate, sondertilgung_jaehrlich = 0 } = input;

  if (darlehensbetrag <= 0 || laufzeit_monate <= 0) {
    return { monatliche_rate: 0, gesamtkosten: 0, gesamtzinsen: 0, tilgungsplan: [] };
  }

  const monatszins = Math.max(0, zinssatz) / 100 / 12;

  // Annuitätenformel: rate = P * (r * (1+r)^n) / ((1+r)^n - 1)
  let monatliche_rate: number;
  if (monatszins === 0) {
    monatliche_rate = darlehensbetrag / laufzeit_monate;
  } else {
    const factor = Math.pow(1 + monatszins, laufzeit_monate);
    monatliche_rate = darlehensbetrag * (monatszins * factor) / (factor - 1);
  }
  monatliche_rate = Math.round(monatliche_rate * 100) / 100;

  // Tilgungsplan erstellen
  const tilgungsplan: TilgungsplanZeile[] = [];
  let restschuld = darlehensbetrag;
  let gesamtzinsen = 0;

  for (let monat = 1; monat <= laufzeit_monate && restschuld > 0.01; monat++) {
    const jahr = Math.ceil(monat / 12);
    const zins = Math.round(restschuld * monatszins * 100) / 100;
    let tilgung = Math.round((monatliche_rate - zins) * 100) / 100;

    // Sondertilgung am Jahresende
    let sondertilgung = 0;
    if (sondertilgung_jaehrlich > 0 && monat % 12 === 0) {
      sondertilgung = Math.min(sondertilgung_jaehrlich, restschuld - tilgung);
      sondertilgung = Math.max(0, sondertilgung);
    }

    // Letzte Rate anpassen
    if (tilgung + sondertilgung > restschuld) {
      tilgung = restschuld;
      sondertilgung = 0;
    }

    restschuld = Math.round((restschuld - tilgung - sondertilgung) * 100) / 100;
    gesamtzinsen += zins;

    tilgungsplan.push({
      monat,
      jahr,
      rate: Math.round((zins + tilgung) * 100) / 100,
      zins,
      tilgung,
      sondertilgung,
      restschuld: Math.max(0, restschuld),
    });
  }

  const gesamtkosten = Math.round((darlehensbetrag + gesamtzinsen) * 100) / 100;
  gesamtzinsen = Math.round(gesamtzinsen * 100) / 100;

  return {
    monatliche_rate,
    gesamtkosten,
    gesamtzinsen,
    tilgungsplan,
  };
}
