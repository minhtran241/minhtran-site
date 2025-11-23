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
          // Prevents clickjacking by blocking iframe embedding
          { key: 'X-Frame-Options', value: 'DENY' },
          // Prevents MIME type sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Controls how much referrer information should be included with requests
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          // Legacy XSS protection for older browsers
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // Controls browser caching with revalidation
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=120',
          },
          // Enables DNS prefetching for improved performance
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // Security policy for protecting against various attacks
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
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
