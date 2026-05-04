'use client';

import { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils/cn';

/**
 * Soft-Subscribe-Component: dezentes Newsletter-Capture, optional unter
 * dem Calculator-Result eingebettet. Keine Modals, keine Pop-ups —
 * würde mit AdSense-Policy kollidieren und ist UX-feindlich.
 *
 * Renderbedingung: nur sichtbar, wenn `NEXT_PUBLIC_NEWSLETTER_ENABLED='1'`
 * gesetzt ist. Solange das Feature im Aufbau ist, kann es per ENV
 * deaktiviert bleiben, ohne den Code aus dem Layout zu entfernen.
 *
 * DSGVO-konform: Consent-Checkbox + DOI durch Provider (Brevo).
 */

interface NewsletterSignupProps {
  /** Quell-Identifier (z. B. Calculator-Slug). Wird als attribute mitgesendet. */
  source?: string;
  /** Override-Headline. */
  headline?: string;
  /** Override-Subline. */
  subline?: string;
  className?: string;
}

type State =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success' }
  | { kind: 'error'; message: string };

export function NewsletterSignup({
  source,
  headline = 'Steuer-Updates per Mail erhalten',
  subline = 'Maximal eine Mail pro Monat — neue Rechner, Tarif-Updates und Spar-Tipps.',
  className,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [state, setState] = useState<State>({ kind: 'idle' });

  // Feature-Flag: nur sichtbar bei explizitem Opt-in via ENV.
  if (process.env.NEXT_PUBLIC_NEWSLETTER_ENABLED !== '1') return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state.kind === 'loading') return;
    setState({ kind: 'loading' });

    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, consent, source, honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setState({ kind: 'success' });
      } else {
        setState({
          kind: 'error',
          message: typeof data.error === 'string' ? data.error : 'Anmeldung fehlgeschlagen.',
        });
      }
    } catch {
      setState({ kind: 'error', message: 'Verbindung fehlgeschlagen. Bitte später erneut versuchen.' });
    }
  }

  if (state.kind === 'success') {
    return (
      <Card padding="lg" className={cn('border-positive-200 dark:border-positive-800 bg-positive-50/40 dark:bg-positive-900/10', className)}>
        <div className="flex items-start gap-3">
          <Check className="w-5 h-5 mt-0.5 text-positive-600 dark:text-positive-400 shrink-0" />
          <div>
            <p className="font-medium text-text">Bestätigungs-Mail verschickt.</p>
            <p className="text-sm text-text-secondary mt-1">
              Bitte den Link in der E-Mail klicken, um die Anmeldung abzuschließen.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card padding="lg" className={className}>
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-4 h-4 text-text-muted" />
        <h3 className="text-base font-semibold text-text">{headline}</h3>
      </div>
      <p className="text-sm text-text-secondary mb-4">{subline}</p>

      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        {/* Honeypot — visuell unsichtbar, aber Bots füllen es aus.
            tabIndex+autocomplete=off verhindert dass echte Nutzer
            ihn über Tab-Navigation/Autofill befüllen. */}
        <div className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
          <label>
            Bitte freilassen
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </label>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="ihre@email.de"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1"
            aria-label="E-Mail-Adresse"
          />
          <Button
            type="submit"
            disabled={state.kind === 'loading' || !email || !consent}
            className="shrink-0"
          >
            {state.kind === 'loading' ? 'Anmelden …' : 'Anmelden'}
          </Button>
        </div>

        <label className="flex items-start gap-2 text-xs text-text-secondary cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 shrink-0"
            required
          />
          <span>
            Ich willige ein, Newsletter mit Updates und Tipps zu erhalten. Die
            Einwilligung kann ich jederzeit per Klick auf den Abmelde-Link
            widerrufen. Details in der{' '}
            <a href="/datenschutz" className="underline" target="_blank" rel="noopener">
              Datenschutzerklärung
            </a>
            .
          </span>
        </label>

        {state.kind === 'error' && (
          <div className="flex items-start gap-2 text-sm text-negative-600 dark:text-negative-400">
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{state.message}</span>
          </div>
        )}
      </form>
    </Card>
  );
}
