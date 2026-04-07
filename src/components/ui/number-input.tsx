'use client';

import { forwardRef, useState, useEffect, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'type'> {
  value: number;
  onChange: (value: number) => void;
  error?: boolean;
  suffix?: string;
}

/**
 * NumberInput — erlaubt dem User das Feld komplett zu leeren und neu zu tippen.
 * Löst das Problem dass type="number" mit value={0} nicht löschbar ist.
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value, onChange, error, suffix, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState(value > 0 ? value.toString() : '');

    // Sync wenn sich der externe Value ändert (z.B. durch prefill)
    useEffect(() => {
      setDisplayValue(value > 0 ? value.toString() : '');
    }, [value]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const raw = e.target.value;
      setDisplayValue(raw);

      if (raw === '') {
        onChange(0);
      } else {
        const num = Number(raw);
        if (!isNaN(num)) {
          onChange(num);
        }
      }
    }

    function handleBlur() {
      // Bei leerem Feld: 0 anzeigen
      if (displayValue === '' || isNaN(Number(displayValue))) {
        setDisplayValue('');
        onChange(0);
      }
    }

    return (
      <div className="relative">
        <input
          ref={ref}
          type="number"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
          className={cn(
            'flex h-10 w-full rounded-lg border bg-surface px-3 py-2 text-base sm:text-sm',
            suffix ? 'pr-12' : '',
            'transition-colors duration-150',
            'placeholder:text-text-muted',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
            'disabled:cursor-not-allowed disabled:opacity-50',
            '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
            error
              ? 'border-negative-500 focus-visible:ring-negative-500'
              : 'border-border hover:border-border-strong',
            className,
          )}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-text-muted select-none pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    );
  },
);
NumberInput.displayName = 'NumberInput';
