import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'rechner360.de — Kostenlose Online-Rechner';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0B1120 0%, #131C31 50%, #0B1120 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          padding: '60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: '#2563EB',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: 'white',
              fontWeight: 700,
            }}
          >
            R
          </div>
          <span style={{ fontSize: '28px', fontWeight: 700, color: '#F1F5F9' }}>
            rechner<span style={{ color: '#2563EB' }}>360</span>
          </span>
        </div>

        <div
          style={{
            fontSize: '52px',
            fontWeight: 800,
            color: '#F1F5F9',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: '24px',
          }}
        >
          Kostenlose Online-Rechner
        </div>

        <div
          style={{
            fontSize: '26px',
            color: '#94A3B8',
            textAlign: 'center',
          }}
        >
          Aktuell 2026 — Präzise — DSGVO-konform
        </div>

        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginTop: '48px',
          }}
        >
          {['Gehalt & Steuern', 'Immobilien', 'Vorsorge', 'Tools'].map((text) => (
            <div
              key={text}
              style={{
                padding: '8px 20px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                color: '#34D399',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              {text}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
