import { cn } from '@/lib/utils/cn';
import type { CurrentRates } from '@/lib/rates/fetch-rates';

interface ZinsTickerProps {
  rates: CurrentRates;
  variant?: 'kredit' | 'baufi' | 'anlage';
  className?: string;
}

interface RateItem {
  label: string;
  value: number;
  suffix?: string;
}

export function ZinsTicker({ rates, variant = 'kredit', className }: ZinsTickerProps) {
  let items: RateItem[];

  switch (variant) {
    case 'baufi':
      items = [
        { label: 'Bauzins 10J', value: rates.bauzins10 },
        { label: 'Bauzins 15J', value: rates.bauzins15 },
        { label: 'EZB-Leitzins', value: rates.leitzins },
      ];
      break;
    case 'anlage':
      items = [
        { label: 'Tagesgeld Ø', value: rates.tagesgeld },
        { label: 'Festgeld 12M', value: rates.festgeld12 },
        { label: 'EZB-Leitzins', value: rates.leitzins },
      ];
      break;
    default:
      items = [
        { label: 'Kreditzins Ø', value: rates.kreditzins },
        { label: 'EZB-Leitzins', value: rates.leitzins },
        { label: 'Tagesgeld Ø', value: rates.tagesgeld },
      ];
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-3 sm:gap-5 rounded-lg border border-border bg-surface-raised px-4 py-2.5', className)}>
      <span className="text-xs font-medium text-text-muted uppercase tracking-wide">Zinsen aktuell</span>
      <div className="h-4 w-px bg-border hidden sm:block" />
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <span className="text-sm text-text-secondary">{item.label}:</span>
          <span className="text-sm font-semibold font-currency text-text">
            {item.value.toFixed(1).replace('.', ',')} %
          </span>
        </div>
      ))}
      <div className="h-4 w-px bg-border hidden sm:block" />
      <span className="text-xs text-text-muted">
        Stand: {new Date(rates.lastUpdated).toLocaleDateString('de-DE', { month: 'short', year: 'numeric' })}
      </span>
    </div>
  );
}
