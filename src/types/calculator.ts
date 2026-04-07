export interface BruttoNettoInput {
  brutto: number;
  steuerklasse: 1 | 2 | 3 | 4 | 5 | 6;
  bundesland: string;
  kirchensteuer: boolean;
  kinderfreibetraege: number;
  krankenversicherung: 'gesetzlich' | 'privat';
  kv_zusatzbeitrag: number;
  rentenversicherung: boolean;
  arbeitslosenversicherung: boolean;
  pflegeversicherung_kinder: number;
  alter_ueber_23: boolean;
  geburtsjahr: number;
  lohnzahlungszeitraum: 'monat' | 'jahr';
  /** Geldwerter Vorteil in EUR/Monat (manuell eingegeben oder berechnet) */
  geldwerter_vorteil: number;
  /** Firmenwagen Bruttolistenpreis (0 = kein Firmenwagen) */
  firmenwagen_listenpreis: number;
  /** Firmenwagen Antriebsart für %-Regel */
  firmenwagen_antrieb: 'verbrenner' | 'hybrid' | 'elektro' | 'kein';
}

export interface BruttoNettoResult {
  brutto: number;
  netto: number;

  // Steuern
  lohnsteuer: number;
  solidaritaetszuschlag: number;
  kirchensteuer: number;
  steuern_gesamt: number;

  // Sozialversicherung (AN-Anteil)
  krankenversicherung: number;
  rentenversicherung: number;
  arbeitslosenversicherung: number;
  pflegeversicherung: number;
  sozialversicherung_gesamt: number;

  // Abzüge gesamt
  abzuege_gesamt: number;

  // AG-Kosten
  ag_krankenversicherung: number;
  ag_rentenversicherung: number;
  ag_arbeitslosenversicherung: number;
  ag_pflegeversicherung: number;
  ag_umlage: number;
  ag_kosten_gesamt: number;

  // Meta
  steuersatz_effektiv: number;
  sv_satz_effektiv: number;
  abgabenquote: number;
}

export interface KreditInput {
  darlehensbetrag: number;
  zinssatz: number;
  laufzeit_monate: number;
  sondertilgung_jaehrlich?: number;
}

export interface KreditResult {
  monatliche_rate: number;
  gesamtkosten: number;
  gesamtzinsen: number;
  tilgungsplan: TilgungsplanZeile[];
}

export interface TilgungsplanZeile {
  monat: number;
  jahr: number;
  rate: number;
  zins: number;
  tilgung: number;
  sondertilgung: number;
  restschuld: number;
}

export interface TilgungsInput {
  darlehensbetrag: number;
  zinssatz: number;
  anfaengliche_tilgung: number;
  sondertilgung_jaehrlich?: number;
  zinsbindung_jahre: number;
}

export interface TilgungsResult {
  monatliche_rate: number;
  restschuld_nach_zinsbindung: number;
  gezahlte_zinsen: number;
  getilgter_betrag: number;
  gesamtlaufzeit_monate: number;
  tilgungsplan: TilgungsplanZeile[];
}

// Erbschaftsteuer / Schenkungsteuer
export type Verwandtschaft =
  | 'ehepartner'
  | 'kind'
  | 'enkelkind'
  | 'elternteil'
  | 'geschwister'
  | 'nichte_neffe'
  | 'sonstige';

export interface ErbschaftsteuerInput {
  wert: number;
  verwandtschaft: Verwandtschaft;
  artDesErwerbs: 'erbschaft' | 'schenkung';
  versorgungsfreibetrag: boolean;
  hausratFreibetrag: boolean;
  alterDesKindes?: number;
}

export interface ErbschaftsteuerResult {
  bruttoWert: number;
  freibetrag: number;
  versorgungsfreibetrag: number;
  hausratFreibetrag: number;
  steuerpflichtigerErwerb: number;
  steuerklasse: 1 | 2 | 3;
  steuersatz: number;
  steuerBetrag: number;
  effektiverSteuersatz: number;
  nettoErbe: number;
}

export interface BreakdownItem {
  label: string;
  value: number;
  percentage?: number;
  color: 'primary' | 'accent' | 'negative' | 'warning' | 'muted';
  tooltip?: string;
}

export interface ChartSegment {
  label: string;
  value: number;
  color: string;
  percentage: number;
}

export interface CalculatorMeta {
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
  year: number;
}
