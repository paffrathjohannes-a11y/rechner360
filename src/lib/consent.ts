/**
 * Zentrale Cookie-Consent-Logik (SSOT).
 *
 * Granulares Modell (necessary/analytics/marketing) im Detail-Key;
 * der Legacy-Sammel-Key bleibt als Migrationsquelle für Alt-Besucher
 * und als grobes Cross-Tab-Signal erhalten. Alle Lade-Gates (GA4,
 * AdSense, Ad-Slots) MÜSSEN über getConsent() auf die granulare
 * Auswahl prüfen — niemals nur auf den Sammel-Key.
 */

export const CONSENT_KEY = 'rechner360_cookie_consent';
export const CONSENT_DETAIL_KEY = 'rechner360_cookie_detail';
export const CONSENT_CHANGE_EVENT = 'cookie-consent-change';
export const CONSENT_SETTINGS_OPEN_EVENT = 'cookie-settings-open';

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const NO_CONSENT: CookieConsent = { necessary: true, analytics: false, marketing: false };

export function getStoredConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;
  try {
    const detail = localStorage.getItem(CONSENT_DETAIL_KEY);
    if (detail) {
      const parsed = JSON.parse(detail) as Partial<CookieConsent>;
      return {
        necessary: true,
        analytics: parsed.analytics === true,
        marketing: parsed.marketing === true,
      };
    }
    // Migration: Alt-Besucher mit Sammel-Key vor Einführung des Detail-Keys
    const old = localStorage.getItem(CONSENT_KEY);
    if (old === 'accepted') return { necessary: true, analytics: true, marketing: true };
    if (old === 'declined') return { ...NO_CONSENT };
  } catch {}
  return null;
}

/** Aktueller Consent; ohne Speicherung gilt alles Nicht-Notwendige als abgelehnt. */
export function getConsent(): CookieConsent {
  return getStoredConsent() ?? { ...NO_CONSENT };
}

export function saveConsent(consent: CookieConsent): void {
  try {
    localStorage.setItem(CONSENT_DETAIL_KEY, JSON.stringify(consent));
    localStorage.setItem(CONSENT_KEY, consent.analytics || consent.marketing ? 'accepted' : 'declined');
  } catch {}
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

/** Öffnet den Cookie-Banner im Detail-Modus (Widerruf nach Art. 7 Abs. 3 DSGVO). */
export function openCookieSettings(): void {
  window.dispatchEvent(new Event(CONSENT_SETTINGS_OPEN_EVENT));
}

/**
 * Abonniert Consent-Änderungen (gleicher Tab via Custom-Event, andere Tabs
 * via storage-Event). Gibt eine Cleanup-Funktion zurück.
 */
export function onConsentChange(callback: () => void): () => void {
  const handleStorage = (e: StorageEvent) => {
    if (e.key === CONSENT_KEY || e.key === CONSENT_DETAIL_KEY) callback();
  };
  window.addEventListener('storage', handleStorage);
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
  };
}
