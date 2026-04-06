import type { ReactNode } from 'react';
import { Info } from 'lucide-react';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils/cn';

interface InputGroupProps {
  label: string;
  htmlFor?: string;
  tooltip?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}

export function InputGroup({ label, htmlFor, tooltip, error, children, className }: InputGroupProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <div className="flex items-center gap-1.5">
        <label
          htmlFor={htmlFor}
          className="text-sm font-medium text-text"
        >
          {label}
        </label>
        {tooltip && (
          <Tooltip content={tooltip}>
            <Info className="h-3.5 w-3.5 text-text-muted cursor-help" />
          </Tooltip>
        )}
      </div>
      {children}
      {error && (
        <p className="text-xs text-negative-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
