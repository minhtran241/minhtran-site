import withPlaiceholder from '@plaiceholder/next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: {
      exclude: ['error', 'warn'],
    },
  },
  // Build Configuration
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: false,
  },

  // Development Configuration
  turbopack: {
    rules: {},
    resolveAlias: {},
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  },

  // Performance Optimizations
  experimental: {
    optimizePackageImports: [
      '@apollo/client',
      'ai',
      '@ai-sdk/cohere',
      'axios',
      'chart.js',
      'react',
      'chart.js',
      'react-chartjs-2',
      'date-fns',
      'react-syntax-highlighter',
      'daisyui',
      'next-share',
      'react-dom',
      'react-markdown',
      'jsdom',
      'reading-time',
      'rehype-raw',
      '@umami/api-client',
      'chartjs-adapter-date-fns',
    ],
  },

  productionBrowserSourceMaps: true,

  compress: true,
  poweredByHeader: false,

  // Security Configuration
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=120',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
        ],
      },
    ];
  },

  // Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    minimumCacheTTL: 31536000,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Server Configuration
  serverExternalPackages: [],

  // Routing Configuration
  async redirects() {
    return [];
  },
};

export default withPlaiceholder(bundleAnalyzer(nextConfig));
