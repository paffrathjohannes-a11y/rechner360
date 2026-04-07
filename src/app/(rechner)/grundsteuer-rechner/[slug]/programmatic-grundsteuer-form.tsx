'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { NumberInput } from '@/components/ui/number-input';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateGrundsteuer, type GrundsteuerResult } from '@/lib/calculator/immobilien/grundsteuer';
import { formatCurrency } from '@/lib/utils/format';

interface Props { bundesland: string; }

export function ProgrammaticGrundsteuerForm({ bundesland }: Props) {
  const [grundstueck, setGrundstueck] = useState(500);
  const [bodenrichtwert, setBodenrichtwert] = useState(150);
  const [wohnflaeche, setWohnflaeche] = useState(140);
  const [hebesatz, setHebesatz] = useState(400);
  const [result, setResult] = useState<GrundsteuerResult | null>(null);

  useEffect(() => {
    if (grundstueck <= 0 || wohnflaeche <= 0) { setResult(null); return; }
    setResult(calculateGrundsteuer({ grundstuecksflaeche: grundstueck, bodenrichtwert, wohnflaeche, baujahr: 1990, gebaeudeart: 'efh', hebesatz, nutzung: 'wohnen' }));
  }, [grundstueck, bodenrichtwert, wohnflaeche, hebesatz]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
          <InputGroup label="Grundstücksfläche (m²)" htmlFor="f"><NumberInput id="f" value={grundstueck} onChange={setGrundstueck} suffix="m²" /></InputGroup>
          <InputGroup label="Bodenrichtwert (€/m²)" htmlFor="b"><CurrencyInput id="b" value={bodenrichtwert} onChange={setBodenrichtwert} suffix="€/m²" /></InputGroup>
          <InputGroup label="Wohnfläche (m²)" htmlFor="w"><NumberInput id="w" value={wohnflaeche} onChange={setWohnflaeche} suffix="m²" /></InputGroup>
          <InputGroup label="Hebesatz (%)" htmlFor="h"><NumberInput id="h" value={hebesatz} onChange={setHebesatz} suffix="%" /></InputGroup>
        </div>
      </Card>
      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-4">
            <Card padding="lg" className="border-primary-200 dark:border-primary-800 bg-primary-50/30 dark:bg-primary-900/10 text-center">
              <p className="text-sm text-text-secondary">Grundsteuer pro Jahr</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-primary-600 dark:text-primary-400">{formatCurrency(result.grundsteuerJahr)}</p>
              <p className="text-sm text-text-muted">{formatCurrency(result.grundsteuerMonat)} / Monat</p>
            </Card>
            <div className="grid grid-cols-2 gap-4">
              <Card padding="md" className="text-center"><p className="text-sm text-text-muted">Grundsteuerwert</p><p className="text-xl font-bold font-currency text-text mt-1">{formatCurrency(result.grundsteuerwert)}</p></Card>
              <Card padding="md" className="text-center"><p className="text-sm text-text-muted">Steuermessbetrag</p><p className="text-xl font-bold font-currency text-text mt-1">{formatCurrency(result.steuermessbetrag)}</p></Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
