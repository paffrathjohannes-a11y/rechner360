'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { NumberInput } from '@/components/ui/number-input';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateStundenlohn, type StundenlohnResult } from '@/lib/calculator/math/stundenlohn';
import { formatCurrency } from '@/lib/utils/format';

export function StundenlohnForm() {
  const [betrag, setBetrag] = useState(3000);
  const [einheit, setEinheit] = useState<'stunde' | 'monat' | 'jahr'>('monat');
  const [stunden, setStunden] = useState(40);
  const [urlaubstage, setUrlaubstage] = useState(28);
  const [feiertage, setFeiertage] = useState(10);

  const result = useMemo<StundenlohnResult | null>(() => {
    if (betrag <= 0) return null;
    return calculateStundenlohn(betrag, einheit, stunden, urlaubstage, feiertage);
  }, [betrag, einheit, stunden, urlaubstage, feiertage]);

  return (
    <div className="space-y-6">
      <Card padding="lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <InputGroup label="Betrag (brutto)" htmlFor="betrag">
            <CurrencyInput id="betrag" value={betrag} onChange={setBetrag} />
          </InputGroup>
          <InputGroup label="Eingabe als" htmlFor="einheit">
            <Select id="einheit" value={einheit} onChange={(e) => setEinheit(e.target.value as typeof einheit)}>
              <option value="stunde">Stundenlohn</option>
              <option value="monat">Monatsgehalt</option>
              <option value="jahr">Jahresgehalt</option>
            </Select>
          </InputGroup>
          <InputGroup label="Wochenstunden" htmlFor="stunden">
            <Select id="stunden" value={stunden} onChange={(e) => setStunden(Number(e.target.value))}>
              {[20, 25, 30, 35, 38.5, 40, 42, 45, 48].map((v) => (
                <option key={v} value={v}>{v}h / Woche</option>
              ))}
            </Select>
          </InputGroup>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <InputGroup label="Urlaubstage / Jahr" htmlFor="urlaub" tooltip="Gesetzliches Minimum: 20 Tage. Durchschnitt in DE: 28 Tage.">
            <NumberInput id="urlaub" min={20} max={40} value={urlaubstage} onChange={setUrlaubstage} suffix="Tage" />
          </InputGroup>
          <InputGroup label="Feiertage / Jahr" htmlFor="feiertage" tooltip="Je nach Bundesland 9–13. Durchschnitt: 10.">
            <NumberInput id="feiertage" min={9} max={13} value={feiertage} onChange={setFeiertage} suffix="Tage" />
          </InputGroup>
        </div>
      </Card>

      {result && (
        <div className="animate-result-in space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card padding="md" className="text-center border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10">
              <p className="text-sm text-text-muted">Stundenlohn (vertraglich)</p>
              <p className="text-xl font-bold font-currency text-accent-600 dark:text-accent-400 mt-1">{formatCurrency(result.stundenlohn)}</p>
            </Card>
            <Card padding="md" className="text-center border-primary-200 dark:border-primary-800 bg-primary-50/30 dark:bg-primary-900/10">
              <p className="text-sm text-text-muted">Effektiver Stundenlohn</p>
              <p className="text-xl font-bold font-currency text-primary-600 dark:text-primary-400 mt-1">{formatCurrency(result.stundenlohnEffektiv)}</p>
              <p className="text-xs text-text-muted mt-1">pro tatsächlich gearbeiteter Stunde</p>
            </Card>
            <Card padding="md" className="text-center">
              <p className="text-sm text-text-muted">Pro Monat</p>
              <p className="text-xl font-bold font-currency text-text mt-1">{formatCurrency(result.monatsgehalt)}</p>
            </Card>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card padding="md" className="text-center">
              <p className="text-sm text-text-muted">Pro Tag</p>
              <p className="text-lg font-bold font-currency text-text mt-1">{formatCurrency(result.tagesgehalt)}</p>
            </Card>
            <Card padding="md" className="text-center">
              <p className="text-sm text-text-muted">Pro Woche</p>
              <p className="text-lg font-bold font-currency text-text mt-1">{formatCurrency(result.wochengehalt)}</p>
            </Card>
            <Card padding="md" className="text-center">
              <p className="text-sm text-text-muted">Pro Jahr</p>
              <p className="text-lg font-bold font-currency text-text mt-1">{formatCurrency(result.jahresgehalt)}</p>
            </Card>
          </div>
          <Card padding="md" className="bg-surface-raised">
            <p className="text-sm text-text-secondary text-center">
              {result.arbeitstageProJahr} Arbeitstage / {result.arbeitsstundenProJahr} Arbeitsstunden pro Jahr (abzgl. {urlaubstage} Urlaubstage + {feiertage} Feiertage)
            </p>
          </Card>
        </div>
      )}
    </div>
  );
}
