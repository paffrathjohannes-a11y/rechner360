import { renderOgImage, OG_SIZE } from '@/lib/seo/og-template';

export const runtime = 'edge';
export const alt = 'Prozentrechner 2026 — rechner360.de';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OG() {
  return renderOgImage({
    title: 'Prozentrechner',
    subtitle: 'Grundwert, Prozentsatz und Abweichung',
    accent: 'amber',
    badge: 'Alltag',
  });
}
