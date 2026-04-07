'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { ResultsChart } from '@/components/calculator/results-chart';
import { calculateNebenkosten, type NebenkostenResult } from '@/lib/calculator/immobilien/nebenkosten';
import { BUNDESLAENDER } from '@/lib/utils/constants';
import { formatCurrency } from '@/lib/utils/format';
import type { ChartSegment } from '@/types/calculator';

export function NebenkostenForm() {
  const [kaufpreis, setKaufpreis] = useState(350000);
  const [bundesland, setBundesland] = useState('nw');
  const [makler, setMakler] = useState(true);
  const [maklerSatz, setMaklerSatz] = useState(3.57);
  const [result, setResult] = useState<NebenkostenResult | null>(null);

  useEffect(() => {
    if (kaufpreis <= 0) { setResult(null); return; }
    setResult(calculateNebenkosten({ kaufpreis, bundesland, makler, maklerSatz }));
  }, [kaufpreis, bundesland, makler, maklerSatz]);

  const chartSegments: ChartSegment[] = result ? [
    { label: 'Grunderwerbsteuer', value: result.grunderwerbsteuer, color: 'var(--color-primary-500)', percentage: (result.grunderwerbsteuer / result.nebenkosten_gesamt) * 100 },
    { label: 'Notar', value: result.notar, color: 'var(--color-accent-500)', percentage: (result.notar / result.nebenkosten_gesamt) * 100 },
    { label: 'Grundbuch', value: result.grundbuch, color: 'var(--color-warning-500)', percentage: (result.grundbuch / result.nebenkosten_gesamt) * 100 },
    ...(result.makler > 0 ? [{ label: 'Makler', value: result.makler, color: 'var(--color-negative-500)', percentage: (result.makler / result.nebenkosten_gesamt) * 100 }] : []),
  ] : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Kaufpreis" htmlFor="kaufpreis">
            <CurrencyInput id="kaufpreis" value={kaufpreis} onChange={setKaufpreis} placeholder="z.B. 350.000" />
          </InputGroup>
          <InputGroup label="Bundesland" htmlFor="bl">
            <Select id="bl" value={bundesland} onChange={(e) => setBundesland(e.target.value)}>
              {BUNDESLAENDER.map((bl) => (<option key={bl.id} value={bl.id}>{bl.name}</option>))}
            </Select>
          </InputGroup>
          <Toggle checked={makler} onChange={setMakler} label="Mit Makler" />
          {makler && (
            <InputGroup label="Maklerkosten (Käuferanteil %)" htmlFor="maklerSatz">
              <Select id="maklerSatz" value={maklerSatz} onChange={(e) => setMaklerSatz(Number(e.target.value))}>
                {[1.785, 2.38, 3.0, 3.57, 4.76].map((v) => (
                  <option key={v} value={v}>{v.toFixed(2).replace('.', ',')}% inkl. MwSt</option>
                ))}
              </Select>
            </InputGroup>
          )}
          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-6">
            <Card padding="lg" className="border-primary-200 dark:border-primary-800 bg-primary-50/30 dark:bg-primary-900/10">
              <div className="text-center space-y-1">
                <p className="text-sm text-text-secondary">Kaufnebenkosten</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-primary-600 dark:text-primary-400">{formatCurrency(result.nebenkosten_gesamt)}</p>
                <p className="text-sm text-text-muted">{result.nebenkosten_prozent}% des Kaufpreises · Gesamt: {formatCurrency(result.gesamtkosten)}</p>
              </div>
            </Card>

            <Card padding="none">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-border hover:bg-surface-raised transition-colors">
                    <td className="px-4 py-3 text-text-secondary">Grunderwerbsteuer ({result.grunderwerbsteuerSatz}%)</td>
                    <td className="px-4 py-3 text-right font-currency font-medium text-text">{formatCurrency(result.grunderwerbsteuer)}</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-surface-raised transition-colors">
                    <td className="px-4 py-3 text-text-secondary">Notarkosten (ca. 1,5%)</td>
                    <td className="px-4 py-3 text-right font-currency font-medium text-text">{formatCurrency(result.notar)}</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-surface-raised transition-colors">
                    <td className="px-4 py-3 text-text-secondary">Grundbuchkosten (ca. 0,5%)</td>
                    <td className="px-4 py-3 text-right font-currency font-medium text-text">{formatCurrency(result.grundbuch)}</td>
                  </tr>
                  {result.makler > 0 && (
                    <tr className="border-b border-border hover:bg-surface-raised transition-colors">
                      <td className="px-4 py-3 text-text-secondary">Maklerkosten ({maklerSatz.toFixed(2).replace('.', ',')}%)</td>
                      <td className="px-4 py-3 text-right font-currency font-medium text-text">{formatCurrency(result.makler)}</td>
                    </tr>
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-surface-sunken"><td className="px-4 py-3 font-bold text-text">Nebenkosten gesamt</td><td className="px-4 py-3 text-right font-currency font-bold text-text">{formatCurrency(result.nebenkosten_gesamt)}</td></tr>
                  <tr className="bg-primary-50/30 dark:bg-primary-900/10 border-t border-border"><td className="px-4 py-3 font-bold text-primary-600">Gesamtkosten</td><td className="px-4 py-3 text-right font-currency font-bold text-primary-600">{formatCurrency(result.gesamtkosten)}</td></tr>
                </tfoot>
              </table>
            </Card>

            <Card padding="lg">
              <ResultsChart segments={chartSegments} centerLabel="Nebenkosten" centerValue={formatCurrency(result.nebenkosten_gesamt)} size={180} />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
