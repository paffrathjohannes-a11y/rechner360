'use client';

import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateGehaltserhoehung, type GehaltserhoehungResult } from '@/lib/calculator/tax/gehaltserhoehung';
import { STEUERKLASSEN, BUNDESLAENDER } from '@/lib/utils/constants';
import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';

export function GehaltserhoehungForm() {
  const [bruttoAlt, setBruttoAlt] = useState(3500);
  const [bruttoNeu, setBruttoNeu] = useState(4000);
  const [steuerklasse, setSteuerklasse] = useState<1|2|3|4|5|6>(1);
  const [bundesland, setBundesland] = useState('nw');
  const [kirchensteuer, setKirchensteuer] = useState(false);
  const [result, setResult] = useState<GehaltserhoehungResult | null>(null);

  useEffect(() => {
    if (bruttoAlt <= 0 || bruttoNeu <= 0) { setResult(null); return; }
    setResult(calculateGehaltserhoehung(bruttoAlt, bruttoNeu, steuerklasse, { bundesland, kirchensteuer }));
  }, [bruttoAlt, bruttoNeu, steuerklasse, bundesland, kirchensteuer]);

  return (
    <div className="space-y-6">
      <Card padding="lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
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
        <div className="grid grid-cols-2 gap-4 mt-4">
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
        </div>
      </Card>

      {result && (
        <div className="animate-result-in space-y-6">
          {/* Vergleich */}
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

          {/* Ergebnis */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card padding="md" className="text-center">
              <p className="text-sm text-text-muted">Brutto-Erhöhung</p>
              <p className="text-xl font-bold font-currency text-text mt-1">+{formatCurrency(result.bruttoDifferenz)}</p>
            </Card>
            <Card padding="md" className="text-center border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10">
              <p className="text-sm text-text-muted">Netto-Erhöhung</p>
              <p className="text-xl font-bold font-currency text-accent-600 dark:text-accent-400 mt-1">+{formatCurrency(result.nettoDifferenz)}</p>
              <p className="text-sm text-text-muted">{result.nettoAnteil}% kommen an</p>
            </Card>
            <Card padding="md" className="text-center">
              <p className="text-sm text-text-muted">Mehr Abgaben</p>
              <p className="text-xl font-bold font-currency text-negative-500 mt-1">+{formatCurrency(result.mehrAbgaben)}</p>
              <p className="text-sm text-text-muted">Steuern + SV</p>
            </Card>
          </div>

          {/* Visual Bar */}
          <Card padding="md">
            <p className="text-sm font-medium text-text mb-3">Von {formatCurrency(result.bruttoDifferenz)} Erhöhung kommen an:</p>
            <div className="h-6 rounded-full overflow-hidden flex">
              <div className="bg-accent-500 transition-all duration-300" style={{ width: `${result.nettoAnteil}%` }} />
              <div className="bg-negative-400 transition-all duration-300" style={{ width: `${100 - result.nettoAnteil}%` }} />
            </div>
            <div className="flex justify-between mt-2 text-sm text-text-muted">
              <span>Netto: {result.nettoAnteil}%</span>
              <span>Abgaben: {(100 - result.nettoAnteil).toFixed(0)}%</span>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
