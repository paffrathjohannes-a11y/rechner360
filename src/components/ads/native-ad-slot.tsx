'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils/cn';

type AdFormat = 'horizontal' | 'rectangle' | 'vertical';

interface NativeAdSlotProps {
  format?: AdFormat;
  slot?: string;
  className?: string;
}

const formatStyles: Record<AdFormat, string> = {
  horizontal: 'min-h-[90px]',
  rectangle: 'min-h-[250px]',
  vertical: 'min-h-[600px]',
};

export function NativeAdSlot({ format = 'horizontal', slot, className }: NativeAdSlotProps) {
  const [consent, setConsent] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '';

  useEffect(() => {
    const stored = localStorage.getItem('rechner360_cookie_consent');
    setConsent(stored === 'accepted');

    const handleConsent = () => {
      setConsent(localStorage.getItem('rechner360_cookie_consent') === 'accepted');
    };

    window.addEventListener('cookie-consent-change', handleConsent);
    return () => window.removeEventListener('cookie-consent-change', handleConsent);
  }, []);

  useEffect(() => {
    if (!consent || !clientId || loaded) return;

    try {
      const adsbygoogle = (window as unknown as Record<string, unknown[]>).adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({});
        setLoaded(true);
      }
    } catch {
      // AdSense not loaded yet, will retry when script loads
    }
  }, [consent, clientId, loaded]);

  // Don't render anything if no consent or no client ID
  if (!consent || !clientId) return null;

  return (
    <div
      ref={adRef}
      className={cn(
        'relative overflow-hidden rounded-xl border border-border bg-surface-sunken/50',
        'transition-all duration-300',
        formatStyles[format],
        className,
      )}
    >
      {/* Subtle "Anzeige" label — blends with design */}
      <div className="absolute top-2 right-3 z-10">
        <span className="text-[10px] font-medium text-text-muted/60 uppercase tracking-wider">
          Anzeige
        </span>
      </div>

      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
