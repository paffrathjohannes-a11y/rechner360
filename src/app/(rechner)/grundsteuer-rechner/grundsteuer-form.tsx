'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { NumberInput } from '@/components/ui/number-input';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateGrundsteuer, type GrundsteuerResult } from '@/lib/calculator/immobilien/grundsteuer';
import { formatCurrency } from '@/lib/utils/format';

const LAENDERMODELL_STATES: Record<string, string> = {
  'by': 'Bayern',
  'bw': 'Baden-Württemberg',
  'hh': 'Hamburg',
  'he': 'Hessen',
  'ni': 'Niedersachsen',
};

const BUNDESLAENDER = [
  { value: '', label: 'Bitte wählen' },
  { value: 'bw', label: 'Baden-Württemberg' },
  { value: 'by', label: 'Bayern' },
  { value: 'be', label: 'Berlin' },
  { value: 'bb', label: 'Brandenburg' },
  { value: 'hb', label: 'Bremen' },
  { value: 'hh', label: 'Hamburg' },
  { value: 'he', label: 'Hessen' },
  { value: 'mv', label: 'Mecklenburg-Vorpommern' },
  { value: 'ni', label: 'Niedersachsen' },
  { value: 'nw', label: 'Nordrhein-Westfalen' },
  { value: 'rp', label: 'Rheinland-Pfalz' },
  { value: 'sl', label: 'Saarland' },
  { value: 'sn', label: 'Sachsen' },
  { value: 'st', label: 'Sachsen-Anhalt' },
  { value: 'sh', label: 'Schleswig-Holstein' },
  { value: 'th', label: 'Thüringen' },
];

