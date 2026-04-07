'use client';

import { useState, type ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { trackFaqExpand } from '@/lib/utils/analytics-events';

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={() => { if (!isOpen) trackFaqExpand(title); setIsOpen(!isOpen); }}
        className={cn(
          'flex w-full items-center justify-between py-4 text-left text-sm font-medium text-text',
          'transition-colors duration-150 hover:text-primary-600',
          'cursor-pointer',
        )}
        aria-expanded={isOpen}
      >
        <span className="pr-4">{title}</span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-text-muted transition-transform duration-200',
            isOpen && 'rotate-180',
          )}
        />
      </button>
      <div
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-4 text-sm text-text-secondary leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

interface AccordionProps {
  children: ReactNode;
  className?: string;
}

export function Accordion({ children, className }: AccordionProps) {
  return (
    <div className={cn('divide-y divide-border rounded-xl border border-border p-2', className)}>
      {children}
    </div>
  );
}
