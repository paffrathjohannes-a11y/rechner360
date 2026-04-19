/**
 * AdSense-Approval-Modus — zentraler Flag.
 *
 * Solange AdSense rechner360.de wegen "Minderwertige Inhalte" ablehnt,
 * werden die ~150 programmatischen Varianten auf noindex gesetzt und aus
 * der Sitemap genommen. Google sieht dann nur die ~25 Hauptrechner
 * (alle mit 600+ Wörtern) — das genügt i. d. R. für die Freigabe.
 *
 * Nach AdSense-Freigabe und nachdem die Varianten auf ≥800 Wörter unique
 * Content ausgebaut sind: Flag auf `false` setzen, deployen → alles wieder
 * im Index + Sitemap.
 *
 * WICHTIG: Beim Flag-Flip auch mental checken, ob die Hub-Seite die
 * Varianten wieder verlinken soll (ProgrammaticVariantsList).
 */
export const ADSENSE_APPROVAL_MODE = true;

/**
 * Helper: soll eine Varianten-Seite aktuell indexiert werden?
 * Berücksichtigt den per-Page `indexable`-Flag UND den globalen Approval-Mode.
 */
export function shouldIndexVariant(indexable?: boolean): boolean {
  if (ADSENSE_APPROVAL_MODE) return false;
  return indexable !== false;
}
