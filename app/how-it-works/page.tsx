import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | GitCalendarUI',
    default: 'How GitCalendarUI Works – Step-by-Step Guide',
  },
  description: 'Learn how to customize your GitHub contribution calendar in 4 simple steps. Get ready-to-copy React code for your portfolio.',
  openGraph: {
    url: 'https://gitcalendarui.vercel.app/how-it-works',
    title: 'How GitCalendarUI Works – Step-by-Step Guide',
    description: 'Learn how to customize your GitHub contribution calendar in 4 simple steps. Get ready-to-copy React code for your portfolio.',
    images: [
      {
        url: 'https://raw.githubusercontent.com/ig-imanish/FreeImageHosting/refs/heads/main/CalendarUI/og-image.png',
        width: 1200,
        height: 630,
        alt: 'How GitCalendarUI works illustration',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How GitCalendarUI Works – Step-by-Step Guide',
    description: 'Learn how to customize your GitHub contribution calendar in 4 simple steps. Get ready-to-copy React code for your portfolio.',
    images: ['https://raw.githubusercontent.com/ig-imanish/FreeImageHosting/refs/heads/main/CalendarUI/og-image.png'],
  },
  keywords: ['how to use github calendar', 'github contribution calendar tutorial', 'customize github streak guide', 'github calendar react tutorial'],
};

import Link from 'next/link';

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      title: 'Pick a Theme',
      description: 'Choose from 15+ premium gradients, duotones, and solid palettes. Or create your own custom color scheme.',
      icon: '🎨',
    },
    {
      number: 2,
      title: 'Adjust Shape & Size',
      description: 'Select block shape (square, circle, hexagon, etc.), adjust padding, and set animation speed.',
      icon: '🔶',
    },
    {
      number: 3,
      title: 'Preview Live',
      description: 'See your GitHub streak update in real time as you tweak colors, shapes, and settings.',
      icon: '👁️',
    },
    {
      number: 4,
      title: 'Copy Code',
      description: 'Click “Copy Code” to get a ready‑to‑paste React component. Drop it into your Next.js or React project.',
      icon: '📋',
    },
  ];

  return (
    <main
      style={{
        maxWidth: '1000px',
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
          How GitCalendarUI
          <br />
          <span
            style={{
              background: 'linear-gradient(90deg, #222, #fff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Works
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
          Follow these four simple steps to create a stunning, customizable GitHub contribution calendar for your portfolio.
        </p>
      </div>

      {/* Steps */}
      <div style={{ display: 'grid', gap: '32px' }}>
        {steps.map((step) => (
          <div
            key={step.number}
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                background: 'rgba(168,85,247,0.1)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                flexShrink: 0,
              }}
            >
              {step.icon}
            </div>
            <div>
              <h3
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '20px',
                  fontWeight: 600,
                  color: '#fff',
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  color: '#888',
                  fontSize: '14px',
                  lineHeight: 1.6,
                }}
              >
                {step.description}
              </p>
            </div>
          </div>
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
           Ready to create your own? Start customizing now and get your React code in seconds.
         </p>
         <Link
           href="/"
           className="customize-link"
         >
           Start Customizing →
         </Link>
         <style>
           {`
             .customize-link {
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
             .customize-link:hover {
               opacity: 0.9;
             }
           `}
         </style>
       </div>
    </main>
  );
}