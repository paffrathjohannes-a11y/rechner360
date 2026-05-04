'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { NumberInput } from '@/components/ui/number-input';
import { Select } from '@/components/ui/select';
import { InputGroup } from '@/components/calculator/input-group';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { calculatePkv, type PkvResult, type Berufsgruppe } from '@/lib/calculator/insurance/pkv';
import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import { Shield, TrendingDown, TrendingUp, Minus, AlertTriangle } from 'lucide-react';
import { useUrlStateRead, useUrlStateSync, parsers } from '@/hooks/use-url-state';

const empfehlungStyles = {
  pkv: { bg: 'bg-accent-50/50 dark:bg-accent-900/10', border: 'border-accent-300 dark:border-accent-700', text: 'text-accent-600 dark:text-accent-400', icon: TrendingDown },
  gkv: { bg: 'bg-primary-50/50 dark:bg-primary-900/10', border: 'border-primary-300 dark:border-primary-700', text: 'text-primary-600 dark:text-primary-400', icon: TrendingUp },
  neutral: { bg: 'bg-warning-50/50 dark:bg-warning-500/10', border: 'border-warning-300 dark:border-warning-600', text: 'text-warning-600 dark:text-warning-400', icon: Minus },
};

interface PkvFormProps {
  initialAlter?: number;
  initialBrutto?: number;
  initialBerufsgruppe?: Berufsgruppe;
}

