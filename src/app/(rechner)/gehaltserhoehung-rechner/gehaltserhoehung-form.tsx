'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { AdvancedOptions } from '@/components/calculator/advanced-options';
import { calculateGehaltserhoehung, type GehaltserhoehungResult } from '@/lib/calculator/tax/gehaltserhoehung';
import { STEUERKLASSEN, BUNDESLAENDER } from '@/lib/utils/constants';
import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import { useUrlStateRead, useUrlStateSync, parsers } from '@/hooks/use-url-state';

export function GehaltserhoehungForm() {
  const [bruttoAlt, setBruttoAlt] = useState(3500);
  const [bruttoNeu, setBruttoNeu] = useState(4000);
  const [steuerklasse, setSteuerklasse] = useState<1|2|3|4|5|6>(1);
  const [bundesland, setBundesland] = useState('nw');

  // URL-State: ?a=3500&n=4000&sk=1
  const urlOverrides = useUrlStateRead<{ a: number; n: number; sk: number }>({
    a: parsers.int, n: parsers.int, sk: parsers.int,
  });
  useEffect(() => {
    if (urlOverrides.a !== undefined && urlOverrides.a > 0) setBruttoAlt(urlOverrides.a);
    if (urlOverrides.n !== undefined && urlOverrides.n > 0) setBruttoNeu(urlOverrides.n);
    if (urlOverrides.sk !== undefined && [1, 2, 3, 4, 5, 6].includes(urlOverrides.sk)) {
      setSteuerklasse(urlOverrides.sk as 1|2|3|4|5|6);
    }
  }, [urlOverrides]);
  useUrlStateSync({
    a: bruttoAlt !== 3500 ? bruttoAlt : null,
    n: bruttoNeu !== 4000 ? bruttoNeu : null,
    sk: steuerklasse !== 1 ? steuerklasse : null,
  });
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [pvKinder, setPvKinder] = useState(0);
  const [kinderfreibetraege, setKinderfreibetraege] = useState(0);
  const [kvZusatzbeitrag, setKvZusatzbeitrag] = useState(2.9);
  const [fwAntrieb, setFwAntrieb] = useState('kein');
  const [fwPreis, setFwPreis] = useState(0);
  const [result, setResult] = useState<GehaltserhoehungResult | null>(null);

  useEffect(() => {
    if (bruttoAlt <= 0 || bruttoNeu <= 0) { setResult(null); return; }
    setResult(calculateGehaltserhoehung(bruttoAlt, bruttoNeu, steuerklasse, { bundesland, kirchensteuer, pvKinder, kinderfreibetraege, kvZusatzbeitrag, firmenwagenAntrieb: fwAntrieb, firmenwagenListenpreis: fwPreis }));
  }, [bruttoAlt, bruttoNeu, steuerklasse, bundesland, kirchensteuer, pvKinder, kinderfreibetraege, kvZusatzbeitrag, fwAntrieb, fwPreis]);

  return (
    <div className="space-y-6">
      <Card padding="lg">
        <div className="space-y-5">
          {/* Kern-Felder: Was der Nutzer wirklich braucht */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <InputGroup label="Aktuelles Brutto" htmlFor="alt">
              <CurrencyInput id="alt" value={bruttoAlt} onChange={setBruttoAlt} />
            </InputGroup>
            <InputGroup label="Neues Brutto" htmlFor="neu">
              <CurrencyInput id="neu" value={bruttoNeu} onChange={setBruttoNeu} />
            </InputGroup>
            <InputGroup label="Steuerklasse" htmlFor="sk">
              <Select id="sk" value={steuerklasse} onChange={(e) => setSteuerklasse(Number(e.target.value) as typeof steuerklasse)}>
                {STEUERKLASSEN.map((sk) => (<option key={sk.id} value={sk.id}>{sk.name}</option>))}
              </Select>
            </InputGroup>
          </div>

          {/* Erweiterte Optionen — standardmäßig eingeklappt */}
          <AdvancedOptions>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputGroup label="Bundesland" htmlFor="bl">
                <Select id="bl" value={bundesland} onChange={(e) => setBundesland(e.target.value)}>
                  {BUNDESLAENDER.map((bl) => (<option key={bl.id} value={bl.id}>{bl.name}</option>))}
                </Select>
              </InputGroup>
              <InputGroup label="Kirchensteuer" htmlFor="kist">
                <Select id="kist" value={kirchensteuer ? 'ja' : 'nein'} onChange={(e) => setKirchensteuer(e.target.value === 'ja')}>
                  <option value="nein">Nein</option>
                  <option value="ja">Ja</option>
                </Select>
              </InputGroup>
              <InputGroup label="Kinder" htmlFor="pvk" tooltip="Beeinflusst Pflegeversicherung. Kinderlose ab 23 zahlen 0,6% Zuschlag.">
                <Select id="pvk" value={pvKinder} onChange={(e) => setPvKinder(Number(e.target.value))}>
                  {[0, 1, 2, 3, 4, 5].map((v) => (
                    <option key={v} value={v}>{v === 0 ? 'Keine Kinder' : `${v} ${v === 1 ? 'Kind' : 'Kinder'}`}</option>
                  ))}
                </Select>
              </InputGroup>
              <InputGroup label="Kinderfreibeträge" htmlFor="kfb" tooltip="Anzahl laut Lohnsteuerkarte.">
                <Select id="kfb" value={kinderfreibetraege} onChange={(e) => setKinderfreibetraege(Number(e.target.value))}>
                  {[0, 0.5, 1, 1.5, 2, 2.5, 3].map((v) => (<option key={v} value={v}>{v}</option>))}
                </Select>
              </InputGroup>
              <InputGroup label="KV-Zusatzbeitrag" htmlFor="kvz" tooltip="Durchschnitt 2026: 2,9%. Variiert je nach Krankenkasse.">
                <Select id="kvz" value={kvZusatzbeitrag} onChange={(e) => setKvZusatzbeitrag(Number(e.target.value))}>
                  {[1.5, 1.9, 2.3, 2.5, 2.7, 2.9, 3.1, 3.5].map((v) => (
                    <option key={v} value={v}>{v.toFixed(1).replace('.', ',')}%</option>
                  ))}
                </Select>
              </InputGroup>
              <InputGroup label="Firmenwagen" htmlFor="fw" tooltip="1%-Regel je nach Antrieb.">
                <Select id="fw" value={fwAntrieb} onChange={(e) => setFwAntrieb(e.target.value)}>
                  <option value="kein">Kein Firmenwagen</option>
                  <option value="verbrenner">Verbrenner (1%)</option>
                  <option value="hybrid">Hybrid (0,5%)</option>
                  <option value="elektro">E-Auto (0,25%)</option>
                </Select>
              </InputGroup>
            </div>
            {fwAntrieb !== 'kein' && (
              <InputGroup label="Bruttolistenpreis" htmlFor="fwp">
                <CurrencyInput id="fwp" value={fwPreis} onChange={setFwPreis} placeholder="z.B. 45.000" />
              </InputGroup>
            )}
          </AdvancedOptions>

          <p className="text-xs text-text-muted text-center">Ergebnisse aktualisieren sich automatisch.</p>
        </div>
      </Card>

      {result && (
        <div className="animate-result-in space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <Card padding="md" className="text-center">
              <p className="text-sm text-text-muted">Vorher (netto)</p>
              <p className="text-xl font-bold font-currency text-text mt-1">{formatCurrency(result.vorher.netto)}</p>
              <p className="text-sm text-text-muted">{formatCurrency(bruttoAlt)} brutto</p>
            </Card>
            <div className="hidden sm:flex justify-center">
              <ArrowRight className="h-6 w-6 text-accent-500" />
            </div>
            <Card padding="md" className="text-center border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10">
              <p className="text-sm text-text-muted">Nachher (netto)</p>
              <p className="text-xl font-bold font-currency text-accent-600 dark:text-accent-400 mt-1">{formatCurrency(result.nachher.netto)}</p>
              <p className="text-sm text-text-muted">{formatCurrency(bruttoNeu)} brutto</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card padding="md" className="text-center">
              <p className="text-sm text-text-muted">Brutto-Differenz</p>
              <p className="text-xl font-bold font-currency text-text mt-1">{result.bruttoDifferenz >= 0 ? '+' : '−'}{formatCurrency(Math.abs(result.bruttoDifferenz))}</p>
            </Card>
            <Card padding="md" className="text-center border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10">
              <p className="text-sm text-text-muted">Netto-Differenz</p>
              <p className="text-xl font-bold font-currency text-accent-600 dark:text-accent-400 mt-1">{result.nettoDifferenz >= 0 ? '+' : '−'}{formatCurrency(Math.abs(result.nettoDifferenz))}</p>
              <p className="text-sm text-text-muted">{result.bruttoDifferenz !== 0 ? `${Math.abs(result.nettoAnteil)}% ${result.nettoDifferenz >= 0 ? 'kommen an' : 'weniger netto'}` : ''}</p>
            </Card>
            <Card padding="md" className="text-center">
              <p className="text-sm text-text-muted">Abgaben-Differenz</p>
              <p className="text-xl font-bold font-currency text-negative-500 mt-1">{result.mehrAbgaben >= 0 ? '+' : '−'}{formatCurrency(Math.abs(result.mehrAbgaben))}</p>
              <p className="text-sm text-text-muted">Steuern + Sozialabgaben</p>
            </Card>
          </div>

          <Card padding="md">
            <p className="text-sm font-medium text-text mb-3">
              {result.bruttoDifferenz >= 0
                ? `Von ${formatCurrency(Math.abs(result.bruttoDifferenz))} Gehaltserhöhung kommen an:`
                : `Von ${formatCurrency(Math.abs(result.bruttoDifferenz))} Gehaltsreduzierung:`}
            </p>
            <div className="h-6 rounded-full overflow-hidden flex">
              <div className="bg-accent-500 transition-all duration-300" style={{ width: `${Math.max(0, Math.min(100, result.nettoAnteil))}%` }} />
              <div className="bg-negative-400 transition-all duration-300" style={{ width: `${Math.max(0, Math.min(100, 100 - result.nettoAnteil))}%` }} />
            </div>
            <div className="flex justify-between mt-2 text-sm text-text-muted">
              <span>Netto: {Math.max(0, Math.min(100, result.nettoAnteil)).toFixed(0)}%</span>
              <span>Abgaben: {Math.max(0, Math.min(100, 100 - result.nettoAnteil)).toFixed(0)}%</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
