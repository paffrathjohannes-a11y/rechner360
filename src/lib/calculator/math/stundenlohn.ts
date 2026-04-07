/**
 * Gehaltsumrechner — Stundenlohn ↔ Monatsgehalt ↔ Jahresgehalt
 *
 * Berücksichtigt Urlaubstage und Feiertage für den effektiven Stundenlohn.
 * Deutschland: Ø 28 Urlaubstage + 10 Feiertage = 38 arbeitsfreie Tage
 */

export interface StundenlohnResult {
  stundenlohn: number;
  stundenlohnEffektiv: number; // Nur tatsächlich gearbeitete Stunden
  monatsgehalt: number;
  jahresgehalt: number;
  wochengehalt: number;
  tagesgehalt: number;
  arbeitstageProJahr: number;
  arbeitsstundenProJahr: number;
}

export function calculateStundenlohn(
  betrag: number,
  einheit: 'stunde' | 'monat' | 'jahr',
  stundenProWoche: number = 40,
  urlaubstage: number = 28,
  feiertage: number = 10,
): StundenlohnResult {
  const tageProWoche = 5;
  const arbeitstageProJahr = 52 * tageProWoche - urlaubstage - feiertage;
  const arbeitsstundenProJahr = arbeitstageProJahr * (stundenProWoche / tageProWoche);

  // Vertragliche Stunden (inkl. bezahlter Urlaub/Feiertage) — für Gehalt-Umrechnung
  const vertraglicheStundenProJahr = 52 * stundenProWoche;
  const vertraglicheStundenProMonat = vertraglicheStundenProJahr / 12;

  let stundenlohn: number; // Vertraglicher Stundenlohn (Gehalt / vertragliche Stunden)

  switch (einheit) {
    case 'stunde':
      stundenlohn = betrag;
      break;
    case 'monat':
      stundenlohn = betrag / vertraglicheStundenProMonat;
      break;
    case 'jahr':
      stundenlohn = betrag / vertraglicheStundenProJahr;
      break;
  }

  // Effektiver Stundenlohn: Was man pro tatsächlich gearbeiteter Stunde verdient
  const jahresgehalt = stundenlohn * vertraglicheStundenProJahr;
  const stundenlohnEffektiv = arbeitsstundenProJahr > 0 ? jahresgehalt / arbeitsstundenProJahr : 0;

  return {
    stundenlohn: Math.round(stundenlohn * 100) / 100,
    stundenlohnEffektiv: Math.round(stundenlohnEffektiv * 100) / 100,
    monatsgehalt: Math.round(stundenlohn * vertraglicheStundenProMonat * 100) / 100,
    jahresgehalt: Math.round(jahresgehalt * 100) / 100,
    wochengehalt: Math.round(stundenlohn * stundenProWoche * 100) / 100,
    tagesgehalt: Math.round(stundenlohn * stundenProWoche / tageProWoche * 100) / 100,
    arbeitstageProJahr,
    arbeitsstundenProJahr: Math.round(arbeitsstundenProJahr),
  };
}
