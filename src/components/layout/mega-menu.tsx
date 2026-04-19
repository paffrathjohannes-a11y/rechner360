import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { RECHNER_CATEGORIES, getRechnerByCategory } from '@/lib/utils/constants';
import { getIcon, getColors } from '@/lib/utils/icons';
import { cn } from '@/lib/utils/cn';

interface MegaMenuProps {
  onClose: () => void;
}

export function MegaMenu({ onClose }: MegaMenuProps) {
  return (
    <div
      className="border-b border-border shadow-lg animate-result-in"
      style={{ backgroundColor: 'var(--surface)', position: 'relative', zIndex: 50 }}
      onMouseLeave={onClose}
    >
      <div className="mx-auto max-w-[var(--container-max)] px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {RECHNER_CATEGORIES.map((cat, i) => {
            const CatIcon = getIcon(cat.icon);
            const colors = getColors(cat.color);
            const calculators = getRechnerByCategory(cat.id);

            return (
              <div key={cat.id} className={`animate-menu-item stagger-${i + 1}`}>
                <div className="flex items-center gap-2 mb-3">
                  <div className={cn('flex h-7 w-7 items-center justify-center rounded-lg', colors.bg)}>
                    <CatIcon className={cn('h-4 w-4', colors.icon)} />
                  </div>
                  <h3 className="text-sm font-semibold text-text">{cat.title}</h3>
                </div>
                <ul className="space-y-1">
                  {calculators.map((r) => (
                    <li key={r.slug}>
                      <Link
                        href={`/${r.slug}`}
                        onClick={onClose}
                        className="block px-2 py-1.5 text-sm text-text-secondary hover:text-primary-600 hover:bg-surface-raised rounded-md transition-colors"
                      >
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Ratgeber Footer */}
        <div className="mt-6 pt-5 border-t border-border">
          <Link
            href="/ratgeber"
            onClick={onClose}
            className="group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 hover:bg-surface-raised transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-text">Ratgeber & Finanztipps</div>
                <div className="text-xs text-text-secondary">Verständliche Anleitungen zu Steuern, Finanzen und Vorsorge</div>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
