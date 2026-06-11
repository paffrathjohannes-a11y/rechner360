'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  getStoredConsent,
  getConsent,
  saveConsent,
  CONSENT_SETTINGS_OPEN_EVENT,
} from '@/lib/consent';

// Re-Export für bestehende Importe
export type { CookieConsent } from '@/lib/consent';
export { getConsent } from '@/lib/consent';

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  // Nicht vorangekreuzt (EuGH C-673/17 „Planet49": vorausgewählte
  // Checkboxen sind keine wirksame Einwilligung).
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const primaryButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Mount-Marker für SSR-Safe-Rendering und Initial-Show wenn noch kein
    // Consent gespeichert ist. setState hier ist gewollt: wir greifen erst
    // clientseitig auf localStorage zu.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    if (!getStoredConsent()) setShow(true);

    // Widerruf/Änderung: Footer-Link „Cookie-Einstellungen" öffnet den
    // Banner im Detail-Modus, vorbelegt mit der aktuell gespeicherten Auswahl.
    const handleOpenSettings = () => {
      const current = getConsent();
      setAnalytics(current.analytics);
      setMarketing(current.marketing);
      setShowDetails(true);
      setShow(true);
    };
    window.addEventListener(CONSENT_SETTINGS_OPEN_EVENT, handleOpenSettings);
    return () => window.removeEventListener(CONSENT_SETTINGS_OPEN_EVENT, handleOpenSettings);
  }, []);

  // Nach Einblendung Fokus auf den primären Button setzen — Keyboard-Nutzer
  // müssen nicht erst durch das gesamte Dokument tabben, um den Banner zu erreichen.
  useEffect(() => {
    if (show && primaryButtonRef.current) {
      primaryButtonRef.current.focus();
    }
  }, [show]);

  function handleAcceptAll() {
    saveConsent({ necessary: true, analytics: true, marketing: true });
    setShow(false);
  }

  function handleDeclineAll() {
    saveConsent({ necessary: true, analytics: false, marketing: false });
    setShow(false);
  }

  function handleSaveSelection() {
    saveConsent({ necessary: true, analytics, marketing });
    setShow(false);
  }

  if (!mounted || !show) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed bottom-0 inset-x-0 z-[100] p-3 sm:p-4 animate-result-in"
    >
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-surface p-4 sm:p-5 shadow-xl">
        {/* Versteckter Titel für Screenreader, macht den Dialog aria-konform */}
        <h2 id="cookie-banner-title" className="sr-only">Cookie-Einstellungen</h2>
        {!showDetails ? (
          /* ─── Kompakte Ansicht ─── */
          <div className="space-y-3">
            <p id="cookie-banner-desc" className="text-sm text-text leading-relaxed">
              Wir nutzen Cookies für Analyse und Werbung. Berechnungen laufen nur in Ihrem Browser.{' '}
              <Link href="/datenschutz" className="text-primary-600 hover:underline">Datenschutz</Link>
            </p>
            <div className="flex items-center gap-2">
              <Button onClick={handleDeclineAll} variant="secondary" size="sm" className="flex-1">
                Ablehnen
              </Button>
              <Button ref={primaryButtonRef} onClick={handleAcceptAll} variant="primary" size="sm" className="flex-1">
                Akzeptieren
              </Button>
            </div>
            <button
              type="button"
              onClick={() => setShowDetails(true)}
              className="w-full text-center text-xs text-text-muted hover:text-text transition-colors cursor-pointer"
            >
              Einstellungen anpassen
            </button>
          </div>
        ) : (
          /* ─── Detail-Ansicht ─── */
          <div className="space-y-3">
            <p className="text-sm font-medium text-text">Cookie-Einstellungen</p>

            <div className="space-y-2 rounded-lg border border-border bg-surface-sunken p-3">
              <label className="flex items-center justify-between">
                <span className="text-sm text-text">Notwendig</span>
                <input type="checkbox" checked disabled className="h-4 w-4 rounded accent-accent-600" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-text">Analyse (Google Analytics)</span>
                <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="h-4 w-4 rounded accent-accent-600 cursor-pointer" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-sm text-text">Werbung (Google AdSense)</span>
                <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="h-4 w-4 rounded accent-accent-600 cursor-pointer" />
              </label>
            </div>

            <div className="flex items-center gap-2">
              <Button onClick={handleDeclineAll} variant="secondary" size="sm" className="flex-1">
                Alle ablehnen
              </Button>
              <Button onClick={handleSaveSelection} variant="primary" size="sm" className="flex-1">
                Speichern
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
