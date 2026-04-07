import Link from 'next/link';
import { ArrowRight, Flame } from 'lucide-react';
import { getIcon, getColors } from '@/lib/utils/icons';
import { cn } from '@/lib/utils/cn';
import type { CategoryId } from '@/lib/utils/constants';

interface CategoryRechner {
  readonly slug: string;
  readonly title: string;
  readonly shortTitle: string;
  readonly description: string;
  readonly icon: string;
  readonly color: string;
  readonly popular: boolean;
  readonly category: CategoryId;
}

interface CategorySectionProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  calculators: readonly CategoryRechner[];
}

export function CategorySection({ id, title, description, icon, color, calculators }: CategorySectionProps) {
  const SectionIcon = getIcon(icon);
  const sectionColors = getColors(color);

  // Beliebte Rechner zuerst sortieren
  const sorted = [...calculators].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));

  return (
    <section id={id} className="scroll-mt-20">
      <div className="flex items-center gap-3 mb-6">
        <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', sectionColors.bg)}>
          <SectionIcon className={cn('h-5 w-5', sectionColors.icon)} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-text">{title}</h2>
          <p className="text-sm text-text-secondary">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((r) => {
          const Icon = getIcon(r.icon);
          const colors = getColors(r.color);

          return (
            <Link
              key={r.slug}
              href={`/${r.slug}`}
              className={cn(
                'group flex flex-col gap-4 rounded-2xl border bg-surface p-5',
                'shadow-xs hover:shadow-md transition-all duration-200',
                'hover:-translate-y-0.5',
                r.popular
                  ? 'border-primary-200 dark:border-primary-800 bg-gradient-to-br from-primary-50/30 to-surface dark:from-primary-950/10 dark:to-surface ring-1 ring-primary-100 dark:ring-primary-900/30'
                  : cn('border-border', colors.border),
              )}
            >
              <div className="flex items-start justify-between">
                <div className={cn(
                  'flex items-center justify-center rounded-xl',
                  r.popular ? 'h-12 w-12' : 'h-11 w-11',
                  colors.bg,
                )}>
                  <Icon className={cn(r.popular ? 'h-6 w-6' : 'h-5.5 w-5.5', colors.icon)} />
                </div>
                <div className="flex items-center gap-2">
                  {r.popular && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary-600 text-white text-[11px] font-medium px-2.5 py-0.5">
                      <Flame className="h-3 w-3" />
                      Beliebt
                    </span>
                  )}
                  <ArrowRight className="h-4.5 w-4.5 text-text-muted group-hover:text-primary-600 group-hover:translate-x-1 transition-all duration-200" />
                </div>
              </div>

              <div>
                <h3 className={cn('font-semibold text-text', r.popular ? 'text-lg' : 'text-base')}>
                  {r.title}
                </h3>
                <p className="mt-1 text-sm text-text-secondary leading-relaxed line-clamp-2">
                  {r.description}
                </p>
              </div>

              <div className="mt-auto pt-1">
                <span className={cn(
                  'text-sm font-medium group-hover:underline',
                  r.popular ? 'text-primary-600' : 'text-primary-600',
                )}>
                  Jetzt berechnen
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
