import { renderOgImage, OG_SIZE } from '@/lib/seo/og-template';

export const runtime = 'edge';
export const alt = 'BMI-Rechner 2026 — rechner360.de';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OG() {
  return renderOgImage({
    title: 'BMI-Rechner',
    subtitle: 'Gesundheits-Check in Sekunden',
    accent: 'amber',
    badge: 'Alltag',
  });
}
