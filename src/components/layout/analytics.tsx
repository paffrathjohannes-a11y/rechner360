'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

export function Analytics() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('rechner360_cookie_consent');
    setConsent(stored === 'accepted');

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'rechner360_cookie_consent') {
        setConsent(e.newValue === 'accepted');
      }
    };

    // Also listen for custom event (same-tab consent change)
    const handleConsent = () => {
      const stored = localStorage.getItem('rechner360_cookie_consent');
      setConsent(stored === 'accepted');
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('cookie-consent-change', handleConsent);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('cookie-consent-change', handleConsent);
    };
  }, []);

  if (!consent || !GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure',
          });
        `}
      </Script>
    </>
  );
}
