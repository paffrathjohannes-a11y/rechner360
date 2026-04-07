import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { RECHNER, getCategoryForRechner, getRechnerByCategory } from '@/lib/utils/constants';
import { getIcon } from '@/lib/utils/icons';
import { cn } from '@/lib/utils/cn';

interface RelatedCalculatorsProps {
  currentSlug: string;
  className?: string;
}

export function RelatedCalculators({ currentSlug, className }: RelatedCalculatorsProps) {
  const category = getCategoryForRechner(currentSlug);

  // Same category first (excluding current), then popular from other categories
  const sameCategory = category
    ? getRechnerByCategory(category.id).filter((r) => r.slug !== currentSlug)
    : [];
  const otherPopular = RECHNER.filter(
    (r) => r.slug !== currentSlug && r.category !== category?.id && r.popular,
  );
  const related = [...sameCategory, ...otherPopular].slice(0, 6);

  return (
    <section className={cn('space-y-4', className)}>
      <h2 className="text-xl font-bold text-text">Weitere Rechner</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {related.map((r) => {
          const Icon = getIcon(r.icon);
          return (
            <Link
              key={r.slug}
              href={`/${r.slug}`}
              className={cn(
                'group flex items-center gap-3 rounded-xl border border-border p-4',
                'hover:border-primary-300 hover:bg-primary-50/50 dark:hover:border-primary-800 dark:hover:bg-primary-900/10',
                'transition-all duration-150',
              )}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text truncate">{r.title}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-primary-600 transition-colors shrink-0" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
