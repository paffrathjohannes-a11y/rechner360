'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputGroup } from '@/components/calculator/input-group';
import { prozentAnteil, prozentSatz, prozentGrundwert, prozentAenderung } from '@/lib/calculator/math/prozent';
import { cn } from '@/lib/utils/cn';

export function ProzentForm() {
  // Modus 1: X% von Y
  const [m1_prozent, setM1Prozent] = useState(25);
  const [m1_grundwert, setM1Grundwert] = useState(200);

  // Modus 2: X ist ?% von Y
  const [m2_anteil, setM2Anteil] = useState(50);
  const [m2_grundwert, setM2Grundwert] = useState(200);

  // Modus 3: X ist Y% von ?
  const [m3_anteil, setM3Anteil] = useState(50);
  const [m3_prozent, setM3Prozent] = useState(25);

  // Modus 4: Von X auf Y
  const [m4_alt, setM4Alt] = useState(80);
  const [m4_neu, setM4Neu] = useState(100);

  const r1 = prozentAnteil(m1_prozent, m1_grundwert);
  const r2 = prozentSatz(m2_anteil, m2_grundwert);
  const r3 = prozentGrundwert(m3_anteil, m3_prozent);
  const r4 = prozentAenderung(m4_alt, m4_neu);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Modus 1 */}
      <Card padding="lg" className="space-y-4">
        <h3 className="text-base font-semibold text-text">Wie viel sind X% von Y?</h3>
        <div className="flex items-end gap-2">
          <InputGroup label="Prozent" htmlFor="m1p" className="flex-1">
            <Input id="m1p" type="number" value={m1_prozent} onChange={(e) => setM1Prozent(Number(e.target.value))} />
          </InputGroup>
          <span className="pb-2.5 text-text-muted font-medium">% von</span>
          <InputGroup label="Grundwert" htmlFor="m1g" className="flex-1">
            <Input id="m1g" type="number" value={m1_grundwert} onChange={(e) => setM1Grundwert(Number(e.target.value))} />
          </InputGroup>
        </div>
        <div className="rounded-lg bg-primary-50/50 dark:bg-primary-900/10 p-3 text-center">
          <p className="text-xs text-text-muted">Ergebnis</p>
          <p className="text-2xl font-bold font-currency text-primary-600 dark:text-primary-400">{r1.ergebnis}</p>
          <p className="text-xs text-text-muted mt-1">{r1.formel}</p>
        </div>
      </Card>

      {/* Modus 2 */}
      <Card padding="lg" className="space-y-4">
        <h3 className="text-base font-semibold text-text">X ist wie viel % von Y?</h3>
        <div className="flex items-end gap-2">
          <InputGroup label="Wert" htmlFor="m2a" className="flex-1">
            <Input id="m2a" type="number" value={m2_anteil} onChange={(e) => setM2Anteil(Number(e.target.value))} />
          </InputGroup>
          <span className="pb-2.5 text-text-muted font-medium">ist ?% von</span>
          <InputGroup label="Grundwert" htmlFor="m2g" className="flex-1">
            <Input id="m2g" type="number" value={m2_grundwert} onChange={(e) => setM2Grundwert(Number(e.target.value))} />
          </InputGroup>
        </div>
        <div className="rounded-lg bg-accent-50/50 dark:bg-accent-900/10 p-3 text-center">
          <p className="text-xs text-text-muted">Ergebnis</p>
          <p className="text-2xl font-bold font-currency text-accent-600 dark:text-accent-400">{r2.ergebnis}%</p>
          <p className="text-xs text-text-muted mt-1">{r2.formel}</p>
        </div>
      </Card>

      {/* Modus 3 */}
      <Card padding="lg" className="space-y-4">
        <h3 className="text-base font-semibold text-text">X ist Y% von was?</h3>
        <div className="flex items-end gap-2">
          <InputGroup label="Wert" htmlFor="m3a" className="flex-1">
            <Input id="m3a" type="number" value={m3_anteil} onChange={(e) => setM3Anteil(Number(e.target.value))} />
          </InputGroup>
          <span className="pb-2.5 text-text-muted font-medium">ist</span>
          <InputGroup label="Prozent" htmlFor="m3p" className="flex-1">
            <Input id="m3p" type="number" value={m3_prozent} onChange={(e) => setM3Prozent(Number(e.target.value))} />
          </InputGroup>
          <span className="pb-2.5 text-text-muted font-medium">% von ?</span>
        </div>
        <div className="rounded-lg bg-warning-50/50 dark:bg-warning-500/10 p-3 text-center">
          <p className="text-xs text-text-muted">Grundwert</p>
          <p className="text-2xl font-bold font-currency text-warning-600 dark:text-warning-400">{r3.ergebnis}</p>
          <p className="text-xs text-text-muted mt-1">{r3.formel}</p>
        </div>
      </Card>

      {/* Modus 4 */}
      <Card padding="lg" className="space-y-4">
        <h3 className="text-base font-semibold text-text">Prozentuale Ver&auml;nderung</h3>
        <div className="flex items-end gap-2">
          <InputGroup label="Alter Wert" htmlFor="m4a" className="flex-1">
            <Input id="m4a" type="number" value={m4_alt} onChange={(e) => setM4Alt(Number(e.target.value))} />
          </InputGroup>
          <span className="pb-2.5 text-text-muted font-medium">&rarr;</span>
          <InputGroup label="Neuer Wert" htmlFor="m4n" className="flex-1">
            <Input id="m4n" type="number" value={m4_neu} onChange={(e) => setM4Neu(Number(e.target.value))} />
          </InputGroup>
        </div>
        <div className={cn(
          'rounded-lg p-3 text-center',
          r4.ergebnis >= 0 ? 'bg-accent-50/50 dark:bg-accent-900/10' : 'bg-negative-50/50 dark:bg-negative-900/10',
        )}>
          <p className="text-xs text-text-muted">Ver&auml;nderung</p>
          <p className={cn(
            'text-2xl font-bold font-currency',
            r4.ergebnis >= 0 ? 'text-accent-600 dark:text-accent-400' : 'text-negative-600 dark:text-negative-400',
          )}>
            {r4.ergebnis >= 0 ? '+' : ''}{r4.ergebnis}%
          </p>
          <p className="text-xs text-text-muted mt-1">{r4.erklaerung}</p>
        </div>
      </Card>
    </div>
  );
}
