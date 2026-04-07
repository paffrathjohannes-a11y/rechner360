'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { RECHNER_CATEGORIES, getRechnerByCategory } from '@/lib/utils/constants';
import { getIcon, getColors } from '@/lib/utils/icons';
import { CalculatorSearch } from '@/components/search/calculator-search';
import { cn } from '@/lib/utils/cn';

interface MobileNavProps {
  onClose: () => void;
}

export function MobileNav({ onClose }: MobileNavProps) {
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    new Set([RECHNER_CATEGORIES[0].id])
  );

  function toggleCategory(id: string) {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="lg:hidden border-t border-border bg-surface animate-result-in">
      <div className="px-4 py-3 max-h-[75vh] overflow-y-auto">
        {/* Search */}
        <div className="mb-4">
          <CalculatorSearch variant="mobile" onSelect={onClose} />
        </div>

        {/* Category Accordions */}
        <div className="space-y-1">
          {RECHNER_CATEGORIES.map((cat) => {
            const isOpen = openCategories.has(cat.id);
            const CatIcon = getIcon(cat.icon);
            const colors = getColors(cat.color);
            const calculators = getRechnerByCategory(cat.id);

            return (
              <div key={cat.id}>
                <button
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={cn(
                    'flex w-full items-center gap-3 px-3 py-3 rounded-lg',
                    'text-left transition-colors cursor-pointer',
                    isOpen ? 'bg-surface-raised' : 'hover:bg-surface-raised',
                  )}
                >
                  <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg', colors.bg)}>
                    <CatIcon className={cn('h-4 w-4', colors.icon)} />
                  </div>
                  <span className="flex-1 text-sm font-semibold text-text">{cat.title}</span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-text-muted transition-transform duration-200',
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
                    <div className="ml-4 pl-7 border-l border-border space-y-0.5 py-1">
                      {calculators.map((r) => (
                        <Link
                          key={r.slug}
                          href={`/${r.slug}`}
                          onClick={onClose}
                          className="flex items-center min-h-[44px] px-3 py-2 text-sm text-text-secondary hover:text-primary-600 rounded-md transition-colors"
                        >
                          {r.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
