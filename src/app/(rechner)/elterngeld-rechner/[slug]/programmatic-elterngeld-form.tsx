'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateElterngeld, type ElterngeldResult } from '@/lib/calculator/social/elterngeld';
import { formatCurrency } from '@/lib/utils/format';

interface Props { netto: number; }

export function ProgrammaticElterngeldForm({ netto: initNetto }: Props) {
  const [netto, setNetto] = useState(initNetto);
  const [art, setArt] = useState<'basis' | 'plus'>('basis');
  const [result, setResult] = useState<ElterngeldResult | null>(null);

  useEffect(() => {
    setResult(calculateElterngeld({ nettoEinkommen: netto, arbeitsstundenNachGeburt: 0, elterngeldArt: art, zwillinge: false, geschwisterbonus: false }));
  }, [netto, art]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
          <InputGroup label="Nettoeinkommen" htmlFor="netto">
            <CurrencyInput id="netto" value={netto} onChange={setNetto} />
          </InputGroup>
          <InputGroup label="Elterngeld-Art" htmlFor="art">
            <Select id="art" value={art} onChange={(e) => setArt(e.target.value as 'basis' | 'plus')}>
              <option value="basis">Basiselterngeld (12 Monate)</option>
              <option value="plus">ElterngeldPlus (24 Monate)</option>
            </Select>
          </InputGroup>
        </div>
      </Card>
      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-4">
            <Card padding="lg" className="border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10">
              <div className="text-center space-y-1">
                <p className="text-sm text-text-secondary">Monatliches Elterngeld</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-accent-600 dark:text-accent-400">{formatCurrency(result.monatlich)}</p>
                <p className="text-sm text-text-muted">{result.laufzeitMonate} Monate &middot; Gesamt: {formatCurrency(result.gesamt)}</p>
              </div>
            </Card>
            <div className="grid grid-cols-2 gap-4">
              <Card padding="md" className="text-center">
                <p className="text-xs text-text-muted">Ersatzrate</p>
                <p className="text-2xl font-bold text-primary-500 mt-1">{(result.ersatzrate * 100).toFixed(0)}%</p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-xs text-text-muted">Gesamt</p>
                <p className="text-2xl font-bold font-currency text-text mt-1">{formatCurrency(result.gesamt)}</p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
