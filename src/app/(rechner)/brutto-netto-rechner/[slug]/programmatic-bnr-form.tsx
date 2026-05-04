'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { ResultsChart } from '@/components/calculator/results-chart';
import { BreakdownTable } from '@/components/calculator/breakdown-table';
import { STEUERKLASSEN } from '@/lib/utils/constants';
import { calculateBruttoNetto } from '@/lib/calculator/brutto-netto';
import { formatCurrency } from '@/lib/utils/format';
import type { BruttoNettoResult, BreakdownItem, ChartSegment } from '@/types/calculator';

interface Props {
  brutto: number;
  steuerklasse: number;
}

export function ProgrammaticBNRForm({ brutto: initialBrutto, steuerklasse: initialSk }: Props) {
  const [brutto, setBrutto] = useState(initialBrutto);
  const [steuerklasse, setSteuerklasse] = useState(initialSk);

  const result = useMemo<BruttoNettoResult | null>(() => {
    if (brutto <= 0) return null;
    return calculateBruttoNetto({
      brutto,
      steuerklasse: steuerklasse as 1 | 2 | 3 | 4 | 5 | 6,
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
    });
  }, [brutto, steuerklasse]);

  const chartSegments: ChartSegment[] = result
    ? [
        { label: 'Nettolohn', value: result.netto, color: 'var(--color-accent-500)', percentage: (result.netto / result.brutto) * 100 },
        { label: 'Steuern', value: result.steuern_gesamt, color: 'var(--color-primary-500)', percentage: (result.steuern_gesamt / result.brutto) * 100 },
        { label: 'Sozialversicherung', value: result.sozialversicherung_gesamt, color: 'var(--color-warning-500)', percentage: (result.sozialversicherung_gesamt / result.brutto) * 100 },
      ]
    : [];

  const breakdownItems: BreakdownItem[] = result
    ? [
        { label: 'Lohnsteuer', value: -result.lohnsteuer, percentage: (result.lohnsteuer / result.brutto) * 100, color: 'primary' },
        { label: 'Solidaritätszuschlag', value: -result.solidaritaetszuschlag, percentage: (result.solidaritaetszuschlag / result.brutto) * 100, color: 'primary' },
        { label: 'Krankenversicherung', value: -result.krankenversicherung, percentage: (result.krankenversicherung / result.brutto) * 100, color: 'warning' },
        { label: 'Rentenversicherung', value: -result.rentenversicherung, percentage: (result.rentenversicherung / result.brutto) * 100, color: 'warning' },
        { label: 'Arbeitslosenversicherung', value: -result.arbeitslosenversicherung, percentage: (result.arbeitslosenversicherung / result.brutto) * 100, color: 'warning' },
        { label: 'Pflegeversicherung', value: -result.pflegeversicherung, percentage: (result.pflegeversicherung / result.brutto) * 100, color: 'warning' },
      ]
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Bruttogehalt (monatlich)" htmlFor="brutto">
            <CurrencyInput id="brutto" value={brutto} onChange={setBrutto} />
          </InputGroup>
          <InputGroup label="Steuerklasse" htmlFor="stkl">
            <Select id="stkl" value={steuerklasse} onChange={(e) => setSteuerklasse(Number(e.target.value))}>
              {STEUERKLASSEN.map((sk) => (
                <option key={sk.id} value={sk.id}>{sk.name}</option>
              ))}
            </Select>
          </InputGroup>
          <p className="text-xs text-text-muted text-center">
            Ergebnisse aktualisieren sich automatisch.
          </p>
        </div>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-6">
            <Card padding="lg" className="border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10">
              <div className="text-center">
                <p className="text-sm text-text-secondary">Ihr Nettogehalt</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-accent-600 dark:text-accent-400 mt-1">
                  {formatCurrency(result.netto)}
                </p>
                <p className="text-sm text-text-muted mt-1">
                  von {formatCurrency(result.brutto)} brutto ({(result.abgabenquote * 100).toFixed(1).replace('.', ',')}% Abgabenquote)
                </p>
              </div>
            </Card>

            <Card padding="lg">
              <ResultsChart
                segments={chartSegments}
                centerLabel="Netto"
                centerValue={formatCurrency(result.netto)}
                size={180}
              />
            </Card>

            <BreakdownTable
              items={breakdownItems}
              totalLabel="Nettolohn"
              totalValue={result.netto}
            />
          </div>
        )}
      </div>
    </div>
  );
}
