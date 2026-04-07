'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculatePfaendung, type PfaendungResult } from '@/lib/calculator/social/pfaendung';
import { formatCurrency } from '@/lib/utils/format';

interface Props { netto: number; }

export function ProgrammaticPfaendungsForm({ netto: initN }: Props) {
  const [netto, setNetto] = useState(initN);
  const [unterhalt, setUnterhalt] = useState(0);
  const [result, setResult] = useState<PfaendungResult | null>(null);

  useEffect(() => {
    if (netto <= 0) { setResult(null); return; }
    setResult(calculatePfaendung({ nettoEinkommen: netto, unterhaltspflichten: unterhalt }));
  }, [netto, unterhalt]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
          <InputGroup label="Nettoeinkommen" htmlFor="n"><CurrencyInput id="n" value={netto} onChange={setNetto} /></InputGroup>
          <InputGroup label="Unterhaltspflichtige Personen" htmlFor="u">
            <Select id="u" value={unterhalt} onChange={(e) => setUnterhalt(Number(e.target.value))}>
              {[0, 1, 2, 3, 4, 5].map((v) => (<option key={v} value={v}>{v}</option>))}
            </Select>
          </InputGroup>
        </div>
      </Card>
      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card padding="md" className="text-center"><p className="text-sm text-text-muted">Freigrenze</p><p className="text-xl font-bold font-currency text-accent-500 mt-1">{formatCurrency(result.pfaendungsfreigrenze)}</p></Card>
              <Card padding="md" className="text-center"><p className="text-sm text-text-muted">Pfändbar</p><p className="text-xl font-bold font-currency text-negative-500 mt-1">{formatCurrency(result.pfaendbarerBetrag)}</p></Card>
              <Card padding="md" className="text-center"><p className="text-sm text-text-muted">Verbleibend</p><p className="text-xl font-bold font-currency text-text mt-1">{formatCurrency(result.verbleibendesBetrag)}</p></Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
