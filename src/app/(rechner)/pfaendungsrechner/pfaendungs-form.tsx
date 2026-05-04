'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculatePfaendung, type PfaendungResult } from '@/lib/calculator/social/pfaendung';
import { formatCurrency } from '@/lib/utils/format';

export function PfaendungsForm() {
  const [netto, setNetto] = useState(2000);
  const [unterhalt, setUnterhalt] = useState(0);

  const result = useMemo<PfaendungResult | null>(() => {
    if (netto <= 0) return null;
    return calculatePfaendung({ nettoEinkommen: netto, unterhaltspflichten: unterhalt });
  }, [netto, unterhalt]);

  // Balken-Visualisierung
  const freiProzent = result ? Math.min((result.verbleibendesBetrag / netto) * 100, 100) : 0;
  const pfaendbarProzent = result ? Math.min((result.pfaendbarerBetrag / netto) * 100, 100) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Monatliches Nettoeinkommen" htmlFor="netto">
            <CurrencyInput id="netto" value={netto} onChange={setNetto} />
          </InputGroup>
          <InputGroup label="Unterhaltspflichtige Personen" htmlFor="unterhalt" tooltip="Anzahl der Personen, denen Sie gesetzlich zum Unterhalt verpflichtet sind (Kinder, Ehepartner).">
            <Select id="unterhalt" value={unterhalt} onChange={(e) => setUnterhalt(Number(e.target.value))}>
              {[0, 1, 2, 3, 4, 5].map((v) => (
                <option key={v} value={v}>{v} {v === 1 ? 'Person' : 'Personen'}</option>
              ))}
            </Select>
          </InputGroup>
          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Pfändungsfreigrenze</p>
                <p className="text-xl font-bold font-currency text-accent-500 mt-1">{formatCurrency(result.pfaendungsfreigrenze)}</p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Pfändbarer Betrag</p>
                <p className="text-xl font-bold font-currency text-negative-500 mt-1">{formatCurrency(result.pfaendbarerBetrag)}</p>
                <p className="text-sm text-text-muted">({result.anteilPfaendbar}%)</p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Verbleibend</p>
                <p className="text-xl font-bold font-currency text-text mt-1">{formatCurrency(result.verbleibendesBetrag)}</p>
              </Card>
            </div>

            {/* Visual Bar */}
            <Card padding="md">
              <p className="text-sm font-medium text-text mb-3">Aufteilung Ihres Einkommens</p>
              <div className="h-8 rounded-full overflow-hidden flex">
                <div
                  className="bg-accent-500 transition-all duration-300"
                  style={{ width: `${freiProzent}%` }}
                  title="Pfändungsfrei"
                />
                <div
                  className="bg-negative-500 transition-all duration-300"
                  style={{ width: `${pfaendbarProzent}%` }}
                  title="Pfändbar"
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-text-muted">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-accent-500" /> Pfändungsfrei
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-negative-500" /> Pfändbar
                </span>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
