// Alternative approach using @next/bundle-analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
	openAnalyzer: false, // Set to true to auto-open in browser
});

const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Turbopack configuration
	turbopack: {
		// Configure custom root if needed (uncomment if your project structure requires it)
		// root: path.join(__dirname, '..'),

		// Configure any webpack loaders you need with Turbopack
		rules: {
			// Example: SVG loader configuration
			// '*.svg': {
			//   loaders: ['@svgr/webpack'],
			//   as: '*.js',
			// },
		},

		// Module resolution aliases (equivalent to webpack's resolve.alias)
		resolveAlias: {
			// Add any module aliases you need
			// '@': path.resolve(__dirname, 'src'),
			// '@components': path.resolve(__dirname, 'src/components'),
		},

		// Custom file extensions to resolve
		resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
	},

	// Experimental features for better performance
	experimental: {
		optimizePackageImports: [
			'@apollo/client',
			'chart.js',
			'react-chartjs-2',
			'date-fns',
			'react-syntax-highlighter',
		],
		// Enable Turbopack for development (if you want to use it)
		// turbo: {
		//   rules: {},
		// },
	},

	// Performance optimizations
	compress: true,
	poweredByHeader: false,

	// Security headers
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'X-Frame-Options',
						value: 'DENY',
					},
					{
						key: 'X-Content-Type-Options',
						value: 'nosniff',
					},
					{
						key: 'Referrer-Policy',
						value: 'origin-when-cross-origin',
					},
					{
						key: 'X-XSS-Protection',
						value: '1; mode=block',
					},
				],
			},
		];
	},

	// Image optimization
	images: {
		formats: ['image/webp', 'image/avif'],
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
		minimumCacheTTL: 31536000, // 1 year
	},

	// Custom webpack config for additional optimizations
	// Note: This will only apply when using webpack (production builds by default)
	webpack: (config, { dev, isServer }) => {
		if (!dev && !isServer) {
			// Optimize chunk splitting for better caching
			config.optimization.splitChunks = {
				...config.optimization.splitChunks,
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					},
					common: {
						name: 'common',
						minChunks: 2,
						chunks: 'all',
					},
				},
			};
		}
		return config;
	},

	// Server-side package exclusions
	serverExternalPackages: [
		// Add packages that should remain external on server
	],

	// Redirects for SEO
	async redirects() {
		return [];
	},
};

module.exports = withBundleAnalyzer(nextConfig);