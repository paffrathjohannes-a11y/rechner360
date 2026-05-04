/**
 * Brevo (Sendinblue) Newsletter-Anbindung.
 *
 * Brevo wickelt Double-Opt-In automatisch ab, sofern die Liste mit DOI-
 * Template konfiguriert ist (Brevo-Konto → Listen → Listeneinstellungen).
 * Wir senden den Kontakt nur an Brevo, der DOI-Versand erfolgt dort.
 *
 * Konfiguration (Server-only ENV — niemals NEXT_PUBLIC_*):
 *   BREVO_API_KEY      — API v3 Key aus dem Brevo-Konto
 *   BREVO_LIST_ID      — numerische ID der Ziel-Liste
 *   BREVO_DOI_TEMPLATE — (optional) numerische Template-ID für DOI-Mail
 */

const BREVO_API = 'https://api.brevo.com/v3';

export type SubscribeResult =
  | { ok: true }
  | { ok: false; status: number; reason: string };

interface SubscribePayload {
  email: string;
  /** Ein-Wort-Label, woher die Anmeldung kam (z. B. Calculator-Slug). */
  source?: string;
}

export async function subscribeToBrevo(payload: SubscribePayload): Promise<SubscribeResult> {
  const apiKey = process.env.BREVO_API_KEY;
  const listIdRaw = process.env.BREVO_LIST_ID;
  const doiTemplateRaw = process.env.BREVO_DOI_TEMPLATE;

  if (!apiKey || !listIdRaw) {
    return { ok: false, status: 503, reason: 'Newsletter ist nicht konfiguriert.' };
  }

  const listId = Number(listIdRaw);
  if (!Number.isInteger(listId)) {
    return { ok: false, status: 500, reason: 'BREVO_LIST_ID ist ungültig.' };
  }

  const doiTemplateId = doiTemplateRaw ? Number(doiTemplateRaw) : undefined;
  const useDoi = Number.isInteger(doiTemplateId);

  // Brevo: bei DOI-Template den `/contacts/doubleOptinConfirmation`-Endpoint
  // nutzen, sonst direkt `/contacts` (kein DOI). Der DOI-Pfad ist DSGVO-
  // konform für Newsletter-Anmeldungen mit Mehrwertversprechen.
  const endpoint = useDoi
    ? `${BREVO_API}/contacts/doubleOptinConfirmation`
    : `${BREVO_API}/contacts`;

  const body = useDoi
    ? {
        email: payload.email,
        includeListIds: [listId],
        templateId: doiTemplateId,
        redirectionUrl: 'https://www.rechner360.de/newsletter/bestaetigt',
        attributes: payload.source ? { SOURCE: payload.source } : undefined,
      }
    : {
        email: payload.email,
        listIds: [listId],
        updateEnabled: true,
        attributes: payload.source ? { SOURCE: payload.source } : undefined,
      };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    // Brevo gibt 201 (created) bzw. 204 (no content) bei Erfolg.
    // 400 mit code "duplicate_parameter" = Adresse schon angemeldet — als
    // Erfolg werten, damit der User keinen Fehler sieht (DOI verhindert
    // unbemerkte Anmeldungen Dritter, Re-Anmeldung ist gewollt idempotent).
    if (res.ok) return { ok: true };

    if (res.status === 400) {
      const data = await res.json().catch(() => ({}));
      if (data?.code === 'duplicate_parameter') return { ok: true };
    }

    const errText = await res.text().catch(() => '');
    return {
      ok: false,
      status: res.status,
      reason: `Brevo-API antwortete mit ${res.status}: ${errText.slice(0, 200)}`,
    };
  } catch (err) {
    return {
      ok: false,
      status: 502,
      reason: `Brevo-API nicht erreichbar: ${err instanceof Error ? err.message : 'Unbekannter Fehler'}`,
    };
  }
}
