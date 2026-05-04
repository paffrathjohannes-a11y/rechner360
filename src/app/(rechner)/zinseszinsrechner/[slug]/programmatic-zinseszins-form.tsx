'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateZinseszins, type ZinseszinsResult } from '@/lib/calculator/math/zinseszins';
import { formatCurrency } from '@/lib/utils/format';

interface Props { sparrate: number; }

export function ProgrammaticZinseszinsForm({ sparrate: initSr }: Props) {
  const [sparrate, setSparrate] = useState(initSr);
  const [zinssatz, setZinssatz] = useState(7);

  const result10 = useMemo<ZinseszinsResult | null>(
    () => (sparrate <= 0 ? null : calculateZinseszins({ startkapital: 0, monatlicheSparrate: sparrate, zinssatz, laufzeit: 10 })),
    [sparrate, zinssatz],
  );
  const result20 = useMemo<ZinseszinsResult | null>(
    () => (sparrate <= 0 ? null : calculateZinseszins({ startkapital: 0, monatlicheSparrate: sparrate, zinssatz, laufzeit: 20 })),
    [sparrate, zinssatz],
  );
  const result30 = useMemo<ZinseszinsResult | null>(
    () => (sparrate <= 0 ? null : calculateZinseszins({ startkapital: 0, monatlicheSparrate: sparrate, zinssatz, laufzeit: 30 })),
    [sparrate, zinssatz],
  );

  return (
    <div className="space-y-6">
      <Card padding="lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <InputGroup label="Monatliche Sparrate" htmlFor="sr">
            <CurrencyInput id="sr" value={sparrate} onChange={setSparrate} />
          </InputGroup>
          <InputGroup label="Rendite (% p.a.)" htmlFor="z">
            <Select id="z" value={zinssatz} onChange={(e) => setZinssatz(Number(e.target.value))}>
              {[3, 5, 7, 8, 10].map((v) => (<option key={v} value={v}>{v}%</option>))}
            </Select>
          </InputGroup>
        </div>
      </Card>
      {result10 && result20 && result30 && (
        <div className="animate-result-in">
          <Card padding="none">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border bg-surface-sunken"><th className="px-3 py-2 text-left text-text-secondary font-medium">Laufzeit</th><th className="px-3 py-2 text-right text-text-secondary font-medium">Eingezahlt</th><th className="px-3 py-2 text-right text-text-secondary font-medium">Zinsen</th><th className="px-3 py-2 text-right text-text-secondary font-medium">Endkapital</th></tr></thead>
              <tbody>
                <tr className="border-b border-border hover:bg-surface-raised"><td className="px-3 py-2 text-text">10 Jahre</td><td className="px-3 py-2 text-right font-currency text-text-secondary">{formatCurrency(result10.eingezahlt)}</td><td className="px-3 py-2 text-right font-currency text-accent-500">{formatCurrency(result10.zinsen)}</td><td className="px-3 py-2 text-right font-currency font-bold text-text">{formatCurrency(result10.endkapital)}</td></tr>
                <tr className="border-b border-border hover:bg-surface-raised"><td className="px-3 py-2 text-text">20 Jahre</td><td className="px-3 py-2 text-right font-currency text-text-secondary">{formatCurrency(result20.eingezahlt)}</td><td className="px-3 py-2 text-right font-currency text-accent-500">{formatCurrency(result20.zinsen)}</td><td className="px-3 py-2 text-right font-currency font-bold text-text">{formatCurrency(result20.endkapital)}</td></tr>
                <tr className="hover:bg-surface-raised bg-accent-50/20 dark:bg-accent-900/5"><td className="px-3 py-2 text-text font-medium">30 Jahre</td><td className="px-3 py-2 text-right font-currency text-text-secondary">{formatCurrency(result30.eingezahlt)}</td><td className="px-3 py-2 text-right font-currency text-accent-500 font-medium">{formatCurrency(result30.zinsen)}</td><td className="px-3 py-2 text-right font-currency font-bold text-accent-600">{formatCurrency(result30.endkapital)}</td></tr>
              </tbody>
            </table>
          </Card>
        </div>
      )}
    </div>
  );
}
