import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

// Google TypeScript Style Guide rules
const googleStyleRules = {
  'no-unused-vars': 'warn',
  'no-console': ['warn', { allow: ['warn', 'error'] }],
  'quotes': ['error', 'single', { avoidEscape: true }],
  'indent': ['error', 2, { SwitchCase: 1 }],
  'comma-dangle': ['error', 'always-multiline'],
  'max-len': ['error', { code: 100, tabWidth: 2 }],
  'object-curly-spacing': ['error', 'always'],
  'array-bracket-spacing': ['error', 'never'],
  'arrow-parens': ['error', 'always'],
  'eol-last': ['error', 'always'],
}

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      eslintConfigPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      ...googleStyleRules,
    },
  },
)
