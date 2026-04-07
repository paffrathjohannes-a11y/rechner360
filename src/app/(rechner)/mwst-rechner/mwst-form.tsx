'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { nettoZuBrutto, bruttoZuNetto, type MwstResult } from '@/lib/calculator/math/mwst';
import { formatCurrency } from '@/lib/utils/format';

export function MwstForm() {
  const [betrag, setBetrag] = useState(1000);
  const [richtung, setRichtung] = useState<'netto-zu-brutto' | 'brutto-zu-netto'>('netto-zu-brutto');
  const [steuersatz, setSteuersatz] = useState(19);
  const [result, setResult] = useState<MwstResult | null>(null);

  useEffect(() => {
    if (betrag <= 0) { setResult(null); return; }
    setResult(richtung === 'netto-zu-brutto' ? nettoZuBrutto(betrag, steuersatz) : bruttoZuNetto(betrag, steuersatz));
  }, [betrag, richtung, steuersatz]);

  return (
    <div className="space-y-6">
      <Card padding="lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <InputGroup label={richtung === 'netto-zu-brutto' ? 'Nettobetrag' : 'Bruttobetrag'} htmlFor="betrag">
            <CurrencyInput id="betrag" value={betrag} onChange={setBetrag} />
          </InputGroup>
          <InputGroup label="Richtung" htmlFor="richtung">
            <Select id="richtung" value={richtung} onChange={(e) => setRichtung(e.target.value as typeof richtung)}>
              <option value="netto-zu-brutto">Netto → Brutto</option>
              <option value="brutto-zu-netto">Brutto → Netto</option>
            </Select>
          </InputGroup>
          <InputGroup label="Steuersatz" htmlFor="satz">
            <Select id="satz" value={steuersatz} onChange={(e) => setSteuersatz(Number(e.target.value))}>
              <option value={19}>19% (Regelsatz)</option>
              <option value={7}>7% (ermäßigt)</option>
            </Select>
          </InputGroup>
        </div>
      </Card>

      {result && (
        <div className="animate-result-in">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card padding="lg" className="text-center">
              <p className="text-xs text-text-muted">Nettobetrag</p>
              <p className="text-2xl font-bold font-currency text-text mt-1">{formatCurrency(result.netto)}</p>
            </Card>
            <Card padding="lg" className="text-center border-primary-200 dark:border-primary-800 bg-primary-50/30 dark:bg-primary-900/10">
              <p className="text-xs text-text-muted">{steuersatz}% MwSt</p>
              <p className="text-2xl font-bold font-currency text-primary-600 dark:text-primary-400 mt-1">{formatCurrency(result.mwst)}</p>
            </Card>
            <Card padding="lg" className="text-center">
              <p className="text-xs text-text-muted">Bruttobetrag</p>
              <p className="text-2xl font-bold font-currency text-text mt-1">{formatCurrency(result.brutto)}</p>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
