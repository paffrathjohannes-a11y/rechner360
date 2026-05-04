'use client';

import { cn } from '@/lib/utils/cn';
import { useAdsenseSlot } from '@/hooks/use-adsense-slot';

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
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || '';
  const { adFilled, adRef } = useAdsenseSlot();

  // Ohne ClientID gibt es nichts zu rendern (Build-Zeit-Ausschluss).
  if (!clientId) return null;

  // Slot komplett verstecken, solange wir nicht sicher wissen, dass eine Ad
  // geliefert wurde. Grund: AdSense reserviert ~280 px Höhe via `ins`,
  // bevor klar ist, ob überhaupt eine Ad kommt — leere Boxen für Sekunden
  // wären ein massiver Layout- und UX-Killer.
  const hideCompletely = adFilled !== true;

  return (
    <div
      ref={adRef}
      hidden={hideCompletely}
      aria-hidden={adFilled !== true}
      className={cn(
        'relative overflow-hidden rounded-xl border border-border bg-surface-sunken/50',
        'transition-opacity duration-300',
        formatStyles[format],
        adFilled === true ? 'opacity-100' : 'opacity-0',
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
