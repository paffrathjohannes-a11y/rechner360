'use client';

import { useEffect, useRef } from 'react';
import { trackCalculatorUse } from '@/lib/utils/analytics-events';

/**
 * Tracks calculator usage in GA4.
 * Fires once when a calculator form first produces a result.
 */
export function useTrackCalculator(calculatorName: string, hasResult: boolean) {
  const tracked = useRef(false);

  useEffect(() => {
    if (hasResult && !tracked.current) {
      tracked.current = true;
      trackCalculatorUse(calculatorName);
    }
  }, [hasResult, calculatorName]);
}
