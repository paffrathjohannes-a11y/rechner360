import { cn } from '@/lib/utils/cn';
import type { BreakdownItem } from '@/types/calculator';
import { formatCurrency, formatPercent } from '@/lib/utils/format';

const colorMap = {
  primary: 'bg-primary-500',
  accent: 'bg-accent-500',
  negative: 'bg-negative-500',
  warning: 'bg-warning-500',
  muted: 'bg-text-muted',
} as const;

interface BreakdownTableProps {
  items: BreakdownItem[];
  totalLabel?: string;
  totalValue?: number;
  className?: string;
}

export function BreakdownTable({ items, totalLabel, totalValue, className }: BreakdownTableProps) {
  return (
    <div className={cn('rounded-xl border border-border overflow-hidden', className)}>
      {/* Desktop: Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full min-w-[320px]">
          <tbody>
            {items.map((item) => (
              <tr
                key={item.label}
                className={cn(
                  'border-b border-border last:border-b-0',
                  'hover:bg-surface-raised transition-colors duration-100',
                )}
              >
                <td className="flex items-center gap-2.5 px-4 py-3">
                  <div className={cn('h-2 w-2 rounded-full shrink-0', colorMap[item.color])} />
                  <span className="text-sm text-text">{item.label}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-currency text-text font-medium">
                    {item.value < 0 ? '\u2212\u00A0' : ''}{formatCurrency(Math.abs(item.value))}
                  </span>
                </td>
                {item.percentage !== undefined && (
                  <td className="pr-4 py-3 text-right w-20">
                    <span className="text-xs font-currency text-text-muted">
                      {formatPercent(item.percentage / 100)}
                    </span>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
          {totalLabel && totalValue !== undefined && (
            <tfoot>
              <tr className="bg-surface-sunken">
                <td className="px-4 py-3">
                  <span className="text-sm font-semibold text-text">{totalLabel}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className="text-sm font-currency font-bold text-text">
                    {formatCurrency(totalValue)}
                  </span>
                </td>
                <td className="pr-4 py-3" />
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* Mobile: Stacked Cards */}
      <div className="sm:hidden divide-y divide-border">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3 px-4 py-3 min-h-[44px]">
            <div className={cn('h-2.5 w-2.5 rounded-full shrink-0', colorMap[item.color])} />
            <span className="flex-1 text-sm text-text">{item.label}</span>
            <div className="flex items-baseline gap-2 shrink-0">
              <span className="text-sm font-currency text-text font-medium">
                {item.value < 0 ? '\u2212\u00A0' : ''}{formatCurrency(Math.abs(item.value))}
              </span>
              {item.percentage !== undefined && (
                <span className="text-xs font-currency text-text-muted w-10 text-right">
                  {formatPercent(item.percentage / 100)}
                </span>
              )}
            </div>
          </div>
        ))}
        {totalLabel && totalValue !== undefined && (
          <div className="flex items-center gap-3 px-4 py-3 min-h-[44px] bg-surface-sunken">
            <div className="h-2.5 w-2.5 shrink-0" />
            <span className="flex-1 text-sm font-semibold text-text">{totalLabel}</span>
            <span className="text-sm font-currency font-bold text-text shrink-0">
              {formatCurrency(totalValue)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
