import { SITE_TITLE, SITE_DESCRIPTION } from '@/common/constants/site';

export default function manifest() {
  return {
    name: SITE_TITLE,
    short_name: 'Minh Tran',
    description: SITE_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    scope: '/',
    id: '/',
    categories: ['portfolio', 'developer', 'technology'],
    lang: 'en',
    dir: 'ltr',
    display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
    icons: [
      {
        src: '/favicon/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/favicon/android-chrome-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    // screenshots: [
    // 	{
    // 		src: '/images/screenshot-wide.png',
    // 		sizes: '1280x720',
    // 		type: 'image/png',
    // 		form_factor: 'wide',
    // 		label: 'Portfolio Desktop View',
    // 	},
    // 	{
    // 		src: '/images/screenshot-narrow.png',
    // 		sizes: '750x1334',
    // 		type: 'image/png',
    // 		form_factor: 'narrow',
    // 		label: 'Portfolio Mobile View',
    // 	},
    // ],
    shortcuts: [
      {
        name: 'Projects',
        short_name: 'Projects',
        description: 'View my projects',
        url: '/projects',
        icons: [{ src: '/favicon/favicon-32x32.png', sizes: '32x32' }],
      },
      {
        name: 'Blog',
        short_name: 'Blog',
        description: 'Read my blog posts',
        url: '/blog',
        icons: [{ src: '/favicon/favicon-32x32.png', sizes: '32x32' }],
      },
      {
        name: 'Uses',
        short_name: 'Uses',
        description: 'View my uses',
        url: '/uses',
        icons: [{ src: '/favicon/favicon-32x32.png', sizes: '32x32' }],
      },
    ],
  };
}
