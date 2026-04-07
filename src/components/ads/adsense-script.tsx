'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

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

  return (
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}
