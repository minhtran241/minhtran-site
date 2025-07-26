import './globals.css';
import '../../assets/fa6/css/brands.min.css';
import '../../assets/fa6/css/fontawesome.min.css';
import '../../assets/fa6/css/duotone.min.css';
import '../../assets/fa6/css/solid.min.css';
import localFont from 'next/font/local';
import Navbar from '@/components/Common/navbar/Navbar';
import Footer from '@/components/Common/footer/Footer';
import { cn } from '@/common/libs/cn';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import {
  SITE_URL,
  SITE_TITLE,
  SITE_DESCRIPTION,
  SITE_NAME,
} from '@/common/constants/site';
import LLMChat from '@/common/elements/LLMChat';
// import LetschatBubble from '@/common/elements/LetschatBubble';

const MazzardH = localFont({
  src: [
    {
      path: '../../assets/font/Mazzard/MazzardH-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../assets/font/Mazzard/MazzardH-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../assets/font/Mazzard/MazzardH-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../assets/font/Mazzard/MazzardH-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-mazzardh',
});

const MazzardL = localFont({
  src: [
    {
      path: '../../assets/font/Mazzard/MazzardL-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../assets/font/Mazzard/MazzardL-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../assets/font/Mazzard/MazzardL-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../assets/font/Mazzard/MazzardL-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-mazzardl',
});

const MazzardM = localFont({
  src: [
    {
      path: '../../assets/font/Mazzard/MazzardM-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../assets/font/Mazzard/MazzardM-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../assets/font/Mazzard/MazzardM-SemiBold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../assets/font/Mazzard/MazzardM-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-mazzardm',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Minh Tran',
    'minhtran241',
    'Software Engineer',
    'Full Stack Developer',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'Tailwind CSS',
    'Portfolio',
    'Web Development',
  ],
  authors: [{ name: 'Minh Tran', url: SITE_URL }],
  creator: 'Minh Tran',
  publisher: 'Minh Tran',
  manifest: '/favicon/site.webmanifest',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: SITE_DESCRIPTION,
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: '@minhtran241',
    creator: '@minhtran241',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
  },
};

// Separate viewport configuration for better organization
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang='en'
      className={cn('antialiased')}
      suppressHydrationWarning
      data-scroll-behavior='smooth'
    >
      <head>
        <link rel='preconnect' href='https://cloud.umami.is' />
        <link rel='dns-prefetch' href='https://cloud.umami.is' />
        {/* Structured Data for SEO */}
        <script
          type='application/ld+json'
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Minh Tran',
              url: SITE_URL,
              sameAs: [
                'https://github.com/minhtran241',
                'https://linkedin.com/in/minhtran241',
                'https://twitter.com/minhtran241',
              ],
              jobTitle: 'Software Engineer',
              description: SITE_DESCRIPTION,
            }),
          }}
        />

        {/* Analytics script with proper loading */}
        {process.env.UMAMI_WEBSITE_ID && (
          <script
            defer
            src='https://cloud.umami.is/script.js'
            data-website-id={process.env.UMAMI_WEBSITE_ID}
          />
        )}
      </head>
      <body
        className={cn(
          // Font variables
          MazzardH.variable,
          MazzardL.variable,
          MazzardM.variable,
          // Base styles
          'font-mazzardh',
          'bg-base-300',
          'scroll-smooth',
          'antialiased',
          // Prevent layout shift
          'min-h-screen',
          'flex',
          'flex-col',
        )}
        suppressHydrationWarning
      >
        <Navbar />
        <main className='container mx-auto px-4 py-6 sm:px-8'>{children}</main>
        <LLMChat />
        <SpeedInsights />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
