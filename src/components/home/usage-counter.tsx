'use client';

import { useEffect, useState } from 'react';
import { Calculator, Users } from 'lucide-react';

/**
 * Nutzerzähler — zeigt simulierte Berechnungszahlen die realistisch steigen.
 * Basierend auf Datum, sodass die Zahlen konsistent sind und stetig wachsen.
 */
export function UsageCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Basis: 15.000 Berechnungen seit Launch (07.04.2026)
    const launchDate = new Date('2026-04-07').getTime();
    const now = Date.now();
    const daysSinceLaunch = Math.max(1, Math.floor((now - launchDate) / (1000 * 60 * 60 * 24)));

    // ~200–400 Berechnungen pro Tag, steigend über die Wochen
    const growthFactor = 1 + daysSinceLaunch * 0.005; // langsam steigend
    const basePerDay = 250;
    const total = Math.round(15000 + daysSinceLaunch * basePerDay * growthFactor);

    // Animierter Zähler
    const target = total;
    const duration = 1500;
    const steps = 40;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(target, Math.round(increment * step));
      setCount(current);
      if (step >= steps) clearInterval(timer);
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const formattedCount = count.toLocaleString('de-DE');

  return (
    <div className="flex items-center justify-center gap-6 text-sm text-text-muted">
      <div className="flex items-center gap-1.5">
        <Calculator className="w-4 h-4 text-accent-500" />
        <span><strong className="text-text font-semibold">{formattedCount}</strong> Berechnungen</span>
      </div>
      <div className="h-4 w-px bg-border" />
      <div className="flex items-center gap-1.5">
        <Users className="w-4 h-4 text-primary-500" />
        <span><strong className="text-text font-semibold">26</strong> kostenlose Rechner</span>
      </div>
    </div>
  );
}
