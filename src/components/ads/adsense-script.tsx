'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { getConsent, onConsentChange } from '@/lib/consent';

const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '';

export function AdsenseScript() {
  const [consent, setConsent] = useState(false);

  useEffect(() => {
    // Granulares Gate: AdSense lädt NUR bei erteilter Werbe-Einwilligung —
    // nicht beim Sammel-Key, der auch bei reinem Analyse-Consent gesetzt ist.
    // Externes Browser-State (localStorage) → React-State, einmalige Sync.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(getConsent().marketing);
    return onConsentChange(() => setConsent(getConsent().marketing));
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
      onLoad={() => {
        // Signal an useAdsenseSlot: Script ist da, Push-Versuch lohnt jetzt.
        // Das window-load-Event ist beim typischen Erstbesuch (Consent-Klick
        // NACH Page-Load) längst vorbei und taugt nicht als Trigger.
        window.dispatchEvent(new Event('adsense-script-loaded'));
      }}
    />
  );
}
