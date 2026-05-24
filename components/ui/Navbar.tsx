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
            background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <GitFork size={15} color="#fff" />
          </div>
          <span style={{
            color: '#fff',
            fontSize: '15px',
            fontWeight: 600,
            letterSpacing: '-0.3px',
          }} className="nav-logo">
            CalendarUI
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
              padding: '8px 14px',
              borderRadius: '6px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              textDecoration: 'none',
              transition: 'all 0.15s',
              minHeight: 44,
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
            href="https://www.npmjs.com/package/react-github-calendar"
            target="_blank"
            rel="noreferrer"
            style={{
              fontSize: '13px',
              padding: '8px 16px',
              background: '#fff',
              color: '#000',
              fontWeight: 500,
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              minHeight: 44,
              boxSizing: 'border-box',
            }}
          >
            Install
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
