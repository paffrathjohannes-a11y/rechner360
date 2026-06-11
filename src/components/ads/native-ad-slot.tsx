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

  // WICHTIG: Solange der Status unbekannt ist (null), muss der Container
  // MESSBAR bleiben — `display:none` verhindert, dass AdSense die Breite
  // bestimmen kann, und der Slot füllt dann NIE (Henne-Ei). Deshalb:
  // Pending = reservierte Höhe als dezenter Platzhalter (CLS-frei),
  // kollabiert wird erst bei explizitem No-Fill/Timeout.
  const collapsed = adFilled === false;

  return (
    <div
      ref={adRef}
      hidden={collapsed}
      aria-hidden={adFilled !== true}
      className={cn(
        'relative overflow-hidden rounded-xl border border-border bg-surface-sunken/50',
        'transition-opacity duration-300',
        formatStyles[format],
        adFilled === true ? 'opacity-100' : 'opacity-40',
        className,
      )}
    >
      {adFilled && (
        <div className="absolute top-2 right-3 z-10">
          <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
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
