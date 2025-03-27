import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import cypressPlugin from 'eslint-plugin-cypress';
import globals from 'globals';

export default [
  // Basic recommended JavaScript rules
  js.configs.recommended,

  // Ignore directories that don't need to be checked
  {
    ignores: ['**/node_modules/**', 'dist/**', 'build/**', 'coverage/**'],
  },

  // Common rules for all TypeScript and JavaScript files
  {
    files: ['**/*.ts', '**/*.js'],
    plugins: {
      '@typescript-eslint': tseslint,
      cypress: cypressPlugin,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      // Add all necessary global variables
      globals: {
        ...globals.node,
        ...globals.mocha, // describe, it, before, beforeEach, after, afterEach
        cy: 'readonly',
        Cypress: 'readonly',
        expect: 'readonly',
        assert: 'readonly',
        chai: 'readonly',
      },
    },
    rules: {
      // Disable JavaScript rules that are replaced by TypeScript versions
      'no-unused-vars': 'off',
      'no-undef': 'off', // TypeScript checks types itself
      'no-redeclare': 'off',

      // General coding rules
      'no-console': 'warn',
      'no-debugger': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      curly: ['error', 'all'],

      // TypeScript-specific rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      // Cypress-specific rules
      'cypress/no-unnecessary-waiting': 'warn',
      'cypress/no-async-tests': 'error',
      'cypress/assertion-before-screenshot': 'warn',
      'cypress/no-force': 'warn',
      'cypress/no-assigning-return-values': 'error',
    },
  },

  // Additional rules for test files
  {
    files: ['cypress/api/**/*.spec.ts'],
    rules: {
      // Allow using 'any' in test files, as sometimes it's necessary
      '@typescript-eslint/no-explicit-any': 'off',
      // Allow long functions in tests
      'max-lines-per-function': 'off',
    },
  },

  // Rules for Cypress support files
  {
    files: ['cypress/support/**/*.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },

  // Special rules for API client files
  {
    files: ['cypress/support/apiClients/*.ts'],
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
