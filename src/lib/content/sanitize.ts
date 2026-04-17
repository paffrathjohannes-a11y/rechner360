/**
 * Strikte HTML-Sanitization für Content, der aus AI-Pipelines oder
 * externen Redaktions-Quellen kommt und per `dangerouslySetInnerHTML`
 * gerendert wird.
 *
 * Ansatz: Tag-Whitelist. Nur die folgenden Tags bleiben erhalten, **keine**
 * Attribute überleben. Alles andere wird als Text entkommen. Kein
 * dritter Regex-Parser — wir konvertieren den Input in eine Folge
 * sicherer Tokens.
 *
 * Warum nicht `sanitize-html` / `DOMPurify`?
 *  — Unser erlaubtes Inventar ist winzig (5 Tags, keine Attribute).
 *  — Keine neue Supply-Chain-Abhängigkeit, keine Build-Gewichtung.
 *  — Funktioniert identisch in Node (Generator-Script, SSG) und Edge.
 *
 * Wenn die Whitelist irgendwann wirklich wachsen soll (Listen, Links,
 * Tabellen), dann bitte stattdessen auf `sanitize-html` umsteigen und
 * diese Datei entfernen.
 */

const ALLOWED_TAGS = new Set([
  'strong', 'b',
  'em', 'i',
  'u',
  'br',
]);

/** HTML-Entities für sicheren Text-Output. */
function escapeText(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Entfernt alle Tags außer der Whitelist. Überlebende Tags werden ohne
 * Attribute neu ausgegeben (blockiert `onclick`, `href="javascript:"`,
 * `style` usw.).
 */
export function sanitizeArticleHtml(input: string): string {
  if (!input) return '';

  let out = '';
  let i = 0;

  while (i < input.length) {
    const lt = input.indexOf('<', i);
    if (lt === -1) {
      out += escapeText(input.slice(i));
      break;
    }
    // Text vor dem nächsten '<' escapen
    out += escapeText(input.slice(i, lt));

    // Ist das '<' überhaupt ein Tag-Start? Laut HTML-Spec muss direkt ein
    // Buchstabe oder '/Buchstabe' folgen. Andernfalls ist es Alltagstext
    // wie „5 < 10" oder „<-- Pfeil". Solche Zeichen escapen wir als '&lt;'
    // und gehen einen Schritt weiter — sonst würde der nächste '>'
    // beliebigen dazwischen liegenden Text verschlucken.
    const nextChar = input[lt + 1];
    const isTagStart =
      (nextChar && /[a-zA-Z]/.test(nextChar)) ||
      (nextChar === '/' && input[lt + 2] && /[a-zA-Z]/.test(input[lt + 2]));
    if (!isTagStart) {
      out += '&lt;';
      i = lt + 1;
      continue;
    }

    const gt = input.indexOf('>', lt);
    if (gt === -1) {
      // unabgeschlossenes '<' — als Text escapen und Schleife beenden
      out += escapeText(input.slice(lt));
      break;
    }

    const tagRaw = input.slice(lt + 1, gt);
    const closing = tagRaw.startsWith('/');
    const selfClosing = tagRaw.endsWith('/');
    const nameMatch = tagRaw.replace(/^\//, '').trim().match(/^([a-zA-Z][a-zA-Z0-9]*)/);
    const tagName = nameMatch ? nameMatch[1].toLowerCase() : '';

    if (tagName && ALLOWED_TAGS.has(tagName)) {
      if (closing) {
        out += `</${tagName}>`;
      } else if (tagName === 'br') {
        // Void-Element — immer selbstgeschlossen rendern
        out += '<br />';
      } else {
        // Öffnungstag ohne Attribute (sicher)
        out += selfClosing ? `<${tagName} />` : `<${tagName}>`;
      }
    }
    // Unbekannter / nicht-whitelisted Tag → still verwerfen, nicht escapen
    // (escapen würde den Tag sichtbar als Literal „<script>…" im Text rendern)

    i = gt + 1;
  }

  return out;
}

/**
 * Sanitized den Content aller Sektionen eines Ratgeber-Artikels in-place.
 * Wird im Generator-Script genutzt, damit niemals ungesäubertes HTML im
 * JSON-Repo landet — Defense in Depth neben dem Render-Zeit-Sanitize.
 */
export function sanitizeRatgeberSections<T extends { content: string; title: string }>(
  sections: T[],
): T[] {
  return sections.map((s) => ({
    ...s,
    title: escapeText(s.title).replace(/&amp;/g, '&'), // Titel bleibt plain
    content: sanitizeArticleHtml(s.content),
  }));
}
