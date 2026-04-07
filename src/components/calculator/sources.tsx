import { cn } from '@/lib/utils/cn';

interface SourcesProps {
  items: string[];
  className?: string;
  disclaimer?: string;
}

export function Sources({ items, className, disclaimer }: SourcesProps) {
  if (items.length === 0) return null;

  return (
    <div className={cn('rounded-lg border border-border bg-surface-sunken/50 px-4 py-3', className)}>
      {disclaimer && (
        <p className="text-sm text-text-secondary mb-2">{disclaimer}</p>
      )}
      <div className="flex flex-wrap items-center gap-x-1 text-xs text-text-muted">
        <span className="font-medium">Quellen:</span>
        {items.map((source, i) => (
          <span key={i}>
            {source}{i < items.length - 1 ? ' · ' : ''}
          </span>
        ))}
      </div>
    </div>
  );
}
