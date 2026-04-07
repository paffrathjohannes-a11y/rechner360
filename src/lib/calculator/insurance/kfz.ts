/**
 * Kfz-Versicherung Rechner 2026
 *
 * Schätzt den jährlichen Beitrag für Haftpflicht, Teilkasko und Vollkasko
 * basierend auf Fahrzeugtyp, Typklasse, SF-Klasse, Region und Nutzung.
 */

export type Fahrzeugtyp = 'kleinwagen' | 'kompakt' | 'mittelklasse' | 'oberklasse' | 'suv' | 'elektro';
export type Versicherungsart = 'haftpflicht' | 'teilkasko' | 'vollkasko';

export interface KfzInput {
  fahrzeugtyp: Fahrzeugtyp;
  erstzulassung: number; // Jahr
  sfKlasse: number; // 0 (SF0) bis 35 (SF35)
  jahreslaufleistung: number; // km
  garagenstellplatz: boolean;
  alter: number; // Alter des Fahrers
  selbstbeteiligung: number; // € (150, 300, 500, 1000)
}

export interface KfzResult {
  haftpflicht: number;
  teilkasko: number;
  vollkasko: number;
  empfehlung: Versicherungsart;
  empfehlung_text: string;
  spartipp: string;
  fahrzeugalter: number;
}

// Basisbeiträge Haftpflicht nach Fahrzeugtyp (SF1, Durchschnitt)
const HAFTPFLICHT_BASIS: Record<Fahrzeugtyp, number> = {
  kleinwagen: 280,
  kompakt: 350,
  mittelklasse: 420,
  oberklasse: 550,
  suv: 480,
  elektro: 380,
};

// Teilkasko-Aufschlag (% des Haftpflicht-Basis)
const TEILKASKO_FAKTOR: Record<Fahrzeugtyp, number> = {
  kleinwagen: 0.35,
  kompakt: 0.45,
  mittelklasse: 0.55,
  oberklasse: 0.75,
  suv: 0.65,
  elektro: 0.60,
};

// Vollkasko-Aufschlag (% des Haftpflicht-Basis)
const VOLLKASKO_FAKTOR: Record<Fahrzeugtyp, number> = {
  kleinwagen: 0.90,
  kompakt: 1.10,
  mittelklasse: 1.40,
  oberklasse: 2.00,
  suv: 1.60,
  elektro: 1.30,
};

// SF-Klasse Rabatte (SF0 = 230%, SF1 = 100%, SF3 = 70%, SF10 = 35%, SF20 = 25%, SF35 = 20%)
function sfRabatt(sf: number): number {
  if (sf === 0) return 2.30;
  if (sf <= 1) return 1.00;
  if (sf <= 3) return 0.70;
  if (sf <= 5) return 0.55;
  if (sf <= 10) return 0.35;
  if (sf <= 15) return 0.28;
  if (sf <= 20) return 0.25;
  if (sf <= 25) return 0.23;
  return 0.20;
}

