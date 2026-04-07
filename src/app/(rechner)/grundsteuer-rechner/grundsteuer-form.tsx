'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { NumberInput } from '@/components/ui/number-input';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateGrundsteuer, type GrundsteuerResult } from '@/lib/calculator/immobilien/grundsteuer';
import { formatCurrency } from '@/lib/utils/format';

export function GrundsteuerForm() {
  const [grundstueck, setGrundstueck] = useState(500);
  const [bodenrichtwert, setBodenrichtwert] = useState(150);
  const [wohnflaeche, setWohnflaeche] = useState(140);
  const [baujahr, setBaujahr] = useState(1990);
  const [gebaeudeart, setGebaeudeart] = useState<'efh'|'dhh'|'rh'|'etw'|'mfh'>('efh');
  const [hebesatz, setHebesatz] = useState(400);
  const [result, setResult] = useState<GrundsteuerResult | null>(null);

  useEffect(() => {
    if (grundstueck <= 0 || wohnflaeche <= 0) { setResult(null); return; }
    setResult(calculateGrundsteuer({ grundstuecksflaeche: grundstueck, bodenrichtwert, wohnflaeche, baujahr, gebaeudeart, hebesatz, nutzung: 'wohnen' }));
  }, [grundstueck, bodenrichtwert, wohnflaeche, baujahr, gebaeudeart, hebesatz]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
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
