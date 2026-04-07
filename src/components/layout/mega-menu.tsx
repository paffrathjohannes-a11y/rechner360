import Link from 'next/link';
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
      </div>
    </div>
  );
}
