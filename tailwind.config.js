/** @type {import('tailwindcss').Config} */

const disabledCss = {
	'code::before': false,
	'code::after': false,
	'blockquote p:first-of-type::before': false,
	'blockquote p:last-of-type::after': false,
	pre: false,
	code: false,
	'pre code': false,
	'code::before': false,
	'code::after': false,
};

module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./src/app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
	],
	prefix: '',
	theme: {
		screens: {
			xs: '475px',
			sm: '640px',
			// => @media (min-width: 640px) { ... }

			md: '768px',
			// => @media (min-width: 768px) { ... }

			lg: '1024px',
			// => @media (min-width: 1024px) { ... }

			xl: '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
		},
		container: {
			center: true,
			padding: '1rem',
			// padding: {
			//     DEFAULT: '1rem',
			//     sm: '2rem',
			//     lg: '4rem',
			//     xl: '5rem',
			//     '2xl': '6rem',
			// },
			screens: {
				sm: '100%',
				md: '100%',
				lg: '1024px',
				xl: '1280px',
			},
		},
		extend: {
			fontFamily: {
				mazzardl: 'var(--font-mazzardl)',
				mazzardh: 'var(--font-mazzardh)',
				mazzardm: 'var(--font-mazzardm)',
			},
			keyframes: {
				scroll: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-100%)' },
				},
				'scroll-reverse': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' },
				},
				gradientMove: {
					'0%': { backgroundPosition: '0% 50%' },
					'50%': { backgroundPosition: '100% 50%' },
					'100%': { backgroundPosition: '0% 50%' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'infinite-slider': 'scroll 20s linear infinite',
				'infinite-slider-reverse': 'scroll-reverse 20s linear infinite',
			},
			typography: {
				DEFAULT: { css: disabledCss },
				sm: { css: disabledCss },
				lg: { css: disabledCss },
				xl: { css: disabledCss },
				'2xl': { css: disabledCss },
				base: { css: disabledCss },
			},
			colors: {},
		},
	},
	// plugins: [
	//     // require('daisyui'),
	//     require('tailwind-scrollbar')({ nocompatible: true }),
	//     require('tailwindcss-animate'),
	//     require('@tailwindcss/typography'),
	// ],

	// daisyui: {
	//     themes: [
	//         // 'light',
	//         // 'dark',
	//         'winter',
	//         'night',
	//         'lofi',
	//         'corporate',
	//         // 'business',
	//     ], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
	//     darkMode: ['selector', '[data-theme="night"]'],
	//     darkTheme: 'night', // name of one of the included themes for dark mode
	//     base: true, // applies background color and foreground color for root element by default
	//     styled: true, // include daisyUI colors and design decisions for all components
	//     utils: true, // adds responsive and modifier utility classes
	//     prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
	//     logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
	//     themeRoot: ':root', // The element that receives theme color CSS variables
	// },
};
