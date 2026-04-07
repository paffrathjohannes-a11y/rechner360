'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateAbfindung, type AbfindungResult } from '@/lib/calculator/tax/abfindung';
import { STEUERKLASSEN } from '@/lib/utils/constants';
import { formatCurrency } from '@/lib/utils/format';

interface Props { abfindung: number; }

export function ProgrammaticAbfindungsForm({ abfindung: initA }: Props) {
  const [jahresbrutto, setJahresbrutto] = useState(45000);
  const [abfindung, setAbfindung] = useState(initA);
  const [steuerklasse, setSteuerklasse] = useState<1|2|3|4|5|6>(1);
  const [result, setResult] = useState<AbfindungResult | null>(null);

  useEffect(() => {
    if (jahresbrutto <= 0 || abfindung <= 0) { setResult(null); return; }
    setResult(calculateAbfindung({ jahresbrutto, abfindung, steuerklasse, kirchensteuer: false, kirchensteuerSatz: 0.09 }));
  }, [jahresbrutto, abfindung, steuerklasse]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Jahresbrutto (ohne Abfindung)" htmlFor="b"><CurrencyInput id="b" value={jahresbrutto} onChange={setJahresbrutto} /></InputGroup>
          <InputGroup label="Abfindung (brutto)" htmlFor="a"><CurrencyInput id="a" value={abfindung} onChange={setAbfindung} /></InputGroup>
          <InputGroup label="Steuerklasse" htmlFor="sk">
            <Select id="sk" value={steuerklasse} onChange={(e) => setSteuerklasse(Number(e.target.value) as typeof steuerklasse)}>
              {STEUERKLASSEN.map((sk) => (<option key={sk.id} value={sk.id}>{sk.name}</option>))}
            </Select>
          </InputGroup>
        </div>
      </Card>
      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-4">
            <Card padding="lg" className="border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10 text-center">
              <p className="text-sm text-text-secondary">Netto-Abfindung</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-accent-600 dark:text-accent-400">{formatCurrency(result.nettoAbfindung)}</p>
              <p className="text-sm text-text-muted">Steuersatz: {(result.effektiverSteuersatzAbfindung * 100).toFixed(1)}%</p>
            </Card>
            {result.ersparnisDurchFuenftel > 0 && (
              <Card padding="md" className="bg-accent-50/20 dark:bg-accent-900/5 text-center">
                <p className="text-sm text-accent-600 font-semibold">Ersparnis durch Fünftelregelung: {formatCurrency(result.ersparnisDurchFuenftel)}</p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
