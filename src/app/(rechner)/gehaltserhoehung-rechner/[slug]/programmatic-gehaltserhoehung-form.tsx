'use client';

import { useState, useMemo } from 'react';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateGehaltserhoehung, type GehaltserhoehungResult } from '@/lib/calculator/tax/gehaltserhoehung';
import { STEUERKLASSEN } from '@/lib/utils/constants';
import { formatCurrency } from '@/lib/utils/format';

interface Props { erhoehung: number; }

export function ProgrammaticGehaltserhoehungForm({ erhoehung }: Props) {
  const [bruttoAlt, setBruttoAlt] = useState(3500);
  const [steuerklasse, setSteuerklasse] = useState<1|2|3|4|5|6>(1);

  const result = useMemo<GehaltserhoehungResult | null>(() => {
    if (bruttoAlt <= 0) return null;
    return calculateGehaltserhoehung(bruttoAlt, bruttoAlt + erhoehung, steuerklasse, {});
  }, [bruttoAlt, steuerklasse, erhoehung]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Aktuelles Brutto" htmlFor="alt"><CurrencyInput id="alt" value={bruttoAlt} onChange={setBruttoAlt} /></InputGroup>
          <InputGroup label="Erhöhung (brutto)" htmlFor="e"><CurrencyInput id="e" value={erhoehung} onChange={() => {}} /></InputGroup>
          <InputGroup label="Steuerklasse" htmlFor="sk">
            <Select id="sk" value={steuerklasse} onChange={(e) => setSteuerklasse(Number(e.target.value) as typeof steuerklasse)}>
              {STEUERKLASSEN.map((sk) => (<option key={sk.id} value={sk.id}>{sk.name}</option>))}
            </Select>
          </InputGroup>
        </div>
      </Card>
      <div className="lg:col-span-3 space-y-4">
        {result && (
          <div className="animate-result-in space-y-4">
            <div className="grid grid-cols-3 gap-3 items-center">
              <Card padding="md" className="text-center">
                <p className="text-sm text-text-muted">Vorher</p>
                <p className="text-lg font-bold font-currency text-text">{formatCurrency(result.vorher.netto)}</p>
              </Card>
              <div className="flex justify-center"><ArrowRight className="h-5 w-5 text-accent-500" /></div>
              <Card padding="md" className="text-center border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10">
                <p className="text-sm text-text-muted">Nachher</p>
                <p className="text-lg font-bold font-currency text-accent-600 dark:text-accent-400">{formatCurrency(result.nachher.netto)}</p>
              </Card>
            </div>
            <Card padding="lg" className="border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10 text-center">
              <p className="text-sm text-text-secondary">Netto-Differenz</p>
              <p className="text-2xl sm:text-3xl font-bold font-currency text-accent-600 dark:text-accent-400">+{formatCurrency(result.nettoDifferenz)}</p>
              <p className="text-sm text-text-muted">{result.nettoAnteil}% der Erhöhung kommen an</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
