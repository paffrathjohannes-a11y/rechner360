'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { Button } from '@/components/ui/button';
import { calculateKredit } from '@/lib/calculator/credit/annuity';
import { formatCurrency } from '@/lib/utils/format';
import type { KreditResult } from '@/types/calculator';
import { cn } from '@/lib/utils/cn';
import { GitCompareArrows, X, ArrowDown, ArrowUp } from 'lucide-react';

interface MiniFormProps {
  label: string;
  color: string;
  defaultBetrag: number;
  defaultZins: number;
  defaultLaufzeit: number;
  onResult: (r: KreditResult | null) => void;
}

function MiniKreditForm({ label, color, defaultBetrag, defaultZins, defaultLaufzeit, onResult }: MiniFormProps) {
  const [betrag, setBetrag] = useState(defaultBetrag);
  const [zins, setZins] = useState(defaultZins);
  const [laufzeit, setLaufzeit] = useState(defaultLaufzeit);

  const result = betrag > 0 && laufzeit > 0
    ? calculateKredit({ darlehensbetrag: betrag, zinssatz: zins, laufzeit_monate: laufzeit })
    : null;

  useEffect(() => { onResult(result); }, [betrag, zins, laufzeit]);

  return (
    <Card padding="md" className={cn('space-y-3', color === 'primary' ? 'border-primary-500/20' : 'border-accent-500/20')}>
      <p className={cn('text-sm font-semibold', color === 'primary' ? 'text-primary-500' : 'text-accent-500')}>{label}</p>
      <InputGroup label="Betrag" htmlFor={`${label}-b`}>
        <CurrencyInput id={`${label}-b`} value={betrag} onChange={setBetrag} placeholder="20.000" />
      </InputGroup>
      <div className="grid grid-cols-2 gap-3">
        <InputGroup label="Zinssatz" htmlFor={`${label}-z`}>
          <Select id={`${label}-z`} value={zins} onChange={(e) => setZins(Number(e.target.value))}>
            {[2.0, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 7.0, 8.0, 10.0].map((v) => (
              <option key={v} value={v}>{v.toFixed(1).replace('.', ',')}%</option>
            ))}
          </Select>
        </InputGroup>
        <InputGroup label="Laufzeit" htmlFor={`${label}-l`}>
          <Select id={`${label}-l`} value={laufzeit} onChange={(e) => setLaufzeit(Number(e.target.value))}>
            {[12, 24, 36, 48, 60, 72, 84, 96, 120].map((m) => (
              <option key={m} value={m}>{m / 12} J.</option>
            ))}
          </Select>
        </InputGroup>
      </div>
      {result && (
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
          <div className="text-center">
            <p className="text-xs text-text-muted">Rate</p>
            <p className={cn('text-sm font-bold font-currency', color === 'primary' ? 'text-primary-500' : 'text-accent-500')}>
              {formatCurrency(result.monatliche_rate)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-text-muted">Zinsen</p>
            <p className="text-sm font-bold font-currency text-warning-500">{formatCurrency(result.gesamtzinsen)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-text-muted">Gesamt</p>
            <p className="text-sm font-bold font-currency text-text">{formatCurrency(result.gesamtkosten)}</p>
          </div>
        </div>
      )}
    </Card>
  );
}

export function KreditComparison() {
  const [show, setShow] = useState(false);
  const [resultA, setResultA] = useState<KreditResult | null>(null);
  const [resultB, setResultB] = useState<KreditResult | null>(null);

  if (!show) {
    return (
      <div className="flex justify-center">
        <Button variant="secondary" size="sm" onClick={() => setShow(true)} className="gap-2">
          <GitCompareArrows className="w-4 h-4" />
          Szenario vergleichen
        </Button>
      </div>
    );
  }

  const diff = resultA && resultB ? {
    rate: resultB.monatliche_rate - resultA.monatliche_rate,
    zinsen: resultB.gesamtzinsen - resultA.gesamtzinsen,
    gesamt: resultB.gesamtkosten - resultA.gesamtkosten,
  } : null;

  return (
    <Card padding="lg" className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text flex items-center gap-2">
          <GitCompareArrows className="w-5 h-5 text-accent-500" />
          Szenarien vergleichen
        </h3>
        <Button variant="ghost" size="sm" onClick={() => setShow(false)}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MiniKreditForm
          label="Szenario A"
          color="primary"
          defaultBetrag={20000}
          defaultZins={5.5}
          defaultLaufzeit={60}
          onResult={setResultA}
        />
        <MiniKreditForm
          label="Szenario B"
          color="accent"
          defaultBetrag={20000}
          defaultZins={3.5}
          defaultLaufzeit={36}
          onResult={setResultB}
        />
      </div>

      {/* Differenz-Anzeige */}
      {diff && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Rate', value: diff.rate },
            { label: 'Zinsen', value: diff.zinsen },
            { label: 'Gesamtkosten', value: diff.gesamt },
          ].map((item) => (
            <div key={item.label} className="text-center rounded-lg bg-surface-sunken p-3">
              <p className="text-xs text-text-muted">Δ {item.label}</p>
              <p className={cn(
                'text-lg font-bold font-currency mt-1',
                item.value < 0 ? 'text-accent-500' : item.value > 0 ? 'text-warning-500' : 'text-text-muted',
              )}>
                {item.value < 0 && <ArrowDown className="w-3.5 h-3.5 inline mr-1" />}
                {item.value > 0 && <ArrowUp className="w-3.5 h-3.5 inline mr-1" />}
                {item.value > 0 ? '+' : ''}{formatCurrency(item.value)}
              </p>
              {item.value < 0 && <p className="text-xs text-accent-500 mt-0.5">B günstiger</p>}
              {item.value > 0 && <p className="text-xs text-warning-500 mt-0.5">A günstiger</p>}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
