'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateNebenkosten, type NebenkostenResult } from '@/lib/calculator/immobilien/nebenkosten';
import { formatCurrency } from '@/lib/utils/format';

interface Props { bundesland: string; }

export function ProgrammaticNebenkostenForm({ bundesland }: Props) {
  const [kaufpreis, setKaufpreis] = useState(350000);
  const [makler, setMakler] = useState(true);
  const [result, setResult] = useState<NebenkostenResult | null>(null);

  useEffect(() => {
    if (kaufpreis <= 0) { setResult(null); return; }
    setResult(calculateNebenkosten({ kaufpreis, bundesland, makler, maklerSatz: 3.57 }));
  }, [kaufpreis, bundesland, makler]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
          <InputGroup label="Kaufpreis" htmlFor="kaufpreis">
            <CurrencyInput id="kaufpreis" value={kaufpreis} onChange={setKaufpreis} />
          </InputGroup>
          <Toggle checked={makler} onChange={setMakler} label="Mit Makler (3,57%)" />
        </div>
      </Card>
      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-4">
            <Card padding="lg" className="border-primary-200 dark:border-primary-800 bg-primary-50/30 dark:bg-primary-900/10 text-center">
              <p className="text-sm text-text-secondary">Kaufnebenkosten</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-primary-600 dark:text-primary-400">{formatCurrency(result.nebenkosten_gesamt)}</p>
              <p className="text-sm text-text-muted">{result.nebenkosten_prozent}% · Gesamt: {formatCurrency(result.gesamtkosten)}</p>
            </Card>
            <Card padding="none">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-border"><td className="px-4 py-3 text-text-secondary">Grunderwerbsteuer ({result.grunderwerbsteuerSatz}%)</td><td className="px-4 py-3 text-right font-currency font-medium text-text">{formatCurrency(result.grunderwerbsteuer)}</td></tr>
                  <tr className="border-b border-border"><td className="px-4 py-3 text-text-secondary">Notar (ca. 1,5%)</td><td className="px-4 py-3 text-right font-currency font-medium text-text">{formatCurrency(result.notar)}</td></tr>
                  <tr className="border-b border-border"><td className="px-4 py-3 text-text-secondary">Grundbuch (ca. 0,5%)</td><td className="px-4 py-3 text-right font-currency font-medium text-text">{formatCurrency(result.grundbuch)}</td></tr>
                  {result.makler > 0 && <tr className="border-b border-border"><td className="px-4 py-3 text-text-secondary">Makler</td><td className="px-4 py-3 text-right font-currency font-medium text-text">{formatCurrency(result.makler)}</td></tr>}
                </tbody>
                <tfoot>
                  <tr className="bg-primary-50/30 dark:bg-primary-900/10"><td className="px-4 py-3 font-bold text-primary-600">Gesamt</td><td className="px-4 py-3 text-right font-currency font-bold text-primary-600">{formatCurrency(result.gesamtkosten)}</td></tr>
                </tfoot>
              </table>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
