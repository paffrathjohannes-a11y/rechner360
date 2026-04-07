'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateElterngeld, type ElterngeldResult } from '@/lib/calculator/social/elterngeld';
import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

export function ElterngeldForm() {
  const [netto, setNetto] = useState(2000);
  const [art, setArt] = useState<'basis' | 'plus'>('basis');
  const [zwillinge, setZwillinge] = useState(false);
  const [geschwister, setGeschwister] = useState(false);
  const [result, setResult] = useState<ElterngeldResult | null>(null);

  useEffect(() => {
    setResult(calculateElterngeld({
      nettoEinkommen: netto,
      arbeitsstundenNachGeburt: 0,
      elterngeldArt: art,
      zwillinge,
      geschwisterbonus: geschwister,
    }));
  }, [netto, art, zwillinge, geschwister]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
          <InputGroup label="Nettoeinkommen vor Geburt (monatlich)" htmlFor="netto" tooltip="Durchschnittliches monatliches Nettoeinkommen der letzten 12 Monate vor der Geburt.">
            <CurrencyInput id="netto" value={netto} onChange={setNetto} placeholder="z.B. 2.000" />
          </InputGroup>

          <InputGroup label="Elterngeld-Art" htmlFor="art">
            <Select id="art" value={art} onChange={(e) => setArt(e.target.value as 'basis' | 'plus')}>
              <option value="basis">Basiselterngeld (12 Monate)</option>
              <option value="plus">ElterngeldPlus (24 Monate)</option>
            </Select>
          </InputGroup>

          <div className="space-y-3">
            <Toggle checked={zwillinge} onChange={setZwillinge} label="Mehrlingsgeburt (Zwillinge+)" />
            <Toggle checked={geschwister} onChange={setGeschwister} label="Geschwisterbonus" />
          </div>

          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-6">
            <Card padding="lg" className="border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10">
              <div className="text-center space-y-1">
                <p className="text-sm text-text-secondary">Ihr monatliches Elterngeld</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-accent-600 dark:text-accent-400">
                  {formatCurrency(result.monatlich)}
                </p>
                <p className="text-sm text-text-muted">
                  für {result.laufzeitMonate} Monate · Gesamt: {formatCurrency(result.gesamt)}
                </p>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Ersatzrate</p>
                <p className="text-2xl font-bold text-primary-500 mt-1">
                  {(result.ersatzrate * 100).toFixed(0)}%
                </p>
                <p className="text-sm text-text-muted">des Nettoeinkommens</p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Gesamtbetrag</p>
                <p className="text-2xl font-bold font-currency text-text mt-1">
                  {formatCurrency(result.gesamt)}
                </p>
                <p className="text-sm text-text-muted">{result.laufzeitMonate} Monate</p>
              </Card>
            </div>

            {(result.mehrlingszuschlag > 0 || result.geschwisterbonus > 0) && (
              <Card padding="md" className="bg-surface-raised">
                <div className="space-y-2 text-sm">
                  {result.mehrlingszuschlag > 0 && (
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Mehrlingszuschlag</span>
                      <span className="font-currency font-medium text-text">+{formatCurrency(result.mehrlingszuschlag)}/Mo</span>
                    </div>
                  )}
                  {result.geschwisterbonus > 0 && (
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Geschwisterbonus</span>
                      <span className="font-currency font-medium text-text">+{formatCurrency(result.geschwisterbonus)}/Mo</span>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {(result.mindestbetrag || result.hoechstbetrag) && (
              <p className="text-xs text-text-muted text-center">
                {result.mindestbetrag && 'Es gilt der Mindestbetrag.'}
                {result.hoechstbetrag && 'Es gilt der H\u00f6chstbetrag.'}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
