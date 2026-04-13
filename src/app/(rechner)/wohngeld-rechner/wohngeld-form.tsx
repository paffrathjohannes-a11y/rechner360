'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateWohngeld, type WohngeldResult } from '@/lib/calculator/social/wohngeld';
import { formatCurrency } from '@/lib/utils/format';

const MIETSTUFEN_LABELS = [
  { value: 1, label: 'I — ländlich / günstig' },
  { value: 2, label: 'II — kleine Städte' },
  { value: 3, label: 'III — mittelgroße Städte' },
  { value: 4, label: 'IV — z. B. Berlin, Dresden' },
  { value: 5, label: 'V — z. B. Hamburg, Köln' },
  { value: 6, label: 'VI — z. B. Frankfurt, Stuttgart' },
  { value: 7, label: 'VII — z. B. München' },
];

export function WohngeldForm() {
  const [haushaltsgroesse, setHaushaltsgroesse] = useState(1);
  const [mietstufe, setMietstufe] = useState(4);
  const [bruttokaltmiete, setBruttokaltmiete] = useState(500);
  const [einkommen, setEinkommen] = useState(1200);
  const [result, setResult] = useState<WohngeldResult | null>(null);

  useEffect(() => {
    setResult(calculateWohngeld({ haushaltsgroesse, mietstufe, bruttokaltmiete, einkommen }));
  }, [haushaltsgroesse, mietstufe, bruttokaltmiete, einkommen]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Haushaltsgröße" htmlFor="hg" tooltip="Anzahl der Personen, die im Haushalt leben und zu berücksichtigen sind.">
            <Select id="hg" value={haushaltsgroesse} onChange={(e) => setHaushaltsgroesse(Number(e.target.value))}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'Personen'}</option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup label="Mietstufe" htmlFor="ms" tooltip="Die Mietstufe richtet sich nach dem Mietpreisniveau Ihrer Gemeinde (I = günstig, VII = teuer). Finden Sie Ihre Mietstufe auf wohngeld.org.">
            <Select id="ms" value={mietstufe} onChange={(e) => setMietstufe(Number(e.target.value))}>
              {MIETSTUFEN_LABELS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </Select>
          </InputGroup>

          <InputGroup label="Bruttokaltmiete" htmlFor="miete" tooltip="Monatliche Miete ohne Heizkosten, aber inkl. Nebenkosten (Kaltmiete + kalte Betriebskosten).">
            <CurrencyInput id="miete" value={bruttokaltmiete} onChange={setBruttokaltmiete} />
          </InputGroup>

          <InputGroup label="Monatliches Gesamteinkommen" htmlFor="eink" tooltip="Gesamteinkommen aller Haushaltsmitglieder nach Abzug von Steuern und Sozialabgaben (Nettoeinkommen).">
            <CurrencyInput id="eink" value={einkommen} onChange={setEinkommen} />
          </InputGroup>

          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>

      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-6">
            <Card padding="lg" className="border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10">
              <div className="text-center space-y-1">
                <p className="text-sm text-text-secondary">Ihr monatliches Wohngeld</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-accent-600 dark:text-accent-400">
                  {formatCurrency(result.wohngeld)}
                </p>
                <p className="text-sm text-text-muted">pro Monat (ca. {formatCurrency(result.wohngeld * 12)} / Jahr)</p>
              </div>
            </Card>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Card padding="sm" className="text-center">
                <p className="text-xs text-text-muted">Höchstbetrag Miete</p>
                <p className="text-lg font-bold font-currency text-text">{formatCurrency(result.hoechstbetrag)}</p>
              </Card>
              <Card padding="sm" className="text-center">
                <p className="text-xs text-text-muted">Heizkosten-Entlastung</p>
                <p className="text-lg font-bold font-currency text-text">{formatCurrency(result.heizkosten)}</p>
              </Card>
              <Card padding="sm" className="text-center">
                <p className="text-xs text-text-muted">Klimakomponente</p>
                <p className="text-lg font-bold font-currency text-text">{formatCurrency(result.klimakomponente)}</p>
              </Card>
            </div>

            <Card padding="none">
              <table className="w-full text-sm">
                <tbody>
                  {result.aufschluesselung.map((item, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0 hover:bg-surface-raised transition-colors">
                      <td className="px-4 py-3 text-text-secondary">{item.label}</td>
                      <td className="px-4 py-3 text-right font-currency font-medium text-text">{formatCurrency(item.betrag)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-accent-50/30 dark:bg-accent-900/10 border-t border-border">
                    <td className="px-4 py-3 font-bold text-accent-600 dark:text-accent-400">Monatliches Wohngeld</td>
                    <td className="px-4 py-3 text-right font-currency font-bold text-accent-600 dark:text-accent-400">{formatCurrency(result.wohngeld)}</td>
                  </tr>
                </tfoot>
              </table>
            </Card>

            {result.wohngeld === 0 && (
              <Card padding="md" className="border-amber-500/30 bg-amber-500/10">
                <p className="text-sm text-text">
                  Bei diesen Eingaben besteht voraussichtlich kein Wohngeld-Anspruch. Prüfen Sie, ob Ihr Einkommen innerhalb der Einkommensgrenzen liegt oder ob ggf. andere Sozialleistungen in Frage kommen.
                </p>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
