// eslint.config.js
import js from '@eslint/js'
import ts from 'typescript-eslint'
import prettierPlugin from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Prettier integration
      'prettier/prettier': [
        'error',
        {
          tabWidth: 2,
          useTabs: false,
          semi: false,
          printWidth: 100,
          singleQuote: true,
        },
      ],

      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-non-null-assertion': 'warn',

      // Disable base rules superseded by TS equivalents
      'no-unused-vars': 'off',
      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',

      // General best practices
      'no-console': 'warn',
      'no-debugger': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  {
    // Apply TS rules only to TS files
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    // Ignore build output and deps
    ignores: ['dist/**', 'node_modules/**', 'coverage/**', '*.js'],
  },
  prettierConfig, // Must be last
)