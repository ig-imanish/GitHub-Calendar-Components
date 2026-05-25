import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | GitCalendarUI',
    default: 'GitHub Contribution Calendar Themes – Beautiful GitHub Streak Designs',
  },
  description: 'Explore 15+ stunning GitHub contribution calendar themes. Customize colors, shapes, and get ready-to-copy React code for your portfolio.',
  openGraph: {
    url: 'https://gitcalendarui.vercel.app/themes',
    title: 'GitHub Contribution Calendar Themes – Beautiful GitHub Streak Designs',
    description: 'Explore 15+ stunning GitHub contribution calendar themes. Customize colors, shapes, and get ready-to-copy React code for your portfolio.',
    images: [
      {
        url: 'https://raw.githubusercontent.com/ig-imanish/FreeImageHosting/refs/heads/main/CalendarUI/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GitHub Contribution Calendar Themes Showcase',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitHub Contribution Calendar Themes – Beautiful GitHub Streak Designs',
    description: 'Explore 15+ stunning GitHub contribution calendar themes. Customize colors, shapes, and get ready-to-copy React code for your portfolio.',
    images: ['https://raw.githubusercontent.com/ig-imanish/FreeImageHosting/refs/heads/main/CalendarUI/og-image.png'],
  },
  keywords: ['github contribution calendar themes', 'github calendar react themes', 'customizable github contribution graph themes', 'github streak calendar themes'],
};

import Link from 'next/link';
import { presets } from '@/lib/registry';

export default function ThemesPage() {
  return (
    <main
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '48px 24px 96px',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 700,
            letterSpacing: '-1.5px',
            color: '#fff',
            marginBottom: '12px',
            lineHeight: 1.05,
          }}
        >
          GitHub Contribution Calendar
          <br />
          <span
            style={{
              background: 'linear-gradient(90deg, #222, #fff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Themes
          </span>
        </h1>
        <p
          style={{
            color: '#666',
            fontSize: '15px',
            maxWidth: '460px',
            margin: '0 auto',
            lineHeight: 1.6,
            width: '100%',
          }}
        >
          Choose from professionally designed themes or create your own to match your portfolio's aesthetic.
        </p>
      </div>

      {/* Themes Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
        {presets.map((p, index) => (
          <Link
            key={p.name}
            href={`/?theme=${index}`}
            style={{ textDecoration: 'none' }}
          >
            <div
              className="theme-card"
              style={{
                background: '#111',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '8px',
                overflow: 'hidden',
                transition: 'transform 0.2s, border-color 0.2s',
              }}
            >
              <div style={{ padding: '20px' }}>
                <h3
                  style={{
                    margin: '0 0 12px 0',
                    fontSize: '18px',
                    fontWeight: 600,
                    color: '#fff',
                  }}
                >
                  {p.name}
                </h3>
                <div
                  style={{
                    display: 'flex',
                    gap: '4px',
                    marginBottom: '12px',
                  }}
                >
                  {p.colors.map((c, i) => (
                    <div
                      key={i}
                      style={{
                        width: '20px',
                        height: '20px',
                        background: c,
                        borderRadius: '4px',
                      }}
                    />
                  ))}
                </div>
                <p
                  style={{
                    color: '#888',
                    fontSize: '13px',
                    lineHeight: 1.5,
                  }}
                >
                    {`A ${p.name.toLowerCase()} themed GitHub contribution calendar`}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: '48px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p
          style={{
            color: '#666',
            fontSize: '15px',
            maxWidth: '460px',
            margin: '0 auto 24px',
            lineHeight: 1.6,
          }}
        >
          Found a theme you love? Click to customize it live and get your React code.
        </p>
        <Link
          href="/"
          className="cta-link"
        >
          Customize This Theme →
        </Link>
      </div>

      <style>
        {`
          .theme-card:hover {
            transform: translateY(-4px);
            border-color: rgba(168,85,247,0.4);
          }
          .cta-link {
            display: inline-block;
            background: linear-gradient(135deg, #a78bfa, #7c3aed);
            color: #fff;
            padding: 12px 24px;
            border-radius: 6px;
            font-weight: 600;
            text-decoration: none;
            font-size: 15px;
            transition: opacity 0.2s;
          }
          .cta-link:hover {
            opacity: 0.9;
          }
        `}
      </style>
    </main>
  );
}