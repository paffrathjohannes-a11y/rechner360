import { renderOgImage, OG_SIZE } from '@/lib/seo/og-template';

export const runtime = 'edge';
export const alt = 'Kalorienrechner 2026 — rechner360.de';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OG() {
  return renderOgImage({
    title: 'Kalorienrechner',
    subtitle: 'Tagesbedarf und Abnehmziel',
    accent: 'amber',
    badge: 'Alltag',
  });
}
