'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { nettoZuBrutto, bruttoZuNetto, type MwstResult } from '@/lib/calculator/math/mwst';
import { formatCurrency } from '@/lib/utils/format';

interface Props { betrag: number; }

export function ProgrammaticMwstForm({ betrag: initB }: Props) {
  const [betrag, setBetrag] = useState(initB);
  const [r19, setR19] = useState<MwstResult | null>(null);
  const [r7, setR7] = useState<MwstResult | null>(null);

  useEffect(() => {
    if (betrag <= 0) { setR19(null); setR7(null); return; }
    setR19(bruttoZuNetto(betrag, 19));
    setR7(bruttoZuNetto(betrag, 7));
  }, [betrag]);

  return (
    <div className="space-y-6">
      <Card padding="lg">
        <InputGroup label="Bruttobetrag" htmlFor="b">
          <CurrencyInput id="b" value={betrag} onChange={setBetrag} />
        </InputGroup>
      </Card>
      {r19 && r7 && (
        <div className="animate-result-in space-y-4">
          <Card padding="none">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-border bg-surface-sunken"><th className="px-3 py-2 text-left text-text-secondary font-medium">Steuersatz</th><th className="px-3 py-2 text-right text-text-secondary font-medium">Netto</th><th className="px-3 py-2 text-right text-text-secondary font-medium">MwSt</th><th className="px-3 py-2 text-right text-text-secondary font-medium">Brutto</th></tr></thead>
              <tbody>
                <tr className="border-b border-border"><td className="px-3 py-2 text-text font-medium">19%</td><td className="px-3 py-2 text-right font-currency text-text">{formatCurrency(r19.netto)}</td><td className="px-3 py-2 text-right font-currency text-primary-500">{formatCurrency(r19.mwst)}</td><td className="px-3 py-2 text-right font-currency font-bold text-text">{formatCurrency(r19.brutto)}</td></tr>
                <tr><td className="px-3 py-2 text-text font-medium">7%</td><td className="px-3 py-2 text-right font-currency text-text">{formatCurrency(r7.netto)}</td><td className="px-3 py-2 text-right font-currency text-primary-500">{formatCurrency(r7.mwst)}</td><td className="px-3 py-2 text-right font-currency font-bold text-text">{formatCurrency(r7.brutto)}</td></tr>
              </tbody>
            </table>
          </Card>
        </div>
      )}
    </div>
  );
}
