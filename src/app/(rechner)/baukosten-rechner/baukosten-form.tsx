'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { NumberInput } from '@/components/ui/number-input';
import { Select } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { ResultsChart } from '@/components/calculator/results-chart';
import { calculateBaukosten, type BaukostenResult } from '@/lib/calculator/immobilien/baukosten';
import { formatCurrency } from '@/lib/utils/format';
import type { ChartSegment } from '@/types/calculator';

export function BaukostenForm() {
  const [wohnflaeche, setWohnflaeche] = useState(140);
  const [ausstattung, setAusstattung] = useState<'einfach'|'mittel'|'gehoben'|'luxus'>('mittel');
  const [bauweise, setBauweise] = useState<'massiv'|'fertighaus'>('massiv');
  const [keller, setKeller] = useState(true);
  const [garage, setGarage] = useState<'keine'|'einzelgarage'|'doppelgarage'|'carport'>('einzelgarage');
  const [grundstueck, setGrundstueck] = useState(80000);
  const [region, setRegion] = useState<'guenstig'|'mittel'|'teuer'>('mittel');
  const [result, setResult] = useState<BaukostenResult | null>(null);

  useEffect(() => {
    if (wohnflaeche <= 0) { setResult(null); return; }
    setResult(calculateBaukosten({ wohnflaeche, ausstattung, bauweise, keller, garage, grundstueckspreis: grundstueck, region }));
  }, [wohnflaeche, ausstattung, bauweise, keller, garage, grundstueck, region]);

  const chartSegments: ChartSegment[] = result
    ? result.aufschluesselung.map((item, i) => ({
        label: item.label.replace(/\s*\(.*\)/, ''),
        value: item.betrag,
        color: ['var(--color-primary-500)', 'var(--color-accent-500)', 'var(--color-warning-500)', 'var(--color-negative-400)', '#8B5CF6', '#EC4899'][i] || 'var(--color-text-muted)',
        percentage: item.prozent,
      }))
    : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
          <InputGroup label="Wohnfläche (m²)" htmlFor="flaeche">
            <NumberInput id="flaeche" min={50} max={500} value={wohnflaeche} onChange={setWohnflaeche} />
          </InputGroup>
          <InputGroup label="Ausstattung" htmlFor="ausstattung">
            <Select id="ausstattung" value={ausstattung} onChange={(e) => setAusstattung(e.target.value as typeof ausstattung)}>
              <option value="einfach">Einfach</option>
              <option value="mittel">Mittel (Standard)</option>
              <option value="gehoben">Gehoben</option>
              <option value="luxus">Luxus</option>
            </Select>
          </InputGroup>
          <InputGroup label="Bauweise" htmlFor="bauweise">
            <Select id="bauweise" value={bauweise} onChange={(e) => setBauweise(e.target.value as typeof bauweise)}>
              <option value="massiv">Massivhaus</option>
              <option value="fertighaus">Fertighaus</option>
            </Select>
          </InputGroup>
          <InputGroup label="Region" htmlFor="region" tooltip="Beeinflusst die Baukosten: ländlich ca. -15%, Großstadt ca. +25%.">
            <Select id="region" value={region} onChange={(e) => setRegion(e.target.value as typeof region)}>
              <option value="guenstig">Ländlich / günstig (-15%)</option>
              <option value="mittel">Durchschnitt</option>
              <option value="teuer">Großstadt / teuer (+25%)</option>
            </Select>
          </InputGroup>
          <div className="space-y-3">
            <Toggle checked={keller} onChange={setKeller} label="Mit Keller" />
          </div>
          <InputGroup label="Garage" htmlFor="garage">
            <Select id="garage" value={garage} onChange={(e) => setGarage(e.target.value as typeof garage)}>
              <option value="keine">Keine</option>
              <option value="carport">Carport</option>
              <option value="einzelgarage">Einzelgarage</option>
              <option value="doppelgarage">Doppelgarage</option>
            </Select>
          </InputGroup>
          <InputGroup label="Grundstückspreis" htmlFor="grundstueck">
            <CurrencyInput id="grundstueck" value={grundstueck} onChange={setGrundstueck} />
          </InputGroup>
          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-6">
            <Card padding="lg" className="border-primary-200 dark:border-primary-800 bg-primary-50/30 dark:bg-primary-900/10">
              <div className="text-center space-y-1">
                <p className="text-sm text-text-secondary">Gesamtkosten Hausbau</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-primary-600 dark:text-primary-400">{formatCurrency(result.gesamtkosten)}</p>
                <p className="text-sm text-text-muted">Baukosten: {formatCurrency(result.baukostenProQm)}/m² · {wohnflaeche} m² {bauweise === 'massiv' ? 'Massiv' : 'Fertig'}</p>
              </div>
            </Card>

            <Card padding="none">
              <table className="w-full text-sm">
                <tbody>
                  {result.aufschluesselung.map((item, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0 hover:bg-surface-raised transition-colors">
                      <td className="px-4 py-3 text-text-secondary">{item.label}</td>
                      <td className="px-4 py-3 text-right font-currency font-medium text-text">{formatCurrency(item.betrag)}</td>
                      <td className="px-4 py-3 text-right text-xs text-text-muted w-16">{item.prozent}%</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-primary-50/30 dark:bg-primary-900/10 border-t border-border">
                    <td className="px-4 py-3 font-bold text-primary-600">Gesamtkosten</td>
                    <td className="px-4 py-3 text-right font-currency font-bold text-primary-600">{formatCurrency(result.gesamtkosten)}</td>
                    <td className="px-4 py-3 text-right text-xs text-text-muted">100%</td>
                  </tr>
                </tfoot>
              </table>
            </Card>

            <Card padding="lg">
              <ResultsChart segments={chartSegments} centerLabel="Gesamt" centerValue={formatCurrency(result.gesamtkosten)} size={200} />
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
