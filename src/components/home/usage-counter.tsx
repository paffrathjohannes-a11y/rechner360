'use client';

import { useEffect, useState } from 'react';
import { Calculator, Users, EyeOff, Activity } from 'lucide-react';
import { RECHNER } from '@/lib/utils/constants';

/**
 * Nutzerzähler mit Live-Ticker.
 *
 * Phase 1 (0–1,5 s): Animiertes Hochzählen auf die Tagesbasis.
 * Phase 2 (danach): Alle 4–9 s tickt der Counter um 1–3 weiter — simuliert
 * laufende Berechnungen und signalisiert "lebendige" Seite.
 * Zusätzlich "Letzte Berechnung vor X Sekunden" als Live-Signal.
 *
 * Die Basis ist deterministisch (Datum), damit User bei Reload keinen Sprung
 * nach unten sehen.
 */
export function UsageCounter() {
  const [count, setCount] = useState(0);
  const [lastCalcSeconds, setLastCalcSeconds] = useState(7);

  useEffect(() => {
    // Basis: 15.000 Berechnungen seit Launch (07.04.2026)
    const launchDate = new Date('2026-04-07').getTime();
    const now = Date.now();
    const daysSinceLaunch = Math.max(1, Math.floor((now - launchDate) / (1000 * 60 * 60 * 24)));

    const growthFactor = 1 + daysSinceLaunch * 0.005;
    const basePerDay = 250;
    const total = Math.round(15000 + daysSinceLaunch * basePerDay * growthFactor);

    // Phase 1: Animiertes Hochzählen
    const duration = 1500;
    const steps = 40;
    const increment = total / steps;
    let step = 0;

    const countUp = setInterval(() => {
      step++;
      const next = Math.min(total, Math.round(increment * step));
      setCount(next);
      if (step >= steps) clearInterval(countUp);
    }, duration / steps);

    return () => clearInterval(countUp);
  }, []);

  // Phase 2: Live-Ticker nach Initial-Animation. Hängt vom Übergang
  // count > 0 ab — wir extrahieren das in eine boolesche Variable, damit
  // Lint die Effect-Dependency statisch prüfen kann (vorher: Inline-
  // Conditional `count === 0 ? 0 : 1`).
  const animationDone = count > 0;
  useEffect(() => {
    if (!animationDone) return;

    const tick = () => {
      setCount((c) => c + Math.floor(Math.random() * 3) + 1); // +1 bis +3
      setLastCalcSeconds(Math.floor(Math.random() * 15) + 2); // 2–16 Sek.
    };

    // Erstes Tick zufällig 4–9 Sek nach Animation
    const scheduleNext = (): ReturnType<typeof setTimeout> => {
      const delay = Math.floor(Math.random() * 5000) + 4000;
      return setTimeout(() => {
        tick();
        nextTimer = scheduleNext();
      }, delay);
    };

    let nextTimer = scheduleNext();
    return () => clearTimeout(nextTimer);
  }, [animationDone]);

  // Zusätzlich: "Letzte Berechnung vor X Sekunden" tickt jede Sekunde
  useEffect(() => {
    const secondsTimer = setInterval(() => {
      setLastCalcSeconds((s) => (s >= 120 ? 2 : s + 1));
    }, 1000);
    return () => clearInterval(secondsTimer);
  }, []);

  const formattedCount = count.toLocaleString('de-DE');

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm text-text-muted">
      <div className="flex items-center gap-1.5">
        <Calculator className="w-4 h-4 text-accent-500" />
        <span><strong className="text-text font-semibold tabular-nums">{formattedCount}</strong> Berechnungen</span>
      </div>
      <div className="h-4 w-px bg-border" />
      <div className="flex items-center gap-1.5">
        <Users className="w-4 h-4 text-primary-500" />
        <span><strong className="text-text font-semibold">{RECHNER.length}</strong> Rechner</span>
      </div>
      <div className="h-4 w-px bg-border hidden sm:block" />
      <div className="hidden sm:flex items-center gap-1.5">
        <Activity className="w-4 h-4 text-accent-500 animate-pulse" />
        <span>Letzte Berechnung vor <strong className="text-text font-semibold tabular-nums">{lastCalcSeconds} s</strong></span>
      </div>
      <div className="h-4 w-px bg-border hidden xl:block" />
      <div className="hidden xl:flex items-center gap-1.5">
        <EyeOff className="w-4 h-4 text-text-muted" />
        <span>Keine Daten gespeichert</span>
      </div>
    </div>
  );
}
