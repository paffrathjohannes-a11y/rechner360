'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { CurrencyInput } from '@/components/calculator/currency-input';
import { InputGroup } from '@/components/calculator/input-group';
import { calculateKredit } from '@/lib/calculator/credit/annuity';
import { formatCurrency } from '@/lib/utils/format';
import type { KreditResult } from '@/types/calculator';
import { ScenarioComparison, CompareButton } from '@/components/calculator/scenario-comparison';

/** Mini-Form für Vergleichs-Modus — kompakter als das Hauptformular */
function MiniKreditForm({ label, onChange }: { label: string; onChange: (r: KreditResult | null, betrag: number) => void }) {
  const [betrag, setBetrag] = useState(20000);
  const [zins, setZins] = useState(5.5);
  const [laufzeit, setLaufzeit] = useState(60);

  useEffect(() => {
    if (betrag <= 0 || laufzeit <= 0) { onChange(null, betrag); return; }
    onChange(calculateKredit({ darlehensbetrag: betrag, zinssatz: zins, laufzeit_monate: laufzeit }), betrag);
  }, [betrag, zins, laufzeit, onChange]);

  return (
    <Card padding="md">
      <div className="space-y-4">
        <InputGroup label="Betrag" htmlFor={`${label}-betrag`}>
          <CurrencyInput id={`${label}-betrag`} value={betrag} onChange={setBetrag} placeholder="20.000" />
        </InputGroup>
        <InputGroup label="Zinssatz" htmlFor={`${label}-zins`}>
          <Select id={`${label}-zins`} value={zins} onChange={(e) => setZins(Number(e.target.value))}>
            {[2.0, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 7.0, 8.0, 10.0].map((v) => (
              <option key={v} value={v}>{v.toFixed(1).replace('.', ',')} %</option>
            ))}
          </Select>
        </InputGroup>
        <InputGroup label="Laufzeit" htmlFor={`${label}-laufzeit`}>
          <Select id={`${label}-laufzeit`} value={laufzeit} onChange={(e) => setLaufzeit(Number(e.target.value))}>
            {[12, 24, 36, 48, 60, 72, 84, 96, 120].map((m) => (
              <option key={m} value={m}>{m} Mon. ({m / 12} J.)</option>
            ))}
          </Select>
        </InputGroup>
        {/* Inline result */}
        <div className="text-center pt-2 border-t border-border">
          <p className="text-sm text-text-muted">Monatliche Rate</p>
          <p className="text-xl font-bold font-currency text-accent-500">
            {betrag > 0 && laufzeit > 0 ? formatCurrency(calculateKredit({ darlehensbetrag: betrag, zinssatz: zins, laufzeit_monate: laufzeit }).monatliche_rate) : '—'}
          </p>
        </div>
      </div>
    </Card>
  );
}

export function KreditComparison() {
  const [showComparison, setShowComparison] = useState(false);
  const [resultA, setResultA] = useState<KreditResult | null>(null);
  const [resultB, setResultB] = useState<KreditResult | null>(null);

  if (!showComparison) {
    return (
      <div className="flex justify-center">
        <CompareButton onClick={() => setShowComparison(true)} />
      </div>
    );
  }

  const comparisons = resultA && resultB ? [
    { label: 'Monatliche Rate', valueA: resultA.monatliche_rate, valueB: resultB.monatliche_rate, lowerIsBetter: true },
    { label: 'Gesamtzinsen', valueA: resultA.gesamtzinsen, valueB: resultB.gesamtzinsen, lowerIsBetter: true },
    { label: 'Gesamtkosten', valueA: resultA.gesamtkosten, valueB: resultB.gesamtkosten, lowerIsBetter: true },
  ] : [];

  return (
    <ScenarioComparison
      labelA="Szenario A"
      labelB="Szenario B"
      scenarioA={<MiniKreditForm label="a" onChange={(r) => setResultA(r)} />}
      scenarioB={<MiniKreditForm label="b" onChange={(r) => setResultB(r)} />}
      comparisons={comparisons}
      onClose={() => setShowComparison(false)}
    />
  );
}
