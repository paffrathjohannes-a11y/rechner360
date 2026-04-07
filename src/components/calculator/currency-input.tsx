'use client';

import { forwardRef, useState, useRef, type InputHTMLAttributes } from 'react';
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
    const isFocusedRef = useRef(false);
    const lastValueRef = useRef(value);

    // Sync display when external value changes (but not while user is typing)
    if (!isFocusedRef.current && value !== lastValueRef.current) {
      lastValueRef.current = value;
      setDisplayValue(value > 0 ? value.toLocaleString('de-DE') : '');
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const raw = e.target.value.replace(/[^\d,.-]/g, '');
      setDisplayValue(raw);
      const parsed = parseFloat(raw.replace(/\./g, '').replace(',', '.'));
      if (!isNaN(parsed)) {
        lastValueRef.current = parsed;
        onChange(parsed);
      } else if (raw === '') {
        lastValueRef.current = 0;
        onChange(0);
      }
    }

    function handleBlur() {
      isFocusedRef.current = false;
      lastValueRef.current = value;
      setDisplayValue(value > 0 ? value.toLocaleString('de-DE') : '');
    }

    function handleFocus() {
      isFocusedRef.current = true;
      // Show raw number for easy editing
      if (value > 0) {
        setDisplayValue(value.toString().replace('.', ','));
      } else {
        setDisplayValue('');
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
            'flex h-10 w-full rounded-lg border bg-surface pl-3 pr-10 py-2 text-base sm:text-sm font-currency',
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
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-muted select-none pointer-events-none">
          {suffix}
        </span>
      </div>
    );
  },
);
CurrencyInput.displayName = 'CurrencyInput';
