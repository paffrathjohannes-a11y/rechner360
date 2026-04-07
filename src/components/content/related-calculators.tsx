import Link from 'next/link';
import { ArrowRight, Calculator, Wallet, Landmark, Home, HeartPulse, Baby, ShieldCheck, Percent, Building, TrendingDown, Banknote, HardHat, Users, Scale, Flame } from 'lucide-react';
import { RECHNER } from '@/lib/utils/constants';
import { cn } from '@/lib/utils/cn';

const iconMap: Record<string, typeof Calculator> = {
  calculator: Calculator,
  wallet: Wallet,
  landmark: Landmark,
  home: Home,
  'heart-pulse': HeartPulse,
  'baby': Baby,
  'shield-check': ShieldCheck,
  'percent': Percent,
  'building': Building,
  'trending-down': TrendingDown,
  'banknote': Banknote,
  'hard-hat': HardHat,
  'users': Users,
  'scale': Scale,
  'flame': Flame,
};

interface RelatedCalculatorsProps {
  currentSlug: string;
  className?: string;
}

export function RelatedCalculators({ currentSlug, className }: RelatedCalculatorsProps) {
  const related = RECHNER.filter((r) => r.slug !== currentSlug);

  return (
    <section className={cn('space-y-4', className)}>
      <h2 className="text-xl font-bold text-text">Weitere Rechner</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {related.map((r) => {
          const Icon = iconMap[r.icon] || Calculator;
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
