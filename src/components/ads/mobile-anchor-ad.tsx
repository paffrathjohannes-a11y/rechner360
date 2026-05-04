'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useAdsenseSlot } from '@/hooks/use-adsense-slot';
import { useSessionStorageFlag } from '@/hooks/use-session-storage-flag';

/**
 * Mobile Anchor-Ad — fixierter Werbe-Banner am unteren Bildschirmrand,
 * sichtbar nur < xl (also Mobile + Tablet, das Pendant zur StickyDesktopAd).
 *
 * Format: 320 × 50 (Smartphone-Standard), `data-full-width-responsive` lässt
 * AdSense das tatsächliche Format bestimmen. Schließbar, Schließ-Status pro
 * Session in sessionStorage.
 *
 * AdSense-Policy: Anchor-Ads sind ausdrücklich erlaubt, sofern (a) klar als
 * Werbung gekennzeichnet, (b) schließbar, (c) Content nicht überdeckt
 * (deshalb fixed bottom mit eigener Höhe statt overlay).
 */

const CLOSE_KEY = 'rechner360_mobile_anchor_closed';

export function MobileAnchorAd() {
  const [closed, setClosed] = useSessionStorageFlag(CLOSE_KEY);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '';
  const slotId = process.env.NEXT_PUBLIC_ADSENSE_ANCHOR_SLOT || '';

  const { consent, adFilled, adRef } = useAdsenseSlot({ enabled: !closed });

  if (!clientId || closed || !consent) return null;

  const handleClose = () => setClosed(true);

  return (
    <div
      ref={adRef}
      hidden={adFilled !== true}
      aria-hidden={adFilled !== true}
      className={cn(
        'xl:hidden fixed inset-x-0 bottom-0 z-30',
        'transition-opacity duration-300',
        adFilled === true ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div className="relative mx-auto max-w-[320px] border-t border-l border-r border-border bg-surface-sunken/95 backdrop-blur-sm shadow-lg overflow-hidden rounded-t-lg">
        {adFilled && (
          <>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Werbung schließen"
              className="absolute top-0.5 right-0.5 z-10 p-1 rounded-full bg-surface/80 hover:bg-surface text-text-muted hover:text-text transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="absolute top-0.5 left-1.5 z-10">
              <span className="text-[8px] font-medium text-text-muted/60 uppercase tracking-wider">
                Anzeige
              </span>
            </div>
          </>
        )}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '320px', height: '50px' }}
          data-ad-client={clientId}
          {...(slotId ? { 'data-ad-slot': slotId } : {})}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
