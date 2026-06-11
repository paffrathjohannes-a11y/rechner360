import { Calculator, ShieldCheck, EyeOff, BadgeCheck } from 'lucide-react';
import { RECHNER } from '@/lib/utils/constants';

/**
 * Statische Trust-Leiste unter dem Hero.
 *
 * Ersetzt den früheren animierten Nutzungs-Counter („36.5xx Berechnungen",
 * „Letzte Berechnung vor X s"), dessen Zahlen vollständig generiert waren —
 * wettbewerbsrechtlich angreifbar (irreführende Werbung) und zugleich das
 * LCP-Element mit ~2,5 s Render-Delay. Nur belegbare Aussagen zeigen.
 */
export function UsageCounter() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm text-text-muted">
      <div className="flex items-center gap-1.5">
        <Calculator className="w-4 h-4 text-primary-500" />
        <span><strong className="text-text font-semibold">{RECHNER.length}</strong> Rechner</span>
      </div>
      <div className="h-4 w-px bg-border" />
      <div className="flex items-center gap-1.5">
        <BadgeCheck className="w-4 h-4 text-accent-500" />
        <span>Offizielle Formeln <strong className="text-text font-semibold">2026</strong></span>
      </div>
      <div className="h-4 w-px bg-border hidden sm:block" />
      <div className="hidden sm:flex items-center gap-1.5">
        <ShieldCheck className="w-4 h-4 text-accent-500" />
        <span>Kostenlos &amp; ohne Account</span>
      </div>
      <div className="h-4 w-px bg-border hidden xl:block" />
      <div className="hidden xl:flex items-center gap-1.5">
        <EyeOff className="w-4 h-4 text-text-muted" />
        <span>Keine Daten gespeichert</span>
      </div>
    </div>
  );
}
