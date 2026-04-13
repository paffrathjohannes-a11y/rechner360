'use client';

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

  useEffect(() => {
    if (!consent || !ADSENSE_CLIENT_ID) return;
    // Avoid duplicate script injection
    if (document.querySelector('script[src*="adsbygoogle.js"]')) return;

    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }, [consent]);

  return null;
}
