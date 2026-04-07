/**
 * Gehaltserhöhung Rechner
 * Zeigt den Netto-Unterschied vor/nach einer Gehaltserhöhung
 */

import { calculateBruttoNetto } from '../brutto-netto';
import type { BruttoNettoInput, BruttoNettoResult } from '@/types/calculator';

export interface GehaltserhoehungResult {
  vorher: BruttoNettoResult;
  nachher: BruttoNettoResult;
  bruttoDifferenz: number;
  nettoDifferenz: number;
  nettoAnteil: number; // % der Erhöhung die netto ankommt
  mehrAbgaben: number;
}

const DEFAULT_INPUT: Omit<BruttoNettoInput, 'brutto' | 'steuerklasse'> = {
  bundesland: 'nw',
  kirchensteuer: false,
  kinderfreibetraege: 0,
  krankenversicherung: 'gesetzlich',
  kv_zusatzbeitrag: 2.9,
  rentenversicherung: true,
  arbeitslosenversicherung: true,
  pflegeversicherung_kinder: 0,
  alter_ueber_23: true,
  geburtsjahr: 1990,
  lohnzahlungszeitraum: 'monat',
  geldwerter_vorteil: 0,
  firmenwagen_listenpreis: 0,
  firmenwagen_antrieb: 'kein',
};

export function calculateGehaltserhoehung(
  bruttoAlt: number,
  bruttoNeu: number,
  steuerklasse: 1|2|3|4|5|6,
): GehaltserhoehungResult {
  const vorher = calculateBruttoNetto({ ...DEFAULT_INPUT, brutto: bruttoAlt, steuerklasse });
  const nachher = calculateBruttoNetto({ ...DEFAULT_INPUT, brutto: bruttoNeu, steuerklasse });

  const bruttoDifferenz = Math.round((bruttoNeu - bruttoAlt) * 100) / 100;
  const nettoDifferenz = Math.round((nachher.netto - vorher.netto) * 100) / 100;
  const nettoAnteil = bruttoDifferenz > 0 ? Math.round((nettoDifferenz / bruttoDifferenz) * 10000) / 100 : 0;
  const mehrAbgaben = Math.round((bruttoDifferenz - nettoDifferenz) * 100) / 100;

  return { vorher, nachher, bruttoDifferenz, nettoDifferenz, nettoAnteil, mehrAbgaben };
}
