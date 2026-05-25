import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/ui/Navbar';

export const metadata: Metadata = {
  title: {
    template: '%s | GitCalendarUI',
    default: 'GitHub Contribution Calendar Builder – Custom React Component',
  },
  description: 'Design a stunning GitHub streak calendar with themes & shapes. Get ready‑to‑copy React code for your portfolio in seconds. Free, Next.js powered.',
  openGraph: {
    url: 'https://gitcalendarui.vercel.app/',
    title: 'GitHub Contribution Calendar Builder – Custom React Component',
    description: 'Design a stunning GitHub streak calendar with themes & shapes. Get ready‑to‑copy React code for your portfolio in seconds. Free, Next.js powered.',
    images: [
      {
        url: 'https://raw.githubusercontent.com/ig-imanish/FreeImageHosting/refs/heads/main/CalendarUI/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GitHub Contribution Calendar Builder UI preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GitHub Contribution Calendar Builder – Custom React Component',
    description: 'Design a stunning GitHub streak calendar with themes & shapes. Get ready‑to‑copy React code for your portfolio in seconds. Free, Next.js powered.',
    images: ['https://raw.githubusercontent.com/ig-imanish/FreeImageHosting/refs/heads/main/CalendarUI/og-image.png'],
  },
  // Optional: add keywords
  keywords: ['github contribution calendar', 'github calendar react', 'customizable github contribution graph', 'github calendar for portfolio'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const softwareApplication = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "GitCalendarUI",
    "applicationCategory": "WebApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "features": [
      "Real-time preview",
      "One-click React code copy",
      "Customizable themes & shapes",
      "Export SVG/PNG"
    ],
    "screenshot": [
      "https://raw.githubusercontent.com/ig-imanish/FreeImageHosting/refs/heads/main/CalendarUI/og-image.png"
    ],
    "author": {
      "@type": "Person",
      "name": "Manixh02"
    }
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script type="application/ld+json">{JSON.stringify(softwareApplication)}</script>
      </head>
      <body suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
