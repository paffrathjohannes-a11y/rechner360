import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

const variants = {
  default: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 border border-primary-200 dark:border-primary-800/40',
  accent: 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300 border border-accent-200 dark:border-accent-800/40',
  warning: 'bg-warning-50 text-warning-600 dark:bg-warning-500/20 dark:text-warning-400',
  negative: 'bg-negative-100 text-negative-800 dark:bg-negative-900/30 dark:text-negative-300',
  muted: 'bg-surface-sunken text-text-secondary',
} as const;

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
