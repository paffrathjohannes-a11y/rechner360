'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
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
  const [adFilled, setAdFilled] = useState<boolean | null>(null);
  const pushed = useRef(false);
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

  const tryPush = useCallback(() => {
    if (pushed.current) return;
    try {
      const adsbygoogle = (window as unknown as Record<string, unknown[]>).adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({});
        pushed.current = true;
      }
    } catch {
      // AdSense not ready yet
    }
  }, []);

  useEffect(() => {
    if (!consent || !clientId) return;

    // Try immediately
    tryPush();

    // If script hasn't loaded yet, wait for it
    if (!pushed.current) {
      const interval = setInterval(() => {
        tryPush();
        if (pushed.current) clearInterval(interval);
      }, 500);
      // Give up after 10s
      const timeout = setTimeout(() => {
        clearInterval(interval);
        if (!pushed.current) setAdFilled(false);
      }, 10000);
      return () => { clearInterval(interval); clearTimeout(timeout); };
    }
  }, [consent, clientId, tryPush]);

  // Observe whether AdSense actually filled the slot
  useEffect(() => {
    if (!pushed.current || !adRef.current) return;

    const checkFilled = () => {
      const ins = adRef.current?.querySelector('ins.adsbygoogle');
      if (!ins) return;
      const status = ins.getAttribute('data-ad-status');
      if (status === 'filled') setAdFilled(true);
      else if (status === 'unfilled') setAdFilled(false);
    };

    // Check periodically for the ad status
    const interval = setInterval(checkFilled, 1000);
    const timeout = setTimeout(() => {
      clearInterval(interval);
      if (adFilled === null) setAdFilled(false);
    }, 8000);

    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, [consent, clientId, adFilled]);

  // Don't render anything if no consent, no client ID, or ad confirmed unfilled
  if (!consent || !clientId || adFilled === false) return null;

  return (
    <div
      ref={adRef}
      className={cn(
        'relative overflow-hidden rounded-xl border border-border bg-surface-sunken/50',
        'transition-all duration-300',
        adFilled === null && 'opacity-0 max-h-0',
        adFilled === true && 'opacity-100',
        formatStyles[format],
        className,
      )}
    >
      {adFilled && (
        <div className="absolute top-2 right-3 z-10">
          <span className="text-[10px] font-medium text-text-muted/60 uppercase tracking-wider">
            Anzeige
          </span>
        </div>
      )}

      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client={clientId}
        {...(slot ? { 'data-ad-slot': slot } : {})}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
