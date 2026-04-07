'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { ResultsChart } from '@/components/calculator/results-chart';
import { calculateZinseszins, type ZinseszinsResult } from '@/lib/calculator/math/zinseszins';
import { formatCurrency } from '@/lib/utils/format';
import type { ChartSegment } from '@/types/calculator';
import { cn } from '@/lib/utils/cn';

export function ZinseszinsForm() {
  const [startkapital, setStartkapital] = useState(10000);
  const [sparrate, setSparrate] = useState(200);
  const [zinssatz, setZinssatz] = useState(5);
  const [laufzeit, setLaufzeit] = useState(10);
  const [result, setResult] = useState<ZinseszinsResult | null>(null);

  useEffect(() => {
    if (laufzeit <= 0) { setResult(null); return; }
    setResult(calculateZinseszins({ startkapital, monatlicheSparrate: sparrate, zinssatz, laufzeit }));
  }, [startkapital, sparrate, zinssatz, laufzeit]);

  const chartSegments: ChartSegment[] = result ? [
    { label: 'Eingezahlt', value: result.eingezahlt, color: 'var(--color-primary-500)', percentage: (result.eingezahlt / result.endkapital) * 100 },
    { label: 'Zinsen', value: result.zinsen, color: 'var(--color-accent-500)', percentage: (result.zinsen / result.endkapital) * 100 },
  ] : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
          <InputGroup label="Startkapital" htmlFor="start">
            <CurrencyInput id="start" value={startkapital} onChange={setStartkapital} placeholder="z.B. 10.000" />
          </InputGroup>
          <InputGroup label="Monatliche Sparrate" htmlFor="sparrate">
            <CurrencyInput id="sparrate" value={sparrate} onChange={setSparrate} placeholder="z.B. 200" />
          </InputGroup>
          <InputGroup label="Zinssatz / Rendite (% p.a.)" htmlFor="zins" tooltip="Erwartete jährliche Rendite. Aktien-ETFs langfristig ca. 7%, Tagesgeld ca. 2%.">
            <Select id="zins" value={zinssatz} onChange={(e) => setZinssatz(Number(e.target.value))}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15].map((v) => (
                <option key={v} value={v}>{v} %</option>
              ))}
            </Select>
          </InputGroup>
          <InputGroup label="Laufzeit" htmlFor="laufzeit">
            <Select id="laufzeit" value={laufzeit} onChange={(e) => setLaufzeit(Number(e.target.value))}>
              {[1, 2, 3, 5, 7, 10, 15, 20, 25, 30, 40].map((v) => (
                <option key={v} value={v}>{v} Jahre</option>
              ))}
            </Select>
          </InputGroup>
          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-6">
            <Card padding="lg" className="border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10 text-center">
              <p className="text-sm text-text-secondary">Endkapital nach {laufzeit} Jahren</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-accent-600 dark:text-accent-400">{formatCurrency(result.endkapital)}</p>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Eingezahlt</p>
                <p className="text-xl font-bold font-currency text-primary-500 mt-1">{formatCurrency(result.eingezahlt)}</p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Zinsen / Rendite</p>
                <p className="text-xl font-bold font-currency text-accent-500 mt-1">{formatCurrency(result.zinsen)}</p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Rendite gesamt</p>
                <p className="text-xl font-bold text-text mt-1">+{result.renditeGesamt}%</p>
              </Card>
            </div>

            <Card padding="lg">
              <ResultsChart segments={chartSegments} centerLabel="Endkapital" centerValue={formatCurrency(result.endkapital)} size={180} />
            </Card>

            {/* Jahres-Tabelle */}
            <Card padding="none">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface-sunken">
                      <th className="px-3 py-2 text-left text-text-secondary font-medium">Jahr</th>
                      <th className="px-3 py-2 text-right text-text-secondary font-medium">Eingezahlt</th>
                      <th className="px-3 py-2 text-right text-text-secondary font-medium">Zinsen</th>
                      <th className="px-3 py-2 text-right text-text-secondary font-medium">Gesamt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.jahresEntwicklung.filter((_, i) => {
                      if (laufzeit <= 10) return true;
                      if (laufzeit <= 20) return (i + 1) % 2 === 0 || i === 0;
                      return (i + 1) % 5 === 0 || i === 0;
                    }).map((z) => (
                      <tr key={z.jahr} className="border-b border-border last:border-b-0 hover:bg-surface-raised transition-colors">
                        <td className="px-3 py-2 text-text">{z.jahr}</td>
                        <td className="px-3 py-2 text-right font-currency text-primary-500">{formatCurrency(z.eingezahlt)}</td>
                        <td className="px-3 py-2 text-right font-currency text-accent-500">{formatCurrency(z.zinsen)}</td>
                        <td className="px-3 py-2 text-right font-currency font-bold text-text">{formatCurrency(z.gesamt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
