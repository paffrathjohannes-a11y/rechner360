import { renderOgImage, OG_SIZE } from '@/lib/seo/og-template';

export const runtime = 'edge';
export const alt = 'Nebenkosten-Rechner 2026 — rechner360.de';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OG() {
  return renderOgImage({
    title: 'Nebenkosten-Rechner',
    subtitle: 'Kauf und Miete transparent',
    accent: 'amber',
    badge: 'Immobilien & Finanzen',
  });
}
