import { renderOgImage, OG_SIZE } from '@/lib/seo/og-template';

export const runtime = 'edge';
export const alt = 'Finanzratgeber — rechner360.de';
export const size = OG_SIZE;
export const contentType = 'image/png';

// Gruppenweites Fallback-OG für Ratgeber-Artikel.
export default function OG() {
  return renderOgImage({
    title: 'Finanzratgeber',
    subtitle: 'Steuern, Vorsorge und Finanzen verständlich erklärt',
    accent: 'green',
    badge: 'Ratgeber',
  });
}
