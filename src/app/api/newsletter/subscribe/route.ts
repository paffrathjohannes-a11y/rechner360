import { NextResponse } from 'next/server';
import { subscribeToBrevo } from '@/lib/newsletter/brevo';

/**
 * POST /api/newsletter/subscribe
 *
 * Body: { email: string; consent: boolean; source?: string; honeypot?: string }
 *
 * Validation:
 *   - E-Mail (RFC-konform, simpler Regex)
 *   - Consent muss `true` sein (DSGVO Einwilligung)
 *   - Honeypot-Feld muss leer sein (Anti-Bot)
 *
 * Rate-Limit ist bewusst NICHT hier — wir lassen Brevo deduplizieren und
 * relativ kurze IP-Limits über Vercel/Cloudflare WAF setzen, falls Spam.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Ungültiges JSON.' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Body fehlt.' }, { status: 400 });
  }

  const { email, consent, source, honeypot } = body as {
    email?: unknown;
    consent?: unknown;
    source?: unknown;
    honeypot?: unknown;
  };

  // Honeypot: Bots füllen typischerweise alle Felder aus. Erfolgreich
  // antworten, damit Bot keinen Hinweis auf Erkennung bekommt.
  if (typeof honeypot === 'string' && honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }

  if (typeof email !== 'string' || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: 'Bitte eine gültige E-Mail angeben.' }, { status: 400 });
  }

  if (consent !== true) {
    return NextResponse.json(
      { error: 'Bitte den Newsletter-Versand bestätigen.' },
      { status: 400 },
    );
  }

  const sourceStr = typeof source === 'string' && source.length <= 64 ? source : undefined;

  const result = await subscribeToBrevo({ email: email.trim().toLowerCase(), source: sourceStr });

  if (result.ok) {
    return NextResponse.json({ ok: true });
  }

  // Server-Side-Fehler nicht 1:1 nach außen: nur generische Meldung,
  // Detail-Text via Console für den Operator. 503 = Provider nicht konfiguriert.
  console.error('[newsletter/subscribe]', result.status, result.reason);

  return NextResponse.json(
    {
      error:
        result.status === 503
          ? 'Newsletter ist gerade nicht verfügbar.'
          : 'Anmeldung fehlgeschlagen. Bitte später erneut versuchen.',
    },
    { status: result.status >= 500 ? 503 : 400 },
  );
}
