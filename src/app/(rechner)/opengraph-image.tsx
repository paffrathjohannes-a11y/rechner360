import { renderOgImage, OG_SIZE } from '@/lib/seo/og-template';

export const runtime = 'edge';
export const alt = 'Kostenlose Online-Rechner 2026 — rechner360.de';
export const size = OG_SIZE;
export const contentType = 'image/png';

// Fallback-OG für Rechner-Routen ohne eigenes opengraph-image.tsx.
// Individuelle Routes überschreiben dieses Bild — hier gilt: Markensicher.
export default function OG() {
  return renderOgImage({
    title: 'Finanzrechner 2026',
    subtitle: 'Brutto-Netto, Kredit, Rente und mehr — aktuell & kostenlos',
    accent: 'blue',
    badge: 'Rechner',
  });
}
