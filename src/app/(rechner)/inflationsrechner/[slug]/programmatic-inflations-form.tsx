'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { NumberInput } from '@/components/ui/number-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateInflation, type InflationResult } from '@/lib/calculator/math/inflation';
import { formatCurrency } from '@/lib/utils/format';

interface Props { betrag: number; jahre: number; rate: number; }

export function ProgrammaticInflationsForm({ betrag: initB, jahre: initJ, rate: initR }: Props) {
  const [betrag, setBetrag] = useState(initB);
  const [rate, setRate] = useState(initR);
  const [jahre, setJahre] = useState(initJ);

  const result = useMemo<InflationResult | null>(() => {
    if (betrag <= 0 || rate < 0 || jahre <= 0) return null;
    return calculateInflation({ betrag, inflationsrate: rate, jahre });
  }, [betrag, rate, jahre]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Betrag" htmlFor="b"><CurrencyInput id="b" value={betrag} onChange={setBetrag} /></InputGroup>
          <InputGroup label="Inflationsrate" htmlFor="r"><NumberInput id="r" value={rate} onChange={setRate} suffix="%" step={0.1} /></InputGroup>
          <InputGroup label="Zeitraum" htmlFor="j"><NumberInput id="j" value={jahre} onChange={setJahre} suffix="Jahre" /></InputGroup>
        </div>
      </Card>
      <div className="lg:col-span-3 space-y-4">
        {result && (
          <div className="animate-result-in space-y-4">
            <Card padding="lg" className="border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10 text-center">
              <p className="text-sm text-text-secondary">Kaufkraft nach {jahre} Jahren</p>
              <p className="text-2xl sm:text-3xl font-bold font-currency text-accent-600 dark:text-accent-400">{formatCurrency(result.kaufkraft)}</p>
              <p className="text-sm text-text-muted">von heute {formatCurrency(betrag)}</p>
            </Card>
            <Card padding="md" className="text-center">
              <p className="text-sm text-text-muted">Kaufkraftverlust</p>
              <p className="text-xl font-bold font-currency text-negative-500">{formatCurrency(result.wertverlust)}</p>
              <p className="text-sm text-text-muted">{result.wertverlustProzent.toFixed(1)}% weniger Kaufkraft</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
