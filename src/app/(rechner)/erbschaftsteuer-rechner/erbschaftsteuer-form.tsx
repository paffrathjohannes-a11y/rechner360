'use client';

import { useState, useEffect } from 'react';
import { useTrackCalculator } from '@/hooks/use-track-calculator';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { Badge } from '@/components/ui/badge';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { ResultsChart } from '@/components/calculator/results-chart';
import { BreakdownTable } from '@/components/calculator/breakdown-table';
import { calculateErbschaftsteuer, VERWANDTSCHAFT_OPTIONS } from '@/lib/calculator/tax/erbschaftsteuer';
import type { Verwandtschaft, ErbschaftsteuerResult, BreakdownItem } from '@/types/calculator';
import { formatCurrency, formatPercent } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

interface ErbschaftsteuerFormProps {
  defaultWert?: number;
  defaultVerwandtschaft?: Verwandtschaft;
}

export function ErbschaftsteuerForm({ defaultWert, defaultVerwandtschaft }: ErbschaftsteuerFormProps) {
  const [wert, setWert] = useState(defaultWert ?? 400_000);
  const [verwandtschaft, setVerwandtschaft] = useState<Verwandtschaft>(defaultVerwandtschaft ?? 'kind');
  const [artDesErwerbs, setArtDesErwerbs] = useState<'erbschaft' | 'schenkung'>('erbschaft');
  const [versorgungsfreibetrag, setVersorgungsfreibetrag] = useState(false);
  const [hausratFreibetrag, setHausratFreibetrag] = useState(false);
  const [alterDesKindes, setAlterDesKindes] = useState(10);
  const [result, setResult] = useState<ErbschaftsteuerResult | null>(null);
  useTrackCalculator('erbschaftsteuer-rechner', result !== null);

  const showVersorgung = artDesErwerbs === 'erbschaft' && (verwandtschaft === 'ehepartner' || verwandtschaft === 'kind');
  const showAlter = versorgungsfreibetrag && verwandtschaft === 'kind';

  useEffect(() => {
    setResult(calculateErbschaftsteuer({
      wert,
      verwandtschaft,
      artDesErwerbs,
      versorgungsfreibetrag: showVersorgung ? versorgungsfreibetrag : false,
      hausratFreibetrag,
      alterDesKindes: showAlter ? alterDesKindes : undefined,
    }));
  }, [wert, verwandtschaft, artDesErwerbs, versorgungsfreibetrag, hausratFreibetrag, alterDesKindes, showVersorgung, showAlter]);

  const breakdownItems: BreakdownItem[] = result ? [
    { label: 'Bruttowert', value: result.bruttoWert, color: 'muted' },
    { label: 'Persönlicher Freibetrag', value: -result.freibetrag, color: 'accent' },
    ...(result.versorgungsfreibetrag > 0 ? [{ label: 'Versorgungsfreibetrag', value: -result.versorgungsfreibetrag, color: 'accent' as const }] : []),
    ...(result.hausratFreibetrag > 0 ? [{ label: 'Hausrat-Freibetrag', value: -result.hausratFreibetrag, color: 'accent' as const }] : []),
    { label: `Erbschaftsteuer (${formatPercent(result.steuersatz)})`, value: -result.steuerBetrag, color: 'negative' },
  ] : [];

  const chartSegments = result && result.bruttoWert > 0 ? [
    { label: 'Netto-Erbe', value: result.nettoErbe, color: 'var(--color-accent-500)', percentage: result.nettoErbe / result.bruttoWert * 100 },
    ...(result.steuerBetrag > 0 ? [{ label: 'Erbschaftsteuer', value: result.steuerBetrag, color: 'var(--color-primary-500)', percentage: result.steuerBetrag / result.bruttoWert * 100 }] : []),
  ] : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          {/* Erbschaft / Schenkung Toggle */}
          <InputGroup label="Art des Erwerbs" htmlFor="art">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setArtDesErwerbs('erbschaft')}
                className={cn(
                  'flex-1 px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-150 cursor-pointer',
                  artDesErwerbs === 'erbschaft'
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-surface border-border text-text-secondary hover:bg-surface-raised',
                )}
              >
                Erbschaft
              </button>
              <button
                type="button"
                onClick={() => setArtDesErwerbs('schenkung')}
                className={cn(
                  'flex-1 px-3 py-2 text-sm font-medium rounded-lg border transition-all duration-150 cursor-pointer',
                  artDesErwerbs === 'schenkung'
                    ? 'bg-primary-600 text-white border-primary-600'
                    : 'bg-surface border-border text-text-secondary hover:bg-surface-raised',
                )}
              >
                Schenkung
              </button>
            </div>
          </InputGroup>

          <InputGroup label="Wert des Erbes / der Schenkung" htmlFor="wert" tooltip="Der Gesamtwert der Erbschaft oder Schenkung in Euro.">
            <CurrencyInput id="wert" value={wert} onChange={setWert} placeholder="z.B. 400.000" />
          </InputGroup>

          <InputGroup label="Verwandtschaftsverhältnis" htmlFor="verwandtschaft" tooltip="Bestimmt Steuerklasse und Freibetrag.">
            <Select id="verwandtschaft" value={verwandtschaft} onChange={(e) => setVerwandtschaft(e.target.value as Verwandtschaft)}>
              {VERWANDTSCHAFT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </Select>
          </InputGroup>

          {showVersorgung && (
            <Toggle
              checked={versorgungsfreibetrag}
              onChange={setVersorgungsfreibetrag}
              label="Versorgungsfreibetrag anrechnen"
            />
          )}

          {showAlter && (
            <InputGroup label="Alter des Kindes" htmlFor="alter">
              <Select id="alter" value={String(alterDesKindes)} onChange={(e) => setAlterDesKindes(Number(e.target.value))}>
                <option value="3">Bis 5 Jahre (52.000 €)</option>
                <option value="8">5-10 Jahre (41.000 €)</option>
                <option value="13">10-15 Jahre (30.700 €)</option>
                <option value="18">15-20 Jahre (20.500 €)</option>
                <option value="25">20-27 Jahre (10.300 €)</option>
              </Select>
            </InputGroup>
          )}

          <Toggle
            checked={hausratFreibetrag}
            onChange={setHausratFreibetrag}
            label="Hausrat-Freibetrag anrechnen"
          />

          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-6">
            {/* Highlight Card */}
            <Card padding="lg" className="border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10">
              <div className="text-center space-y-1">
                <p className="text-sm text-text-secondary">
                  {artDesErwerbs === 'erbschaft' ? 'Ihr Netto-Erbe' : 'Netto nach Schenkungsteuer'}
                </p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-accent-600 dark:text-accent-400">
                  {formatCurrency(result.nettoErbe)}
                </p>
                <p className="text-sm text-text-muted">
                  von {formatCurrency(result.bruttoWert)} brutto
                  {result.steuerBetrag > 0 && ` (${formatPercent(result.effektiverSteuersatz)} effektive Steuer)`}
                </p>
                <div className="flex justify-center gap-2 mt-2">
                  <Badge variant="default">Erbschaftsteuerklasse {result.steuerklasse}</Badge>
                  {result.steuerpflichtigerErwerb > 0 && (
                    <Badge variant="muted">Steuersatz {formatPercent(result.steuersatz)}</Badge>
                  )}
                </div>
              </div>
            </Card>

            {/* Key figures */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Freibetrag</p>
                <p className="text-lg font-bold font-currency text-accent-500 mt-1">
                  {formatCurrency(result.freibetrag + result.versorgungsfreibetrag + result.hausratFreibetrag)}
                </p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Steuerpflichtig</p>
                <p className="text-lg font-bold font-currency text-text mt-1">
                  {formatCurrency(result.steuerpflichtigerErwerb)}
                </p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Erbschaftsteuer</p>
                <p className="text-lg font-bold font-currency text-negative-500 mt-1">
                  {formatCurrency(result.steuerBetrag)}
                </p>
              </Card>
            </div>

            {/* Chart */}
            {chartSegments.length > 0 && (
              <Card padding="lg">
                <ResultsChart segments={chartSegments} centerLabel="Netto" centerValue={formatCurrency(result.nettoErbe)} />
              </Card>
            )}

            {/* Breakdown */}
            <div>
              <h2 className="text-lg font-semibold text-text mb-3">Aufschlüsselung</h2>
              <BreakdownTable
                items={breakdownItems}
                totalLabel="Netto-Erbe"
                totalValue={result.nettoErbe}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
