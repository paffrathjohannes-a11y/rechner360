'use client';

import { useState, useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { NumberInput } from '@/components/ui/number-input';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateRente, type RenteResult } from '@/lib/calculator/social/rente';
import { formatCurrency } from '@/lib/utils/format';

export function RentenForm() {
  const [brutto, setBrutto] = useState(45000);
  const [alter, setAlter] = useState(35);
  const [berufsjahre, setBerufsjahre] = useState(15);
  const [renteneintritt, setRenteneintritt] = useState(67);
  const [steigerung, setSteigerung] = useState(2);

  const result = useMemo<RenteResult | null>(() => {
    if (brutto <= 0 || alter <= 0) return null;
    return calculateRente({ aktuellesBrutto: brutto, alter, berufsjahre, renteneintrittsalter: renteneintritt, gehaltsSteigerung: steigerung });
  }, [brutto, alter, berufsjahre, renteneintritt, steigerung]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Jahresbrutto" htmlFor="brutto">
            <CurrencyInput id="brutto" value={brutto} onChange={setBrutto} placeholder="z.B. 45.000" />
          </InputGroup>
          <InputGroup label="Aktuelles Alter" htmlFor="alter">
            <NumberInput id="alter" min={18} max={66} value={alter} onChange={setAlter} />
          </InputGroup>
          <InputGroup label="Bisherige Berufsjahre" htmlFor="bj" tooltip="Jahre, in denen Sie in die gesetzliche Rentenversicherung eingezahlt haben.">
            <NumberInput id="bj" min={0} max={50} value={berufsjahre} onChange={setBerufsjahre} />
          </InputGroup>
          <InputGroup label="Gewünschtes Renteneintrittsalter" htmlFor="re">
            <Select id="re" value={renteneintritt} onChange={(e) => setRenteneintritt(Number(e.target.value))}>
              {[63, 64, 65, 66, 67, 68, 69, 70].map((v) => (
                <option key={v} value={v}>{v} Jahre{v < 67 ? ' (mit Abschlag)' : v === 67 ? ' (Regelalter)' : ' (mit Zuschlag)'}</option>
              ))}
            </Select>
          </InputGroup>
          <InputGroup label="Gehaltssteigerung (% p.a.)" htmlFor="stg">
            <Select id="stg" value={steigerung} onChange={(e) => setSteigerung(Number(e.target.value))}>
              {[0, 1, 1.5, 2, 2.5, 3, 4].map((v) => (
                <option key={v} value={v}>{v}%</option>
              ))}
            </Select>
          </InputGroup>
          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-6">
            <Card padding="lg" className="border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10 text-center">
              <p className="text-sm text-text-secondary">Voraussichtliche Monatsrente</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-accent-600 dark:text-accent-400">{formatCurrency(result.monatsrente)}</p>
              <p className="text-sm text-text-muted">{formatCurrency(result.jahresrente)} / Jahr · {result.entgeltpunkteGesamt} Entgeltpunkte</p>
            </Card>

            {result.zugangsfaktor < 1 && (
              <Card padding="md" className="border-warning-400/30 bg-warning-50/50 dark:bg-warning-500/10">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-warning-600">Abschlag wegen Frühverrentung</p>
                    <p className="text-sm text-text-secondary">Zugangsfaktor: {result.zugangsfaktor} (Abschlag: {((1 - result.zugangsfaktor) * 100).toFixed(1)}%). Bei Renteneintritt mit {renteneintritt} statt {67} wird Ihre Rente dauerhaft gekürzt.</p>
                  </div>
                </div>
              </Card>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Entgeltpunkte</p>
                <p className="text-2xl font-bold text-text mt-1">{result.entgeltpunkteGesamt}</p>
                <p className="text-sm text-text-muted">gesamt</p>
              </Card>
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Noch {result.restjahre} Jahre</p>
                <p className="text-2xl font-bold text-primary-500 mt-1">{renteneintritt}</p>
                <p className="text-sm text-text-muted">Renteneintritt</p>
              </Card>
              <Card padding="md" className="text-center border-negative-200 dark:border-negative-800 bg-negative-50/30 dark:bg-negative-900/10">
                <p className="text-sm text-text-muted">Rentenlücke</p>
                <p className="text-2xl font-bold font-currency text-negative-500 mt-1">{formatCurrency(result.rentenluecke)}</p>
                <p className="text-sm text-text-muted">pro Monat</p>
              </Card>
            </div>

            <Card padding="md" className="bg-surface-raised">
              <p className="text-sm text-text-secondary">
                Um die Rentenlücke von <span className="font-currency font-semibold text-text">{formatCurrency(result.rentenluecke)}/Monat</span> zu schließen,
                müssten Sie bei 5% Rendite ca. <span className="font-currency font-semibold text-text">{formatCurrency(result.rentenluecke * 12 / 0.05)}</span> an
                Vermögen aufbauen (Entnahmerate 5%).
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
