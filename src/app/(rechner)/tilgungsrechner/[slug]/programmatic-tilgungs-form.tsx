'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateTilgung } from '@/lib/calculator/credit/tilgung';
import { formatCurrency } from '@/lib/utils/format';
import type { TilgungsResult } from '@/types/calculator';

interface Props {
  betrag: number;
  tilgung: number;
}

export function ProgrammaticTilgungsForm({ betrag: initialBetrag, tilgung: initialTilgung }: Props) {
  const [betrag, setBetrag] = useState(initialBetrag);
  const [zinssatz, setZinssatz] = useState(3.5);
  const [tilgung, setTilgung] = useState(initialTilgung);
  const [zinsbindung, setZinsbindung] = useState(10);

  const result = useMemo<TilgungsResult | null>(() => {
    if (betrag <= 0) return null;
    return calculateTilgung({ darlehensbetrag: betrag, zinssatz, anfaengliche_tilgung: tilgung, zinsbindung_jahre: zinsbindung });
  }, [betrag, zinssatz, tilgung, zinsbindung]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Darlehensbetrag" htmlFor="betrag">
            <CurrencyInput id="betrag" value={betrag} onChange={setBetrag} />
          </InputGroup>
          <InputGroup label="Sollzins (% p.a.)" htmlFor="zins">
            <Select id="zins" value={zinssatz} onChange={(e) => setZinssatz(Number(e.target.value))}>
              {[1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0].map((v) => (
                <option key={v} value={v}>{v.toFixed(1).replace('.', ',')} %</option>
              ))}
            </Select>
          </InputGroup>
          <InputGroup label="Anfängliche Tilgung (% p.a.)" htmlFor="tilgung">
            <Select id="tilgung" value={tilgung} onChange={(e) => setTilgung(Number(e.target.value))}>
              {[1, 1.5, 2, 2.5, 3, 3.5, 4, 5].map((v) => (
                <option key={v} value={v}>{typeof v === 'number' && v % 1 !== 0 ? v.toFixed(1).replace('.', ',') : v} %</option>
              ))}
            </Select>
          </InputGroup>
          <InputGroup label="Zinsbindung" htmlFor="zinsbindung">
            <Select id="zinsbindung" value={zinsbindung} onChange={(e) => setZinsbindung(Number(e.target.value))}>
              {[5, 10, 15, 20, 25, 30].map((v) => (
                <option key={v} value={v}>{v} Jahre</option>
              ))}
            </Select>
          </InputGroup>
          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>
      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Monatliche Rate</p>
                <p className="text-2xl font-bold font-currency text-accent-500 mt-1">{formatCurrency(result.monatliche_rate)}</p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Restschuld nach {zinsbindung} J.</p>
                <p className="text-2xl font-bold font-currency text-warning-500 mt-1">{formatCurrency(result.restschuld_nach_zinsbindung)}</p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Gezahlte Zinsen</p>
                <p className="text-xl font-bold font-currency text-text mt-1">{formatCurrency(result.gezahlte_zinsen)}</p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Gesamtlaufzeit</p>
                <p className="text-xl font-bold text-text mt-1">{Math.ceil(result.gesamtlaufzeit_monate / 12)} Jahre</p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
