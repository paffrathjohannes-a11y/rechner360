'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '';

export function AdsenseScript() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('rechner360_cookie_consent');
    setConsent(stored === 'accepted');

    const handleConsent = () => {
      setConsent(localStorage.getItem('rechner360_cookie_consent') === 'accepted');
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'rechner360_cookie_consent') handleConsent();
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('cookie-consent-change', handleConsent);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('cookie-consent-change', handleConsent);
    };
  }, []);

  if (!consent || !ADSENSE_CLIENT_ID) return null;

  // `next/script` mit `afterInteractive` priorisiert das Laden korrekt,
  // blockiert weder Hydration noch LCP. Ersetzt das manuelle `createElement`,
  // sodass Next.js den Script-Ladezyklus kontrolliert.
  return (
    <Script
      id="adsense-script"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
