/**
 * Wiederverwendbares OpenGraph-Image-Template für rechner360.de.
 *
 * Verwendung in einer Route-OG-Datei:
 * ```
 * import { renderOgImage, OG_SIZE } from '@/lib/seo/og-template';
 * export const size = OG_SIZE;
 * export const contentType = 'image/png';
 * export const runtime = 'edge';
 * export default function OG() {
 *   return renderOgImage({ title: 'Kreditrechner', subtitle: 'Rate & Gesamtkosten', accent: 'blue' });
 * }
 * ```
 */
import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 } as const;

type Accent = 'blue' | 'green' | 'amber' | 'rose';

const ACCENT_COLORS: Record<Accent, string> = {
  blue: '#2563EB',
  green: '#10B981',
  amber: '#F59E0B',
  rose: '#F43F5E',
};

export interface OgImageOptions {
  /** Titel der Seite (z. B. Rechner-Name) */
  title: string;
  /** Zweite Zeile — Untertitel / USP */
  subtitle?: string;
  /** Akzentfarbe für Badges und Icon */
  accent?: Accent;
  /** Badge-Text (z. B. "Rechner", "Ratgeber") */
  badge?: string;
}

export function renderOgImage({
  title,
  subtitle = 'Kostenlos, präzise, aktuell 2026',
  accent = 'blue',
  badge = 'Rechner',
}: OgImageOptions) {
  const accentColor = ACCENT_COLORS[accent];

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0B1120 0%, #131C31 50%, #0B1120 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          fontFamily: 'system-ui, sans-serif',
          padding: '72px',
        }}
      >
        {/* Top: Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              backgroundColor: accentColor,
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '30px',
              color: 'white',
              fontWeight: 800,
            }}
          >
            R
          </div>
          <span style={{ fontSize: '32px', fontWeight: 700, color: '#F1F5F9' }}>
            rechner<span style={{ color: accentColor }}>360</span>
          </span>
          <div
            style={{
              marginLeft: 'auto',
              padding: '8px 20px',
              borderRadius: '9999px',
              backgroundColor: `${accentColor}26`,
              border: `1px solid ${accentColor}66`,
              color: accentColor,
              fontSize: '18px',
              fontWeight: 600,
              display: 'flex',
            }}
          >
            {badge}
          </div>
        </div>

        {/* Middle: Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div
            style={{
              fontSize: title.length > 34 ? '60px' : '72px',
              fontWeight: 800,
              color: '#F1F5F9',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {title}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: '28px',
                color: '#94A3B8',
                lineHeight: 1.3,
                display: 'flex',
              }}
            >
              {subtitle}
            </div>
          )}
        </div>

        {/* Bottom: Domain */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '24px',
            borderTop: '1px solid rgba(148, 163, 184, 0.2)',
          }}
        >
          <span style={{ fontSize: '22px', color: '#94A3B8', fontWeight: 500 }}>
            rechner360.de
          </span>
          <span style={{ fontSize: '20px', color: accentColor, fontWeight: 600 }}>
            Aktuell 2026 · Kostenlos
          </span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
