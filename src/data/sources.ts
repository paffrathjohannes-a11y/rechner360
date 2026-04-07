/**
 * Quellen-Angaben pro Rechner-Slug
 * Werden unter jedem Rechner angezeigt für Transparenz und Seriosität.
 */

export interface SourceData {
  sources: string[];
  disclaimer?: string; // Hinweis bei Schätzungen
}

export const sourcesBySlug: Record<string, SourceData> = {
  // ─── Gehalt & Steuern ──────────────────────────────
  'brutto-netto-rechner': {
    sources: [
      'BMF Programmablaufplan Lohnsteuer 2026',
      'Sozialversicherungsrechengrößen 2026 (BGBl.)',
      'GKV-Spitzenverband (Zusatzbeitrag)',
    ],
  },
  gehaltsrechner: {
    sources: [
      'BMF Programmablaufplan Lohnsteuer 2026',
      'Sozialversicherungsrechengrößen 2026',
    ],
  },
  'gehaltserhoehung-rechner': {
    sources: ['BMF Programmablaufplan Lohnsteuer 2026'],
  },
  'stundenlohn-rechner': {
    sources: ['Bundesurlaubsgesetz (BUrlG) § 3'],
  },
  abfindungsrechner: {
    sources: [
      'BMF Programmablaufplan Lohnsteuer 2026',
      '§ 34 EStG (Fünftelregelung)',
    ],
  },
  'erbschaftsteuer-rechner': {
    sources: [
      'Erbschaftsteuergesetz (ErbStG) §§ 15–19',
      'Versorgungsfreibeträge § 17 ErbStG',
    ],
  },

  // ─── Immobilien & Finanzen ─────────────────────────
  kreditrechner: {
    sources: ['Annuitätenformel', 'EZB Leitzins (Stand April 2026)'],
  },
  tilgungsrechner: {
    sources: ['Annuitätenformel', 'EZB Leitzins (Stand April 2026)'],
  },
  zinseszinsrechner: {
    sources: [
      'Zinseszinsformel',
      'Abgeltungsteuer 26,375% (§ 32d EStG)',
      'Sparerpauschbetrag § 20 Abs. 9 EStG',
    ],
  },
  'baukosten-rechner': {
    sources: ['BKI Baukosteninformationszentrum 2025/2026', 'DIN 276 (Kostengruppen)'],
    disclaimer: 'Die Baukosten sind Durchschnittswerte und können regional um ±25% abweichen.',
  },
  nebenkostenrechner: {
    sources: ['Grunderwerbsteuer nach Bundesland (Stand 2026)', 'GNotKG (Notarkosten)'],
  },
  'grundsteuer-rechner': {
    sources: ['Grundsteuergesetz (GrStG) — Bundesmodell', 'Bewertungsgesetz (BewG)'],
    disclaimer: 'Berechnung nach Bundesmodell. Bayern, Baden-Württemberg, Hamburg, Hessen und Niedersachsen nutzen eigene Modelle.',
  },

  // ─── Vorsorge & Soziales ───────────────────────────
  'elterngeld-rechner': {
    sources: ['Bundeselterngeld- und Elternzeitgesetz (BEEG)', 'Elterngeld-Netto nach § 2e BEEG'],
    disclaimer: 'Vereinfachte Berechnung. Für exakte Werte ist Ihr Einkommensteuerbescheid relevant.',
  },
  rentenrechner: {
    sources: [
      'Deutsche Rentenversicherung',
      'Aktueller Rentenwert 39,32 € (West, Stand Juli 2025)',
      'Durchschnittsentgelt 2026',
    ],
    disclaimer: 'Schätzung basierend auf dem aktuellen Rentenwert. Zukünftige Rentenanpassungen nicht berücksichtigt.',
  },
  'unterhalt-rechner': {
    sources: ['Düsseldorfer Tabelle 2025/2026', '§ 1612a BGB (Mindestunterhalt)'],
  },
  'buergergeld-rechner': {
    sources: ['SGB II (Bürgergeld)', 'Regelbedarfsstufen 2025', 'Freibeträge § 11b SGB II'],
  },
  pfaendungsrechner: {
    sources: ['§ 850c ZPO', 'Pfändungsfreigrenzenbekanntmachung ab 01.07.2025 (BGBl. 2025 I Nr. 110)'],
  },

  // ─── Versicherung ──────────────────────────────────
  'pkv-rechner': {
    sources: [
      'GKV-Beitragssätze 2026',
      'Versicherungspflichtgrenze 73.800 €/Jahr',
      'BBG Krankenversicherung 69.750 €/Jahr',
    ],
    disclaimer: 'PKV-Beiträge sind geschätzte Durchschnittswerte. Echte Tarife variieren stark nach Anbieter, Gesundheitszustand und gewähltem Leistungsumfang. Für ein individuelles Angebot empfehlen wir einen unabhängigen Vergleich.',
  },
  'kfz-versicherung-rechner': {
    sources: ['Typklassenverzeichnis (GDV)', 'SF-Klassen-System'],
    disclaimer: 'Geschätzte Durchschnittswerte. Echte Beiträge hängen von Regionalklasse, Typklasse und individueller Tarifgestaltung ab. Für ein verbindliches Angebot nutzen Sie einen Vergleich.',
  },
  'bu-rechner': {
    sources: ['Berufsgruppen-Risikoeinstufung (Versicherungswirtschaft)'],
    disclaimer: 'Orientierungswerte. Echte BU-Beiträge hängen von Ihrer individuellen Gesundheitsprüfung ab. Lassen Sie sich unverbindlich beraten.',
  },

  // ─── Alltag & Tools ────────────────────────────────
  'bmi-rechner': {
    sources: ['WHO BMI-Klassifikation'],
  },
  kalorienrechner: {
    sources: ['Mifflin-St Jeor Formel (Grundumsatz)', 'PAL-Faktoren (Aktivitätsniveau)'],
  },
  'mwst-rechner': {
    sources: ['Umsatzsteuergesetz (UStG) § 12'],
  },
  inflationsrechner: {
    sources: ['Statistisches Bundesamt (Destatis)'],
  },
  prozentrechner: {
    sources: [],
  },
};
