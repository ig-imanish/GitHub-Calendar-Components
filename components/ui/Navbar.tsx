'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, GitFork, Star } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      height: '56px',
      background: 'rgba(10,10,10,0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            background: 'linear-gradient(135deg, #222)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#fff"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </div>
          <span style={{
            color: '#fff',
            fontSize: '15px',
            fontWeight: 600,
            letterSpacing: '-0.3px',
          }} className="nav-logo">
            GitCalendarUI
          </span>
        </Link>

        <style>{`
          @media (max-width: 400px) {
            .nav-logo { font-size: 13px !important; }
          }
        `}</style>

        {/* Center nav */}
        <div style={{ display: 'flex', gap: '4px' }} className="desktop-nav">
          <a
            href="https://grubersjoe.github.io/react-github-calendar/"
            target="_blank"
            rel="noreferrer"
            style={{
              color: '#999',
              fontSize: '14px',
              fontWeight: 500,
              padding: '6px 12px',
              borderRadius: '6px',
              textDecoration: 'none',
              transition: 'color 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#999')}
          >
            Docs
          </a>
        </div>

        {/* Right */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <a
            href="https://github.com/ig-imanish/GitHub-Calendar-Components"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#999',
              fontSize: '13px',
              fontWeight: 500,
              padding: '8px',
              borderRadius: '4px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              textDecoration: 'none',
              transition: 'all 0.15s',
              minHeight: 34,
              boxSizing: 'border-box',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#999';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
            }}
          >
            <GitFork size={14} />
            <span>GitHub</span>
          </a>
          <a
            href="https://x.com/intent/follow?screen_name=Manixh02"
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: '13px',
              padding: '8px',
              background: '#fff',
              color: '#000',
              fontWeight: 500,
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              minHeight: 34,
              boxSizing: 'border-box',
            }}
          >
            
            <span>Twitter</span>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