export function GrundsteuerForm() {
  const [grundstueck, setGrundstueck] = useState(500);
  const [bodenrichtwert, setBodenrichtwert] = useState(150);
  const [wohnflaeche, setWohnflaeche] = useState(140);
  const [baujahr, setBaujahr] = useState(1990);
  const [gebaeudeart, setGebaeudeart] = useState<'efh'|'dhh'|'rh'|'etw'|'mfh'>('efh');
  const [hebesatz, setHebesatz] = useState(400);
  const [nutzung, setNutzung] = useState<'wohnen' | 'gewerbe'>('wohnen');
  const [bundesland, setBundesland] = useState('');
  const [result, setResult] = useState<GrundsteuerResult | null>(null);

  const isLaendermodell = bundesland !== '' && bundesland in LAENDERMODELL_STATES;

  useEffect(() => {
    if (grundstueck <= 0 || wohnflaeche <= 0) { setResult(null); return; }
    setResult(calculateGrundsteuer({ grundstuecksflaeche: grundstueck, bodenrichtwert, wohnflaeche, baujahr, gebaeudeart, hebesatz, nutzung }));
  }, [grundstueck, bodenrichtwert, wohnflaeche, baujahr, gebaeudeart, hebesatz, nutzung]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
          <InputGroup label="Bundesland" htmlFor="bundesland" tooltip="Einige Bundesländer nutzen eigene Berechnungsmodelle statt des Bundesmodells.">
            <Select id="bundesland" value={bundesland} onChange={(e) => setBundesland(e.target.value)}>
              {BUNDESLAENDER.map((bl) => (
                <option key={bl.value} value={bl.value}>{bl.label}</option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup label="Nutzung" htmlFor="nutzung" tooltip="Wohngrundstücke: Steuermesszahl 0,031%. Geschäftsgrundstücke: 0,034%.">
            <Select id="nutzung" value={nutzung} onChange={(e) => setNutzung(e.target.value as 'wohnen' | 'gewerbe')}>
              <option value="wohnen">Wohngrundstück</option>
              <option value="gewerbe">Geschäftsgrundstück</option>
            </Select>
          </InputGroup>

          <InputGroup label="Grundstücksfläche (m²)" htmlFor="flaeche">
            <NumberInput id="flaeche" min={50} max={5000} value={grundstueck} onChange={setGrundstueck} />
          </InputGroup>
          <InputGroup label="Bodenrichtwert (€/m²)" htmlFor="brw" tooltip="Den Bodenrichtwert finden Sie auf boris.de oder beim Gutachterausschuss Ihrer Gemeinde.">
            <CurrencyInput id="brw" value={bodenrichtwert} onChange={setBodenrichtwert} suffix="€/m²" />
          </InputGroup>
          <InputGroup label="Wohnfläche (m²)" htmlFor="wf">
            <NumberInput id="wf" min={30} max={500} value={wohnflaeche} onChange={setWohnflaeche} />
          </InputGroup>
          <InputGroup label="Baujahr" htmlFor="bj">
            <NumberInput id="bj" min={1900} max={2026} value={baujahr} onChange={setBaujahr} />
          </InputGroup>
          <InputGroup label="Gebäudeart" htmlFor="ga">
            <Select id="ga" value={gebaeudeart} onChange={(e) => setGebaeudeart(e.target.value as typeof gebaeudeart)}>
              <option value="efh">Einfamilienhaus</option>
              <option value="dhh">Doppelhaushälfte</option>
              <option value="rh">Reihenhaus</option>
              <option value="etw">Eigentumswohnung</option>
              <option value="mfh">Mehrfamilienhaus</option>
            </Select>
          </InputGroup>
          <InputGroup label="Hebesatz (%)" htmlFor="hs" tooltip="Den Hebesatz Ihrer Kommune finden Sie auf der Website Ihrer Stadt/Gemeinde.">
            <NumberInput id="hs" min={100} max={1000} value={hebesatz} onChange={setHebesatz} />
          </InputGroup>
          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-6">
            {isLaendermodell && (
              <Card padding="md" className="border-warning-300 dark:border-warning-600 bg-warning-50/30 dark:bg-warning-500/5">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-warning-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /></svg>
                  <div>
                    <p className="font-semibold text-text">Hinweis: {LAENDERMODELL_STATES[bundesland]} nutzt ein eigenes Berechnungsmodell</p>
                    <p className="text-sm text-text-secondary mt-1">
                      Dieser Rechner verwendet das Bundesmodell. Bayern, Baden-Württemberg, Hamburg, Hessen und Niedersachsen haben eigene Grundsteuer-Modelle verabschiedet.
                      Die tatsächliche Grundsteuer in {LAENDERMODELL_STATES[bundesland]} kann daher erheblich von diesem Ergebnis abweichen.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            <Card padding="lg" className="border-primary-200 dark:border-primary-800 bg-primary-50/30 dark:bg-primary-900/10 text-center">
              <p className="text-sm text-text-secondary">Ihre Grundsteuer pro Jahr</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-primary-600 dark:text-primary-400">{formatCurrency(result.grundsteuerJahr)}</p>
              <p className="text-sm text-text-muted">{formatCurrency(result.grundsteuerMonat)} / Monat</p>
            </Card>

            <Card padding="none">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-border hover:bg-surface-raised transition-colors">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-text-secondary">Bodenwert ({grundstueck} m² × {bodenrichtwert} €)</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-right font-currency font-medium text-text">{formatCurrency(result.bodenwert)}</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-surface-raised transition-colors">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-text-secondary">Gebäudewert (abzgl. Alterswertminderung)</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-right font-currency font-medium text-text">{formatCurrency(result.gebaeudewert)}</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-surface-raised transition-colors bg-surface-sunken">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 font-semibold text-text">Grundsteuerwert</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-right font-currency font-bold text-text">{formatCurrency(result.grundsteuerwert)}</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-surface-raised transition-colors">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-text-secondary">× Steuermesszahl ({(result.steuermesszahl * 100).toFixed(3)}%)</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-right font-currency font-medium text-text">{formatCurrency(result.steuermessbetrag)}</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-surface-raised transition-colors">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-text-secondary">× Hebesatz ({hebesatz}%)</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-right font-currency font-medium text-text">{formatCurrency(result.grundsteuerJahr)}</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr className="bg-primary-50/30 dark:bg-primary-900/10">
                    <td className="px-3 sm:px-4 py-2 sm:py-3 font-bold text-primary-600">Grundsteuer pro Jahr</td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-right font-currency font-bold text-primary-600">{formatCurrency(result.grundsteuerJahr)}</td>
                  </tr>
                </tfoot>
              </table>
            </Card>

            <p className="text-sm text-text-muted">
              Hinweis: Dies ist eine vereinfachte Berechnung nach dem Bundesmodell. Die tatsächliche Grundsteuer kann abweichen.
              Bayern, Baden-Württemberg, Hamburg, Hessen und Niedersachsen nutzen eigene Ländermodelle.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
