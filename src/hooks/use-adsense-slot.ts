'use client';

import { useEffect, useRef, useState } from 'react';
import { getConsent, onConsentChange } from '@/lib/consent';

/**
 * Gemeinsame AdSense-Slot-Logik für NativeAdSlot und StickyDesktopAd.
 *
 * Ersetzt das frühere `setInterval`-Polling-Muster (alle 1000 ms × 8 s,
 * mehrfach pro Seite) durch:
 *   - Consent-Listener (localStorage + Custom-Event)
 *   - `requestAnimationFrame` + `window.load`-Hook für `adsbygoogle.push`
 *   - `MutationObserver` auf das `data-ad-status`-Attribut, statt zu pollen
 *
 * Resultat: keine Hintergrund-Timer mehr, ein einziger DOM-Mutation-Listener
 * pro Slot, der sich nach dem ersten relevanten Statuswechsel selbst
 * abmeldet.
 */
export interface UseAdsenseSlotOptions {
  /** Wenn false, wird weder Consent geprüft noch gepusht (z. B. Sticky geschlossen). */
  enabled?: boolean;
  /** Maximale Wartezeit bis adFilled === false gesetzt wird (ms). */
  fallbackTimeoutMs?: number;
}

export interface UseAdsenseSlotResult {
  /** Cookie-Consent erteilt? */
  consent: boolean;
  /**
   * `null` solange Status unbekannt, `true` wenn AdSense `data-ad-status="filled"`
   * gemeldet hat, `false` wenn `unfilled` oder Timeout.
   */
  adFilled: boolean | null;
  /** Ref auf den Container; muss `<ins class="adsbygoogle">` umschließen. */
  adRef: React.RefObject<HTMLDivElement | null>;
}

// Granulares Gate: Slots pushen nur bei erteilter Werbe-Einwilligung
// (gleiche Bedingung wie das AdSense-Script selbst).
function readConsent(): boolean {
  return getConsent().marketing;
}

export function useAdsenseSlot({
  enabled = true,
  fallbackTimeoutMs = 8000,
}: UseAdsenseSlotOptions = {}): UseAdsenseSlotResult {
  const [consent, setConsent] = useState(false);
  const [adFilled, setAdFilled] = useState<boolean | null>(null);
  const adRef = useRef<HTMLDivElement | null>(null);
  const pushed = useRef(false);

  // 1) Consent: einmal initial lesen + auf Änderungen hören (storage + custom event).
  useEffect(() => {
    setConsent(readConsent());
    return onConsentChange(() => setConsent(readConsent()));
  }, []);

  // 2) Push: einmal nach dem ersten Render mit Consent.
  //    Wenn `adsbygoogle` noch nicht da ist (Script lädt asynchron), warten
  //    wir auf das `load`-Event statt zu pollen — ein Listener, kein Timer.
  useEffect(() => {
    if (!enabled || !consent || pushed.current) return;

    const tryPush = () => {
      if (pushed.current) return false;
      const adsbygoogle = (window as unknown as Record<string, unknown[]>).adsbygoogle;
      if (!adsbygoogle) return false;
      try {
        adsbygoogle.push({});
        pushed.current = true;
        return true;
      } catch {
        // Doppel-Push (z. B. React Strict Mode in dev) — als Erfolg werten,
        // damit wir nicht nochmal versuchen.
        pushed.current = true;
        return true;
      }
    };

    if (tryPush()) return;

    const handleLoad = () => {
      tryPush();
    };

    window.addEventListener('load', handleLoad, { once: true });

    // Fallback-Timeout: wenn nach `fallbackTimeoutMs` immer noch nicht gepusht,
    // markieren wir den Slot als unfilled (verstecken die leere Box).
    const timeout = window.setTimeout(() => {
      if (!pushed.current) setAdFilled(false);
    }, fallbackTimeoutMs);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.clearTimeout(timeout);
    };
  }, [enabled, consent, fallbackTimeoutMs]);

  // 3) Status-Beobachtung: MutationObserver statt Polling.
  //    AdSense schreibt `data-ad-status="filled"` oder `"unfilled"` ins
  //    `<ins>`-Element. Wir hören nur auf dieses Attribut und melden uns
  //    nach dem ersten endgültigen Status ab.
  useEffect(() => {
    if (!enabled || !consent || !adRef.current) return;
    const root = adRef.current;
    const ins = root.querySelector('ins.adsbygoogle');
    if (!ins) return;

    const readStatus = () => {
      const status = ins.getAttribute('data-ad-status');
      if (status === 'filled') {
        setAdFilled(true);
        return true;
      }
      if (status === 'unfilled') {
        setAdFilled(false);
        return true;
      }
      return false;
    };

    if (readStatus()) return;

    const observer = new MutationObserver(() => {
      if (readStatus()) observer.disconnect();
    });
    observer.observe(ins, { attributes: true, attributeFilter: ['data-ad-status'] });

    // Sekundärer Fallback: wenn AdSense den Status gar nicht setzt, nach
    // `fallbackTimeoutMs` aufgeben. Verhindert dauerhaft hängende `null`.
    const timeout = window.setTimeout(() => {
      if (adFilled === null) {
        setAdFilled(false);
        observer.disconnect();
      }
    }, fallbackTimeoutMs);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
    };
    // adFilled bewusst nicht im Dep-Array: wir wollen NICHT bei jedem
    // Statuswechsel einen neuen Observer aufsetzen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, consent, fallbackTimeoutMs]);

  return { consent, adFilled, adRef };
}
