'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { calculateBruttoNetto } from '@/lib/calculator/brutto-netto';
import { formatCurrency } from '@/lib/utils/format';
import type { BruttoNettoInput } from '@/types/calculator';
import { cn } from '@/lib/utils/cn';

const defaultInput: Omit<BruttoNettoInput, 'brutto' | 'steuerklasse'> = {
  bundesland: 'nw',
  kirchensteuer: false,
  kinderfreibetraege: 0,
  krankenversicherung: 'gesetzlich',
  kv_zusatzbeitrag: 2.9,
  rentenversicherung: true,
  arbeitslosenversicherung: true,
  pflegeversicherung_kinder: 0,
  alter_ueber_23: true,
  geburtsjahr: 1990,
  lohnzahlungszeitraum: 'monat',
  geldwerter_vorteil: 0,
  firmenwagen_listenpreis: 0,
  firmenwagen_antrieb: 'kein',
};

export function HeroCalculator() {
  const [brutto, setBrutto] = useState(3500);
  const [steuerklasse, setSteuerklasse] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [netto, setNetto] = useState(0);

  useEffect(() => {
    if (brutto <= 0) { setNetto(0); return; }
    const result = calculateBruttoNetto({ ...defaultInput, brutto, steuerklasse });
    setNetto(result.netto);
  }, [brutto, steuerklasse]);

  return (
    <Card padding="md" className="mx-auto max-w-md w-full bg-surface/80 backdrop-blur-sm">
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="hero-brutto" className="text-xs font-medium text-text-muted mb-1 block">Bruttogehalt</label>
            <CurrencyInput id="hero-brutto" value={brutto} onChange={setBrutto} placeholder="3.500" />
          </div>
          <div>
            <label htmlFor="hero-sk" className="text-xs font-medium text-text-muted mb-1 block">Steuerklasse</label>
            <Select id="hero-sk" value={steuerklasse} onChange={(e) => setSteuerklasse(Number(e.target.value) as typeof steuerklasse)}>
              <option value={1}>Klasse I</option>
              <option value={2}>Klasse II</option>
              <option value={3}>Klasse III</option>
              <option value={4}>Klasse IV</option>
              <option value={5}>Klasse V</option>
              <option value={6}>Klasse VI</option>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-accent-50/50 dark:bg-accent-900/10 border border-accent-200 dark:border-accent-800 px-4 py-3">
          <div>
            <p className="text-xs text-text-muted">Ihr Nettolohn</p>
            <p className="text-2xl font-bold font-currency text-accent-600 dark:text-accent-400">
              {netto > 0 ? formatCurrency(netto) : '—'}
            </p>
          </div>
          <Link
            href="/brutto-netto-rechner"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent-600 hover:text-accent-700 transition-colors"
          >
            Details
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
}
