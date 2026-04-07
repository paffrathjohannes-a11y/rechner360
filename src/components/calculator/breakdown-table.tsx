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
    <div className={cn('rounded-xl border border-border overflow-x-auto', className)}>
      <table className="w-full min-w-[320px]">
        <tbody>
          {items.map((item, i) => (
            <tr
              key={item.label}
              className={cn(
                'border-b border-border last:border-b-0',
                'hover:bg-surface-raised transition-colors duration-100',
              )}
            >
              <td className="flex items-center gap-2.5 px-2 sm:px-4 py-2 sm:py-3">
                <div className={cn('h-2 w-2 rounded-full shrink-0', colorMap[item.color])} />
                <span className="text-sm text-text">{item.label}</span>
              </td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-right">
                <span className="text-sm font-currency text-text font-medium">
                  {item.value < 0 ? '−\u00A0' : ''}{formatCurrency(Math.abs(item.value))}
                </span>
              </td>
              {item.percentage !== undefined && (
                <td className="pr-2 sm:pr-4 py-2 sm:py-3 text-right w-16 sm:w-20 hidden sm:table-cell">
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
              <td className="px-2 sm:px-4 py-2 sm:py-3">
                <span className="text-sm font-semibold text-text">{totalLabel}</span>
              </td>
              <td className="px-2 sm:px-4 py-2 sm:py-3 text-right">
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
  );
}
