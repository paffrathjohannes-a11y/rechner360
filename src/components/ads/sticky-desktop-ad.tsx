'use client';

import { X } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { useAdsenseSlot } from '@/hooks/use-adsense-slot';
import { useSessionStorageFlag } from '@/hooks/use-session-storage-flag';

/**
 * Sticky Desktop Ad — dezentes, schließbares 300×250 Rectangle am rechten
 * Bildschirmrand. Nur sichtbar ab xl-Breakpoint (≥1280 px), damit der Content
 * nicht verdrängt wird. Nutzer kann schließen → per sessionStorage gemerkt,
 * kommt beim nächsten Navigationsklick NICHT wieder während der Session.
 *
 * Rendert nur, wenn:
 *   - Cookie-Consent gegeben
 *   - AdSense-ID gesetzt
 *   - nicht vom User geschlossen
 *   - Ad tatsächlich geliefert (kein leerer Slot).
 */

const CLOSE_KEY = 'rechner360_sticky_ad_closed';

export function StickyDesktopAd() {
  const [closed, setClosed] = useSessionStorageFlag(CLOSE_KEY);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '';
  const slotId = process.env.NEXT_PUBLIC_ADSENSE_STICKY_SLOT || '';

  const { consent, adFilled, adRef } = useAdsenseSlot({ enabled: !closed });

  if (!clientId || closed || !consent) return null;

  const handleClose = () => setClosed(true);

  return (
    <div
      ref={adRef}
      hidden={adFilled !== true}
      aria-hidden={adFilled !== true}
      className={cn(
        'hidden xl:block fixed z-30 right-4 bottom-4',
        'w-[300px] transition-opacity duration-300',
        adFilled === true ? 'opacity-100' : 'opacity-0',
      )}
    >
      <div className="relative rounded-xl border border-border bg-surface-sunken/90 backdrop-blur-sm shadow-lg overflow-hidden">
        {adFilled && (
          <>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Werbung schließen"
              className="absolute top-1 right-1 z-10 p-1 rounded-full bg-surface/80 hover:bg-surface text-text-muted hover:text-text transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="absolute top-1.5 left-2 z-10">
              <span className="text-[9px] font-medium text-text-muted/60 uppercase tracking-wider">
                Anzeige
              </span>
            </div>
          </>
        )}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '300px', height: '250px' }}
          data-ad-client={clientId}
          {...(slotId ? { 'data-ad-slot': slotId } : {})}
          data-ad-format="rectangle"
        />
      </div>
    </div>
  );
}
