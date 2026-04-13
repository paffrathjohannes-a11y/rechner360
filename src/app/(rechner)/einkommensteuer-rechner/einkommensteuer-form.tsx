'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateEinkommensteuer, type EinkommensteuerResult } from '@/lib/calculator/tax/einkommensteuer'; // v2
import { formatCurrency } from '@/lib/utils/format';
import { BUNDESLAENDER, STEUERKLASSEN } from '@/lib/utils/constants';

export function EinkommensteuerForm() {
  const [zvE, setZvE] = useState(50000);
  const [steuerklasse, setSteuerklasse] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [bundesland, setBundesland] = useState('nw');
  const [kinderfreibetraege, setKinderfreibetraege] = useState(0);
  const [result, setResult] = useState<EinkommensteuerResult | null>(null);

  useEffect(() => {
    const r = calculateEinkommensteuer({ zvE, steuerklasse, kirchensteuer, bundesland, kinderfreibetraege });
    setResult(r);
  }, [zvE, steuerklasse, kirchensteuer, bundesland, kinderfreibetraege]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Zu versteuerndes Einkommen (jährlich)" htmlFor="zve" tooltip="Ihr Jahreseinkommen nach Abzug aller Werbungskosten, Sonderausgaben und außergewöhnlichen Belastungen.">
            <CurrencyInput id="zve" value={zvE} onChange={setZvE} />
          </InputGroup>

          <InputGroup label="Steuerklasse" htmlFor="sk">
            <Select id="sk" value={steuerklasse} onChange={(e) => setSteuerklasse(Number(e.target.value) as 1 | 2 | 3 | 4 | 5 | 6)}>
              {STEUERKLASSEN.map((sk) => (
                <option key={sk.id} value={sk.id}>{sk.name} — {sk.description}</option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup label="Bundesland" htmlFor="bl" tooltip="Relevant für den Kirchensteuersatz (8% in Bayern/BaWü, 9% sonst).">
            <Select id="bl" value={bundesland} onChange={(e) => setBundesland(e.target.value)}>
              {BUNDESLAENDER.map((bl) => (
                <option key={bl.id} value={bl.id}>{bl.name}</option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup label="Kinderfreibeträge" htmlFor="kfb" tooltip="Halbe Kinderfreibeträge (z. B. 1.0 = 1 Kind). Bei Zusammenveranlagung: volle Kinderfreibeträge.">
            <Select id="kfb" value={kinderfreibetraege} onChange={(e) => setKinderfreibetraege(Number(e.target.value))}>
              <option value={0}>Keine</option>
              <option value={0.5}>0,5</option>
              <option value={1}>1,0</option>
              <option value={1.5}>1,5</option>
              <option value={2}>2,0</option>
              <option value={2.5}>2,5</option>
              <option value={3}>3,0</option>
              <option value={4}>4,0</option>
              <option value={5}>5,0</option>
            </Select>
          </InputGroup>

          <Toggle label="Kirchensteuer" checked={kirchensteuer} onChange={setKirchensteuer} />

          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-6">
            <Card padding="lg" className="border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10">
              <div className="text-center space-y-1">
                <p className="text-sm text-text-secondary">Einkommensteuer 2026</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-accent-600 dark:text-accent-400">
                  {formatCurrency(result.einkommensteuer)}
                </p>
                <p className="text-sm text-text-muted">pro Jahr ({formatCurrency(result.einkommensteuer / 12)} / Monat)</p>
              </div>
            </Card>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Card padding="sm" className="text-center">
                <p className="text-xs text-text-muted">Grenzsteuersatz</p>
                <p className="text-lg font-bold text-text">{result.grenzsteuersatz} %</p>
              </Card>
              <Card padding="sm" className="text-center">
                <p className="text-xs text-text-muted">Durchschnittssatz</p>
                <p className="text-lg font-bold text-text">{result.durchschnittssteuersatz} %</p>
              </Card>
              <Card padding="sm" className="text-center">
                <p className="text-xs text-text-muted">Solidaritätszuschlag</p>
                <p className="text-lg font-bold font-currency text-text">{formatCurrency(result.solidaritaetszuschlag)}</p>
              </Card>
              <Card padding="sm" className="text-center">
                <p className="text-xs text-text-muted">Gesamtbelastung</p>
                <p className="text-lg font-bold font-currency text-text">{formatCurrency(result.gesamtbelastung)}</p>
              </Card>
            </div>

            <Card padding="none">
              <table className="w-full text-sm">
                <tbody>
                  {result.aufschluesselung.map((item, i) => {
                    const isTotal = item.label === 'Steuerbelastung gesamt';
                    const isNetto = item.label === 'Verbleibendes Einkommen';
                    return (
                      <tr key={i} className={`border-b border-border last:border-b-0 ${isTotal || isNetto ? 'bg-surface-sunken font-semibold' : 'hover:bg-surface-raised'} transition-colors`}>
                        <td className={`px-4 py-3 ${isNetto ? 'text-accent-600 dark:text-accent-400' : isTotal ? 'text-negative-500' : 'text-text-secondary'}`}>{item.label}</td>
                        <td className={`px-4 py-3 text-right font-currency font-medium ${isNetto ? 'text-accent-600 dark:text-accent-400' : isTotal ? 'text-negative-500' : 'text-text'}`}>
                          {isTotal ? `-${formatCurrency(item.betrag)}` : formatCurrency(item.betrag)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
