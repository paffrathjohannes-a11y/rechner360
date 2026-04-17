import { renderOgImage, OG_SIZE } from '@/lib/seo/og-template';

export const runtime = 'edge';
export const alt = 'Elterngeldrechner 2026 — rechner360.de';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OG() {
  return renderOgImage({
    title: 'Elterngeldrechner',
    subtitle: 'Basis, Plus und Partnermonate',
    accent: 'green',
    badge: 'Vorsorge',
  });
}
