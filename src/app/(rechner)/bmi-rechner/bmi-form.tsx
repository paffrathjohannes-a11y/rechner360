'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { NumberInput } from '@/components/ui/number-input';
import { Select } from '@/components/ui/select';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateBmi, type BmiResult } from '@/lib/calculator/health/bmi';
import { cn } from '@/lib/utils/cn';
import { useUrlStateRead, useUrlStateSync, parsers } from '@/hooks/use-url-state';

const farbeMap = {
  accent: { bg: 'bg-accent-50/50 dark:bg-accent-900/10', border: 'border-accent-200 dark:border-accent-800', text: 'text-accent-600 dark:text-accent-400' },
  primary: { bg: 'bg-primary-50/50 dark:bg-primary-900/10', border: 'border-primary-200 dark:border-primary-800', text: 'text-primary-600 dark:text-primary-400' },
  warning: { bg: 'bg-warning-50/50 dark:bg-warning-500/10', border: 'border-warning-400/30 dark:border-warning-500/30', text: 'text-warning-600 dark:text-warning-400' },
  negative: { bg: 'bg-negative-50/50 dark:bg-negative-900/10', border: 'border-negative-200 dark:border-negative-800', text: 'text-negative-600 dark:text-negative-400' },
};

export function BmiForm() {
  const [gewicht, setGewicht] = useState(75);
  const [groesse, setGroesse] = useState(175);
  const [alter, setAlter] = useState(30);
  const [geschlecht, setGeschlecht] = useState<'mann' | 'frau'>('mann');

  // URL-State: ?g=175&w=75&a=30&s=m
  const urlOverrides = useUrlStateRead<{
    g: number; w: number; a: number; s: string;
  }>({ g: parsers.int, w: parsers.int, a: parsers.int, s: parsers.str });
  useEffect(() => {
    // Externer Input (URL) wird einmalig nach Mount in den State gespiegelt.
    // setState im Effect ist hier korrekt: wir synchronisieren mit einem
    // externen System, nicht mit anderem React-State.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (urlOverrides.g !== undefined && urlOverrides.g > 0) setGroesse(urlOverrides.g);
    if (urlOverrides.w !== undefined && urlOverrides.w > 0) setGewicht(urlOverrides.w);
    if (urlOverrides.a !== undefined && urlOverrides.a > 0) setAlter(urlOverrides.a);
    if (urlOverrides.s === 'm' || urlOverrides.s === 'f') {
      setGeschlecht(urlOverrides.s === 'm' ? 'mann' : 'frau');
    }
  }, [urlOverrides]);
  useUrlStateSync({
    g: groesse !== 175 ? groesse : null,
    w: gewicht !== 75 ? gewicht : null,
    a: alter !== 30 ? alter : null,
    s: geschlecht !== 'mann' ? (geschlecht === 'frau' ? 'f' : null) : null,
  });

  const result = useMemo<BmiResult | null>(() => {
    if (gewicht <= 0 || groesse <= 0 || alter <= 0) return null;
    return calculateBmi({ gewicht, groesse, alter, geschlecht });
  }, [gewicht, groesse, alter, geschlecht]);

  // BMI scale position (0-100%)
  const scalePosition = result ? Math.min(Math.max(((result.bmi - 10) / 35) * 100, 0), 100) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      {/* Form */}
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Gewicht (kg)" htmlFor="gewicht">
            <NumberInput
              id="gewicht"
              min={20}
              max={300}
              value={gewicht}
              onChange={setGewicht}
            />
          </InputGroup>

          <InputGroup label="Größe (cm)" htmlFor="groesse">
            <NumberInput
              id="groesse"
              min={100}
              max={250}
              value={groesse}
              onChange={setGroesse}
            />
          </InputGroup>

          <InputGroup label="Alter" htmlFor="alter">
            <NumberInput
              id="alter"
              min={1}
              max={120}
              value={alter}
              onChange={setAlter}
            />
          </InputGroup>

          <InputGroup label="Geschlecht" htmlFor="geschlecht">
            <Select
              id="geschlecht"
              value={geschlecht}
              onChange={(e) => setGeschlecht(e.target.value as 'mann' | 'frau')}
            >
              <option value="mann">Männlich</option>
              <option value="frau">Weiblich</option>
            </Select>
          </InputGroup>

          <p className="text-xs text-text-muted text-center">
            Ergebnisse aktualisieren sich automatisch.
          </p>
        </div>
      </Card>

      {/* Results */}
      <div className="lg:col-span-3 space-y-6">
        {result ? (
          <div className="animate-result-in space-y-6">
            {/* BMI Value */}
            <Card padding="lg" className={cn(farbeMap[result.farbe].bg, farbeMap[result.farbe].border, 'border')}>
              <div className="text-center space-y-2">
                <p className="text-sm text-text-secondary">Ihr BMI</p>
                <p className={cn('text-3xl sm:text-4xl lg:text-5xl font-bold font-currency truncate', farbeMap[result.farbe].text)}>
                  {result.bmi.toFixed(1).replace('.', ',')}
                </p>
                <p className={cn('text-lg font-semibold', farbeMap[result.farbe].text)}>
                  {result.kategorieLabel}
                </p>
                <p className="text-sm text-text-secondary max-w-md mx-auto">
                  {result.beschreibung}
                </p>
              </div>
            </Card>

            {/* BMI Scale Bar */}
            <Card padding="md">
              <p className="text-sm font-medium text-text mb-3">BMI-Skala</p>
              <div className="relative h-6 rounded-full overflow-hidden flex">
                <div className="flex-1 bg-negative-400/60" title="Untergewicht" />
                <div className="flex-1 bg-warning-400/60" title="Leichtes Untergewicht" />
                <div className="flex-[2] bg-accent-400/60" title="Normalgewicht" />
                <div className="flex-1 bg-warning-400/60" title="Übergewicht" />
                <div className="flex-1 bg-negative-400/60" title="Adipositas I" />
                <div className="flex-1 bg-negative-500/60" title="Adipositas II+" />
              </div>
              {/* Marker */}
              <div className="relative h-4 mt-1">
                <div
                  className="absolute -top-1 w-0.5 h-5 bg-text rounded-full transition-all duration-300"
                  style={{ left: `${scalePosition}%` }}
                />
                <div
                  className="absolute top-4 -translate-x-1/2 text-xs font-currency font-medium text-text transition-all duration-300"
                  style={{ left: `${scalePosition}%` }}
                >
                  {result.bmi.toFixed(1).replace('.', ',')}
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-text-muted mt-4">
                <span>10</span>
                <span>18,5</span>
                <span>25</span>
                <span>30</span>
                <span>35</span>
                <span>45</span>
              </div>
            </Card>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Idealgewicht</p>
                <p className="text-lg font-bold font-currency text-accent-500 mt-1">
                  {result.idealgewichtMin.toFixed(1).replace('.', ',')} – {result.idealgewichtMax.toFixed(1).replace('.', ',')} kg
                </p>
                <p className="text-sm text-text-muted">BMI 18,5 – 24,9</p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">
                  {result.differenz > 0 ? 'Zu viel' : result.differenz < 0 ? 'Zu wenig' : 'Im Idealbereich'}
                </p>
                <p className={cn(
                  'text-lg font-bold font-currency mt-1',
                  result.differenz === 0 ? 'text-accent-500' : result.differenz > 0 ? 'text-warning-500' : 'text-primary-500',
                )}>
                  {result.differenz === 0
                    ? 'Perfekt'
                    : `${result.differenz > 0 ? '+' : ''}${result.differenz.toFixed(1).replace('.', ',')} kg`
                  }
                </p>
                <p className="text-sm text-text-muted">
                  {result.differenz > 0 ? 'bis Idealgewicht' : result.differenz < 0 ? 'bis Idealgewicht' : ''}
                </p>
              </Card>
            </div>
          </div>
        ) : (
          <Card padding="lg" className="flex items-center justify-center min-h-[300px]">
            <p className="text-text-secondary">Geben Sie Ihre Daten ein.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
