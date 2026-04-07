'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateInflation, type InflationResult } from '@/lib/calculator/math/inflation';
import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

export function InflationsForm() {
  const [betrag, setBetrag] = useState(10000);
  const [rate, setRate] = useState(3);
  const [jahre, setJahre] = useState(10);
  const [result, setResult] = useState<InflationResult | null>(null);

  useEffect(() => {
    if (betrag <= 0 || rate < 0 || jahre <= 0) { setResult(null); return; }
    setResult(calculateInflation({ betrag, inflationsrate: rate, jahre }));
  }, [betrag, rate, jahre]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
          <InputGroup label="Betrag" htmlFor="betrag">
            <CurrencyInput id="betrag" value={betrag} onChange={setBetrag} placeholder="z.B. 10.000" />
          </InputGroup>
          <InputGroup label="Inflationsrate (% p.a.)" htmlFor="rate" tooltip="Durchschnittliche jährliche Inflationsrate. Langfristiger Durchschnitt in Deutschland: ca. 2-3%.">
            <Select id="rate" value={rate} onChange={(e) => setRate(Number(e.target.value))}>
              {[1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 10].map((v) => (
                <option key={v} value={v}>{typeof v === 'number' && v % 1 !== 0 ? v.toFixed(1).replace('.', ',') : v} %</option>
              ))}
            </Select>
          </InputGroup>
          <InputGroup label="Zeitraum (Jahre)" htmlFor="jahre">
            <Select id="jahre" value={jahre} onChange={(e) => setJahre(Number(e.target.value))}>
              {[1, 2, 3, 5, 7, 10, 15, 20, 25, 30].map((v) => (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card padding="md" className="text-center border-negative-200 dark:border-negative-800 bg-negative-50/30 dark:bg-negative-900/10">
                <p className="text-sm text-text-muted">Kaufkraft in {jahre} Jahren</p>
                <p className="text-2xl font-bold font-currency text-negative-600 dark:text-negative-400 mt-1">{formatCurrency(result.kaufkraft)}</p>
                <p className="text-sm text-text-muted">von heute {formatCurrency(betrag)}</p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Wertverlust</p>
                <p className="text-2xl font-bold font-currency text-warning-500 mt-1">-{formatCurrency(result.wertverlust)}</p>
                <p className="text-sm text-text-muted">({result.wertverlustProzent}%)</p>
              </Card>
            </div>

            <Card padding="md" className="bg-surface-raised">
              <p className="text-sm text-text-secondary">
                Um in {jahre} Jahren die gleiche Kaufkraft wie heute {formatCurrency(betrag)} zu haben,
                benötigen Sie dann <span className="font-currency font-bold text-text">{formatCurrency(result.benoetigtFuerGleicheKaufkraft)}</span>.
              </p>
            </Card>

            {/* Jahres-Tabelle */}
            <Card padding="none">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface-sunken">
                      <th className="px-4 py-2 text-left text-text-secondary font-medium">Jahr</th>
                      <th className="px-4 py-2 text-right text-text-secondary font-medium">Kaufkraft</th>
                      <th className="px-4 py-2 text-right text-text-secondary font-medium">Benötigter Betrag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.jahresEntwicklung.filter((_, i) => {
                      // Bei vielen Jahren nur Meilensteine zeigen
                      if (jahre <= 10) return true;
                      if (jahre <= 20) return (i + 1) % 2 === 0 || i === 0;
                      return (i + 1) % 5 === 0 || i === 0;
                    }).map((z) => (
                      <tr key={z.jahr} className="border-b border-border last:border-b-0 hover:bg-surface-raised transition-colors">
                        <td className="px-4 py-2 text-text">{z.jahr}</td>
                        <td className="px-4 py-2 text-right font-currency text-negative-500">{formatCurrency(z.kaufkraft)}</td>
                        <td className="px-4 py-2 text-right font-currency text-text-secondary">{formatCurrency(z.benoetigtBetrag)}</td>
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
