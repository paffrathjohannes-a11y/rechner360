'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { ResultsChart } from '@/components/calculator/results-chart';
import { calculateKredit } from '@/lib/calculator/credit/annuity';
import { formatCurrency } from '@/lib/utils/format';
import type { KreditInput, KreditResult, ChartSegment } from '@/types/calculator';
import { cn } from '@/lib/utils/cn';

export function KreditrechnerForm() {
  const [darlehensbetrag, setDarlehensbetrag] = useState(20000);
  const [zinssatz, setZinssatz] = useState(5.5);
  const [laufzeit, setLaufzeit] = useState(60);
  const [result, setResult] = useState<KreditResult | null>(null);

  useEffect(() => {
    if (darlehensbetrag <= 0 || zinssatz < 0 || laufzeit <= 0) {
      setResult(null);
      return;
    }
    setResult(calculateKredit({ darlehensbetrag, zinssatz, laufzeit_monate: laufzeit }));
  }, [darlehensbetrag, zinssatz, laufzeit]);

  const chartSegments: ChartSegment[] = result
    ? [
        { label: 'Tilgung', value: darlehensbetrag, color: 'var(--color-accent-500)', percentage: (darlehensbetrag / result.gesamtkosten) * 100 },
        { label: 'Zinsen', value: result.gesamtzinsen, color: 'var(--color-warning-500)', percentage: (result.gesamtzinsen / result.gesamtkosten) * 100 },
      ]
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      {/* Form */}
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
          <InputGroup label="Darlehensbetrag" htmlFor="betrag">
            <CurrencyInput id="betrag" value={darlehensbetrag} onChange={setDarlehensbetrag} placeholder="z.B. 20.000" />
          </InputGroup>

          <InputGroup label="Zinssatz (% p.a.)" htmlFor="zins" tooltip="Effektiver Jahreszins des Kredits.">
            <Select id="zins" value={zinssatz} onChange={(e) => setZinssatz(Number(e.target.value))}>
              {[2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 9.0, 10.0, 12.0].map((v) => (
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

          <p className="text-xs text-text-muted text-center">
            Ergebnisse aktualisieren sich automatisch.
          </p>
        </div>
      </Card>

      {/* Results */}
      <div className="lg:col-span-3 space-y-6">
        {result ? (
          <div className="animate-result-in space-y-6">
            {/* Key Figures */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card padding="md" className="text-center">
                <p className="text-xs text-text-muted">Monatliche Rate</p>
                <p className="text-2xl font-bold font-currency text-accent-500 mt-1">
                  {formatCurrency(result.monatliche_rate)}
                </p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-xs text-text-muted">Gesamtzinsen</p>
                <p className="text-2xl font-bold font-currency text-warning-500 mt-1">
                  {formatCurrency(result.gesamtzinsen)}
                </p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-xs text-text-muted">Gesamtkosten</p>
                <p className="text-2xl font-bold font-currency text-text mt-1">
                  {formatCurrency(result.gesamtkosten)}
                </p>
              </Card>
            </div>

            {/* Chart */}
            <Card padding="lg">
              <ResultsChart
                segments={chartSegments}
                centerLabel="Gesamtkosten"
                centerValue={formatCurrency(result.gesamtkosten)}
              />
            </Card>

            {/* Tilgungsplan (first 12 rows + summary) */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-text">Tilgungsplan (Auszug)</h3>
              <Card padding="none">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-surface-sunken">
                        <th className="px-4 py-2 text-left text-text-secondary font-medium">Monat</th>
                        <th className="px-4 py-2 text-right text-text-secondary font-medium">Rate</th>
                        <th className="px-4 py-2 text-right text-text-secondary font-medium">Zins</th>
                        <th className="px-4 py-2 text-right text-text-secondary font-medium">Tilgung</th>
                        <th className="px-4 py-2 text-right text-text-secondary font-medium">Restschuld</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.tilgungsplan.slice(0, 12).map((z) => (
                        <tr key={z.monat} className="border-b border-border last:border-b-0 hover:bg-surface-raised transition-colors">
                          <td className="px-4 py-2 text-text">{z.monat}</td>
                          <td className="px-4 py-2 text-right font-currency text-text">{formatCurrency(z.rate)}</td>
                          <td className="px-4 py-2 text-right font-currency text-warning-500">{formatCurrency(z.zins)}</td>
                          <td className="px-4 py-2 text-right font-currency text-accent-500">{formatCurrency(z.tilgung)}</td>
                          <td className="px-4 py-2 text-right font-currency text-text-secondary">{formatCurrency(z.restschuld)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              {result.tilgungsplan.length > 12 && (
                <p className="text-xs text-text-muted text-center">
                  Zeigt die ersten 12 von {result.tilgungsplan.length} Monaten.
                </p>
              )}
            </div>
          </div>
        ) : (
          <Card padding="lg" className="flex items-center justify-center min-h-[300px]">
            <p className="text-text-secondary">Geben Sie einen Darlehensbetrag ein.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
