/**
 * Gehaltsumrechner — Stundenlohn ↔ Monatsgehalt ↔ Jahresgehalt
 */

export interface StundenlohnResult {
  stundenlohn: number;
  monatsgehalt: number;
  jahresgehalt: number;
  wochengehalt: number;
  tagesgehalt: number;
}

export function calculateStundenlohn(
  betrag: number,
  einheit: 'stunde' | 'monat' | 'jahr',
  stundenProWoche: number = 40,
): StundenlohnResult {
  const wochenProJahr = 52;
  const stundenProJahr = stundenProWoche * wochenProJahr;
  const stundenProMonat = stundenProJahr / 12;
  const tageProWoche = 5;

  let stundenlohn: number;

  switch (einheit) {
    case 'stunde':
      stundenlohn = betrag;
      break;
    case 'monat':
      stundenlohn = betrag / stundenProMonat;
      break;
    case 'jahr':
      stundenlohn = betrag / stundenProJahr;
      break;
  }

  return {
    stundenlohn: Math.round(stundenlohn * 100) / 100,
    monatsgehalt: Math.round(stundenlohn * stundenProMonat * 100) / 100,
    jahresgehalt: Math.round(stundenlohn * stundenProJahr * 100) / 100,
    wochengehalt: Math.round(stundenlohn * stundenProWoche * 100) / 100,
    tagesgehalt: Math.round(stundenlohn * stundenProWoche / tageProWoche * 100) / 100,
  };
}
