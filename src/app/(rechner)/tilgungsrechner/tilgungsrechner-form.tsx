'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateTilgung } from '@/lib/calculator/credit/tilgung';
import { formatCurrency } from '@/lib/utils/format';
import type { TilgungsResult } from '@/types/calculator';

export function TilgungsrechnerForm() {
  const [darlehensbetrag, setDarlehensbetrag] = useState(300000);
  const [zinssatz, setZinssatz] = useState(3.5);
  const [tilgung, setTilgung] = useState(2);
  const [zinsbindung, setZinsbindung] = useState(10);
  const [result, setResult] = useState<TilgungsResult | null>(null);

  useEffect(() => {
    if (darlehensbetrag <= 0) { setResult(null); return; }
    setResult(calculateTilgung({
      darlehensbetrag,
      zinssatz,
      anfaengliche_tilgung: tilgung,
      zinsbindung_jahre: zinsbindung,
    }));
  }, [darlehensbetrag, zinssatz, tilgung, zinsbindung]);

  const laufzeitJahre = result ? Math.ceil(result.gesamtlaufzeit_monate / 12) : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      {/* Form */}
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
          <InputGroup label="Darlehensbetrag" htmlFor="betrag">
            <CurrencyInput id="betrag" value={darlehensbetrag} onChange={setDarlehensbetrag} placeholder="z.B. 300.000" />
          </InputGroup>

          <InputGroup label="Sollzins (% p.a.)" htmlFor="zins" tooltip="Gebundener Sollzinssatz pro Jahr.">
            <Select id="zins" value={zinssatz} onChange={(e) => setZinssatz(Number(e.target.value))}>
              {[1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0].map((v) => (
                <option key={v} value={v}>{v.toFixed(1).replace('.', ',')} %</option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup label="Anfängliche Tilgung (% p.a.)" htmlFor="tilgung" tooltip="Je höher die Tilgung, desto schneller ist das Darlehen zurückgezahlt.">
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

          <p className="text-xs text-text-muted text-center">
            Ergebnisse aktualisieren sich automatisch.
          </p>
        </div>
      </Card>

      {/* Results */}
      <div className="lg:col-span-3 space-y-6">
        {result ? (
          <div className="animate-result-in space-y-6">
            {/* Key Figures */}
            <div className="grid grid-cols-2 gap-4">
              <Card padding="md" className="text-center">
                <p className="text-xs text-text-muted">Monatliche Rate</p>
                <p className="text-2xl font-bold font-currency text-accent-500 mt-1">
                  {formatCurrency(result.monatliche_rate)}
                </p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-xs text-text-muted">Restschuld nach {zinsbindung} J.</p>
                <p className="text-2xl font-bold font-currency text-warning-500 mt-1">
                  {formatCurrency(result.restschuld_nach_zinsbindung)}
                </p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-xs text-text-muted">Gezahlte Zinsen (gesamt)</p>
                <p className="text-xl font-bold font-currency text-text mt-1">
                  {formatCurrency(result.gezahlte_zinsen)}
                </p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-xs text-text-muted">Gesamtlaufzeit</p>
                <p className="text-xl font-bold text-text mt-1">
                  {laufzeitJahre} Jahre
                </p>
                <p className="text-xs text-text-muted">({result.gesamtlaufzeit_monate} Monate)</p>
              </Card>
            </div>

            {/* Yearly Tilgungsplan */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-text">
                Tilgungsplan (j&auml;hrlich, Zinsbindung {zinsbindung} Jahre)
              </h3>
              <Card padding="none">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-surface-sunken">
                        <th className="px-4 py-2 text-left text-text-secondary font-medium">Jahr</th>
                        <th className="px-4 py-2 text-right text-text-secondary font-medium">Jahresrate</th>
                        <th className="px-4 py-2 text-right text-text-secondary font-medium">Zinsen</th>
                        <th className="px-4 py-2 text-right text-text-secondary font-medium">Tilgung</th>
                        <th className="px-4 py-2 text-right text-text-secondary font-medium">Restschuld</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Aggregate by year */}
                      {Array.from({ length: Math.min(zinsbindung, Math.ceil(result.tilgungsplan.length / 12)) }, (_, i) => {
                        const yearRows = result.tilgungsplan.filter((z) => z.jahr === i + 1);
                        if (yearRows.length === 0) return null;
                        const jahresZinsen = yearRows.reduce((s, z) => s + z.zins, 0);
                        const jahresTilgung = yearRows.reduce((s, z) => s + z.tilgung + z.sondertilgung, 0);
                        const jahresRate = yearRows.reduce((s, z) => s + z.rate, 0);
                        const lastRow = yearRows[yearRows.length - 1];

                        return (
                          <tr key={i} className="border-b border-border last:border-b-0 hover:bg-surface-raised transition-colors">
                            <td className="px-4 py-2 text-text">{i + 1}</td>
                            <td className="px-4 py-2 text-right font-currency text-text">{formatCurrency(jahresRate)}</td>
                            <td className="px-4 py-2 text-right font-currency text-warning-500">{formatCurrency(jahresZinsen)}</td>
                            <td className="px-4 py-2 text-right font-currency text-accent-500">{formatCurrency(jahresTilgung)}</td>
                            <td className="px-4 py-2 text-right font-currency text-text-secondary">{formatCurrency(lastRow.restschuld)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <Card padding="lg" className="flex items-center justify-center min-h-[300px]">
            <p className="text-text-secondary">Geben Sie einen Darlehensbetrag ein.</p>
          </Card>
        )}
      </div>
    </div>
  );
}
