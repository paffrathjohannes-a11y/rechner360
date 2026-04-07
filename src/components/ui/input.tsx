import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'flex h-10 w-full rounded-lg border bg-surface px-3 py-2 text-base sm:text-sm',
          'transition-all duration-150',
          'focus:bg-surface-raised/50',
          'placeholder:text-text-muted',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error
            ? 'border-negative-500 focus-visible:ring-negative-500'
            : 'border-border hover:border-border-strong',
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';
