'use client';

import { Card } from '@/components/ui/card';
import { calculateKredit } from '@/lib/calculator/credit/annuity';
import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

interface LaufzeitVergleichProps {
  darlehensbetrag: number;
  zinssatz: number;
  aktuelleLaufzeit: number;
}

const LAUFZEITEN = [12, 24, 36, 48, 60, 72, 84, 96, 120];

export function LaufzeitVergleich({ darlehensbetrag, zinssatz, aktuelleLaufzeit }: LaufzeitVergleichProps) {
  if (darlehensbetrag <= 0) return null;

  const aktuellesErgebnis = calculateKredit({ darlehensbetrag, zinssatz, laufzeit_monate: aktuelleLaufzeit });

  const szenarien = LAUFZEITEN.map((m) => {
    const r = calculateKredit({ darlehensbetrag, zinssatz, laufzeit_monate: m });
    return {
      monate: m,
      jahre: m / 12,
      rate: r.monatliche_rate,
      zinsen: r.gesamtzinsen,
      gesamt: r.gesamtkosten,
      zinsDiff: r.gesamtzinsen - aktuellesErgebnis.gesamtzinsen,
      isAktuell: m === aktuelleLaufzeit,
    };
  });

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-text">Laufzeit-Vergleich</h3>
      <p className="text-sm text-text-muted">
        Gleicher Betrag ({formatCurrency(darlehensbetrag)}) und Zinssatz ({zinssatz} %) — wie ändern sich Rate und Kosten je nach Laufzeit?
      </p>
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-sunken">
                <th className="px-4 py-2 text-left text-text-secondary font-medium">Laufzeit</th>
                <th className="px-4 py-2 text-right text-text-secondary font-medium">Mtl. Rate</th>
                <th className="px-4 py-2 text-right text-text-secondary font-medium">Gesamtzinsen</th>
                <th className="px-4 py-2 text-right text-text-secondary font-medium hidden sm:table-cell">Gesamtkosten</th>
                <th className="px-4 py-2 text-right text-text-secondary font-medium">vs. aktuell</th>
              </tr>
            </thead>
            <tbody>
              {szenarien.map((s) => (
                <tr
                  key={s.monate}
                  className={cn(
                    'border-b border-border last:border-b-0 transition-colors',
                    s.isAktuell
                      ? 'bg-accent-50/40 dark:bg-accent-900/10 font-medium'
                      : 'hover:bg-surface-raised',
                  )}
                >
                  <td className="px-4 py-2.5 text-text">
                    {s.jahre} {s.jahre === 1 ? 'Jahr' : 'Jahre'}
                    {s.isAktuell && (
                      <span className="ml-2 text-xs text-accent-600 dark:text-accent-400 font-medium">← Ihre Wahl</span>
                    )}
                  </td>
                  <td className={cn('px-4 py-2.5 text-right font-currency', s.isAktuell ? 'text-accent-600 dark:text-accent-400' : 'text-text')}>
                    {formatCurrency(s.rate)}
                  </td>
                  <td className={cn('px-4 py-2.5 text-right font-currency', s.isAktuell ? 'text-warning-600 dark:text-warning-400' : 'text-warning-500')}>
                    {formatCurrency(s.zinsen)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-currency text-text hidden sm:table-cell">
                    {formatCurrency(s.gesamt)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-currency">
                    {s.isAktuell ? (
                      <span className="text-text-muted">—</span>
                    ) : s.zinsDiff < 0 ? (
                      <span className="text-accent-500">{formatCurrency(s.zinsDiff)}</span>
                    ) : (
                      <span className="text-warning-500">+{formatCurrency(s.zinsDiff)}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <p className="text-xs text-text-muted text-center">
        Kürzere Laufzeit = höhere Rate, aber deutlich weniger Zinsen. Längere Laufzeit = niedrigere Rate, aber mehr Gesamtkosten.
      </p>
    </div>
  );
}
