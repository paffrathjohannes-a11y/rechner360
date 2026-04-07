import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'rechner360.de — Kostenlose Online-Rechner 2026';
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
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: '56px',
              height: '56px',
              backgroundColor: '#2563EB',
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              color: 'white',
              fontWeight: 700,
            }}
          >
            R
          </div>
          <span style={{ fontSize: '36px', fontWeight: 700, color: '#F1F5F9' }}>
            rechner<span style={{ color: '#2563EB' }}>360</span>
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 800,
            color: '#F1F5F9',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: '20px',
          }}
        >
          Alle Rechner.{' '}
          <span style={{ color: '#2563EB' }}>Kostenlos.</span>{' '}
          <span style={{ color: '#10B981' }}>Präzise.</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: '24px',
            color: '#94A3B8',
            textAlign: 'center',
            maxWidth: '800px',
          }}
        >
          Brutto-Netto, Gehalt, Kredit und mehr — aktuell 2026
        </div>

        {/* Badge row */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '40px',
          }}
        >
          {['22+ Rechner', '436+ Seiten', 'Aktuell 2026'].map((text) => (
            <div
              key={text}
              style={{
                padding: '10px 24px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(37, 99, 235, 0.15)',
                border: '1px solid rgba(37, 99, 235, 0.3)',
                color: '#60A5FA',
                fontSize: '18px',
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
