'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { ResultsChart } from '@/components/calculator/results-chart';
import { calculateKredit } from '@/lib/calculator/credit/annuity';
import { formatCurrency } from '@/lib/utils/format';
import type { KreditResult, ChartSegment } from '@/types/calculator';

interface Props {
  betrag: number;
  zinssatz: number;
}

export function ProgrammaticKreditForm({ betrag: initialBetrag, zinssatz: initialZins }: Props) {
  const [betrag, setBetrag] = useState(initialBetrag);
  const [zinssatz, setZinssatz] = useState(initialZins);
  const [laufzeit, setLaufzeit] = useState(60);
  const [result, setResult] = useState<KreditResult | null>(null);

  useEffect(() => {
    if (betrag <= 0) { setResult(null); return; }
    setResult(calculateKredit({ darlehensbetrag: betrag, zinssatz, laufzeit_monate: laufzeit }));
  }, [betrag, zinssatz, laufzeit]);

  const chartSegments: ChartSegment[] = result
    ? [
        { label: 'Tilgung', value: betrag, color: 'var(--color-accent-500)', percentage: (betrag / result.gesamtkosten) * 100 },
        { label: 'Zinsen', value: result.gesamtzinsen, color: 'var(--color-warning-500)', percentage: (result.gesamtzinsen / result.gesamtkosten) * 100 },
      ]
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
          <InputGroup label="Darlehensbetrag" htmlFor="betrag">
            <CurrencyInput id="betrag" value={betrag} onChange={setBetrag} />
          </InputGroup>
          <InputGroup label="Zinssatz (% p.a.)" htmlFor="zins">
            <Select id="zins" value={zinssatz} onChange={(e) => setZinssatz(Number(e.target.value))}>
              {[2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 8.0, 9.0, 10.0].map((v) => (
                <option key={v} value={v}>{v.toFixed(1).replace('.', ',')} %</option>
              ))}
            </Select>
          </InputGroup>
          <InputGroup label="Laufzeit" htmlFor="laufzeit">
            <Select id="laufzeit" value={laufzeit} onChange={(e) => setLaufzeit(Number(e.target.value))}>
              {[12, 24, 36, 48, 60, 72, 84, 96, 108, 120].map((m) => (
                <option key={m} value={m}>{m} Monate ({m / 12} Jahre)</option>
              ))}
            </Select>
          </InputGroup>
          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>
      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card padding="md" className="text-center">
                <p className="text-xs text-text-muted">Monatliche Rate</p>
                <p className="text-2xl font-bold font-currency text-accent-500 mt-1">{formatCurrency(result.monatliche_rate)}</p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-xs text-text-muted">Gesamtzinsen</p>
                <p className="text-2xl font-bold font-currency text-warning-500 mt-1">{formatCurrency(result.gesamtzinsen)}</p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-xs text-text-muted">Gesamtkosten</p>
                <p className="text-2xl font-bold font-currency text-text mt-1">{formatCurrency(result.gesamtkosten)}</p>
              </Card>
            </div>
            <Card padding="lg">
              <ResultsChart segments={chartSegments} centerLabel="Gesamtkosten" centerValue={formatCurrency(result.gesamtkosten)} size={180} />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
