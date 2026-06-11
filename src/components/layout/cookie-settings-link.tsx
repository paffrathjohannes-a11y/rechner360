'use client';

import { openCookieSettings } from '@/lib/consent';

/**
 * Footer-Link zum Widerruf/Ändern der Cookie-Einwilligung (Art. 7 Abs. 3
 * DSGVO: Widerruf muss so einfach sein wie die Erteilung). Öffnet den
 * Cookie-Banner im Detail-Modus.
 */
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openCookieSettings} className={className}>
      Cookie-Einstellungen
    </button>
  );
}
