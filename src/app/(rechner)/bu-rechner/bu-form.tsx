'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { NumberInput } from '@/components/ui/number-input';
import { Select } from '@/components/ui/select';
import { InputGroup } from '@/components/calculator/input-group';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { calculateBu, BERUFSGRUPPE_LABEL, type BuResult, type Berufsgruppe } from '@/lib/calculator/insurance/bu';
import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import { ShieldCheck, AlertTriangle, Info } from 'lucide-react';

interface BuFormProps {
  initialAlter?: number;
  initialNetto?: number;
  initialBerufsgruppe?: Berufsgruppe;
}

export function BuForm({ initialAlter = 30, initialNetto = 2500, initialBerufsgruppe = 'buero' }: BuFormProps) {
  const [alter, setAlter] = useState(initialAlter);
  const [berufsgruppe, setBerufsgruppe] = useState<Berufsgruppe>(initialBerufsgruppe);
  const [nettoeinkommen, setNettoeinkommen] = useState(initialNetto);
  const [buRente, setBuRente] = useState(Math.round(initialNetto * 0.75 / 50) * 50);
  const [laufzeit, setLaufzeit] = useState(67);
  const [raucher, setRaucher] = useState(false);
  const [result, setResult] = useState<BuResult | null>(null);
  const manualBuRente = useRef(false);

  useEffect(() => {
    if (alter > 0 && nettoeinkommen > 0 && buRente > 0) {
      setResult(calculateBu({ alter, berufsgruppe, nettoeinkommen, buRente, laufzeit, raucher }));
    }
  }, [alter, berufsgruppe, nettoeinkommen, buRente, laufzeit, raucher]);

  // Update BU-Rente wenn Netto sich ändert (nur wenn User nicht manuell geändert hat)
  useEffect(() => {
    if (!manualBuRente.current) {
      setBuRente(Math.round(nettoeinkommen * 0.75 / 50) * 50);
    }
  }, [nettoeinkommen]);

  const handleBuRenteChange = (value: number) => {
    manualBuRente.current = true;
    setBuRente(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2">
        <div className="space-y-5">
          <InputGroup label="Alter" htmlFor="alter">
            <NumberInput id="alter" min={18} max={60} value={alter} onChange={setAlter} suffix="Jahre" />
          </InputGroup>

          <InputGroup label="Berufsgruppe" htmlFor="beruf">
            <Select id="beruf" value={berufsgruppe} onChange={(e) => setBerufsgruppe(e.target.value as Berufsgruppe)}>
              {Object.entries(BERUFSGRUPPE_LABEL).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup label="Nettoeinkommen (monatlich)" htmlFor="netto">
            <CurrencyInput id="netto" value={nettoeinkommen} onChange={setNettoeinkommen} placeholder="z.B. 2.500" />
          </InputGroup>

          <InputGroup label="Gewünschte BU-Rente (monatlich)" htmlFor="rente" tooltip="Empfohlen: 75-80% des Nettoeinkommens.">
            <CurrencyInput id="rente" value={buRente} onChange={handleBuRenteChange} placeholder="z.B. 1.875" />
          </InputGroup>

          <InputGroup label="Absicherung bis Alter" htmlFor="laufzeit">
            <Select id="laufzeit" value={laufzeit} onChange={(e) => setLaufzeit(Number(e.target.value))}>
              <option value={60}>60 Jahre</option>
              <option value={63}>63 Jahre</option>
              <option value={65}>65 Jahre</option>
              <option value={67}>67 Jahre (empfohlen)</option>
            </Select>
          </InputGroup>

          <InputGroup label="Raucher" htmlFor="raucher">
            <Select id="raucher" value={raucher ? 'ja' : 'nein'} onChange={(e) => setRaucher(e.target.value === 'ja')}>
              <option value="nein">Nein</option>
              <option value="ja">Ja</option>
            </Select>
          </InputGroup>

          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {result ? (
          <div className="animate-result-in space-y-6">
            {/* Hauptergebnisse */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Monatsbeitrag</p>
                <p className="text-2xl font-bold font-currency text-accent-500 mt-1">
                  {formatCurrency(result.monatsbeitrag)}
                </p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">BU-Rente</p>
                <p className="text-2xl font-bold font-currency text-primary-500 mt-1">
                  {formatCurrency(result.buRente)}
                </p>
                <p className="text-sm text-text-muted mt-1">{result.absicherungsgrad} % vom Netto</p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Kosten-Nutzen</p>
                <p className="text-2xl font-bold font-currency text-text mt-1">
                  1:{result.kostenNutzenFaktor}
                </p>
                <p className="text-sm text-text-muted mt-1">Beitrag zu Rente</p>
              </Card>
            </div>

            {/* Hinweis */}
            <Card padding="md" className={cn(
              'border',
              result.absicherungsgrad < 60 ? 'border-warning-300 dark:border-warning-600 bg-warning-50/30 dark:bg-warning-500/5' : 'border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10',
            )}>
              <div className="flex items-start gap-3">
                {result.absicherungsgrad < 60 ? (
                  <AlertTriangle className="w-5 h-5 text-warning-500 shrink-0 mt-0.5" />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                )}
                <p className="text-sm text-text-secondary">{result.hinweis}</p>
              </div>
            </Card>


            {/* Detailtabelle */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-text">Beitragsübersicht</h3>
              <Card padding="none">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3 text-text">Monatsbeitrag</td>
                        <td className="px-4 py-3 text-right font-currency font-semibold text-accent-500">{formatCurrency(result.monatsbeitrag)}</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3 text-text">Jahresbeitrag</td>
                        <td className="px-4 py-3 text-right font-currency text-text">{formatCurrency(result.jahresbeitrag)}</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3 text-text">Laufzeit</td>
                        <td className="px-4 py-3 text-right text-text">{result.laufzeitJahre} Jahre (bis Alter {laufzeit})</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3 text-text">Gesamtkosten über Laufzeit</td>
                        <td className="px-4 py-3 text-right font-currency text-text">{formatCurrency(result.gesamtkosten)}</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3 text-text">Absicherungsgrad</td>
                        <td className="px-4 py-3 text-right text-text">{result.absicherungsgrad} % des Nettos</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-text">Empfohlene BU-Rente</td>
                        <td className="px-4 py-3 text-right font-currency text-primary-500">{formatCurrency(result.empfehlung_rente)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Info */}
            <Card padding="md" className="bg-surface-raised">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                <p className="text-sm text-text-secondary">
                  Die tatsächlichen Beiträge hängen von Ihrer individuellen Gesundheitsprüfung ab. Dieser Rechner gibt eine Orientierung — für ein verbindliches Angebot empfehlen wir einen unabhängigen Vergleich.
                </p>
              </div>
            </Card>
          </div>
        ) : (
          <Card padding="lg" className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <ShieldCheck className="w-12 h-12 text-text-muted mx-auto mb-3" />
              <p className="text-text-secondary">Geben Sie Ihre Daten ein, um den BU-Beitrag zu berechnen.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
