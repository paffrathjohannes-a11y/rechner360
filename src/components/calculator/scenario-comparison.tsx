'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils/format';
import { cn } from '@/lib/utils/cn';
import { GitCompareArrows, X, ArrowDown, ArrowUp } from 'lucide-react';

interface ComparisonItem {
  label: string;
  valueA: number;
  valueB: number;
  format?: 'currency' | 'months' | 'percent';
  lowerIsBetter?: boolean;
}

interface ScenarioComparisonProps {
  scenarioA: React.ReactNode;
  scenarioB: React.ReactNode;
  labelA?: string;
  labelB?: string;
  comparisons: ComparisonItem[];
  onClose: () => void;
}

function formatValue(value: number, format?: string): string {
  if (format === 'months') return `${value} Monate`;
  if (format === 'percent') return `${value} %`;
  return formatCurrency(value);
}

export function ScenarioComparison({ scenarioA, scenarioB, labelA = 'Szenario A', labelB = 'Szenario B', comparisons, onClose }: ScenarioComparisonProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text flex items-center gap-2">
          <GitCompareArrows className="w-5 h-5 text-accent-500" />
          Szenarien vergleichen
        </h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Side by side forms */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <p className="text-sm font-medium text-primary-500 mb-3">{labelA}</p>
          {scenarioA}
        </div>
        <div>
          <p className="text-sm font-medium text-accent-500 mb-3">{labelB}</p>
          {scenarioB}
        </div>
      </div>

      {/* Comparison table */}
      {comparisons.length > 0 && comparisons[0].valueA > 0 && (
        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-sunken">
                  <th className="px-4 py-2 text-left text-text-secondary font-medium">Vergleich</th>
                  <th className="px-4 py-2 text-right text-primary-500 font-medium">{labelA}</th>
                  <th className="px-4 py-2 text-right text-accent-500 font-medium">{labelB}</th>
                  <th className="px-4 py-2 text-right text-text-secondary font-medium">Differenz</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((item) => {
                  const diff = item.valueB - item.valueA;
                  const isBetter = item.lowerIsBetter ? diff < 0 : diff > 0;
                  return (
                    <tr key={item.label} className="border-b border-border last:border-b-0">
                      <td className="px-4 py-2 text-text">{item.label}</td>
                      <td className="px-4 py-2 text-right font-currency text-text">{formatValue(item.valueA, item.format)}</td>
                      <td className="px-4 py-2 text-right font-currency text-text">{formatValue(item.valueB, item.format)}</td>
                      <td className={cn('px-4 py-2 text-right font-currency flex items-center justify-end gap-1', isBetter ? 'text-accent-500' : diff === 0 ? 'text-text-muted' : 'text-warning-500')}>
                        {diff !== 0 && (diff > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />)}
                        {diff > 0 ? '+' : ''}{formatValue(diff, item.format)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}

/** Simple toggle button to enter comparison mode */
export function CompareButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant="secondary" size="sm" onClick={onClick} className="gap-2">
      <GitCompareArrows className="w-4 h-4" />
      Szenario vergleichen
    </Button>
  );
}
