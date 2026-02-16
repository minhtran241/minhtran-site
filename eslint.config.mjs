import { FlatCompat } from '@eslint/eslintrc';
import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'; // Import the fixup tools
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'dist/**'],
  },
  // Wrap the entire compat result in fixupConfigRules
  ...fixupConfigRules(
    compat.config({
      extends: ['prettier'],
      plugins: ['@next/next', 'react'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
      rules: {
        '@next/next/no-img-element': 'error',
        '@next/next/no-html-link-for-pages': 'error',
        'react/jsx-curly-brace-presence': [
          'warn',
          { props: 'never', children: 'never' },
        ],
        'react/self-closing-comp': 'warn',
        'prefer-const': 'error',
        'react/no-unknown-property': [
          'error',
          { ignore: ['data-theme', 'data-scroll-behavior'] },
        ],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
      },
      settings: {
        react: { version: 'detect' },
      },
    }),
  ),
];

export default eslintConfig;
