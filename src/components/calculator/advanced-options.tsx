'use client';

import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface AdvancedOptionsProps {
  children: ReactNode;
  label?: string;
  className?: string;
  defaultOpen?: boolean;
}

export function AdvancedOptions({ children, label = 'Erweiterte Optionen', className, defaultOpen = false }: AdvancedOptionsProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-sm text-text-muted hover:text-text transition-colors cursor-pointer select-none"
      >
        <ChevronDown className={cn('w-4 h-4 transition-transform duration-200', open && 'rotate-180')} />
        {label}
      </button>
      {open && (
        <div className="mt-4 space-y-5 animate-result-in">
          {children}
        </div>
      )}
    </div>
  );
}
