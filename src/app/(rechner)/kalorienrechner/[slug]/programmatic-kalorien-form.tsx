'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { NumberInput } from '@/components/ui/number-input';
import { Select } from '@/components/ui/select';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateKalorien, type KalorienResult } from '@/lib/calculator/health/kalorien';
import { cn } from '@/lib/utils/cn';

interface Props { gewicht: number; geschlecht: 'mann' | 'frau'; }

export function ProgrammaticKalorienForm({ gewicht: initG, geschlecht: initS }: Props) {
  const [gewicht, setGewicht] = useState(initG);
  const [groesse, setGroesse] = useState(initS === 'mann' ? 178 : 165);
  const [alter, setAlter] = useState(30);
  const [geschlecht, setGeschlecht] = useState(initS);
  const [aktivitaet, setAktivitaet] = useState<'sitzend'|'leicht'|'moderat'|'aktiv'|'sehr-aktiv'>('moderat');
  const [result, setResult] = useState<KalorienResult | null>(null);

  useEffect(() => {
    if (gewicht > 0 && groesse > 0 && alter > 0) {
      setResult(calculateKalorien({ gewicht, groesse, alter, geschlecht, aktivitaet, ziel: 'halten' }));
    }
  }, [gewicht, groesse, alter, geschlecht, aktivitaet]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
          <InputGroup label="Gewicht (kg)" htmlFor="g"><NumberInput id="g" value={gewicht} onChange={setGewicht} /></InputGroup>
          <InputGroup label="Gr\u00f6\u00dfe (cm)" htmlFor="h"><NumberInput id="h" value={groesse} onChange={setGroesse} /></InputGroup>
          <InputGroup label="Alter" htmlFor="a"><NumberInput id="a" value={alter} onChange={setAlter} /></InputGroup>
          <InputGroup label="Aktivit\u00e4t" htmlFor="ak">
            <Select id="ak" value={aktivitaet} onChange={(e) => setAktivitaet(e.target.value as typeof aktivitaet)}>
              <option value="sitzend">Sitzend</option><option value="leicht">Leicht aktiv</option><option value="moderat">Moderat aktiv</option><option value="aktiv">Sehr aktiv</option><option value="sehr-aktiv">Extrem aktiv</option>
            </Select>
          </InputGroup>
        </div>
      </Card>
      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-4">
            <Card padding="lg" className="border-primary-200 dark:border-primary-800 bg-primary-50/30 dark:bg-primary-900/10 text-center">
              <p className="text-sm text-text-secondary">Täglicher Gesamtumsatz</p>
              <p className="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400">{result.gesamtumsatz.toLocaleString('de-DE')} kcal</p>
            </Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Grundumsatz</p>
                <p className="text-2xl font-bold text-text mt-1">{result.grundumsatz.toLocaleString('de-DE')} kcal</p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Zum Abnehmen (-20%)</p>
                <p className="text-2xl font-bold text-negative-500 mt-1">{Math.round(result.gesamtumsatz * 0.8).toLocaleString('de-DE')} kcal</p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
