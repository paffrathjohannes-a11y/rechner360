'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

const CONSENT_KEY = 'rechner360_cookie_consent';

type ConsentState = 'pending' | 'accepted' | 'declined';

export function CookieBanner() {
  const [consent, setConsent] = useState<ConsentState>('accepted'); // default to hide
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'accepted' || stored === 'declined') {
      setConsent(stored);
    } else {
      setConsent('pending');
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setConsent('accepted');
    // TODO: Initialize GA4 here
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setConsent('declined');
  }

  if (!mounted || consent !== 'pending') return null;

  return (
    <div
      className={cn(
        'fixed bottom-0 inset-x-0 z-[100] p-4',
        'animate-result-in',
      )}
    >
      <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-5 shadow-xl">
        <div className="space-y-3">
          <p className="text-sm text-text leading-relaxed">
            Wir verwenden Cookies, um die Nutzung unserer Website zu analysieren.
            Ihre Berechnungsdaten werden <strong>nicht</strong> gespeichert oder übermittelt —
            alle Berechnungen laufen ausschließlich in Ihrem Browser.{' '}
            <Link href="/datenschutz" className="text-primary-600 hover:underline">
              Mehr erfahren
            </Link>
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleDecline} variant="secondary" size="sm" className="flex-1 sm:flex-none">
              Nur notwendige
            </Button>
            <Button onClick={handleAccept} variant="primary" size="sm" className="flex-1 sm:flex-none">
              Alle akzeptieren
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
