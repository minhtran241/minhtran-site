import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
	// import.meta.dirname is available after Node.js v20.11.0
	baseDirectory: import.meta.dirname,
})

const eslintConfig = [
	...compat.config({
		extends: [
			'prettier',
		],
		plugins: ['@next/next', 'tailwindcss', 'react'],
		parserOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			ecmaFeatures: {
				jsx: true,
			},
		},
		rules: {
			// Tailwind CSS rules
			'tailwindcss/no-custom-classname': 'off', // Allow custom classes

			// Next.js optimizations
			'@next/next/no-img-element': 'error',
			'@next/next/no-html-link-for-pages': 'error',

			// React best practices
			'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
			'react/self-closing-comp': 'warn',

			// General code quality
			'prefer-const': 'error',

			// DaisyUI specific - allow data-* attributes
			'react/no-unknown-property': ['error', { ignore: ['data-theme'] }],
			"react/react-in-jsx-scope": "off",
			"react/prop-types": "off"
		},
		settings: {
			react: {
				version: 'detect', // Automatically detect React version
			},
			tailwindcss: {
				config: './tailwind.config.ts',
				cssFiles: [
					'**/*.css',
					'!**/node_modules',
					'!**/.*',
					'!**/dist',
					'!**/build',
				],
				callees: ['cn', 'clsx', 'classnames', 'tw'],
				whitelist: [
					// Add any custom classes you want to whitelist
					'scroll-smooth',
					'antialiased',
					'font-mazzardh',
				],
			},
		},
	}),
]

export default eslintConfig