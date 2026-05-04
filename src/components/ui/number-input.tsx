'use client';

import { forwardRef, useState, useRef, useEffect, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface NumberInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'type'> {
  value: number;
  onChange: (value: number) => void;
  error?: boolean;
  suffix?: string;
}

/**
 * NumberInput — erlaubt dem User das Feld komplett zu leeren und neu zu tippen.
 * Synchronisiert mit externem Value nur wenn nicht fokussiert (sonst würde
 * React beim Tippen den DOM-Value mit der reaktiv-aktualisierten Prop
 * überschreiben und den Cursor zurücksetzen).
 */
export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value, onChange, error, suffix, ...props }, ref) => {
    const [displayValue, setDisplayValue] = useState(value > 0 ? value.toString() : '');
    const isFocusedRef = useRef(false);
    const lastValueRef = useRef(value);

    // Externe `value`-Prop → lokale displayValue spiegeln (nur außerhalb des
    // Fokus). useEffect statt direkt-im-Render: React 19 / Next 16 verbieten
    // ref-mutations und setState während render strikt.
    useEffect(() => {
      if (isFocusedRef.current || value === lastValueRef.current) return;
      lastValueRef.current = value;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDisplayValue(value > 0 ? value.toString() : '');
    }, [value]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      const raw = e.target.value;
      setDisplayValue(raw);

      if (raw === '') {
        lastValueRef.current = 0;
        onChange(0);
      } else {
        const num = Number(raw);
        if (!isNaN(num)) {
          lastValueRef.current = num;
          onChange(num);
        }
      }
    }

    function handleFocus() {
      isFocusedRef.current = true;
      // Show raw number for easy editing, remove "0"
      if (value === 0) {
        setDisplayValue('');
      }
    }

    function handleBlur() {
      isFocusedRef.current = false;
      lastValueRef.current = value;
      if (displayValue === '' || isNaN(Number(displayValue))) {
        setDisplayValue('');
        onChange(0);
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
            'flex h-10 w-full rounded-lg border bg-surface px-3 py-2 text-base sm:text-sm',
            suffix ? 'pr-12' : '',
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
