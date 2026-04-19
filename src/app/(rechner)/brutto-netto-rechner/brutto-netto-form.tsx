'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTrackCalculator } from '@/hooks/use-track-calculator';
import { useUrlStateRead, useUrlStateSync, parsers } from '@/hooks/use-url-state';
import { Calculator } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { ResultsChart } from '@/components/calculator/results-chart';
import { BreakdownTable } from '@/components/calculator/breakdown-table';
import { BUNDESLAENDER, STEUERKLASSEN } from '@/lib/utils/constants';
import { AdvancedOptions } from '@/components/calculator/advanced-options';
import { calculateBruttoNetto } from '@/lib/calculator/brutto-netto';
import { formatCurrency } from '@/lib/utils/format';
import type { BruttoNettoInput, BruttoNettoResult, BreakdownItem, ChartSegment } from '@/types/calculator';

const defaultInput: BruttoNettoInput = {
  brutto: 3000,
  steuerklasse: 1,
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

export function BruttoNettoForm() {
  const [input, setInput] = useState<BruttoNettoInput>(defaultInput);
  const [result, setResult] = useState<BruttoNettoResult | null>(() => calculateBruttoNetto(defaultInput));
  const [period, setPeriod] = useState<'month' | 'year'>('month');
  useTrackCalculator('brutto-netto-rechner', result !== null);
  const factor = period === 'year' ? 12 : 1;

  // URL-State: aus Query-Params nach Mount übernehmen (SSR-safe).
  const urlOverrides = useUrlStateRead<{
    b: number; sk: number; bl: string; ks: boolean;
  }>({ b: parsers.int, sk: parsers.int, bl: parsers.str, ks: parsers.bool });

  useEffect(() => {
    if (Object.keys(urlOverrides).length === 0) return;
    setInput((prev) => ({
      ...prev,
      ...(urlOverrides.b !== undefined && urlOverrides.b > 0 ? { brutto: urlOverrides.b } : {}),
      ...(urlOverrides.sk !== undefined && [1, 2, 3, 4, 5, 6].includes(urlOverrides.sk)
        ? { steuerklasse: urlOverrides.sk as BruttoNettoInput['steuerklasse'] } : {}),
      ...(urlOverrides.bl ? { bundesland: urlOverrides.bl as BruttoNettoInput['bundesland'] } : {}),
      ...(urlOverrides.ks !== undefined ? { kirchensteuer: urlOverrides.ks } : {}),
    }));
  }, [urlOverrides]);

  // URL-State Sync: nur die 4 teilbaren Haupt-Parameter zurückschreiben.
  useUrlStateSync({
    b: input.brutto !== defaultInput.brutto ? input.brutto : null,
    sk: input.steuerklasse !== defaultInput.steuerklasse ? input.steuerklasse : null,
    bl: input.bundesland !== defaultInput.bundesland ? input.bundesland : null,
    ks: input.kirchensteuer !== defaultInput.kirchensteuer ? (input.kirchensteuer ? 1 : 0) : null,
  });

  // Auto-calculate on every input change
  useEffect(() => {
    if (input.brutto > 0) {
      setResult(calculateBruttoNetto(input));
    } else {
      setResult(null);
    }
  }, [input]);

  function updateInput<K extends keyof BruttoNettoInput>(key: K, value: BruttoNettoInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

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
        ...(result.kirchensteuer > 0 ? [{ label: 'Kirchensteuer', value: -result.kirchensteuer, percentage: (result.kirchensteuer / result.brutto) * 100, color: 'primary' as const }] : []),
        { label: 'Krankenversicherung', value: -result.krankenversicherung, percentage: (result.krankenversicherung / result.brutto) * 100, color: 'warning' },
        { label: 'Rentenversicherung', value: -result.rentenversicherung, percentage: (result.rentenversicherung / result.brutto) * 100, color: 'warning' },
        { label: 'Arbeitslosenversicherung', value: -result.arbeitslosenversicherung, percentage: (result.arbeitslosenversicherung / result.brutto) * 100, color: 'warning' },
        { label: 'Pflegeversicherung', value: -result.pflegeversicherung, percentage: (result.pflegeversicherung / result.brutto) * 100, color: 'warning' },
      ]
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      {/* Form */}
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Bruttogehalt (monatlich)" htmlFor="brutto" tooltip="Ihr monatliches Bruttogehalt vor allen Abzügen.">
            <CurrencyInput
              id="brutto"
              value={input.brutto}
              onChange={(v) => updateInput('brutto', v)}
              placeholder="z.B. 3.000"
            />
          </InputGroup>

          <InputGroup label="Steuerklasse" htmlFor="stkl">
            <Select
              id="stkl"
              value={input.steuerklasse}
              onChange={(e) => updateInput('steuerklasse', Number(e.target.value) as BruttoNettoInput['steuerklasse'])}
            >
              {STEUERKLASSEN.map((sk) => (
                <option key={sk.id} value={sk.id}>
                  {sk.name} — {sk.description}
                </option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup label="Bundesland" htmlFor="bl">
            <Select
              id="bl"
              value={input.bundesland}
              onChange={(e) => updateInput('bundesland', e.target.value)}
            >
              {BUNDESLAENDER.map((bl) => (
                <option key={bl.id} value={bl.id}>
                  {bl.name}
                </option>
              ))}
            </Select>
          </InputGroup>

          <AdvancedOptions>
            <Toggle
              checked={input.kirchensteuer}
              onChange={(v) => updateInput('kirchensteuer', v)}
              label="Kirchensteuer"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputGroup label="Kinder" htmlFor="pvk" tooltip="Beeinflusst Pflegeversicherung. Kinderlose ab 23 zahlen 0,6% Zuschlag.">
                <Select id="pvk" value={input.pflegeversicherung_kinder} onChange={(e) => updateInput('pflegeversicherung_kinder', Number(e.target.value))}>
                  {[0, 1, 2, 3, 4, 5].map((v) => (
                    <option key={v} value={v}>{v === 0 ? 'Keine Kinder' : `${v} ${v === 1 ? 'Kind' : 'Kinder'}`}</option>
                  ))}
                </Select>
              </InputGroup>
              <InputGroup label="Kinderfreibeträge" htmlFor="kfb" tooltip="Anzahl laut Lohnsteuerkarte.">
                <Select id="kfb" value={input.kinderfreibetraege} onChange={(e) => updateInput('kinderfreibetraege', Number(e.target.value))}>
                  {[0, 0.5, 1, 1.5, 2, 2.5, 3].map((v) => (<option key={v} value={v}>{v}</option>))}
                </Select>
              </InputGroup>
              <InputGroup label="KV-Zusatzbeitrag" htmlFor="kvz" tooltip="Durchschnitt 2026: 2,9%.">
                <Select id="kvz" value={input.kv_zusatzbeitrag} onChange={(e) => updateInput('kv_zusatzbeitrag', Number(e.target.value))}>
                  {[1.5, 1.9, 2.3, 2.5, 2.7, 2.9, 3.1, 3.5].map((v) => (
                    <option key={v} value={v}>{v.toFixed(1).replace('.', ',')}%</option>
                  ))}
                </Select>
              </InputGroup>
              <InputGroup label="Firmenwagen" htmlFor="fw" tooltip="1%-Regel je nach Antrieb.">
                <Select id="fw" value={input.firmenwagen_antrieb} onChange={(e) => updateInput('firmenwagen_antrieb', e.target.value as BruttoNettoInput['firmenwagen_antrieb'])}>
                  <option value="kein">Kein Firmenwagen</option>
                  <option value="verbrenner">Verbrenner (1%)</option>
                  <option value="hybrid">Hybrid (0,5%)</option>
                  <option value="elektro">E-Auto (0,25%)</option>
                </Select>
              </InputGroup>
            </div>

            {input.firmenwagen_antrieb !== 'kein' && (
              <InputGroup label="Bruttolistenpreis" htmlFor="fwp">
                <CurrencyInput id="fwp" value={input.firmenwagen_listenpreis} onChange={(v) => updateInput('firmenwagen_listenpreis', v)} placeholder="z.B. 45.000" />
              </InputGroup>
            )}
          </AdvancedOptions>

          <p className="text-xs text-text-muted text-center">
            Ergebnisse aktualisieren sich automatisch.
          </p>
        </div>
      </Card>

      {/* Results */}
      <div className="lg:col-span-3 space-y-6">
        {result ? (
          <div className="animate-result-in space-y-6">
            {/* Netto Highlight */}
            <Card padding="lg" className="bg-accent-50/50 dark:bg-accent-900/10 border-accent-200 dark:border-accent-800">
              <div className="text-center">
                <p className="text-sm text-text-secondary">Ihr Nettogehalt</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-accent-600 dark:text-accent-400 mt-1">
                  {formatCurrency(result.netto * factor)}
                </p>
                <p className="text-sm text-text-muted mt-1">
                  von {formatCurrency(result.brutto * factor)} brutto ({(result.abgabenquote * 100).toFixed(1).replace('.', ',')}% Abgabenquote)
                </p>
                {/* Period-Toggle: Monat ↔ Jahr — schnelle UX-Verbesserung, keiner muss mehr ×12 rechnen */}
                <div className="mt-3 inline-flex items-center gap-1 rounded-full border border-border bg-surface p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setPeriod('month')}
                    className={period === 'month'
                      ? 'rounded-full bg-accent-600 text-white px-3 py-1'
                      : 'rounded-full text-text-secondary hover:text-text px-3 py-1'}
                    aria-pressed={period === 'month'}
                  >
                    Monat
                  </button>
                  <button
                    type="button"
                    onClick={() => setPeriod('year')}
                    className={period === 'year'
                      ? 'rounded-full bg-accent-600 text-white px-3 py-1'
                      : 'rounded-full text-text-secondary hover:text-text px-3 py-1'}
                    aria-pressed={period === 'year'}
                  >
                    Jahr
                  </button>
                </div>
              </div>
            </Card>

            {/* Chart */}
            <Card padding="lg">
              <ResultsChart
                segments={chartSegments}
                centerLabel="Netto"
                centerValue={formatCurrency(result.netto)}
              />
            </Card>

            {/* Breakdown */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-text">Aufschlüsselung der Abzüge</h3>
              <BreakdownTable
                items={breakdownItems}
                totalLabel="Nettolohn"
                totalValue={result.netto}
              />
            </div>

            {/* AG-Kosten */}
            <Card padding="md" className="bg-surface-raised">
              <h4 className="text-sm font-semibold text-text mb-2">Arbeitgeberkosten</h4>
              <p className="text-sm text-text-secondary">
                Gesamtkosten für den Arbeitgeber:{' '}
                <span className="font-currency font-semibold text-text">
                  {formatCurrency(result.ag_kosten_gesamt * factor)}
                </span>
                {' '}/ {period === 'year' ? 'Jahr' : 'Monat'}
              </p>
            </Card>
          </div>
        ) : (
          <Card padding="lg" className="flex items-center justify-center min-h-[400px]">
            <div className="text-center space-y-3">
              <Calculator className="h-12 w-12 text-text-muted mx-auto" />
              <p className="text-text-secondary">
                Geben Sie Ihr Bruttogehalt ein, um die Berechnung zu starten.
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
