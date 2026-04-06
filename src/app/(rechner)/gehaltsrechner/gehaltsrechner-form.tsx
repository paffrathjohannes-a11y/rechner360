'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { BUNDESLAENDER } from '@/lib/utils/constants';
import { calculateBruttoNetto } from '@/lib/calculator/brutto-netto';
import { formatCurrency } from '@/lib/utils/format';
import type { BruttoNettoInput, BruttoNettoResult } from '@/types/calculator';
import { cn } from '@/lib/utils/cn';

const defaultInput: Omit<BruttoNettoInput, 'steuerklasse'> = {
  brutto: 4000,
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

const STEUERKLASSEN_IDS = [1, 2, 3, 4, 5, 6] as const;

export function GehaltsrechnerForm() {
  const [brutto, setBrutto] = useState(4000);
  const [bundesland, setBundesland] = useState('nw');
  const [results, setResults] = useState<(BruttoNettoResult & { steuerklasse: number })[]>([]);

  useEffect(() => {
    if (brutto <= 0) { setResults([]); return; }

    const newResults = STEUERKLASSEN_IDS.map((sk) => {
      const r = calculateBruttoNetto({
        ...defaultInput,
        brutto,
        bundesland,
        steuerklasse: sk,
      });
      return { ...r, steuerklasse: sk };
    });
    setResults(newResults);
  }, [brutto, bundesland]);

  return (
    <div className="space-y-6">
      {/* Inputs */}
      <Card padding="md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputGroup label="Bruttogehalt (monatlich)" htmlFor="brutto">
            <CurrencyInput id="brutto" value={brutto} onChange={setBrutto} placeholder="z.B. 4.000" />
          </InputGroup>
          <InputGroup label="Bundesland" htmlFor="bl">
            <Select id="bl" value={bundesland} onChange={(e) => setBundesland(e.target.value)}>
              {BUNDESLAENDER.map((bl) => (
                <option key={bl.id} value={bl.id}>{bl.name}</option>
              ))}
            </Select>
          </InputGroup>
        </div>
      </Card>

      {/* Comparison Table */}
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
                    <th className="px-4 py-3 text-right font-medium text-text-secondary">Abz&uuml;ge</th>
                    <th className="px-4 py-3 text-right font-medium text-text-secondary">Netto</th>
                    <th className="px-4 py-3 text-right font-medium text-text-secondary">AG-Kosten</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((r) => (
                    <tr
                      key={r.steuerklasse}
                      className={cn(
                        'border-b border-border last:border-b-0',
                        'hover:bg-surface-raised transition-colors',
                      )}
                    >
                      <td className="px-4 py-3 font-medium text-text">
                        SK {r.steuerklasse}
                      </td>
                      <td className="px-4 py-3 text-right font-currency text-negative-500">
                        {formatCurrency(r.lohnsteuer)}
                      </td>
                      <td className="px-4 py-3 text-right font-currency text-warning-500">
                        {formatCurrency(r.sozialversicherung_gesamt)}
                      </td>
                      <td className="px-4 py-3 text-right font-currency text-text-secondary">
                        {formatCurrency(r.abzuege_gesamt)}
                      </td>
                      <td className="px-4 py-3 text-right font-currency font-bold text-accent-500">
                        {formatCurrency(r.netto)}
                      </td>
                      <td className="px-4 py-3 text-right font-currency text-text-muted">
                        {formatCurrency(r.ag_kosten_gesamt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <p className="text-xs text-text-muted mt-2">
            Alle Angaben f&uuml;r 2026, ohne Kirchensteuer, kinderlos &uuml;ber 23, KV-Zusatzbeitrag 2,9%.
          </p>
        </div>
      )}
    </div>
  );
}
