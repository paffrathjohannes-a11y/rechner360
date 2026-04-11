'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { NumberInput } from '@/components/ui/number-input';
import { InputGroup } from '@/components/calculator/input-group';
import { prozentAnteil } from '@/lib/calculator/math/prozent';

interface Props { prozent: number; grundwert: number; }

export function ProgrammaticProzentForm({ prozent: initP, grundwert: initG }: Props) {
  const [prozent, setProzent] = useState(initP);
  const [grundwert, setGrundwert] = useState(initG);
  const result = prozentAnteil(prozent, grundwert);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Prozentsatz" htmlFor="p"><NumberInput id="p" value={prozent} onChange={setProzent} suffix="%" /></InputGroup>
          <InputGroup label="Grundwert" htmlFor="g"><NumberInput id="g" value={grundwert} onChange={setGrundwert} /></InputGroup>
        </div>
      </Card>
      <div className="lg:col-span-3">
        <Card padding="lg" className="border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10 text-center">
          <p className="text-sm text-text-secondary">Ergebnis</p>
          <p className="text-3xl sm:text-4xl font-bold font-currency text-accent-600 dark:text-accent-400">
            {result.ergebnis.toLocaleString('de-DE', { maximumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-text-muted mt-2">{result.formel}</p>
        </Card>
      </div>
    </div>
  );
}
