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
    if (res.ok) return { ok: true };

    // Body genau EINMAL lesen — sonst wirft `text()` nach `json()` "Body
    // already consumed" und wir verlieren den Fehlertext. Wir lesen als
    // Text, parsen optional als JSON.
    const errText = await res.text().catch(() => '');
    let errCode = '';
    try {
      const data = JSON.parse(errText);
      errCode = data?.code ?? '';
    } catch { /* kein JSON */ }

    // 400 mit code "duplicate_parameter" = Adresse schon in Liste — als
    // Erfolg werten (idempotent; DSGVO-DOI verhindert ohnehin unbemerkte
    // Mehrfach-Anmeldungen Dritter).
    if (res.status === 400 && errCode === 'duplicate_parameter') return { ok: true };

    return {
      ok: false,
      status: res.status,
      reason: `Brevo: ${res.status} ${errCode ? `(${errCode}) ` : ''}${errText.slice(0, 300)}`,
    };
  } catch (err) {
    return {
      ok: false,
      status: 502,
      reason: `Brevo-API nicht erreichbar: ${err instanceof Error ? err.message : 'Unbekannter Fehler'}`,
    };
  }
}
