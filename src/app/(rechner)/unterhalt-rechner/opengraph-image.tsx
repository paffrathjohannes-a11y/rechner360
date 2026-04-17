import { renderOgImage, OG_SIZE } from '@/lib/seo/og-template';

export const runtime = 'edge';
export const alt = 'Unterhaltsrechner 2026 — rechner360.de';
export const size = OG_SIZE;
export const contentType = 'image/png';

export default function OG() {
  return renderOgImage({
    title: 'Unterhaltsrechner',
    subtitle: 'Kindesunterhalt nach Düsseldorfer Tabelle',
    accent: 'green',
    badge: 'Vorsorge',
  });
}