export function calculateKfz(input: KfzInput): KfzResult {
  const { fahrzeugtyp, erstzulassung, sfKlasse, jahreslaufleistung, garagenstellplatz, alter, selbstbeteiligung } = input;
  const currentYear = 2026;
  const fahrzeugalter = currentYear - erstzulassung;

  // Basisbeitrag
  let haftpflicht = HAFTPFLICHT_BASIS[fahrzeugtyp];

  // SF-Klasse anwenden
  haftpflicht *= sfRabatt(sfKlasse);

  // Alter des Fahrers (unter 25 = Aufschlag, über 60 = leichter Aufschlag)
  if (alter < 25) haftpflicht *= 1.50;
  else if (alter < 30) haftpflicht *= 1.15;
  else if (alter > 65) haftpflicht *= 1.10;

  // Laufleistung
  if (jahreslaufleistung > 20000) haftpflicht *= 1.15;
  else if (jahreslaufleistung > 15000) haftpflicht *= 1.05;
  else if (jahreslaufleistung < 8000) haftpflicht *= 0.90;

  // Garagenstellplatz
  if (garagenstellplatz) haftpflicht *= 0.92;

  haftpflicht = Math.round(haftpflicht);

  // Teilkasko
  let teilkasko = HAFTPFLICHT_BASIS[fahrzeugtyp] * TEILKASKO_FAKTOR[fahrzeugtyp];
  // Fahrzeugalter reduziert Kasko
  if (fahrzeugalter > 10) teilkasko *= 0.60;
  else if (fahrzeugalter > 5) teilkasko *= 0.80;
  // Selbstbeteiligung Rabatt
  if (selbstbeteiligung >= 500) teilkasko *= 0.70;
  else if (selbstbeteiligung >= 300) teilkasko *= 0.80;
  else if (selbstbeteiligung >= 150) teilkasko *= 0.90;
  teilkasko = Math.round(teilkasko);

  // Vollkasko
  let vollkasko = HAFTPFLICHT_BASIS[fahrzeugtyp] * VOLLKASKO_FAKTOR[fahrzeugtyp];
  vollkasko *= sfRabatt(sfKlasse);
  if (alter < 25) vollkasko *= 1.40;
  else if (alter < 30) vollkasko *= 1.10;
  if (fahrzeugalter > 10) vollkasko *= 0.65;
  else if (fahrzeugalter > 5) vollkasko *= 0.80;
  if (selbstbeteiligung >= 1000) vollkasko *= 0.60;
  else if (selbstbeteiligung >= 500) vollkasko *= 0.70;
  else if (selbstbeteiligung >= 300) vollkasko *= 0.80;
  vollkasko = Math.round(vollkasko);

  // Gesamtkosten: Haftpflicht + Kasko
  const teilkaskoGesamt = haftpflicht + teilkasko;
  const vollkaskoGesamt = haftpflicht + vollkasko;

  // Empfehlung
  let empfehlung: Versicherungsart;
  let empfehlung_text: string;

  if (fahrzeugalter > 10) {
    empfehlung = 'haftpflicht';
    empfehlung_text = `Ihr Fahrzeug ist ${fahrzeugalter} Jahre alt. Eine reine Haftpflicht reicht in der Regel aus — der Zeitwert ist zu niedrig für eine wirtschaftliche Kaskoversicherung.`;
  } else if (fahrzeugalter > 5) {
    empfehlung = 'teilkasko';
    empfehlung_text = `Bei einem ${fahrzeugalter} Jahre alten Fahrzeug empfiehlt sich eine Teilkasko. Sie schützt vor Diebstahl, Hagel und Glasbruch — die häufigsten Schäden bei älteren Fahrzeugen.`;
  } else {
    empfehlung = 'vollkasko';
    empfehlung_text = `Für ein ${fahrzeugalter <= 1 ? 'neues' : fahrzeugalter + ' Jahre altes'} Fahrzeug empfehlen wir Vollkasko. Der hohe Zeitwert rechtfertigt den umfassenden Schutz — auch bei Selbstverschulden.`;
  }

  // Spartipp
  let spartipp: string;
  if (sfKlasse < 5 && alter >= 25) {
    spartipp = 'Tipp: Prüfen Sie, ob Sie die SF-Klasse eines Familienmitglieds übernehmen können — das senkt den Beitrag sofort erheblich.';
  } else if (!garagenstellplatz) {
    spartipp = 'Tipp: Ein Garagenstellplatz spart ca. 8 % auf die Haftpflicht. Auch ein Carport kann anerkannt werden.';
  } else if (selbstbeteiligung < 500) {
    spartipp = 'Tipp: Eine höhere Selbstbeteiligung (500 € statt 150 €) spart bis zu 30 % auf die Kaskoversicherung.';
  } else {
    spartipp = 'Tipp: Vergleichen Sie jährlich — Kfz-Versicherungen können bis zum 30. November gewechselt werden. Ein Vergleich dauert nur wenige Minuten.';
  }

  return {
    haftpflicht,
    teilkasko: teilkaskoGesamt,
    vollkasko: vollkaskoGesamt,
    empfehlung,
    empfehlung_text,
    spartipp,
    fahrzeugalter,
  };
}
