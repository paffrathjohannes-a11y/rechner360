import { Shield, RefreshCw, EyeOff, UserX } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const signals = [
  { icon: EyeOff, label: 'Keine Daten gespeichert', sublabel: 'Alles läuft im Browser' },
  { icon: UserX, label: 'Kein Account nötig', sublabel: 'Sofort und anonym nutzen' },
  { icon: RefreshCw, label: 'Aktuell 2026', sublabel: 'Offizielle Steuerformeln' },
  { icon: Shield, label: 'Geprüfte Quellen', sublabel: 'BMF, EZB, SGB' },
] as const;

interface TrustSignalsProps {
  className?: string;
  compact?: boolean;
}

export function TrustSignals({ className, compact = false }: TrustSignalsProps) {
  if (compact) {
    return (
      <div className={cn('flex flex-wrap gap-3', className)}>
        {signals.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-1.5 text-xs text-text-muted"
          >
            <s.icon className="h-3 w-3 text-accent-500" />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      {signals.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-3 rounded-xl border border-border bg-surface-raised p-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-50 text-accent-600 dark:bg-accent-900/30 dark:text-accent-400">
            <s.icon className="h-4.5 w-4.5" />
          </div>
          <div>
            <p className="text-sm font-medium text-text">{s.label}</p>
            <p className="text-sm text-text-muted">{s.sublabel}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
