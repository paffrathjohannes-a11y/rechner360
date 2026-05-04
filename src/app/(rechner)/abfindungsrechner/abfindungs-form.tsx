'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Toggle } from '@/components/ui/toggle';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateAbfindung, type AbfindungResult } from '@/lib/calculator/tax/abfindung';
import { STEUERKLASSEN } from '@/lib/utils/constants';
import { formatCurrency } from '@/lib/utils/format';

export function AbfindungsForm() {
  const [jahresbrutto, setJahresbrutto] = useState(45000);
  const [abfindung, setAbfindung] = useState(25000);
  const [steuerklasse, setSteuerklasse] = useState<1|2|3|4|5|6>(1);
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [kirchensteuerSatz, setKirchensteuerSatz] = useState(0.09);

  const result = useMemo<AbfindungResult | null>(() => {
    if (jahresbrutto <= 0 || abfindung <= 0) return null;
    return calculateAbfindung({ jahresbrutto, abfindung, steuerklasse, kirchensteuer, kirchensteuerSatz });
  }, [jahresbrutto, abfindung, steuerklasse, kirchensteuer, kirchensteuerSatz]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Jahresbrutto (ohne Abfindung)" htmlFor="brutto" tooltip="Ihr reguläres Jahresbruttoeinkommen ohne die Abfindung.">
            <CurrencyInput id="brutto" value={jahresbrutto} onChange={setJahresbrutto} />
          </InputGroup>
          <InputGroup label="Abfindung (brutto)" htmlFor="abfindung">
            <CurrencyInput id="abfindung" value={abfindung} onChange={setAbfindung} />
          </InputGroup>
          <InputGroup label="Steuerklasse" htmlFor="stkl">
            <Select id="stkl" value={steuerklasse} onChange={(e) => setSteuerklasse(Number(e.target.value) as 1|2|3|4|5|6)}>
              {STEUERKLASSEN.map((sk) => (<option key={sk.id} value={sk.id}>{sk.name} — {sk.description}</option>))}
            </Select>
          </InputGroup>
          <Toggle checked={kirchensteuer} onChange={setKirchensteuer} label="Kirchensteuer" />
          {kirchensteuer && (
            <InputGroup label="Kirchensteuersatz" htmlFor="kist" tooltip="Bayern und Baden-Württemberg: 8%. Alle anderen Bundesländer: 9%.">
              <Select id="kist" value={kirchensteuerSatz} onChange={(e) => setKirchensteuerSatz(Number(e.target.value))}>
                <option value={0.08}>8 % (Bayern, Baden-Württemberg)</option>
                <option value={0.09}>9 % (alle anderen Bundesländer)</option>
              </Select>
            </InputGroup>
          )}
          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-6">
            <Card padding="lg" className="border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10">
              <div className="text-center space-y-1">
                <p className="text-sm text-text-secondary">Ihre Netto-Abfindung</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-accent-600 dark:text-accent-400">{formatCurrency(result.nettoAbfindung)}</p>
                <p className="text-sm text-text-muted">von {formatCurrency(abfindung)} brutto ({(result.effektiverSteuersatzAbfindung * 100).toFixed(1).replace('.', ',')}% effektiver Steuersatz)</p>
              </div>
            </Card>

            {result.ersparnisDurchFuenftel > 0 && (
              <Card padding="md" className="bg-accent-50/20 dark:bg-accent-900/5 border-accent-200 dark:border-accent-800">
                <p className="text-sm text-center">
                  <span className="font-semibold text-accent-600">Ersparnis durch Fünftelregelung: {formatCurrency(result.ersparnisDurchFuenftel)}</span>
                </p>
              </Card>
            )}

            <Card padding="none">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-border hover:bg-surface-raised transition-colors">
                    <td className="px-4 py-3 text-text-secondary">Steuer ohne Abfindung</td>
                    <td className="px-4 py-3 text-right font-currency text-text">{formatCurrency(result.steuerOhneAbfindung)}</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-surface-raised transition-colors">
                    <td className="px-4 py-3 text-text-secondary">Steuer mit Abfindung (ohne Fünftelregelung)</td>
                    <td className="px-4 py-3 text-right font-currency text-negative-500">{formatCurrency(result.steuerMitAbfindungOhneFuenftel)}</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-surface-raised transition-colors bg-accent-50/10 dark:bg-accent-900/5">
                    <td className="px-4 py-3 font-medium text-accent-600">Steuer mit Fünftelregelung</td>
                    <td className="px-4 py-3 text-right font-currency font-medium text-accent-600">{formatCurrency(result.steuerMitFuenftel)}</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
