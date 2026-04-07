export const SITE_NAME = 'rechner360.de';
export const SITE_URL = 'https://rechner360.de';
export const SITE_DESCRIPTION = 'Kostenlose Online-Rechner für Finanzen, Steuern und mehr. Aktuell 2026, präzise und DSGVO-konform.';

export const BUNDESLAENDER = [
  { id: 'bw', name: 'Baden-Württemberg', kirchensteuer: 0.08 },
  { id: 'by', name: 'Bayern', kirchensteuer: 0.08 },
  { id: 'be', name: 'Berlin', kirchensteuer: 0.09 },
  { id: 'bb', name: 'Brandenburg', kirchensteuer: 0.09 },
  { id: 'hb', name: 'Bremen', kirchensteuer: 0.09 },
  { id: 'hh', name: 'Hamburg', kirchensteuer: 0.09 },
  { id: 'he', name: 'Hessen', kirchensteuer: 0.09 },
  { id: 'mv', name: 'Mecklenburg-Vorpommern', kirchensteuer: 0.09 },
  { id: 'ni', name: 'Niedersachsen', kirchensteuer: 0.09 },
  { id: 'nw', name: 'Nordrhein-Westfalen', kirchensteuer: 0.09 },
  { id: 'rp', name: 'Rheinland-Pfalz', kirchensteuer: 0.09 },
  { id: 'sl', name: 'Saarland', kirchensteuer: 0.09 },
  { id: 'sn', name: 'Sachsen', kirchensteuer: 0.09 },
  { id: 'st', name: 'Sachsen-Anhalt', kirchensteuer: 0.09 },
  { id: 'sh', name: 'Schleswig-Holstein', kirchensteuer: 0.09 },
  { id: 'th', name: 'Thüringen', kirchensteuer: 0.09 },
] as const;

export type BundeslandId = typeof BUNDESLAENDER[number]['id'];

export const STEUERKLASSEN = [
  { id: 1, name: 'Steuerklasse I', description: 'Ledige, Geschiedene, Verwitwete' },
  { id: 2, name: 'Steuerklasse II', description: 'Alleinerziehende' },
  { id: 3, name: 'Steuerklasse III', description: 'Verheiratete (höheres Einkommen)' },
  { id: 4, name: 'Steuerklasse IV', description: 'Verheiratete (gleiches Einkommen)' },
  { id: 5, name: 'Steuerklasse V', description: 'Verheiratete (niedrigeres Einkommen)' },
  { id: 6, name: 'Steuerklasse VI', description: 'Zweit- und Nebenjobs' },
] as const;

export type SteuerklasseId = typeof STEUERKLASSEN[number]['id'];

export const RECHNER = [
  {
    slug: 'brutto-netto-rechner',
    title: 'Brutto Netto Rechner',
    shortTitle: 'Brutto-Netto',
    description: 'Berechnen Sie schnell und genau, wie viel Netto von Ihrem Bruttogehalt übrig bleibt.',
    icon: 'calculator',
    color: 'primary',
    popular: true,
  },
  {
    slug: 'gehaltsrechner',
    title: 'Gehaltsrechner',
    shortTitle: 'Gehalt',
    description: 'Vergleichen Sie Ihr Gehalt über alle Steuerklassen und berechnen Sie die Arbeitgeberkosten.',
    icon: 'wallet',
    color: 'accent',
    popular: true,
  },
  {
    slug: 'kreditrechner',
    title: 'Kreditrechner',
    shortTitle: 'Kredit',
    description: 'Berechnen Sie die monatliche Rate, Gesamtkosten und Zinsen für Ihren Kredit.',
    icon: 'landmark',
    color: 'primary',
    popular: true,
  },
  {
    slug: 'tilgungsrechner',
    title: 'Tilgungsrechner',
    shortTitle: 'Tilgung',
    description: 'Erstellen Sie einen detaillierten Tilgungsplan für Ihre Baufinanzierung.',
    icon: 'home',
    color: 'accent',
    popular: true,
  },
  {
    slug: 'bmi-rechner',
    title: 'BMI Rechner',
    shortTitle: 'BMI',
    description: 'Berechnen Sie Ihren Body-Mass-Index und erfahren Sie, ob Ihr Gewicht im gesunden Bereich liegt.',
    icon: 'heart-pulse',
    color: 'accent',
    popular: true,
  },
  {
    slug: 'elterngeld-rechner',
    title: 'Elterngeld Rechner',
    shortTitle: 'Elterngeld',
    description: 'Berechnen Sie Ihr Elterngeld — Basiselterngeld oder ElterngeldPlus mit Geschwisterbonus.',
    icon: 'baby',
    color: 'primary',
    popular: true,
  },
  {
    slug: 'prozentrechner',
    title: 'Prozentrechner',
    shortTitle: 'Prozent',
    description: 'Prozente berechnen: Anteil, Prozentsatz, Grundwert und prozentuale Ver\u00e4nderung.',
    icon: 'percent',
    color: 'primary',
    popular: true,
  },
  {
    slug: 'baukosten-rechner',
    title: 'Baukosten Rechner',
    shortTitle: 'Baukosten',
    description: 'Berechnen Sie die Baukosten f\u00fcr Ihr Haus: pro m\u00b2, nach Ausstattung, mit Keller, Garage und Nebenkosten.',
    icon: 'hard-hat',
    color: 'accent',
    popular: false,
  },
  {
    slug: 'abfindungsrechner',
    title: 'Abfindungsrechner',
    shortTitle: 'Abfindung',
    description: 'Berechnen Sie die Steuer auf Ihre Abfindung mit der F\u00fcnftelregelung und sehen Sie Ihre Netto-Abfindung.',
    icon: 'banknote',
    color: 'accent',
    popular: false,
  },
  {
    slug: 'inflationsrechner',
    title: 'Inflationsrechner',
    shortTitle: 'Inflation',
    description: 'Berechnen Sie den Kaufkraftverlust durch Inflation \u00fcber beliebige Zeitr\u00e4ume.',
    icon: 'trending-down',
    color: 'primary',
    popular: false,
  },
  {
    slug: 'nebenkostenrechner',
    title: 'Nebenkostenrechner',
    shortTitle: 'Nebenkosten',
    description: 'Berechnen Sie die Kaufnebenkosten beim Immobilienkauf: Grunderwerbsteuer, Notar, Grundbuch und Makler.',
    icon: 'building',
    color: 'accent',
    popular: false,
  },
  {
    slug: 'buergergeld-rechner',
    title: 'B\u00fcrgergeld Rechner',
    shortTitle: 'B\u00fcrgergeld',
    description: 'Berechnen Sie Ihren B\u00fcrgergeld-Anspruch mit Regelbedarf, Kosten der Unterkunft und Freibetr\u00e4gen.',
    icon: 'shield-check',
    color: 'accent',
    popular: false,
  },
] as const;

export type RechnerSlug = typeof RECHNER[number]['slug'];
