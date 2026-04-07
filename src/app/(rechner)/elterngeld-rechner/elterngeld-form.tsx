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
  const [brutto, setBrutto] = useState(3500);
  const [teilzeitBrutto, setTeilzeitBrutto] = useState(0);
  const [art, setArt] = useState<'basis' | 'plus'>('basis');
  const [partnermonate, setPartnermonate] = useState(false);
  const [zwillinge, setZwillinge] = useState(false);
  const [geschwister, setGeschwister] = useState(false);
  const [result, setResult] = useState<ElterngeldResult | null>(null);

  useEffect(() => {
    setResult(calculateElterngeld({
      bruttoEinkommen: brutto,
      teilzeitBrutto,
      elterngeldArt: art,
      partnermonate,
      zwillinge,
      geschwisterbonus: geschwister,
    }));
  }, [brutto, teilzeitBrutto, art, partnermonate, zwillinge, geschwister]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Bruttoeinkommen vor Geburt (monatlich)" htmlFor="brutto" tooltip="Durchschnittliches Bruttogehalt der letzten 12 Monate vor der Geburt. Das Elterngeld-Netto wird automatisch berechnet.">
            <CurrencyInput id="brutto" value={brutto} onChange={setBrutto} placeholder="z.B. 3.500" />
          </InputGroup>

          <InputGroup label="Elterngeld-Art" htmlFor="art">
            <Select id="art" value={art} onChange={(e) => setArt(e.target.value as 'basis' | 'plus')}>
              <option value="basis">Basiselterngeld ({partnermonate ? '14' : '12'} Monate)</option>
              <option value="plus">ElterngeldPlus ({partnermonate ? '28' : '24'} Monate)</option>
            </Select>
          </InputGroup>

          <InputGroup label="Einkommen während Elternzeit (brutto)" htmlFor="teilzeit" tooltip="Falls Sie in Teilzeit arbeiten (max. 32h/Woche). 0 = nicht erwerbstätig. Mindert das Elterngeld, aber Sie behalten das Teilzeitgehalt zusätzlich.">
            <CurrencyInput id="teilzeit" value={teilzeitBrutto} onChange={setTeilzeitBrutto} placeholder="0 = nicht erwerbstätig" />
          </InputGroup>

          <div className="space-y-3">
            <Toggle checked={partnermonate} onChange={setPartnermonate} label="Partnermonate — beide Eltern nehmen Elternzeit (+2 Mon.)" />
            <Toggle checked={zwillinge} onChange={setZwillinge} label="Mehrlingsgeburt (Zwillinge oder mehr)" />
            <Toggle checked={geschwister} onChange={setGeschwister} label="Geschwisterbonus — Kind unter 3 oder 2 Kinder unter 6" />
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

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Elterngeld-Netto</p>
                <p className="text-xl font-bold font-currency text-primary-500 mt-1">
                  {formatCurrency(result.elterngeldNetto)}
                </p>
                <p className="text-xs text-text-muted mt-1">berechnet aus Brutto</p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Ersatzrate</p>
                <p className="text-xl font-bold text-text mt-1">
                  {(result.ersatzrate * 100).toFixed(0)}%
                </p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Gesamtbetrag</p>
                <p className="text-xl font-bold font-currency text-text mt-1">
                  {formatCurrency(result.gesamt)}
                </p>
                <p className="text-xs text-text-muted mt-1">{result.laufzeitMonate} Monate</p>
              </Card>
            </div>

            {result.teilzeitNetto > 0 && (
              <Card padding="md" className="bg-surface-raised">
                <p className="text-sm text-text-secondary text-center">
                  Ihr Teilzeit-Netto ({formatCurrency(result.teilzeitNetto)}/Mo) wird bei der Berechnung berücksichtigt. Das Elterngeld basiert auf der Differenz zum Einkommen vor der Geburt.
                </p>
              </Card>
            )}

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
                {result.hoechstbetrag && 'Es gilt der Höchstbetrag.'}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
