'use client';

import { useEffect, useState, useCallback } from 'react';

/**
 * Liest beim ersten Client-Render einen Boolean-Flag aus sessionStorage
 * und stellt einen Setter bereit, der gleichzeitig den State aktualisiert
 * und sessionStorage schreibt.
 *
 * Warum useEffect statt lazy `useState`-Initializer:
 *   - Server-Rendering hat kein `sessionStorage` → der Initializer dürfte
 *     nicht zugreifen.
 *   - Würden wir auf dem Server `false` und auf dem Client den echten Wert
 *     liefern, kommt es zu Hydration-Mismatch wenn der Flag bereits
 *     gesetzt war.
 *   - Daher: SSR-/Initial-Render = `true` (sicheres "noch nicht entschieden",
 *     UI bleibt versteckt), nach Hydration wird der echte Wert gelesen.
 *
 * Die `react-hooks/set-state-in-effect`-Regel verbietet generisch setState
 * im Effect-Body. Hier ist es bewusst: wir synchronisieren *einmalig* mit
 * einem externen System (sessionStorage), nicht mit React-State.
 */
export function useSessionStorageFlag(key: string): readonly [boolean, (value: boolean) => void] {
  const [value, setValue] = useState(true);

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(sessionStorage.getItem(key) === '1');
    } catch {
      setValue(false);
    }
  }, [key]);

  const update = useCallback((next: boolean) => {
    setValue(next);
    try {
      sessionStorage.setItem(key, next ? '1' : '0');
    } catch {
      /* ignore — Private Mode ohne Storage o. ä. */
    }
  }, [key]);

  return [value, update] as const;
}
