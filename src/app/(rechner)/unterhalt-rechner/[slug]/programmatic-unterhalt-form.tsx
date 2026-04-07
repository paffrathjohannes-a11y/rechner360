'use client';

import { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateUnterhalt, type UnterhaltResult } from '@/lib/calculator/social/unterhalt';
import { formatCurrency } from '@/lib/utils/format';

interface Props { netto: number; }

export function ProgrammaticUnterhaltForm({ netto: initNetto }: Props) {
  const [netto, setNetto] = useState(initNetto);
  const [kinderAlter, setKinderAlter] = useState([6]);
  const [result, setResult] = useState<UnterhaltResult | null>(null);

  useEffect(() => {
    if (netto <= 0) { setResult(null); return; }
    setResult(calculateUnterhalt({ nettoEinkommen: netto, kinderAnzahl: kinderAlter.length, kinderAlter, kindergeldAnrechnung: true }));
  }, [netto, kinderAlter]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
          <InputGroup label="Nettoeinkommen" htmlFor="netto">
            <CurrencyInput id="netto" value={netto} onChange={setNetto} />
          </InputGroup>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text">Kinder ({kinderAlter.length})</span>
              <Button variant="ghost" size="sm" onClick={() => setKinderAlter([...kinderAlter, 6])}><Plus className="h-3.5 w-3.5 mr-1" /> Kind</Button>
            </div>
            {kinderAlter.map((alter, i) => (
              <div key={i} className="flex items-center gap-2">
                <Input type="number" min={0} max={25} value={alter} onChange={(e) => { const a = [...kinderAlter]; a[i] = Number(e.target.value); setKinderAlter(a); }} className="flex-1" />
                <span className="text-xs text-text-muted">Jahre</span>
                {kinderAlter.length > 1 && <button type="button" onClick={() => setKinderAlter(kinderAlter.filter((_, idx) => idx !== i))} className="p-2 text-text-muted hover:text-negative-500 cursor-pointer"><Minus className="h-4 w-4" /></button>}
              </div>
            ))}
          </div>
        </div>
      </Card>
      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-4">
            <Card padding="lg" className="border-primary-200 dark:border-primary-800 bg-primary-50/30 dark:bg-primary-900/10 text-center">
              <p className="text-sm text-text-secondary">Gesamter Zahlbetrag</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-primary-600 dark:text-primary-400">{formatCurrency(result.gesamtUnterhalt)}</p>
              <p className="text-sm text-text-muted">monatlich · Gruppe {result.einkommensgruppe}</p>
            </Card>
            <Card padding="none">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-border bg-surface-sunken"><th className="px-3 py-2 text-left text-text-secondary font-medium">Kind</th><th className="px-3 py-2 text-right text-text-secondary font-medium">Alter</th><th className="px-3 py-2 text-right text-text-secondary font-medium">Zahlbetrag</th></tr></thead>
                <tbody>
                  {kinderAlter.map((alter, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0"><td className="px-3 py-2 text-text">Kind {i+1}</td><td className="px-3 py-2 text-right text-text-secondary">{alter} J.</td><td className="px-3 py-2 text-right font-currency font-bold text-primary-600">{formatCurrency(result.zahlbetrag[i])}</td></tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
