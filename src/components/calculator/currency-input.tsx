'use client';

import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface CurrencyInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'type'> {
  value: number;
  onChange: (value: number) => void;
  error?: boolean;
  suffix?: string;
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, value, onChange, error, suffix = '€', ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState(
      value > 0 ? value.toLocaleString('de-DE') : '',
    );
    const [isFocused, setIsFocused] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const raw = e.target.value.replace(/[^\d,.-]/g, '');
      setDisplayValue(raw);
      const parsed = parseFloat(raw.replace(/\./g, '').replace(',', '.'));
      if (!isNaN(parsed)) {
        onChange(parsed);
      } else if (raw === '') {
        onChange(0);
      }
    }

    function handleBlur() {
      setIsFocused(false);
      if (value > 0) {
        setDisplayValue(value.toLocaleString('de-DE'));
      } else {
        setDisplayValue('');
      }
    }

    function handleFocus() {
      setIsFocused(true);
      if (value > 0) {
        setDisplayValue(value.toString().replace('.', ','));
      }
    }

    return (
      <div className="relative">
        <input
          ref={ref}
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            'flex h-10 w-full rounded-lg border bg-surface pl-3 pr-10 py-2 text-sm font-currency',
            'transition-colors duration-150',
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
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-muted select-none pointer-events-none">
          {suffix}
        </span>
      </div>
    );
  },
);
CurrencyInput.displayName = 'CurrencyInput';