export function PkvForm({ initialAlter = 30, initialBrutto = 75000, initialBerufsgruppe = 'angestellt' }: PkvFormProps) {
  const [alter, setAlter] = useState(initialAlter);
  const [bruttoeinkommen, setBruttoeinkommen] = useState(initialBrutto);
  const [berufsgruppe, setBerufsgruppe] = useState<Berufsgruppe>(initialBerufsgruppe);

  // URL-State: ?a=30&b=75000&bg=angestellt
  const urlOverrides = useUrlStateRead<{ a: number; b: number; bg: string }>({
    a: parsers.int, b: parsers.int, bg: parsers.str,
  });
  useEffect(() => {
    // Externer Input (URL) → React-State, einmalige Synchronisierung nach Mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (urlOverrides.a !== undefined && urlOverrides.a > 0) setAlter(urlOverrides.a);
    if (urlOverrides.b !== undefined && urlOverrides.b > 0) setBruttoeinkommen(urlOverrides.b);
    if (urlOverrides.bg) setBerufsgruppe(urlOverrides.bg as Berufsgruppe);
  }, [urlOverrides]);
  useUrlStateSync({
    a: alter !== initialAlter ? alter : null,
    b: bruttoeinkommen !== initialBrutto ? bruttoeinkommen : null,
    bg: berufsgruppe !== initialBerufsgruppe ? berufsgruppe : null,
  });
  const [kinder, setKinder] = useState(0);
  const [zusatzbeitrag, setZusatzbeitrag] = useState(2.9);

  const result = useMemo<PkvResult | null>(() => {
    if (alter <= 0 || bruttoeinkommen <= 0) return null;
    return calculatePkv({ alter, bruttoeinkommen, berufsgruppe, kinder, zusatzbeitrag });
  }, [alter, bruttoeinkommen, berufsgruppe, kinder, zusatzbeitrag]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      {/* Form */}
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Alter" htmlFor="alter">
            <NumberInput id="alter" min={18} max={67} value={alter} onChange={setAlter} />
          </InputGroup>

          <InputGroup label="Bruttoeinkommen (Jahr)" htmlFor="brutto">
            <CurrencyInput id="brutto" value={bruttoeinkommen} onChange={setBruttoeinkommen} placeholder="z.B. 75.000" />
          </InputGroup>

          <InputGroup label="Berufsgruppe" htmlFor="beruf">
            <Select id="beruf" value={berufsgruppe} onChange={(e) => setBerufsgruppe(e.target.value as Berufsgruppe)}>
              <option value="angestellt">Angestellt</option>
              <option value="selbststaendig">Selbstständig</option>
              <option value="beamter">Beamter</option>
            </Select>
          </InputGroup>

          <InputGroup label="Kinder" htmlFor="kinder">
            <Select id="kinder" value={kinder} onChange={(e) => setKinder(Number(e.target.value))}>
              {[0, 1, 2, 3, 4, 5].map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup label="GKV-Zusatzbeitrag (%)" htmlFor="zusatz" tooltip="Durchschnittlicher Zusatzbeitrag 2026: 2,9 %. Variiert je nach Krankenkasse (2,2–4,3 %).">
            <Select id="zusatz" value={zusatzbeitrag} onChange={(e) => setZusatzbeitrag(Number(e.target.value))}>
              {[1.5, 1.7, 1.9, 2.1, 2.3, 2.5, 2.7, 2.9, 3.1, 3.3, 3.5].map((v) => (
                <option key={v} value={v}>{v.toFixed(1).replace('.', ',')} %</option>
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
            {/* Nicht berechtigt Warnung */}
            {!result.pkv_berechtigt && (
              <Card padding="md" className="border-warning-300 dark:border-warning-600 bg-warning-50/50 dark:bg-warning-500/10">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-warning-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-text">PKV-Wechsel nicht möglich</p>
                    <p className="text-sm text-text-secondary mt-1">
                      Als Angestellter benötigen Sie ein Bruttoeinkommen über 73.800 €/Jahr (Versicherungspflichtgrenze 2026).
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* GKV vs PKV Vergleich */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card padding="md">
                <p className="text-sm text-text-muted uppercase tracking-wide">GKV (Ihr Anteil)</p>
                <p className="text-2xl font-bold font-currency text-primary-500 mt-1">
                  {formatCurrency(result.gkv_arbeitnehmer)}
                  <span className="text-sm font-normal text-text-muted"> /Monat</span>
                </p>
                {berufsgruppe !== 'selbststaendig' ? (
                  <p className="text-sm text-text-muted mt-2">
                    AG-Anteil: {formatCurrency(result.gkv_arbeitgeber)}
                  </p>
                ) : (
                  <p className="text-sm text-text-muted mt-2">
                    Voller Beitrag (kein Arbeitgeber)
                  </p>
                )}
              </Card>
              <Card padding="md">
                <p className="text-sm text-text-muted uppercase tracking-wide">PKV (Ihr Anteil)</p>
                <p className="text-2xl font-bold font-currency text-accent-500 mt-1">
                  {formatCurrency(result.pkv_eigenanteil)}
                  <span className="text-sm font-normal text-text-muted"> /Monat</span>
                </p>
                {result.pkv_ag_zuschuss > 0 && (
                  <p className="text-sm text-text-muted mt-2">
                    AG-Zuschuss: {formatCurrency(result.pkv_ag_zuschuss)}
                  </p>
                )}
              </Card>
            </div>

            {/* Differenz */}
            <Card padding="md" className="text-center">
              <p className="text-sm text-text-muted">
                {result.differenz <= 0 ? 'Sie sparen mit PKV' : 'PKV-Mehrkosten'}
              </p>
              <p className={cn(
                'text-3xl font-bold font-currency mt-1',
                result.differenz <= 0 ? 'text-accent-500' : 'text-warning-500',
              )}>
                {result.differenz <= 0 ? '−' : '+'}{formatCurrency(Math.abs(result.differenz))}
                <span className="text-sm font-normal text-text-muted"> /Monat</span>
              </p>
              <p className="text-sm text-text-secondary mt-1">
                {result.jahresersparnis >= 0
                  ? `${formatCurrency(result.jahresersparnis)} Ersparnis pro Jahr`
                  : `${formatCurrency(Math.abs(result.jahresersparnis))} Mehrkosten pro Jahr`}
              </p>
            </Card>

            {/* Empfehlung */}
            {(() => {
              const style = empfehlungStyles[result.empfehlung];
              const Icon = style.icon;
              return (
                <Card padding="md" className={cn('border', style.border, style.bg)}>
                  <div className="flex items-start gap-3">
                    <div className={cn('rounded-full p-2', style.bg)}>
                      <Icon className={cn('w-5 h-5', style.text)} />
                    </div>
                    <div>
                      <p className={cn('font-semibold', style.text)}>
                        {result.empfehlung === 'pkv' ? 'PKV empfehlenswert' : result.empfehlung === 'gkv' ? 'GKV empfehlenswert' : 'Individuelle Beratung empfohlen'}
                      </p>
                      <p className="text-sm text-text-secondary mt-1">{result.empfehlung_text}</p>
                    </div>
                  </div>
                </Card>
              );
            })()}


            {/* Detail-Tabelle */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-text">Beitragsdetails</h3>
              <Card padding="none">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-surface-sunken">
                        <th className="px-4 py-2 text-left text-text-secondary font-medium">Beitrag</th>
                        <th className="px-4 py-2 text-right text-text-secondary font-medium">GKV</th>
                        <th className="px-4 py-2 text-right text-text-secondary font-medium">PKV</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="px-4 py-2 text-text">Gesamtbeitrag</td>
                        <td className="px-4 py-2 text-right font-currency text-text">{formatCurrency(result.gkv_gesamt)}</td>
                        <td className="px-4 py-2 text-right font-currency text-text">{formatCurrency(result.pkv_geschaetzt)}</td>
                      </tr>
                      {berufsgruppe !== 'selbststaendig' && (
                        <tr className="border-b border-border">
                          <td className="px-4 py-2 text-text">Arbeitgeber-Anteil</td>
                          <td className="px-4 py-2 text-right font-currency text-accent-500">{formatCurrency(result.gkv_arbeitgeber)}</td>
                          <td className="px-4 py-2 text-right font-currency text-accent-500">{formatCurrency(result.pkv_ag_zuschuss)}</td>
                        </tr>
                      )}
                      <tr className="border-b border-border font-semibold">
                        <td className="px-4 py-2 text-text">Ihr Anteil</td>
                        <td className="px-4 py-2 text-right font-currency text-primary-500">{formatCurrency(result.gkv_arbeitnehmer)}</td>
                        <td className="px-4 py-2 text-right font-currency text-accent-500">{formatCurrency(result.pkv_eigenanteil)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <Card padding="lg" className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <Shield className="w-12 h-12 text-text-muted mx-auto mb-3" />
              <p className="text-text-secondary">Geben Sie Ihre Daten ein, um GKV und PKV zu vergleichen.</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
