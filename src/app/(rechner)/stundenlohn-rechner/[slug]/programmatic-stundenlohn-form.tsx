'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateStundenlohn, type StundenlohnResult } from '@/lib/calculator/math/stundenlohn';
import { formatCurrency } from '@/lib/utils/format';

interface Props { stundenlohn: number; }

export function ProgrammaticStundenlohnForm({ stundenlohn: initSl }: Props) {
  const [betrag, setBetrag] = useState(initSl);
  const [stunden, setStunden] = useState(40);
  const [result, setResult] = useState<StundenlohnResult | null>(null);

  useEffect(() => {
    if (betrag <= 0) { setResult(null); return; }
    setResult(calculateStundenlohn(betrag, 'stunde', stunden));
  }, [betrag, stunden]);

  return (
    <div className="space-y-6">
      <Card padding="lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <InputGroup label="Stundenlohn (brutto)" htmlFor="sl">
            <CurrencyInput id="sl" value={betrag} onChange={setBetrag} />
          </InputGroup>
          <InputGroup label="Wochenstunden" htmlFor="wh">
            <Select id="wh" value={stunden} onChange={(e) => setStunden(Number(e.target.value))}>
              {[20, 30, 35, 38.5, 40, 42, 45].map((v) => (<option key={v} value={v}>{v}h</option>))}
            </Select>
          </InputGroup>
        </div>
      </Card>
      {result && (
        <div className="animate-result-in grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card padding="md" className="text-center"><p className="text-sm text-text-muted">Tag</p><p className="text-xl font-bold font-currency text-text mt-1">{formatCurrency(result.tagesgehalt)}</p></Card>
          <Card padding="md" className="text-center"><p className="text-sm text-text-muted">Woche</p><p className="text-xl font-bold font-currency text-text mt-1">{formatCurrency(result.wochengehalt)}</p></Card>
          <Card padding="md" className="text-center border-primary-200 dark:border-primary-800 bg-primary-50/30 dark:bg-primary-900/10"><p className="text-sm text-text-muted">Monat</p><p className="text-xl font-bold font-currency text-primary-600 dark:text-primary-400 mt-1">{formatCurrency(result.monatsgehalt)}</p></Card>
          <Card padding="md" className="text-center"><p className="text-sm text-text-muted">Jahr</p><p className="text-xl font-bold font-currency text-text mt-1">{formatCurrency(result.jahresgehalt)}</p></Card>
        </div>
      )}
    </div>
  );
}
