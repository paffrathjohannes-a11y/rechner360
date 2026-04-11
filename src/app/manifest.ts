import type { MetadataRoute } from 'next';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/utils/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE_NAME} — Kostenlose Online-Rechner`,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#FFFFFF',
    lang: 'de',
    categories: ['finance', 'utilities'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
