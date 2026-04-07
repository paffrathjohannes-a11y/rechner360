'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateBmi, type BmiResult } from '@/lib/calculator/health/bmi';
import { cn } from '@/lib/utils/cn';

const farbeMap = {
  accent: { bg: 'bg-accent-50/50 dark:bg-accent-900/10', border: 'border-accent-200 dark:border-accent-800', text: 'text-accent-600 dark:text-accent-400' },
  primary: { bg: 'bg-primary-50/50 dark:bg-primary-900/10', border: 'border-primary-200 dark:border-primary-800', text: 'text-primary-600 dark:text-primary-400' },
  warning: { bg: 'bg-warning-50/50 dark:bg-warning-500/10', border: 'border-warning-400/30 dark:border-warning-500/30', text: 'text-warning-600 dark:text-warning-400' },
  negative: { bg: 'bg-negative-50/50 dark:bg-negative-900/10', border: 'border-negative-200 dark:border-negative-800', text: 'text-negative-600 dark:text-negative-400' },
};

interface Props { gewicht: number; groesse: number; }

export function ProgrammaticBmiForm({ gewicht: initG, groesse: initH }: Props) {
  const [gewicht, setGewicht] = useState(initG);
  const [groesse, setGroesse] = useState(initH);
  const [result, setResult] = useState<BmiResult | null>(null);

  useEffect(() => {
    if (gewicht > 0 && groesse > 0) {
      setResult(calculateBmi({ gewicht, groesse, alter: 30, geschlecht: 'mann' }));
    }
  }, [gewicht, groesse]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
          <InputGroup label="Gewicht (kg)" htmlFor="g">
            <Input id="g" type="number" value={gewicht} onChange={setGewicht} />
          </InputGroup>
          <InputGroup label="Gr\u00f6\u00dfe (cm)" htmlFor="h">
            <Input id="h" type="number" value={groesse} onChange={setGroesse} />
          </InputGroup>
        </div>
      </Card>
      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-6">
            <Card padding="lg" className={cn(farbeMap[result.farbe].bg, farbeMap[result.farbe].border, 'border')}>
              <div className="text-center space-y-2">
                <p className="text-sm text-text-secondary">Ihr BMI</p>
                <p className={cn('text-3xl sm:text-4xl lg:text-5xl font-bold font-currency truncate', farbeMap[result.farbe].text)}>{result.bmi.toFixed(1).replace('.', ',')}</p>
                <p className={cn('text-lg font-semibold', farbeMap[result.farbe].text)}>{result.kategorieLabel}</p>
                <p className="text-sm text-text-secondary">{result.beschreibung}</p>
              </div>
            </Card>
            <div className="grid grid-cols-2 gap-4">
              <Card padding="md" className="text-center">
                <p className="text-xs text-text-muted">Idealgewicht</p>
                <p className="text-lg font-bold font-currency text-accent-500 mt-1">{result.idealgewichtMin.toFixed(1).replace('.', ',')} – {result.idealgewichtMax.toFixed(1).replace('.', ',')} kg</p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-xs text-text-muted">{result.differenz > 0 ? 'Zu viel' : result.differenz < 0 ? 'Zu wenig' : 'Ideal'}</p>
                <p className={cn('text-lg font-bold font-currency mt-1', result.differenz === 0 ? 'text-accent-500' : 'text-warning-500')}>
                  {result.differenz === 0 ? 'Perfekt' : `${result.differenz > 0 ? '+' : ''}${result.differenz.toFixed(1).replace('.', ',')} kg`}
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
