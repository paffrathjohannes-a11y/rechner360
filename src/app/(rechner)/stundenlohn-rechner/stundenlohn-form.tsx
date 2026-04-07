'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateStundenlohn, type StundenlohnResult } from '@/lib/calculator/math/stundenlohn';
import { formatCurrency } from '@/lib/utils/format';

export function StundenlohnForm() {
  const [betrag, setBetrag] = useState(3000);
  const [einheit, setEinheit] = useState<'stunde' | 'monat' | 'jahr'>('monat');
  const [stunden, setStunden] = useState(40);
  const [result, setResult] = useState<StundenlohnResult | null>(null);

  useEffect(() => {
    if (betrag <= 0) { setResult(null); return; }
    setResult(calculateStundenlohn(betrag, einheit, stunden));
  }, [betrag, einheit, stunden]);

  return (
    <div className="space-y-6">
      <Card padding="lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <InputGroup label="Betrag (brutto)" htmlFor="betrag">
            <CurrencyInput id="betrag" value={betrag} onChange={setBetrag} />
          </InputGroup>
          <InputGroup label="Eingabe als" htmlFor="einheit">
            <Select id="einheit" value={einheit} onChange={(e) => setEinheit(e.target.value as typeof einheit)}>
              <option value="stunde">Stundenlohn</option>
              <option value="monat">Monatsgehalt</option>
              <option value="jahr">Jahresgehalt</option>
            </Select>
          </InputGroup>
          <InputGroup label="Wochenstunden" htmlFor="stunden">
            <Select id="stunden" value={stunden} onChange={(e) => setStunden(Number(e.target.value))}>
              {[20, 25, 30, 35, 38.5, 40, 42, 45, 48].map((v) => (
                <option key={v} value={v}>{v}h / Woche</option>
              ))}
            </Select>
          </InputGroup>
        </div>
      </Card>

      {result && (
        <div className="animate-result-in grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card padding="md" className="text-center border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10">
            <p className="text-xs text-text-muted">Stundenlohn</p>
            <p className="text-xl font-bold font-currency text-accent-600 dark:text-accent-400 mt-1">{formatCurrency(result.stundenlohn)}</p>
          </Card>
          <Card padding="md" className="text-center">
            <p className="text-xs text-text-muted">Pro Tag</p>
            <p className="text-xl font-bold font-currency text-text mt-1">{formatCurrency(result.tagesgehalt)}</p>
          </Card>
          <Card padding="md" className="text-center">
            <p className="text-xs text-text-muted">Pro Woche</p>
            <p className="text-xl font-bold font-currency text-text mt-1">{formatCurrency(result.wochengehalt)}</p>
          </Card>
          <Card padding="md" className="text-center">
            <p className="text-xs text-text-muted">Pro Monat</p>
            <p className="text-xl font-bold font-currency text-primary-500 mt-1">{formatCurrency(result.monatsgehalt)}</p>
          </Card>
          <Card padding="md" className="text-center">
            <p className="text-xs text-text-muted">Pro Jahr</p>
            <p className="text-xl font-bold font-currency text-text mt-1">{formatCurrency(result.jahresgehalt)}</p>
          </Card>
        </div>
      )}
    </div>
  );
}
