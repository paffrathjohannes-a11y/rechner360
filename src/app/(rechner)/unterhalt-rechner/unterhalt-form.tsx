'use client';

import { useState, useMemo } from 'react';
import { Plus, Minus, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { NumberInput } from '@/components/ui/number-input';
import { Toggle } from '@/components/ui/toggle';
import { Button } from '@/components/ui/button';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateUnterhalt, type UnterhaltResult } from '@/lib/calculator/social/unterhalt';
import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

export function UnterhaltForm() {
  const [netto, setNetto] = useState(3000);
  const [kinderAlter, setKinderAlter] = useState([6]);
  const [kindergeld, setKindergeld] = useState(true);

  const result = useMemo<UnterhaltResult | null>(() => {
    if (netto <= 0 || kinderAlter.length === 0) return null;
    return calculateUnterhalt({ nettoEinkommen: netto, kinderAnzahl: kinderAlter.length, kinderAlter, kindergeldAnrechnung: kindergeld });
  }, [netto, kinderAlter, kindergeld]);

  function addKind() { setKinderAlter([...kinderAlter, 6]); }
  function removeKind(i: number) { setKinderAlter(kinderAlter.filter((_, idx) => idx !== i)); }
  function updateAlter(i: number, alter: number) { const a = [...kinderAlter]; a[i] = alter; setKinderAlter(a); }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Nettoeinkommen" htmlFor="netto" tooltip="Bereinigtes Nettoeinkommen: Ihr Netto nach Abzug von berufsbedingten Aufwendungen (pauschal 5%), Schulden und Vorsorgebeiträgen.">
            <CurrencyInput id="netto" value={netto} onChange={setNetto} />
          </InputGroup>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-text">Kinder ({kinderAlter.length})</span>
              <Button variant="ghost" size="sm" onClick={addKind}><Plus className="h-3.5 w-3.5 mr-1" /> Kind</Button>
            </div>
            {kinderAlter.map((alter, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm text-text-muted w-16">Kind {i + 1}</span>
                <NumberInput min={0} max={25} value={alter} onChange={(v) => updateAlter(i, v)} className="flex-1" />
                <span className="text-sm text-text-muted">Jahre</span>
                {kinderAlter.length > 1 && (
                  <button type="button" onClick={() => removeKind(i)} className="p-2 text-text-muted hover:text-negative-500 cursor-pointer"><Minus className="h-4 w-4" /></button>
                )}
              </div>
            ))}
          </div>

          <Toggle checked={kindergeld} onChange={setKindergeld} label="Kindergeld anrechnen (hälftig)" />
          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-6">
            <Card padding="lg" className="border-primary-200 dark:border-primary-800 bg-primary-50/30 dark:bg-primary-900/10">
              <div className="text-center space-y-1">
                <p className="text-sm text-text-secondary">Gesamter Zahlbetrag</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-primary-600 dark:text-primary-400">{formatCurrency(result.gesamtUnterhalt)}</p>
                <p className="text-sm text-text-muted">monatlich · Einkommensgruppe {result.einkommensgruppe}</p>
              </div>
            </Card>

            {result.mangelfall && (
              <Card padding="md" className="border-warning-400/30 bg-warning-50/50 dark:bg-warning-500/10">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-warning-600">Mangelfall</p>
                    <p className="text-sm text-text-secondary">Nach Abzug des Unterhalts verbleibt weniger als der Selbstbehalt von {formatCurrency(result.selbstbehalt)}. Der Unterhalt muss ggf. gekürzt werden.</p>
                  </div>
                </div>
              </Card>
            )}

            <Card padding="none">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface-sunken">
                    <th className="px-4 py-2 text-left text-text-secondary font-medium">Kind</th>
                    <th className="px-4 py-2 text-right text-text-secondary font-medium">Alter</th>
                    <th className="px-4 py-2 text-right text-text-secondary font-medium">Tabellenbetrag</th>
                    <th className="px-4 py-2 text-right text-text-secondary font-medium">Zahlbetrag</th>
                  </tr>
                </thead>
                <tbody>
                  {kinderAlter.map((alter, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0 hover:bg-surface-raised transition-colors">
                      <td className="px-4 py-3 text-text">Kind {i + 1}</td>
                      <td className="px-4 py-3 text-right text-text-secondary">{alter} Jahre</td>
                      <td className="px-4 py-3 text-right font-currency text-text-secondary">{formatCurrency(result.tabellenUnterhalt[i])}</td>
                      <td className="px-4 py-3 text-right font-currency font-bold text-primary-600">{formatCurrency(result.zahlbetrag[i])}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-primary-50/30 dark:bg-primary-900/10 border-t border-border">
                    <td colSpan={3} className="px-4 py-3 font-bold text-primary-600">Gesamt</td>
                    <td className="px-4 py-3 text-right font-currency font-bold text-primary-600">{formatCurrency(result.gesamtUnterhalt)}</td>
                  </tr>
                </tfoot>
              </table>
            </Card>

            <Card padding="md" className="bg-surface-raised">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Verbleibendes Einkommen</span>
                <span className={cn('font-currency font-medium', netto - result.gesamtUnterhalt < result.selbstbehalt ? 'text-negative-500' : 'text-accent-500')}>
                  {formatCurrency(netto - result.gesamtUnterhalt)}
                </span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-text-muted">Selbstbehalt (Erwerbstätige)</span>
                <span className="font-currency text-text-muted">{formatCurrency(result.selbstbehalt)}</span>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
