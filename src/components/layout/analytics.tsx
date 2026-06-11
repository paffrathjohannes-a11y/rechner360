'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { getConsent, onConsentChange } from '@/lib/consent';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

export function Analytics() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    // Granulares Gate: GA4 lädt NUR bei erteilter Analyse-Einwilligung —
    // nicht beim Sammel-Key, der auch bei reinem Marketing-Consent gesetzt ist.
    // Externes Browser-State (localStorage) → React-State, einmalige Sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(getConsent().analytics);
    return onConsentChange(() => setConsent(getConsent().analytics));
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
