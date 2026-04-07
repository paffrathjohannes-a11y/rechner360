'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

const CONSENT_KEY = 'rechner360_cookie_consent';
const CONSENT_DETAIL_KEY = 'rechner360_cookie_detail';

export interface CookieConsent {
  necessary: boolean; // always true
  analytics: boolean;
  marketing: boolean;
}

function getStoredConsent(): CookieConsent | null {
  try {
    const detail = localStorage.getItem(CONSENT_DETAIL_KEY);
    if (detail) return JSON.parse(detail);
    // Migration: old binary consent
    const old = localStorage.getItem(CONSENT_KEY);
    if (old === 'accepted') return { necessary: true, analytics: true, marketing: true };
    if (old === 'declined') return { necessary: true, analytics: false, marketing: false };
  } catch {}
  return null;
}

function saveConsent(consent: CookieConsent) {
  localStorage.setItem(CONSENT_DETAIL_KEY, JSON.stringify(consent));
  // Keep legacy key for backwards compatibility with AdSense/Analytics components
  localStorage.setItem(CONSENT_KEY, consent.analytics || consent.marketing ? 'accepted' : 'declined');
  window.dispatchEvent(new Event('cookie-consent-change'));
}

export function getConsent(): CookieConsent {
  if (typeof window === 'undefined') return { necessary: true, analytics: false, marketing: false };
  return getStoredConsent() || { necessary: true, analytics: false, marketing: false };
}

export function CookieBanner() {
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent();
    if (!stored) {
      setShow(true);
    }
  }, []);

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
    <div className="fixed bottom-0 inset-x-0 z-[100] p-4 animate-result-in">
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-5 shadow-xl">
        <div className="space-y-4">
          <p className="text-sm text-text leading-relaxed">
            Wir verwenden Cookies, um die Nutzung unserer Website zu analysieren und Werbung zu personalisieren.
            Ihre Berechnungsdaten werden <strong>nicht</strong> gespeichert — alle Berechnungen laufen in Ihrem Browser.{' '}
            <Link href="/datenschutz" className="text-primary-600 hover:underline">
              Mehr erfahren
            </Link>
          </p>

          {showDetails && (
            <div className="space-y-3 rounded-lg border border-border bg-surface-sunken p-4">
              {/* Notwendig — immer an */}
              <label className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-text">Notwendig</p>
                  <p className="text-sm text-text-muted">Grundfunktionen der Website (immer aktiv).</p>
                </div>
                <input type="checkbox" checked disabled className="h-4 w-4 rounded accent-accent-600" />
              </label>

              {/* Analyse */}
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-text">Analyse</p>
                  <p className="text-sm text-text-muted">Google Analytics — hilft uns die Website zu verbessern.</p>
                </div>
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="h-4 w-4 rounded accent-accent-600 cursor-pointer"
                />
              </label>

              {/* Marketing / Werbung */}
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-text">Werbung</p>
                  <p className="text-sm text-text-muted">Google AdSense — personalisierte Werbeanzeigen.</p>
                </div>
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="h-4 w-4 rounded accent-accent-600 cursor-pointer"
                />
              </label>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-2">
            {!showDetails ? (
              <>
                <Button onClick={handleDeclineAll} variant="secondary" size="sm" className="flex-1 sm:flex-none">
                  Ablehnen
                </Button>
                <Button onClick={() => setShowDetails(true)} variant="secondary" size="sm" className="flex-1 sm:flex-none">
                  Einstellungen
                </Button>
                <Button onClick={handleAcceptAll} variant="primary" size="sm" className="flex-1 sm:flex-none">
                  Alle akzeptieren
                </Button>
              </>
            ) : (
              <>
                <Button onClick={handleDeclineAll} variant="secondary" size="sm" className="flex-1 sm:flex-none">
                  Alle ablehnen
                </Button>
                <Button onClick={handleSaveSelection} variant="primary" size="sm" className="flex-1 sm:flex-none">
                  Auswahl speichern
                </Button>
                <Button onClick={handleAcceptAll} variant="primary" size="sm" className="flex-1 sm:flex-none">
                  Alle akzeptieren
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
