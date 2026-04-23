/**
 * Zinssätze fetchen — EZB API + Fallback auf statische Werte
 *
 * EZB Statistical Data Warehouse API (kostenlos, offiziell):
 * https://data.ecb.europa.eu/help/api/data
 *
 * Wird server-side beim Build/Revalidate aufgerufen.
 */

export interface CurrentRates {
  leitzins: number;        // EZB-Leitzins (Hauptrefinanzierungssatz)
  kreditzins: number;      // Ø Konsumkredit-Zins
  bauzins10: number;       // Ø Bauzins 10 Jahre Bindung
  bauzins15: number;       // Ø Bauzins 15 Jahre Bindung
  tagesgeld: number;       // Ø Tagesgeld-Zins
  festgeld12: number;      // Ø Festgeld 12 Monate
  lastUpdated: string;     // ISO-Date
}

// Fallback-Werte (April 2026, manuell aktualisiert als Sicherheitsnetz)
const FALLBACK_RATES: CurrentRates = {
  leitzins: 2.65,
  kreditzins: 5.5,
  bauzins10: 3.4,
  bauzins15: 3.7,
  tagesgeld: 2.1,
  festgeld12: 2.8,
  lastUpdated: '2026-04-07',
};

async function fetchEcbRate(): Promise<number | null> {
  // 8s-Timeout via AbortController — ohne das blockt ein hängender ECB-Call
  // den Vercel-Build (3×60s Retries, dann build failure). FALLBACK_RATES
  // springen ein, sobald das Signal abgebrochen hat.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    // EZB Hauptrefinanzierungssatz (MRO)
    const url = 'https://data.ecb.europa.eu/data-api/v1/data/FM/M.U2.EUR.4F.KR.MRR_FR.LEV?lastNObservations=1&format=jsondata';
    const res = await fetch(url, {
      next: { revalidate: 86400 }, // 24h cache
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    const observations = data?.dataSets?.[0]?.series?.['0:0:0:0:0:0:0']?.observations;
    if (!observations) return null;
    const lastKey = Object.keys(observations).pop();
    return lastKey ? parseFloat(observations[lastKey][0]) : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function getCurrentRates(): Promise<CurrentRates> {
  const leitzins = await fetchEcbRate();

  if (leitzins !== null) {
    // Berechne abgeleitete Zinsen basierend auf Leitzins
    // Diese Formeln sind Annäherungen an typische Markt-Spreads
    return {
      leitzins,
      kreditzins: Math.round((leitzins + 2.8) * 10) / 10,   // Leitzins + ~2.8% Spread
      bauzins10: Math.round((leitzins + 0.8) * 10) / 10,    // Leitzins + ~0.8% Spread
      bauzins15: Math.round((leitzins + 1.1) * 10) / 10,    // Leitzins + ~1.1% Spread
      tagesgeld: Math.round((leitzins - 0.5) * 10) / 10,    // Leitzins - ~0.5%
      festgeld12: Math.round((leitzins + 0.2) * 10) / 10,   // Leitzins + ~0.2%
      lastUpdated: new Date().toISOString().split('T')[0],
    };
  }

  return FALLBACK_RATES;
}
