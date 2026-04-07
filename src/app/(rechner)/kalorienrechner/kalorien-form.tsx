'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateKalorien, type KalorienResult } from '@/lib/calculator/health/kalorien';
import { cn } from '@/lib/utils/cn';

export function KalorienForm() {
  const [gewicht, setGewicht] = useState(75);
  const [groesse, setGroesse] = useState(175);
  const [alter, setAlter] = useState(30);
  const [geschlecht, setGeschlecht] = useState<'mann' | 'frau'>('mann');
  const [aktivitaet, setAktivitaet] = useState<'sitzend' | 'leicht' | 'moderat' | 'aktiv' | 'sehr-aktiv'>('moderat');
  const [ziel, setZiel] = useState<'abnehmen' | 'halten' | 'zunehmen'>('halten');
  const [result, setResult] = useState<KalorienResult | null>(null);

  useEffect(() => {
    if (gewicht > 0 && groesse > 0 && alter > 0) {
      setResult(calculateKalorien({ gewicht, groesse, alter, geschlecht, aktivitaet, ziel }));
    }
  }, [gewicht, groesse, alter, geschlecht, aktivitaet, ziel]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
          <InputGroup label="Gewicht (kg)" htmlFor="gewicht">
            <Input id="gewicht" type="number" min={30} max={300} value={gewicht} onChange={(e) => setGewicht(Number(e.target.value))} />
          </InputGroup>
          <InputGroup label="Gr&ouml;&szlig;e (cm)" htmlFor="groesse">
            <Input id="groesse" type="number" min={100} max={250} value={groesse} onChange={(e) => setGroesse(Number(e.target.value))} />
          </InputGroup>
          <InputGroup label="Alter" htmlFor="alter">
            <Input id="alter" type="number" min={10} max={100} value={alter} onChange={(e) => setAlter(Number(e.target.value))} />
          </InputGroup>
          <InputGroup label="Geschlecht" htmlFor="geschlecht">
            <Select id="geschlecht" value={geschlecht} onChange={(e) => setGeschlecht(e.target.value as 'mann' | 'frau')}>
              <option value="mann">M&auml;nnlich</option>
              <option value="frau">Weiblich</option>
            </Select>
          </InputGroup>
          <InputGroup label="Aktivit&auml;t" htmlFor="aktivitaet">
            <Select id="aktivitaet" value={aktivitaet} onChange={(e) => setAktivitaet(e.target.value as typeof aktivitaet)}>
              <option value="sitzend">Sitzend (kaum Bewegung)</option>
              <option value="leicht">Leicht aktiv (1-3x Sport/Woche)</option>
              <option value="moderat">Moderat aktiv (3-5x Sport/Woche)</option>
              <option value="aktiv">Sehr aktiv (6-7x Sport/Woche)</option>
              <option value="sehr-aktiv">Extrem aktiv (Leistungssport)</option>
            </Select>
          </InputGroup>
          <InputGroup label="Ziel" htmlFor="ziel">
            <Select id="ziel" value={ziel} onChange={(e) => setZiel(e.target.value as typeof ziel)}>
              <option value="abnehmen">Abnehmen (-20%)</option>
              <option value="halten">Gewicht halten</option>
              <option value="zunehmen">Zunehmen (+15%)</option>
            </Select>
          </InputGroup>
          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-6">
            <Card padding="lg" className={cn(
              'border text-center',
              ziel === 'abnehmen' ? 'border-negative-200 dark:border-negative-800 bg-negative-50/30 dark:bg-negative-900/10' :
              ziel === 'zunehmen' ? 'border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10' :
              'border-primary-200 dark:border-primary-800 bg-primary-50/30 dark:bg-primary-900/10',
            )}>
              <p className="text-sm text-text-secondary">Ihre Zielkalorien pro Tag</p>
              <p className={cn(
                'text-3xl sm:text-4xl font-bold mt-1',
                ziel === 'abnehmen' ? 'text-negative-600 dark:text-negative-400' :
                ziel === 'zunehmen' ? 'text-accent-600 dark:text-accent-400' :
                'text-primary-600 dark:text-primary-400',
              )}>
                {result.zielKalorien.toLocaleString('de-DE')} kcal
              </p>
              {result.differenz !== 0 && (
                <p className="text-sm text-text-muted mt-1">
                  {result.differenz > 0 ? '+' : ''}{result.differenz.toLocaleString('de-DE')} kcal vs. Gesamtumsatz
                </p>
              )}
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card padding="md" className="text-center">
                <p className="text-xs text-text-muted">Grundumsatz (BMR)</p>
                <p className="text-2xl font-bold text-text mt-1">{result.grundumsatz.toLocaleString('de-DE')} kcal</p>
                <p className="text-xs text-text-muted">Ruhezustand</p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-xs text-text-muted">Gesamtumsatz (TDEE)</p>
                <p className="text-2xl font-bold text-primary-500 mt-1">{result.gesamtumsatz.toLocaleString('de-DE')} kcal</p>
                <p className="text-xs text-text-muted">Faktor &times;{result.aktivitaetsFaktor}</p>
              </Card>
            </div>

            {ziel === 'abnehmen' && (
              <Card padding="md" className="bg-surface-raised">
                <p className="text-sm text-text-secondary">
                  Mit einem Defizit von {Math.abs(result.differenz).toLocaleString('de-DE')} kcal/Tag
                  k&ouml;nnen Sie ca. <strong className="text-text">{(Math.abs(result.differenz) * 7 / 7700).toFixed(1).replace('.', ',')} kg pro Woche</strong> abnehmen.
                </p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
