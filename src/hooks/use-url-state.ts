'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type Primitive = string | number | boolean;

/**
 * Liest Initial-Werte EINMAL nach Mount aus `window.location.search`.
 * Bewusst KEIN `useSearchParams()` verwenden: das würde bei statisch
 * prerenderten Pages Build-Fehler auslösen (Suspense-Zwang).
 *
 * Rückgabe: `{}` beim SSR / ersten Render, danach die geparsten Werte.
 * Konsumenten sollten daher `useEffect(() => {...}, [urlOverrides])` nutzen,
 * um Initial-State nach Mount zu übernehmen.
 */
export function useUrlStateRead<T extends Record<string, Primitive | null>>(
  schema: Record<keyof T, (raw: string) => Primitive | null>,
): Partial<T> {
  const [result, setResult] = useState<Partial<T>>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const next: Partial<T> = {};
    for (const key of Object.keys(schema) as (keyof T)[]) {
      const raw = params.get(String(key));
      if (raw === null) continue;
      const parsed = schema[key](raw);
      if (parsed !== null) (next as Record<string, Primitive>)[key as string] = parsed;
    }
    // Externer Browser-State (URL) → React-State, einmalige Synchronisierung
    // nach Mount. setState im Effect ist hier korrekt: wir initialisieren
    // aus einer Quelle, auf die wir SSR-sicher erst clientseitig zugreifen
    // können.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (Object.keys(next).length) setResult(next);
    // schema bewusst nicht im Dep-Array: ist beim Caller meist ein neues
    // Objekt-Literal pro Render und würde den Effect bei jedem Render erneut
    // feuern.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return result;
}

/**
 * Synchronisiert ein Record<string, Primitive | undefined> zur URL via
 * `history.replaceState`. Kein Next.js Router = kein re-render.
 * Debounced mit 300 ms.
 */
export function useUrlStateSync(state: Record<string, Primitive | null | undefined>) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const stateRef = useRef(state);

  // Ref-Update in einem Effect statt direkt im Body — entspricht React 19's
  // strikter Regel "Cannot access refs during render".
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const push = useCallback(() => {
    if (typeof window === 'undefined') return;
    const next = new URLSearchParams(window.location.search);
    for (const [key, value] of Object.entries(stateRef.current)) {
      if (value === undefined || value === null || value === '') next.delete(key);
      else next.set(key, String(value));
    }
    const qs = next.toString();
    const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    if (url !== window.location.pathname + window.location.search) {
      window.history.replaceState(null, '', url);
    }
  }, []);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(push, 300);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [state, push]);
}

export const parsers = {
  int: (raw: string): number | null => {
    const n = parseInt(raw, 10);
    return Number.isFinite(n) ? n : null;
  },
  float: (raw: string): number | null => {
    const n = parseFloat(raw);
    return Number.isFinite(n) ? n : null;
  },
  bool: (raw: string): boolean | null => {
    if (raw === '1' || raw === 'true') return true;
    if (raw === '0' || raw === 'false') return false;
    return null;
  },
  str: (raw: string): string | null => raw || null,
};
