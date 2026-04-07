'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateBruttoNetto } from '@/lib/calculator/brutto-netto';
import { formatCurrency } from '@/lib/utils/format';
import type { BruttoNettoInput, BruttoNettoResult } from '@/types/calculator';
import { cn } from '@/lib/utils/cn';

const STEUERKLASSEN_IDS = [1, 2, 3, 4, 5, 6] as const;

const defaultInput: Omit<BruttoNettoInput, 'steuerklasse' | 'brutto'> = {
  bundesland: 'nw',
  kirchensteuer: false,
  kinderfreibetraege: 0,
  krankenversicherung: 'gesetzlich',
  kv_zusatzbeitrag: 2.9,
  rentenversicherung: true,
  arbeitslosenversicherung: true,
  pflegeversicherung_kinder: 0,
  alter_ueber_23: true,
  geburtsjahr: 1990,
  lohnzahlungszeitraum: 'monat',
};

interface Props {
  brutto: number;
}

export function ProgrammaticGehaltsForm({ brutto: initialBrutto }: Props) {
  const [brutto, setBrutto] = useState(initialBrutto);
  const [results, setResults] = useState<(BruttoNettoResult & { steuerklasse: number })[]>([]);

  useEffect(() => {
    if (brutto <= 0) { setResults([]); return; }
    setResults(STEUERKLASSEN_IDS.map((sk) => ({
      ...calculateBruttoNetto({ ...defaultInput, brutto, steuerklasse: sk }),
      steuerklasse: sk,
    })));
  }, [brutto]);

  return (
    <div className="space-y-6">
      <Card padding="md">
        <InputGroup label="Bruttogehalt (monatlich)" htmlFor="brutto">
          <CurrencyInput id="brutto" value={brutto} onChange={setBrutto} />
        </InputGroup>
      </Card>

      {results.length > 0 && (
        <div className="animate-result-in">
          <Card padding="none">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-sunken">
                    <th className="px-4 py-3 text-left font-medium text-text-secondary">Steuerklasse</th>
                    <th className="px-4 py-3 text-right font-medium text-text-secondary">Lohnsteuer</th>
                    <th className="px-4 py-3 text-right font-medium text-text-secondary">SV-Beitrag</th>
                    <th className="px-4 py-3 text-right font-medium text-text-secondary hidden sm:table-cell">Abzüge</th>
                    <th className="px-4 py-3 text-right font-medium text-text-secondary">Netto</th>
                    <th className="px-4 py-3 text-right font-medium text-text-secondary hidden md:table-cell">AG-Kosten</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr key={r.steuerklasse} className={cn('border-b border-border last:border-b-0 hover:bg-surface-raised transition-colors')}>
                      <td className="px-4 py-3 font-medium text-text">SK {r.steuerklasse}</td>
                      <td className="px-4 py-3 text-right font-currency text-negative-500">{formatCurrency(r.lohnsteuer)}</td>
                      <td className="px-4 py-3 text-right font-currency text-warning-500">{formatCurrency(r.sozialversicherung_gesamt)}</td>
                      <td className="px-4 py-3 text-right font-currency text-text-secondary hidden sm:table-cell">{formatCurrency(r.abzuege_gesamt)}</td>
                      <td className="px-4 py-3 text-right font-currency font-bold text-accent-500">{formatCurrency(r.netto)}</td>
                      <td className="px-4 py-3 text-right font-currency text-text-muted hidden md:table-cell">{formatCurrency(r.ag_kosten_gesamt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
