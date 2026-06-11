'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';
import { getConsent, onConsentChange } from '@/lib/consent';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Consent-Mode-v2-Signale aus der granularen Banner-Auswahl ableiten. */
function syncConsentMode() {
  const c = getConsent();
  window.gtag?.('consent', 'update', {
    ad_storage: c.marketing ? 'granted' : 'denied',
    ad_user_data: c.marketing ? 'granted' : 'denied',
    ad_personalization: c.marketing ? 'granted' : 'denied',
    analytics_storage: c.analytics ? 'granted' : 'denied',
  });
}

export function Analytics() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    // Granulares Gate: GA4 lädt NUR bei erteilter Analyse-Einwilligung —
    // nicht beim Sammel-Key, der auch bei reinem Marketing-Consent gesetzt ist.
    // Externes Browser-State (localStorage) → React-State, einmalige Sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(getConsent().analytics);
    return onConsentChange(() => {
      setConsent(getConsent().analytics);
      // Läuft gtag bereits, Consent-Mode-Signale sofort nachziehen
      // (z. B. Werbung nachträglich erlaubt/widerrufen).
      syncConsentMode();
    });
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
          window.gtag = gtag;
          gtag('js', new Date());
          // Consent Mode v2: Defaults VOR config setzen. analytics_storage ist
          // granted, weil dieses Script überhaupt nur mit Analyse-Einwilligung
          // lädt; die ad_*-Signale folgen der Werbe-Einwilligung.
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'granted',
          });
          // Bereits erteilte Werbe-Einwilligung sofort nachziehen (inline,
          // weil next/script bei Inline-Scripts kein onLoad feuert); spätere
          // Änderungen kommen über syncConsentMode (consent-change-Event).
          try {
            var d = JSON.parse(localStorage.getItem('rechner360_cookie_detail') || '{}');
            if (d.marketing === true) {
              gtag('consent', 'update', {
                ad_storage: 'granted',
                ad_user_data: 'granted',
                ad_personalization: 'granted',
              });
            }
          } catch (e) {}
          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure',
          });
        `}
      </Script>
    </>
  );
}
