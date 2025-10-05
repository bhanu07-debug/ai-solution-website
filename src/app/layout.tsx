
import type { Metadata } from 'next';
import './globals.css';
import { Inter, Space_Grotesk } from 'next/font/google';
import { cn } from '@/lib/utils';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: {
    default: 'AI Solution',
    template: `%s | AI Solution`,
  },
  description: 'Welcome to the future of AI. Discover innovative solutions tailored for your business.',
  keywords: ['AI Solutions', 'Machine Learning', 'Predictive Analytics', 'Natural Language Processing', 'AI Consulting'],
  authors: [{ name: 'AI Solution' }],
  creator: 'AI Solution',
  publisher: 'AI Solution',
  openGraph: {
    title: 'AI Solution',
    description: 'Welcome to the future of AI. Discover innovative solutions tailored for your business.',
    url: 'https://aisolutionshub.com', // Replace with your actual domain
    siteName: 'AI Solution',
    images: [
      {
        url: 'https://placehold.co/1200x630.png', // Replace with a representative OG image
        width: 1200,
        height: 630,
        alt: 'AI Solution - Powering Tomorrow\'s Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Solution',
    description: 'Welcome to the future of AI. Discover innovative solutions tailored for your business.',
    // images: ['https://aisolutionshub.com/og-image.png'], // Replace with your actual domain and image
    // creator: '@yourtwitterhandle', // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'AI Solution',
  url: 'https://aisolutionshub.com', // Replace with your actual domain
  logo: 'https://placehold.co/200x60.png', // Replace with your logo URL
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-123-456-7890',
    contactType: 'customer service',
  },
  sameAs: [
    // Add your social media profiles here
    // "https://twitter.com/yourtwitterhandle",
    // "https://www.linkedin.com/company/yourlinkedinhandle"
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          spaceGrotesk.variable
        )}
        suppressHydrationWarning
      >
         <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="relative flex min-h-dvh flex-col bg-background">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
