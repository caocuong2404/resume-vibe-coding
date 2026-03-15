import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['700'],
});

export const metadata: Metadata = {
  title: 'ResumeVibe 2026 - AI-Powered Resume Platform',
  description: 'Experience the future of professional portfolios with ResumeVibe. AI-driven skill analysis, interactive timelines, and personalized resume creation for modern professionals.',
  keywords: ['resume', 'portfolio', 'AI', '2026', 'professional', 'career'],
  authors: [{ name: 'ResumeVibe Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://resumevibe.com',
    title: 'ResumeVibe 2026 - AI-Powered Resume Platform',
    description: 'Experience the future of professional portfolios with ResumeVibe.',
    images: [
      {
        url: 'https://resumevibe.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ResumeVibe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResumeVibe 2026',
    description: 'AI-Powered Resume Platform',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f0f' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}
