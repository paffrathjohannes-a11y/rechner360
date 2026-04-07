'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateBuergergeld, type BuergergeldResult } from '@/lib/calculator/social/buergergeld';
import { formatCurrency } from '@/lib/utils/format';

interface Props { typ: string; }

export function ProgrammaticBuergergeldForm({ typ }: Props) {
  const antragsteller = typ === 'paar' ? 'paar' as const : 'single' as const;
  const defaultKinder = typ.includes('2-kinder') ? [{ alter: 4 }, { alter: 8 }] : typ.includes('kind') || typ === 'alleinerziehend' ? [{ alter: 6 }] : [];

  const [warmmiete, setWarmmiete] = useState(antragsteller === 'paar' ? 650 : 500);
  const [einkommen, setEinkommen] = useState(0);
  const [result, setResult] = useState<BuergergeldResult | null>(null);

  useEffect(() => {
    setResult(calculateBuergergeld({ antragsteller, kinder: defaultKinder, warmmiete, einkommen, einkommenPartner: 0, kindergeld: 255 }));
  }, [warmmiete, einkommen]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
      <Card padding="lg" className="lg:col-span-2 lg:sticky lg:top-20 lg:self-start">
        <div className="space-y-5">
          <InputGroup label="Warmmiete (inkl. Heizung)" htmlFor="m"><CurrencyInput id="m" value={warmmiete} onChange={setWarmmiete} /></InputGroup>
          <InputGroup label="Bruttoeinkommen (monatlich)" htmlFor="e"><CurrencyInput id="e" value={einkommen} onChange={setEinkommen} /></InputGroup>
        </div>
      </Card>
      <div className="lg:col-span-3 space-y-6">
        {result && (
          <div className="animate-result-in space-y-4">
            <Card padding="lg" className="border-accent-200 dark:border-accent-800 bg-accent-50/30 dark:bg-accent-900/10 text-center">
              <p className="text-sm text-text-secondary">Bürgergeld-Anspruch</p>
              <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-currency truncate text-accent-600 dark:text-accent-400">{formatCurrency(result.buergergeld)}</p>
              <p className="text-sm text-text-muted">monatlich</p>
            </Card>
            <Card padding="none">
              <table className="w-full text-sm">
                <tbody>
                  {result.aufschluesselung.map((item, i) => (
                    <tr key={i} className="border-b border-border last:border-b-0"><td className="px-3 py-2 text-text-secondary">{item.label}</td><td className="px-3 py-2 text-right font-currency font-medium text-text">{formatCurrency(item.betrag)}</td></tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-surface-sunken"><td className="px-3 py-2 font-bold text-text">Gesamtbedarf</td><td className="px-3 py-2 text-right font-currency font-bold text-text">{formatCurrency(result.gesamtbedarf)}</td></tr>
                  <tr className="bg-accent-50/30 dark:bg-accent-900/10"><td className="px-3 py-2 font-bold text-accent-600">Bürgergeld</td><td className="px-3 py-2 text-right font-currency font-bold text-accent-600">{formatCurrency(result.buergergeld)}</td></tr>
                </tfoot>
              </table>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
