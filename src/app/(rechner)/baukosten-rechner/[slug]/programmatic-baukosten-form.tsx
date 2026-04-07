'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { NumberInput } from '@/components/ui/number-input';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateBaukosten, type BaukostenResult } from '@/lib/calculator/immobilien/baukosten';
import { formatCurrency } from '@/lib/utils/format';

interface Props { wohnflaeche: number; }

export function ProgrammaticBaukostenForm({ wohnflaeche: initWf }: Props) {
  const [wohnflaeche, setWohnflaeche] = useState(initWf);
  const [ausstattung, setAusstattung] = useState<'einfach'|'mittel'|'gehoben'|'luxus'>('mittel');
  const [bauweise, setBauweise] = useState<'massiv'|'fertighaus'>('massiv');
  const [grundstueck, setGrundstueck] = useState(80000);
  const [result, setResult] = useState<BaukostenResult | null>(null);

  useEffect(() => {
    if (wohnflaeche <= 0) { setResult(null); return; }
    setResult(calculateBaukosten({ wohnflaeche, ausstattung, bauweise, keller: true, garage: 'einzelgarage', grundstueckspreis: grundstueck, region: 'mittel' }));
  }, [wohnflaeche, ausstattung, bauweise, grundstueck]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
          <InputGroup label="Wohnfläche (m²)" htmlFor="wf"><NumberInput id="wf" value={wohnflaeche} onChange={setWohnflaeche} suffix="m²" /></InputGroup>
          <InputGroup label="Ausstattung" htmlFor="a">
            <Select id="a" value={ausstattung} onChange={(e) => setAusstattung(e.target.value as typeof ausstattung)}>
              <option value="einfach">Einfach</option><option value="mittel">Mittel</option><option value="gehoben">Gehoben</option><option value="luxus">Luxus</option>
            </Select>
          </InputGroup>
          <InputGroup label="Bauweise" htmlFor="bw">
            <Select id="bw" value={bauweise} onChange={(e) => setBauweise(e.target.value as typeof bauweise)}>
              <option value="massiv">Massivhaus</option><option value="fertighaus">Fertighaus</option>
            </Select>
          </InputGroup>
          <InputGroup label="Grundstückspreis" htmlFor="gp"><CurrencyInput id="gp" value={grundstueck} onChange={setGrundstueck} /></InputGroup>
        </div>
      </Card>
      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-4">
            <Card padding="lg" className="border-primary-200 dark:border-primary-800 bg-primary-50/30 dark:bg-primary-900/10 text-center">
              <p className="text-sm text-text-secondary">Gesamtkosten Hausbau</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-primary-600 dark:text-primary-400">{formatCurrency(result.gesamtkosten)}</p>
              <p className="text-sm text-text-muted">{formatCurrency(result.baukostenProQm)}/m² · {wohnflaeche} m²</p>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card padding="md" className="text-center"><p className="text-sm text-text-muted">Baukosten</p><p className="text-xl font-bold font-currency text-text mt-1">{formatCurrency(result.baukostenGesamt)}</p></Card>
              <Card padding="md" className="text-center"><p className="text-sm text-text-muted">Nebenkosten</p><p className="text-xl font-bold font-currency text-text mt-1">{formatCurrency(result.baunebenkosten)}</p></Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
