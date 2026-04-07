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
      geldwerter_vorteil: 0,
      firmenwagen_listenpreis: 0,
      firmenwagen_antrieb: 'kein',
};

const STEUERKLASSEN_IDS = [1, 2, 3, 4, 5, 6] as const;

export function GehaltsrechnerForm() {
  const [brutto, setBrutto] = useState(4000);
  const [bundesland, setBundesland] = useState('nw');
  const [pvKinder, setPvKinder] = useState(0);
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [kinderfreibetraege, setKinderfreibetraege] = useState(0);
  const [kvZusatzbeitrag, setKvZusatzbeitrag] = useState(2.9);
  const [results, setResults] = useState<(BruttoNettoResult & { steuerklasse: number })[]>([]);

  useEffect(() => {
    if (brutto <= 0) { setResults([]); return; }

    const newResults = STEUERKLASSEN_IDS.map((sk) => {
      const r = calculateBruttoNetto({
        ...defaultInput,
        brutto,
        bundesland,
        pflegeversicherung_kinder: pvKinder,
        kirchensteuer,
        kinderfreibetraege,
        kv_zusatzbeitrag: kvZusatzbeitrag,
        steuerklasse: sk,
      });
      return { ...r, steuerklasse: sk };
    });
    setResults(newResults);
  }, [brutto, bundesland, pvKinder, kirchensteuer, kinderfreibetraege, kvZusatzbeitrag]);

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
          <InputGroup label="Kinder" htmlFor="pvk">
            <Select id="pvk" value={pvKinder} onChange={(e) => setPvKinder(Number(e.target.value))}>
              {[0, 1, 2, 3, 4, 5].map((v) => (
                <option key={v} value={v}>{v === 0 ? 'Keine (0,6% Zuschlag)' : `${v} ${v === 1 ? 'Kind' : 'Kinder'}`}</option>
              ))}
            </Select>
          </InputGroup>
          <InputGroup label="Kirchensteuer" htmlFor="kist">
            <Select id="kist" value={kirchensteuer ? 'ja' : 'nein'} onChange={(e) => setKirchensteuer(e.target.value === 'ja')}>
              <option value="nein">Nein</option>
              <option value="ja">Ja</option>
            </Select>
          </InputGroup>
          <InputGroup label="Kinderfreibeträge" htmlFor="kfb">
            <Select id="kfb" value={kinderfreibetraege} onChange={(e) => setKinderfreibetraege(Number(e.target.value))}>
              {[0, 0.5, 1, 1.5, 2, 2.5, 3].map((v) => (<option key={v} value={v}>{v}</option>))}
            </Select>
          </InputGroup>
          <InputGroup label="KV-Zusatzbeitrag" htmlFor="kvz">
            <Select id="kvz" value={kvZusatzbeitrag} onChange={(e) => setKvZusatzbeitrag(Number(e.target.value))}>
              {[1.5, 1.9, 2.3, 2.5, 2.7, 2.9, 3.1, 3.5].map((v) => (
                <option key={v} value={v}>{v.toFixed(1).replace('.', ',')}%</option>
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
                    <th className="px-4 py-3 text-right font-medium text-text-secondary">Sozialabgaben</th>
                    <th className="px-4 py-3 text-right font-medium text-text-secondary hidden sm:table-cell">Abzüge</th>
                    <th className="px-4 py-3 text-right font-medium text-text-secondary">Netto</th>
                    <th className="px-4 py-3 text-right font-medium text-text-secondary hidden md:table-cell">AG-Kosten</th>
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
                      <td className="px-4 py-3 text-right font-currency text-text-secondary hidden sm:table-cell">
                        {formatCurrency(r.abzuege_gesamt)}
                      </td>
                      <td className="px-4 py-3 text-right font-currency font-bold text-accent-500">
                        {formatCurrency(r.netto)}
                      </td>
                      <td className="px-4 py-3 text-right font-currency text-text-muted hidden md:table-cell">
                        {formatCurrency(r.ag_kosten_gesamt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <p className="text-sm text-text-muted mt-2">
            Alle Angaben für 2026, {kirchensteuer ? 'mit' : 'ohne'} Kirchensteuer, {pvKinder === 0 ? 'kinderlos über 23' : `${pvKinder} ${pvKinder === 1 ? 'Kind' : 'Kinder'}`}, KV-Zusatzbeitrag {kvZusatzbeitrag.toFixed(1).replace('.', ',')}%.
          </p>
        </div>
      )}
    </div>
  );
}
