'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { NumberInput } from '@/components/ui/number-input';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateRente, type RenteResult } from '@/lib/calculator/social/rente';
import { formatCurrency } from '@/lib/utils/format';

interface Props { jahresbrutto: number; }

export function ProgrammaticRentenForm({ jahresbrutto: initB }: Props) {
  const [brutto, setBrutto] = useState(initB);
  const [alter, setAlter] = useState(35);
  const [berufsjahre, setBerufsjahre] = useState(15);
  const [result, setResult] = useState<RenteResult | null>(null);

  useEffect(() => {
    if (brutto <= 0) { setResult(null); return; }
    setResult(calculateRente({ aktuellesBrutto: brutto, alter, berufsjahre, renteneintrittsalter: 67, gehaltsSteigerung: 2 }));
  }, [brutto, alter, berufsjahre]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
          <InputGroup label="Jahresbrutto" htmlFor="b"><CurrencyInput id="b" value={brutto} onChange={setBrutto} /></InputGroup>
          <InputGroup label="Aktuelles Alter" htmlFor="a"><NumberInput id="a" min={18} max={66} value={alter} onChange={setAlter} /></InputGroup>
          <InputGroup label="Bisherige Berufsjahre" htmlFor="bj"><NumberInput id="bj" min={0} max={50} value={berufsjahre} onChange={setBerufsjahre} /></InputGroup>
        </div>
      </Card>
      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-4">
            <Card padding="lg" className="border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10 text-center">
              <p className="text-sm text-text-secondary">Voraussichtliche Monatsrente</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-accent-600 dark:text-accent-400">{formatCurrency(result.monatsrente)}</p>
              <p className="text-sm text-text-muted">{result.entgeltpunkteGesamt} Entgeltpunkte · Renteneintritt mit 67</p>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card padding="md" className="text-center"><p className="text-sm text-text-muted">Jahresrente</p><p className="text-xl font-bold font-currency text-text mt-1">{formatCurrency(result.jahresrente)}</p></Card>
              <Card padding="md" className="text-center border-negative-200 dark:border-negative-800 bg-negative-50/30 dark:bg-negative-900/10"><p className="text-sm text-text-muted">Rentenlücke/Monat</p><p className="text-xl font-bold font-currency text-negative-500 mt-1">{formatCurrency(result.rentenluecke)}</p></Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
